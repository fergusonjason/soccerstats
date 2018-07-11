import {StyleSheet} from "react-native";

const masterStyles = StyleSheet.create({
    component: {
        flex: 1,
        backgroundColor: "#ffffff"
    }
});

const dataEntryPage = StyleSheet.create({
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

const listPage = StyleSheet.create({
    listArea: {
        flexDirection: "row"
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

const rowStyles = StyleSheet.create({
    rowComponent: {
        flexDirection: "row"
    },
    rowTextSection: {
        width: 150,
        alignSelf: "center",
        margin: 10
    },
    threeButtonRowTextSection: {
        width: 100,
        alignSelf: "center",
        margin: 10
    },
    rowButtonSection: {
        flexDirection: "row"
    }
});



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
});

giantButtonStyles = StyleSheet.create({
    buttonText: {
        fontSize:20,
        color: '#ffffff',
        textAlign: 'center'
      },
      buttonStyle: {
        padding:10,
        backgroundColor: '#202646',
        borderRadius:5,
        marginVertical: 20,
        marginHorizontal: 20
      }    
});

export {dataEntryPage, listPage, rowStyles, portableButtonStyles, bigButtonStyles, giantButtonStyles};
export default masterStyles;