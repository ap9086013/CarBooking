import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("screen")
const appStyles = StyleSheet.create({
    loginView: {
        backgroundColor: '#fff',
        shadowColor: "#fff",
        // width: width / 1.05,
        width: width / 1.2,
        height: height / 2.3,
        marginTop: height / 5,
        shadowOpacity: 10,
        shadowRadius: 16.00,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 24,
        shadowOffset: {
            width: 0,
            height: 12,
        },
    },
    backImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center'
    },
    input: {
        height: height / 18,
        borderRadius: 20,
        width: '90%',
        marginTop: '6%',
    },
    button: {
        backgroundColor: '#0d319f',
        width: '90%',
        height: height / 18,
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: height / 25,
    },
    lodingView: {
        justifyContent: 'center',
        position: 'absolute',
        width:'100%',
        left: '0%',
        top: '0%',
        right: '0%',
        bottom: '0%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        //backgroundColor: 'red',
        zIndex: 9999,
    },
    textColor: {
        color:'#fff'
    }
   

})
export default appStyles;