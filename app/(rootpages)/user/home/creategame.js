import React, { Component }  from 'react';
import * as Font from 'expo-font';
import { View, Text, ScrollView, ActivityIndicator, Image, TextInput, TouchableOpacity } from 'react-native';

class CreateGame extends Component{
    state={
        loading: true,
        psnid:'',
        stake: '',
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
            <View>
                <ActivityIndicator style={{display: this.state.loading?'flex':'none'}}></ActivityIndicator>
                <View style={{display: !this.state.loading?'flex':'none'}}>
                    <Image source={require('./../../../../assets/gameback.png')}></Image>
                    <Text>Create Game</Text>
                </View>
                <ScrollView style={{display: !this.state.loading?'flex':'none'}}>
                    <View>
                        <Text>Input the PSN ID of a player in the game you want to create</Text>
                        <TextInput
                            placeholder={'PSN ID'}
                            value={this.state.psnid}
                            onChangeText={(e)=>{this.setState({psnid: e});}}
                        />
                        <TouchableOpacity><Text>Proceed</Text></TouchableOpacity>
                    </View>
                    
                    <View>
                        <View>
                            <Text>Game Code: 12ec4gh73m</Text>
                            <Image source={require('./../../../../assets/copy.png')}/>
                        </View>
                        <View>
                            <Image source={require('./../../../../assets/gamebg.png')}/>
                            <View>
                                <Text>Game Details</Text>
                                <View>
                                    <View>
                                        <Text>Player1</Text>
                                        <Image source={require('./../../../../assets/player1.png')}/>
                                    </View>
                                    <Text>VS</Text>
                                    <View>
                                        <Text>Player2</Text>
                                        <Image source={require('./../../../../assets/player2.png')}/>
                                    </View>
                                </View>  
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity><Text>Player1 wins</Text></TouchableOpacity>
                            <TouchableOpacity><Text>Ends as draw</Text></TouchableOpacity>
                            <TouchableOpacity><Text>Player2 wins</Text></TouchableOpacity>
                        </View>
                        <View>
                            <Text>Stake</Text>
                            <View>
                                <Image source={'./../../../../assets/naira.png'} />
                                <TextInput
                                    onChangeText={(e)=>{this.setState({stake: e});}}
                                    value={this.state.stake}
                                    keyboardType='numeric'
                                />
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Text>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View>
                            <Text>Game Code: 12ec4gh73m</Text>
                            <Image source={require('./../../../../assets/copy.png')}/>
                        </View>
                        <View>
                            <Image source={require('./../../../../assets/gamebg.png')}/>
                            <View>
                                <Text>Game Details</Text>
                                <View>
                                    <View>
                                        <Text>Player1</Text>
                                        <Image source={require('./../../../../assets/player1.png')}/>
                                    </View>
                                    <Text>VS</Text>
                                    <View>
                                        <Text>Player2</Text>
                                        <Image source={require('./../../../../assets/player2.png')}/>
                                    </View>
                                </View>  
                            </View>
                        </View>
                        <View>
                            <Text>Total Stakes</Text>
                            <Text>NGN 2,000</Text>
                        </View>
                        <ScrollView>
                            <Text>You staked NGN 200 on Player1 to win</Text>
                            <Text>Ayo joined the game</Text>
                            <Text>Ayo staked NGN 350 on Player1 to win</Text>
                            <Text>Jeffrey joined the game</Text>
                            <Text>Jeffrey staked NGN 250 on Player1 to win</Text>
                        </ScrollView>

                        <TouchableOpacity><Text>Start Game</Text></TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default CreateGame;