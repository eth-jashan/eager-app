import React, { useState } from 'react'
import { View, Text, Dimensions, TouchableOpacity, StyleSheet} from 'react-native';

const { width, height } = Dimensions.get('window')

const EditPostCard = (props) => {
    
    return (
        <TouchableOpacity onPress={() => {props.onClick}} style={styles.card} useForeground>
            <View style={styles.titleContainer}><Text style={styles.title}>{props.title}</Text></View>            
            <View style={styles.edit}>{props.children}</View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    edit: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-end' ,
    },
    card: { width: width * 0.96, 
        padding: 12, 
        borderRadius: 8, 
        marginVertical: 8, 
        backgroundColor: 'black', 
        height: 150, 
        alignSelf: 'center', 
        opacity: 0.75 ,
        flex: 1,
    },
    title: {
        fontFamily: 'medium', 
        fontSize: 18, 
        color: 'white' ,
    },
    titleContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between'

    }
});

export default EditPostCard;