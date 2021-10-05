import React from 'react'
import {View, Text} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
const HomeHeader = ({headerStyles, rightIcon, leftIcon, title, titleStyle}) => {

    //const staticPropType = 

    return(
        <View style={{width:'100%'},[headerStyles]}>
            {leftIcon && leftIcon()}
            <Text style={titleStyle}>{title}</Text>
            {rightIcon && rightIcon()}
        </View>
    )

}

export default HomeHeader