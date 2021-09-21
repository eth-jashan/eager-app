import React from 'react'
import {View,Text} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from '../../Constants/theme';

const HomeScreen = () => {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
        <Text style={{color:'white'}}>My Post</Text>
      </SafeAreaView>
    );
}


export default HomeScreen