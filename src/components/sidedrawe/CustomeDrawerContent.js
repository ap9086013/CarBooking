import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {
    Drawer,
    Text,
} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { List, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import appStyles from '../styles/AppStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class CustomDrawerContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: [],
        };
    }
  
    componentDidMount = () => {
        this.getData();
    }
    //get all data for local stroage 
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('userData')
            if (value !== null) {
                this.setState({
                    userData: JSON.parse(value)
                })

                console.log("--statr--->", this.state.userData.userName)
                // value previously stored
            }
        } catch (e) {
            // error reading value
            console.log("-drawecontent.getData==error=>", e)
        }
    }
    render() {
        return (
            <LinearGradient colors={['#f99050', '#f94c5d']} style={{ flex: 1, backgroundColor: '#f7f7f7',borderWidth:0.8,borderColor:"#fff" }}>
                <DrawerContentScrollView >
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View

                                style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', marginLeft: 10 }}>
                                <Image
                                    //./Allimages/jaipurlogo.png
                                    source={{ uri: "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg" }}
                                    style={{ width: 55, height: 55, borderRadius: 100 }}
                                />
                                <Text style={[appStyles.textColor, { fontSize: 18, fontWeight: 'bold', marginLeft: 10 }]}>
                                    {this.state.userData.userName}
                                </Text>
                            </View>
                            {/* <View>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>
                                    Welcome  {this.state.userData.userName}
                                </Text>
                            </View> */}
                            {/* <View style={{ borderWidth: 0.5, marginTop: "2%" }} /> */}
                        </View>

                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Feather
                                        name="home"
                                        size={20}
                                        color={appStyles.textColor.color}
                                        style={{ marginLeft: 8 }}
                                    />
                                )}
                                label="Home"
                                labelStyle={[appStyles.textColor, { fontSize: 17 }]}
                                onPress={() => { this.props.navigation.navigate('Home') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <AntDesign
                                        name="profile"
                                        size={20}
                                        color={appStyles.textColor.color}
                                        style={{ marginLeft: 8 }}
                                    />
                                )}
                                label="Profile"
                                labelStyle={[appStyles.textColor, { fontSize: 17 }]}
                                onPress={() => { this.props.navigation.navigate('Profile') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <MaterialCommunityIcons
                                        name="key-change"
                                        size={20}
                                        color={appStyles.textColor.color}
                                        style={{ marginLeft: 8 }}
                                    />
                                )}
                                label="Password Change"
                                labelStyle={[appStyles.textColor, { fontSize: 17 }]}
                                onPress={() => { this.props.navigation.navigate('ChangePassword') }}
                            />
                            {/* <DrawerItem
                                icon={({ color, size }) => (
                                    <MaterialIcons
                                        name="app-registration"
                                        size={20}
                                        color={appStyles.textColor.color}
                                        style={{ marginLeft: 8 }}
                                    />
                                )}

                                label="Vehiche Registration"
                                labelStyle={[appStyles.textColor, { fontSize: 17 }]}
                                onPress={() => { this.props.navigation.navigate('VehicheRegistration') }}
                            /> */}


                        </Drawer.Section>
                    </View>
                </DrawerContentScrollView>

                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={[appStyles.textColor, { fontSize: 17 }]}>
                        Logout
                        </Text>
                </TouchableOpacity>
                {/* <DrawerItem

                        label="Logout"
                        labelStyle={{ color: "black", fontSize: 16 }}
                        onPress={() => { this.props.navigation.navigate('Logout') }}
                    /> */}

            </LinearGradient>
        );
    }
}


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 0
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 10,
        borderTopColor: 'black',
        borderTopWidth: 1,
        justifyContent: 'center',

    },
    subCategory: {
        fontSize: 16,
        color: "black",
        paddingVertical: 10
    },
    logoutButton: {

        backgroundColor: '#ff6e59',
        height: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        borderRadius: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: "5%",
    }
});