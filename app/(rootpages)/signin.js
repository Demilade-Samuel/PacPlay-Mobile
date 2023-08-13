import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import * as Font from 'expo-font';
import {useFonts} from 'expo-font';
//import * as SplashScreen from 'expo-splash-screen';
//import * as WebBrowser from "expo-web-browser";
//import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoogleLoginButton from './../../components/googleLoginBtn.js';

//SplashScreen.preventAutoHideAsync();

class SignIn extends Component{
    constructor(props){
        super(props);
        this.scrollViewRef = React.createRef();
    }

    state = {
        fontloading: true,
        page: 0,
        user: null
    }

    /*loadFonts = async () => {
        let [fontsLoaded] = useFonts({ 
            'ChakraPetchBold': require('./../../assets/fonts/ChakraPetch-SemiBold.ttf'),
            'ChakraPetchRegular': require('./../../assets/fonts/ChakraPetch-Regular.ttf'),
        });
        
        if(fontsLoaded){
            await SplashScreen.hideAsync();
        }

        this.setState({fontsLoaded: fontsLoaded});
    }*/

    async componentDidMount(){
        //await loadFonts();
        await Font.loadAsync({
            'ChakraPetchBold': require('./../../assets/fonts/ChakraPetch-SemiBold.ttf'),
            'ChakraPetchRegular': require('./../../assets/fonts/ChakraPetch-Regular.ttf'),
        });

        this.timer = setInterval(()=>{
            let page = this.state.page<=1 ? this.state.page+1 : 0; 
            this.scrollViewRef.current?.scrollTo({ x: Dimensions.get('window').width * page, animated: true});
            this.setState({page: page});
        }, 5000);

        while(!Font.isLoaded('ChakraPetchBold') && !Font.isLoaded('ChakraPetchRegular')){
            continue;
        }
        this.setState({ fontloading: false });
        
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    render(){
        return(
            <SafeAreaView style={{width: Dimensions.get('window').width, height: !this.state.fontloading?'':Dimensions.get('window').height, 
                flexDirection:'column', alignItems: 'center', justifyContent:'center'}}>
                <ActivityIndicator style={{margin:'auto', display:this.state.fontloading?'flex':'none'}}></ActivityIndicator>
                <ScrollView ref={this.scrollViewRef} style={{ marginTop:60, overflowX: 'none', display:!this.state.fontloading?'flex':'none'}} 
                    showsHorizontalScrollIndicator={false} horizontal decelerationRate={0} snapToInterval={Dimensions.get('window').width} snapToAlignment={"center"} scrollEnabled={false}>
                    <View style={styles.gallDiv1}>
                        <View style={styles.textCont1}>
                            <Text style={{fontFamily: !this.state.fontloading?'ChakraPetchBold':'', fontSize: 30}}>Your Friends are Here!</Text>
                            <Text style={{fontFamily: !this.state.fontloading?'ChakraPetchRegular':'', fontSize: 14}}>PacPlay, where friends stake together and win together.</Text>
                        </View>
                        <Image style={styles.img1} source={require('./../../assets/mbappeleft.png')}></Image>
                    </View>
                    <View style={styles.gallDiv2}>
                        <Image style={styles.img2} source={require('./../../assets/mbapperight.png')}></Image>
                        <View style={styles.textCont2}>
                            <Text style={{fontFamily: !this.state.fontloading?'ChakraPetchBold':'', fontSize: 30, textAlign: 'right'}}>"Bet, stake and celebrate with friends!"</Text>
                            <Text style={{fontFamily: !this.state.fontloading?'ChakraPetchRegular':'', fontSize: 14, textAlign: 'right'}}>Join the ultimate betting experience. Invite friends, stake bets and let the winnings flow!</Text>
                        </View>
                    </View>
                    <View style={styles.gallDiv3}>
                        <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', alingItems: 'center', width: Dimensions.get('window').width, marginTop: 50}}>
                            <Image style={{width:180, height:180 }} source={require('./../../assets/handcash.png')}></Image>
                            <Image style={{width:180, height:180 }} source={require('./../../assets/coinbag.png')}></Image>
                        </View>
                        <View style={styles.textCont3}>
                            <Text style={{fontFamily: !this.state.fontloading?'ChakraPetchBold':'', fontSize: 30, textAlign: 'center'}}>"Double the fun, double the stakes!</Text>
                            <Text style={{fontFamily: !this.state.fontloading?'ChakraPetchRegular':'', fontSize: 14, textAlign: 'center'}}>"Turn bets into shared victories! Invite friends to join your betting circle and enjoy winning together"</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={{display:!this.state.fontloading?'flex':'none', width: Dimensions.get('window').width, flexDirection:'column', alignItems:'center', marginTop: 20}}>
                    <TouchableOpacity style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop:20}}>
                        <Image style={{width:240, height:41}} source={require('./../../assets/blackrect.png')}/>
                        <Text style={{ position:'absolute', fontFamily:!this.state.fontloading?'ChakraPetchRegular':'', color:'white'}}>
                            Lets get started
                        </Text>
                    </TouchableOpacity>
                    <GoogleLoginButton Font={Font}/>
                </View>
            </SafeAreaView>
        )
    }
} 

const styles = StyleSheet.create({ 
    gallDiv1: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: Dimensions.get('window').width
    },

    gallDiv2: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: Dimensions.get('window').width
    },

    gallDiv3: {
        flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: Dimensions.get('window').width
    },

    textCont1: {
        width:180, /*borderWidth: 2, borderLeftColor: 'blue',*/ position: 'absolute', left: 10
    },

    textCont2: {
        width:220, /*borderWidth: 2, borderLeftColor: 'blue',*/ position: 'absolute', right:10
    },

    textCont3: {
        width:280, /*borderWidth: 2, borderLeftColor: 'blue',*/ position: 'absolute', bottom:30
    },

    img1: { width:260, height:500, marginLeft:0, marginRight:0},
    img2: { width:225, height:500, marginLeft:0, marginRight:0},
});


export default SignIn;