/**
 * EditData.js
 */

import React, {Component} from "react";
import {Image, StatusBar, Text, TouchableOpacity, View, Dimensions, ScrollView,} from "react-native";
import {connect} from "react-redux";
import {
    _switchrubroIdxTorubro,
    getHeaderHeight,
    isEmptyObject,
    isObject,
    SCREEN_HEIGHT,
    SCREEN_WIDTH
} from "../../utils/tools";
import strings from "../../resources/strings";
import {Toolbar} from '../../components/Toolbar';
import {InputWithClearButton, InputWithActionSheet, InputWithCalendar} from '../../components/multiFuncTextInput/index'
import ImagePickerViewer from "../../components/ImagePickerViewer";
import IntroDivider from '../../components/IntroDivider';
import constants from '../../resources/constants';
import * as DataActions from "../../actions/data-actions";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Button from "../../components/Button";
import Toast from 'react-native-root-toast';

var {height, width} = Dimensions.get('window');

const typeActionSheet = [strings.cancel,constants.TYPE_1,constants.TYPE_2,constants.TYPE_3,constants.TYPE_4];
export class EditData extends Component {

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
              rubro:'',
              presentacion:'',
              marca:'',
              tamano:'',
              codigo:'',
          },
          imgUrls:[],
      }
  }

    componentWillMount(){
        const data = this.props.data.get('data');
        const imgUrls = data.imgsurl && data.imgsurl.length>0 ?data.imgsurl.split(','):[];
        this.setState({goods:data, imgUrls:imgUrls})
    }

    componentWillReceiveProps(nextProps) {
        const Response = this.props.data.get('dataResponse');
        const nextResponse = nextProps.data.get('dataResponse');

        if (Response === constants.INITIAL && nextResponse === constants.EDIT_DATA_SUCCESS) {
            this.props.navigation.pop();
            this.props.dispatch(DataActions.resetResponse());
        }else if (Response === constants.INITIAL && nextResponse === constants.EDIT_DATA_FAIL){
            alert(strings.editDataFail);
            this.props.dispatch(DataActions.resetResponse());
        }
    }

    render() {
        return (
            <View style={{flex:1,alignItems:'center'}}>
                <Toolbar
                    title = "编辑数据"
                    actions = {[]}
                    isBack = {true}
                    navigation = {this.props.navigation}
                >
                    <KeyboardAwareScrollView style={{height:SCREEN_HEIGHT-{getHeaderHeight},width:SCREEN_WIDTH}}>
                        <ScrollView>
                        <IntroDivider intro={strings.details_intro}/>
                        {this._renderEditListItem()}
                        <IntroDivider intro={strings.imgurls_intro}/>
                        <ImagePickerViewer imgurls={this.state.imgUrls} />
                        <Button title={strings.confirm} onPress={this._onConfirmPress}/>
                        </ScrollView>
                    </KeyboardAwareScrollView>
                </Toolbar>
            </View>
        );
    }

    _renderEditListItem(){

      var data = this.props.data.get('data');

        return([
            <InputWithClearButton
                hookCanBeCleared
                title={strings.name}
                textInputEvent={{
                    defaultValue: data.name,
                    onChangeText: (value) => {
                        this.setState({goods:Object.assign(this.state.goods,{name: value})});
                    }}}
            />,
            <InputWithClearButton
                hookCanBeCleared
                title={strings.codigo}
                textInputEvent={{
                    defaultValue: data.codigo,
                    onChangeText: (value) => {
                        this.setState({goods:Object.assign(this.state.goods,{codigo: value})});
                    }}}
            />,
            <InputWithClearButton
                hookCanBeCleared
                title={strings.price}
                textInputEvent={{
                    keyboardType: 'numeric',
                    defaultValue: data.price + '',
                    onChangeText: (value) => {
                        this.setState({goods:Object.assign(this.state.goods,{price: value})});
                    }}}
            />,
            <InputWithCalendar
                title={strings.updatetime}
                date={data.updatetime}
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
                    defaultValue: data.presentacion,
                    onChangeText: (value) => {
                        this.setState({goods:Object.assign(this.state.goods,{presentacion: value})});
                    }}}
            />,
            <InputWithClearButton
                hookCanBeCleared
                title={strings.marca}
                textInputEvent={{
                    defaultValue: data.marca,
                    onChangeText: (value) => {
                        this.setState({goods:Object.assign(this.state.goods,{marca: value})});
                    }}}
            />,
            <InputWithClearButton
                hookCanBeCleared
                title={strings.tamano}
                textInputEvent={{
                    defaultValue: data.tamano,
                    onChangeText: (value) => {
                        this.setState({goods:Object.assign(this.state.goods,{tamano: value})});
                    }}}
            />
        ]);
    }

    _onConfirmPress = () => {if(this._validateData())this.props.dispatch(DataActions.editData(this.state.goods));}

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

export default connect(mapStateToProps)(EditData)
