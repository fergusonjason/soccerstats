// /apps/screens/TeamManagement/styles.js
import {StyleSheet} from "react-native";

portableButtonStyles = StyleSheet.create({
    buttonStyle: {
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: '#202646',
        width: 75,
        height: 25,
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 10
    },
    buttonText: {
        fontSize:14,
        color: '#ffffff',
        alignSelf: "center"
       
    }
});

bigButtonStyles = StyleSheet.create({
    buttonStyle: {
        justifyContent: "center",
        backgroundColor: '#202646',
        width: 200,
        height: 50,
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 10
    },
    buttonText: {
        fontSize:20,
        color: '#ffffff',
        alignSelf: "center"
    }
})

export {portableButtonStyles, bigButtonStyles};

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