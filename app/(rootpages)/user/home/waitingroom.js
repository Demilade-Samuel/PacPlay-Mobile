import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, TextInput, TouchableOpacity, Dimensions, CheckBox, Touchable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';

class WaitingRoom extends Component{
    state = {
        screenmode:'',
        gameid: '',
        history: '',
        game: {},
        socket: '',
        loading: true
    }

    async componentDidMount(){
        let screenmode = await AsyncStorage.getItem('screenmode');
        this.setState({screenmode:screenmode, loading:true});
        
        //Make something for gameid checking
        let gameid = await AsyncStorage.getItem('gameid');
        if(gameid && gameid!=='undefined' && gameid!==null){
            this.setState({gameid: gameid});
            
            let data = await AsyncStorage.getItem('userdata');
            data = JSON.parse(data);
            
            //If user data is in Async Storage
            if(data && data!==null){
                //Check if user is an imposter in the waiting room and also get userdata
                const defrequest = fetch(
                    "http://localhost:3000/wrimpostercheck",
                    {
                        method: 'POST',
                        body: JSON.stringify({userid: data.userid, gameid: gameid}),
                        headers: { 'Content-Type': 'application/json' }
                    }
                ).then(response => {
                    return response.json();
                }).then(async response => {
                    if(response.imposter){//if an imposter
                        await AsyncStorage.removeItem('gameid');
                        this.setState({loading: false});
                        navigation.navigate('/user/home');
                    }else{
                        const socket = io('http://localhost:4000');
                        socket.emit('enterwaitingroom', response.game.gameid);
                        this.setState({userdata: response.data, game:response.game, loading:false, socket: socket}); 
                    }  
                });
            
            }else{ //We dont know how this person got to this URL so we take them back to first
                await AsyncStorage.multiRemove(['userdata', 'user']);
                router.push({pathname:'/first'});
            }
            
        }else{
            navigation.navigate('/user/home');
        }
        
    }

    render(){
        return(
            <View style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height, backgroundColor:this.state.screenmode==='dark'?'#181818':'white'}}>
                <ActivityIndicator style={{display:this.state.loading?'flex':'none', position:'absolute', top: Dimensions.get('window').height*0.45,  left: Dimensions.get('window').width*0.48}}></ActivityIndicator>
                <View style={{display:!this.state.loading?'flex':'none', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <TouchableOpacity onPress={()=>{ this.state.socket.emit('leavewaitingroom', this.state.gameid);  navigation.navigate('/user/home');}}>
                    <Image style={{marginLeft:10}} source={this.state.screenmode==='dark'?require('./../../../../assets/gameback-dark.png'):require('./../../../../assets/gameback.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:88, color:this.state.screenmode==='dark'?'white':'black'}}>Waiting Room</Text>
                </View>

                <View style={{display:!this.state.loading?'flex':'none', width: Dimensions.get('window').width, alignItems:'center', marginTop:20}}>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', width:382}}>
                        <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:18, color:this.state.screenmode==='dark'?'white':'black'}}>{'Game ID: '+this.state.gameid}</Text>
                        <TouchableOpacity style={{marginLeft:10, backgroundColor:this.state.screenmode==='dark'?'white':'rgba(0,0,0,0)', padding:6, borderRadius:6}}>
                        <Image style={{width:20, height:20}} source={require('./../../../../assets/copy.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:9, width:382, height:198}}>
                        <Image source={require('./../../../../assets/gamebg.png')}/>
                        <View style={{position:'absolute', width:382, height:198, flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
                            <Text style={{marginTop:28, color:'white', fontSize:16, fontFamily:'Chakra Petch Regular'}}>Game Details</Text>
                            <View style={{marginTop:36, flexDirection:'row', alignItems:'center', justifyContent:'space-around', width:342, height:80}}>
                                <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-between', height:80}}>
                                    <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:18}}>Player1</Text>
                                    <Image source={require('./../../../../assets/player1.png')}/>
                                </View>
                                <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:24}}>VS</Text>
                                <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-between', height:80}}>
                                    <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:18}}>Player2</Text>
                                    <Image source={require('./../../../../assets/player2.png')}/>
                                </View>
                            </View>  
                        </View>
                    </View>
                    <View style={{width:382, flexDirection:'column', alignItems:'center', justifyContent:'flex-start', marginTop:15}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:this.state.screenmode==='dark'?'white':'#928E8E'}}>Total Stakes</Text>
                        <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, color:this.state.screenmode==='dark'?'rgb(40, 120, 20)':'#124D07'}}>NGN 2,000</Text>
                    </View>
                    <ScrollView style={{marginTop:20, width:382, height:160, borderWidth:1, borderLeftColor:'#928E8E', padding:10}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>You staked NGN 200 on Player1 to win</Text>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>Ayo joined the game</Text>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>Ayo staked NGN 350 on Player1 to win</Text>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>Jeffrey joined the game</Text>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>Jeffrey staked NGN 250 on Player1 to win</Text>
                    </ScrollView>

                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#928E8E', width:362, height:56, borderRadius:6, marginTop:45}}>
                        <Text style={{color:'white', fontFamily:'Chakra Petch Regular', fontSize:15}}>Start Game</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default WaitingRoom;