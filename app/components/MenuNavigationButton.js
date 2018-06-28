import React, {Component} from "react";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {withNavigation} from "react-navigation";

// TODO: Import only the functions I'm actually using
import _ from "lodash";

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



    /**
     * Render component
     */
    render() {
        return (
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this._clkOnPress}>
                <Text style={styles.textStyle}>{this.props.label}</Text>
            </TouchableOpacity>
        );
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