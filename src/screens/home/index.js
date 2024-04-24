import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { createStackNavigator} from "@react-navigation/stack"
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity,ImageBackground, ScrollView, FlatList, Dimensions, Image, Pressable, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import FlipCard from 'react-native-flip-card'
import { getRest } from '../../api/rest'; 
import { like } from '../../api/like';


export default function HomePage(){
    const[data,setData] = useState({})
    const[loading, setLoading] = useState(true)
    const getData = async ()=>{
        const datas = await getRest()
        setData(datas.data)
        console.log(data)
        setLoading(false)
    }
    useEffect(()=>{
        getData()
    },[])
    const handlePress = ()=>{
        console.log(data[1])
    }

    const liked = async (restID)=>{
        let userData = await AsyncStorage.getItem("UsrData")
        const parsed = JSON.parse(userData)
        console.log("hi")
        
        if (!userData){
            Alert.alert("Please Login",[{
                text :"OK",
                onPress: ()=> {} 
               }])
        }else{
            console.log("liked")
            console.log(parsed.id)

            req ={
                userID: parsed.id,
                restID :restID
            }
            like(req)
    }

    }
    function HImage(){


        if (data[1]){
            const renderImages  =(item) =>{
                return (
                    <View style={{ width :  Dimensions.get("window").width/100*40, marginVertical: "0.5%", borderColor: 'green', borderWidth: 1}}>

                    <View style={{width: "100%", backgroundColor: "black", alignItems: "center"}}>
                    <ImageBackground style={styles.whanew} source={{uri: `https://www.instagram.com/p/${item.item.link}/media/?size=l`}}>
                    <Text style={{width:"100%", color : "#e3e3e3",  textShadowColor: 'black', textShadowRadius: 1, fontSize: 20}} numberOfLines={1}>{item.item.name}</Text>
                    </ImageBackground>
                    </View>
                    
                </View>
                )
        
            }
            const featured = data.filter(obj=>{
                return obj.featured===true
            })

            return(
            <>
            <TouchableOpacity onPress={()=>{
                console.log(data)
            }}><Text style={{color : "#e3e3e3"}}>Tessssst</Text></TouchableOpacity>
            {/* <ScrollView style={{width:"100%"}}>     
                {data.map((item, index)=>{
                    return(
                    <View key ={index} style={{ width:"50%", marginVertical: "1%", borderColor: 'green', borderWidth: 1}}>
                        <Text style={{width:"100%", color : "#e3e3e3"}}>{item.name}</Text>
                        <View style={{width: "100%", backgroundColor: "black"}}>
                        <Image style={styles.whanew} source={{uri: `https://www.instagram.com/p/${item.link}/media/?size=l`}} />
                        </View>
                        
                    </View>
                    )
                })}
                
                </ScrollView> */}
                                
                <View style = {styles.header}>
                    <Text style={{color : "#e3e3e3", fontSize: 20}}>Featured</Text>
                </View>
                <View style ={styles.featured}>
                <FlipCard 
                    style={styles.card}
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={true}
                    onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
                    >
                    {/* Face Side */}
                    <View style={styles.card} >
                        <View style={{width: "50%", alignItems : "center"}}><Image style={styles.featuredImg} source={{uri: `https://www.instagram.com/p/${featured[0].link}/media/?size=l`}} /></View>
                        <View style={{width: "50%", padding :"2%",}}>
                            <Text style={{color : "#e3e3e3", fontSize: 25, borderBottomWidth: 2, borderBottomColor: "white"}}>{featured[0].name.toUpperCase()}</Text>
                            <Text style={{color : "#e3e3e3", fontSize: 15,  marginTop :5}}>Tags : {featured[0].categoty},  {featured[0].price} price, {featured[0].desc} </Text>
                            <Pressable  onPress ={()=>{liked(featured[0].id)}} style={{position:"absolute", bottom: 5, left: 3}}><Image style={{width : 50, height : 50} }source={require("./../../imgs/heart.png")}></Image></Pressable>
                            <Pressable style={{position:"absolute", bottom: 5, right: 5}}><Image style={{width : 40, height : 40} }source={require("./../../imgs/save.png")}></Image></Pressable>
                        </View>
                        
                    </View>
                    {/* Back Side */}
                    <View style={styles.card} >
                        <View style={{width: "50%", alignItems : "center"}}><Image style={styles.featuredImg} source={{uri: `https://www.instagram.com/p/${featured[1].link}/media/?size=l`}} /></View>
                        <View style={{width: "50%", padding :"2%", position: "relative"}}>
                            <Text style={{color : "#e3e3e3", fontSize: 25, borderBottomWidth: 2, borderBottomColor: "white"}}>{featured[1].name.toUpperCase()}</Text>
                            <Text style={{color : "#e3e3e3", fontSize: 15,  marginTop :5}}>Tags : {featured[1].categoty},  {featured[1].price} price, {featured[1].desc}</Text>
                            <Pressable onPress ={()=>{liked(featured[1].id)}} style={{position:"absolute", bottom: 5, left: 3}}><Image style={{width : 50, height : 50} }source={require("./../../imgs/heart.png")}></Image></Pressable>
                            <Pressable style={{position:"absolute", bottom: 5, right: 5}}><Image style={{width : 40, height : 40} }source={require("./../../imgs/save.png")}></Image></Pressable>
                        </View>
                    </View>
                </FlipCard>

                </View>

                
                <View style = {styles.header}>
                    <Text style={{color : "#e3e3e3", fontSize: 20}}>All Restaurant</Text>

                </View>
        
                <FlatList
                style={{width: "100%", marginTop: "2%"}}
                horizontal ={true}
                data={data}
                renderItem={renderImages}
                />


                </> 
            )
        }else{
            return (
                <View style={styles.container}><Text>Error</Text></View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <HImage/>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container :{
        ...StyleSheet.absoluteFillObject,
        paddingTop : "2%",
        flex : 1,
        width: "100%",
        height: "100%",
        justifyContent : "center",
        backgroundColor : "#171717",
        alignItems: "center"
    },
    whanew:{
        width: Dimensions.get("window").width/100*32,
        minHeight: Dimensions.get("window").height/4,
        alignItems : "baseline"
    },
    header:{
        width:"100%",
        height: 30,
        justifyContent : "center",
        borderBottomWidth: 1,
        borderBottomColor: "white"

    },
    featured:{
        width:"99%",
        minHeight: Dimensions.get("window").height/4*2,
        borderWidth : 1,
        borderColor : "white",
        borderRadius: 10,
        overflow: "hidden",
        margin : "2%"

    },
    featuredImg:{
        width: Dimensions.get("window").width/100*48,
        minHeight: Dimensions.get("window").height/2,


    },
    card:{
        width: "100%",
        backgroundColor: "#595858",
        flexDirection : "row"
    }
})