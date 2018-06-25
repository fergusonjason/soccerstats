import {createStackNavigator} from "react-navigation";

import HomeScreen from "./../screens/HomeScreen";
import DivisionManagementScreen from "./../screens/LeagueManagement/DivisionManagement";
import StaffManagementScreen from "./../screens/StaffManagement";
import EditStaffMemberScreen from "./../screens/EditStaffMemberScreen";
import AddStaffMemberScreen from "./../screens/AddStaffMember";

// create the navigator

const Navigator = createStackNavigator({
    HomeScreen: {screen: HomeScreen, navigationOptions: {title: "Main Menu"}},
    DivisionManagementScreen: {screen: DivisionManagementScreen, navigationOptions: {title: "Division Management"}},
    StaffManagementScreen: {screen: StaffManagementScreen, navigationOptions: {title: "League Staff"}},
    EditStaffMemberScreen: {screen: EditStaffMemberScreen, navigationOptions: {title: "Edit Staff Member"}},
    AddStaffMemberScreen: {Screen: AddStaffMemberScreen, navigationOptions: {title: "Add Staff Member"}}
});

export default Navigator;