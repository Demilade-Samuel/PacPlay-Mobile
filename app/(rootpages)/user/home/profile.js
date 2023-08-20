import React, { Component } from 'react';
import { View, Text, Image, TextInput, Dimensions } from 'react-native';

class Profile extends Component{
    state={
        fullname: '',
        username: '',
        email: '',
        phone: '',
        dob: ''
    }


    render(){
        return(
            <View>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <Image style={{marginLeft:10}} source={require('./../../../../assets/gameback.png')}></Image>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:130}}>Profile</Text>
                </View>

                <View style={{width:Dimensions.get('window').width, flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
                    <Image style={{width:80, height:80, borderRadius:'50%', marginTop:20}} source={{uri:'https://lh3.googleusercontent.com/a/AAcHTtd0T2Z9BXfB350McjCdHFVkoySPGdcJ7GG4JmgNS_28Q7I=s96-c'}}></Image>

                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', width:332, height:69, marginTop:10}}>
                        <View style={{flexDirection:'colum', alignItems:'center', justifyContent:'space-between', height:70}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14}}>Games Created</Text>
                            <View style={{width:80, height:40, borderRadius:4, backgroundColor:'black', alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:18, color:'white', textAlign:'center', }}>20</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'colum', alignItems:'center', justifyContent:'space-between', height:70}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14}}>Bets Won</Text>
                            <View style={{width:80, height:40, borderRadius:4, backgroundColor:'black', alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:18, color:'white', textAlign:'center', }}>80</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'colum', alignItems:'center', justifyContent:'space-between', height:70}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14}}>Bets Lost</Text>
                            <View style={{width:80, height:40, borderRadius:4, backgroundColor:'black', alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:18, color:'white', textAlign:'center', }}>16</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{marginTop:10}}>
                        <View style={{marginTop:15}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14}}>Full Name</Text>
                            <TextInput
                                placeholder={'Full Name'}
                                value={this.state.fullname}
                                onChangeText={ (e)=>{this.setState({fullname: e});} }
                                style={{width:340, borderRadius:8, height:44, borderWidth:1, borderLeftColor:'#928E8E', borderRightColor:'#928E8E', borderTopColor:'#928E8E', borderBottomColor:'#928E8E', fontSize:16, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15, marginTop:5}}
                            />
                        </View>

                        <View style={{marginTop:15}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14}}>Username</Text>
                            <TextInput
                                placeholder={'@username'}
                                value={this.state.username}
                                onChangeText={ (e)=>{this.setState({username: e});} }
                                style={{width:340, borderRadius:8, height:44, borderWidth:1, borderLeftColor:'#928E8E', borderRightColor:'#928E8E', borderTopColor:'#928E8E', borderBottomColor:'#928E8E', fontSize:16, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15, marginTop:5}}
                            />
                        </View>

                        <View style={{marginTop:15}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14}}>Email</Text>
                            <TextInput
                                placeholder={'email@gmail.com'}
                                value={this.state.email}
                                onChangeText={ (e)=>{this.setState({email: e});} }
                                style={{width:340, borderRadius:8, height:44, borderWidth:1, borderLeftColor:'#928E8E', borderRightColor:'#928E8E', borderTopColor:'#928E8E', borderBottomColor:'#928E8E', fontSize:16, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15, marginTop:5}}
                            />
                        </View>

                        <View style={{marginTop:15}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14}}>Phone Number</Text>
                            <TextInput
                                placeholder={'08123456789'}
                                value={this.state.phone}
                                onChangeText={ (e)=>{this.setState({phone: e});} }
                                keyboardType={'numeric'}
                                style={{width:340, borderRadius:8, height:44, borderWidth:1, borderLeftColor:'#928E8E', borderRightColor:'#928E8E', borderTopColor:'#928E8E', borderBottomColor:'#928E8E', fontSize:16, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15, marginTop:5}}
                            />
                        </View>

                        <View style={{marginTop:15}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14}}>Date of Birth</Text>
                            <TextInput
                                placeholder={'31/12/1990'}
                                value={this.state.dob}
                                onChangeText={ (e)=>{this.setState({dob: e});} }
                                keyboardType={'numeric'}
                                style={{width:340, borderRadius:8, height:44, borderWidth:1, borderLeftColor:'#928E8E', borderRightColor:'#928E8E', borderTopColor:'#928E8E', borderBottomColor:'#928E8E', fontSize:16, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15, marginTop:5}}
                            />
                        </View>
                    </View>
                
                </View>
            </View>
        );
    }
}

export default Profile;