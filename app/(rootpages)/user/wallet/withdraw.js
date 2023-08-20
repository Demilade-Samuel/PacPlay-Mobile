import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, Dimensions } from 'react-native';

class Withdraw extends Component{
    state={
        
    }

    render(){
        return(
            <View>
                <ActivityIndicator style={{display:'none', position:'absolute', top: Dimensions.get('window').height*0.45,  left: Dimensions.get('window').width*0.48}}></ActivityIndicator>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <Image style={{marginLeft:10}} source={require('./../../../../assets/gameback.png')}></Image>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:108}}>Withdraw</Text>
                </View>
            </View>
        );
    }
}

export default Withdraw;