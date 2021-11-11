import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {View,Text,StyleSheet, Dimensions,TextInput, TouchableOpacity, ScrollView, Image} from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
// import { TextInput } from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context'
import AuthTextInput from '../../component/AuthTextInput';
import { colors } from '../../Constants/theme';
//icons
import { AntDesign,Feather } from '@expo/vector-icons';
import { imageUtils } from '../../Constants/assets';
import { apiUtils } from '../../Constants/api';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import * as postActions from '../../../store/actions/postCreation';
const {width, height} = Dimensions.get('window')


const AuthScreen = ({navigation}) => {

    const [formSelect, setFormSelect] = useState('login')
    const [username, setUsername] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [showpass, setShowPass] = useState(true)
    const [error, setError] = useState(false)

    const dispatch = useDispatch();

    const storeData = async (value, keyValue) => {
        try {
          await AsyncStorage.setItem(keyValue, JSON.stringify(value))
          console.log('storeddd')
        } catch (e) {
          console.log('err===>', e)
        }
    }
    const toastShow = (title, message, type) => {
        Toast.show({
            type: type,
            text1: title,
            text2: message,
            position:'top',
            visibilityTime: 4000,
            autoHide: true,
        });
    }
    const signupAccount = async() => {
        setError(false)
        let config = {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          };
        let body = JSON.stringify({
            username: username,
            email: mail,
            password: password
        })
        try {
            const response = await axios.post(`${apiUtils.baseUrl}/accounts/signup/`,body, config)
            console.log('response', response.data)
            storeData(response.data,'@user_response')
            toastShow('Woooh🎉🎉🎉', 'Your account is successfully created', 'success')
            navigation.navigate('TopicSelection')
        } catch (error) {
            setError(true)
            toastShow('Bruuuhhh😟😟😟', 'Something went wrong', 'error')
        }
        
    }

    const signinAccount = async() => {
        setError(false)
        let config = {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          };
        let body = JSON.stringify({
            email: mail,
            password: password
        })
        try {
            const response = await axios.post(`${apiUtils.baseUrl}/accounts/token/`,body, config)
            console.log('response', response.data)
            storeData(response.data, '@user_tokens')
            toastShow(`Woooh🎉🎉🎉`, 'You are successfully logged in', 'success')
            dispatch(postActions.getProfile())
            navigation.navigate('Main')
        } catch (error) {
            setError(true)
            toastShow('Bruuuhhh😟😟😟', 'Something went wrong', 'error')
        }
        
    }

    const renderHeader = () => {
        return(
        <View style={{justifyContent:'space-between', flexDirection:'row'}}>
            <View/>
            <Image
                resizeMode='contain'
                style={{width:width/2, height:200, bottom:50, left:40}}
                source={imageUtils.authScreenGraphics}
            />
        </View>)
    }

    const signUpForm = () => {
        return (
            <View style={{marginTop:18}}>
                
                <AuthTextInput
                    value={mail}
                    placeholder="email"
                    onChangeText={setMail}
                    secureTextEntry={false}
                    helperText={false}
                    icon={()=><AntDesign name="user" size={24} color={colors.primary} />}
                    onError={error}
                />
                {formSelect === 'register'&&<View style={{marginVertical:12}}>
                    <AuthTextInput
                        value={username}
                        placeholder="username"
                        onChangeText={setUsername}
                        secureTextEntry={false}
                        helperText={false}
                        icon={()=><AntDesign name="user" size={24} color={colors.primary} />}
                        onError={error}
                    />
                </View>}
                <View style={{marginVertical:12}} >
                    <AuthTextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="password"
                        icon={()=>showpass?<Feather onPress={()=>setShowPass(!showpass)} name="eye" size={24} color={colors.primary}/>:<Feather onPress={()=>setShowPass(!showpass)} name="eye-off" size={24} color={colors.primary}/>}
                        secureTextEntry={showpass}
                        helperText={formSelect==='login'?true:false}
                        onError={error}
                    />
                </View>
                

            </View>
        )
    }
    const registerForm = () => {
        return (
            <View style={{}}>
                {signUpForm()}
                <View style={{marginBottom:12}} >
                    <AuthTextInput
                        value={rePassword}
                        onChangeText={setRePassword}
                        placeholder="Re-enter Password"
                        icon={()=>showpass?<Feather onPress={()=>setShowPass(!showpass)} name="eye" size={24} color={password != rePassword?'red':colors.primary}/>:<Feather onPress={()=>setShowPass(!showpass)} name="eye-off" size={24} color={colors.primary}/>}
                        secureTextEntry={showpass}
                        onError={password != rePassword}
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
                <TouchableOpacity onPress={formSelect==='register'?signupAccount:signinAccount} style={{width:width*0.8, alignSelf:'center', backgroundColor:colors.primary, padding:12}}>
                    <Text style={{fontSize:16, color:'white', fontFamily:'regular', alignSelf:'center'}}>{formSelect==='register'?'Sign Up':'Login'}</Text>
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
        <ScrollView contentContainerStyle={{backgroundColor:colors.secondary, height:Dimensions.get('screen').height}} >
            <StatusBar backgroundColor={colors.secondary} />
            {renderHeader()}
        <TouchableWithoutFeedback onPress={()=>setError(false)}>
            {renderForm()}
            {renderFooter()}
        </TouchableWithoutFeedback>
        </ScrollView>
    )
}

export default AuthScreen;