import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';


/*tabBarStyle: {display: 'none' */
const RootLayout = () => {
    const [screenmode, setScreenMode] = useState('');

    useEffect(()=>{
        async function theme(){
            let screenmode = await AsyncStorage.getItem('screenmode');
            setScreenMode(screenmode);
        }

        theme();
        
    }, [setScreenMode]);

    return(
        <Tabs screenOptions={{tabBarStyle: {...ScreenOptions.tabBarStyle, backgroundColor:screenmode==='dark'?'#343434':'#F8F8F8', borderTopColor:screenmode==='dark'?'#343434':'#C8D1DB', borderBottomColor:screenmode==='dark'?'#343434':'#C8D1DB', borderLeftColor:screenmode==='dark'?'#343434':'#C8D1DB', borderRightColor:screenmode==='dark'?'#343434':'#C8D1DB'}, tabBarItemStyle: ScreenOptions.tabBarItemStyle, tabBarShowLabel:false }}>
            <Tabs.Screen name="home" style={{backgroundColor:'white'}} options={{headerShown: false, href:'/user/home',
                tabBarIcon: ({size, focused, color})=>{ 
                    if(focused){
                        if(screenmode==='dark'){
                            return(<Image style={{width:size, height:size}} source={require('./../../../assets/home-dark.png')}/>);
                        }else{
                            return(<Image style={{width:size, height:size}} source={require('./../../../assets/home1.png')}/>);
                        }
                    }else{
                        return(<Image style={{width:size, height:size}} source={require('./../../../assets/home.png')}/>);
                    }   
                } }}/>
            <Tabs.Screen name="mybets" options={{headerShown: false,href:'/user/mybets',
                tabBarIcon: ({size, focused, color})=>{ 
                    if(focused){
                        if(screenmode==='dark'){
                            return( <Image style={{width:size, height:size}} source={require('./../../../assets/game-dark.png')}/>);
                        }else{
                            return( <Image style={{width:size, height:size}} source={require('./../../../assets/game1.png')}/>);
                        }
                    }else{
                        return( <Image style={{width:size, height:size}} source={require('./../../../assets/game.png')}/>);
                    }
                } }}/>
            <Tabs.Screen name="wallet" options={{headerShown: false, href:'/user/wallet',
                tabBarIcon: ({size, focused, color})=>{ 
                    if(focused){
                        if(screenmode==='dark'){
                            return( <Image style={{width:size, height:size}} source={require('./../../../assets/tabcard1-dark.png')}/>);
                        }else{
                            return( <Image style={{width:size, height:size}} source={require('./../../../assets/card1.png')}/>);
                        }
                    }else{
                        return( <Image style={{width:size, height:size}} source={require('./../../../assets/card.png')}/>);
                    }
                }} }/>
            <Tabs.Screen name="settings" options={{headerShown: false, href:'/user/settings',
                tabBarIcon: ({size, focused, color})=>{ 
                    if(focused){
                        if(screenmode==='dark'){
                            return( <Image style={{width:size, height:size}} source={require('./../../../assets/settings-dark.png')}/>);
                        }else{
                            return( <Image style={{width:size, height:size}} source={require('./../../../assets/settings1.png')}/>);
                        }
                    }else{
                        return( <Image style={{width:size, height:size}} source={require('./../../../assets/settings.png')}/>);
                    }
                }} }/>
        </Tabs>
    )
}

const ScreenOptions = {
    tabBarStyle: {
        position:'absolute',
        height:70,
        borderWidth:1, borderTopLeftRadius:24, borderTopRightRadius:24,
    },

    tabBarItemStyle: {
        margin: 5,
        borderRadius: 10,
        flexDirection:'column', alignItems:'center', justifyContent:'center',
    }
}

export default RootLayout;