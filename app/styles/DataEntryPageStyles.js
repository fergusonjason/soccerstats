import {StyleSheet} from "react-native";

const dataEntryStyles = StyleSheet.create({
    component: {
        flexDirection: "row"
    },
    textSection: {
        flexDirection: "row",
        alignItems: "flex-start"
    },
    textSectionText: {
        color: "black"
    },
    buttonSection: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    button: {
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: '#202646',
        width: 100,
        height: 25,
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 10
    },
    buttonText: {
        color: "#ffffff",
        alignSelf: "center"
    }
});

export default dataEntryStyles;