/**
 * SettingsStack
 */
import React, {Component} from "react";
import Settings from './Settings'

import { createStackNavigator} from 'react-navigation';

const Routes = {
  Settings: {screen: Settings},
};
const SettingsStack = createStackNavigator(Routes, {
  defaultNavigationOptions: {
    header:null
  },
  headerMode: 'screen'
});

export default SettingsStack;
