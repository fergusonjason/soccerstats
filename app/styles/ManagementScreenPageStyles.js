import {StyleSheet} from "react-native";

export default managementPageStyles = StyleSheet.create({
    component: {
        flex: 1,
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "green"
    },
    listArea: {
        flexDirection: "row"
    },
    bottomButtonArea: {
        alignSelf: "center",
        position: "absolute",
        bottom: 30,
        top: 0
    },
    bottomButton: {
        padding:10,
        backgroundColor: '#202646',
        borderRadius: 10,
        alignSelf: "center",
        width: 200,
        justifyContent: "center"
    },
    bottomButtonText: {
        fontSize:16,
        color: '#ffffff',
        textAlign: 'center'
    }
});