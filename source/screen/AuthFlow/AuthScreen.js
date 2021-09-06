import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {View,Text,StyleSheet, Dimensions,TextInput, TouchableOpacity, ScrollView, Image} from 'react-native';
// import { TextInput } from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context'
import AuthTextInput from '../../component/AuthTextInput';
import { colors } from '../../Constants/theme';
//icons
import { AntDesign,Feather } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window')



const AuthScreen = () => {
    
    const [formSelect, setFormSelect] = useState('login')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [showpass, setShowPass] = useState(true)

    const renderHeader = () => {
        return(
        <View style={{justifyContent:'space-between', flexDirection:'row'}}>
            <View/>
            <Image
                resizeMode='contain'
                style={{width:width/2, height:200, bottom:50, left:40}}
                source={require('../../../assets/login-graphic.png')}
            />
        </View>)
    }

    const signUpForm = () => {
        console.log('valueeee', username.length)
        return (
            <View style={{marginTop:18}}>

                <AuthTextInput
                    value={username}
                    placeholder="username"
                    onChange={(text)=>setUsername(text)}
                    secureTextEntry={false}
                    helperText={false}
                    icon={()=><AntDesign name="user" size={24} color={colors.primary} />}
                />
                <View style={{marginVertical:12}} >
                    <AuthTextInput
                        value={password}
                        onChange={(text)=>setPassword(text)}
                        placeholder="password"
                        icon={()=>showpass?<Feather onPress={()=>setShowPass(!showpass)} name="eye" size={24} color={colors.primary}/>:<Feather onPress={()=>setShowPass(!showpass)} name="eye-off" size={24} color={colors.primary}/>}
                        secureTextEntry={showpass}
                        helperText={formSelect==='login'?true:false}
                    />
                </View>
                

            </View>
        )
    }
    const registerForm = () => {
        console.log('valueeee', username.length)
        return (
            <View style={{}}>
                {signUpForm()}
                <View style={{marginBottom:12}} >
                    <AuthTextInput
                        value={rePassword}
                        onChange={(text)=>setRePassword(text)}
                        placeholder="Re-enter Password"
                        icon={()=>showpass?<Feather onPress={()=>setShowPass(!showpass)} name="eye" size={24} color={colors.primary}/>:<Feather onPress={()=>setShowPass(!showpass)} name="eye-off" size={24} color={colors.primary}/>}
                        secureTextEntry={showpass}
                    />
                </View>

            </View>
        )
    }
    const typeOfForm = (type) => {
        switch(type){
            case 'login':
                return signUpForm()
            case 'register':
                return registerForm()
        }
    }
    const renderForm = () => {
        return(
            <View style={{padding:12}}>
                <View style={{flexDirection:'row'}} >
                    <TouchableOpacity onPress={()=>setFormSelect('login')} style={{borderBottomColor:formSelect==='login'?'white':'gray', borderBottomWidth:1, padding:8}} >
                        <Text style={{fontFamily:'regular', color:'white', fontSize:26, alignSelf:'center', justifyContent:'center'}}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setFormSelect('register')} style={{borderBottomColor:formSelect==='register'?'white':'gray', borderBottomWidth:1, padding:8}} >
                        <Text style={{fontFamily:'regular', color:'white', fontSize:26, alignSelf:'center', justifyContent:'center'}}>Register</Text>
                    </TouchableOpacity>
                </View>
                {typeOfForm(formSelect)}
            </View>
        )
    }

    const renderFooter = () => {
        return(
            <View>
                <TouchableOpacity style={{width:width*0.8, alignSelf:'center', backgroundColor:colors.primary, padding:12}}>
                    <Text style={{fontSize:16, color:'white', fontFamily:'regular', alignSelf:'center'}}>Sign In</Text>
                </TouchableOpacity>
                <View>
                    <View style={{width:'80%', borderColor:'gray',borderWidth:0.5, alignSelf:'center', marginTop:26}} />
                    <Text style={{alignSelf:'center', fontFamily:'light', color:'white', marginTop:12, fontSize:18}}>Follow us on</Text>
                <View style={{flexDirection:'row',alignSelf:'center'}}>
                <AntDesign style={{margin:4}} name="instagram" size={24} color="white" />
                <AntDesign style={{margin:4}} name="facebook-square" size={24} color="white" />
                </View>
                </View>
            </View>
        )
    }

    return(
        <SafeAreaView style={{backgroundColor:colors.secondary, flex:1}} >
            <StatusBar backgroundColor={colors.secondary} />
            {renderHeader()}
            {renderForm()}
            {renderFooter()}
        </SafeAreaView>
    )
}




export default AuthScreen