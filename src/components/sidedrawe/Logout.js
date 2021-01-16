import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    removeValue = async () => {
        console.log("--------logout ")
        try {

            await AsyncStorage.removeItem('userData')
            await AsyncStorage.clear()
            this.props.navigation.navigate("Login")
        } catch (e) {
            console.log("logout removevalue ----error----", e)
            // remove error
        }

        console.log('Done.')
    }
    componentDidMount = () => {
        this.removeValue();
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});