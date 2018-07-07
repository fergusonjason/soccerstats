import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";

import PortableButton from "./../../components/PortableButton";

import {rowStyles, portableButtonStyles} from "./../../styles/master";

class StaffManagementRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        };
    }

    render() {
        return (
            <View style={rowStyles.rowComponent}>
                <View style={rowStyles.rowTextSection}>
                    <Text style={styles.text}>{this.props.staffMember.STAFF_NAME}</Text>
                </View>
                <View style={rowStyles.rowButtonSection}>
                    <PortableButton defaultLabel="Edit"
                        onPress={()=>this.props.onEdit()}
                        onLongPress={()=>{}}
                        style={portableButtonStyles}
                        disabled={false} />
                    <PortableButton defaultLabel="Delete"
                        onPress={()=>{this.props.onDelete()}}
                        onLongPress={()=>{}}
                        style={portableButtonStyles}
                        disabled={false} />
                </View>
            </View>
        );
    }
}

StaffManagementRow.propTypes = {
    staffMember: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    text: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        fontWeight: "bold",
        height: 50}
});

export default withNavigation(StaffManagementRow);