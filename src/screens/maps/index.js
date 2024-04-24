import { View,Text, StyleSheet, Platform, PermissionsAndroid, Button, Pressable, TouchableOpacity} from "react-native";
import  MapView, {Marker,PROVIDER_GOOGLE} from 'react-native-maps';

import React, { useEffect, useState } from "react";
import GetLocation from 'react-native-get-location'
import { getRest } from "../../api/rest";
import DropDownPicker from "react-native-dropdown-picker"


const INITIAL_REGION = {
    latitude: 1.3361207050054473,
    latitudeDelta: 0.21517353952246143,
    longitude: 103.81411554291844,
    longitudeDelta: 0.2536843344569206,
  }
export default function GoogleMaps(){
    var data = {}
    const [markers, setMarkers] = useState([])
    const [permit, setPermit] = useState(true)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Chinese', value: 'Chinese'},
      {label: 'Japanese', value: 'Japanese'},
      {label : "Indonesian", value : "Indonesian"},
      {label : "Any", value : null}
    ])
    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState(null);
    const [items1, setItems1] = useState([
      {label: 'Low', value: 'Low'},
      {label: 'Moderate', value: 'Moderate'},
      {label : "High", value : "High"},
      {label : "Any", value : null}
    ])
    


    useEffect(()=>{
        _getLocationPermit();
        getMarkers()

    }, [])
    async function _getLocationPermit(){
        if (Platform.OS= "android"){
                try{
                const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                    title: 'Asking for location access',
            
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    _getCurrentLocation();
                } else {
                console.log('Camera permission denied');
                }
            }catch(err){
                console.warn(err);
            
            }
        }
    
    }
    function _getCurrentLocation(){
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
        .then(location => {
            console.log("My Current loc :", location);
           
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }
    async function getMarkers(){
        data = await getRest()
        if(value === null){
           setMarkers(data.data)
        }
    }
    async function handleSearch(){
        const rest = await getRest()
        const datas = rest.data.filter(obj =>{
            if (value === null) return obj
            else return obj.categoty === value
        })
        const data1 = datas.filter(obj =>{
            if (value1 === null) return obj
            else return obj.price === value1
        })
        setMarkers(data1)
    }

    if(!permit) return <View><Text>Please allow location permission</Text></View>
    return (
    <View  style = {styles.container}> 
    <View style ={{flexDirection : "row", height :"10%", marginTop:"10%"}}>
        <DropDownPicker
        open ={open}
        value ={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style = {styles.filter}
        placeholder="Category"
        containerStyle ={{width : "33%", margin : "2%", height: "20%"}}/>
        <DropDownPicker
        open ={open1}
        value ={value1}
        items={items1}
        setOpen={setOpen1}
        setValue={setValue1}
        setItems={setItems1}
        style = {styles.filter}
        placeholder="Budget"
        containerStyle ={{width : "33%", margin : "2%", height: "20%"}}/>

        <TouchableOpacity
        onPress={handleSearch}
        style = {styles.search}><Text style ={{color :"white"}}>Search</Text></TouchableOpacity>
        {/* <Button title="Search"
        onPress={handleSearch}
        margin = "1%"></Button> */}
        </View>
        
        <MapView style= {styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_REGION}  showsUserLocation={true} userInterfaceStyle={"dark"}>
            {markers.map((item, index)=>{
                return(
                    <Marker key={index} coordinate={{latitude: Number( item.lat), longitude : Number(item.long)}}
                        title= {item.name}
                        description={item.desc}
                    >

                    </Marker>
                )

            })}
        </MapView>

    </View>
    )
}
const styles = StyleSheet.create({
    container :{

        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "100%",
        justifyContent : "flex-start",
        alignItems: "center",
        flex : 1,
        color: "black",
    },
    map : {
        margin: "2%",
        width :"100%",
        height :"85%"
    },
    filter:{
        width:"100%",
        height : "100%",
        padding: 0,
        margin: 0,
        marginHorizontal: 0,
    },
    search:{
        width : "20%",
        height :"70%",
        margin : "2%",
        borderRadius: 10,
        backgroundColor: "blue",
        color : "white",
        justifyContent:"center",
        alignItems : "center"
    }
})