import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get("screen");
export default class ListOfVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      return (
          <LinearGradient colors={['#f99050', '#f94c5d']} style={styles.linearMainView}>
              <View style={styles.vehicleListView}>
                  <View style={{ flexDirection: 'row' }}>
                      <View style={{marginLeft:'2%'}}>  
                  <Image
                      style={styles.imageStyles}
                      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                          />
                      </View>
                      <View style={{width:'60%',alignItems:'center',marginTop:'2%'}}>
                      <Text style={{textAlign:'center'}}> Rate/Per KM :- 5 RS</Text>
                      <TouchableOpacity style={styles.bookButtonStyle}>
                          <Text>
                              Book
                          </Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
              </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
    linearMainView: {
        flex: 1,
        alignItems: 'center'
    },
    vehicleListView: {
        backgroundColor: '#fff',
        width: width / 1.1,
        height: height / 5,
        borderRadius: 30,
        justifyContent:'center'
     //   alignItems:'center'
    },
    imageStyles: {
        width: width/3,
        height: height / 6, 
        
    },
    bookButtonStyle: {
        width: '50%',
        height: '20%',
        backgroundColor: '#ff6e59',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: '30%',
      
    }

})