import React, { useState } from 'react'
import {View, TextInput, Text, Dimensions} from 'react-native'
import { colors } from '../Constants/theme'
const {width, height} = Dimensions.get('window')

const AuthTextInput = ({value, placeholder,onChangeText, icon, secureTextEntry, onError,helperText}) => {
    
    const [showLabel, setShowLabel] = useState(false)

    const onFocus = () => {
        setShowLabel(true)
    }

    const onBlur = () => {
        
        if(value.length > 0){
            setShowLabel(true)
        }else{
            setShowLabel(false)
        }
    }

    return(
        <View>
            <View style={{borderWidth:onError?1:null, borderColor:onError?'red':null, width:width*0.88, padding:12, backgroundColor:'black',  borderRadius:12}}>
                {showLabel?<Text style={{color:onError?'red':colors.primary}}>{placeholder}</Text>:null}   
                <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}} >
                <TextInput  
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={'#d8d8d8'}
                    style={{color:'white', width:'80%'}}
                    secureTextEntry={secureTextEntry}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                {icon()}
                </View>
            </View>
            <View style={{width:'90%', justifyContent:'space-between', flexDirection:'row'}}>
            <View/>
            {helperText?<Text style={{fontSize:14, marginVertical:6, color:colors.primary}}>Forgot Password ?</Text>:null}
            </View>
        </View>
    )

}

export default AuthTextInput