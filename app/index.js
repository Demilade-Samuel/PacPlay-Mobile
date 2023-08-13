//web 63977248527-2te5mmoounboo1ols5f8i372tb7vnk51.apps.googleusercontent.com
//ios 63977248527-nv8t25peabl2m86a4iosu2satk4kf4mp.apps.googleusercontent.com
//android 63977248527-dhjam7h58jk4ltfmd2mm25kkbo0mtceo.apps.googleusercontent.com

import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet} from 'react-native';
import { Link } from 'expo-router';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

class Index extends Component{
    state = {
        userInfo: null
    }

    async componentDidMount(){
        let userinfo = await AsyncStorage.getItem('user');
        console.log(userinfo);
        this.setState({userInfo: userinfo});
    }

    render(){
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.bg} source={require('./../assets/loadingbg.jpg')} resizeMode="cover">
                    <Link style={styles.logolink} href={this.state.userInfo?'/user':'/signin'}>
                        <Image style={styles.logo} source={require('./../assets/logo.png')}></Image>
                    </Link>
                    <Image style={styles.iam} source={require('./../assets/itsamatch.png')}></Image>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center',
        backgroundColor: 'white'
    },

    bg: { 
        width:'100%', height:'100%', flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center',
    },

    logolink: {
        width:115, height:200, flexDirection:'row', alignItems: 'center', justifyContent: 'center'
    },

    logo: {
        width:115, height:130
    }
})

export default Index;