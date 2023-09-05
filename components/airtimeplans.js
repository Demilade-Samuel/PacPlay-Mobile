import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

class AirtimePlan extends Component{
    render(){
        return(
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:117, height:40, borderRadius:6, backgroundColor:this.props.screenmode==='dark'?'#343434':'#E7E8E7'}}>
                <Image source={this.props.screenmode==='dark'?require('./../assets/nairaplan-dark.png'):require('./../assets/nairaplan.png')}/>
                <Text style={{color:this.props.screenmode==='dark'?'#C8D1DB':'#646060'}}>{this.props.amount}</Text>
            </View>
        );
    }
}

export default AirtimePlan;
