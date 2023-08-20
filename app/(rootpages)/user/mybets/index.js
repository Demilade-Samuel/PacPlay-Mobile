import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Image, TouchableOpacity, ScrollView} from 'react-native';
import * as Font from 'expo-font';
import Header from '../../../../components/header';

class MyBets extends Component{
    state={
        activeTab: 'open'
    }

    render(){
        return(
            <ScrollView style={styles.containerView} horizontal showsHorizontalScrollIndicator={false} decelerationRate={0} snapToInterval={Dimensions.get('window').width} snapToAlignment={"center"} scrollEnabled={true}>
                
                <ActivityIndicator style={{display:'none', position:'absolute', top: Dimensions.get('window').height*0.45,  left: Dimensions.get('window').width*0.48}}></ActivityIndicator>
                
                <View style={{display:'flex', ...styles.mainView}}>
                    <Header/>
                    
                    <View style={styles.navContainer}>
                        <TouchableOpacity style={{width:100, height:42, flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor:this.state.activeTab==='open'?'#111111':'rgba(0,0,0,0)', borderRadius:4}}>
                            <Text style={{color:'white', fontSize:14, fontFamily:'Chakra Petch Regular'}}>Open Bets</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:100, height:42, flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor:this.state.activeTab==='history'?'#111111':'rgba(0,0,0,0)', borderRadius:4}}>
                            <Text style={{color:'white', fontSize:14, fontFamily:'Chakra Petch Regular'}}>Bet History</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.contentScroller}>
                        <View style={styles.dailyrow}>
                            <Text style={{ fontFamily:'Chakra Petch Regular', ...styles.date}}>Today</Text>
                            
                            <View style={styles.betrow}>
                                <Image source={require('./../../../../assets/gamelogo1.png')}/>
                                <View style={styles.bettext}>
                                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:15, color:'#646060'}}>Player1 VS Player2</Text>
                                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#1E9E40', marginTop:3}}>Won</Text>
                                </View>
                                <Image source={require('./../../../../assets/next.png')}/>
                            </View>
                        
                            <View style={styles.betrow}>
                                <Image source={require('./../../../../assets/gamelogo2.png')}/>
                                <View style={styles.bettext}>
                                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:15, color:'#646060'}}>Player1 VS Player2</Text>
                                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#0F19A6', marginTop:3}}>NGN 150</Text>
                                </View>
                                <Image source={require('./../../../../assets/next.png')}/>
                            </View>
                        
                            <View style={styles.betrow}>
                                <Image source={require('./../../../../assets/gamelogo3.png')}/>
                                <View style={styles.bettext}>
                                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:15, color:'#646060'}}>Player1 VS Player2</Text>
                                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#0F19A6', marginTop:3}}>NGN 200</Text>
                                </View>
                                <Image source={require('./../../../../assets/next.png')}/>
                            </View>
                        
                            <View style={styles.betrow}>
                                <Image source={require('./../../../../assets/gamelogo4.png')}/>
                                <View style={styles.bettext}>
                                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:15, color:'#646060'}}>Player1 VS Player2</Text>
                                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#E82828', marginTop:3}}>Lost</Text>
                                </View>
                                <Image source={require('./../../../../assets/next.png')}/>
                            </View>
                        
                        </View>

                    </ScrollView>
                </View>

                <View style={{display:'flex', ...styles.detailsView}}>
                    <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20, width:Dimensions.get('window').width}}>
                        <Image style={{marginLeft:10}} source={require('./../../../../assets/gameback.png')}></Image>
                        <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:108}}>Bet Details</Text>
                    </View>

                    <View style={{marginTop:9, width:382, height:198}}>
                        <Image source={require('./../../../../assets/gamebg.png')}/>
                        <View style={{position:'absolute', width:382, height:198, flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
                        <Text style={{marginTop:23, color:'#1E9E40', fontSize:16, fontFamily:'Chakra Petch Regular'}}>Won</Text>
                            <Text style={{marginTop:5, color:'white', fontSize:16, fontFamily:'Chakra Petch Regular'}}>Today</Text>
                            <View style={{marginTop:20, flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:362, height:80}}>
                                <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-between', height:80}}>
                                    <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:18}}>Player1</Text>
                                    <Image source={require('./../../../../assets/player1.png')}/>
                                </View>
                                <Text style={{fontFamily:'Chakra Petch SemiBold', color:'white', fontSize:24}}>3</Text>
                                <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:24}}>VS</Text>
                                <Text style={{fontFamily:'Chakra Petch SemiBold', color:'white', fontSize:24}}>2</Text>
                                <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-between', height:80}}>
                                    <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:18}}>Player2</Text>
                                    <Image source={require('./../../../../assets/player2.png')}/>
                                </View>
                            </View>  
                        </View>
                    </View>

                    <Text style={{fontFamily:'Chakra Petch Regular', fontSize:18, marginTop:20}}>This game was created by @demilade12</Text>

                    <View style={{width:382, height:280, marginTop:20, backgroundColor:'#EDEDED', borderRadius:8, flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
                        <View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:334, height:50, marginTop:10, borderWidth:1, borderBottomColor:'#C8D1DB', borderLeftColor:'rgba(0,0,0,0)', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)'}}>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#646060'}}>You staked on</Text>
                                <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:16, color:'#000000'}}>Player1 to win</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:334, height:50, borderWidth:1, borderBottomColor:'#C8D1DB', borderLeftColor:'rgba(0,0,0,0)', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)'}}>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#646060'}}>Amount staked</Text>
                                <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:16, color:'#000000'}}>NGN 400</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:334, height:40, marginBottom:15}}>
                            <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:16, color:'#000000'}}>You received</Text>
                            <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:20, color:'#000000'}}>NGN 2000</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    containerView: {
        width: Dimensions.get('window').width, height: Dimensions.get('window').height,
        backgroundColor:'white'
    },

    mainView: {
        width: Dimensions.get('window').width, flex:1, flexDirection: 'column', justifyContent: 'flex-start',
        paddingLeft:15, paddingRight:15, alignItems:'center', paddingTop:20
    },

    viewTop: {
        flexDirection:'row', alignItems:'center', justifyContent:'space-between',
        width: Dimensions.get('window').width-30,
    },

    viewTL: {
        flexDirection:'row', alignItems:'center', justifyContent:'flex-start',/* borderWidth:1, borderLeftColor:'black'*/
    },

    navContainer:{
        flexDirection:'row', alignItems:'center', justifyContent: 'space-around', width:Dimensions.get('window').width, height:70,
        backgroundColor:'#80987B', marginTop:15
    },

    contentScroller:{
        width:Dimensions.get('window').width,/* borderWidth:1, borderLeftColor:'black'*/
    },

    dailyrow: {
        width:Dimensions.get('window').width, flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start', paddingLeft:20, paddingRight:20, marginTop:16
    },

    date:{
        fontSize:14, color:'#928E8E'
    },

    betrow:{
        flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:372, height:85,
        borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'white', borderRightColor:'white', borderLeftColor:'white' 
    },

    bettext:{
        width:Dimensions.get('window').width*0.7, height:40, 
    },

    detailsView:{
        width: Dimensions.get('window').width, flex:1, flexDirection: 'column', justifyContent: 'flex-start',
        paddingLeft:15, paddingRight:15, alignItems:'center', paddingTop:20
    }
});

export default MyBets;