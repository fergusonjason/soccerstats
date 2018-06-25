import {createStackNavigator} from "react-navigation";

import HomeScreen from "./../screens/HomeScreen";
import DivisionManagementScreen from "./../screens/DivisionManagement";
import StaffManagementScreen from "./../screens/StaffManagement";
import EditStaffMemberScreen from "./../screens/EditStaffMemberScreen";
import AddStaffMemberScreen from "./../screens/AddStaffMember";
import AddDivisionScreen from "./../screens/AddDivision";
import TeamManagementScreen from "./../screens/TeamManagement";

// create the navigator

const Navigator = createStackNavigator({
    HomeScreen: {screen: HomeScreen, navigationOptions: {title: "Main Menu"}},
    DivisionManagementScreen: {screen: DivisionManagementScreen, navigationOptions: {title: "Division Management"}},
    StaffManagementScreen: {screen: StaffManagementScreen, navigationOptions: {title: "League Staff"}},
    EditStaffMemberScreen: {screen: EditStaffMemberScreen, navigationOptions: {title: "Edit Staff Member"}},
    AddStaffMemberScreen: {screen: AddStaffMemberScreen, navigationOptions: {title: "Add Staff Member"}},
    AddDivisionScreen: {screen: AddDivisionScreen, navigationOptions: {title: "Add Division"}},
    TeamManagementScreen: {screen: TeamManagementScreen, navigationOptions: {title: "Team Management"}}
});

export default Navigator;