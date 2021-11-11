import React, { useRef, useState, useEffect } from "react";
import { View, Text, Dimensions, KeyboardAvoidingView, Image, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../Constants/theme";
import LinkPreview from "react-native-link-preview";

//icons
import { Ionicons } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import { Fontisto } from "@expo/vector-icons"; 

//components
import CreatePost from "../../component/CreatePost";
import YoutubePost from "../../component/YoutubePost";
import {  ScrollView } from "react-native-gesture-handler";
import HeaderComponent from "../../component/HeaderComponent";
import { AntDesign, Entypo ,Foundation, MaterialCommunityIcons, FontAwesome , FontAwesome5} from '@expo/vector-icons';
import { MarkdownView } from "react-native-markdown-view";
import WebView from "react-native-webview";
import { save_post } from "../../../store/actions/postCreation";

const DetailScreenc = ({navigation,route}) => {

  const saveThisPost = async() => {
    console.log('heyy')
    const response = await save_post(post_details.id);
  }

      function strToInt(str, arrLen) {
        const charArr = str.split("");
        let total = 0;
        const codeArr = charArr.forEach((char) => {
          total += char.charCodeAt(0);
        });
        const uniqueNum = parseInt(total % arrLen);
        console.log(uniqueNum);
        return uniqueNum;
      }

  const { post_details, myTag, myPostType,images } = route.params;
  console.log('postssssssss', post_details , myPostType ,myTag)

const{width,height} = Dimensions.get('window')
const modalizeRef = useRef(null);
const [link, setLink] = useState();
const [type, setType] = useState();

const dummyProfilePic = 'https://www.vrsiddhartha.ac.in/me/wp-content/uploads/learn-press-profile/4/172522ec1028ab781d9dfd17eaca4427.jpg'
    const dummyProfileName = post_details.author;
    const dummyDescription = post_details.description;
    const textLimit = 100
    const postLink = [{type:'YoutubeLink', link:'https://www.youtube.com/watch?v=Qqx_wzMmFeA', meta:{
      "contentType": "text/html; charset=utf-8",
      "description": "Here is the best free javascript programming course on the planet. Made with lots of ❤️. Take your web development skills to the next level with this Clever ...",
      "favicons":  [
        "https://www.youtube.com/s/desktop/f7ad551d/img/favicon_32x32.png",
        "https://www.youtube.com/s/desktop/f7ad551d/img/favicon_48x48.png",
        "https://www.youtube.com/s/desktop/f7ad551d/img/favicon_96x96.png",
        "https://www.youtube.com/s/desktop/f7ad551d/img/favicon_144x144.png",
        "https://www.youtube.com/s/desktop/f7ad551d/img/favicon.ico",
      ],
      "images":  [
        "https://i.ytimg.com/vi/Qqx_wzMmFeA/maxresdefault.jpg",
      ],
      "mediaType": "video.other",
      "title": "JavaScript Tutorial for Beginners - Full Course in 8 Hours [2020]",
      "url": "https://www.youtube.com/watch?v=Qqx_wzMmFeA",
      "videos":  [],
    }},{type:'YoutubeLink', link:'https://medium.com/game-development-stuff/how-to-apply-shadows-on-react-native-fa745d374ae7', meta:{
      "contentType": "text/html; charset=utf-8",
  "description": "Some weeks ago I spent some time researching about how to apply shadows on iOS and Android on a react-native project. It ended being a bit messy topic, with several options to use and not being able…",
  "favicons":  [
    "https://miro.medium.com/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
    "https://miro.medium.com/fit/c/152/152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png",
    "https://miro.medium.com/fit/c/120/120/1*sHhtYhaCe2Uc3IU0IgKwIQ.png",
    "https://miro.medium.com/fit/c/76/76/1*sHhtYhaCe2Uc3IU0IgKwIQ.png",
    "https://miro.medium.com/fit/c/60/60/1*sHhtYhaCe2Uc3IU0IgKwIQ.png",
  ],
  "images":  [
    "https://miro.medium.com/max/810/1*aVqPxuHHBCRHCz4XxUH2AA.jpeg",
  ],
  "mediaType": "article",
  "title": "How to apply shadows on React Native",
  "url": "https://medium.com/game-development-stuff/how-to-apply-shadows-on-react-native-fa745d374ae7",
  "videos":  [],
    }},
  ]
    const [linkTypeStatus, setLinkTypeStatus] = useState([])
    const [liked, setLiked] = useState(false)
    const [likes,setLikes] = useState(0);
    
    const linkCheck = async() => {
      // for (let i =0; i< postLink.length; i++){
      //   console.log('Post', postLink[i])
      //   if(postLink[i].includes('youtube')){
      //     const meta = await LinkPreview.getPreview(postLink[i])
      //     console.log('meta=====>',meta)
      //     linkTypeStatus.push({type:'YoutubeLink', meta:meta})
      //   }else{
      //     const meta = await LinkPreview.getPreview(postLink[i])
      //     console.log('meta=====>',meta)
      //     linkTypeStatus.push({type:'Other', meta:meta})
      //   }
      // }
      const meta = await LinkPreview.getPreview('https://github.com/TravoKarma/travokarma.UX')
      console.log('meta=====>',meta.stringyfy())
    }
    useEffect(()=>{
      linkCheck()
    },[])
    const postType = [
        {
          label: " Question",
          value: "Question",
          icon: () => <AntDesign name="question" size={12} color="white" />,
        },
        {
          label: " Diary Entry",
          value: "Diary Entry",
          icon: () => <AntDesign name="book" size={12} color="white" />,
        },
        {
          label: " Idea",
          value: "Idea",
          icon: () => <AntDesign name="bulb1" size={12} color="white" />,
        },
      ]
    const categoryType = [
      {
        label: "AI & Machine Learning",
        value: "AI & Machine Learning",
        icon: () => (
          <MaterialCommunityIcons name="robot" size={16} color="#171717" />
        ),
      },
      {
        label: "Frontend",
        value: "Frontend",
        icon: () => <Entypo name="code" size={16} color="#f89820" />,
      },
      {
        label: "Backend",
        value: "Backend",
        icon: () => <AntDesign name="CodeSandbox" size={16} color="#9e79d9" />,
      },
      {
        label: "Software",
        value: "Software",
        icon: () => <FontAwesome name="gear" size={16} color="#FFE873" />,
      },
      {
        label: "Web",
        value: "Web",
        icon: () => <Foundation name="web" size={16} color="#66D3FA" />,
      },
      {
        label: "Cloud Computing",
        value: "Cloud Computing",
        icon: () => <AntDesign name="cloud" size={16} color="white" />,
      },
      {
        label: "Algorithms",
        value: "Algorithms",
        icon: () => <Entypo name="flow-branch" size={16} color="#ff8282" />,
      },
      {
        label: "Networking",
        value: "Networking",
        icon: () => <Entypo name="network" size={16} color="#b8e374" />,
      },
    ]
    const renderUserInfo = () => (
      <View style={{justifyContent:'space-between', flexDirection:'row',width:'100%', padding:12, backgroundColor:colors.secondaryBlack}}>
        <View style={{ flexDirection:'row', borderTopRightRadius:16, borderTopLeftRadius:16}}>
          <View>
            <Image source={{uri:images ? post_details.author? images.file[strToInt(post_details.author, post_details.author.length)]: null: null}} style={{width:40, height:40, borderRadius:40}} />
            <Text style={{position:'absolute',alignSelf:'center',fontSize:20,color:'#ffffff',textAlign:'center',top:5}}>{post_details.author.charAt(0).toUpperCase()}</Text>
          </View>
            
            <View style={{marginLeft:12, alignSelf:'center'}}>
                <Text style={{fontFamily:'medium', fontSize:16, color:'white'}}>{dummyProfileName}</Text>
                
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                      {myPostType?<AntDesign name={myPostType[1]} size={12} color="white" />:null}
                      {myPostType?<Text style={{fontFamily:'light', color:'white', marginLeft:4}}>{myPostType[0]}</Text>:null}
                  </View>
            </View>
        </View>
      </View>
    )

    const renderDescription = () => (
      <View style={{alignItems:'center'}}>
        <MarkdownView style={{ text: "blue", width: width * 0.9 }}>
          {dummyDescription}
        </MarkdownView>
      </View>
    );
    const onMetaPress = (item) => {
      setLink(item?.link)
      setType(item?.type)
      modalizeRef.current?.open()
    }
    const renderLink = (item , index) => {
      // console.log('Linkkk', item.meta.images[0])
      if(item?.type === 'YoutubeLink'){
        return(
          <Pressable onPress={()=>onMetaPress(item)} style={{margin:8}}>
            <View style={{flexDirection:'row'}}>
            <Image source={{uri:item.meta.favicons[2]}} style={{height:32, width:32}} />
            {/* <Text style={{fontSize:16, fontFamily:'medium', color:'white', alignSelf:'center', marginLeft:6}}>YouTube</Text> */}
            </View>
            <Text numberOfLines={1} style={{fontSize:14, fontFamily:'regular', color:'white', width:200}}>{item.meta.title}</Text>
            <View>
            <Image resizeMode='contain' style={{height:150, width:200}} source={{uri:item.meta.images[0]}} />
            </View>
          </Pressable>
        )
      }
      
    }
    const linkMeta = () => (
      <View>
        {/* <Text style={{fontFamily:'light', color:colors.primary, marginLeft:6}}>{post_details.resources.length} {post_details.resources.length>1?'links':'link'} 🔗 attatched </Text> */}
         <Text style={{fontFamily:'light', color:colors.primary, marginLeft:6}}>2 links 🔗 attatched </Text>
        <FlatList 
          data={postLink} 
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_,i)=>i.toString()} 
          renderItem={({item, index})=>(renderLink(item, index))} />
      </View>
    )
    const singleCategory = (item) => {
      return (
        <View
          style={{
            margin: 6,
            padding: 6,
            flexDirection: "row",
            backgroundColor: colors.primary,
            borderRadius: 20,
          }}
        >
          {/* {postType[1].icon()} */}
          <Text
            style={{
              alignSelf: "center",
              marginLeft: 4,
              color: "white",
              fontFamily: "light",
            }}
          >
            {item}
          </Text>
        </View>
      );
    };
    const renderCategory = () => (
      <View style={{ marginBottom: 8 }}>
        {/* <Text style={{fontFamily:'light', color:colors.primary, marginLeft:6}}>{categoryType.length} categories selected </Text> */}
        <FlatList
          horizontal
          data={myTag}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => singleCategory(item)}
        />
      </View>
    );
    const renderReaction = () => (
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{flexDirection:'row', margin:6}}>
          <Text style={{fontFamily:'medium', fontSize:16,alignSelf:'center', color:liked?colors.primary:'white'}}>{likes}</Text>
          <Entypo onPress={()=>{setLiked(!liked),setLikes(likes+1)}} name="arrow-bold-up" size={20} color={liked?colors.primary:"white"} />
        </View>
        <View style={{flexDirection:'row', margin:6}}>
            <Entypo name="arrow-bold-down" size={20} color={"white"} />
          </View>
        <View style={{flexDirection:'row', margin:6}}>
          <Text style={{fontFamily:'medium', fontSize:16,alignSelf:'center', color:'white'}}>10</Text>
          <FontAwesome5 onPress={()=>navigation.navigate('CommentScreen')}  style={{marginLeft:4}} name="comment" size={20} color="white" />
        </View>
        <View style={{flexDirection:'row', margin:6}}>
        <Fontisto onPress={() => saveThisPost()}  name="favorite" size={24} color="white" />
        </View>
      </View>
    )
    const renderImage = () => (
      <View style={{ width: width * 0.98, alignSelf: "center" }}>
        <Image
          resizeMode="cover"
          source={{ uri: post_details.image }}
          style={{
            height: height * 0.2,
            width: width * 0.85,
            alignSelf: "center",
            borderRadius: 6,
          }}
        />
      </View>
    );
    
    const renderContent = () => {
      return(
        <View style={{padding:8}}>
        <Text style={{paddingLeft:8,paddingRight:8, fontFamily:'medium', fontWeight:'bold', fontSize:20, color:'white', marginBottom:12}}>{post_details.title}</Text>
        {post_details.image? renderImage():null}
        {renderDescription()}
        {linkMeta()}
        </View>
      )
    }

    const renderHeader = () => {
      return(
        <HeaderComponent headerStyles={{backgroundColor:colors.secondary, padding:12}} leftIcon={()=>(<AntDesign name="arrowleft" size={24} color={colors.primaryDark} />)} />
      )
    }

    const detailBlocks = [{item:renderHeader()},
    {item:renderUserInfo()},
    {item:renderCategory()},
    {item:renderContent()}]


  return (
      <SafeAreaView style={{flex:1,backgroundColor:colors.secondary}}>
      <FlatList keyExtractor={(_,i)=>i.toString()} contentContainerStyle={{ backgroundColor: colors.secondary }} data={detailBlocks} renderItem={({item, index})=>item.item} />

        <View style={{position:'absolute', bottom: 20, width:'90%', padding:12, backgroundColor:colors.navBarBackground, alignSelf:'center', borderRadius:18,borderColor:'#1078FC',elevation:7}}>
          {renderReaction()}
      </View>     

      <Modalize
        modalStyle={{ backgroundColor: colors.modal }}
        ref={modalizeRef}
        modalHeight={height}
        handlePosition={"inside"}
        closeOnOverlayTap
      >
        <ScrollView style={{height:height}} >
        <WebView 
        automaticallyAdjustContentInsets={false}
          style={{height:height*7.4,width:width}}
          source={{ uri: link }}
        />
        </ScrollView>
      </Modalize>
    </SafeAreaView>
  );
};

export default DetailScreenc;