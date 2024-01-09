import { View,Text, StyleSheet, Platform, PermissionsAndroid} from "react-native";
import  MapView, {Marker,PROVIDER_GOOGLE} from 'react-native-maps';

import React, { useEffect, useState } from "react";
import GetLocation from 'react-native-get-location'


const INITIAL_REGION = {
    latitude: 1.3361207050054473,
    latitudeDelta: 0.21517353952246143,
    longitude: 103.81411554291844,
    longitudeDelta: 0.2536843344569206,
  }
export default function GoogleMaps(){
    const [markers, setMarkers] = useState([])
    const [permit, setPermit] = useState(true)

    useEffect(()=>{
        _getLocationPermit();

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


    if(!permit) return <View><Text>Please allow location permission</Text></View>
    return (
    <View>
        <Text>Testing map functions</Text>
        <MapView style= {styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_REGION}  showsUserLocation={true}>
        <Marker 
        coordinate ={{latitude:1.2833296647424215, longitude: 103.8331205251258}}
        title ={"Ah Chiang's Porridge"}
        description ={"testing marker"}
        />
        </MapView>

    </View>
    )
}
const styles = StyleSheet.create({
    container :{
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "100%",
        justifyContent : "flex-end",
        alignItems: "center"
    },
    map : {
        width :"96%",
        height :"94%"
    }
})