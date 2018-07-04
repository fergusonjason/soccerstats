import React, {Component} from "react";
import {View, TouchableNativeFeedback, TouchableHighlight, Text, Platform, StyleSheet} from "react-native";
import PropTypes from "prop-types";

class PortableButton extends Component {

    constructor(props) {
        super(props);
    }

    _iosButton = (label) => {
        console.log("Entered _iosButton");
        return (
            <TouchableHighlight
                disabled={this.props.disabled}
>
                <View style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>{label}</Text>
                </View>
            </TouchableHighlight>
        );

    }

    _androidButton = (label) => {
        return (
            <TouchableNativeFeedback
                disabled={false}
                onPress={()=>this.props.onPress()}
                background={TouchableNativeFeedback.Ripple("#202646", true)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{this.props.defaultLabel}</Text>
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
    disable: PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
    buttonStyle: {
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: '#202646',
        width: 75,
        height: 25,
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 10
    },
    buttonText: {
        fontSize:14,
        color: '#ffffff',
        alignSelf: "center"
       
    }
});

export default PortableButton;