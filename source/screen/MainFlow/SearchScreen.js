import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {View, Text, Pressable} from 'react-native'
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../Constants/theme";
import * as postActions from '../../../store/actions/postCreation';
import { FlatList, ScrollView } from "react-native-gesture-handler";
import YoutubePost from "../../component/YoutubePost";

const SearchScreen = () => {

    const [search, setSearch] = useState()
    const [post, setPosts] = useState([])
    const [list, setList] = useState([])
    const [tags, setTags] = useState('title')
    const focused = useIsFocused()

      const [Images, setImages] = useState();
      const [loader, setLoader] = useState(false);

      const loadImages = async () => {
        console.log("yooo");
        setLoader(true);
        const response = await postActions.loadStaticImages();
        setImages(response);
        console.log(response);
      };
    
    const loadpost = async() => {
        const post =  await postActions.getPost()
        setPosts(post);
    }

    const continousSearch = (text) => {
        
        let list = []
        setSearch(text)
    if(tags === 'title'){
        list = post.filter(x=>x.title.toLowerCase().includes(text.toLowerCase()))
        setList(list)
    }else if (tags === 'author'){
        list = post.filter(x=>x.author.toLowerCase().includes(text.toLowerCase()))
        setList(list)
    }else if (tags === 'category'){
        list = post.filter(x=>x.category.toLowerCase().includes(text.toLowerCase()))
        setList(list)
    }else if (tags === 'tag'){
        list = post.filter(x=>x.tags.includes(text.toLowerCase()))
        setList(list)
    }

        
    }

    useEffect(()=>{
        if(focused){
            loadpost()
            loadImages();
        }
    },[])

    console.log('Postss', post[0]);

    const renderList = () => (
      <View>
        <FlatList
          data={list}
          contentContainerStyle={{ alignSelf: "center" }}
          renderItem={({ item, index }) => (
            <YoutubePost
              contentSmall={false}
              data={item}
              index={index}
              holdModal={false}
              images={Images}
            />
          )}
        />
      </View>
    );

    const tagsList = ['title', 'author', 'category']

    const renderSearchTags = () => (
        <View style={{backgroundColor:colors.secondary ,flex:1}}>
            <FlatList horizontal showsHorizontalScrollIndicator={false} data={tagsList} renderItem={({item, index})=>(<Pressable onPress={()=>setTags(item)} style={{backgroundColor:item===tags?colors.primary:null, padding:12, borderWidth:0.5, borderColor:colors.primary, borderRadius:8, marginHorizontal:6, marginVertical:8, justifyContent:'center'}}><Text style={{fontFamily:'medium', color:'white', width:80, fontSize:18, textAlign:'center'}}>{item}</Text></Pressable>)} />
        </View>
    )

    
    
    return(
        <SafeAreaView style={{flex:1, backgroundColor:colors.secondary}}>
        <ScrollView stickyHeaderIndices={[1]} contentContainerStyle={{backgroundColor:colors.secondary}}>
        
        <SearchBar
            placeholder="Search your query here...."
            onChangeText={(text)=>continousSearch(text)}
            value={search}
            platform='android'
            containerStyle={{backgroundColor:colors.secondaryLight}}
            inputStyle={{color:'white'}}
      />
      {renderSearchTags()}
    {list.length>0 && renderList()}
        </ScrollView>
        </SafeAreaView>
    )
}

export default SearchScreen