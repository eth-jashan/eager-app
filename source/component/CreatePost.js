import React, { useState } from "react";
import { View, Text, Dimensions,TextInput,TouchableOpacity,Button } from "react-native";
import { colors } from "../Constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import CreatePostStyles from "./Styles/CreatePostStyles";
import Tags from "react-native-tags";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import ResourceLink from "./ResourceLink";


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

    const[tagArray,setTagArray] = useState([]);

        const randomColor = () => {
        var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        if(randomColor === '#000000'){
            randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        }
        return randomColor
    }


  return (
    <SafeAreaView>
      <View style={{ alignItems: "center" }}>
        <Text style={CreatePostStyles.heading}>New Post</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View>
          <Text style={CreatePostStyles.label}>Title</Text>
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
            }}
          />
        </View>
        <View>
          <Text style={CreatePostStyles.label}>Description</Text>
          <TextInput
            onFocus={() => setDesBorder(colors.tertiary)}
            onBlur={() => {
              setDesBorder("black");
            }}
            value={description}
            keyboardType="default"
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={10}
            style={{
              ...CreatePostStyles.descriptionTextInput,
              borderWidth: 1,
              borderColor: desBorder,
            }}
          />
        </View>
        <View>
          <Text style={CreatePostStyles.label}>Link</Text>
          <ResourceLink />
          <TextInput
            onFocus={() => setLinkeBorder(colors.tertiaryDark)}
            onBlur={() => {
              setLinkeBorder("black");
            }}
            value={link}
            keyboardType="default"
            onChangeText={setLink}
            style={{
              ...CreatePostStyles.textInput,
              borderWidth: 1,
              borderColor: linkeBorder,
            }}
          />

          <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
            <TouchableOpacity style={CreatePostStyles.addLink}>
              <Text style={{ color: colors.tertiaryLight }}>Add Link</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: width * 0.89 }}>
          <Text style={CreatePostStyles.label}>Tags</Text>
        </View>

        <Tags
          maxNumberOfTags={10}
          onChangeTags={(tags) => {
            setTagArray([...tagArray, tags]);
          }}
          onTagPress={(index, tagLabel, event, deleted) => console.log(index)}
          containerStyle={{
            justifyContent: "center",
            width: width * 0.9,
          }}
          inputStyle={CreatePostStyles.tagInput}
          renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
            <TouchableOpacity
              style={CreatePostStyles.tag}
              key={`${tag}-${index}`}
              onPress={onPress}
            >
              <Text style={{ fontSize: 15, color: "#FFF" }}>{tag}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreatePost;
