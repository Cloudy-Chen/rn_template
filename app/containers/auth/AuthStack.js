/**
 * Created by saionara1 on 6/21/17.
 */
import React, {Component} from "react";
import { createStackNavigator,createAppContainer } from 'react-navigation';
import Login from "./Login";
import Register from './Register';

const Routes = {
  Login:{screen:Login},
  Register:{screen:Register},
};
const AuthStack = createStackNavigator(Routes, {
  defaultNavigationOptions: {
  },
  headerMode: 'screen'
});

export default AuthStack;
