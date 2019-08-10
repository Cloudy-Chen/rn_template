import React from 'react';
import { View, StyleSheet, ActivityIndicator, Platform, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import colors from '../../../resources/colors';
import strings from '../../../resources/strings';
import constants from './AIConstants';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class AISearchBar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            showSearchResult: false,
        }
    }

    render() {
        return (
            <View style={styles.searchContainer}>
                {this._renderSearchResult()}
                <View style={styles.searchInputContainer}>
                    <TouchableOpacity style={styles.searchIcon} onPress={this.props._onMicrophonePress}>
                        <Ionicons name={'md-mic'} size={25} color={colors.primaryDarkGray}/>
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
    }

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
