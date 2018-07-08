import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";

import PortableButton from "./../../components/PortableButton";

import {rowStyles, portableButtonStyles} from "./../../styles/master";

class TeamManagementRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teamId: this.props.navigation.getParam("teamId")
        }
    }

    render() {
        return(
            <View style={rowStyles.rowComponent}>
                <View style={rowStyles.rowTextSection}>
                    <Text>{this.props.teamName}</Text>
                </View>
                <View style={rowStyles.rowButtonSection}>
                    <PortableButton defaultLabel="Players"
                        disabled={false}
                        onPress={() => {this.props.onPlayers()}}
                        style={portableButtonStyles}
                        />
                    <PortableButton defaultLabel="Edit"
                        disabled={false}
                        onPress={() => {this.props.onEdit(this.state.teamId)}} 
                        style={portableButtonStyles}
                        />
                    <PortableButton defaultLabel="Delete"
                        disabled={false}
                        onPress={() => {this.props.onDelete()}}
                        style={portableButtonStyles}
                        />
                </View>
            </View>
        );
    }
}

TeamManagementRow.propTypes = {
    onPlayers: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    teamName: PropTypes.string.isRequired
}

export default withNavigation(TeamManagementRow);