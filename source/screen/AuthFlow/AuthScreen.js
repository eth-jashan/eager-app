import React, { useState } from 'react';
import {View,Text,StyleSheet, Dimensions,TextInput, TouchableOpacity, ScrollView} from 'react-native';
// import { TextInput } from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context'


//icons
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { styles } from './Styles/AuthStyle';

const {width, height} = Dimensions.get('window')



const AuthScreen = () => {
    const [passwordVisible,setPasswordVisible] = useState(true)
    const[isSignUp,setIsSignUp] = useState(true)


    return(
        <ScrollView style={{flex:1}}>
            
        </ScrollView>
    )
}




export default AuthScreen