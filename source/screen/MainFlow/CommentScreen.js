import React from 'react'
import {Image, Pressable, Text, View} from 'react-native'
import HeaderComponent from '../../component/HeaderComponent'
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { colors } from '../../Constants/theme';
import { AntDesign, Entypo ,Foundation, MaterialCommunityIcons, FontAwesome , FontAwesome5} from '@expo/vector-icons';

const CommentScreen = () => {
    const dummyProfilePic = 'https://www.vrsiddhartha.ac.in/me/wp-content/uploads/learn-press-profile/4/172522ec1028ab781d9dfd17eaca4427.jpg'
    const dummyText1 = 'By the title of this post, it might seem that this is going to be filled with random text just to fill the page. Well, close..'
    const renderHeader = () => {
        return(
          <HeaderComponent headerStyles={{borderBottomWidth:0.2, backgroundColor:colors.secondary, padding:12}} leftIcon={()=>(<AntDesign name="arrowleft" size={24} color={colors.primaryDark} />)} />
        )
    }

    const commentList = [{name:'Jashan Shetty', comment:'By the title of this post, it might seem that this is going to be filled with random'}, 
    {name:'Piyush Joshi', comment:'is going to be filled with random text just to '},
    {name:'Arjun VR', comment:'By the title of this post, it might seem that this'},
    {name:'Mandar Parab', comment:`seem that this is going to be filled with random ${dummyText1}`}]

    const renderReaction = () => (
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'row', margin:6}}>
            <Text style={{fontFamily:'medium', fontSize:16,alignSelf:'center', color:'white'}}>5</Text>
            <Entypo name="arrow-bold-up" size={20} color={"white"} />
          </View>
          <View style={{flexDirection:'row', margin:6}}>
            <Entypo name="arrow-bold-down" size={20} color={"white"} />
          </View>
          {/* <View style={{flexDirection:'row', margin:6}}>
          <AntDesign  name="sharealt" size={24} color="white" />
          </View> */}
        </View>
      )

    return(
        <SafeAreaView style={{flex:1, backgroundColor:colors.secondaryBlack}}>
            {renderHeader()}
            <FlatList 
                data={commentList}
                contentContainerStyle={{marginBottom:55}}
                renderItem={({item, index})=>{
                    return(
                        <View style={{width:'100%', padding:12, flexDirection:'row', backgroundColor:colors.secondaryBlack, borderBottomWidth:1, paddingBottom:12}}>
                            <View>
                                <Image source={{uri:dummyProfilePic}} style={{width:30, height:30, borderRadius:20}}/>
                            </View>
                            <View style={{marginLeft:16, marginRight:8}}>
                                <Text style={{fontFamily:'medium', fontSize:16, fontWeight:'bold', color:'white'}} >{item.name}</Text>
                                <Text style={{fontFamily:'light', fontSize:14,  color:'white', marginTop:4}} >{item.comment}</Text>
                                <View>
                                    {renderReaction()}
                                </View>
                            </View>
                        </View>
                    )
                }} />
            <View style={{backgroundColor:colors.secondary, position:'absolute', width:'100%', bottom:0, height:55, flexDirection:'row', padding:8}}>
                <View>
                    <Image source={{uri:dummyProfilePic}} style={{width:30, height:30, borderRadius:20, alignSelf:'center'}}/>
                </View>
                <TextInput multiline   placeholderTextColor={'white'} placeholder='Enter Comment...' style={{width:'80%', padding:8, marginLeft:6, alignSelf:'center',color:'white'}} />
                <Pressable style={{alignSelf:'center'}}>
                    <Text style={{color:colors.primary, fontFamily:'medium', fontSize:18, alignSelf:'center'}}>Post</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )

}

export default CommentScreen