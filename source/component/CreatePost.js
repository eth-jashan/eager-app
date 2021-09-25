import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { colors } from "../Constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import CreatePostStyles from "./Styles/CreatePostStyles";
import Tags from "react-native-tags";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import ResourceLink from "./ResourceLink";
import LinkPreview from "react-native-link-preview";

const { width, height } = Dimensions.get("window");

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [link, setLink] = useState("");
  const [resourceArray, setResourceArray] = useState([]);

  const [titleBorder, setTitleBorder] = useState("black");
  const [desBorder, setDesBorder] = useState("black");
  const [linkeBorder, setLinkeBorder] = useState("black");
  const [tagBorder, setTagBorder] = useState("black");

  const [linkLoader, setLinkLoader] = useState(false);

  const [tagArray, setTagArray] = useState([]);

  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  const removeItem = (id) => {
   // console.log(id)
   // console.log(resourceArray)
    // resourceArray.forEach(x => console.log(x.title))
    setResourceArray(resourceArray.filter((x) => x.id !== id)); 
  }

  const meta = async (link) => {
    setLinkLoader(true);
    const metaData = await LinkPreview.getPreview(link);

 //   console.log(metaData);
    const resourceDetails = {
      id:uuidv4(),
      title: metaData.title,
      description: metaData.description,
      image: metaData.favicons[0],
      url: metaData.url,
    };
    setResourceArray([...resourceArray, resourceDetails]);
  //  console.log(resourceArray);
    setLink("");
    setLinkLoader(false);
  };

  const renderItem = (item,index) => <ResourceLink key={index} onPress = {(id)=>removeItem(id)} data={item} />;

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

          <View>
            {resourceArray.map((item,index) => renderItem(item,index))}
            {/* <FlatList
            scrollEnabled={true}
              style={{ flex: 1 }}
              horizontal={false}
              data={resourceArray}
              renderItem={renderItem}
            /> */}
          </View>

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
            <TouchableOpacity
              style={CreatePostStyles.addLink}
              onPress={() => {
                meta(link);
              }}
            >
              {linkLoader ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={{ color: colors.tertiaryLight }}>Add Link</Text>
              )}
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
