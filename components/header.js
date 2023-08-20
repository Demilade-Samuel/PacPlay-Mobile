import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

class Header extends Component{
    state={
        
    }
    
    render(){
        return(
            <View style={{...styles.viewTop}}>
                <View style={{...styles.viewTL}}>
                    <Image style={{width:40, height:40, borderRadius:'50%', marginRight:10}} source={{uri:'https://lh3.googleusercontent.com/a/AAcHTtd0T2Z9BXfB350McjCdHFVkoySPGdcJ7GG4JmgNS_28Q7I=s96-c'}}></Image>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:18}}>{this.props.username}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'flex-end'}}>
                    <Image source={require('./../assets/notification.png')}></Image>
                    <Image style={{position:'absolute', right:5}} source={require('./../assets/reddot.png')}></Image>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewTop: {
        flexDirection:'row', alignItems:'center', justifyContent:'space-between',
        width: Dimensions.get('window').width-30
    },

    viewTL: {
        flexDirection:'row', alignItems:'center', justifyContent:'flex-start',/* borderWidth:1, borderLeftColor:'black'*/
    },
});

export default Header;