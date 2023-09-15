import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Help extends Component{
    state={
        name:'',
        message:'',
        screenmode:'',
    }

    async componentDidMount(){
        let screenmode = await AsyncStorage.getItem('screenmode');
        this.setState({screenmode: screenmode});
    }

    render(){
        return(
            <View style={{height:Dimensions.get('window').height, backgroundColor:this.state.screenmode==='dark'?'#181818':'white'}}>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('/user/settings');}}>
                    <Image style={{marginLeft:10}} source={this.state.screenmode==='dark'?require('./../../../../assets/gameback-dark.png'):require('./../../../../assets/gameback.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:88, color:this.state.screenmode==='dark'?'white':'black'}}>{'Help & Support'}</Text>
                </View>
                
                <View style={{width:Dimensions.get('window').width,flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:20, textAlign:'center', marginTop:50, color:this.state.screenmode==='dark'?'white':'black'}}>Contact Us</Text>
                    
                    <View style={{width:360, marginTop:40}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:this.state.screenmode==='dark'?'white':'#646060'}}>Name</Text>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:360, flexWrap:'wrap'}}>
                            <TextInput
                                placeholder={'Name'}
                                value={this.state.name}
                                onChangeText={(e)=>{this.setState({name: e});}}
                                style={{width:360, borderRadius:8, height:44, borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'#928E8E', fontSize:18, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15, color:this.state.screenmode==='dark'?'white':'black'}}
                            />
                        </View>
                    </View>


                    <View style={{width:360, marginTop:30}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:this.state.screenmode==='dark'?'white':'#646060'}}>Message</Text>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:360, flexWrap:'wrap'}}>
                            <TextInput
                                editable
                                multiline
                                numberOfLines={6}
                                value={this.state.message}
                                onChangeText={(e)=>{this.setState({message: e});}}
                                style={{width:360, borderRadius:8, borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'#928E8E', fontSize:18, fontFamily:'Chakra Petch Regular', padding:15, color:this.state.screenmode==='dark'?'white':'black'}}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={{width:Dimensions.get('window').width-36, height:56, flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:8, marginTop:90, backgroundColor:this.state.screenmode==='dark'?'#1E9E40':'black'}}>
                        <Text style={{color:'white', fontFamily:'Chakra Petch Regular', fontSize:16}}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Help;