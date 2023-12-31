import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-web';

class CreateAcc extends Component{
    state={
        username:'',
        password:'',
        passwordconfirm:'',
        pass1toggle: 'Show password',
        pass2toggle: 'Show password',
        usernamewarning:'',
        pass1warning:'',
        pass2warning:'',
        reqloading: false,
        screenmode: ''
    }

    async componentDidMount(){
        let screenmode = await AsyncStorage.getItem('screenmode');
        this.setState({screenmode: screenmode});
    }

    createaccount = () => {
        if(!this.state.reqloading){  
            this.setState({usernamewarning:'', pass1warning:'', pass2warning:''});
            
            if(this.state.username!=='' && this.state.password!=='' && this.state.passwordconfirm!==''){
                if(this.state.password === this.state.passwordconfirm){
                    let data = {
                        username: this.state.username,
                        password: this.state.password
                    }
        
                    console.log(data);
                    this.setState({reqloading:true});
                    const response = fetch(
                        "http://localhost:3000/createaccount",
                        {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: { 'Content-Type': 'application/json' }
                        }  
                    ).then(response=>{
                        return response.json();
                    }).then(async response=>{
                        if(response.msg==='Username already exists'){
                            this.setState({usernamewarning:'Username already exists', reqloading:false});
                        }else{
                            await AsyncStorage.setItem('userdata', JSON.stringify(response.data));
                            navigation.navigate('/user/home');
                            this.setState({reqloading:false});
                        }
                    });
                }else{
                    this.setState({pass1warning:'Passwords not similar', pass2warning:'Passwords not similar'});
                }
            }else{
                if(this.state.username===''){ this.setState({usernamewarning:'This field cannot be empty'}); }
                if(this.state.password===''){ this.setState({pass1warning:'This field cannot be empty'}); }
                if(this.state.passwordconfirm===''){ this.setState({pass2warning:'This field cannot be empty'}); }
            }
        }
    }

    render(){
        return(
            <View style={{height:Dimensions.get('window').height, backgroundColor:this.state.screenmode==='dark'?'#181818':'white'}}>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <TouchableOpacity style={{marginLeft:10}} onPress={()=>{navigation.navigate('first');}}>
                        <Image source={this.state.screenmode==='dark'?require('./../../assets/gameback-dark.png'):require('./../../assets/gameback.png')} ></Image>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:68, color:this.state.screenmode==='dark'?'white':'black'}}>Create an account</Text>
                </View>
                <View style={{width: Dimensions.get('window').width, flexDirection:'column', justifyContent:'flex-start', alignItems:'center', marginTop:40/*, borderWidth:1, borderLeftColor:'black'*/}}>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:22, textAlign:'left', width:378, color:this.state.screenmode==='dark'?'white':'black'}}>Your friends are here,</Text>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:22, color:this.state.screenmode==='dark'?'#C8D1DB':'#646060', textAlign:'left', width:378, marginBottom:10}}>Let's get you started!</Text>
                    <Text style={{fontFamily:'Chakra Petch Regular', width:378, fontSize:14, color:this.state.screenmode==='dark'?'#C8D1DB':'#646060', marginTop:10}}>Already have an account? 
                        <TouchableOpacity onPress={()=>{navigation.navigate('/loginacc')}}><Text style={{color:this.state.screenmode==='dark'?'#1E9E40':'#4285F4', marginLeft:5}}>Login</Text></TouchableOpacity></Text>

                    <View style={{marginTop:20}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:this.state.screenmode==='dark'?'white':'#646060'}}>Username</Text>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:378, flexWrap:'wrap'}}>
                            <TextInput
                                placeholder={'Username'}
                                value={this.state.username}
                                onChangeText={(e)=>{this.setState({username: e});}}
                                style={{outlineStyle:'none', width:378, borderRadius:8, height:44, borderWidth:1, borderColor:'#928E8E', fontSize:18, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15, color:this.state.screenmode==='dark'?'white':'black'}}
                            />
                        </View>
                        
                        <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.usernamewarning}</Text>
                    </View>

                    <View style={{marginTop:20}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:this.state.screenmode==='dark'?'white':'#646060'}}>Password</Text>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:378, flexWrap:'wrap', borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'#928E8E', borderRadius:8, paddingRight:15, color:this.state.screenmode==='dark'?'white':'black'}}>
                            <TextInput
                                secureTextEntry={this.state.pass1toggle==='Hide Password'?false:true}
                                placeholder={'Password'}
                                value={this.state.password}
                                onChangeText={(e)=>{this.setState({password: e});}}
                                style={{outlineStyle: 'none', width:260, borderRadius:8, height:44, borderWidth:1, borderColor:'rgba(0,0,0,0)', color:this.state.screenmode==='dark'?'white':'black', fontSize:18, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15}}
                            />
                            <TouchableOpacity onPress={()=>{ this.setState({pass1toggle: this.state.pass1toggle==='Show Password'?'Hide Password':'Show Password'}); }}>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#4285F4'}}>{this.state.pass1toggle}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.pass1warning}</Text>
                    </View>

                    <View style={{marginTop:20}}>
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:this.state.screenmode==='dark'?'white':'#646060'}}>Confirm Password</Text>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:378, flexWrap:'wrap', borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'#928E8E', borderRadius:8, paddingRight:15}}>
                            <TextInput
                                secureTextEntry={this.state.pass2toggle==='Hide Password'?false:true}
                                placeholder={'Confirm Password'}
                                value={this.state.passwordconfirm}
                                onChangeText={(e)=>{this.setState({passwordconfirm: e});}}
                                style={{outlineStyle:'none', width:260, borderRadius:8, height:44, borderWidth:1, borderColor:'rgba(0,0,0,0)', color:this.state.screenmode==='dark'?'white':'black', fontSize:18, fontFamily:'Chakra Petch Regular', paddingLeft:15, paddingRight:15}}
                            />
                            <TouchableOpacity onPress={()=>{ this.setState({pass2toggle: this.state.pass2toggle==='Show Password'?'Hide Password':'Show Password'}); }}>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#4285F4'}}>{this.state.pass2toggle}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.pass2warning}</Text>
                    </View>

                    <TouchableOpacity style={{width:Dimensions.get('window').width-36, height:56, flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:8, marginTop:90, backgroundColor:this.state.screenmode==='dark'?'#1E9E40':'black'}} onPress={()=>{this.createaccount();}}>
                        <Text style={{display:!this.state.reqloading?'flex':'none', color:'white', fontFamily:'Chakra Petch Regular', fontSize:16}}>Create account</Text>
                        <ActivityIndicator style={{display:this.state.reqloading?'flex':'none'}} color="white"></ActivityIndicator>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default CreateAcc;

