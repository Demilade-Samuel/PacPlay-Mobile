import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, TextInput, TouchableOpacity, Dimensions, CheckBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';

class WaitingRoom extends Component{
    state = {
        screenmode:'',
        gameid: '',
        history: '',
        game: {},
        socket: '',
        loading: true,
        userdata: {},
        wagerNames: [],
        reqloading: false,
        reqwarning:'',
    }

    async componentDidMount(){
        let screenmode = await AsyncStorage.getItem('screenmode');
        this.setState({screenmode:screenmode, loading:true});
        
        //Make something for gameid checking
        let gameid = await AsyncStorage.getItem('gameid');
        if(gameid && gameid!=='undefined' && gameid!=='null'){
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
                        //Connect client socket
                        const socket = io('http://localhost:4000');
                        socket.emit('enterwaitingroom', response.game.gameid);
                        
                        socket.on(response.game.gameid+'wrupdate', (arg)=>{
                            let data = JSON.parse(arg);
                            let gamestate = this.state.game;
                            let index = gamestate.wagersidlist.indexOf(data.userid);
                            
                            gamestate.wagersidlist.includes(data.userid)? gamestate.wagersidlist.slice(index, 1) : gamestate.wagersidlist;
                            gamestate.wagersidlist.includes(data.userid)? gamestate.wagerschoices.slice(index, 1) : gamestate.wagerschoices;
                            gamestate.wagersidlist.includes(data.userid)? gamestate.history.push(data.username+' withdrew his stake') : gamestate.history;

                            this.setState({game: gamestate});
                        });

                        socket.on(response.game.gameid+'newstake', (arg)=>{
                            let data = JSON.parse(arg);
                            let gamestate = this.state.game;
                            
                            if(!gamestate.wagersidlist.includes(data.userid)){
                                gamestate.wagersidlist.push(data.userid);
                                gamestate.wagerschoices.push('I win');
                                gamestate.history.push(data.username+' staked '+gamestate.stake);
                                
                                this.setState({game: gamestate});
                            }
                        });

                        socket.on(response.game.gameid+'gamecancelled', (arg)=>{
                            navigation.navigate('/user/home');
                        });

                        socket.on(response.game.id+'gamestarted', (arg)=>{
                            navigation.navigate('/user/home/decisionroom');
                        });
                        
                        //Get data
                        this.setState({userdata: response.data, game:response.game, loading:false, wagerNames:response.wagerNames, socket: socket}); 
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

    removeStake = () => {
        this.setState({reqloading:true, reqwarning: ''});

        fetch(
            "http://localhost:3000/removestake",
            {
                method: 'POST',
                body: JSON.stringify({userid: this.state.userdata.userid, gameid: this.state.gameid}),
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(response => {
            return response.json();
        }).then(async response => {
            if(response.msg === 'success'){
                //Carry out socket action
                this.state.socket.emit('removestake', JSON.stringify({gameid:this.state.gameid, userid:this.state.userdata.userid, username:response.username}))
                
                this.setState({reqloading: false});
                navigation.navigate('/user/home');
            }else{
                this.setState({reqloading: false, reqwarning: response.msg});
            }
        });

    }

    cancelgame = () => {
        this.setState({reqloading:true, reqwarning: ''});

        fetch(
            "http://localhost:3000/cancelgame",
            {
                method: 'POST',
                body: JSON.stringify({gameid: this.state.gameid}),
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(response => {
            return response.json();
        }).then(async response => {
            if(response.msg === 'success'){
                this.state.socket.emit('cancelgame', this.state.gameid);
                this.setState({reqloading: false});
                navigation.navigate('/user/home');
            }else{
                this.setState({reqloading: false, reqwarning: response.msg});
            }
        });
    }

    startgame = () => {
        this.setState({reqloading:true, reqwarning: ''});

        fetch(
            "http://localhost:3000/startgame",
            {
                method: 'POST',
                body: JSON.stringify({gameid: this.state.gameid}),
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(response => {
            return response.json();
        }).then(async response => {
            if(response.msg === 'success'){
                this.state.socket.emit('startgame', this.state.gameid );
                this.setState({reqloading:false});
                navigation.navigate('/user/home/decisionroom')
            }else{
                this.setState({reqloading:false, reqwarning:response.msg});
            }
        });
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
                    <View style={{marginTop:9, width:382, height:170}}>
                        <View style={{position:'absolute', width:382, height:170, flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
                            <Text style={{marginTop:10, color:'white', fontSize:16, fontFamily:'Chakra Petch Regular'}}>Game Details</Text>
                            <View style={{marginTop:15, flexDirection:'row', alignItems:'center', justifyContent:'space-around', width:342, height:70}}>
                                <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-between', height:70}}>
                                    <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:18, textAlign:'center'}}>{this.state.wagerNames.length>0?this.state.wagerNames[0]:'------'}</Text>
                                    <Image source={require('./../../../../assets/player1.png')}/>
                                </View>
                                <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:24}}>VS</Text>
                                <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-between', height:70}}>
                                    <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:18, textAlign:'center'}}>{this.state.wagerNames.length>1?this.state.wagerNames[1]:'------'}</Text>
                                    <Image source={require('./../../../../assets/player2.png')}/>
                                </View>
                            </View>  
                        </View>
                    </View>
                    <View style={{width:382, flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:this.state.screenmode==='dark'?'white':'#928E8E'}}>Total Stakes</Text>
                        <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, color:this.state.screenmode==='dark'?'rgb(40, 120, 20)':'#124D07'}}>{this.state.game.stake? 'NGN '+this.state.game.wagersidlist.length*parseInt(this.state.game.stake) : 'NGN -'}</Text>
                    </View>
                    <ScrollView style={{marginTop:20, width:382, height:160, borderWidth:1, borderColor:'#928E8E', padding:10}}>
                        {
                            this.state.game.history?
                                this.state.game.history.map((history, index)=>{
                                    return(
                                        <Text key={'history'+index} style={{color:this.state.screenmode==='dark'?'white':'black', fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>{history}</Text>
                                    );
                                })
                            :''
                        }
                    </ScrollView>

                    <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:14, marginTop:40}}>{this.state.reqwarning}</Text>
                    <View style={{display:this.state.userdata.userid===this.state.game.creatorid?'flex':'none', flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:362, height:56, borderRadius:6, marginTop:5}}>
                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:this.state.game.wagersidlist ? this.state.game.wagersidlist.length===2?'#1E9E40':'#928E8E':'#928E8E', width:170, height:56, borderRadius:6}} onPress={()=>{this.state.game.wagersidlist.length===2 && !this.state.reqloading ? this.startgame() : '';}}>
                            <ActivityIndicator style={{ display: this.state.reqloading?'flex':'none' }} color='white'></ActivityIndicator>
                            <Text style={{display:!this.state.reqloading?'flex':'none', color:'white', fontFamily:'Chakra Petch Regular', fontSize:15}}>Start Game</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'red', width:170, height:56, borderRadius:6}} onPress={()=>{!this.state.reqloading?this.cancelgame():'';}}>
                            <ActivityIndicator style={{ display: this.state.reqloading?'flex':'none' }} color='white'></ActivityIndicator>
                            <Text style={{display:!this.state.reqloading?'flex':'none', color:'white', fontFamily:'Chakra Petch Regular', fontSize:15}}>Cancel Game</Text>
                        </TouchableOpacity>
                    </View> 
                    <TouchableOpacity style={{display:this.state.userdata.userid===this.state.game.creatorid?'none':'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'red', width:362, height:56, borderRadius:6, marginTop:5}} onPress={()=>{ !this.state.reqloading ? this.removeStake():'';}}>
                        <ActivityIndicator style={{ display: this.state.reqloading?'flex':'none' }} color='white'></ActivityIndicator>
                        <Text style={{display:!this.state.reqloading?'flex':'none', color:'white', fontFamily:'Chakra Petch Regular', fontSize:15}}>Remove Stake</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default WaitingRoom;