/**
 * Login.js
 */

import React, {Component} from "react";
import {Image, StatusBar, Text, View, TouchableOpacity, TextInput, InteractionManager, StyleSheet, Platform, ImageBackground} from "react-native";
import {connect} from "react-redux";
import * as loginActions from "../../actions/auth-actions";
import * as rootActions from "../../actions/root-actions";
import FloatingTextInput from "../../components/FloatingTextInput";
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import {isEmptyObject, isObject} from '../../utils/tools'
import {SpinnerWrapper} from '../../components/SpinnerLoading/index'

const backgroundImg = require('../../assets/img/app_background_img.jpg');

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state={
            loginForm:{
                username: '',
                password: '',
            }
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(()=> {
            this.props.dispatch(rootActions.setLoading(false));
        });
    }

    componentDidUpdate() {
        this.proceed()
    }

    proceed() {

        const loginError = this.props.auth.get('loginError');
        const isLoggedIn = this.props.auth.get('isLoggedIn');

        if (isObject(loginError) && loginError && isObject(loginError.message) && loginError.message) {
            alert(loginError.message);
            this.props.dispatch(loginActions.setLoginError({}))
        } else if (isLoggedIn) {
            this.props.navigation.navigate('RootStack'); //自动登录
        }
    }

    render() {
        const loading = this.props.root.get('loading');

        return (
            <View style={loginStyles.containerStyle}>
                <ImageBackground source={backgroundImg} style={loginStyles.imageBackgroundStyle}>
                <View style={loginStyles.headerStyle}>
                    <View style ={loginStyles.logoWrapperStyle}>
                    <Text style={loginStyles.titleStyle}>{strings.app_title}</Text>
                    </View>
                </View>

                <View style={loginStyles.contentStyle}>
                    {/*输入用户名*/}
                    <FloatingTextInput
                        iconName = {'user-o'}
                        placeText = {'请输入用户名'}
                        textInput = {this.state.loginForm.username}
                        isPassword = {false}
                        onChangeText = {(username)=>{
                            this.setState({loginForm:Object.assign(this.state.loginForm,{username: username})});
                        }}
                    />
                    {/*输入密码*/}
                    <FloatingTextInput
                        iconName = {'lock'}
                        placeText = {'请输入密码'}
                        textInput = {this.state.loginForm.password}
                        isPassword = {true}
                        onChangeText = {(password)=>{
                            this.setState({loginForm:Object.assign(this.state.loginForm,{password: password})});
                        }}
                    />

                    {/*登录按钮*/}
                    <TouchableOpacity
                        style={loginStyles.loginButtonStyle}
                        onPress={this.onLoginPress}>
                        <View style={loginStyles.buttonTextWrapperStyle}>
                            <Text style={loginStyles.buttonTextStyle}>{strings.login_btn}</Text>
                        </View>
                    </TouchableOpacity>

                    {/*注册按钮*/}
                    <TouchableOpacity
                        style={loginStyles.registerButtonStyle}
                        onPress={this.onRegisterPress}>
                        <View style={loginStyles.buttonTextWrapperStyle}>
                            <Text style={loginStyles.buttonTextStyle}>{strings.register_btn}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                    {/*登录加载*/}
                    <SpinnerWrapper loading={loading}/>
                </ImageBackground>
            </View>
        );
    }

    // 对登录按钮的响应
    onLoginPress = () => {
        const {username,password} = this.state.loginForm;
        if(isEmptyObject(username) || isEmptyObject(password)){
            alert(strings.login_validate_msg);
            return;
        }else{
            this.props.dispatch(loginActions.login(username, password));
        }
    }

    // 对注册按钮的响应
    onRegisterPress = () => this.props.navigation.push('Register',{
        callback: ((username,password) => {
            this.setState({loginForm:Object.assign(this.state.loginForm,{username:username, password: password})});
        })
    });
};

//布局UI风格
const loginStyles = StyleSheet.create({
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
    loginButtonStyle: {
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
    registerButtonStyle: {
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
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(Login)
