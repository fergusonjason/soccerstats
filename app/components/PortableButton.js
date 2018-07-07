import React, {Component} from "react";
import {View, TouchableNativeFeedback, TouchableHighlight, Text, Platform, StyleSheet} from "react-native";
import PropTypes from "prop-types";

class PortableButton extends Component {

    constructor(props) {
        super(props);
    }

    _iosButton = () => {
        return (
            <TouchableHighlight
                disabled={this.props.disabled}
>
                <View style={this.props.style.buttonStyle}>
                    <Text style={this.props.style.buttonText}>{this.props.defaultLabel}</Text>
                </View>
            </TouchableHighlight>
        );

    }

    _androidButton = () => {
        return (
            <TouchableNativeFeedback
                disabled={this.props.disabled}
                onPress={()=>this.props.onPress()}
                background={TouchableNativeFeedback.Ripple("#202646", true)}>
                <View style={this.props.style.buttonStyle}>
                    <Text style={this.props.style.buttonText}>{this.props.defaultLabel}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    render() {
        switch (Platform.OS) {
            case "ios":
                return this._iosButton();
            case "android":
            default:
                return this._androidButton();
        }

    }
}

PortableButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    onLongPress: PropTypes.func,
    defaultLabel: PropTypes.string.isRequired,
    altLabel: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    style: PropTypes.shape({
        buttonStyle: PropTypes.object.isRequired,
        buttonText: PropTypes.object.isRequired
        })
}

export default PortableButton;