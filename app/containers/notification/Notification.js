/**
 * Notification.js
 */

import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, Text, View, FlatList, ListView} from "react-native";
import {connect} from "react-redux";
import {Toolbar} from "../../components/Toolbar";
import Stomp from '../../utils/stomp';
import Toast from 'react-native-root-toast';
import strings from "../../resources/strings";
import colors from '../../resources/colors';
import { ListItem } from 'react-native-elements';
import * as NotificationAction from "../../actions/notification-actions";
import {getNow} from '../../utils/tools';

const max_notifications = 9;

let ref;
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export class Notification extends Component {

    constructor(props) {
        super(props);
        this.state={
            notifications:[],
        };
        ref = this;
    }

    componentWillMount() {
        this.websocket();
    }

    componentWillUnmount(): void {
        this.peer.close()
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar title = "通知" actions = {[]} navigation = {this.props.navigation}>
                    {this._renderNotificationList()}
                </Toolbar>
            </View>);
    }

    _renderNotificationList(){
        const notifications = this.props.notification.get("notifications");

        return(
        <View style={styles.listViewWrapper}>
            <ListView
                style={styles.listView}
                automaticallyAdjustContentInsets={false}
                dataSource={ds.cloneWithRows(notifications)}
                renderRow={this._renderItem}
            />
        </View>);
    }

    _renderItem = (rowData,sectionId,rowId) => {
        return (
            <ListItem
                style={styles.listItemStyle}
                key={rowId}
                title={'警报 '+rowId}
                subtitle={rowData}
                rightSubtitle={getNow()}
                rightSubtitleStyle={{fontSize:12}}
                leftIcon={{name:'md-alert',type:'ionicon',color:colors.brightRed}}
            />
        );
    };

    websocket(){
        this.peer = new WebSocket('ws://58.56.251.230:15674/ws')
        const client = Stomp.Stomp.over(this.peer)
        const on_connect = function() {
            client.subscribe('/exchange/jt808/location', function(message) {
                const msg = JSON.parse(message.body);
                ref._judgeAlarmType(msg);
            })
        };
        const on_error = function() {console.log('error')};
        client.connect('admin', 'admin', on_connect, on_error, 'jt808');
    }

    _judgeAlarmType(notification){
        const amount = this.props.notification.get("amount");
        if(amount > max_notifications){this.props.dispatch(NotificationAction.resetNotification());return;}

        var noti = '';
        noti = notification.overSpeeding?strings.overSpeeding:noti;
        noti = notification.overTired?strings.overTired:noti;
        noti = notification.dangeous?strings.dangeous:noti;
        noti = notification.cameraFault?strings.cameraFault:noti;
        noti = notification.driveTimeout?strings.driveTimeout:noti;
        noti = notification.parkingOvertime?strings.parkingOvertime:noti;
        noti = notification.roadTimeout?strings.roadTimeout:noti;
        noti = notification.roadFault?strings.roadFault:noti;
        noti = notification.vehicleOilException?strings.vehicleOilException:noti;
        noti = notification.vehicleTheft?strings.vehicleTheft:noti;
        noti = notification.vehicleIllegalIgnition?strings.vehicleIllegalIgnition:noti;
        noti = notification.vehicleIllegalShift?strings.vehicleIllegalShift:noti;
        noti = notification.collisionWarning?strings.collisionWarning:noti;
        noti = notification.rolloverWarning?strings.rolloverWarning:noti;
        noti = notification.illegalOpenDoor?strings.illegalOpenDoor:noti;
        noti = notification.isLocation?strings.isLocation:noti;
        noti = notification.speeding?strings.speeding:noti;
        noti = notification.tired?strings.tired:noti;
        noti = notification.throughArea?strings.throughArea:noti;
        noti = notification.throughRoad?strings.throughRoad:noti;
        noti = notification.vehicleOil?strings.vehicleOil:noti;
        noti = notification.vehicleCircut?strings.vehicleCircut:noti;
        noti = notification.doorLock?strings.doorLock:noti;
        noti = notification.GPS?strings.GPS:noti;
        noti = notification.beidou?strings.beidou:noti;

        this._showToast(noti);
        this.props.dispatch(NotificationAction.addNotification(noti));
    }

    _showToast(message){Toast.show(message, {duration: Toast.durations.SHORT,position: Toast.positions.BOTTOM,});}
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },
    listViewWrapper:{
        flex:1,
    },
    listView:{
        flex:1,
    },
    listItemStyle:{
        flex:1,
        borderBottomWidth: 0.8,
        borderColor: colors.saperatorLine
    }
});

const mapStateToProps = (state) => ({
    auth: state.get('auth'),
    root: state.get('root'),
    notification: state.get('notification'),
});

export default connect(mapStateToProps)(Notification)
