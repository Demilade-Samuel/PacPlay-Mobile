import { Tabs } from 'expo-router';
import { Image } from 'react-native';


/*tabBarStyle: {display: 'none' */
const RootLayout = () => {

    return(
        <Tabs screenOptions={{tabBarStyle: ScreenOptions.tabBarStyle, tabBarItemStyle: ScreenOptions.tabBarItemStyle, tabBarShowLabel:false }}>
            <Tabs.Screen name="home" style={{backgroundColor:'white'}} options={{headerShown: false, href:'/user/home',
                tabBarIcon: ({size, focused, color})=>{ 
                    if(focused){
                        return(<Image style={{width:size, height:size}} source={require('./../../../assets/home1.png')}/>);
                    }else{
                        return(<Image style={{width:size, height:size}} source={require('./../../../assets/home.png')}/>);
                    }   
                } }}/>
            <Tabs.Screen name="mybets" options={{headerShown: false,href:'/user/mybets',
                tabBarIcon: ({size, focused, color})=>{ 
                    if(focused){
                        return( <Image style={{width:size, height:size}} source={require('./../../../assets/game1.png')}/>);
                    }else{
                        return( <Image style={{width:size, height:size}} source={require('./../../../assets/game.png')}/>);
                    }
                } }}/>
            <Tabs.Screen name="wallet" options={{headerShown: false, href:'/user/wallet',
                tabBarIcon: ({size, focused, color})=>{ 
                    if(focused){
                        return( <Image style={{width:size, height:size}} source={require('./../../../assets/card1.png')}/>);
                    }else{
                        return( <Image style={{width:size, height:size}} source={require('./../../../assets/card.png')}/>);
                    }
                }} }/>
            <Tabs.Screen name="settings" options={{headerShown: false, href:'/user/settings',
                tabBarIcon: ({size, focused, color})=>{ 
                    if(focused){
                        return( <Image style={{width:size, height:size}} source={require('./../../../assets/settings1.png')}/>);
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
        backgroundColor: '#F8F8F8',
        height:70,
        borderWidth:1, borderTopLeftRadius:24, borderTopRightRadius:24,
        borderLeftColor: '#C8D1DB', borderTopColor: '#C8D1DB', borderBottomColor: '#C8D1DB', borderRightColor: '#C8D1DB'
        
    },

    tabBarItemStyle: {
        margin: 5,
        borderRadius: 10,
        flexDirection:'column', alignItems:'center', justifyContent:'center',
    }
}

export default RootLayout;