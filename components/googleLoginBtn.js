import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Image, Text } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLoginButton(props){
    const [userInfo, setUserInfo] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "63977248527-dhjam7h58jk4ltfmd2mm25kkbo0mtceo.apps.googleusercontent.com",
        iosClientId: "63977248527-nv8t25peabl2m86a4iosu2satk4kf4mp.apps.googleusercontent.com",
        webClientId: "63977248527-2te5mmoounboo1ols5f8i372tb7vnk51.apps.googleusercontent.com",
    });

    useEffect(()=>{
        handleSigninWithGoogle();
    }, [response]);

    async function handleSigninWithGoogle(){
        const user = await AsyncStorage.getItem('user');
        //console.log('>>>'+user);
        if(!user){
            if(response?.type === "success"){
                await getUserInfo(response.authentication.accessToken);
            }
            
        }else{
            setUserInfo(JSON.parse(user));
            console.log(user);
            backendComm(user);
            
        }
    }

    backendComm = (user) => {
        console.log('hiii');
        const response = fetch(
            "http://localhost:3000/loginauthentication",
            {
                method: 'POST',
                body: user,
                headers: { 'Content-Type': 'application/json' }
            }  
        ).then(response=>{
            return response.json();
        }).then(response=>{
            props.navigate(response);
            console.log(response);
        });
    } 

    const getUserInfo = async (token) => {
        if(!token) return;

        try{
            const response = fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            ).then(response=>{
                return response.json();
            }).then(async response=>{
                await AsyncStorage.setItem('user', JSON.stringify(response));
                let user = await AsyncStorage.getItem('user');
                setUserInfo(user);
                backendComm(user);
            });
        } catch(error){
            console.log(error);
        }
    }

    return(
        <TouchableOpacity onPress={()=>{promptAsync()}} style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop:10}}>
            <Image style={{width:240, height:41}} source={require('./../assets/whiterect.png')}/>
            <Text style={{ position:'absolute', fontFamily:'Chakra Petch Regular', color:'black'}}>Login with Google</Text>
        </TouchableOpacity>
    );
}