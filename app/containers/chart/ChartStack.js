/**
 * ChartStack
 */
import React, {Component} from "react";
import Chart from './Chart'

import { createStackNavigator } from 'react-navigation';

const Routes = {
  Chart: {screen: Chart},
};
const ChartStack = createStackNavigator(Routes, {
  defaultNavigationOptions: {
    header:null
  },
  headerMode: 'screen'
});

export default ChartStack;
