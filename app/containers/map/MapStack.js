/**
 * MapStack.js
 */

import React, {Component} from "react";
import Map from './Map';

import { createStackNavigator} from 'react-navigation';

const Routes = {
    Map: {screen: Map},
};

const MapStack = createStackNavigator(Routes, {
    initialRouteName: 'Map',
    headerMode: 'screen',
    defaultNavigationOptions: {
    header:null
    },
});

export default MapStack;
