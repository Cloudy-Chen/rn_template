/**
 * FormStack.js
 */

import React, {Component} from "react";
import DataForm from './DataForm';
import DataDetail from './DataDetail';
import AddData from './AddData';
import EditData from './EditData';

import { createStackNavigator} from 'react-navigation';

const Routes = {
    DataForm: {screen: DataForm},
    DataDetail: {screen: DataDetail},
    AddData: {screen: AddData},
    EditData:{screen: EditData},
};

const FormStack = createStackNavigator(Routes, {
    initialRouteName: 'DataForm',
    headerMode: 'screen',
    defaultNavigationOptions: {
    header:null
    },
});

export default FormStack;
