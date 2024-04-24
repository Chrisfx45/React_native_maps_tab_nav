import 'react-native-gesture-handler';
import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Alert, Modal, ImageBackground,FlatList,Dimensions, Pressable} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createStackNavigator} from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as auth from "../../api/auth"


const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()
function Wishlist({route}){
    const img = route.params
    const handleClick=()=>{

        console.log(img)

    }
    return(
        <View style={{width:"100%"}}> 
                <TouchableOpacity onPress={()=>{handleClick()}}><Text>Wish</Text></TouchableOpacity>
        </View>

    )

}
function Liked({route}){
    const [post, setPost] =useState({})
    const img = route.params

    const handleClick=()=>{

        console.log(img.data)

    }
    const pressed =(item)=>{ 
        setPost(item)
        setModalVisible(!modalVisible)
    }
    useEffect(()=>{
        console.log("post=>",post)
        console.log("vis", modalVisible)
    }, [post])
    const liked=(item)=>{
        return(
            
            <View style={{width :  Dimensions.get("window").width/2, height :Dimensions.get("window").height/3}}>
                <TouchableOpacity onPress={()=>{pressed(item.item)}}>
                    <ImageBackground style={styles.galImg} source={{uri: `https://www.instagram.com/p/${item.item.thumbnail}/media/?size=l`}}>
                        <Text style={{width:"100%", color : "#e3e3e3",  textShadowColor: 'black', textShadowRadius: 1, fontSize: 20}} numberOfLines={1}>{item.item.restname}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            

            </View>
        )

    }
    const [modalVisible, setModalVisible] = useState(false);
    return(
        <View style={{width:"100%"}}> 
                <TouchableOpacity onPress={()=>{handleClick()}}><Text>Like</Text></TouchableOpacity>
                <Modal
                animationType="slide"
                visible={modalVisible}
                >
                    <View style ={{width:"100%",height :Dimensions.get("window").height} }>
                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                         <Text >Hide Modal</Text>
                         <Text >{post.restname}</Text>
                        </Pressable>
                        
                    </View>
                
                </Modal>
                <FlatList
                data={img.data}
                numColumns={2}
                renderItem={liked}
                />
        </View>



    )

}


function Personal(){
    const [pinfo,setPinfo] = useState({})
    const [like,setLike] = useState([])
    const [wish,setWish] = useState([])
    const getData = async ()=>{
        const data = await AsyncStorage.getItem("UsrData")
        const parsed = JSON.parse(data)
        setPinfo(parsed)
        setLike({data:parsed.saved})
        setWish({data :parsed.wish})

    }
    useEffect (()=>{
        getData()
    },[])
    const handleClick=()=>{

        console.log("wish", like)

    }
    return (
    <View style = {styles.container}>
        <TouchableOpacity onPress={()=>{handleClick()}}><Text>click</Text></TouchableOpacity>
        <Text style={{width:"100%"}}>Hello! {pinfo.name}</Text>
        <Text style={{width:"100%"}}>Welcome Back</Text>
        <View style={{ flex: 1, height: 100,width:"100%"}}>
        <Tab.Navigator>
            <Tab.Screen name="Wishlist" component={Wishlist} initialParams={wish} />
            <Tab.Screen name="Liked" component={Liked} initialParams={like}/>
        </Tab.Navigator>    

        </View>

    </View>
    )
}
function Register({navigation}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const handleRegister = async ()=>{
        req ={
            email : email,
            name : username,
            password : password

        }
        const data = await auth.signUp(req)
        console.log(data.msg)
        if(data.msg === "OK"){
            Alert.alert("Register Successed", "User is created",[{
                text :"OK",
                onPress: ()=> navigation.navigate("Login")  
               }])
        }else{
            Alert.alert("Register Failed", data.msg,[{
                text :"OK",
                onPress: ()=> console.log("failed")   
               }])
        }
    }
    return(
        <View style= {styles.container}>
            <View style ={{alignContent :"flex-start", width : "80%"}}>
            <Text>
                Email
            </Text>
            <TextInput placeholder='Please type in your email' style = {styles.input} onChangeText={(text) =>{setEmail(text)}}/>
            <Text>
                Username
            </Text>
            <TextInput placeholder='Please type in your Username' style = {styles.input} onChangeText={(text) =>{setUsername(text)}}/>
            <Text>
                Password
            </Text>
            <TextInput placeholder='Please type in your password' secureTextEntry style = {styles.input} onChangeText={(text)=>{setPassword(text)}}/>

            <Button  title='Register' onPress={()=>{handleRegister()}} />
            </View>

        
        </View>
    )

}

function Login({navigation}){
    const [email, setEmail ] = useState("")
    const [password, setPassword ] = useState("")
    const handleLogin = async () =>{
        req ={
            email : email,
            password : password
        }
        const data = await auth.signIn(req)
        console.log(data.msg)
        if (data.msg === "OK"){
            AsyncStorage.setItem("UsrData",JSON.stringify(data.data))
            navigation.navigate("Personal Page")
            
        }else{
            Alert.alert("Login Failed", "Password or Username is False",[{
             text :"OK",
             onPress: ()=> console.log("failed")   
            }])
        }
    }
    const navRegister =()=>{
        navigation.navigate("Register")
    }
    return(
        <View style= {styles.container}>
            <View style ={{alignContent :"flex-start", width : "80%"}}>
            <Text>
                Email
            </Text>
            <TextInput placeholder='Please type in your email' style = {styles.input} onChangeText={(text) =>{setEmail(text)}}/>
            <Text>
                Password
            </Text>
            <TextInput placeholder='Please type in your password' secureTextEntry style = {styles.input} onChangeText={(text)=>{setPassword(text)}}/>

            <Button  title='Login' onPress={()=>{handleLogin()}} />
            <Text style ={{marginTop: 12}}>Don't Have an account?</Text>
            <TouchableOpacity onPress={()=>{navRegister()}}><Text style = {{color: "blue"}}>register here</Text></TouchableOpacity>
            </View>

        
        </View>
    )
}
export default function Profile(){
    return(
        <Stack.Navigator>
            <Stack.Screen name = "Login" component={Login}/>
            <Stack.Screen name = "Personal Page" component={Personal}/>
            <Stack.Screen name = "Register" component={Register}/>
        </Stack.Navigator>

    )
}
const styles = StyleSheet.create({
    container :{
        ...StyleSheet.absoluteFillObject,
        paddingTop: "2%",
        flex : 1,
        width: "100%",
        height: "100%",
        justifyContent : "flex-start",
        alignItems: "center"
    },
    profile :{
        color :"black",
        width : "100%",
        height : "100%"
    },
    input :{
        height: 35,
        width : "100%",
        marginVertical: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    galImg:{
        width: Dimensions.get("window").width/2,
        height :Dimensions.get("window").height/3
    }

})