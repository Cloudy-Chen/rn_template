import React from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {
  SCREEN_HEIGHT,
} from '../utils/tools';

const icons = {
  recordingPrompt: require('../assets/img/micro_recording.gif')
};

export default class RecordingModal extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool,
    showCancel: PropTypes.bool,
    language: PropTypes.string.isRequired,
  };

  static defaultProps = {
    show: false,
    showCancel: false,
  };

  render() {
    const {
      show
    } = this.props;

    return (
      <Modal
        animationIn="bounceIn"
        animationInTiming={10}
        animationOut="bounceOut"
        animationOutTiming={10}
        backdropColor="transparent"
        backdropTransitionInTiming={0}
        backdropTransitionOutTiming={0}
        isVisible={show}
        style={styles.modal}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={icons.recordingPrompt}
            style={styles.image}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex:1,
    marginTop: 0,
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageWrapper:{flex:1,justifyContent:'center',alignItems:'center'},
  image: {
    height: 132,
    width: 132,
  },
});
