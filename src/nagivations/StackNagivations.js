import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import ForgotPassword from '../components/ForgotPassword';
import SetNewPassword from '../components/SetNewPassword';
import OTPScreen from '../components/OTPScreen';
import Home from '../components/sidedrawe/Home';
import CustomDrawerContent from '../components/sidedrawe/CustomeDrawerContent';
import SplaceScreen from '../components/SplaceScreen';
import Logout from '../components/sidedrawe/Logout';
import Profile from '../components/sidedrawe/Profile';
import ChangePassword from '../components/sidedrawe/ChangePassword';
import ListOfVehicle from '../components/ListOfVehicle';
import AllDetails from '../components/AllDetails';


//for side Drawer
const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
    <AppDrawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}
        drawerType='front'
        overlayColor='transparent'
        drawerStyle={{ backgroundColor: 'transparent' }}
        drawerContentOptions={{
            activeBackgroundColor: 'transparent',
            activeTintColor: 'green',
            inactiveTintColor: 'green'
        }}
        sceneContainerStyle={{
            backgroundColor: 'transparent'
        }}
    >
        <AppDrawer.Screen name="Home" component={Home} />
        <AppDrawer.Screen name="Logout" component={Logout} />
         <AppDrawer.Screen name="Profile" component={Profile} />
         <AppDrawer.Screen name="ChangePassword" component={ChangePassword} />
        {/* <AppDrawer.Screen name="Profile" component={Profile} />
     
        <AppDrawer.Screen name="VehicheRegistration" component={VehicleRegistration} /> */}
        {/*<AppDrawer.Screen name="Complain Category" component={ComplainCategory} />
      <AppDrawer.Screen name="UserLogout" component={UserLogout} /> */}
    </AppDrawer.Navigator>
);



const Stack = createStackNavigator();
export default class StackNagivations extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="SplaceScreen"
                >
                    <Stack.Screen name="SplaceScreen" component={SplaceScreen}
                    options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name="Login" component={Login}
                        options={{
                            headerShown: false
                        }} />
                    <Stack.Screen name="SideDrawer" component={AppDrawerScreen}
                    options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name="Signup" component={SignUp}
                        options={{
                            headerShown: false
                        }} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword}
                        options={{
                            headerShown: false
                        }} />
                    <Stack.Screen name="SetNewPassword" component={SetNewPassword}
                        options={{
                            headerShown: false
                        }} />
                    <Stack.Screen name="OTPScreen" component={OTPScreen}
                        options={{
                            headerShown: false
                        }} />
                    <Stack.Screen name="ListOfVehicle" component={ListOfVehicle}
                        options={{
                            headerShown: false
                        }} />
                    <Stack.Screen name="AllDetails" component={AllDetails}
                        options={{
                            headerShown: false
                        }} />

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
