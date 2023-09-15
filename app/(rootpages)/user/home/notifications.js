import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';

class Notifications extends Component{
    state={
        screenmode:'',
        loading:false
    }

    async componentDidMount(){
        let screenmode = await AsyncStorage.getItem('screenmode');
        this.setState({screenmode:screenmode});
    }

    render(){
        return(
            <View style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height, backgroundColor:this.state.screenmode==='dark'?'#181818':'white'}}>
                <ActivityIndicator style={{display:this.state.loading?'flex':'none', position:'absolute', top: Dimensions.get('window').height*0.45,  left: Dimensions.get('window').width*0.48}}></ActivityIndicator>
                <View style={{display:!this.state.loading?'flex':'none', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <TouchableOpacity onPress={()=>{ /*this.state.socket.emit('leavewaitingroom', this.state.gameid);*/  navigation.navigate('/user/home');}}>
                    <Image style={{marginLeft:10}} source={this.state.screenmode==='dark'?require('./../../../../assets/gameback-dark.png'):require('./../../../../assets/gameback.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:88, color:this.state.screenmode==='dark'?'white':'black'}}>Notifications</Text>
                </View>
                <View style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height*0.85, marginTop:10, borderWidth:1, borderColor:'white'}}>

                </View>
            </View>
        );
    }
}

export default Notifications;