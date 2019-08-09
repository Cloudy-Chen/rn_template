/**
 * SettingsStack
 */
import React, {Component} from "react";
import Settings from './Settings';
import AIServerContainer from './AIServerContainer';

import { createStackNavigator} from 'react-navigation';

const Routes = {
  Settings: {screen: Settings},
  AIServerContainer: {screen: AIServerContainer}
};
const SettingsStack = createStackNavigator(Routes, {
  defaultNavigationOptions: {
    header:null
  },
  initialRouteName: 'Settings',
  headerMode: 'screen'
});

export default SettingsStack;
