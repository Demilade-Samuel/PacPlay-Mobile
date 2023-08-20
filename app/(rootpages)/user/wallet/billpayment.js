import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, Dimensions, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

class BillPayment extends Component{
    state={
        airtime: '',
        phone: '',
        dataplan: '',
        provider: '',
        amount: ''
    }

    render(){
        return(
            <View>
                <ActivityIndicator style={{display:'none', position:'absolute', top: Dimensions.get('window').height*0.45,  left: Dimensions.get('window').width*0.48}}></ActivityIndicator>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <Image style={{marginLeft:10}} source={require('./../../../../assets/gameback.png')}></Image>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:108}}>Bill Payments</Text>
                </View>
                <ScrollView style={{display:'flex', marginTop:15, width: Dimensions.get('window').width}} horizontal
                    showsHorizontalScrollIndicator={false} decelerationRate={0} snapToInterval={Dimensions.get('window').width} snapToAlignment={"center"} scrollEnabled={true}>
                    
                    <View style={{width:Dimensions.get('window').width, alignItems:'center', marginTop:40}}>
                        <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'space-around', flexWrap:'wrap', width:382, height:430}}>
                            <View style={{backgroundColor:'rgba(39,172,14,0.1)', width:185, height:134, flexDirection:'column', alignItems:'center', justifyContent:'center', borderRadius:8, paddingLeft:10, paddingRight:10, marginTop:8}}>
                                <Image source={require('./../../../../assets/airtime.png')}/>
                                <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:16, marginTop:8}}>Airtime</Text>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:10, color:'#646060', textAlign:'center', marginTop:4}}>Purchase airtime for all networks on PacPlay</Text>
                            </View>

                            <View style={{backgroundColor:'rgba(16,54,188,0.1)', width:185, height:134, flexDirection:'column', alignItems:'center', justifyContent:'center', borderRadius:8, paddingLeft:10, paddingRight:10, marginTop:8}}>
                                <Image source={require('./../../../../assets/data.png')}/>
                                <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:16, marginTop:8}}>Data Bundle</Text>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:10, color:'#646060', textAlign:'center', marginTop:4}}>Purchase data bundle offers for all networks on PacPlay</Text>
                            </View>

                            <View style={{backgroundColor:'rgba(244,25,25,0.1)', width:185, height:134, flexDirection:'column', alignItems:'center', justifyContent:'center', borderRadius:8, paddingLeft:10, paddingRight:10, marginTop:8}}>
                                <Image source={require('./../../../../assets/power.png')}/>
                                <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:16, marginTop:8}}>Power</Text>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:10, color:'#646060', textAlign:'center', marginTop:4}}>Purchase your electricity meter bills on PacPlay</Text>
                            </View>
                            
                            <View style={{backgroundColor:'rgba(13,158,149,0.1)', width:185, height:134, flexDirection:'column', alignItems:'center', justifyContent:'center', borderRadius:8, paddingLeft:10, paddingRight:10, marginTop:8}}>
                                <Image source={require('./../../../../assets/cable.png')}/>
                                <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:16, marginTop:8}}>Cable TV</Text>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:10, color:'#646060', textAlign:'center', marginTop:4}}>Purchase any cable network for you entertainment on PacPlay</Text>
                            </View>
                            
                            <View style={{backgroundColor:'rgba(66,133,244,0.1)', width:185, height:134, flexDirection:'column', alignItems:'center', justifyContent:'center', borderRadius:8, paddingLeft:10, paddingRight:10, marginTop:8}}>
                                <Image source={require('./../../../../assets/internet.png')}/>
                                <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:16, marginTop:8}}>Internet</Text>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:10, color:'#646060', textAlign:'center', marginTop:4}}>Purchase any internet connectivity package on PacPlay</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{width:Dimensions.get('window').width, alignItems:'center'}}>
                        <Text style={{width:352, fontFamily:'Chakra Petch Regular', fontSize:18, marginBottom:5}}>Choose an amount</Text>
                        <View style={{ width:382, height:98, flexDirection:'row', alignItems:'flex-start', justifyContent:'space-around', paddingLeft:10, paddingRight:10, marginTop:8, flexWrap:'wrap'}}>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:117, height:40, borderRadius:6, backgroundColor:'#E7E8E7'}}>
                                <Image source={require('./../../../../assets/nairaplan.png')}/>
                                <Text style={{color:'#646060'}}>100</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:117, height:40, borderRadius:6, backgroundColor:'#E7E8E7'}}>
                                <Image source={require('./../../../../assets/nairaplan.png')}/>
                                <Text style={{color:'#646060'}}>200</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:117, height:40, borderRadius:6, backgroundColor:'#E7E8E7'}}>
                                <Image source={require('./../../../../assets/nairaplan.png')}/>
                                <Text style={{color:'#646060'}}>500</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:117, height:40, borderRadius:6, backgroundColor:'#E7E8E7'}}>
                                <Image source={require('./../../../../assets/nairaplan.png')}/>
                                <Text style={{color:'#646060'}}>1000</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:117, height:40, borderRadius:6, backgroundColor:'#E7E8E7'}}>
                                <Image source={require('./../../../../assets/nairaplan.png')}/>
                                <Text style={{color:'#646060'}}>2000</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:117, height:40, borderRadius:6, backgroundColor:'#E7E8E7'}}>
                                <Image source={require('./../../../../assets/nairaplan.png')}/>
                                <Text style={{color:'#646060'}}>5000</Text>
                            </View>
                        </View>

                        <View style={{width:362, marginTop:10}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'#646060'}}>Other amount</Text>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:362, height:42, borderWidth:1, borderLeftColor:'black', borderRadius:8, paddingLeft:15, paddingRight:15, marginTop:5}}>
                                <Image style={{width:16, height:16}} source={'./../../../../assets/naira.png'} />
                                <TextInput
                                    onChangeText={(e)=>{this.setState({airtime: e});}}
                                    value={this.state.airtime}
                                    keyboardType='numeric'
                                    style={{marginLeft:10, height:36, width:338, outlineStyle:'none', fontSize:22, fontFamily:'Chakra Petch SemiBold'}}
                                />
                            </View>
                        </View>

                        <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'space-around', width:382, height:200, marginTop:15, flexWrap:'wrap'}}>
                            <View style={{width:173, height:90, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(255,204,1,0.1)', borderRadius:8}}>
                                <Image style={{width:40, height:40}} source={require('./../../../../assets/mtn.png')}/>
                                <Text style={{marginTop:6, fontSize:14, fontFamily:'Chakra Petch SemiBold'}}>MTN-NG</Text>
                            </View>
                            <View style={{width:173, height:90, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(246,10,11,0.1)', borderRadius:8}}>
                                <Image style={{width:40, height:40}}  source={require('./../../../../assets/airtel.png')}/>
                                <Text style={{marginTop:6, fontSize:14, fontFamily:'Chakra Petch SemiBold'}}>Airtel-NG</Text>
                            </View>
                            <View style={{width:173, height:90, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,189,61,0.1)', borderRadius:8}}>
                                <Image style={{width:40, height:40}}  source={require('./../../../../assets/glo.png')}/>
                                <Text style={{marginTop:6, fontSize:16, fontFamily:'Chakra Petch SemiBold'}}>Glo-NG</Text>
                            </View>
                            <View style={{width:173, height:90, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(1,112,80,0.1)', borderRadius:8}}>
                                <Image style={{width:40, height:40}}  source={require('./../../../../assets/9mobile.png')}/>
                                <Text style={{marginTop:6, fontSize:16, fontFamily:'Chakra Petch SemiBold'}}>9Mobile-NG</Text>
                            </View>
                        </View>

                        <View style={{marginTop:10, flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#646060', marginBottom:5}}>Phone Number</Text>
                            <TextInput
                                onChangeText={(e)=>{this.setState({phone: e});}}
                                value={this.state.phone}
                                keyboardType='numeric'
                                style={{height:56, width:362, outlineStyle:'none', fontSize:30, fontFamily:'Chakra Petch SemiBold', paddingLeft:15, paddingRight:15, borderWidth:1, borderLeftColor:'#C8D1DB', borderTopColor:'#C8D1DB', bordeBottomColor:'#C8D1DB', borderRightColor:'#C8D1DB', borderRadius:8}}
                            />
                        </View>

                        <TouchableOpacity style={{backgroundColor:'black', borderRadius:8, width:382, height:56, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:30}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'white'}}>Next</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{width:Dimensions.get('window').width, alignItems:'center'}}>
                        <Text style={{width:352, fontFamily:'Chakra Petch Regular', fontSize:18, marginBottom:5}}>Choose an amount</Text>
                        <View style={{ width:382, height:98, flexDirection:'row', alignItems:'flex-start', justifyContent:'space-around', paddingLeft:10, paddingRight:10, marginTop:8, flexWrap:'wrap'}}>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:117, height:40, borderRadius:6, backgroundColor:'#E7E8E7'}}>
                                <Text style={{color:'#646060'}}>100 MB</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:117, height:40, borderRadius:6, backgroundColor:'#E7E8E7'}}>
                                <Text style={{color:'#646060'}}>200 MB</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:117, height:40, borderRadius:6, backgroundColor:'#E7E8E7'}}>
                                <Text style={{color:'#646060'}}>500 MB</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:117, height:40, borderRadius:6, backgroundColor:'#E7E8E7'}}>
                                <Text style={{color:'#646060'}}>1 GB</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:117, height:40, borderRadius:6, backgroundColor:'#E7E8E7'}}>
                                <Text style={{color:'#646060'}}>2 GB</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width:117, height:40, borderRadius:6, backgroundColor:'#E7E8E7'}}>
                                <Text style={{color:'#646060'}}>5 GB</Text>
                            </View>
                        </View>
                        
                        <Dropdown
                            style={{width:382, height:42, borderWidth:1, borderBottomColor:'#928E8E', bordeTopColor:'#928E8E', borderLeftColor:'#928E8E', borderRightColor:'#928E8E', marginTop:15, borderRadius:8, paddingLeft:10, paddingRight:10}}
                            onChange={value=>{ this.setState({dataplan:value}); }}
                            data={[]}
                        />

                        <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'space-around', width:382, height:200, marginTop:15, flexWrap:'wrap'}}>
                            <View style={{width:173, height:90, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(255,204,1,0.1)', borderRadius:8}}>
                                <Image style={{width:40, height:40}} source={require('./../../../../assets/mtn.png')}/>
                                <Text style={{marginTop:6, fontSize:14, fontFamily:'Chakra Petch SemiBold'}}>MTN-NG</Text>
                            </View>
                            <View style={{width:173, height:90, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(246,10,11,0.1)', borderRadius:8}}>
                                <Image style={{width:40, height:40}}  source={require('./../../../../assets/airtel.png')}/>
                                <Text style={{marginTop:6, fontSize:14, fontFamily:'Chakra Petch SemiBold'}}>Airtel-NG</Text>
                            </View>
                            <View style={{width:173, height:90, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,189,61,0.1)', borderRadius:8}}>
                                <Image style={{width:40, height:40}}  source={require('./../../../../assets/glo.png')}/>
                                <Text style={{marginTop:6, fontSize:16, fontFamily:'Chakra Petch SemiBold'}}>Glo-NG</Text>
                            </View>
                            <View style={{width:173, height:90, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(1,112,80,0.1)', borderRadius:8}}>
                                <Image style={{width:40, height:40}}  source={require('./../../../../assets/9mobile.png')}/>
                                <Text style={{marginTop:6, fontSize:16, fontFamily:'Chakra Petch SemiBold'}}>9Mobile-NG</Text>
                            </View>
                        </View>

                        <View style={{marginTop:10, flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#646060', marginBottom:5}}>Phone Number</Text>
                            <TextInput
                                onChangeText={(e)=>{this.setState({phone: e});}}
                                value={this.state.phone}
                                keyboardType='numeric'
                                style={{height:56, width:362, outlineStyle:'none', fontSize:30, fontFamily:'Chakra Petch SemiBold', paddingLeft:15, paddingRight:15, borderWidth:1, borderLeftColor:'#C8D1DB', borderTopColor:'#C8D1DB', bordeBottomColor:'#C8D1DB', borderRightColor:'#C8D1DB', borderRadius:8}}
                            />
                        </View>

                        <TouchableOpacity style={{backgroundColor:'black', borderRadius:8, width:382, height:56, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:30}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'white'}}>Next</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{width:Dimensions.get('window').width, alignItems:'center'}}>
                        <View style={{marginTop:32}}>
                            <Text style={{fontSize:14, fontFamily:'Chakra Petch Regular'}}>Service Provider</Text>
                            <Dropdown
                                onChange={value=>{this.setState({provider:value});}}
                                data={[]}
                                style={{width:362, height:42, borderWidth:1, borderBottomColor:'#928E8E', bordeTopColor:'#928E8E', borderLeftColor:'#928E8E', borderRightColor:'#928E8E', marginTop:5, borderRadius:8, paddingLeft:10, paddingRight:10}}
                            />
                        </View>

                        <View style={{marginTop:32}}>
                            <Text style={{fontSize:14, fontFamily:'Chakra Petch Regular'}}>Select a package</Text>
                            <Dropdown
                                onChange={value=>{this.setState({provider:value});}}
                                data={[]}
                                style={{width:362, height:42, borderWidth:1, borderBottomColor:'#928E8E', bordeTopColor:'#928E8E', borderLeftColor:'#928E8E', borderRightColor:'#928E8E', marginTop:5, borderRadius:8, paddingLeft:10, paddingRight:10}}
                            />
                        </View>

                        <View style={{marginTop:32}}>
                            <Text style={{fontSize:14, fontFamily:'Chakra Petch Regular'}}>Amount</Text>
                            <TextInput
                                onChangeText={(e)=>{this.setState({amount: e});}}
                                value={this.state.amount}
                                keyboardType='numeric'
                                style={{height:56, width:362, outlineStyle:'none', fontSize:30, fontFamily:'Chakra Petch SemiBold', paddingLeft:15, paddingRight:15, borderWidth:1, borderLeftColor:'#C8D1DB', borderTopColor:'#C8D1DB', bordeBottomColor:'#C8D1DB', borderRightColor:'#C8D1DB', borderRadius:8}}
                            />
                        </View>

                        <TouchableOpacity style={{backgroundColor:'rgba(1,1,1,0.4)', borderRadius:8, width:382, height:56, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:60}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'white'}}>Next</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{width:Dimensions.get('window').width, alignItems:'center'}}>
                        <View style={{marginTop:44, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                            <Image style={{width:73, height:73}} source={require('./../../../../assets/mtn.png')}/>
                            <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:18, marginTop:12}}>MTN Airtime Purchase</Text>
                        </View>

                        <View style={{width:376, flexDirection:'column', alignItems:'center', justifyContent:'flex-start', borderRadius:8, marginTop:70, backgroundColor:'#EDEDED', paddingBottom:20, }}>
                            <View style={{width:336, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingBottom:18, paddingTop:18, borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'rgba(0,0,0,0)', borderLeftColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)'}}>
                                <Text style={{fontSize:14, color:'#646060', fontFamily:'Chakra Petch Regular'}}>Phone Number</Text>
                                <Text style={{fontSize:18, fontFamily:'Chakra Petch SemiBold'}}>0813987289</Text>
                            </View>
                            
                            <View style={{width:336, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingBottom:18, paddingTop:18, borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'rgba(0,0,0,0)', borderLeftColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)'}}>
                                <Text style={{fontSize:14, color:'#646060', fontFamily:'Chakra Petch Regular'}}>Plan Purchased</Text>
                                <Text style={{fontSize:18, fontFamily:'Chakra Petch SemiBold'}}>NGN 200 Airtime</Text>
                            </View>
                            
                            <View style={{width:336, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingBottom:18, paddingTop:18, borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'rgba(0,0,0,0)', borderLeftColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)'}}>
                                <Text style={{fontSize:14, color:'#646060', fontFamily:'Chakra Petch Regular'}}>Amount</Text>
                                <Text style={{fontSize:18, fontFamily:'Chakra Petch SemiBold'}}>NGN 200</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={{marginTop:50, width:382, height:50, backgroundColor:'black', flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:8}}>
                            <Text style={{color:'white', fontSize:16, fontFamily:'Chakra Petch Regular'}}>Send</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles =  StyleSheet.create({
});

export default BillPayment;