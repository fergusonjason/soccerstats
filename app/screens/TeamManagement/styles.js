// /apps/screens/TeamManagement/styles.js
import {StyleSheet} from "react-native";

export default styles = StyleSheet.create({
    component: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    listArea: {

    },
    bottomButtonArea: {
        alignSelf: "center",
        position: 'absolute',
        bottom: 10
    },
    bottomButton: {
        padding:10,
        backgroundColor: '#202646',
        borderRadius: 10,
        alignSelf: "center",
        height: 50,
        width: 200,
        justifyContent: "center",
        bottom: 30
    },
    bottomButtonText: {
        fontSize:16,
        fontWeight: "bold",
        color: '#ffffff',
        textAlign: 'center'
    }
});