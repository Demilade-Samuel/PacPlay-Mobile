import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';

class Withdraw extends Component{
    state={
        loading: true,
        location: 'NG',
        bank:'',
        bankcode:'',
        locations: [{label:"NG", value:"NG"}, {label:"GH", value:"GH"}, {label:"KE", value:"KE"}, {label:"UG", value:"UG"}, {label:"ZA", value:"ZA"}, {label:"TZ", value:"TZ"}],
        banks: [],
        loadingbanks: false,
        bankwarning:'',
        accountnumber:'',
        accnumwarning:'',
        amount:'',
        amountwarning:'',
        userdata: {}
    }

    async componentDidMount(){
        let data = await AsyncStorage.getItem('userdata');
        data = JSON.parse(data);
        console.log('>>'+data.userid);
        //If user data is in Async Storage
        if(data){
            //A default call to the server to get user details, incase there are any updates
            const defrequest = fetch(
                "http://localhost:3000/getuserdata",
                {
                    method: 'POST',
                    body: JSON.stringify({userid: data.userid}),
                    headers: { 'Content-Type': 'application/json' }
                }
            ).then(response => {
                return response.json();
            }).then(response => {
                console.log(response.data);
                this.setState({userdata: response.data, loading: false}); 
            });
            
            if(this.state.location!==''){
                //Load Banks in locations
                this.loadBanks(this.state.location);
            }
        
        }else{ //We dont know how this person got to this URL so we take them back to first
            await AsyncStorage.multiRemove(['userdata', 'user']);
            router.push({pathname:'/first'})
        }
    }

    loadBanks = (location) => {
        this.setState({bank:'', bankcode:'', loadingbanks: true});

        let url = 'https://api.flutterwave.com/v3/banks/'+location;
        fetch('http://localhost:3000/loadbanks', {
            method: "POST",
            body: JSON.stringify({url: url}),
            headers: { 'Content-Type': 'application/json' }
        }).then(response=>{
            return response.json();
        }).then(response=>{
            if(response.msg==='success'){
                console.log(response.banks);
                this.setState({banks: response.banks.data, loadingbanks:false})
            }else{
                this.setState({bankwarning: response.msg, loadingbanks:false})
            }
        });
    }

    withdraw = () => {
        this.setState({bankwarning:'', accnumwarning:'', amountwarning:''});
        if(this.state.bankcode!=='' && this.state.accountnumber!='' && this.state.amount!==''){
            let dateArr = new Date().toString().split(' ');
            let timeArr = dateArr[4].split(':');
            let ref = this.state.userdata.userid+dateArr[2]+'-'+dateArr[3]+'-'+timeArr[0]+'-'+timeArr[1]+'-'+timeArr[2];
            console.log(ref);
            let data = {ref: ref, userid: this.state.userdata.userid, code: this.state.bankcode.toString(), accountnumber: this.state.accountnumber.toString(), amount: parseInt(this.state.amount)}

            fetch('http://localhost:3000/withdraw', {
                method: "POST",
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            }).then(response=>{
                return response.json();
            }).then(response=>{
                console.log(response);
                /*if(response.msg==='success'){
                    console.log(response.banks.data);
                    this.setState({banks: response.banks.data, loadingbanks:false})
                }else{
                    this.setState({bankwarning: response.msg, loadingbanks:false})
                }*/
            });

        }else{
            if(this.state.bankcode===''){
                this.setState({bankwarning:'This field cannot be empty'});
            }

            if(this.state.accountnumber===''){
                this.setState({accnumwarning:'This field cannot be empty'});
            }

            if(this.state.amount===''){
                this.setState({amountwarning:'This field cannot be empty'});
            }
        }
    }

    render(){
        return(
            <View>
                <ActivityIndicator style={{display:this.state.loading?'flex':'none', position:'absolute', top: Dimensions.get('window').height*0.45,  left: Dimensions.get('window').width*0.48}}></ActivityIndicator>
                <View style={{display:this.state.loading?'none':'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('/user/wallet')}}>
                    <Image style={{marginLeft:10}} source={require('./../../../../assets/gameback.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:108}}>Withdraw</Text>
                </View>
                <View style={{display:this.state.loading?'none':'flex', width:Dimensions.get('window').width, paddingLeft:35, paddingRight:30, marginTop:30}}>
                    <View style={{flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start'}}>
                        <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:18, color:'grey'}}>Location</Text>
                        <Dropdown
                            data={this.state.locations}
                            style={{borderWidth:1, borderBottomColor:'grey', borderLeftColor:'grey', borderRightColor:'grey', borderTopColor:'grey', borderRadius:8, width:200, paddingLeft:10, paddingRight:10, marginTop:4}}
                            labelField="label"
                            valueField="value"
                            placeholder='Select location...'
                            value={this.state.location}
                            onChange={(item)=>{this.setState({location: item.value}); this.loadBanks(item.value);}}
                            itemTextStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16}}
                            placeholderStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16, color:'grey'}}
                            selectedTextStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16}}
                        />
                    </View>
                    
                    <View style={{marginTop:20}}>
                        <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:18, color:'grey'}}>Bank</Text>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                            <Dropdown
                                data={this.state.banks}
                                labelField="name"
                                valueField="name"
                                placeholder='Select bank...'
                                value={this.state.bank}
                                style={{borderWidth:1, borderBottomColor:'grey', borderLeftColor:'grey', borderRightColor:'grey', borderTopColor:'grey', borderRadius:8, width:320, paddingLeft:10, paddingRight:10, marginTop:4}}
                                onChange={(item)=>{this.setState({bank: item.name, bankcode: item.code})}}
                                itemTextStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16}}
                                placeholderStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16, color:'grey'}}
                                selectedTextStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16}}
                            />
                            <ActivityIndicator style={{display:this.state.loadingbanks?'flex':'none', marginLeft:15}}/>
                        </View>
                        <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:14, marginTop:6}}>{this.state.bankwarning}</Text>
                    </View>

                    <View style={{marginTop:20}}>
                        <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:18, color:'grey'}}>Account Number</Text>
                        <TextInput
                            onChangeText={(e)=>{this.setState({accountnumber: e});}}
                            value={this.state.accountnumber}
                            keyboardType='numeric'
                            style={{marginTop:4, width:320, height:44, fontSize:18, fontFamily:'Chakra Petch Semibold', paddingLeft:12, paddingRight:12, borderWidth:1, borderBottomColor:'grey', borderLeftColor:'grey', borderRightColor:'grey', borderTopColor:'grey', borderRadius:8}}
                        />
                        <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:14, marginTop:6}}>{this.state.accnumwarning===''?'Please confirm this is the right account number. Pacplay would bear no responsibilities if incorrect.':this.state.accnumwarning}</Text>
                    </View>

                    <View style={{marginTop:20}}>
                        <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:18, color:'grey'}}>Amount</Text>
                        <View style={{width:320, marginTop:4, height:48, flexDirection:'row', alignItems:'center', justifyContent:'flex-start', borderWidth:1, borderBottomColor:'grey', borderLeftColor:'grey', borderRightColor:'grey', borderTopColor:'grey', borderRadius:8}}>
                            <Image style={{marginLeft:10, width:19, height:19}} source={require('./../../../../assets/nairamini.png')}></Image>
                            <TextInput
                                value={this.state.amount}
                                onChangeText={(e)=>{this.setState({amount:e});}}
                                keyboardType='numeric'
                                style={{outlineStyle:"none", marginLeft:8, marginRight:12, fontSize:22, fontFamily:'Chakra Petch SemiBold', height:40 }}
                            />
                        </View>
                        <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:14, marginTop:6}}>{this.state.amountwarning}</Text>
                    </View>


                    <TouchableOpacity style={{width:Dimensions.get('window').width-80, height:56, flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:8, marginTop:80, backgroundColor:'black'}} onPress={()=>{this.withdraw();}}>
                        <Text style={{color:'white', fontFamily:'Chakra Petch Regular', fontSize:16}}>Withdraw</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Withdraw;