import Spinner from 'react-native-loading-spinner-overlay';
import CommonLoading from './CommonLoading';
import React from "react";

export default class SpinnerWrapper extends React.PureComponent {

    render() {

        const {loading} = this.props;

        return (
            <Spinner
                customIndicator={<CommonLoading hideBackground top={Platform.OS === 'ios' ? 185 : 141} />}
                overlayColor="rgba(0, 0, 0, 0)"
                size="large"
                visible={loading}
            />
        );
    }
}
