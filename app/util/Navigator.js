import {createStackNavigator} from "react-navigation";

import HomeScreen from "./../screens/HomeScreen";
import DivisionManagementScreen from "./../screens/LeagueManagement/DivisionManagement";
import StaffManagementScreen from "./../screens/StaffManagement";

// create the navigator

const Navigator = createStackNavigator({
    HomeScreen: {screen: HomeScreen, navigationOptions: {title: "Main Menu"}},
    DivisionManagementScreen: {screen: DivisionManagementScreen, navigationOptions: {title: "Division Management"}},
    StaffManagementScreen: {screen: StaffManagementScreen, navigationOptions: {title: "League Staff"}}
});

export default Navigator;