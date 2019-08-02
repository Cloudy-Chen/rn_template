/**
 * Charts.js
 * 用于显示数据的
 */

import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, Text, View, ScrollView} from "react-native";
import {connect} from "react-redux";
import {Toolbar} from "../../components/Toolbar";
import {LineAndBarCharts, constants, PieCharts, LineAndBarTables, PieTables} from "../../components/WebEchartsCard/index";
import {DropdownCell } from '../../components/modalDropdownBar/index';
import charts from "../../test/charts";
import colors from "../../resources/colors";
import strings from "../../resources/strings";

const addressList = ['中国','日本','美国'];
const timeList = ['1月','2月','3月'];
const typeList = ['食物','服饰','生活'];

export class Chart extends Component {

  constructor(props) {
    super(props);
    this.state={
        chartType: constants.LINE_CHART
    };
  }

  render() {

    var {chartType} = this.state;

    return (
        <View style={styles.container}>
            <Toolbar
                title = "图表统计"
                actions = {[
                    {value: constants.LINE_CHART, show: 'OPTION_NEVER'},
                    {value: constants.BAR_CHART, show: 'OPTION_NEVER'},
                    {value: constants.PIE_CHART, show: 'OPTION_NEVER'},
                ]}
                navigation = {this.props.navigation}
                onPress = {(i) => {this._onChartOption(i)}}>
                <ScrollView>
                <View style={styles.dropdownbarStyle}>
                    <DropdownCell dataList={addressList} defaultValue={strings.address} onDropDownSelect = {this._onAddressDropdownCell}/>
                    <DropdownCell dataList={timeList} defaultValue={strings.time} onDropDownSelect = {this._onTimeDropdownCell}/>
                    <DropdownCell dataList={typeList} defaultValue={strings.type} onDropDownSelect = {this._onTypeDropdownCell}/>
                </View>
                    {chartType == constants.LINE_CHART ? this._renderLineChart():null}
                    {chartType == constants.BAR_CHART? this._renderBarChart():null}
                    {chartType == constants.PIE_CHART? this._renderPieChart():null}
                </ScrollView>
            </Toolbar>
        </View>);
  }

      _onChartOption(i){
          switch(i){
            case 0:this.setState({chartType:constants.LINE_CHART});break;
            case 1:this.setState({chartType:constants.BAR_CHART});break;
            case 2:this.setState({chartType:constants.PIE_CHART});break;
      }
  }

    _renderLineChart(){
      return (
          [
              <LineAndBarCharts
              title = {'折线图统计'}
              xAxisList = {constants.months}
              data1 = {charts.data1}
              data2 = {charts.data2}
              />,
              <LineAndBarTables
              xAxisList = {constants.months}
              data1 = {charts.data1}
              data2 = {charts.data2}
              />
          ]
      );
    }

    _renderBarChart(){
        return (
            [
                <LineAndBarCharts
                    title = {'柱状图统计'}
                    xAxisList = {constants.months}
                    data1 = {charts.data3}
                    data2 = {charts.data4}
                />,
                <LineAndBarTables
                    xAxisList = {constants.months}
                    data1 = {charts.data3}
                    data2 = {charts.data4}
                />
            ]
        );
    }

    _renderPieChart(){
        return (
            [
                <PieCharts
                    title = {'饼状图统计'}
                    name = {charts.data5.name}
                    data = {charts.data5.data}
                />,
                <PieTables
                data = {charts.data5.data}
                />
            ]
        );
    }

    _onAddressDropdownCell = (idx, value) => {}
    _onTimeDropdownCell = (idx, value) => {}
    _onTypeDropdownCell = (idx, value) => {}

};

const styles = StyleSheet.create({
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
    dropdownbarStyle:{
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: colors.primaryGrayLight,
    }
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
});

export default connect(mapStateToProps)(Chart)
