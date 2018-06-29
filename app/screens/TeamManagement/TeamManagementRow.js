import React, {Component} from "react";
import {View, TouchableOpacity, Text} from "react-native";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";

import listItemStyles from "./../../styles/ListItemStyles";

class TeamManagementRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teamId: this.props.navigation.getParam("teamId")
        }
    }

    render() {
        return(
            <View styles={listItemStyles.component}>
                <Text styles={listItemStyles.text}>{this.props.teamName}</Text>
                <View>
                    <TouchableOpacity style={listItemStyles.button}
                        onPress={() => {this.props.onPlayers()}}>
                        <Text style={listItemStyles.buttonText}>Players</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={listItemStyles.button}
                        onPress={() => {this.props.onEdit()}}>
                        <Text style={listItemStyles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={listItemStyles.button}
                        onPress={() => {this.props.onDelete()}}>
                        <Text style={listItemStyles.buttonText}>Delete</Text>
                    </TouchableOpacity>
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