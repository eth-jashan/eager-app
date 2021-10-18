import React, { useState } from "react";
import { View, Text, TextInput, Dimensions, Button, ActivityIndicator, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../Constants/theme";
import CreatePostStyles from "./Styles/CreatePostStyles";
import YoutubePost from "./YoutubePost";

const { width, height } = Dimensions.get("window");

const CreateCollection = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleBorder, setTitleBorder] = useState("black");
  const [desBorder, setDesBorder] = useState("black");
  const [selectedPost,setSelectedPost] = useState([])
  const[postLoader,setPostLoader] = useState(false);

  const closeModal = () => {
    props.onClose()
    console.log(selectedPost);
  }

  const onSelect = (id) => {
    if( selectedPost.some((x) => x === id)){
      console.log('already in');
      const array = selectedPost.filter((x) => x !== id);
      setSelectedPost(array)

      console.log('--->',selectedPost);
    }else{
      setSelectedPost([...selectedPost,id]);
      console.log('--->',selectedPost)
    }
    
  }

  return (
    <View style={{ padding: 10 }}>
      <Text
        style={{
          ...CreatePostStyles.heading,
          alignSelf: "center",
          paddingTop: 10,
          fontSize: 18,
        }}
      >
        New Collection
      </Text>
      <View>
        <Text style={{ ...CreatePostStyles.label, paddingLeft: 8 }}>
          Title *
        </Text>
        <TextInput
          onFocus={() => setTitleBorder(colors.tertiary)}
          onBlur={() => {
            setTitleBorder("black");
          }}
          value={title}
          keyboardType="default"
          onChangeText={setTitle}
          style={{
            ...CreatePostStyles.textInput,
            borderWidth: 1,
            borderColor: titleBorder,
            alignSelf: "center",
          }}
        />
      </View>
      <View>
        <Text style={{ ...CreatePostStyles.label, paddingLeft: 8 }}>
          Description *
        </Text>
        <TextInput
          onFocus={() => setDesBorder(colors.tertiary)}
          onBlur={() => {
            setDesBorder("black");
          }}
          maxLength={66}
          value={description}
          keyboardType="default"
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={10}
          style={{
            ...CreatePostStyles.descriptionTextInput,
            borderWidth: 1,
            borderColor: desBorder,
            alignSelf: "center",
            height: height * 0.1,
          }}
        />
      </View>
      <View>
        <Text
          style={{
            ...CreatePostStyles.heading,
            alignSelf: "center",
            paddingTop: 10,
            fontSize: 18,
          }}
        >
          Choose the posts
        </Text>
        <View
          style={{ height: 0.5, backgroundColor: "#cccccc", margin: 3 }}
        ></View>
        <FlatList
          numColumns={2}
          data={["1", "2", "3"]}
          renderItem={({ item, index }) => (
            <YoutubePost
              contentSmall={true}
              data={item}
              index={index}
              onSelect={onSelect}
            />
          )}
        />
        <TouchableOpacity
          style={{
            ...CreatePostStyles.addLink,
            padding: 10,
            width: width * 0.4,
            alignSelf: "center",
            marginVertical: 10,
            elevation: 10,
            backgroundColor: colors.modal,
            borderColor: colors.primaryLight,
            borderWidth: 1,
          }}
          onPress={closeModal}
        >
          {postLoader ? (
            <ActivityIndicator size="small" color={colors.primaryLight} />
          ) : (
            <Text style={{ color: colors.primaryLight, fontWeight: "bold" }}>
              Create Collection
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateCollection;
