import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Collection from "../../component/Collection";
import HeaderComponent from "../../component/HeaderComponent";
import { colors } from "../../Constants/theme";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import CreateCollection from "../../component/CreateCollection";

//actions
import { getProfile } from "../../../store/actions/postCreation";
import { getCollections } from "../../../store/actions/postCreation";

const { width, height } = Dimensions.get("window");

const CollectionScreen = ({navigation}) => {
  const [savedPost,setSavedPost] = useState();
  const [collections,setCollections] = useState();
  const modalizeRef = useRef(null);

    const loadProfile = async () => {
      const profileData = await getProfile();
      const collectionsData = await getCollections();
      console.log(collectionsData)
      setSavedPost(profileData.saved_posts);
      setCollections(collectionsData);
    };

    useEffect(() => {
      const start = navigation.addListener("focus", () => {
        loadProfile();
      });

      return start;
    }, [navigation]);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
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
          <AntDesign
            style={{ alignSelf: "center" }}
            name="plus"
            size={24}
            color={"#ffffff"}
            onPress={onOpen}
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

      {collections?<FlatList
        style={{
          alignSelf: "center",
          flex: 1,
          height:
            collections.length <= 8 ? height : height * collections.length * 0.09,
        }}
        data={collections}
        numColumns={2}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return (
            <Collection
              title={item.title}
              description={item.description}
              link={item.posts[0].image}
            />
          );
        }}
      />:null}

      <Modalize
        modalStyle={{ backgroundColor: colors.modal }}
        modalHeight={height * 0.9}
        ref={modalizeRef}
        handlePosition={"inside"}
      >
        <CreateCollection saved_posts={savedPost} onClose={onClose} />
      </Modalize>
    </ScrollView>
  );
};

export default CollectionScreen;
