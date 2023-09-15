import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, CheckBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Terms extends Component{
    state={
        agree: false,
        screenmode: ''
    }

    async componentDidMount(){
        let screenmode = await AsyncStorage.getItem('screenmode');
        this.setState({screenmode: screenmode});
    }

    render(){
        return(
            <View style={{height:Dimensions.get('window').height, backgroundColor:this.state.screenmode==='dark'?'#181818':'white'}}>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('/user/settings');}}>
                    <Image style={{marginLeft:10}} source={this.state.screenmode==='dark'?require('./../../../../assets/gameback-dark.png'):require('./../../../../assets/gameback.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:88, color:this.state.screenmode==='dark'?'white':'black'}}>{'Terms & Policies'}</Text>
                </View>
                <View style={{marginTop:50, flexDirection:'column', alignItems:'center', justifyContent:'flex-start', width:Dimensions.get('window').width, paddingLeft:24, paddingRight:24}}>
                    <Text style={{textAlign:'center', fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'#646060'}}>
                        Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.
                    </Text>

                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:50}}>
                        <CheckBox
                            value={this.state.agree}
                            onValueChange={e=>{this.setState({agree:e});}}
                        />
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginLeft:8, color:this.state.screenmode==='dark'?'white':'black'}}>I agree to the terms and policies</Text>
                    </View>


                    <TouchableOpacity style={{width:Dimensions.get('window').width-36, height:56, flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:8, marginTop:120, backgroundColor:this.state.screenmode==='dark'?'#1E9E40':'rgba(11,11,11,0.1)'}}>
                        <Text style={{color:'white', fontFamily:'Chakra Petch Regular', fontSize:16}}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Terms;