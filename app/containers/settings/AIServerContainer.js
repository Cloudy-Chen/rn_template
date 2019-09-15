/**
 * AIServerContainer.js
 */

import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {Toolbar} from "../../components/Toolbar";
import {AISearchBar, AIDataBoard, AIAnswerBoard, AIDataDisplay} from "../../components/AIServer/index";
import constants from "../../resources/constants";
import * as SettingsActions from "../../actions/settings-actions";
import strings from "../../resources/strings";
import {showCenterToast} from "../../utils/tools";

export class AIServerContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            AIType: constants.TYPE_COMMODITY,
            searchText: '',
            showSearchResult: false,
            searchResult: [],
            data:null,
        };
        this.auth = {
            username: this.props.auth.get("username"),
            password: this.props.auth.get("password"),
            sessionId: this.props.auth.get("sessionId"),
        }
    }

    componentWillReceiveProps(nextProps) {
        // 搜索引擎
        const resultListResponse = this.props.settings.get('resultListResponse');
        const nextResultListResponse = nextProps.settings.get('resultListResponse');
        const searchResult = nextProps.settings.get('resultList');

        if (resultListResponse === constants.INITIAL && nextResultListResponse === constants.GET_RESULT_SUCCESS) {
            nextProps.dispatch(SettingsActions.resetResultResponse());
            this.setState({searchResult:searchResult})
        }else if (resultListResponse === constants.INITIAL && nextResultListResponse === constants.GET_RESULT_FAIL){
            showCenterToast(strings.getResultFail);
            nextProps.dispatch(SettingsActions.resetResultResponse());
        }

        // 语音转换
        const convertResponse = this.props.settings.get('convertResponse');
        const nextConvertResponse = nextProps.settings.get('convertResponse');
        const convertTXT = nextProps.settings.get('convertTXT');

        if (convertResponse === constants.INITIAL && nextConvertResponse === constants.CONVERT_VOICE_TO_TXT_SUCCESS) {
            this.setState({searchText:convertTXT});
            nextProps.dispatch(SettingsActions.resetConvertResponse());
        }else if (convertResponse === constants.INITIAL && nextConvertResponse === constants.CONVERT_VOICE_TO_TXT_FAIL){
            alert(constants.convert_fail);
            nextProps.dispatch(SettingsActions.resetConvertResponse());
        }
    }

    render() {
    return (
        <View style={styles.container}>
            <Toolbar title = "智能问答" isBack={true} navigation = {this.props.navigation}
                     actions = {[
                         {value: constants.TYPE_COMMODITY, show: 'OPTION_NEVER'},
                         {value: constants.TYPE_ANSWER, show: 'OPTION_NEVER'},
                     ]}
                     onPress = {(i) => {this._onAIOption(i)}}>
                {this._renderAIDataCard()}
            </Toolbar>
        </View>);
  }

    _renderAIDataCard(){
        return(
            this.state.AIType === constants.TYPE_COMMODITY?
                    <AIDataBoard
                        data={this.state.data}
                        _onMicrophonePress={this._onMicrophonePress}
                        _searchTextChange={(text) => this._searchTextChange(text)}
                        _onSearchInputFocus={this._onSearchInputFocus}
                        _onSearchResultPress={this._onSearchResultPress}
                        _uploadRecordFile={(audioPath)=>this._uploadRecordFile(audioPath)}
                        showSearchResult = {this.state.showSearchResult}
                        searchResult = {this.state.searchResult}
                        searchText = {this.state.searchText}/>
                :<AIAnswerBoard
                    username={this.props.auth.get('username')}
                    _onMicrophonePress={this._onMicrophonePress}
                    _searchTextChange={(text) => this._searchTextChange(text)}
                    _onSearchResultPress={this._onSearchResultPress}
                    _uploadRecordFile={(audioPath)=>this._uploadRecordFile(audioPath)}
                    showSearchResult = {this.state.showSearchResult}
                    searchResult = {this.state.searchResult}
                    searchText = {this.state.searchText}
                />
        )
    }

    _onMicrophonePress = ()=>{

    };

    _searchTextChange = (text) => {
        this.setState({searchText: text,showSearchResult: true});
        if (!text) {
            this._clearSearchInput()
            return;
        }

        if(this.state.AIType === constants.TYPE_COMMODITY)
        this.props.dispatch(SettingsActions.getCommodityList(text,this.auth));
    }

    _onSearchInputFocus = () => this.setState({showSearchResult:true})

    _clearSearchInput = () => this.setState({searchText: '', showSearchResult: false,})

    _onSearchResultPress = (item) => {
        this.setState({
            searchText: this.state.AIType === constants.TYPE_COMMODITY?item.codigo:item,
            showSearchResult: false,
            data: item,
        })
    }

    _onAIOption(i) {
        this._clearSearchInput();
        switch (i) {
            case 0:this.setState({AIType: constants.TYPE_COMMODITY});break;
            case 1:this.setState({AIType: constants.TYPE_ANSWER});break;
        }
    }

    _uploadRecordFile(audioPath){
        this.props.dispatch(SettingsActions.convertVoiceToTxt(audioPath));
    }
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
    settings: state.get('settings'),
});

export default connect(mapStateToProps)(AIServerContainer)
