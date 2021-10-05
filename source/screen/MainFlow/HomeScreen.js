import React, { useRef } from "react";
import { View, Text, Dimensions, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../Constants/theme";

//icons
import { Ionicons } from "@expo/vector-icons";

import { FloatingAction } from "react-native-floating-action";
import { Modalize } from "react-native-modalize";

//components
import CreatePost from "../../component/CreatePost";
import YoutubePost from "../../component/YoutubePost";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import HeaderComponent from "../../component/HeaderComponent";

const{width,height} = Dimensions.get('window')

const HomeScreen = () => {
  const modalizeRef = useRef(null);
  const onOptions = (name) => {
    console.log(name)
    if (name === "create-post") {
      onOpen()
    }
  };

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
    <View>
      <FlatList data={['1', '2', '3']} renderItem={({item, index})=>(<YoutubePost index={index}/>)} />
    </View>
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
        <CreatePost />
      </Modalize>
    
    </SafeAreaView>
  );
};

export default HomeScreen;
