import React, { Component } from "react";
import { View} from "react-native";
import {withNavigation} from "react-navigation";

import MenuNavigationButton from "./../../components/MenuNavigationButton";
import styles from "./styles";

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
    
    /**
     * Render the HomeScreen component
     */
    render() {
        return (
            <View>
                <MenuNavigationButton label="New Game"  />
                <MenuNavigationButton label="Statistics" />
                <MenuNavigationButton label="League Management" target="DivisionManagementScreen" />
                <MenuNavigationButton label="Staff Management" target="StaffManagementScreen" />
                <MenuNavigationButton label="Settings"  />
            </View>
        );
    }
}

export default HomeScreen;