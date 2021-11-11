import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Collection from "../../component/Collection";
import HeaderComponent from "../../component/HeaderComponent";
import { colors } from "../../Constants/theme";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import CreateCollection from "../../component/CreateCollection";

//actions
import { getProfile } from "../../../store/actions/postCreation";
import { getCollections } from "../../../store/actions/postCreation";
import { loadStaticImages } from "../../../store/actions/postCreation";
import { detailedCollection } from "../../../store/actions/postCreation"; 

import { ActivityIndicator } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const CollectionScreen = ({navigation}) => {
  const[type,setType] = useState('');
  const [savedPost,setSavedPost] = useState();
  const [collections,setCollections] = useState();
  const modalizeRef = useRef(null);
  const [Images, setImages] = useState();
  const[loader,setLoader] = useState(false)
  const[viewLoader,setViewLoader] = useState(false);

  const[viewTitle,setViewTitle] = useState()
  const[viewDis,setviewDis] = useState()
  const[viewPost,setViewPost] = useState();

    const loadImages = async () => {
      console.log("yooo");
      setLoader(true);
      const response = await loadStaticImages();
      setImages(response);
      console.log(response);
    };

    const getDetailedCollection = async(id) => {
      const response = await detailedCollection(id);
      console.log(response);
      setViewPost(response)
    }

    const loadProfile = async () => {
      const profileData = await getProfile();
      const collectionsData = await getCollections();
      setSavedPost(profileData.saved_posts);
      setCollections(collectionsData);
      setLoader(false);
    };

    useEffect(() => {
      const start = navigation.addListener("focus", () => {
        
        loadProfile();
        loadImages();
        
      });

      return start;
    }, [navigation]);

  const onOpen = async(type,item,itemId) => {
    setViewLoader(true);
    if(type === 'view'){
      setviewDis(item.description)
      setViewTitle(item.title)
      await getDetailedCollection(itemId);
      setType(type);
    }
    else{
            setViewPost(null);
            setviewDis(null);
            setViewTitle(null);
            setType(type);
    }
    modalizeRef.current?.open();
    setViewLoader(false);
    
  };

  const onClose = () => {
            loadProfile();
            loadImages();
    modalizeRef.current?.close();
  };

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      style={{
        flex: 1,
        backgroundColor: colors.secondary,
      }}
    >
      <HeaderComponent
        rightIcon={() => (
          viewLoader? <ActivityIndicator
        style={{ justifyContent: "center", alignSelf: "center"}}
        size="small"
        color={colors.primaryLight}
      />: <AntDesign
            style={{ alignSelf: "center" }}
            name="plus"
            size={24}
            color={"#ffffff"}
            onPress={() => onOpen('new',null,null)}
          />
        )}
        headerStyles={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: height * 0.12,
          paddingHorizontal: width * 0.1,
          backgroundColor: colors.secondaryLight,
          elevation: 10,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 75,
          paddingTop: 20,
        }}
        title="My Collections"
        titleStyle={{
          color: "#ffffff",
          fontFamily: "regular",
          justifyContent: "center",
          alignSelf: "center",
          fontSize: 24,
        }}
      />
      {loader?<ActivityIndicator
        style={{ justifyContent: "center", alignSelf: "center",top:height*0.4 }}
        size="small"
        color={colors.primaryLight}
      />:null}

      {collections ?(
        <FlatList
          style={{
            alignSelf: "center",
            flex: 1,
            height:
              collections.length <= 8
                ? height
                : height * collections.length * 0.09,
          }}
          data={collections}
          numColumns={2}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() =>onOpen('view',item,item.id)}>
                <Collection
                  title={item.title}
                  description={item.description}
                  link={item.posts[0].image}
                  images={Images}
                />
              </TouchableOpacity>
            );
          }}
        />
      ):null}

      <Modalize
        modalStyle={{ backgroundColor: colors.modal }}
        modalHeight={height * 0.9}
        ref={modalizeRef}
        handlePosition={"inside"}
      >
        <CreateCollection type = {type} viewTitle = {viewTitle} viewDis = {viewDis} viewPost = {viewPost} 
                          saved_posts={savedPost} onClose={onClose} />
      </Modalize>
    </ScrollView>
  );
};

export default CollectionScreen;
