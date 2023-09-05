import { io } from 'socket.io-client';
const socket = io.connect('http://localhost:3000/');
export default socket;

<ScrollView style={{display:!this.state.loading?'flex':'none', marginTop:30, width: Dimensions.get('window').width, height:Dimensions.get('window').height*0.9}} horizontal
                    showsHorizontalScrollIndicator={false} decelerationRate={0} snapToInterval={Dimensions.get('window').width} snapToAlignment={"center"} scrollEnabled={true}>
<View style={{ width: Dimensions.get('window').width, alignItems:'center'}}>
                        <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', width:382}}>
                            <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:18}}>Game Code: 12ec4gh73m</Text>
                            <Image style={{marginLeft:10, width:20, height:20}} source={require('./../../../../assets/copy.png')}/>
                        </View>
                        <View style={{marginTop:9, width:382, height:198}}>
                            <Image source={require('./../../../../assets/gamebg.png')}/>
                            <View style={{position:'absolute', width:382, height:198, flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
                                <Text style={{marginTop:28, color:'white', fontSize:16, fontFamily:'Chakra Petch Regular'}}>Game Details</Text>
                                <View style={{marginTop:36, flexDirection:'row', alignItems:'center', justifyContent:'space-around', width:342, height:80}}>
                                    <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-between', height:80}}>
                                        <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:18}}>Player1</Text>
                                        <Image source={require('./../../../../assets/player1.png')}/>
                                    </View>
                                    <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:24}}>VS</Text>
                                    <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-between', height:80}}>
                                        <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:18}}>Player2</Text>
                                        <Image source={require('./../../../../assets/player2.png')}/>
                                    </View>
                                </View>  
                            </View>
                        </View>
                        <View style={{width:382, flexDirection:'column', alignItems:'center', justifyContent:'flex-start', marginTop:15}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'#928E8E'}}>Total Stakes</Text>
                            <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, color:'#124D07'}}>NGN 2,000</Text>
                        </View>
                        <ScrollView style={{marginTop:20, width:382, height:160, borderWidth:1, borderLeftColor:'#928E8E', padding:10}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>You staked NGN 200 on Player1 to win</Text>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>Ayo joined the game</Text>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>Ayo staked NGN 350 on Player1 to win</Text>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>Jeffrey joined the game</Text>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>Jeffrey staked NGN 250 on Player1 to win</Text>
                        </ScrollView>

                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#928E8E', width:362, height:56, borderRadius:6, marginTop:45}}>
                            <Text style={{color:'white', fontFamily:'Chakra Petch Regular', fontSize:15}}>Start Game</Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>


/*
<View style={{ width: Dimensions.get('window').width, alignItems:'center'}}>
                        <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', width:382}}>
                            <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:18}}>Game Code: 12ec4gh73m</Text>
                            <Image style={{marginLeft:10, width:20, height:20}} source={require('./../../../../assets/copy.png')}/>
                        </View>
                        <View style={{marginTop:9, width:382, height:198}}>
                            <Image source={require('./../../../../assets/gamebg.png')}/>
                            <View style={{position:'absolute', width:382, height:198, flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
                                <Text style={{marginTop:28, color:'white', fontSize:16, fontFamily:'Chakra Petch Regular'}}>Game Details</Text>
                                <View style={{marginTop:36, flexDirection:'row', alignItems:'center', justifyContent:'space-around', width:342, height:80}}>
                                    <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-between', height:80}}>
                                        <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:18}}>Player1</Text>
                                        <Image source={require('./../../../../assets/player1.png')}/>
                                    </View>
                                    <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:24}}>VS</Text>
                                    <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-between', height:80}}>
                                        <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:18}}>Player2</Text>
                                        <Image source={require('./../../../../assets/player2.png')}/>
                                    </View>
                                </View>  
                            </View>
                        </View>
                        <View style={{width:382, marginTop:30, flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                            <TouchableOpacity style={{backgroundColor:'rgba(15,25,166,0.3)', padding:10, borderRadius:5 }}>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#0F19A6'}}>Player1 wins</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor:'rgba(146,142,142,0.3)', padding:10, borderRadius:5 }}>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#928E8E'}}>Ends as draw</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor:'rgba(244,25,25,0.3)', padding:10, borderRadius:5 }}>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:'#F41919'}}>Player2 wins</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:31, flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:18, color:'#646060'}}>Stake</Text>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:382, height:56, borderWidth:1, borderLeftColor:'black', borderRadius:8, paddingLeft:15, paddingRight:15}}>
                                <Image style={{width:24, height:24}} source={'./../../../../assets/naira.png'} />
                                <TextInput
                                    onChangeText={(e)=>{this.setState({stake: e});}}
                                    value={this.state.stake}
                                    keyboardType='numeric'
                                    style={{marginLeft:10, height:56, width:358, outlineStyle:'none', fontSize:30, fontFamily:'Chakra Petch SemiBold'}}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'black', width:362, height:56, borderRadius:6, marginTop:35}}>
                            <Text style={{color:'white', fontFamily:'Chakra Petch Regular', fontSize:15}}>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: Dimensions.get('window').width, alignItems:'center'}}>
                        <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', width:382}}>
                            <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:18}}>Game Code: 12ec4gh73m</Text>
                            <Image style={{marginLeft:10, width:20, height:20}} source={require('./../../../../assets/copy.png')}/>
                        </View>
                        <View style={{marginTop:9, width:382, height:198}}>
                            <Image source={require('./../../../../assets/gamebg.png')}/>
                            <View style={{position:'absolute', width:382, height:198, flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
                                <Text style={{marginTop:28, color:'white', fontSize:16, fontFamily:'Chakra Petch Regular'}}>Game Details</Text>
                                <View style={{marginTop:36, flexDirection:'row', alignItems:'center', justifyContent:'space-around', width:342, height:80}}>
                                    <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-between', height:80}}>
                                        <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:18}}>Player1</Text>
                                        <Image source={require('./../../../../assets/player1.png')}/>
                                    </View>
                                    <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:24}}>VS</Text>
                                    <View style={{flexDirection:'column', alignItems:'center', justifyContent:'space-between', height:80}}>
                                        <Text style={{color:'white', fontFamily:'Chakra Petch SemiBold', fontSize:18}}>Player2</Text>
                                        <Image source={require('./../../../../assets/player2.png')}/>
                                    </View>
                                </View>  
                            </View>
                        </View>
                        <View style={{width:382, flexDirection:'column', alignItems:'center', justifyContent:'flex-start', marginTop:15}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:'#928E8E'}}>Total Stakes</Text>
                            <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, color:'#124D07'}}>NGN 2,000</Text>
                        </View>
                        <ScrollView style={{marginTop:20, width:382, height:160, borderWidth:1, borderLeftColor:'#928E8E', padding:10}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>You staked NGN 200 on Player1 to win</Text>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>Ayo joined the game</Text>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>Ayo staked NGN 350 on Player1 to win</Text>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>Jeffrey joined the game</Text>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginBottom:3}}>Jeffrey staked NGN 250 on Player1 to win</Text>
                        </ScrollView>

                        <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#928E8E', width:362, height:56, borderRadius:6, marginTop:45}}>
                            <Text style={{color:'white', fontFamily:'Chakra Petch Regular', fontSize:15}}>Start Game</Text>
                        </TouchableOpacity>
                    </View>*/