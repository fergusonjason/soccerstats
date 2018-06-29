import React, {Component} from "react";
import {View, TouchableHighlight, TouchableNativeFeedback, Text} from "react-native";

import listItemStyles from "./../styles/ListItemStyles";

class ListItemButton extends Component {

    constructor(props) {
        super(props);
    }

    _androidButton = () => {
        return (
            <TouchableNativeFeedback
                onPress={() => this.props.onPress()}
                background={TouchableNativeFeedback.Ripple("#202646", true)}>
                <View style={listItemStyles.buttonStyle}>
                    <Text style={listItemStyles.buttonText}>{this.props.label}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    _iosButton = () => {
            <TouchableHighlight
                onPress={() => this.props.onPress()}>
                <View style={listItemStyles.buttonStyle}>
                    <Text style={listItemStyles.buttonText}>{this.props.label}</Text>
                </View>
            </TouchableHighlight>
    }

    _unsupported = () => {

    }

    render() {

        switch (Platform.OS) {
            case "android":
                return this._androidButton();
            case "ios":
                return this._androidButton();
            default:
                return this._unsupported();
        }
      
    }
}

ListItemButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default ListItemButton;