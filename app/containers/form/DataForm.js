/**
 * DataForm.js
 */

// 组件
import React, {Component} from "react";
import {Image, StatusBar, Text, TouchableOpacity, View, Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, ScrollView} from "react-native";
import {Toolbar} from '../../components/Toolbar';
import RefreshListView,{RefreshState} from '../../components/RefreshListView';
import NetworkingError from '../../components/NetworkingError';
import DataListItem from '../../components/DataListItem';

// 工具
import strings from "../../resources/strings";
import {isEmptyObject, isObject, getHeaderHeight} from "../../utils/tools";

// actions
import * as DataActions from "../../actions/data-actions";

// redux
import {connect} from "react-redux";

// 导航
import DataDetail from './DataDetail'

// 常量
import constants from "../../resources/constants";


export class DataForm extends Component {

  constructor(props) {
    super(props);
      this.state = {
          page: 1,
      };
  }

    componentDidMount() {
      // 对于变化不大的数据，初始从 缓存（持久化props） 中获取，减少网络请求延缓
      const datas = this.props.data.get('datas');
      if(datas == null || datas.length === 0)
      this.props.dispatch(DataActions.getDataList(1));
    }

    onHeaderRefresh = () => {
        this.props.dispatch(DataActions.getDataList(1));
        this.setState({ page: 1 });
    };

    onFooterRefresh = () => {
        this.props.dispatch(DataActions.getDataList(this.state.page + 1));
        this.setState(preState => ({ page: preState.page + 1 }));
    };

    componentWillReceiveProps(nextProps) {
        const Response = this.props.data.get('dataResponse');
        const nextResponse = nextProps.data.get('dataResponse');

        // componentWillReceiveProps 会导致该组件及其所有父组件都会收到nextProps
        // 且是自上而下的。因此应该对父组件与当前组件的事件分别单独处理
        // 尤其是父组件，不能影响子组件
        if (Response === constants.INITIAL && nextResponse === constants.DELETE_DATA_SUCCESS) {
            this.props.dispatch(DataActions.resetResponse());
        }else if (Response === constants.INITIAL && nextResponse === constants.DELETE_DATA_FAIL){
            alert(strings.deleteDataFail);
            this.props.dispatch(DataActions.resetResponse());
        }
    }

  render() {

      const datas = this.props.data.get('datas');
      const datasError = this.props.data.get('datasError');
      const refreshState = this.props.data.get('refreshState');

      const datasList = datas && datas.length>0?datas:[];

    return (
        <View style={dataFormStyles.container}>
            <Toolbar
                title = "表单列表"
                actions = {[
                    {icon:'md-add',show:'OPTION_SHOW'}
                ]}
                navigation = {this.props.navigation}
                onPress = {() => {this.props.navigation.push('AddData')}}
            >
                {datasError?
                    <NetworkingError retry={() => this.props.dispatch(DataActions.getDataList(this.state.page ))} />
                    :
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={getHeaderHeight} style={dataFormStyles.container}>
                        <SafeAreaView style={dataFormStyles.container}>
                            <RefreshListView
                                data={datasList}
                                footerEmptyDataText={strings.noData}
                                footerFailureText={strings.loadError}
                                footerNoMoreDataText={strings.noMore}
                                footerRefreshingText={strings.loading}
                                ItemSeparatorComponent={() => <View style={dataFormStyles.separator} />}
                                keyExtractor={(item, index) => `${index}`}
                                onFooterRefresh={this.onFooterRefresh}
                                onHeaderRefresh={this.onHeaderRefresh}
                                refreshState={refreshState}
                                renderItem={this.renderCell}
                                style={dataFormStyles.listView}
                            />
                        </SafeAreaView>
                    </KeyboardAvoidingView>
                }
            </Toolbar>
        </View>
        );
  }

    renderCell = ({ item, index }) => {

        // item:{{title:'',brief:'',URL:''}}
        const datas = this.props.data.get('datas');
        const data = datas[index];

        return (
            <DataListItem
                data={data}
                navigation={this.props.navigation}
                onDeleteBtnPress={() => this.onDeleteBtnPress(data.id)}
                onDetailPress={() => this.onDetailPress(data.id)}
            />
        );
    };

    onDeleteBtnPress = (id) => {this.props.dispatch(DataActions.deleteData(id))}
    onDetailPress = (id) => this.props.navigation.navigate('DataDetail',{id:id})

};

const dataFormStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    listView: {
        flex: 1,
        backgroundColor: 'white',
    },
    separator: {
        height: 0.5,
        backgroundColor: '#D5D5D5',
    },
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
    data: state.get('data'),
});

export default connect(mapStateToProps)(DataForm)
