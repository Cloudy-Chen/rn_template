/**
 * Register.js
 */

import React, {Component} from "react";
import {Image, StatusBar, Text, View, TouchableOpacity, TextInput, ImageBackground} from "react-native";
import {connect} from "react-redux";
import * as loginActions from "../../actions/auth-actions";
import * as rootActions from "../../actions/root-actions";
import FloatingTextInput from "../../components/FloatingTextInput";
import colors from '../../resources/colors';
import dimens from '../../resources/dimens';
import strings from '../../resources/strings';
import {isEmptyObject, isObject} from '../../utils/tools'
import {SpinnerWrapper} from "../../components/SpinnerLoading";

const backgroundImg = require('../../assets/img/app_background_img.jpg');

export class Register extends Component {

    constructor(props) {
        super(props);
        this.state={
            registerForm:{
                username:'',
                password:'',
            }
        }
    }

    render() {
        const loading = this.props.root.get('loading');

        return (
            <View style={registerStyles.containerStyle}>
                <ImageBackground source={backgroundImg} style={registerStyles.imageBackgroundStyle}>
                    <View style={registerStyles.headerStyle}>
                        <View style ={registerStyles.logoWrapperStyle}>
                            <Text style={registerStyles.titleStyle}>{strings.app_title}</Text>
                        </View>
                    </View>

                <View style={registerStyles.contentStyle}>
                    {/*输入用户名*/}
                    <FloatingTextInput
                        iconName = {'user-o'}
                        placeText = {'请输入用户名'}
                        textInput = {this.state.registerForm.username}
                        isPassword = {false}
                        onChangeText = {(username)=>{
                            this.setState({registerForm:Object.assign(this.state.registerForm,{username: username})});
                        }}
                    />
                    {/*输入密码*/}
                    <FloatingTextInput
                        iconName = {'lock'}
                        placeText = {'请输入密码'}
                        textInput = {this.state.registerForm.password}
                        isPassword = {true}
                        onChangeText = {(password)=>{
                            this.setState({registerForm:Object.assign(this.state.registerForm,{password: password})});
                        }}
                    />

                    {/*注册按钮*/}
                    <TouchableOpacity
                        style={registerStyles.registerButtonStyle}
                        onPress={this.onRegisterPress}>
                        <View style={registerStyles.buttonTextWrapperStyle}>
                            <Text style={registerStyles.buttonTextStyle}>{strings.register_btn}</Text>
                        </View>
                    </TouchableOpacity>

                    {/*返回按钮*/}
                    <TouchableOpacity
                        style={registerStyles.backButtonStyle}
                        onPress={this.onBackPress}>
                        <View style={registerStyles.buttonTextWrapperStyle}>
                            <Text style={registerStyles.buttonTextStyle}>{strings.back}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </ImageBackground>
            </View>
        );
    }

    // 对注册按钮的响应
    onRegisterPress = () => {
        this.props.navigation.pop();
        if (this.props.navigation.state.params.callback) {
            this.props.navigation.state.params.callback(this.state.registerForm.username,this.state.registerForm.password);
        }
    }

    // 对返回按钮的响应
    onBackPress = () => this.props.navigation.pop();
};

//布局UI风格
const registerStyles = {
    containerStyle: {
        flex:4,
        flexDirection: 'column',
        alignItems: 'center',
    },
    imageBackgroundStyle: {
        width: '100%',
        height: '100%',
    },
    headerStyle: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    logoWrapperStyle:{
        height: 160,
        width: 160,
        borderWidth: 1.5,
        borderColor: colors.baseWhite,
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoStyle:{
        height:60,
        width:60,
    },
    titleStyle:{
        color: colors.baseWhite,
        fontSize: 30,
    },
    contentStyle: {
        flex:3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    registerButtonStyle: {
        flexDirection:'row',
        height:45,
        width:300,
        borderColor:'#eee',
        borderWidth: 1.5,
        margin:10,
        marginTop:25,
        padding:10,
        borderRadius:15
    },
    backButtonStyle: {
        flexDirection:'row',
        height:45,
        width:300,
        backgroundColor:colors.primaryColor,
        margin:10,
        marginTop:5,
        padding:10,
        borderRadius:15,
    },
    buttonTextWrapperStyle: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonTextStyle: {
        color:colors.baseWhite,
        fontSize:18,
    },
};

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(Register)
