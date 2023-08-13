import React, { Component } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import * as Font from 'expo-font';

class Home extends Component {
    state={
        loading: true,
    }

    async componentDidMount(){
        await Font.loadAsync({
            'ChakraPetchBold': require('./../../../../assets/fonts/ChakraPetch-SemiBold.ttf'),
            'ChakraPetchRegular': require('./../../../../assets/fonts/ChakraPetch-Regular.ttf'),
        });
        while(!Font.isLoaded('ChakraPetchBold') && !Font.isLoaded('ChakraPetchRegular')){
            continue;
        }
        this.setState({loading: false});
    }

    render(){
        return(
            <ScrollView style={styles.mainScrollView} contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator style={{display: this.state.loading?'flex':'none'}}></ActivityIndicator>
                <View style={{display: !this.state.loading?'flex':'none', ...styles.mainView}}>
                    <View style={{...styles.viewTop}}>
                        <View style={{...styles.viewTL}}>
                            <Image style={{width:40, height:40, borderRadius:'50%', marginRight:10}} source={{uri:'https://lh3.googleusercontent.com/a/AAcHTtd0T2Z9BXfB350McjCdHFVkoySPGdcJ7GG4JmgNS_28Q7I=s96-c'}}></Image>
                            <Text style={{fontFamily: !this.state.loading ? 'ChakraPetchBold' : '', fontSize:18}}>the_Temidayo</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'flex-end'}}>
                            <Image source={require('./../../../../assets/notification.png')}></Image>
                            <Image style={{position:'absolute', right:5}} source={require('./../../../../assets/reddot.png')}></Image>
                        </View>
                    </View>
                    <View style={{position:'relative', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', marginTop:30}}>
                        <Image source={require('./../../../../assets/homecard2.png')}></Image>
                        <View style={{position: 'absolute', top:20}}>
                            <Image source={require('./../../../../assets/homecard1.png')}></Image>
                            <View style={{position:'absolute', width:382, height:150, flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
                                <Text style={{width:322, marginTop:20, marginBottom:49, fontFamily:!this.state.loading?'ChakraPetchRegular':'', fontSize:12, color:'white'}}>Your Wallet</Text>
                                <View style={{width:322, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                    <Text style={{fontFamily:!this.state.loading?'ChakraPetchBold':'', fontSize:24, color:'white'}}>NGN 12,000</Text>
                                    <Image style={{width:18, height:23}} source={require('./../../../../assets/homecardwifi.png')}></Image>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{width:400, height:80, marginTop:70, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{width:90, height:80, flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
                            <Image source={require('./../../../../assets/deposit.png')}></Image>
                            <Text style={{fontFamily:'ChakraPetchRegular', fontSize:12, color:'#646863'}}>Fund Wallet</Text>
                        </View>
                        <View style={{width:90, height:80, flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
                            <Image source={require('./../../../../assets/withdraw.png')}></Image>
                            <Text style={{fontFamily:'ChakraPetchRegular', fontSize:12, color:'#646863'}}>Withdraw Funds</Text>
                        </View>
                        <View style={{width:90, height:80, flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
                            <Image source={require('./../../../../assets/invite.png')}></Image>
                            <Text style={{fontFamily:'ChakraPetchRegular', fontSize:12, color:'#646863'}}>Invite Friends</Text>
                        </View>
                        <View style={{width:90, height:80, flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
                            <Image source={require('./../../../../assets/bills.png')}></Image>
                            <Text style={{fontFamily:'ChakraPetchRegular', fontSize:12, color:'#646863'}}>Bill Payments</Text>
                        </View>
                    </View>
                    
                    <View style={{marginTop:24, width:382, height:60, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <TouchableOpacity style={{width:182, height:60, borderRadius:8, backgroundColor:'black', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <Image source={require('./../../../../assets/creategame.png')}></Image>
                            <Text style={{fontFamily:'ChakraPetchRegular', fontSize:14, color:'white', marginLeft:8}}>Create Game</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:182, height:60, borderRadius:8, backgroundColor:'#9BF08B', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <Image source={require('./../../../../assets/joingame.png')}></Image>
                            <Text style={{fontFamily:'ChakraPetchRegular', fontSize:14, color:'black', marginLeft:8}}>Join Game</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:40, width:383}}>
                        <Text style={{fontFamily:'ChakraPetchRegular', fontSize:16, color:'#928E8E', marginBottom:7}}>Transactions</Text>
                        <View style={{marginTop:15, flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start'}}>
                            <Text style={{color:'#928E8E', fontFamily:'ChakraPetchRegular', fontSize:12}}>Today</Text>
                            <View style={{ width:383, height:83, flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderWidth:1, borderBottomColor:'#E6F1FE', borderTopColor:'white', borderLeftColor:'white', borderRightColor:'white', }}>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                                    <Image style={{marginRight:8}} source={require('./../../../../assets/staketrans.png')}></Image>
                                    <View style={{flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                        <Text style={{fontFamily:'ChakraPetchRegular', fontSize:14}}>Bet Transaction</Text>
                                        <Text style={{fontFamily:'ChakraPetchRegular', fontSize:13, marginTop:3}}>Staked NGN 50</Text>
                                    </View>
                                </View>
                                <Text style={{fontFamily:'ChakraPetchRegular', color:'#928E8E', fontSize:12}}>11:59</Text>
                            </View>
                        </View>
                        <View style={{marginTop:15, flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start'}}>
                            <Text style={{color:'#928E8E', fontFamily:'ChakraPetchRegular', fontSize:12}}>27/07/2023</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    mainScrollView: {
        width: Dimensions.get('window').width, height: Dimensions.get('window').height,
        backgroundColor:'white'
        
    },

    mainView: {
        width: Dimensions.get('window').width, flex:1, flexDirection: 'column', justifyContent: 'flex-start',
        paddingLeft:15,  paddingRight:15, alignItems:'center', paddingTop:20
    },

    viewTop: {
        flexDirection:'row', alignItems:'center', justifyContent:'space-between',
        width: Dimensions.get('window').width-30,
    },

    viewTL: {
        flexDirection:'row', alignItems:'center', justifyContent:'flex-start',/* borderWidth:1, borderLeftColor:'black'*/
    },

    dates: {

    },
});

export default Home;