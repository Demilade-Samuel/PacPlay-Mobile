import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Privacy extends Component{
    state={
        currentpass: '',
        currenttoggle: 'Show password',
        currentwarning: '',
        currentcolor: '',
        newpass: '',
        newtoggle: 'Show password',
        newwarning:'',
        newcolor: '',
        retypepass: '',
        retypetoggle: 'Show password',
        retypewarning: '',
        retypecolor: ''
    }

    async componentDidMount(){
        let data = await AsyncStorage.getItem('userdata');
        data = JSON.parse(data);
        console.log('>>'+data.userid);
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

    changePassword = () => {
        this.setState({currentwarning:'', currentcolor:'', newwarning:'', newcolor:'', retypewarning:'', retypecolor:''});

        if(this.state.currentpass==='' || this.state.newpass==='' || this.state.retypepass===''){
            if(this.state.currentpass===''){
                this.setState({currentwarning:'This field cannot be empty', currentcolor:'red'})
            }

            if(this.state.newpass===''){
                this.setState({newwarning:'This field cannot be empty', newcolor:'red'});
            }

            if(this.state.retypepass===''){
                this.setState({retypewarning: 'This field cannot be empty', retypecolor:'red'});
            }
        }else{
            if(this.state.newpass!==this.state.retypepass){
                this.setState({newwarning:'Passwords not similar', newcolor:'red', retypewarning: 'Passwords not similar', retypecolor:'red'});
            }else{
                let data = {
                    userid: this.state.userdata.userid,
                    currentpass: this.state.currentpass,
                    newpass: this.state.newpass
                }

                const response = fetch(
                    "http://localhost:3000/changepassword",
                    {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: { 'Content-Type': 'application/json' }
                    }  
                ).then(response=>{
                    return response.json();
                }).then(async response=>{
                    if(response.msg === 'success'){
                        this.setState({currentwarning:'Password changed', currentcolor:'green', newwarning:'Password changed', newcolor:'green', retypewarning:'Password changed', retypecolor:'green', newpass:'', currentpass:'', retypepass:''});
                    }else{
                        this.setState({currentwarning:response.msg, newwarning:response.msg, retypewarning:response.msg, currentcolor:'red', newcolor:'red', retypecolor:'red'});
                    }
                });
            }

        }
    }


    render(){
        return(
            <View>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('/user/settings');}}>
                    <Image style={{marginLeft:10}} source={require('./../../../../assets/gameback.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:88}}>{'Privacy & Security'}</Text>
                </View>
                <View style={{marginTop:30, marginLeft:24, marginRight:24}}>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:20, marginBottom:20}}>Change Password</Text>

                    <View style={{marginTop:20}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'#646060'}}>Current Password</Text>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:378, flexWrap:'wrap', borderWidth:1, borderLeftColor:'#928E8E', borderRightColor:'#928E8E', borderTopColor:'#928E8E', borderBottomColor:'#928E8E', borderRadius:8, paddingRight:15 }}>
                            <TextInput
                                secureTextEntry={this.state.currenttoggle==='Hide Password'?false:true}
                                placeholder={'Current Password'}
                                value={ this.state.currentpass }
                                onChangeText={(e)=>{this.setState({currentpass: e});}}
                                style={{outlineStyle:'none', width:260, height:44, borderWidth:1, borderLeftColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderTopColor:'rgba(0,0,0,0)', borderBottomColor:'rgba(0,0,0,0)', fontSize:18, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15}}
                            />
                            <TouchableOpacity  onPress={()=>{ this.setState({currenttoggle: this.state.currenttoggle==='Show Password'?'Hide Password':'Show Password'}); }}>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#4285F4'}}>{this.state.currenttoggle}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{color:this.state.currentcolor, fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.currentwarning}</Text>
                    </View>

                    <View style={{marginTop:25}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'#646060'}}>New Password</Text>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:378, flexWrap:'wrap', borderWidth:1, borderLeftColor:'#928E8E', borderRightColor:'#928E8E', borderTopColor:'#928E8E', borderBottomColor:'#928E8E', borderRadius:8, paddingRight:15 }}>
                            <TextInput
                                secureTextEntry={this.state.newtoggle==='Hide Password'?false:true}
                                placeholder={'New Password'}
                                value={ this.state.newpass }
                                onChangeText={(e)=>{this.setState({newpass: e});}}
                                style={{outlineStyle:'none', width:260, height:44, borderWidth:1, borderLeftColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderTopColor:'rgba(0,0,0,0)', borderBottomColor:'rgba(0,0,0,0)', fontSize:18, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15}}
                            />
                            <TouchableOpacity  onPress={()=>{ this.setState({newtoggle: this.state.newtoggle==='Show Password'?'Hide Password':'Show Password'}); }}>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#4285F4'}}>{this.state.newtoggle}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{color:this.state.newcolor, fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.newwarning}</Text>
                    </View>

                    <View style={{marginTop:25}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'#646060'}}>Retype Password</Text>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:378, flexWrap:'wrap', borderWidth:1, borderLeftColor:'#928E8E', borderRightColor:'#928E8E', borderTopColor:'#928E8E', borderBottomColor:'#928E8E', borderRadius:8, paddingRight:15 }}>
                            <TextInput
                                secureTextEntry={this.state.retypetoggle==='Hide Password'?false:true}
                                placeholder={'Retype Password'}
                                value={ this.state.retypepass }
                                onChangeText={(e)=>{this.setState({retypepass: e});}}
                                style={{outlineStyle:'none', width:260, height:44, borderWidth:1, borderLeftColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderTopColor:'rgba(0,0,0,0)', borderBottomColor:'rgba(0,0,0,0)', fontSize:18, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15}}
                            />
                            <TouchableOpacity  onPress={()=>{ this.setState({retypetoggle: this.state.retypetoggle==='Show Password'?'Hide Password':'Show Password'}); }}>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#4285F4'}}>{this.state.retypetoggle}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{color:this.state.retypecolor, fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.retypewarning}</Text>
                    </View>


                    <TouchableOpacity style={{width:Dimensions.get('window').width-36, height:56, flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:8, marginTop:80, backgroundColor:'black'}} onPress={()=>{this.changePassword();}}>
                        <Text style={{color:'white', fontFamily:'Chakra Petch Regular', fontSize:16}}>Change Password</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}

export default Privacy;