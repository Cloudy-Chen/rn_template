/**
 * Settings.js
 */

import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {Toolbar} from "../../components/Toolbar";
import {ListItem, Icon, } from "react-native-elements";
import * as authActions from "../../actions/auth-actions";
import * as dataActions from "../../actions/data-actions";
import settings from '../../test/settings';
import colors from '../../resources/colors';

export class Settings extends Component {

    componentDidUpdate() {
        this.proceed()
    }

    proceed() {
        const isLoggedIn = this.props.auth.get('isLoggedIn');
        if (!isLoggedIn) {
            this.props.navigation.navigate('AuthStack');
        }
    }

  render() {

    const {settings1, settings2, settings3, settings4} = settings;

    return (
        <View style={styles.container}>
            <Toolbar title = "设置" actions = {[]} navigation = {this.props.navigation}>
                {this._renderUserHeader(settings.user)}
                <ListItem key={1} title={settings1.title} leftIcon={{ name: settings1.icon, color: colors.primaryGray }} style={styles.listItemStyle} chevron onPress={this._onPasswordPress}/>
                <ListItem key={2} title={settings2.title} leftIcon={{ name: settings2.icon, color: colors.primaryGray }} style={styles.listItemStyle} chevron onPress={this._onStoragePress}/>
                <ListItem key={3} title={settings3.title} leftIcon={{ name: settings3.icon, color: colors.primaryGray }} style={styles.listItemStyle} chevron onPress={this._onAIServerPress}/>
                <ListItem key={4} title={settings4.title} leftIcon={{ name: settings4.icon, color: colors.primaryGray }} style={styles.listItemStyle} chevron onPress={this._onLogoutPress}/>
            </Toolbar>
        </View>);
  }

    _renderUserHeader(user){
      return(
          <ListItem leftAvatar={{ source: { uri: user.avatar_url }}} title={user.name} subtitle={user.brief} style={styles.listItemStyle} chevron onPress={this._onUserPress}/>
      );
    }

    _onUserPress =()=> {};
    _onPasswordPress =()=> {};
    _onStoragePress =()=> {this.props.dispatch(authActions.resetAuth());this.props.dispatch(dataActions.resetData());};
    _onAIServerPress =()=> {this.props.navigation.push('AIServerContainer')};
    _onLogoutPress =()=> {this.props.dispatch(authActions.logout());};
};

const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems:'center',
      justifyContent: 'center'
    },
    listItemStyle: {
        borderBottomWidth: 0.7,
        borderColor: colors.primaryGrayLight,
    },
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(Settings)
