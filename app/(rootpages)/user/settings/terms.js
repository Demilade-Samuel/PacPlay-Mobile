import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, CheckBox } from 'react-native';

class Terms extends Component{
    state={
        agree: false
    }

    render(){
        return(
            <View>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <Image style={{marginLeft:10}} source={require('./../../../../assets/gameback.png')}></Image>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:88}}>{'Terms & Policies'}</Text>
                </View>
                <View style={{marginTop:50, flexDirection:'column', alignItems:'center', justifyContent:'flex-start', width:Dimensions.get('window').width, paddingLeft:24, paddingRight:24}}>
                    <Text style={{textAlign:'center', fontFamily:'Chakra Petch Regular', color:'#646060'}}>
                        Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.
                    </Text>

                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:50}}>
                        <CheckBox
                            value={this.state.agree}
                            onValueChange={e=>{this.setState({agree:e});}}
                        />
                        <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginLeft:8}}>I agree to the terms and policies</Text>
                    </View>


                    <TouchableOpacity style={{width:Dimensions.get('window').width-36, height:56, flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:8, marginTop:120, backgroundColor:'rgba(11,11,11,0.1)'}}>
                        <Text style={{color:'white', fontFamily:'Chakra Petch Regular', fontSize:16}}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Terms;