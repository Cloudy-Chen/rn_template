/**
 * DataDetail
 */

import React, {Component} from "react";
import {Image, StatusBar, Text, TouchableOpacity, View, ScrollView, StyleSheet} from "react-native";
import {connect} from "react-redux";
import strings from "../../resources/strings";
import ZoomableImageViewer from '../../components/ZoomableImageViewer';
import {Toolbar, ACTION_EDIT, OPTION_SHOW} from "../../components/Toolbar";
import {InformationItem, TYPE_AVATAR, TYPE_TEXT} from '../../components/InformationItem';
import IntroDivider from '../../components/IntroDivider';
import * as DataActions from "../../actions/data-actions";
import {_switchrubroIdxTorubro, isEmptyObject, isObject} from "../../utils/tools";
import constants from "../../resources/constants";

const imgUrls = [];

export class DataDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            goods:{
                id:'',
                name:'',
                brief:'',
                price:'',
                imgsurl:[],
                thumburl:'',
                updatetime:'',
                rubroIdx:0,
                rubro:'',
                presentacion:'',
                marca:'',
                tamano:'',
                codigo:'',
            }
        }
    }

    componentWillMount(): void {
        const id = this.props.navigation.state.params.id;
        this.props.dispatch(DataActions.getDataDetails(id));
    }

    componentWillReceiveProps(nextProps) {
        const Response = this.props.data.get('dataResponse');
        const data = this.props.data.get('data');
        const nextResponse = nextProps.data.get('dataResponse');

        if (Response === constants.INITIAL && nextResponse === constants.GET_DATA_DETAIL_SUCCESS) {
            this.setState({goods:data})
            this.props.dispatch(DataActions.resetResponse());
        }else if (Response === constants.INITIAL && nextResponse === constants.GET_DATA_DETAIL_FAIL){
            alert(strings.getDataDetailFail);
            this.props.dispatch(DataActions.resetResponse());
        }
    }

    render() {

        const data = this.props.data.get('data');
        const imgUrls = data.imgsurl && data.imgsurl.length>0 ?data.imgsurl.split(','):[];

        return (
                <Toolbar
                    title="数据详情"
                    actions={[{icon: ACTION_EDIT, show: OPTION_SHOW}]}
                    onPress={this._onEditPress}
                    isBack={true}
                    navigation={this.props.navigation}>
                    <ScrollView style={styles.container}>
                    <IntroDivider intro={strings.imgurls_intro}/>
                    <ZoomableImageViewer imgurls={imgUrls} />
                    <IntroDivider intro={strings.details_intro}/>
                    {this._renderInformationListItem(data)}
                    </ScrollView>
                </Toolbar>
        );
    }

    _onEditPress = () => this.props.navigation.navigate('EditData');

    // 商品相关信息列表
    _renderInformationListItem(data){
        return([
                <InformationItem key = {0} type = {TYPE_TEXT} title = {strings.name} content = {data.name}/>,
                <InformationItem key = {1} type = {TYPE_TEXT} title = {strings.codigo} content = {data.codigo} />,
                <InformationItem key = {2} type = {TYPE_TEXT} title = {strings.price} content = {data.price} />,
                <InformationItem key = {3} type = {TYPE_TEXT} title = {strings.updatetime} content = {data.updatetime} />,
                <InformationItem key = {4} type = {TYPE_TEXT} title = {strings.rubro} content = {_switchrubroIdxTorubro(data.rubro)} />,
                <InformationItem key = {5} type = {TYPE_TEXT} title = {strings.presentacion} content = {data.presentacion} />,
                <InformationItem key = {6} type = {TYPE_TEXT} title = {strings.marca} content = {data.marca} />,
                <InformationItem key = {7} type = {TYPE_TEXT} title = {strings.tamano} content = {data.tamano} />,
            ]);}
}

var styles = StyleSheet.create({
    container:{
        flex:1,
    },
})

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
    data: state.get('data'),
});

export default connect(mapStateToProps)(DataDetail)
