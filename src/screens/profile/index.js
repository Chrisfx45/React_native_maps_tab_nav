import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export default function Profile(){
    return(
        <View style = {{flex : 1}} >
            <Text >
                Profile
                
            </Text>
            <TextInput placeholder="This"></TextInput>
           
            <Text>
                Profile
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container :{
        ...StyleSheet.absoluteFillObject,
        flex : 1,
        width: "100%",
        height: "100%",
        justifyContent : "flex-end",
        alignItems: "center"
    },
    profile :{
        display :"flex",
        color :"black",
        width : "100%",
        height : "100%"
    }

})