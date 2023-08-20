import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';

class Help extends Component{
    state={
        name:'',
        message:''
    }

    render(){
        return(
            <View>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <Image style={{marginLeft:10}} source={require('./../../../../assets/gameback.png')}></Image>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:88}}>{'Help & Support'}</Text>
                </View>
                
                <View style={{width:Dimensions.get('window').width,flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:20, textAlign:'center', marginTop:50}}>Contact Us</Text>
                    
                    <View style={{width:360, marginTop:40}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'#646060'}}>Name</Text>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:360, flexWrap:'wrap'}}>
                            <TextInput
                                placeholder={'Name'}
                                value={this.state.name}
                                onChangeText={(e)=>{this.setState({name: e});}}
                                style={{width:360, borderRadius:8, height:44, borderWidth:1, borderLeftColor:'#928E8E', borderRightColor:'#928E8E', borderTopColor:'#928E8E', borderBottomColor:'#928E8E', fontSize:18, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15}}
                            />
                        </View>
                    </View>


                    <View style={{width:360, marginTop:30}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'#646060'}}>Message</Text>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:360, flexWrap:'wrap'}}>
                            <TextInput
                                editable
                                multiline
                                numberOfLines={6}
                                value={this.state.message}
                                onChangeText={(e)=>{this.setState({message: e});}}
                                style={{width:360, borderRadius:8, borderWidth:1, borderLeftColor:'#928E8E', borderRightColor:'#928E8E', borderTopColor:'#928E8E', borderBottomColor:'#928E8E', fontSize:18, fontFamily:'Chakra Petch Regular', padding:15}}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={{width:Dimensions.get('window').width-36, height:56, flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:8, marginTop:90, backgroundColor:'black'}}>
                        <Text style={{color:'white', fontFamily:'Chakra Petch Regular', fontSize:16}}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Help;