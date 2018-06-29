import React, {Component} from "react";
import {View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, TouchableHighlight, Text, Platform} from "react-native";
import {withNavigation} from "react-navigation";

/**
 * Reuseable component to render a button that will navigator to a new
 * screen
 * 
 * @author Jason
 */
class MenuNavigationButton extends Component {

    /**
     * @constructor
     * @param {object} props - properties passed to component
     */
    constructor(props) {
        super(props);
    }


    /**
     * Event handler to handle button press event
     */
    _clkOnPress = () => {
        
        if (this.props.onTransition) {
            this.props.onTransition();
        }
        
        if (this.props.targetId) {
            this.props.navigation.navigate(this.props.target, {id: this.props.targetId});
        } else {
            this.props.navigation.navigate(this.props.target);
        }

    }


    _androidButton = () => {
        return (
            <TouchableNativeFeedback
                onPress={() => this._clkOnPress()}
                background={TouchableNativeFeedback.Ripple("#202646", true)}>
                <View style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>{this.props.label}</Text>
                </View>
            </TouchableNativeFeedback>
          
        )
    }

    _iosButton = () => {
        return (
            <TouchableHighlight
                onPress={() => this._clkOnPress()}>
                <View style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>{this.props.label}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    /**
     * Render component
     */
    render() {
        if (Platform.OS === "android") {
            return this._androidButton();
        } else {
            return this._iosButton();
        }
    }
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

  export default withNavigation(MenuNavigationButton);