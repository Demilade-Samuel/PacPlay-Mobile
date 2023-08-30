import { View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const Settings = () => {


    logout = async () => {
        let action = await AsyncStorage.multiRemove(['user', 'userdata']);
        navigation.navigate('/first');
    }

    return(
        <View style={{width:Dimensions.get('window').width, flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
            <Text style={{width:Dimensions.get('window').width, paddingLeft:24, paddingRight:24, fontFamily:'Chakra Petch SemiBold', fontSize:24, marginTop:20, textAlign:'center', marginBottom:20}}>Settings</Text>
            
            <TouchableOpacity style={{marginTop:20,}} onPress={()=>{navigation.navigate('/user/settings/privacy');}}>
            <View style={{width:372, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingBottom:20, borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderLeftColor:'rgba(0,0,0,0)'}}>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                    <Image style={{width:40, height:40}} source={require('./../../../../assets/privacy.png')}></Image>
                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:20, marginLeft:10}} >{'Privacy & Security'}</Text>
                </View>
                <Image source={require('./../../../../assets/next.png')}></Image>
            </View>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop:20,}} onPress={()=>{navigation.navigate('/user/settings/help');}}></TouchableOpacity>
            <View style={{width:372, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingBottom:20, borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderLeftColor:'rgba(0,0,0,0)'}}>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                    <Image style={{width:40, height:40}} source={require('./../../../../assets/help.png')}></Image>
                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:20, marginLeft:10}} >{'Help & Support'}</Text>
                </View>
                <Image source={require('./../../../../assets/next.png')}></Image>
            </View>

            <TouchableOpacity style={{marginTop:20,}} onPress={()=>{navigation.navigate('/user/settings/terms');}}></TouchableOpacity>
            <View style={{width:372, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingBottom:20, borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderLeftColor:'rgba(0,0,0,0)'}}>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                    <Image style={{width:40, height:40}} source={require('./../../../../assets/terms.png')}></Image>
                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:20, marginLeft:10}} >{'Terms & Policies'}</Text>
                </View>
                <Image source={require('./../../../../assets/next.png')}></Image>
            </View>

            <TouchableOpacity style={{marginTop:180}} onPress={()=>{this.logout();}}>
            <View style={{width:372, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingBottom:20, borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderLeftColor:'rgba(0,0,0,0)'}}>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                    <Image style={{width:40, height:40}} source={require('./../../../../assets/logout.png')}></Image>
                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:20, marginLeft:10}} >Logout</Text>
                </View>
                <Image source={require('./../../../../assets/next.png')}></Image>
            </View>
            </TouchableOpacity>
        </View>
    );
}

export default Settings;