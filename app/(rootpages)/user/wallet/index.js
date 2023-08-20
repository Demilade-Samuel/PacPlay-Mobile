import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import Header from '../../../../components/header';
import VirtualCard from '../../../../components/virtualcard';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Wallet extends Component{
    state={
        loading:true,
        userdata: {}
    }

    async componentDidMount(){
        let data = await AsyncStorage.getItem('userdata');
        data = JSON.parse(data);
        
        if(data){
            this.setState({userdata: data, loading:false});
        }else{
            await AsyncStorage.multiRemove(['userdata', 'user']);
            router.push({pathname:'/signin'})
        }
    }
    
    render(){
        return(
            <View style={styles.containerView}>
                <ActivityIndicator style={{display:this.state.loading?'flex':'none', position:'absolute', top: Dimensions.get('window').height*0.45,  left: Dimensions.get('window').width*0.48}}></ActivityIndicator>
                <View style={{display:!this.state.loading?'flex':'none', ...styles.mainView}}>
                    <Header
                        username={this.state.userdata.username}
                    />
                    <VirtualCard
                        wallet={this.state.userdata.wallet}
                    />

                    <View style={{flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start', marginTop:75}}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('/user/wallet/deposit');}} style={{width:366, height:80, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderWidth:1, borderLeftColor:'rgba(0,0,0,0)', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderBottomColor:'#C8D1DB'}}>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                                <Image style={{marginRight:12}} source={require('./../../../../assets/deposit.png')}/>
                                <Text style={{fontFamily:'Chakra Petch Regular', color:'#646863', fontSize:18}}>Deposit</Text>
                            </View>
                            <Image source={require('./../../../../assets/next.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.navigate('/user/wallet/withdraw');}} style={{width:366, height:80, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderWidth:1, borderLeftColor:'rgba(0,0,0,0)', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderBottomColor:'#C8D1DB'}}>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                                <Image style={{marginRight:12}} source={require('./../../../../assets/withdraw.png')}/>
                                <Text style={{fontFamily:'Chakra Petch Regular', color:'#646863', fontSize:18}}>Withdraw</Text>
                            </View>
                            <Image source={require('./../../../../assets/next.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{navigation.navigate('/user/wallet/billpayment');}} style={{width:366, height:80, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderWidth:1, borderLeftColor:'rgba(0,0,0,0)', borderTopColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)', borderBottomColor:'#C8D1DB'}}>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                                <Image style={{marginRight:12}} source={require('./../../../../assets/bills.png')}/>
                                <Text style={{fontFamily:'Chakra Petch Regular', color:'#646863', fontSize:18}}>Bill Payments</Text>
                            </View>
                            <Image source={require('./../../../../assets/next.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
});

export default Wallet;