/**
 * Settings.js
 */

import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {Toolbar} from "../../components/Toolbar";
import MicrosoftMap from "../../components/rnMap/js/MicrosoftMap/MicrosoftMap";

export class Map extends Component {

    componentDidUpdate() {
        this.proceed()
    }

    proceed() {
    }

  render() {

    return (
        <View style={styles.container}>
            <Toolbar title = "地图" actions = {[]} navigation = {this.props.navigation}>
                <MicrosoftMap/>
            </Toolbar>
        </View>);
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
