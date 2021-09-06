import React from 'react'
import {View, TextInput, Text, Dimensions} from 'react-native'
import { colors } from '../Constants/theme'
const {width, height} = Dimensions.get('window')

const AuthTextInput = ({value, placeholder,onChange, icon, secureTextEntry, onError,helperText}) => {
    console.log('value', value.toString().length)
    return(
        <View>
            <View style={{borderWidth:onError?1:null, borderColor:onError?'red':null, width:width*0.88, padding:12, backgroundColor:'black',  borderRadius:12, flexDirection:'row', justifyContent:'space-between'}}>
                {/* {value.toString().length>0?<Text style={{color:colors.primary}}>{placeholder}</Text>:null}   */}
                <TextInput
                    value={value}
                    onChange={(text)=>onChange(text)}
                    placeholder={placeholder}
                    placeholderTextColor={'#d8d8d8'}
                    style={{color:'white', width:'80%'}}
                    secureTextEntry={secureTextEntry}
                />
                {icon()}
            </View>
            <View style={{width:'90%', justifyContent:'space-between', flexDirection:'row'}}>
            <View/>
            {helperText?<Text style={{fontSize:14, marginVertical:6, color:colors.primary}}>Forgot Password ?</Text>:null}
            </View>
        </View>
    )

}

export default AuthTextInput