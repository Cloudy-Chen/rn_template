import React from 'react';
import { View, StyleSheet, ActivityIndicator, Platform, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native';
import colors from '../../../resources/colors';
import constants from './AIConstants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getHeaderHeight, isObject, showCenterToast} from "../../../utils/tools";
import {AudioRecorder, AudioUtils} from 'react-native-audio'
import RecordingModal from '../../../components/RecordingModal';
import {connect} from "react-redux";

const mic_recording = <Ionicons name={'md-mic-off'} size={25} color={colors.primaryDarkGray}/>
const mic_stop = <Ionicons name={'md-mic'} size={25} color={colors.primaryDarkGray}/>

export default class AISearchBar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            // 搜索栏
            searchText: '',
            showSearchResult: false,
            // 录音
            hasPermission: undefined, //授权状态
            recording: false, //是否录音
            stop: false, //录音是否停止
            currentTime: 0, //录音时长
        }
    }

    componentDidMount(): void {
        // 请求授权
        AudioRecorder.requestAuthorization()
            .then(isAuthor => {
                if(!isAuthor) {
                    return showCenterToast(constants.request_Record_Permission);
                }
                this.setState({hasPermission: isAuthor});
                AudioRecorder.prepareRecordingAtPath(constants.audioPath,constants.RecordPathOption);
                // 录音进展
                AudioRecorder.onProgress = (data) => {
                    this.setState({currentTime: Math.floor(data.currentTime)});
                };
                // 完成录音
                AudioRecorder.onFinished = (data) => {
                    // data 返回需要上传到后台的录音数据
                    console.log(this.state.currentTime)
                    console.log(data)
                };
            })
    }

    render() {
        const {recording, stop} = this.state;

        return (
            <KeyboardAvoidingView behavior="padding">
            <View style={styles.searchContainer}>
                <RecordingModal show={recording}/>
                {this._renderSearchResult()}
                <View style={styles.searchInputContainer}>
                    <TouchableOpacity style={styles.searchIcon} onLongPress={this._micro_record} onPressOut={this._micro_stop}>
                        {recording?mic_recording:mic_stop}
                    </TouchableOpacity>
                    <View style={styles.inputContainerStyle}>
                        <TextInput
                            ref={ref => this._searchInput = ref}
                            underlineColorAndroid="transparent"
                            style={styles.inputStyle}
                            value={this.props.searchText}
                            onChangeText={(text) => this.props._searchTextChange(text)}
                            onFocus={this.props._onSearchInputFocus}
                        />
                    </View>
                </View>
            </View>
            </KeyboardAvoidingView>
        );
    }

    _renderSearchResult = () => {
        const {searchResult, showSearchResult} = this.props;

        if (!showSearchResult) return null;
        if (!searchResult) return null;

        let searchResultsCustomStyle = {height: 210,borderTopWidth:0.5,borderColor:colors.primaryGray}
        if (searchResult.length < 3) {
            searchResultsCustomStyle = {height: 70 * searchResult.length,borderTopWidth:0.5,borderColor:colors.primaryGray}
        }

        let resultView = searchResult.map((item, index) => {
            return (
                <TouchableOpacity key={index} onPress={() => {this.props._onSearchResultPress(item)}}>
                    <View style={styles.searchResultContainer}>
                        <View style={styles.searchResultRightContainer}>
                            <Text numberOfLines={1} style={styles.searchResultTitle}>{item.codigo}</Text>
                            <Text numberOfLines={1} style={styles.searchResultSubTitle}>{item.descripcion}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })

        return (
            <View style={[styles.searchResultsContainer, searchResultsCustomStyle]}>
                <ScrollView>
                    {resultView}
                </ScrollView>
            </View>
        )
    };

    // 开始录音
    _micro_record = async () => {
        if(!this.state.hasPermission) return showCenterToast(constants.request_Record_Permission);
        if(this.state.recording) return showCenterToast(constants.is_recording);
        if(this.state.stop) AudioRecorder.prepareRecordingAtPath(constants.audioPath,constants.RecordPathOption);
        this.setState({recording: true})

        try {
            await AudioRecorder.startRecording()
        } catch (err) {
            console.log(err)
        }
    };

    // 停止录音
    _micro_stop = async () => {
        this.setState({stop: true, recording: false});
        try {
            await AudioRecorder.stopRecording();
        } catch (error) {
            alert(error);
        }
        this.props._uploadRecordFile(constants.audioPath)
    };

}

const styles = StyleSheet.create({
    searchContainer: {
        width: constants.SCREEN_WIDTH,
        backgroundColor: 'white',
    },
    searchInputContainer: {
        height: Platform.OS === 'ios' ? 49 : 55,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c8c7cc',
    },
    searchIcon:{
        width:30,
        height:30,
        alignItems:'center',
        justifyContent: 'center',
    },
    inputContainerStyle: {
        flex: 1,
        margin: 0,
        paddingHorizontal: 10,
        borderBottomWidth: 0,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderLeftColor: '#c8c7cc',
    },
    inputStyle: {
        height: 30,
        padding: 0,
        margin: 0,
    },
    searchInputLeftTxt: {
        fontSize: 16,
        color: colors.primaryColor,
        paddingRight: 10,
    },
    noSearchResultContainer: {
        padding: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c8c7cc',
        borderTopWidth: 0
    },
    noSearchResultTxt: {
        fontSize: 18,
        color: '#030303'
    },
    searchResultsContainer: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c8c7cc',
        borderTopWidth: 0.5,
        height: 70,
        width: constants.SCREEN_WIDTH,
    },
    searchResultContainer: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#c8c7cc'
    },
    searchResultRightContainer: {
        flex: 1,
        paddingLeft: 20
    },
    searchResultTitle: {
        fontSize: 18,
        color: '#030303'
    },
    searchResultSubTitle: {
        fontSize: 12,
        color: '#b2b2b2',
        marginTop: 5
    },
});
