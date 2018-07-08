import {createStackNavigator} from "react-navigation";

import HomeScreen from "./../screens/HomeScreen";
import DivisionManagementScreen from "./../screens/DivisionManagement";
import StaffManagementScreen from "./../screens/StaffManagement";
import EditStaffMemberScreen from "./../screens/EditStaffMemberScreen";
import AddStaffMemberScreen from "./../screens/AddStaffMember";
import AddDivisionScreen from "./../screens/AddDivision";
import TeamManagementScreen from "./../screens/TeamManagement";
import EditDivisionScreen from "./../screens/EditDivision";
import AddTeamScreen from "./../screens/AddTeam";
import EditTeamScreen from "./../screens/EditTeam";

// create the navigator

const Navigator = createStackNavigator({
    HomeScreen: {screen: HomeScreen, navigationOptions: {title: "Main Menu"}},
    DivisionManagementScreen: {screen: DivisionManagementScreen, navigationOptions: {title: "Division Management"}},
    StaffManagementScreen: {screen: StaffManagementScreen, navigationOptions: {title: "League Staff"}},
    EditStaffMemberScreen: {screen: EditStaffMemberScreen, navigationOptions: {title: "Edit Staff Member"}},
    AddStaffMemberScreen: {screen: AddStaffMemberScreen, navigationOptions: {title: "Add Staff Member"}},
    AddDivisionScreen: {screen: AddDivisionScreen, navigationOptions: {title: "Add Division"}},
    TeamManagementScreen: {screen: TeamManagementScreen, navigationOptions: {title: "Team Management"}},
    EditDivisionScreen: {screen: EditDivisionScreen, navigationOptions: {title: "Edit Division"}},
    AddTeamScreen: {screen: AddTeamScreen, navigationOptions: {title: "Add Team"}},
    EditTeamScreen: {screen: EditTeamScreen, navigationOptions: {title: "Edit Team"}}
});

export default Navigator;