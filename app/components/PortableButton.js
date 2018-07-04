import React, {Component} from "react";
import {View, TouchableNativeFeedback, TouchableHighlight, Text, PlatForm} from "react-native";
import PropTypes from "prop-types";

class PortableButton extends Component {

    constructor(props) {
        super(props);
    }

    _iosButton = (label) => {
        return (
            <TouchableHighlight
                onPress={() => this._onPress()}
                onLongPress={() => this._onLongPress()}>
                <View style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>{label}</Text>
                </View>
            </TouchableHighlight>
        );

    }

    _androidButton = (label) => {
        <TouchableNativeFeedback
            onPress={() => this._onPress()}
            onLongPress={()=> this._onLongPress()}
            background={TouchableNativeFeedback.Ripple("#202646", true)}>
            <View style={styles.buttonStyle}>
                <Text style={styles.textStyle}>{label}</Text>
            </View>
        </TouchableNativeFeedback>
    }

    render() {
        switch (Platform.OS) {
            case "ios":
                return this._iosButton;
            case "android":
            default:
                return this._androidButton;
        }

    }
}

PortableButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    onLongPress: PropTypes.func,
    defaultLabel: PropTypes.string.isRequired,
    altLabel: PropTypes.string,
    enabled: PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize:20,
        color: '#ffffff',
        textAlign: 'center'
      },
      
      buttonStyle: {
        padding:10,
        backgroundColor: '#202646',
        borderRadius:5,
        marginVertical: 20,
        marginHorizontal: 20
      }
});

export default PortableButton;