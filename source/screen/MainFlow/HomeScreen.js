import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, Dimensions, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../Constants/theme";

//icons
import { Ionicons } from "@expo/vector-icons";

import { FloatingAction } from "react-native-floating-action";
import { Modalize } from "react-native-modalize";

//actions
import * as postActions from '../../../store/actions/postCreation';

//components
import CreatePost from "../../component/CreatePost";
import YoutubePost from "../../component/YoutubePost";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import HeaderComponent from "../../component/HeaderComponent";
import { ActivityIndicator } from "react-native-paper";


const{width,height} = Dimensions.get('window')

const HomeScreen = ({navigation}) => {
  const [posts,setPosts] = useState();

  const loadpost = async() => {
    const post =  await postActions.getPost()
    setPosts(post);
  }

  useEffect(()=>{
    const start = navigation.addListener('focus', () => {
      loadpost()
    });

    return start;
  },[navigation])

  const modalizeRef = useRef(null);
  const onOptions = (name) => {
    console.log(name)
    if (name === "create-post") {
      onOpen()
    }
  };

  const onSelect = (id) => {
    console.log('take me senpai to detail')
  }

  const closeModal = () => {
    modalizeRef.current?.close();
    loadpost();
  }


  const onOpen = async () => {
    modalizeRef.current?.open();
  };


  const actions = [
    {
      text: "Create",
      icon: <Ionicons name="create-outline" size={24} color="#ffffff" />,
      name: "create-post",
      position: 1,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
      {posts ? (
        <View>
          <FlatList
            data={posts}
            renderItem={({ item, index }) => (
              <YoutubePost
                contentSmall={false}
                data={item}
                index={index.toString()}
                onSelect={onSelect}
                holdModal={false}
              />
            )}
          />
        </View>
      ) : (
        <ActivityIndicator
          style={{ justifyContent: "center", alignSelf: "center",top:height*0.4 }}
          size="small"
          color={colors.primaryLight}
        />
      )}
      <FloatingAction
        actions={actions}
        onPressItem={(name) => onOptions(name)}
      />
      <Modalize
        modalStyle={{ backgroundColor: colors.modal }}
        modalHeight={height * 0.9}
        ref={modalizeRef}
        handlePosition={"inside"}
      >
        <CreatePost closeModal = {closeModal} />
      </Modalize>
    </SafeAreaView>
  );
};

export default HomeScreen;
