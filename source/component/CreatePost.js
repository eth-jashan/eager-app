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
import { Feather, Ionicons, Entypo } from "@expo/vector-icons";

import { MarkdownView } from "react-native-markdown-view";
import { Modal } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [link, setLink] = useState("");
  const [resourceArray, setResourceArray] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [isHelp, setIsHelp] = useState(false);

  const [titleBorder, setTitleBorder] = useState("black");
  const [desBorder, setDesBorder] = useState("black");
  const [linkeBorder, setLinkeBorder] = useState("black");
  const [tagBorder, setTagBorder] = useState("black");

  const [linkLoader, setLinkLoader] = useState(false);

  const [tagArray, setTagArray] = useState([]);

  const markdownHelp = [
    { element: "Heading", syntax: "# H1\n## H2\n### H3" },
    { element: "Code Block", syntax: "``` \n code \n\n ```" },
    { element: "Inline Code", syntax: "`code`" },
    {
      element: "Ordered List",
      syntax: "1. First item\n2. Second item\n3. Third item",
    },
    {
      element: "Unordered List",
      syntax: "- First item\n- Second item\n- Third item",
    },
    { element: "Horizontal Rule", syntax: "---" },
    { element: "Bold", syntax: "**bold text**" },
    { element: "Italics", syntax: "*italic text*" },
  ];

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
  };

  const meta = async (link) => {
    setLinkLoader(true);
    const metaData = await LinkPreview.getPreview(link);
    console.log(metaData);

    //   console.log(metaData);
    const resourceDetails = {
      id: uuidv4(),
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

  const renderItem = (item, index) => (
    <ResourceLink key={index} onPress={(id) => removeItem(id)} data={item} />
  );

  const renderHelp = (item, index) => (
    <View key={index} style={CreatePostStyles.helpScrollView}>
      <View style={CreatePostStyles.blockElement}>
        <Text style={CreatePostStyles.helpElementText}>{item.element}</Text>
      </View>
      <View style={CreatePostStyles.blockElement}>
        <Text style={CreatePostStyles.helpSyntaxText}>{item.syntax}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.tertiaryLight,
            borderRadius: 6,
            alignItems: "center",
            alignSelf: "flex-end",
            marginHorizontal: 10,
          }}
          onPress={() => {
            setIsHelp((prev) => !prev);
          }}
        >
          <Ionicons name="help" size={18} color="#000000" />
        </TouchableOpacity>
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
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text style={CreatePostStyles.label}>
              {isPreview ? "Preview" : "Description"}
            </Text>

            <TouchableOpacity
              style={{ ...CreatePostStyles.addLink, padding: 5 }}
              onPress={() => {
                setIsPreview((prev) => !prev);
              }}
            >
              {isPreview ? (
                <Feather name="eye" size={18} color="#ffffff" />
              ) : (
                <Feather name="eye-off" size={18} color="#ffffff" />
              )}
            </TouchableOpacity>
          </View>
          {!isPreview ? (
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
          ) : (
            <View
              style={{
                ...CreatePostStyles.preview,
                borderWidth: 1,
                borderColor: desBorder,
              }}
            >
              <MarkdownView>{description}</MarkdownView>
            </View>
          )}
        </View>
        <View>
          <Text style={CreatePostStyles.label}>Link</Text>

          <View>
            {resourceArray.map((item, index) => renderItem(item, index))}
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
      <Modal visible={isHelp} style={CreatePostStyles.helpContainer}>
        <View style={CreatePostStyles.helpSubContainer}>
          <Entypo
            onPress={() => {
              setIsHelp((help) => !help);
            }}
            style={{ justifyContent: "center", alignSelf: "flex-end"}}
            name="cross"
            size={22}
            color="white"
          />
          <Text style={CreatePostStyles.heading}>MarkDown Guide</Text>

          <View style={CreatePostStyles.headingUnderline}></View>
          <ScrollView style={{ height: height * 0.6, marginTop: 7 }}>
            <View style={CreatePostStyles.helpScrollView}>
              <View style={CreatePostStyles.helpHeadingBlock}>
                <Text style={CreatePostStyles.helpHeading}>Element</Text>
              </View>
              <View style={CreatePostStyles.helpHeadingBlock}>
                <Text style={CreatePostStyles.helpHeading}>Syntax</Text>
              </View>
            </View>
            {markdownHelp.map((item, index) => renderHelp(item, index))}
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CreatePost;
