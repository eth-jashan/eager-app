import React, { useState } from 'react'
import {View, Text, Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const {width, height} = Dimensions.get('window')

const TopicCard = ({item,onSelect}) => {
    
    const randomColor = () => {
        var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        if(randomColor === '#000000'){
            randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        }
        return randomColor
    }
    const [selected, setSelected] = useState(false)
    const onPress = (postId,item) => {
        setSelected(!selected)
        onSelect(postId,item)
    }
    return(
        <TouchableOpacity onPress={() => onPress(item.id,item)} style={{width:width*0.96, padding:12, borderRadius:8,marginVertical:8, backgroundColor:selected?'#1078FC':'black', height:150, alignSelf:'center',opacity:0.75}}>
            <Text style={{fontFamily:'medium', fontSize:18, color:'white'}}>{item.name}</Text>
        </TouchableOpacity>
    )
}

export default TopicCard