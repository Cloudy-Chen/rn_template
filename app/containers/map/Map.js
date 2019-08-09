/**
 * Settings.js
 */

import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {Toolbar} from "../../components/Toolbar";
import {MicrosoftMap, PoiMap} from "../../components/rnMap/index";
import constants from '../../resources/constants';

export class Map extends Component {

    constructor(props) {
        super(props);
        this.state={
            mapType: constants.BAIDU_MAP
        };
    }

    componentDidUpdate() {
        this.proceed()
    }

    proceed() {
    }

  render() {
        const {mapType} = this.state;
    return (
        <View style={styles.container}>
            <Toolbar title = "地图"
                     actions = {[
                         {value: constants.BAIDU_MAP, show: 'OPTION_NEVER'},
                         {value: constants.BING_MAP, show: 'OPTION_NEVER'},
                     ]}
                     navigation = {this.props.navigation}
                     onPress = {(i) => {this._onMapOption(i)}}>
                {mapType === constants.BAIDU_MAP?<PoiMap/>:null}
                {mapType === constants.BING_MAP?<MicrosoftMap/>:null}
            </Toolbar>
        </View>);
  }

    _onMapOption(i) {
        switch (i) {
            case 0:this.setState({mapType: constants.BAIDU_MAP});break;
            case 1:this.setState({mapType: constants.BING_MAP});break;
        }
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
});

export default connect(mapStateToProps)(Map)
