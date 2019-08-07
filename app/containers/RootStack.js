/**
 * 底部tab 统一配置
 * 各个模块的路由在单独的Stack中配置
 */
import React, {Component} from "react";
import { Image, Text, Platform } from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FormStack from "./form/FormStack";
import ChartStack from "./chart/ChartStack";
import SettingsStack from "./settings/SettingsStack";
import MapStack from "./map/MapStack";
import colors from '../resources/colors'

const TAB_CONFIG = {
  FormStack: {
    label: '表单',
    icon: 'md-list',
  },
  ChartStack: {
    label: '图表',
    icon: 'md-pie',
  },
  MapStack: {
    label: '地图',
    icon: 'md-map',
  },
  SettingsStack: {
    label: '设置',
    icon: 'md-settings',
  },
};

const Routes = {
  FormStack: FormStack,
  ChartStack: ChartStack,
  MapStack: MapStack,
  SettingsStack: SettingsStack,
};

const RootStack = createBottomTabNavigator(Routes, {
  defaultNavigationOptions: ({ navigation }) => {
    const iconSize = 23;
    return ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        return (
            <Ionicons
                name={TAB_CONFIG[routeName].icon}
                size={26}
                color={focused ?colors.primaryColor:'#aaa'}
            />
        );
      },
      tabBarLabel: ({ tintColor }) => {
        const { routeName } = navigation.state;
        return (
            <Text
                allowFontScaling={false}
                style={{
                  color: tintColor,
                  fontSize: 12,
                  textAlign: 'center',
                }}
            >
              {TAB_CONFIG[routeName].label}
            </Text>
        );
      },
      tabBarOptions: {
        activeTintColor: colors.primaryColor, // 文字和图片选中颜色
        inactiveTintColor: '#aaa', // 文字和图片未选中颜色
        allowFontScaling: false,
        style: {
          backgroundColor: '#ffffff',
          paddingVertical: 3,
          height:50,
        },
      },
    });
  },
  initialRouteName: 'FormStack',
  headerMode: 'screen'
});

export default RootStack;
