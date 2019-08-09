/**
 * AIServerContainer.js
 */

import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {Toolbar} from "../../components/Toolbar";

export class AIServerContainer extends Component {

  render() {
    return (
        <View style={styles.container}>
            <Toolbar title = "智能问答" actions = {[]} isBack={true} navigation = {this.props.navigation}>
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
    settings: state.get('settings'),
});

export default connect(mapStateToProps)(AIServerContainer)
