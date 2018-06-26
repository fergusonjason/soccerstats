import {StyleSheet} from "react-native";

export default styles = StyleSheet.create({
    component: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    text: {
        color: "black"
    },
    inputArea: {
        flexDirection: "column"
    },  
    bottomButtonArea: {
        alignSelf: "center",
        position: "absolute",
        bottom: 30
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