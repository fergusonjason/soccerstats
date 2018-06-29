import {StyleSheet} from "react-native";

export default listItemStyles = StyleSheet.create({
    component: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        height: 50
        
    },
    text: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        fontWeight: "bold",
        height: 50,
        width: 100},
    button: {
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