import React, { useCallback, useState } from "react";

import {
  AntDesign,
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
  ActivityIndicator,
  Linking,
  Alert,
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
import { Feather, Ionicons, Entypo, Foundation } from "@expo/vector-icons";

import { MarkdownView } from "react-native-markdown-view";
import { Modal } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import ImageTaker from "./ImageTaker";

//actions
import * as postCreation from "../../store/actions/postCreation";
import { useDispatch } from "react-redux";
import MarkDownStyles from "./Styles/MarkDownStyles";

const { width, height } = Dimensions.get("window");

const CreatePost = (props) => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [resourceArray, setResourceArray] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [isHelp, setIsHelp] = useState(false);

  const [titleBorder, setTitleBorder] = useState("black");
  const [desBorder, setDesBorder] = useState("black");
  const [linkeBorder, setLinkeBorder] = useState("black");

  const [linkLoader, setLinkLoader] = useState(false);
  const [postLoader, setPostLoader] = useState(false);

  const [tagArray, setTagArray] = useState("");

  const [showDropDown, setShowDropDown] = useState(false);
  const [postType, setPostType] = useState();
  const [postTypeArray, setPostTypeArray] = useState([]);

  const [image, setImage] = useState([]);

  const onImageTaken = (value, size) => {
    setImage([value, size]);
    console.log(image);
  };

  //move this function to homeScreen
  const getAllPostt = async () => {
    await dispatch(postCreation.getAllPost());
  };

  const submitForm = async () => {
    if (
      postTypeArray.length !== 0 &&
      category.trim().length > 0 &&
      title.trim().length > 0 &&
      description.trim().length > 0
    ) {
      const usertags = postTypeArray.concat(tagArray);
      const UserTags = usertags.filter((x) => x !== "");

      const post = {
        title: title,
        description: description,
        link: resourceArray,
        tags: UserTags,
        category: category,
        image: image,
      };

      console.log(post);
      try {
        setPostLoader(true);
        await dispatch(postCreation.getCategory(category));
        await dispatch(postCreation.createPost(post));
        setPostLoader(false);
        props.closeModal()
        console.log("CLOSE THE MODAL BY SENDING PROPS TO HOMESCREEN");
      } catch (err) {
        setPostLoader(false);
        console.log(err);
        setError(err.message);
        Alert.alert("Error", err.message, [{ text: "Okay" }]);
      }
      console.log(err);
    } else {
      if (title.trim().length === 0) {
        setTitleBorder("red");
      }
      if (description.trim().length === 0) {
        setDesBorder("red");
      }
      Alert.alert("", "There are fields that require your attention", [
        { text: "OK" },
      ]);
    }
  };

  const [postList, setPostList] = useState([
    {
      label: " Question",
      value: "Question",
      icon: () => <AntDesign name="question" size={20} color="white" />,
    },
    {
      label: " Diary Entry",
      value: "Diary Entry",
      icon: () => <AntDesign name="book" size={20} color="white" />,
    },
    {
      label: " Idea",
      value: "Idea",
      icon: () => <AntDesign name="bulb1" size={20} color="white" />,
    },
  ]);

  const [showCatDropDown, setShowCatDropDown] = useState(false);
  const [category, setCategory] = useState("");
  const [listOfSelection, setListOfSelection] = useState([
    {
      label: "AI & Machine Learning",
      value: "AI & Machine Learning",
      icon: () => (
        <MaterialCommunityIcons name="robot" size={24} color="#171717" />
      ),
    },
    {
      label: "Frontend",
      value: "Frontend",
      icon: () => <Entypo name="code" size={24} color="#f89820" />,
    },
    {
      label: "Backend",
      value: "Backend",
      icon: () => <AntDesign name="CodeSandbox" size={24} color="#9e79d9" />,
    },
    {
      label: "Software",
      value: "Software",
      icon: () => <FontAwesome name="gear" size={24} color="#FFE873" />,
    },
    {
      label: "Web",
      value: "Web",
      icon: () => <Foundation name="web" size={24} color="#66D3FA" />,
    },
    {
      label: "Cloud Computing",
      value: "Cloud Computing",
      icon: () => <AntDesign name="cloud" size={24} color="white" />,
    },
    {
      label: "Algorithms",
      value: "Algorithms",
      icon: () => <Entypo name="flow-branch" size={24} color="#ff8282" />,
    },
    {
      label: "Networking",
      value: "Networking",
      icon: () => <Entypo name="network" size={24} color="#b8e374" />,
    },
  ]);

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
    setResourceArray(resourceArray.filter((x) => x.id !== id));
  };

  const checkUrl = async (url) => {
    const urlIsOpen = await Linking.canOpenURL(url);
    return urlIsOpen;
  };

  const meta = async (link) => {
    setLinkLoader(true);
    if (link === "") {
      setLinkeBorder("red");
      setLinkLoader(false);
    }
    const isOpen = await checkUrl(link);
    console.log(isOpen);
    if (!isOpen) {
      setLinkeBorder("red");
      setLinkLoader(false);
    } else {
      const metaData = await LinkPreview.getPreview(link);
      console.log(metaData);

      const resourceDetails = {
        id: uuidv4(),
        title: metaData.title,
        description: metaData.description,
        image: metaData.favicons[0],
        url: metaData.url,
      };
      setResourceArray([...resourceArray, resourceDetails]);
      setLink("");
      setLinkLoader(false);
    }
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
    <SafeAreaView style={{ padding: 10 }}>
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
          <Text style={CreatePostStyles.label}>Title *</Text>
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
              {isPreview ? "Preview" : "Description *"}
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
              <MarkdownView style={{ text: "blue" }}>
                {description}
              </MarkdownView>
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
          maxNumberOfTags={9}
          onChangeTags={(tags) => {
            setTagArray(tags);
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
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 100,
                  backgroundColor: "#7f7f7f",
                  marginLeft: 3,
                }}
              ></View>
              <Text
                style={{ fontSize: 15, color: "#000000", paddingHorizontal: 3 }}
              >
                {tag}
              </Text>
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
            style={{ justifyContent: "center", alignSelf: "flex-end" }}
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
      <View style={CreatePostStyles.DropDownContainer}>
        <DropDownPicker
          style={{
            backgroundColor: colors.secondaryLight,
          }}
          labelStyle={{
            fontWeight: "bold",
          }}
          textStyle={{
            fontSize: 15,
          }}
          placeholder="Post Type *"
          placeholderStyle={{
            fontWeight: "bold",
          }}
          maxHeight={600}
          open={showDropDown}
          value={postType}
          setValue={setPostType}
          items={postList}
          setOpen={setShowDropDown}
          setItems={setPostList}
          onChangeValue={(postTag) => {
            setPostTypeArray([postTag]);
          }}
          dropDownContainerStyle={{
            backgroundColor: "#5e6870",
          }}
          theme={"DARK"}
          listItemLabelStyle={{
            color: "#ffffff",
          }}
        />
      </View>
      {/* <View style={CreatePostStyles.DropDownContainer}>
        <DropDownPicker
          mode="BADGE"
          style={{
            backgroundColor: colors.secondaryLight,
          }}
          labelStyle={{
            fontWeight: "bold",
          }}
          textStyle={{
            fontSize: 15,
          }}
          placeholder="Category"
          placeholderStyle={{
            fontWeight: "bold",
          }}
          multiple={true}
          maxHeight={600}
          open={showCatDropDown}
          setOpen={setShowCatDropDown}
          value={category}
          setValue={setCategory}
          items={listOfSelection}
          setItems={setListOfSelection}
          dropDownContainerStyle={{
            backgroundColor: "#5e6870",
          }}
          theme={"DARK"}
          listItemLabelStyle={{
            color: "#ffffff",
          }}
        />
      </View> */}
      <View style={CreatePostStyles.DropDownContainer}>
        <DropDownPicker
          style={{
            backgroundColor: colors.secondaryLight,
          }}
          labelStyle={{
            fontWeight: "bold",
          }}
          textStyle={{
            fontSize: 15,
          }}
          placeholder="Category *"
          placeholderStyle={{
            fontWeight: "bold",
          }}
          maxHeight={600}
          open={showCatDropDown}
          value={category}
          setValue={setCategory}
          items={listOfSelection}
          setOpen={setShowCatDropDown}
          setItems={setListOfSelection}
          dropDownContainerStyle={{
            backgroundColor: "#5e6870",
          }}
          theme={"DARK"}
          listItemLabelStyle={{
            color: "#ffffff",
          }}
        />
      </View>
      <ImageTaker onImageTaken={onImageTaken} />
      <TouchableOpacity
        style={{
          ...CreatePostStyles.addLink,
          padding: 10,
          width: width * 0.3,
          alignSelf: "center",
          marginVertical: 10,
          elevation: 10,
          backgroundColor: colors.modal,
          borderColor: colors.primaryLight,
          borderWidth: 1,
        }}
        onPress={submitForm}
        disabled = {postLoader}
      >
        {postLoader ? (
          <ActivityIndicator size="small" color={colors.primaryLight} />
        ) : (
          <Text style={{ color: colors.primaryLight, fontWeight: "bold" }}>
            Create Post
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreatePost;
