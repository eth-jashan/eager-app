import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { AntDesign,Feather, Ionicons, Entypo, Foundation, MaterialCommunityIcons, FontAwesome, FontAwesome5} from "@expo/vector-icons";
import { colors } from '../Constants/theme';
import LinkPreview from "react-native-link-preview";
import { FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MarkdownView } from "react-native-markdown-view";
const {width, height} = Dimensions.get('window')

const YoutubePost = ({index,contentSmall,data,onSelect,onHold,onHoldOut,holdModal}) => {
  const[myTag,setMyTag] = useState('');
  const[myPostType,setMyPostType] = useState();

  useEffect(()=>{
    findPT(data.tags);
  },[])

  function capitalizeFirstLetter(string) {
    let text
    const word =  string.charAt(0).toUpperCase() + string.slice(1);

    switch(word){
      case 'Question':
        text = ["Question", 'question'];
        setMyPostType(text)
        break;
      case 'Diary entry':
        text = ["Diary entry", "book"];
        setMyPostType(text);
        break;
      case 'Idea':
        text = ["Idea", "bulb1"];
        setMyPostType(text);
        break;
      default:
        setMyPostType('');
    }
  }

  const applyPostIcon = (PostType) => {
    if(PostType){
         PostType.map((x) => capitalizeFirstLetter(x));
    }

  }
  
  const findPT = async(postType) => {
    const postTypes = await postType.filter((word) => word === "question" || word === "idea" || word === "diary entry");
    const tags = await postType.filter((word) => word !== "question" && word !== "idea" && word !== "diary entry");
    applyPostIcon(postTypes)
    setMyTag(tags);
  }

  const[selected,setSelected] = useState(false);

  const onAddToCollection = (data) => {
    setSelected(!selected)
     onSelect(data);

  }

  const onHoldPost = (data) => {
    onHold(data)
  }

    const dummyProfilePic = 'https://www.vrsiddhartha.ac.in/me/wp-content/uploads/learn-press-profile/4/172522ec1028ab781d9dfd17eaca4427.jpg'
    const dummyProfileName = 'Jashan Shetty'
    const dummyDescription = "What does the 2nd line actually mean ?\ndata={this.state.data} keyExtractor={(x,i)=>i}"
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
    }},{type:'YoutubeLink', link:'https://www.youtube.com/watch?v=9ZmjGdwtvP4', meta:{
      "contentType": "text/html; charset=utf-8",
      "description": "Github repo: https://github.com/mguay22/scalable-react-nativeReact Native: https://reactnative.dev/docs/getting-startedRedux: https://redux.js.org/Redux Saga...",
      "favicons":  [
        "https://www.youtube.com/s/desktop/f7ad551d/img/favicon_32x32.png",
        "https://www.youtube.com/s/desktop/f7ad551d/img/favicon_48x48.png",
        "https://www.youtube.com/s/desktop/f7ad551d/img/favicon_96x96.png",
        "https://www.youtube.com/s/desktop/f7ad551d/img/favicon_144x144.png",
        "https://www.youtube.com/s/desktop/f7ad551d/img/favicon.ico",
      ],
      "images":  [
        "https://i.ytimg.com/vi/9ZmjGdwtvP4/maxresdefault.jpg",
      ],
      "mediaType": "video.other",
      "title": "Setup a Scalable React Native App | Redux + Redux Saga + React Navigation",
      "url": "https://www.youtube.com/watch?v=9ZmjGdwtvP4",
      "videos":  [],
    }}]
    const [linkTypeStatus, setLinkTypeStatus] = useState([])
    const [liked, setLiked] = useState(false)
    
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
      const meta = await LinkPreview.getPreview('https://www.youtube.com/watch?v=Qqx_wzMmFeA')
      // console.log('meta=====>',meta)
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
      <View style={{justifyContent:'space-between', flexDirection:'row',width:'100%',marginBottom:5}}>
        <View style={{ flexDirection:'row', borderTopRightRadius:16, borderTopLeftRadius:16}}>
            <Image source={{uri:dummyProfilePic}} style={{width:40, height:40, borderRadius:40}} />
            <View style={{marginLeft:12, alignSelf:'center'}}>
                <Text numberOfLines={contentSmall? 1:null} style={{fontFamily:'medium', fontSize:contentSmall?13: 16, color:'white'}}>{data.author}</Text>
                
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                      {myPostType?<AntDesign name={myPostType[1]} size={12} color="white" />:null}
                      {myPostType?<Text style={{fontFamily:'light', color:'white', marginLeft:4}}>{myPostType[0]}</Text>:null}
                  </View>
            </View>
        </View>
        {/* {contentSmall?null:<Entypo style={{alignSelf:'center'}}  name="dots-three-horizontal" size={24} color="white" />} */}
      </View>
    )

    const renderDescription = () => (
      <View style={{marginVertical:7,marginBottom:10,height:height*0.1,overflow:'hidden'}}>
        <MarkdownView>
          {data.description}
        </MarkdownView>
      </View>
    )
    const renderLink = (item , index) => {
      // console.log('Linkkk', item.meta.images[0])
      if(item?.type === 'YoutubeLink'){
        return(
          <View style={{margin:8}}>
            <View style={{flexDirection:'row'}}>
            <Image source={{uri:item.meta.favicons[2]}} style={{height:32, width:32}} />
            <Text style={{fontSize:16, fontFamily:'medium', color:'white', alignSelf:'center', marginLeft:6}}>YouTube</Text>
            </View>
            <Text numberOfLines={1} style={{fontSize:14, fontFamily:'regular', color:'white', width:200}}>{item.meta.title}</Text>
            <View>
            <Image style={{height:150, width:200}} source={{uri:item.meta.images[0]}} />
            </View>
          </View>
        )
      }
      
    }
    const linkMeta = () => (
      <View>
        <Text style={{fontFamily:'light', color:colors.primary, marginLeft:6}}>{postLink.length} links 🔗 attatched </Text>
        <FlatList 
          data={postLink} 
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_,i)=>i.toString()} 
          renderItem={({item, index})=>(renderLink(item, index))} />
      </View>
    )
    const singleCategory = (item) => {
      return(
        <View style={{margin:6, padding:6, flexDirection:'row', backgroundColor:colors.primary, borderRadius:20}}>
          {/* {postType[1].icon()} */}
          <Text style={{alignSelf:'center', marginLeft:4, color:'white',fontFamily:'light'}}>{item}</Text>
        </View>
      )
    }
    const renderCategory = () => (
      <View style={{marginBottom:8}}>
        {/* <Text style={{fontFamily:'light', color:colors.primary, marginLeft:6}}>{categoryType.length} categories selected </Text> */}
        <FlatList horizontal data={myTag} keyExtractor={(_, i)=>i.toString()}
          renderItem={({item, index})=>(singleCategory(item))} />
      </View>
    )
    const renderReaction = () => (
      <View style={{flexDirection:'row'}}>
        <View style={{flexDirection:'row', margin:6}}>
          <Text style={{fontFamily:'medium', fontSize:contentSmall?13: 16,alignSelf:'center', color:liked?colors.primary:'white'}}>{data.score}</Text>
          <Entypo onPress={()=>setLiked(!liked)} name="arrow-bold-up" size={contentSmall?17: 20} color={liked?colors.primary:"white"} />
        </View>
        {contentSmall?null:<View style={{flexDirection:'row', margin:6}}>
          
          <FontAwesome5 style={{marginLeft:4}} name="comment" size={20} color="white" />
            
        </View>}
      </View>
    )
    const renderImage = () => (
      <View style={{width:width*0.8, alignSelf:'center'}}>
        <Image resizeMode='cover' source={{uri:'https://i.pinimg.com/originals/c5/51/8c/c5518ce985fbbb402c67dd53faef7972.jpg'}} style={{width:'100%', height:height*0.2 }} />
      </View>
    )
    return(
        <TouchableWithoutFeedback  onLongPress={() => contentSmall? onHoldPost(data):null} onPressOut = {onHoldOut} onPress={() =>contentSmall? onAddToCollection(data.id):console.log('to post detail')}
        
         style={[{width:contentSmall?width*0.44: width*0.94, borderRadius:16, backgroundColor: selected?colors.primaryDark:'#192026', padding:12, alignSelf:'center', marginVertical:8 , 
                  marginHorizontal:contentSmall? width*0.017:null,borderColor:holdModal?colors.primaryLight:null,borderWidth:holdModal?1:null}]}>
            {renderUserInfo()}
            {!contentSmall? renderCategory():null}
            <Text numberOfLines={contentSmall? 1:null} style={{fontFamily:'medium', fontWeight:'bold', fontSize:contentSmall?12: 20 ,color:'white', marginVertical:12}}>{data.title}</Text>
            {!contentSmall? renderDescription():null}
            {/* {!contentSmall? index %2===0&&linkMeta():null} */}
            {/* {!contentSmall?index %2!==0&&renderImage():null} */}
            { renderReaction()}

        </TouchableWithoutFeedback>
    )
}

export default YoutubePost