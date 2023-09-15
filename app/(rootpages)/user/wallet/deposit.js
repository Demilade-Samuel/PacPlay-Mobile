import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, Dimensions, ScrollView, StyleSheet, TouchableOpacity, TextInput, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from "expo-web-browser";

class Deposit extends Component{
    state={
        loading: true,
        loading2: false,
        amount: '',
        pendingmsg: 'You will be navigated to a payment platform shortly...',
        userdata: {},
        screenmode: ''
    }
    
    async componentDidMount(){
        let data = await AsyncStorage.getItem('userdata');
        let screenmode = await AsyncStorage.getItem('screenmode');
        data = JSON.parse(data);
        console.log('>>'+data.userid);
        this.setState({screenmode: screenmode});
        //If user data is in Async Storage
        if(data){
            //A default call to the server to get user details, incase there are any updates
            const defrequest = fetch(
                "http://localhost:3000/getuserdata",
                {
                    method: 'POST',
                    body: JSON.stringify({userid: data.userid}),
                    headers: { 'Content-Type': 'application/json' }
                }
            ).then(response => {
                return response.json();
            }).then(response => {
                console.log(response.data);
                this.setState({userdata: response.data, loading:false}); 
            });
        
        }else{ //We dont know how this person got to this URL so we take them back to first
            await AsyncStorage.multiRemove(['userdata', 'user']);
            router.push({pathname:'/first'})
        }
    }

    deposit = async() => {
        if(this.state.amount!=='' && parseInt(this.state.amount)){
            this.setState({loading2: true, amountlabel:''});
            
            let userData = this.state.userdata;
            let amount = parseInt(this.state.amount);
            let dateArr = new Date().toString().split(' ');
            let timeArr = dateArr[4].split(':');
            let ref = userData.userid+dateArr[2]+'-'+dateArr[3]+'-'+timeArr[0]+'-'+timeArr[1]+'-'+timeArr[2];
            let data = {amount: amount, data: userData, ref: ref}

            console.log(data);

            const response = fetch(
                "http://localhost:3000/flwdeposit",
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }
                }  
            ).then(response=>{
                return response.json();
            }).then(async response=>{
                if(response.url.data.link){
                    if(Linking.canOpenURL(response.url.data.link)){
                        this.setState({pendingmsg: 'Payment Link Sent: Proceed with deposit'})
                        let feedback = await Linking.openURL(response.url.data.link);
                        //await WebBrowser.openBrowserAsync(response.url.data.link);
                        console.log(feedback);
                        
                    }else{
                        console.log('URL not supported');
                    }
                }else{
                    console.log(response);
                }
                
            });
        }else{
            this.setState({amountlabel: 'This field cannot be empty'});
        }
    }

    render(){
        return(
            <View style={{backgroundColor:this.state.screenmode==='dark'?'#181818':'white', height:Dimensions.get('window').height}}>
                <ActivityIndicator style={{display:'none', position:'absolute', top: Dimensions.get('window').height*0.45,  left: Dimensions.get('window').width*0.48}}></ActivityIndicator>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('/user/wallet');}}>
                        <Image style={{marginLeft:10}} source={this.state.screenmode==='dark'?require('./../../../../assets/gameback-dark.png'):require('./../../../../assets/gameback.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:108, color:this.state.screenmode==='dark'?'white':'black'}}>Deposit</Text>
                </View>
                <View style={{display:!this.state.loading && !this.state.loading2?'flex':'none'}}>
                    <View style={{flexDirection:'column', alignItems:'center', justifyContent:'flex-start', width:Dimensions.get('window').width}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'#000000', marginLeft:24, marginRight:24, marginTop:25, color:this.state.screenmode==='dark'?'white':'black'}}>Use one of these payment methods to fund your wallet</Text>
                        
                        <View style={{marginTop:50, flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:382, height:56, borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'black', borderRadius:8, paddingRight:15}}>
                            <TouchableOpacity style={{backgroundColor:this.state.screenmode?'#D3D4D7':'rgba(0,0,0,0)', paddingTop:15, paddingBottom:15, paddingLeft:20, paddingRight:20, borderTopLeftRadius:7, borderBottomLeftRadius:7 }}>
                            <Image style={{width:24, height:24}} source={'./../../../../assets/naira.png'} />
                            </TouchableOpacity>
                            <TextInput
                                onChangeText={(e)=>{this.setState({amount: e});}}
                                value={this.state.amount}
                                keyboardType='numeric'
                                style={{marginLeft:10, height:56, width:358, outlineStyle:'none', fontSize:30, fontFamily:'Chakra Petch SemiBold', color:this.state.screenmode==='dark'?'white':'black'}}
                            />
                        </View> 
                        <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:8, width:382}}>{this.state.amountlabel}</Text>                       

                        <View style={{marginTop:50}}>
                            <TouchableOpacity onPress={()=>{this.deposit();}} style={{width:366, height:80, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderWidth:1, borderLeftColor:'rgba(0,0,0,0)', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderBottomColor:'#C8D1DB'}}>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                                    <Image style={{marginRight:12}} source={this.state.screenmode==='dark'?require('./../../../../assets/card1-dark.png'):require('./../../../../assets/card1.png')}/>
                                    <Text style={{fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black', fontSize:18}}>Fund wallet with card</Text>
                                </View>
                                <Image source={this.state.screenmode==='dark'?require('./../../../../assets/next-dark.png'):require('./../../../../assets/next.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.deposit();}} style={{width:366, height:80, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderWidth:1, borderLeftColor:'rgba(0,0,0,0)', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderBottomColor:'#C8D1DB'}}>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                                    <Image style={{marginRight:12}} source={this.state.screenmode==='dark'?require('./../../../../assets/bank-dark.png'):require('./../../../../assets/bank.png')}/>
                                    <Text style={{fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black', fontSize:18}}>Direct Transfer from Bank</Text>
                                </View>
                                <Image source={this.state.screenmode==='dark'?require('./../../../../assets/next-dark.png'):require('./../../../../assets/next.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{display:this.state.loading2?'flex':'none', flexDirection:'column', alignItems:'center', justifyContent:'center', width:Dimensions.get('window').width, height:Dimensions.get('window').height*0.8}}>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:18, textAlign:'center', color:this.state.screenmode==='dark'?'white':'black'}}>{this.state.pendingmsg}</Text>
                    <ActivityIndicator style={{display:this.state.pendingmsg==='You will be navigated to a payment platform shortly...'?'flex':'none', marginTop:20}} color={this.state.screenmode==='dark'?'white':'black'}></ActivityIndicator>
                    <TouchableOpacity style={{display:this.state.pendingmsg==='Payment Link Sent: Proceed with deposit'?'flex':'none', marginTop:70 , width:382, height:50, borderRadius:8, backgroundColor:this.state.screenmode==='dark'?'#1E9E40':'black', flexDirection:'column', alignItems:'center', justifyContent:'center'}} onPress={()=>{navigation.navigate('/user/home');}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'white'}} onPress={()=>{navigation.navigate('/user/home');}}>I have completed the transaction</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Deposit;