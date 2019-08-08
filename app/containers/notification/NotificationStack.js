/**
 * NotificationStack.js
 */

import React, {Component} from "react";
import Notification from './Notification';

import { createStackNavigator} from 'react-navigation';

const Routes = {
    Notification: {screen: Notification},
};

const NotificationStack = createStackNavigator(Routes, {
    initialRouteName: 'Notification',
    headerMode: 'screen',
    defaultNavigationOptions: {
    header:null
    },
});

export default NotificationStack;
