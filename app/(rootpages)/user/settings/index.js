import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Switch } from 'react-native-switch';

class Settings extends Component {
    state={
        screenmode:''
    }

    async componentDidMount(){
        let screenmode = await AsyncStorage.getItem('screenmode');
        this.setState({screenmode: screenmode});
    }

    logout = async () => {
        let action = await AsyncStorage.multiRemove(['user', 'userdata']);
        navigation.navigate('/first');
    }

    changeTheme = async (e) => {
        let newtheme = e?'light':'dark';
        this.setState({screenmode: newtheme});
        await AsyncStorage.setItem('screenmode', newtheme);
        navigation.navigate('/user/settings')
    }

    render(){
    return(
        <View style={{width:Dimensions.get('window').width, flexDirection:'column', alignItems:'center', justifyContent:'flex-start', height:Dimensions.get('window').height, backgroundColor:this.state.screenmode==='dark'?'#181818':'white'}}>
            <Text style={{width:Dimensions.get('window').width, paddingLeft:24, paddingRight:24, fontFamily:'Chakra Petch SemiBold', fontSize:24, marginTop:20, textAlign:'center', marginBottom:20, color:this.state.screenmode==='dark'?'white':'black'}}>Settings</Text>
            
            <TouchableOpacity style={{marginTop:20,}} onPress={()=>{navigation.navigate('/user/settings/privacy');}}>
            <View style={{width:372, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingBottom:20, borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderLeftColor:'rgba(0,0,0,0)'}}>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                    <Image style={{width:40, height:40}} source={this.state.screenmode==='dark'?require('./../../../../assets/privacy-dark.png'):require('./../../../../assets/privacy.png')}></Image>
                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:20, marginLeft:10, color:this.state.screenmode==='dark'?'white':'black'}} >{'Privacy & Security'}</Text>
                </View>
                <Image source={this.state.screenmode==='dark'?require('./../../../../assets/next-dark.png'):require('./../../../../assets/next.png')}></Image>
            </View>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop:20,}} onPress={()=>{navigation.navigate('/user/settings/help');}}>
            <View style={{width:372, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingBottom:20, borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderLeftColor:'rgba(0,0,0,0)'}}>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                    <Image style={{width:40, height:40}} source={this.state.screenmode==='dark'?require('./../../../../assets/help-dark.png'):require('./../../../../assets/help.png')}></Image>
                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:20, marginLeft:10, color:this.state.screenmode==='dark'?'white':'black'}} >{'Help & Support'}</Text>
                </View>
                <Image source={this.state.screenmode==='dark'?require('./../../../../assets/next-dark.png'):require('./../../../../assets/next.png')}></Image>
            </View>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop:20,}} onPress={()=>{navigation.navigate('/user/settings/terms');}}>
            <View style={{width:372, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingBottom:20, borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderLeftColor:'rgba(0,0,0,0)'}}>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                    <Image style={{width:40, height:40}} source={this.state.screenmode==='dark'?require('./../../../../assets/terms-dark.png'):require('./../../../../assets/terms.png')}></Image>
                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:20, marginLeft:10, color:this.state.screenmode==='dark'?'white':'black'}} >{'Terms & Policies'}</Text>
                </View>
                <Image source={this.state.screenmode==='dark'?require('./../../../../assets/next-dark.png'):require('./../../../../assets/next.png')}></Image>
            </View>
            </TouchableOpacity>

            <View style={{width:372, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingBottom:20, marginTop:20, borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderLeftColor:'rgba(0,0,0,0)'}}>
                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:20, marginLeft:10, color:this.state.screenmode==='dark'?'white':'black'}}>Theme</Text>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', }}>
                    <Text style={{fontSize:18, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black', marginRight:12}}>Dark</Text>
                    <Switch
                        value={this.state.screenmode==='dark'?false:true}
                        onValueChange={(e)=>{this.changeTheme(e);}}
                        inActiveText=''
                        activeText=''
                        backgroundActive='#4285F4'
                        backgroundInactive='#1E9E40'
                        circleActiveColor='#928E8E'
                        circleInActiveColor='#343434'
                        circleBorderActiveColor='#4285F4'
                        circleBorderInactiveColor='#1E9E40'
                        circleBorderWidth={4}
                    />
                    <Text style={{fontSize:18, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black', marginLeft:12}}>Light</Text>
                </View>
            </View>


            <TouchableOpacity style={{marginTop:180}} onPress={()=>{this.logout();}}>
            <View style={{width:372, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingBottom:20, borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderLeftColor:'rgba(0,0,0,0)'}}>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                    <Image style={{width:40, height:40}} source={this.state.screenmode==='dark'?require('./../../../../assets/logout-dark.png'):require('./../../../../assets/logout.png')}></Image>
                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:20, marginLeft:10, color:this.state.screenmode==='dark'?'white':'black'}} >Logout</Text>
                </View>
                <Image source={this.state.screenmode==='dark'?require('./../../../../assets/next-dark.png'):require('./../../../../assets/next.png')}></Image>
            </View>
            </TouchableOpacity>
        </View>
    );
    }
}

export default Settings;