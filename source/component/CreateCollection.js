import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../Constants/theme";
import CreatePostStyles from "./Styles/CreatePostStyles";
import YoutubePost from "./YoutubePost";
import { Modal } from "react-native-paper";

//actions
import { createCollection } from "../../store/actions/postCreation";
import { getCollections } from "../../store/actions/postCreation";


const { width, height } = Dimensions.get("window");


const CreateCollection = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleBorder, setTitleBorder] = useState("black");
  const [desBorder, setDesBorder] = useState("black");
  const [selectedPost, setSelectedPost] = useState([]);
  const [postLoader, setPostLoader] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [previewData,setPreviewData] = useState();

  const closeModal = () => {
    props.onClose();
    console.log(selectedPost);
  };

  const onHold = (data) => {
    setIsPreview(true)
    console.log('aaye',data)
    setPreviewData(data)
  }
  const onHoldOut = () => {
    setIsPreview(false);
  }

  const createCollections = async () => {
    if (
      title.trim().length > 0 &&
      description.trim().length > 0 &&
      selectedPost.length !== 0
    ) {
      const response = await createCollection(title, description, selectedPost);
      await getCollections();
      console.log(response);
      closeModal();
    } else {
      if (title.trim().length === 0) {
        setTitleBorder("red");
      }
      if (description.trim().length === 0) {
        setDesBorder("red");
      } else {
        Alert.alert("", "Please select the posts for this collection", [
          { text: "OK" },
        ]);
      }
    }
  };

  const onSelect = (id) => {
    if (selectedPost.some((x) => x === id)) {
      console.log("already in");
      const array = selectedPost.filter((x) => x !== id);
      setSelectedPost(array);

      console.log("--->", selectedPost);
    } else {
      setSelectedPost([...selectedPost, id]);
      console.log("--->", selectedPost);
    }
  };

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
          data={props.saved_posts}
          renderItem={({ item, index }) => (
            <YoutubePost
              contentSmall={true}
              data={item}
              index={index}
              onSelect={onSelect}
              onHold={onHold}
              onHoldOut={onHoldOut}
              holdModal={false}
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
          onPress={createCollections}
          disabled={postLoader}
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
      <Modal visible={isPreview}>
        {previewData ? (
          <YoutubePost
            holdModal={true}
            contentSmall={false}
            data={previewData}
          />
        ) : null}
      </Modal>
    </View>
  );
};

export default CreateCollection;
