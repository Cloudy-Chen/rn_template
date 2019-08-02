import React from 'react';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native';

export default class CommonLoading extends React.PureComponent {
  render() {
    const { width } = require('Dimensions').get('window');
    return (
      <View style={[styles.common, !this.props.hideBackground ? styles.wrapper : null, { top: this.props.top ? this.props.top : (width * 3) / 5 }]}>
        <ActivityIndicator color="#B5D507" size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  common: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  wrapper: {
    backgroundColor: 'white',
    width: 64,
    height: 64,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { h: 5, w: 5 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 3,
  },
});
