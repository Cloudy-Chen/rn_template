/**
 * Register.js
 */

import React, {Component} from "react";
import {Image, StatusBar, Text, View, TouchableOpacity, TextInput} from "react-native";
import {connect} from "react-redux";
import * as loginActions from "../../actions/auth-actions";
import * as rootActions from "../../actions/root-actions";
import FloatingTextInput from "../../components/FloatingTextInput";
import colors from '../../resources/colors';
import dimens from '../../resources/dimens';
import strings from '../../resources/strings';
import {isEmptyObject, isObject} from '../../utils/tools'

const loginLogo = require('../../assets/img/form_logo.png')

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
        return (
            <View style={registerStyles.containerStyle}>
                <View style={registerStyles.headerStyle}>
                    <Image style={registerStyles.logoStyle} source={loginLogo}/>
                    <Text style={registerStyles.titleStyle}>{strings.app_title}</Text>
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
                        style={registerStyles.buttonStyle}
                        onPress={this.onRegisterPress}>
                        <View style={registerStyles.buttonTextWrapperStyle}>
                            <Text style={registerStyles.buttonTextStyle}>{strings.register_btn}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
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
};

//布局UI风格
const registerStyles = {
    containerStyle: {
        flex:4,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.primaryColor,
    },
    headerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor:'white',
    },
    logoStyle:{
        height:60,
        width:60,
    },
    titleStyle:{
        color: colors.primaryColor,
        fontSize: 22,
        marginTop:dimens.margin_medium
    },
    contentStyle: {
        flex:3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primaryColor,

    },
    buttonStyle: {
        flexDirection:'row',
        height:45,
        width:300,
        backgroundColor:'#eee',
        margin:10,
        marginTop:25,
        padding:10,
        borderRadius:15
    },
    buttonTextWrapperStyle: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonTextStyle: {
        color:colors.primaryColorDark,
        fontSize:18,
    },
};

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(Register)
