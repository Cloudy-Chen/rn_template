/**
 * DataForm.js
 */

import React, {Component} from "react";
import {
    Image,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    StyleSheet,
    ScrollView,
    Platform, SafeAreaView, KeyboardAvoidingView,
} from "react-native";
import {connect} from "react-redux";
import colors from "../../resources/colors";
import {getHeaderHeight, isEmptyObject, isObject, SCREEN_HEIGHT, SCREEN_WIDTH, _switchrubroIdxTorubro} from "../../utils/tools";
import strings from "../../resources/strings";
import {Toolbar} from '../../components/Toolbar';
import {InputWithClearButton, InputWithActionSheet, InputWithCalendar} from '../../components/multiFuncTextInput/index'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePickerViewer from "../../components/ImagePickerViewer";
import IntroDivider from '../../components/IntroDivider';
import constants from '../../resources/constants';
import Button from '../../components/Button';
import * as DataActions from "../../actions/data-actions";
import Toast from "react-native-root-toast";

const typeActionSheet = [strings.cancel,constants.TYPE_1,constants.TYPE_2,constants.TYPE_3,constants.TYPE_4];

export class AddData extends Component {

  constructor(props) {
    super(props);
    this.state={
        goods:{
            id:'',
            name:'',
            brief:'',
            price:'',
            imgsurl:[],
            thumburl:'',
            updatetime:'',
            rubro:-1,
            presentacion:'',
            marca:'',
            tamano:'',
            codigo:'',
        },
        imgUrls:['','','','','']
    }
  }

    componentWillReceiveProps(nextProps) {
        const Response = this.props.data.get('dataResponse');
        const nextResponse = nextProps.data.get('dataResponse');

        if (Response === constants.INITIAL && nextResponse === constants.ADD_DATA_SUCCESS) {
            this.props.navigation.pop();
            nextProps.dispatch(DataActions.resetResponse());
        }else if (Response === constants.INITIAL && nextResponse === constants.ADD_DATA_FAIL){
            alert(strings.addDataFail);
            nextProps.dispatch(DataActions.resetResponse());
        }
    }

    render() {

    return (
        <View style={{flex:1,alignItems:'center'}}>
            <Toolbar
                title = "添加数据"
                actions = {[]}
                isBack = {true}
                navigation = {this.props.navigation}
            >
                <KeyboardAwareScrollView style={{height:SCREEN_HEIGHT-{getHeaderHeight},width:SCREEN_WIDTH}}>
                        <ScrollView>
                        <IntroDivider intro={strings.details_intro}/>
                        {this._renderAddListItem()}
                        <IntroDivider intro={strings.imgurls_intro}/>
                        <ImagePickerViewer imgurls={this.state.imgUrls} />
                        <Button title={strings.confirm} onPress={this._onConfirmPress}/>
                        </ScrollView>
                </KeyboardAwareScrollView>
            </Toolbar>
        </View>
        );
  }

    _renderAddListItem(){
        return([
            <InputWithClearButton
                hookCanBeCleared
                title={strings.name}
                textInputEvent={{
                    placeholder: this.state.goods.name,
                    onChangeText: (value) => {
                        this.setState({goods:Object.assign(this.state.goods,{name: value})});
                }}}
            />,
            <InputWithClearButton
                hookCanBeCleared
                title={strings.codigo}
                textInputEvent={{
                    placeholder: this.state.goods.codigo,
                    onChangeText: (value) => {
                        this.setState({goods:Object.assign(this.state.goods,{cofigo: value})});
                    }}}
            />,
            <InputWithClearButton
                hookCanBeCleared
                title={strings.price}
                textInputEvent={{
                    placeholder: this.state.goods.price,
                    onChangeText: (value) => {
                        this.setState({goods:Object.assign(this.state.goods,{price: value})});
                    }}}
            />,
            <InputWithCalendar
                title={strings.updatetime}
                date={this.state.goods.updatetime}
                onDateChange={(value)=>{
                    this.setState({goods:Object.assign(this.state.goods,{updatetime: value})});
                }}
            />,
            <InputWithActionSheet
                title={strings.rubro}
                actionSheetOptions={typeActionSheet}
                option={_switchrubroIdxTorubro(this.state.goods.rubro)}
                handlePress={(index)=>{
                    if(index!==0){
                        this.setState({goods:Object.assign(this.state.goods,{rubro: index})});
                    }
                }}
            />,
            <InputWithClearButton
                hookCanBeCleared
                title={strings.presentacion}
                textInputEvent={{
                    placeholder: this.state.goods.presentacion,
                    onChangeText: (value) => {
                        this.setState({goods:Object.assign(this.state.goods,{presentacion: value})});
                    }}}
            />,
            <InputWithClearButton
                hookCanBeCleared
                title={strings.marca}
                textInputEvent={{
                    placeholder: this.state.goods.marca,
                    onChangeText: (value) => {
                        this.setState({goods:Object.assign(this.state.goods,{marca: value})});
                    }}}
            />,
            <InputWithClearButton
                hookCanBeCleared
                title={strings.tamano}
                textInputEvent={{
                    placeholder: this.state.goods.tamano,
                    onChangeText: (value) => {
                        this.setState({goods:Object.assign(this.state.goods,{tamano: value})});
                    }}}
            />,
            <InputWithClearButton
                hookCanBeCleared
                title={strings.brief}
                textInputEvent={{
                    placeholder: this.state.goods.brief,
                    onChangeText: (value) => {
                        this.setState({goods:Object.assign(this.state.goods,{brief: value})});
                    }}}
            />
        ]);
    }

    _onConfirmPress = () => {if(this._validateData())this.props.dispatch(DataActions.addData(this.state.goods));}

    _validateData(){
        var {name, codigo, price} = this.state.goods;
        if(isEmptyObject(name)){Toast.show(strings.nameIsNotEmpty, {duration: Toast.durations.LONG,position: Toast.positions.CENTER,});return false;}
        if(isEmptyObject(codigo)){Toast.show(strings.codigoIsNotEmpty, {duration: Toast.durations.LONG,position: Toast.positions.CENTER,});return false;}
        if(isEmptyObject(price)){Toast.show(strings.priceIsNotEmpty, {duration: Toast.durations.LONG,position: Toast.positions.CENTER,});return false;}
        return true;
    }

};

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
    data: state.get('data'),
});

export default connect(mapStateToProps)(AddData)
