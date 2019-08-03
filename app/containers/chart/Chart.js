/**
 * Charts.js
 * 用于显示数据的
 */

import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, Text, View, ScrollView} from "react-native";
import {connect} from "react-redux";
import {Toolbar} from "../../components/Toolbar";
import {DropdownCell } from '../../components/modalDropdownBar/index';
import charts from "../../test/charts";
import colors from "../../resources/colors";
import strings from "../../resources/strings";
import {LineAndBarCards,PieCards} from "../../components/WebEchartsCard/index";
import constants from '../../resources/constants';
import chartConstants from '../../components/WebEchartsCard/js/constants';

export class Chart extends Component {

  constructor(props) {
    super(props);
    this.state={
        chartType: chartConstants.LINE_CHART
    };
  }

  render() {

    var {chartType} = this.state;

    return (
        <View style={styles.container}>
            <Toolbar
                title = "图表统计"
                actions = {[
                    {value: chartConstants.LINE_CHART, show: 'OPTION_NEVER'},
                    {value: chartConstants.BAR_CHART, show: 'OPTION_NEVER'},
                    {value: chartConstants.PIE_CHART, show: 'OPTION_NEVER'},
                ]}
                navigation = {this.props.navigation}
                onPress = {(i) => {this._onChartOption(i)}}>
                <ScrollView>
                <View style={styles.dropdownbarStyle}>
                    <DropdownCell dataList={constants.ADRESS_DROP_DOWN} defaultValue={strings.address} onDropDownSelect = {this._onAddressDropdownCell}/>
                    <DropdownCell dataList={constants.TIME_DROP_DOWN} defaultValue={strings.time} onDropDownSelect = {this._onTimeDropdownCell}/>
                    <DropdownCell dataList={constants.TYPE_DROP_DOWN} defaultValue={strings.type} onDropDownSelect = {this._onTypeDropdownCell}/>
                </View>
                    {chartType === chartConstants.LINE_CHART ? this._renderLineChart():null}
                    {chartType === chartConstants.BAR_CHART? this._renderBarChart():null}
                    {chartType === chartConstants.PIE_CHART? this._renderPieChart():null}
                </ScrollView>
            </Toolbar>
        </View>);
  }

      _onChartOption(i){
          switch(i){
            case 0:this.setState({chartType:chartConstants.LINE_CHART});break;
            case 1:this.setState({chartType:chartConstants.BAR_CHART});break;
            case 2:this.setState({chartType:chartConstants.PIE_CHART});break;
      }
  }

    _renderLineChart(){
      return (<LineAndBarCards title={strings.title_line_chart} xAxisList={chartConstants.months} data1={charts.data1} data2={charts.data2}/>);}

    _renderBarChart(){
      return (<LineAndBarCards title={strings.title_bar_chart} xAxisList={chartConstants.months} data1={charts.data3} data2={charts.data4}/>);}

    _renderPieChart(){
      return (<PieCards title={strings.title_pie_chart} name={charts.data5.name} data={charts.data5.data}/>);}

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
