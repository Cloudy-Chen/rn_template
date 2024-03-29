import React from 'react';
import {View, Image, StyleSheet, TextInput, ViewPropTypes, Text, TouchableOpacity, PanResponder} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../resources/colors';
import {SCREEN_WIDTH} from "../utils/tools";
import constants from "../resources/constants";

var _moveLeft = 0;
var _moveTop = 0;

export default class SwipeableView extends React.PureComponent {
  static propTypes = {
    pictureUrl: PropTypes.string || null,
    onDownSwipe: PropTypes.function || null,
    onUpSwipe: PropTypes.function || null,
    onLeftSwipe: PropTypes.function || null,
    onRightSwipe: PropTypes.function || null,
  };

  constructor(props){
    super(props);
    this.state={

    };
    this.onStartShouldSetPanResponder=this.onStartShouldSetPanResponder.bind(this);
    this.onMoveShouldSetPanResponder=this.onMoveShouldSetPanResponder.bind(this);
    this.onPanResponderGrant=this.onPanResponderGrant.bind(this);
    this.onPanResponderMove=this.onPanResponderMove.bind(this);
    this.onPanResponderEnd=this.onPanResponderEnd.bind(this);
  }

  //用户开始触摸屏幕的时候，是否愿意成为响应者；
  onStartShouldSetPanResponder(evt, gestureState){return true;}

  //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
  onMoveShouldSetPanResponder(evt, gestureState){return true ;}

  // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
  onPanResponderGrant(evt, gestureState){
    console.log('onPanResponderGrant...');
  }

  // 最近一次的移动距离为gestureState.move{X,Y}
  onPanResponderMove(evt, gestureState){
    _moveLeft = gestureState.dx;
    _moveTop = gestureState.dy;
  }

  // 用户放开了所有的触摸点，且此时视图已经成为了响应者。一般来说这意味着一个手势操作已经成功完成。
  onPanResponderEnd(evt, gestureState){
    this._handleSwipeEvent();
  }

  _handleSwipeEvent(){
    if(_moveLeft < -30 && this.props.onLeftSwipe)this.props.onLeftSwipe();
    if(_moveLeft > 30 && this.props.onRightSwipe)this.props.onRightSwipe();
    if(_moveTop < -30 && this.props.onUpSwipe)this.props.onUpSwipe();
    if(_moveTop > 30 && this.props.onDownSwipe)this.props.onDownSwipe();
  }

  componentWillMount(evt, gestureState){
    this._panResponder=PanResponder.create({
      onStartShouldSetPanResponder:this.onStartShouldSetPanResponder,
      onMoveShouldSetPanResponder:this.onMoveShouldSetPanResponder,
      onPanResponderGrant:this.onPanResponderGrant,
      onPanResponderMove:this.onPanResponderMove,
      onPanResponderRelease:this.onPanResponderEnd,
      onPanResponderTerminate:this.onPanResponderEnd,
    });
  }

  render() {
    var {_moveLeft, _moveTop} = this.state;

    return (
        <View style={styles.container} {...this._panResponder.panHandlers}>
          <Text style={styles.textStyle}>{_moveLeft}</Text>
          <Text style={styles.textStyle}>{_moveTop}</Text>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    height:50,
    width:50,
    justifyContent:'center',
    alignItems: 'center',
  },
  buttonStyle:{
    borderRadius:5,
    backgroundColor:colors.primaryColor,
    width: 200,
    height:40,
    justifyContent:'center',
    alignItems:'center',
  },
  textStyle: {
    color:'#fff',
    fontSize:18
  },
});
