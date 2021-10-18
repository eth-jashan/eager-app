import React, { useRef } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Collection from "../../component/Collection";
import HeaderComponent from "../../component/HeaderComponent";
import { colors } from "../../Constants/theme";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import CreateCollection from "../../component/CreateCollection";

const { width, height } = Dimensions.get("window");

const CollectionScreen = () => {
  const modalizeRef = useRef(null);

  const saved_post = [
    {
      title: "Javascript",
      description: "Check all these books",
      link: "https://images.ctfassets.net/yr4qj72ki4ky/legacyBlogPost77Thumbnail/cd4783ad7b35efc4367166a570a9952e/bigstock-Real-Java-Script-Code-Developi-217215433.jpg?q=72",
    },
    {
      title: "Python",
      description: "Steps for initialization should be taken from here",
      link: "https://www.macmillandictionary.com/external/slideshow/full/White_full.png",
    },
    {
      title: "Linux",
      description:
        "Consist of steps to install linux and its configayushpiyushjoshibu",
      link: "data:image/jpeg;base64,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",
    },
    {
      title: "Javascript",
      description: "Check all these books",
      link: "https://images.ctfassets.net/yr4qj72ki4ky/legacyBlogPost77Thumbnail/cd4783ad7b35efc4367166a570a9952e/bigstock-Real-Java-Script-Code-Developi-217215433.jpg?q=72",
    },
    {
      title: "Javascript",
      description: "Check all these books",
      link: "https://images.ctfassets.net/yr4qj72ki4ky/legacyBlogPost77Thumbnail/cd4783ad7b35efc4367166a570a9952e/bigstock-Real-Java-Script-Code-Developi-217215433.jpg?q=72",
    },
  ];

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

      <FlatList
        style={{
          alignSelf: "center",
          flex: 1,
          height:
            saved_post.length <= 8 ? height : height * saved_post.length * 0.09,
        }}
        data={saved_post}
        numColumns={2}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return (
            <Collection
              title={item.title}
              description={item.description}
              link={item.link}
            />
          );
        }}
      />

      <Modalize
        modalStyle={{ backgroundColor: colors.modal }}
        modalHeight={height * 0.9}
        ref={modalizeRef}
        handlePosition={"inside"}
      >
        <CreateCollection onClose={onClose} />
      </Modalize>
    </ScrollView>
  );
};

export default CollectionScreen;
