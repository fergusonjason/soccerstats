// /app/screens/DivisionManagement/DivisionManagementRow.js
import React, {Component} from "react";
import {View, Text} from "react-native";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";

import {rowStyles} from "./../../styles/master";

import PortableButton from "./../../components/PortableButton";
import {portableButtonStyles} from "./styles";

class DivisionManagementRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={rowStyles.rowComponent}>
                <Text style={rowStyles.rowTextSection}>{this.props.divisionName}</Text>
                <View style={rowStyles.rowButtonSection}>
                    <PortableButton defaultLabel="Teams"
                        onPress={() => {this.props.onAddTeam()}}
                        style={portableButtonStyles}
                        disabled={false} />
                    <PortableButton defaultLabel="Edit"
                        onPress={() => {this.props.onEdit()}}
                        style={portableButtonStyles}
                        disabled={false} />
                    <PortableButton defaultLabel="Delete"
                        onPress={() => {this.props.onDelete()}}
                        style={portableButtonStyles}
                        disabled={false} />
                </View>
            </View>
        );
    }
}

DivisionManagementRow.propTypes = {
    divisionId: PropTypes.number.isRequired,
    divisionName: PropTypes.string.isRequired,
    onAddTeam: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}


// TODO: is withNavigation still needed?
export default withNavigation(DivisionManagementRow);