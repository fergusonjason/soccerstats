import React, { Component } from "react";
import { View, Alert} from "react-native";
import {withNavigation} from "react-navigation";

import PortableButton from "./../../components/PortableButton";

import {giantButtonStyles} from "./../../styles/master";

/**
 * HomeScreen component definition
 * 
 * This component acts as the "main menu" for the application.
 * 
 * @author Jason
 */
class HomeScreen extends Component {

    static displayName = "HomeScreen";

    constructor(props) {
        super(props);
    }
    
    _clkAction = (target) => {
        switch (target) {
            case "New Game":
                Alert.alert("Not implemented",
                    "This component is not implemented",
                    [
                        {text: "Ok"}
                    ]
                );            
                break;
            case "Statistics":
                Alert.alert("Not implemented",
                    "This component is not implemented",
                    [
                        {text: "Ok"}
                    ]
                );              
                break;
            case "League Management":
                this.props.navigation.navigate("DivisionManagementScreen");
                break;
            case "Staff Management":
                this.props.navigation.navigate("StaffManagementScreen");
                break;
            case "Settings":
                this.props.navigation.navigate("SettingsScreen");
                break;
        }
    }

    /**
     * Render the HomeScreen component
     */
    render() {
        return (
            <View>
                <PortableButton defaultLabel="New Game"
                    onPress={()=>{this._clkAction("New Game")}}
                    onLongPress={()=>{}}
                    disabled={false} 
                    style={giantButtonStyles}/>
                <PortableButton defaultLabel="Statistics"
                    onPress={()=>{this._clkAction("Statistics")}}
                    onLongPress={()=>{}}
                    disabled={false} 
                    style={giantButtonStyles}/>                    
                <PortableButton defaultLabel="League Management"
                    onPress={()=>{this._clkAction("League Management")}}
                    onLongPress={()=>{}}
                    disabled={false} 
                    style={giantButtonStyles}/>          
                <PortableButton defaultLabel="Staff Management"
                    onPress={()=>{this._clkAction("Staff Management")}}
                    onLongPress={()=>{}}
                    disabled={false} 
                    style={giantButtonStyles}/>
                <PortableButton defaultLabel="Settings"
                    onPress={()=>{this._clkAction("Settings")}}
                    onLongPress={()=>{}}
                    disabled={false} 
                    style={giantButtonStyles}/>                    
            </View>
        );
    }
}

export default withNavigation(HomeScreen);