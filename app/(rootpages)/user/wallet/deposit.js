import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, Dimensions, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Deposit extends Component{
    state={
        loading: false,
        amount: ''
    }

    deposit = async() => {
        if(this.state.amount!=='' && parseInt(this.state.amount)){
            this.setState({loading: true});
            
            let userData = await AsyncStorage.getItem('userdata');
            userData = JSON.parse(userData);
            let amount = parseInt(this.state.amount);
            let dateArr = new Date().toString().split(' ');
            let timeArr = dateArr[4].split(':');
            let ref = userData.id+dateArr[2]+'-'+dateArr[3]+'-'+timeArr[0]+'-'+timeArr[1]+'-'+timeArr[2];
            let data = {amount: amount, data: userData, ref: ref}

            console.log(data);

            const response = fetch(
                "http://localhost:3000/flwdeposit",
                {
                    method: 'POST',
                    body: data,
                    headers: { 'Content-Type': 'application/json' }
                }  
            ).then(response=>{
                return response.json();
            }).then(response=>{
                this.setState({loading: false});
                console.log(response);
            });
        }
    }

    render(){
        return(
            <View>
                <ActivityIndicator style={{display:'none', position:'absolute', top: Dimensions.get('window').height*0.45,  left: Dimensions.get('window').width*0.48}}></ActivityIndicator>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <Image onPress={()=>{navigation.navigate('/user/wallet');}} style={{marginLeft:10}} source={require('./../../../../assets/gameback.png')}></Image>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:108}}>Deposit</Text>
                </View>
                <View style={{display:'flex'}}>
                    <View style={{flexDirection:'column', alignItems:'center', justifyContent:'flex-start', width:Dimensions.get('window').width}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'#000000', marginLeft:24, marginRight:24, marginTop:25}}>Use one of these payment methods to fund your wallet</Text>
                        
                        <View style={{marginTop:50, flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:382, height:56, borderWidth:1, borderLeftColor:'black', borderRadius:8, paddingLeft:15, paddingRight:15}}>
                            <Image style={{width:24, height:24}} source={'./../../../../assets/naira.png'} />
                            <TextInput
                                onChangeText={(e)=>{this.setState({amount: e});}}
                                value={this.state.amount}
                                keyboardType='numeric'
                                style={{marginLeft:10, height:56, width:358, outlineStyle:'none', fontSize:30, fontFamily:'Chakra Petch SemiBold'}}
                            />
                        </View>                        

                        <View style={{marginTop:50}}>
                            <TouchableOpacity onPress={()=>{this.deposit();}} style={{width:366, height:80, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderWidth:1, borderLeftColor:'rgba(0,0,0,0)', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderBottomColor:'#C8D1DB'}}>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                                    <Image style={{marginRight:12}} source={require('./../../../../assets/card1.png')}/>
                                    <Text style={{fontFamily:'Chakra Petch Regular', color:'#000000', fontSize:18}}>Fund wallet with card</Text>
                                </View>
                                <Image source={require('./../../../../assets/next.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.deposit();}} style={{width:366, height:80, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderWidth:1, borderLeftColor:'rgba(0,0,0,0)', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderBottomColor:'#C8D1DB'}}>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                                    <Image style={{marginRight:12}} source={require('./../../../../assets/bank.png')}/>
                                    <Text style={{fontFamily:'Chakra Petch Regular', color:'#000000', fontSize:18}}>Direct Transfer from Bank</Text>
                                </View>
                                <Image source={require('./../../../../assets/next.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

export default Deposit;