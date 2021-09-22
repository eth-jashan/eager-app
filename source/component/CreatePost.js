import React, { useState } from "react";
import { View, Text, Dimensions,TextInput } from "react-native";
import { colors } from "../Constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import CreatePostStyles from "./Styles/CreatePostStyles";


const { width, height } = Dimensions.get("window");

const CreatePost = () => {

    const[title,setTitle] = useState('');
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [link, setLink] = useState("");

    const[titleBorder,setTitleBorder] = useState('black')
    const [desBorder, setDesBorder] = useState("black");
    const [linkeBorder, setLinkeBorder] = useState("black");
    const [tagBorder, setTagBorder] = useState("black");


  return (
    <SafeAreaView style={{height:height}}>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "medium",
            marginVertical: 10,
          }}
        >
          New Post
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput
          onFocus={() => setTitleBorder(colors.primary)}
          onBlur={() => {
            setTitleBorder("black");
          }}
          value={title}
          keyboardType="default"
          onChangeText={setTitle}
          placeholder="Title"
          placeholderTextColor="#FFF"
          style={{
            ...CreatePostStyles.textInput,
            borderWidth: 1,
            borderColor: titleBorder,
          }}
        />
        <TextInput
          onFocus={() => setDesBorder(colors.primary)}
          onBlur={() => {
            setDesBorder("black");
          }}
          value={description}
          keyboardType="default"
          onChangeText={setDescription}
          placeholder="Description"
          placeholderTextColor="#FFF"
          multiline={true}
          numberOfLines={10}
          style={{
            ...CreatePostStyles.descriptionTextInput,
            borderWidth: 1,
            borderColor: desBorder,
          }}
        />
        <TextInput
          onFocus={() => setLinkeBorder(colors.primary)}
          onBlur={() => {
            setLinkeBorder("black");
          }}
          value={link}
          keyboardType="default"
          onChangeText={setLink}
          placeholder="Link"
          placeholderTextColor="#FFF"
          style={{
            ...CreatePostStyles.textInput,
            borderWidth: 1,
            borderColor: linkeBorder,
          }}
        />
        <TextInput
          onFocus={() => setTagBorder(colors.primary)}
          onBlur={() => {
            setTagBorder("black");
          }}
          value={tags}
          keyboardType="default"
          onChangeText={setTags}
          placeholder="Tags"
          placeholderTextColor="#FFF"
          style={{
            ...CreatePostStyles.textInput,
            borderWidth: 1,
            borderColor: tagBorder,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreatePost;
