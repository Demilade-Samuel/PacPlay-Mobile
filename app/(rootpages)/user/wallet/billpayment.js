import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, Dimensions, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

class BillPayment extends Component{
    constructor(props){
        super(props);
        this.scrollViewRef = React.createRef();
    }

    state={
        page:'',
        phone: '',
        phonewarning: '',
        optionswarning:'',
        amount: '',
        amountwarning: '',
        customerinfowarning: '',
        processwarning:'',

        network: '',
        airtime: '',
        airtimewarning: '',
        
        dataplan: '',
        dataplanamount: '',
        databundleArray: [],
        
        poweroptions: [],
        metrenumber: '',
        powerprovider: '',
        
        cableoptions:[],
        decodernumber: '',
        cableprovider: '',
        cabledesc: '',
        
        internetoptions: [],
        internetprovider: [],
        internetdesc: '',
        internetnumber:'',

        userdata: {},
        screenmode: '',
        loading:true,
        reqloading: false,
        packageloading: false,
    }

    async componentDidMount(){
        let data = await AsyncStorage.getItem('userdata');
        let screenmode = await AsyncStorage.getItem('screenmode');
        data = JSON.parse(data);
        console.log('>>'+data.userid);
        this.setState({screenmode: screenmode});
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
                this.setState({userdata: response.data, loading:false}); 
            });
        
        }else{ //We dont know how this person got to this URL so we take them back to first
            await AsyncStorage.multiRemove(['userdata', 'user']);
            router.push({pathname:'/first'})
        }
    }

    nav = () => {
        if(this.state.page === ''){
            navigation.navigate('/user/wallet');
        }else{
            this.scrollViewRef.current?.scrollTo({ x: 0, animated: true});
            this.clearWarnings();
            this.setState({
                page: '', phone: '', dataplan:'', dataplanamount: '', amount:'', metrenumber:'', powerprovider:'', customerinfowarning:'',
                internetprovider:'', internetnumber:'', internetdesc:'', cableprovider:'', cabledesc:'', decodernumber:''
            });
        }
    }

    scrollTo = (page, name) => {
        let url = 'https://api.flutterwave.com/v3/bill-categories?'+name+'=1';

        if(name==='data_bundle'){
            if(this.state.databundleArray.length===0){ 
                this.getbillcategories(url, 'data_bundle', page); 
            }else{
                this.scrollViewRef.current?.scrollTo({ x: Dimensions.get('window').width * page, animated: true});
                this.setState({page:name});
            }
        }

        if(name==='power'){
            if(this.state.poweroptions.length===0){
                this.getbillcategories(url, 'power', page); 
            }else{
                this.scrollViewRef.current?.scrollTo({ x: Dimensions.get('window').width * page, animated: true});
                this.setState({page:name}); 
            }
        }
        
        if(name==='cables'){
            if(this.state.cableoptions.length===0){
                this.getbillcategories(url, 'cables', page); 
            }else{
                this.scrollViewRef.current?.scrollTo({ x: Dimensions.get('window').width * page, animated: true});
                this.setState({page:name}); 
            }
        }

        if(name==='internet'){
            if(this.state.internetoptions.length===0){
                this.getbillcategories(url, 'internet', page); 
            }else{
                this.scrollViewRef.current?.scrollTo({ x: Dimensions.get('window').width * page, animated: true});
                this.setState({page:name}); 
            }
        }

        if(name==='airtime'){
            this.scrollViewRef.current?.scrollTo({ x: Dimensions.get('window').width * page, animated: true});
            this.setState({page:name});
        }     
    }

    getbillcategories = (url, name, page) => {
        this.setState({packageloading: true});
        fetch(
            "http://localhost:3000/billcategory",
            {
                method: 'POST',
                body: JSON.stringify({url: url}),
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(response=>{
            return response.json();
        }).then(response=>{
            if(response.data.status==='success' && name==='data_bundle'){
                this.setState({databundleArray: response.data.data});
            }

            if(response.data.status==='success' && name==='power'){
                console.log(response.data.data);
                this.setState({poweroptions: response.data.data});
            }

            if(response.data.status==='success' && name==='cables'){
                //We gotta filter the data firs...remove only the cables and also only those availabale in NG
                let raw = response.data.data;
                let array = [...raw.slice(33, 38), ...raw.slice(90, 94), ...raw.slice(115, 133)]
                let filtered = [];
                for(let i=0; i<array.length; i++){
                    if(array[i].country==='NG'){
                        filtered.push(array[i]);
                    }
                }

                this.setState({cableoptions: filtered});
            }

            if(response.data.status==='success' && name==='internet'){
                this.setState({internetoptions: response.data.data});
            }
            this.setState({packageloading: false});
            this.scrollViewRef.current?.scrollTo({ x: Dimensions.get('window').width * page, animated: true});
            this.setState({page:name});
        });
    }

    selectnetwork = (network) => {
        this.setState({network:'airtime'+network});
    }

    clearWarnings = () => {
        this.setState({airtimewarning:'', phonewarning:'', optionswarning:'', amountwarning:'', customerinfowarning:'', processwarning:''});
    }

    affordable = (amount) =>{
        if(parseInt(this.state.userdata.wallet) >= parseInt(amount)){
            return true;
        }else{
            return false;
        }
    }

    buyairtime = () => {
        this.clearWarnings();
        
        if(this.state.airtime && this.state.phone && this.state.phone.length===11){
            if(this.affordable(this.state.airtime)){
                let dateArr = new Date().toString().split(' ');
                let timeArr = dateArr[4].split(':');
                let ref = this.state.userdata.userid+dateArr[2]+'-'+dateArr[3]+'-'+timeArr[0]+'-'+timeArr[1]+'-'+timeArr[2];

                let payload = {
                    reference: ref,
                    amount: parseInt(this.state.airtime),
                    country: 'NG',
                    customer: '+234'+this.state.phone.toString().slice(1),
                    type: 'AIRTIME'
                }

                this.buypackage(payload);
            }else{
                this.setState({processwarning: 'Your wallet balance is insufficient for this service'});
            }
        }else{
            if(this.state.phone.length!==11){
                this.setState({phonewarning: 'Ensure that this is a valid phone number'});
            }

            if(this.state.phone===''){
                this.setState({phonewarning: 'This field cannot be empty'});
            }

            if(this.state.airtime === ''){
                this.setState({airtimewarning: 'This field cannot be empty'});
            }
        }
    }

    buydatabundle = () => {
        this.clearWarnings();
        if(this.state.dataplan && this.state.dataplanamount && this.state.phone.length===11){
            if(this.affordable(this.state.dataplanamount)){
                let dateArr = new Date().toString().split(' ');
                let timeArr = dateArr[4].split(':');
                let ref = this.state.userdata.userid+dateArr[2]+'-'+dateArr[3]+'-'+timeArr[0]+'-'+timeArr[1]+'-'+timeArr[2];

                let payload = {
                    reference: ref,
                    amount: parseInt(this.state.dataplanamount),
                    country: 'NG',
                    customer: '+234'+this.state.phone.toString().slice(1),
                    type: this.state.dataplan
                }

                this.buypackage(payload);
            }else{
                this.setState({processwarning: 'Your wallet balance is insufficient for this service'});
            }

        }else{
            if(this.state.phone.length!==11){
                this.setState({phonewarning: 'Ensure that this is a valid phone number'});
            }

            if(this.state.phone===''){
                this.setState({phonewarning: 'This field cannot be empty'});
            }

            if(this.state.dataplan === ''){
                this.setState({optionswarning: 'Select a service option'});
            }
        }
    }

    buypower = () => {
        this.clearWarnings();
        if(this.state.powerprovider && this.state.metrenumber && this.state.amount){
            if(this.affordable(this.state.amount)){
                let dateArr = new Date().toString().split(' ');
                let timeArr = dateArr[4].split(':');
                let ref = this.state.userdata.userid+dateArr[2]+'-'+dateArr[3]+'-'+timeArr[0]+'-'+timeArr[1]+'-'+timeArr[2];

                let payload = {
                    reference: ref,
                    amount: parseInt(this.state.amount),
                    country: 'NG',
                    customer: this.state.metrenumber,
                    type: this.state.powerprovider
                }

                this.buypackage(payload);
            }else{
                this.setState({processwarning: 'Your wallet balance is insufficient for this service'});
            }
            
        }else{
            if(this.state.powerprovider === ''){
                this.setState({optionswarning: 'Select a service option'});
            }

            if(this.state.amount === ''){
                this.setState({amountwarning: 'This field cannot be empty' });
            }

            if(this.state.metrenumber===''){
                this.setState({customerinfowarning: 'This field cannot be empty'});
            }
        }
    }

    buycable = () => {
        this.clearWarnings();
        if(this.state.cableprovider && this.state.decodernumber && this.state.amount){
            if(this.affordable(this.state.amount)){
                let dateArr = new Date().toString().split(' ');
                let timeArr = dateArr[4].split(':');
                let ref = this.state.userdata.userid+dateArr[2]+'-'+dateArr[3]+'-'+timeArr[0]+'-'+timeArr[1]+'-'+timeArr[2];

                let payload = {
                    reference: ref,
                    amount: parseInt(this.state.amount),
                    country: 'NG',
                    customer: this.state.decodernumber,
                    type: this.state.cableprovider
                }

                this.buypackage(payload);
            }else{
                this.setState({processwarning: 'Your wallet balance is insufficient for this service'});
            }
            
        }else{
            if(this.state.cableprovider === ''){
                this.setState({optionswarning: 'Select a service option'});
            }

            if(this.state.decodernumber===''){
                this.setState({customerinfowarning: 'This field cannot be empty'});
            }
        }
    }

    buyinternet = () => {
        this.clearWarnings();
        if(this.state.internetprovider && this.state.internetnumber && this.state.amount){
            if(this.affordable(this.state.amount)){
                let dateArr = new Date().toString().split(' ');
                let timeArr = dateArr[4].split(':');
                let ref = this.state.userdata.userid+dateArr[2]+'-'+dateArr[3]+'-'+timeArr[0]+'-'+timeArr[1]+'-'+timeArr[2];

                let payload = {
                    reference: ref,
                    amount: parseInt(this.state.amount),
                    country: 'NG',
                    customer: this.state.internetnumber,
                    type: this.state.internetprovider
                }

                this.buypackage(payload);
            }else{
                this.setState({processwarning: 'Your wallet balance is insufficient for this service'});
            }
            
        }else{
            if(this.state.cableprovider === ''){
                this.setState({optionswarning: 'Select a service option'});
            }

            if(this.state.internetnumber===''){
                this.setState({customerinfowarning: 'This field cannot be empty'});
            }
        }
    }

    buypackage = (payload) => {
        this.setState({reqloading:true});

        fetch(
            "http://localhost:3000/paybill",
            {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(response => {
            return response.json();
        }).then(response => {
            console.log(response.data);
            this.setState({reqloading:false});
        });
    }

    render(){
        return(
            <View style={{height:Dimensions.get('window').height, backgroundColor:this.state.screenmode==='dark'?'#181818':'white'}}>
                <ActivityIndicator style={{display:'none', position:'absolute', top: Dimensions.get('window').height*0.45,  left: Dimensions.get('window').width*0.48}}></ActivityIndicator>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:20}}>
                    <TouchableOpacity onPress={()=>{this.nav();}}>
                    <Image style={{marginLeft:10}} source={this.state.screenmode==='dark'?require('./../../../../assets/gameback-dark.png'):require('./../../../../assets/gameback.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:24, marginLeft:108, color:this.state.screenmode==='dark'?'white':'black'}}>Bill Payments</Text>
                </View>
                <ScrollView ref={this.scrollViewRef} style={{display:'flex', marginTop:15, width: Dimensions.get('window').width}} horizontal
                    showsHorizontalScrollIndicator={false} decelerationRate={0} snapToInterval={Dimensions.get('window').width} snapToAlignment={"center"} scrollEnabled={false}>
                    
                    <View style={{width:Dimensions.get('window').width, alignItems:'center', marginTop:40}}>
                        <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'space-around', flexWrap:'wrap', width:382, height:430}}>
                            <TouchableOpacity style={{backgroundColor:this.state.screenmode==='dark'?'rgba(39,172,14,0.4)':'rgba(39,172,14,0.1)', width:185, height:134, flexDirection:'column', alignItems:'center', justifyContent:'center', borderRadius:8, paddingLeft:10, paddingRight:10, marginTop:8}} onPress={()=>{this.state.packageloading?'':this.scrollTo(1, 'airtime');}}>
                                <Image source={require('./../../../../assets/airtime.png')}/>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:8, color:this.state.screenmode==='dark'?'white':'black'}}>Airtime</Text>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:10, color:this.state.screenmode==='dark'?'white':'#646060', textAlign:'center', marginTop:4}}>Purchase airtime for all networks on PacPlay</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{backgroundColor:this.state.screenmode==='dark'?'rgba(16,54,188,0.4)':'rgba(16,54,188,0.1)', width:185, height:134, flexDirection:'column', alignItems:'center', justifyContent:'center', borderRadius:8, paddingLeft:10, paddingRight:10, marginTop:8}} onPress={()=>{this.state.packageloading?'':this.scrollTo(2, 'data_bundle');}}>
                                <Image source={require('./../../../../assets/data.png')}/>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:8, color:this.state.screenmode==='dark'?'white':'black'}}>Data Bundle</Text>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:10, color:this.state.screenmode==='dark'?'white':'#646060', textAlign:'center', marginTop:4}}>Purchase data bundle offers for all networks on PacPlay</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{backgroundColor:this.state.screenmode==='dark'?'rgba(244,25,25,0.4)':'rgba(244,25,25,0.1)', width:185, height:134, flexDirection:'column', alignItems:'center', justifyContent:'center', borderRadius:8, paddingLeft:10, paddingRight:10, marginTop:8}} onPress={()=>{this.state.packageloading?'':this.scrollTo(3, 'power');}}>
                                <Image source={require('./../../../../assets/power.png')}/>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:8, color:this.state.screenmode==='dark'?'white':'black'}}>Power</Text>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:10, color:this.state.screenmode==='dark'?'white':'#646060', textAlign:'center', marginTop:4}}>Purchase your electricity meter bills on PacPlay</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={{backgroundColor:this.state.screenmode==='dark'?'rgba(13,158,149,0.4)':'rgba(13,158,149,0.1)', width:185, height:134, flexDirection:'column', alignItems:'center', justifyContent:'center', borderRadius:8, paddingLeft:10, paddingRight:10, marginTop:8}} onPress={()=>{this.state.packageloading?'':this.scrollTo(4, 'cables');}}>
                                <Image source={require('./../../../../assets/cable.png')}/>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:8, color:this.state.screenmode==='dark'?'white':'black'}}>Cable TV</Text>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:10, color:this.state.screenmode==='dark'?'white':'#646060', textAlign:'center', marginTop:4}}>Purchase any cable network for you entertainment on PacPlay</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={{backgroundColor:this.state.screenmode==='dark'?'rgba(66,133,244,0.4)':'rgba(66,133,244,0.1)', width:185, height:134, flexDirection:'column', alignItems:'center', justifyContent:'center', borderRadius:8, paddingLeft:10, paddingRight:10, marginTop:8}} onPress={()=>{this.state.packageloading?'':this.scrollTo(5, 'internet');}}>
                                <Image source={require('./../../../../assets/internet.png')}/>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:8, color:this.state.screenmode==='dark'?'white':'black'}}>Internet</Text>
                                <Text style={{fontFamily:'Chakra Petch Regular', fontSize:10, color:this.state.screenmode==='dark'?'white':'#646060', textAlign:'center', marginTop:4}}>Purchase any internet connectivity package on PacPlay</Text>
                            </TouchableOpacity>
                        </View>

                        <ActivityIndicator style={{display:this.state.packageloading?'flex':'none', marginTop:50}}></ActivityIndicator>
                    </View>

                    <View style={{width:Dimensions.get('window').width, alignItems:'center'}} /*AIRTIME BUNDLE*/>
                        <Text style={{width:352, fontFamily:'Chakra Petch Regular', fontSize:18, color:this.state.screenmode==='dark'?'white':'black', marginTop:15}}>Airtime amount</Text>

                        <View style={{width:362, marginTop:8}}>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:362, height:42, borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'black', borderRadius:8, paddingRight:15}}>
                                <View style={{backgroundColor:this.state.screenmode==='dark'?'#D3D4D7':'rgba(0,0,0,0)', paddingTop:13, paddingBottom:13, paddingLeft:20, paddingRight:20, borderTopLeftRadius:6, borderBottomLeftRadius:6}}>
                                <Image style={{width:16, height:16}} source={'./../../../../assets/naira.png'} />
                                </View>
                                <TextInput
                                    onChangeText={(e)=>{this.setState({airtime: e});}}
                                    value={this.state.airtime}
                                    keyboardType='numeric'
                                    style={{marginLeft:10, height:36, width:338, outlineStyle:'none', fontSize:22, fontFamily:'Chakra Petch SemiBold', color:this.state.screenmode==='dark'?'white':'black'}}
                                />
                            </View>
                            <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.airtimewarning}</Text>
                        </View>

                        <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'space-around', width:382, height:250, marginTop:15, flexWrap:'wrap'}}>
                            <TouchableOpacity style={{width:173, height:110, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:this.state.screenmode==='dark'?'rgba(255,204,1,0.4)':'rgba(255,204,1,0.1)', borderRadius:8, borderWidth:2, borderColor:this.state.network==='airtimeMTN'?'#1E9E40':'rgba(0,0,0,0)'}} onPress={()=>{this.selectnetwork('MTN');}}>
                                <Image style={{width:45, height:45}} source={require('./../../../../assets/mtn.png')}/>
                                <Text style={{marginTop:8, fontSize:14, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>MTN-NG</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:173, height:110, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:this.state.screenmode==='dark'?'rgba(246,10,11,0.4)':'rgba(246,10,11,0.1)', borderRadius:8, borderWidth:2, borderColor:this.state.network==='airtimeAirtel'?'#1E9E40':'rgba(0,0,0,0)'}} onPress={()=>{this.selectnetwork('Airtel');}}>
                                <Image style={{width:45, height:45}}  source={require('./../../../../assets/airtel.png')}/>
                                <Text style={{marginTop:8, fontSize:14, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>Airtel-NG</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:173, height:110, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:this.state.screenmode==='dark'?'rgba(0,189,61,0.4)':'rgba(0,189,61,0.1)', borderRadius:8, borderWidth:2, borderColor:this.state.network==='airtimeGlo'?'#1E9E40':'rgba(0,0,0,0)'}} onPress={()=>{this.selectnetwork('Glo');}}>
                                <Image style={{width:45, height:45}}  source={require('./../../../../assets/glo.png')}/>
                                <Text style={{marginTop:8, fontSize:16, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>Glo-NG</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:173, height:110, flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:this.state.screenmode==='dark'?'rgba(1,112,80,0.4)':'rgba(1,112,80,0.1)', borderRadius:8, borderWidth:2, borderColor:this.state.network==='airtime9mobile'?'#1E9E40':'rgba(0,0,0,0)'}} onPress={()=>{this.selectnetwork('9mobile');}}>
                                <Image style={{width:45, height:45}}  source={require('./../../../../assets/9mobile.png')}/>
                                <Text style={{marginTop:8, fontSize:16, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>9Mobile-NG</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{marginTop:10, flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:16, color:this.state.screenmode==='dark'?'white':'#646060', marginBottom:5}}>Phone Number</Text>
                            <TextInput
                                onChangeText={(e)=>{this.setState({phone: e});}}
                                value={this.state.phone}
                                keyboardType='numeric'
                                placeholder='08123456789'
                                style={{height:56, width:362, outlineStyle:'none', fontSize:30, fontFamily:'Chakra Petch SemiBold', paddingLeft:15, paddingRight:15, borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'#C8D1DB', borderRadius:8, color:this.state.screenmode==='dark'?'white':'black', placeholderTextColor:'#C8D1DB'}}
                            />
                            <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.phonewarning}</Text>
                        </View>

                        <TouchableOpacity style={{backgroundColor:this.state.screenmode==='dark'?'#1E9E40':'black', borderRadius:8, width:382, height:56, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:40}} onPress={()=>{!this.state.reqloading?this.buyairtime():'';}}>
                            <ActivityIndicator style={{display:this.state.reqloading?'flex':'none'}} color='white'></ActivityIndicator>
                            <Text style={{display:this.state.reqloading?'none':'flex', fontFamily:'Chakra Petch Regular', fontSize:16, color:'white'}}>Buy Airtime</Text>
                        </TouchableOpacity>
                        <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:6}}>{this.state.processwarning}</Text>
                    </View>

                    <View style={{width:Dimensions.get('window').width, alignItems:'center'}} /*DATA BUNDLE*/>
                        <Text style={{width:352, fontFamily:'Chakra Petch Regular', fontSize:18, marginTop:20, marginBottom:10, color:this.state.screenmode==='dark'?'white':'black'}}>Choose an amount</Text>
                        <Dropdown
                            style={{width:362, height:42, borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'#928E8E', color:this.state.screenmode==='dark'?'white':'black', borderRadius:8, paddingLeft:10, paddingRight:10}}
                            itemTextStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16}}
                            placeholderStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16, color:this.state.screenmode==='dark'?'white':'grey'}}
                            selectedTextStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16, color:this.state.screenmode==='dark'?'white':'grey'}}
                            data={this.state.databundleArray}
                            labelField='biller_name'
                            valueField='biller_name'
                            onChange={(item)=>{this.setState({dataplanamount:item.amount, dataplan:item.biller_name})}}
                        />
                        <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5, width:362}}>{this.state.optionswarning}</Text>

                        <Text style={{display:this.state.dataplanamount!==''?'flex':'none', marginTop:25, fontFamily:'Chakra Petch SemiBold', fontSize:24, color:this.state.screenmode==='dark'?'rgb(40, 120, 20)':'#124D07'}}>
                            {'NGN '+this.state.dataplanamount}
                        </Text>

                        <View style={{marginTop:25, flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>
                            <Text style={{fontFamily:'Chakra Petch Regular', fontSize:14, color:this.state.screenmode==='dark'?'white':'#646060', marginBottom:8}}>Phone Number</Text>
                            <TextInput
                                onChangeText={(e)=>{this.setState({phone: e});}}
                                value={this.state.phone}
                                keyboardType='numeric'
                                style={{height:56, width:362, outlineStyle:'none', fontSize:30, fontFamily:'Chakra Petch SemiBold', paddingLeft:15, paddingRight:15, borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'#C8D1DB', borderRadius:8, color:this.state.screenmode==='dark'?'white':'black'}}
                            />
                            <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.phonewarning}</Text>
                        </View>

                        <TouchableOpacity style={{backgroundColor:this.state.screenmode==='dark'?'#1E9E40':'black', borderRadius:8, width:382, height:56, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:30}} onPress={()=>{!this.state.reqloading?this.buydatabundle():'';}}>
                            <ActivityIndicator style={{display:this.state.reqloading?'flex':'none'}} color='white'></ActivityIndicator>
                            <Text style={{display:!this.state.reqloading?'flex':'none', fontFamily:'Chakra Petch Regular', fontSize:16, color:'white'}}>Buy Data Bundle</Text>
                        </TouchableOpacity>
                        <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:6}}>{this.state.processwarning}</Text>
                    </View>

                    <View style={{width:Dimensions.get('window').width, alignItems:'center'}} /*POWER*/>
                        <View style={{marginTop:32}}>
                            <Text style={{fontSize:14, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>Service Provider</Text>
                            <Dropdown
                                data={this.state.poweroptions}
                                labelField={'name'}
                                valueField={'name'}
                                onChange={item=>{ this.setState({powerprovider: item.biller_name}); }}
                                style={{width:362, height:42, borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'#928E8E', marginTop:5, borderRadius:8, paddingLeft:10, paddingRight:10}}
                                itemTextStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16}}
                                placeholderStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16, color:this.state.screenmode==='dark'?'white':'grey'}}
                                selectedTextStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16, color:this.state.screenmode==='dark'?'white':'grey'}}
                            />
                            <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.optionswarning}</Text>
                        </View>

                        <View style={{marginTop:32}}>
                            <Text style={{fontSize:14, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>Metre number</Text>
                            <TextInput
                                onChangeText={(e)=>{this.setState({metrenumber: e});}}
                                value={this.state.metrenumber}
                                keyboardType='numeric'
                                style={{marginTop:5, height:56, width:362, outlineStyle:'none', fontSize:30, fontFamily:'Chakra Petch SemiBold', paddingLeft:15, paddingRight:15, borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'#928E8E', color:this.state.screenmode==='dark'?'white':'black', borderRadius:8}}
                            />
                            <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.customerinfowarning}</Text>
                        </View>

                        <Text style={{display:this.state.powerprovider===''?'none':'flex', marginTop:30, fontSize:20, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>{this.state.powerprovider}</Text>

                        <View style={{marginTop:32}}>
                            <Text style={{fontSize:14, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>Amount</Text>
                            <TextInput
                                onChangeText={(e)=>{this.setState({amount: e});}}
                                value={this.state.amount}
                                keyboardType='numeric'
                                style={{marginTop:5, height:56, width:362, outlineStyle:'none', fontSize:30, fontFamily:'Chakra Petch SemiBold', paddingLeft:15, paddingRight:15, borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'#928E8E', color:this.state.screenmode==='dark'?'white':'black', borderRadius:8}}
                            />
                            <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.amountwarning}</Text>
                        </View>

                        <TouchableOpacity style={{backgroundColor:this.state.screenmode==='dark'?'#1E9E40':'rgba(1,1,1,0.4)', borderRadius:8, width:382, height:56, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:60}} onPress={()=>{!this.state.reqloading?this.buypower():'';}}>
                            <ActivityIndicator style={{display:this.state.reqloading?'flex':'none'}} color="white"/>
                            <Text style={{display:!this.state.reqloading?'flex':'none', fontFamily:'Chakra Petch Regular', fontSize:16, color:'white'}}>Purchase</Text>
                        </TouchableOpacity>
                        <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:6}}>{this.state.processwarning}</Text>
                    </View>


                    <View style={{width:Dimensions.get('window').width, alignItems:'center' /*CABLE*/}}>
                        <View style={{marginTop:32}}>
                            <Text style={{fontSize:14, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>Service Provider</Text>
                            <Dropdown
                                data={this.state.cableoptions}
                                labelField={'biller_name'}
                                valueField={'biller_name'}
                                onChange={item=>{ this.setState({cableprovider: item.biller_name, cabledesc: item.short_name, amount: item.amount}); }}
                                style={{width:362, height:42, borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'#928E8E', marginTop:5, borderRadius:8, paddingLeft:10, paddingRight:10}}
                                itemTextStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16}}
                                placeholderStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16, color:this.state.screenmode==='dark'?'white':'grey'}}
                                selectedTextStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16, color:this.state.screenmode==='dark'?'white':'grey'}}
                            />
                            <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.optionswarning}</Text>
                        </View>

                        <View style={{marginTop:32}}>
                            <Text style={{fontSize:14, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>SmartCard Number</Text>
                            <TextInput
                                onChangeText={(e)=>{this.setState({decodernumber: e});}}
                                value={this.state.decodernumber}
                                keyboardType='numeric'
                                style={{marginTop:5, height:56, width:362, outlineStyle:'none', fontSize:30, fontFamily:'Chakra Petch SemiBold', paddingLeft:15, paddingRight:15, borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'#928E8E', color:this.state.screenmode==='dark'?'white':'black', borderRadius:8}}
                            />
                            <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.customerinfowarning}</Text>
                        </View>

                        <View style={{marginTop:32, flexDirection:'column', justifyContent:'flex-start', alignItems:'center'}}>
                            <Text style={{fontSize:18, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>{this.state.cabledesc}</Text>
                            <Text style={{display:this.state.amount!==''?'flex':'none', marginTop:15, fontFamily:'Chakra Petch SemiBold', fontSize:24, color:this.state.screenmode==='dark'?'rgb(40, 120, 20)':'#124D07'}}>{'NGN '+this.state.amount}</Text>
                        </View>

                        <TouchableOpacity style={{backgroundColor:this.state.screenmode==='dark'?'#1E9E40':'rgba(1,1,1,0.4)', borderRadius:8, width:382, height:56, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:60}} onPress={()=>{!this.state.reqloading?this.buycable():'';}}>
                            <ActivityIndicator style={{display:this.state.reqloading?'flex':'none'}} color="white"/>
                            <Text style={{display:!this.state.reqloading?'flex':'none', fontFamily:'Chakra Petch Regular', fontSize:16, color:'white'}}>Purchase</Text>
                        </TouchableOpacity>
                        <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:6}}>{this.state.processwarning}</Text>
                    </View>


                    <View style={{width:Dimensions.get('window').width, alignItems:'center' /*INTERNET*/}}>
                        <View style={{marginTop:32}}>
                            <Text style={{fontSize:14, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>Internet Services</Text>
                            <Dropdown
                                data={this.state.internetoptions}
                                labelField={'biller_name'}
                                valueField={'biller_name'}
                                onChange={item=>{ this.setState({internetprovider: item.biller_name, internetdesc: item.short_name, amount: item.amount}); }}
                                style={{width:362, height:42, borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'#928E8E', marginTop:5, borderRadius:8, paddingLeft:10, paddingRight:10}}
                                itemTextStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16}}
                                placeholderStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16, color:this.state.screenmode==='dark'?'white':'grey'}}
                                selectedTextStyle={{fontFamily:'Chakra Petch SemiBold', fontSize:16, color:this.state.screenmode==='dark'?'white':'grey'}}
                            />
                            <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.optionswarning}</Text>
                        </View>

                        <View style={{marginTop:32}}>
                            <Text style={{fontSize:14, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>Service Account Number</Text>
                            <TextInput
                                onChangeText={(e)=>{this.setState({internetnumber: e});}}
                                value={this.state.internetnumber}
                                keyboardType='numeric'
                                style={{marginTop:5, height:56, width:362, outlineStyle:'none', fontSize:30, fontFamily:'Chakra Petch SemiBold', paddingLeft:15, paddingRight:15, borderWidth:1, borderColor:this.state.screenmode==='dark'?'white':'#928E8E', color:this.state.screenmode==='dark'?'white':'black', borderRadius:8}}
                            />
                            <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:5}}>{this.state.customerinfowarning}</Text>
                        </View>

                        <View style={{marginTop:32, flexDirection:'column', justifyContent:'flex-start', alignItems:'center'}}>
                            <Text style={{fontSize:18, fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>{this.state.internetdesc}</Text>
                            <Text style={{display:this.state.amount!==''?'flex':'none', marginTop:15, fontFamily:'Chakra Petch SemiBold', fontSize:24, color:this.state.screenmode==='dark'?'rgb(40, 120, 20)':'#124D07'}}>{'NGN '+this.state.amount}</Text>
                        </View>

                        <TouchableOpacity style={{backgroundColor:this.state.screenmode==='dark'?'#1E9E40':'rgba(1,1,1,0.4)', borderRadius:8, width:382, height:56, flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:60}} onPress={()=>{!this.state.reqloading?this.buyinternet():'';}}>
                            <ActivityIndicator style={{display:this.state.reqloading?'flex':'none'}} color="white"/>
                            <Text style={{display:!this.state.reqloading?'flex':'none', fontFamily:'Chakra Petch Regular', fontSize:16, color:'white'}}>Purchase</Text>
                        </TouchableOpacity>
                        <Text style={{color:'red', fontFamily:'Chakra Petch Regular', fontSize:16, marginTop:6}}>{this.state.processwarning}</Text>
                    </View>


                    <View style={{width:Dimensions.get('window').width, alignItems:'center'}} /*RECEIPT*/>
                        <View style={{marginTop:44, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                            <Image style={{width:73, height:73}} source={require('./../../../../assets/mtn.png')}/>
                            <Text style={{fontFamily:'Chakra Petch SemiBold', fontSize:18, marginTop:12, color:this.state.screenmode==='dark'?'white':'black'}}>MTN Airtime Purchase</Text>
                        </View>

                        <View style={{width:376, flexDirection:'column', alignItems:'center', justifyContent:'flex-start', borderRadius:8, marginTop:70, backgroundColor:this.state.screenmode==='dark'?'#343434':'#EDEDED', paddingBottom:20, }}>
                            <View style={{width:336, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingBottom:18, paddingTop:18, borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'rgba(0,0,0,0)', borderLeftColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)'}}>
                                <Text style={{fontSize:14, color:'#646060', fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>Phone Number</Text>
                                <Text style={{fontSize:18, fontFamily:'Chakra Petch SemiBold', color:this.state.screenmode==='dark'?'white':'black'}}>0813987289</Text>
                            </View>
                            
                            <View style={{width:336, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingBottom:18, paddingTop:18, borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'rgba(0,0,0,0)', borderLeftColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)'}}>
                                <Text style={{fontSize:14, color:'#646060', fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>Plan Purchased</Text>
                                <Text style={{fontSize:18, fontFamily:'Chakra Petch SemiBold', color:this.state.screenmode==='dark'?'white':'black'}}>NGN 200 Airtime</Text>
                            </View>
                            
                            <View style={{width:336, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingBottom:18, paddingTop:18, borderWidth:1, borderBottomColor:'#C8D1DB', borderTopColor:'rgba(0,0,0,0)', borderLeftColor:'rgba(0,0,0,0)', borderRightColor:'rgba(0,0,0,0)'}}>
                                <Text style={{fontSize:14, color:'#646060', fontFamily:'Chakra Petch Regular', color:this.state.screenmode==='dark'?'white':'black'}}>Amount</Text>
                                <Text style={{fontSize:18, fontFamily:'Chakra Petch SemiBold', color:this.state.screenmode==='dark'?'white':'black'}}>NGN 200</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={{marginTop:50, width:382, height:50, backgroundColor:this.state.screenmode==='dark'?'#1E9E40':'black', flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:8}}>
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