import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';

class Privacy extends Component{
    state={
        current:'',
        currentpass: '',
        currenttoggle: 'Show password',
        new:'',
        newpass: '',
        newtoggle: 'Show password',
        retype:'',
        retypepass: '',
        retypetoggle: 'Show password',
    }

    render(){
        return(
            <View>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <Image style={{marginLeft:10}} source={require('./../../../../assets/gameback.png')}></Image>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:88}}>{'Privacy & Security'}</Text>
                </View>
                <View style={{marginTop:30, marginLeft:24, marginRight:24}}>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:20, marginBottom:20}}>Change Password</Text>
                    <View>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'#646060'}}>Current Password</Text>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:378, flexWrap:'wrap'}}>
                            <TextInput
                                placeholder={'Current Password'}
                                value={this.state.currentpass}
                                onChangeText={(e)=>{this.setState({current: e, currentpass: '*'.repeat(e.length)});}}
                                style={{width:270, borderRadius:8, height:44, borderWidth:1, borderLeftColor:'#928E8E', borderRightColor:'#928E8E', borderTopColor:'#928E8E', borderBottomColor:'#928E8E', fontSize:18, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15}}
                            />
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#4285F4'}}>{this.state.currenttoggle}</Text>
                        </View>
                    </View>

                    <View style={{marginTop:40}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'#646060'}}>New Password</Text>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:378, flexWrap:'wrap'}}>
                            <TextInput
                                placeholder={'New Password'}
                                value={this.state.newpass}
                                onChangeText={(e)=>{this.setState({new: e, newpass: '*'.repeat(e.length)});}}
                                style={{width:270, borderRadius:8, height:44, borderWidth:1, borderLeftColor:'#928E8E', borderRightColor:'#928E8E', borderTopColor:'#928E8E', borderBottomColor:'#928E8E', fontSize:18, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15}}
                            />
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#4285F4'}}>{this.state.newtoggle}</Text>
                        </View>
                    </View>

                    <View style={{marginTop:40}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'#646060'}}>Retype Password</Text>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:378, flexWrap:'wrap'}}>
                            <TextInput
                                placeholder={'Retype Password'}
                                value={this.state.retypepass}
                                onChangeText={(e)=>{this.setState({retype: e, retypepass: '*'.repeat(e.length)});}}
                                style={{width:270, borderRadius:8, height:44, borderWidth:1, borderLeftColor:'#928E8E', borderRightColor:'#928E8E', borderTopColor:'#928E8E', borderBottomColor:'#928E8E', fontSize:18, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15}}
                            />
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#4285F4'}}>{this.state.retypetoggle}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{width:Dimensions.get('window').width-36, height:56, flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:8, marginTop:80, backgroundColor:'black'}}>
                        <Text style={{color:'white', fontFamily:'Chakra Petch Regular', fontSize:16}}>Change Password</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}

export default Privacy;