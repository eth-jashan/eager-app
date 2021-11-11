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
import { MaterialIcons } from "@expo/vector-icons";

//actions
import { createCollection } from "../../store/actions/postCreation";
import { getCollections } from "../../store/actions/postCreation";
import { deleteCollection } from "../../store/actions/postCreation";


const { width, height } = Dimensions.get("window");


const CreateCollection = (props) => {
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleBorder, setTitleBorder] = useState("black");
  const [desBorder, setDesBorder] = useState("black");
  const [selectedPost, setSelectedPost] = useState([]);
  const [postLoader, setPostLoader] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [previewData,setPreviewData] = useState();
  const [deleteLoader, setDeleteLoader] = useState(false);

  const closeModal = () => {
    props.onClose();
    console.log(selectedPost);
  };

  const onDelete = async(id) => {
    setDeleteLoader(true)
    console.log('delete',id)
    await deleteCollection(id)
    setDeleteLoader(false)
    closeModal();
  }

  const onHold = (data) => {
    setIsPreview(true)
    console.log('aaye',data)
    setPreviewData(data)
  }
  const onHoldOut = () => {
    setIsPreview(false);
  }

  const createCollections = async () => {
    setPostLoader(true)
    try{    if (
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
    }}catch(err){
      setError(err.message)
              Alert.alert(
                "Error",
                err.message,
                [{ text: "Okay" }]
              );
    }
    setPostLoader(false);
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
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <Text
          style={{
            ...CreatePostStyles.heading,
            alignSelf: "center",
            paddingTop: 10,
            fontSize: 18,
            width:props.viewTitle? 300 : null
          }}
        >
          {props.viewTitle ? props.viewTitle : "New Collection"}
        </Text>
        {props.type === 'view' ? deleteLoader? <ActivityIndicator
        style={{alignSelf: "center",marginLeft:width*0.062}}
        size='small'
        color={'#e04c4c'}
      />:<MaterialIcons style={{alignSelf:'center',marginLeft:width*0.05,elevation:5}} 
          name="delete" size={24} color='#e04c4c' onPress={() => onDelete(props.viewPost.id)}/>:null}

      </View>

      {!props.viewTitle ? (
        <View>
          <Text style={{ ...CreatePostStyles.label, paddingLeft: 8 }}>
            Title *
          </Text>
          <TextInput
            onFocus={() => setTitleBorder(colors.tertiary)}
            onBlur={() => {
              setTitleBorder("black");
            }}
            value={props.viewTitle ? props.viewTitle : title}
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
      ) : null}
      <View>
        <Text
          style={{
            ...CreatePostStyles.label,
            paddingLeft: 8,
            fontWeight: props.viewDis ? "normal" : null,
          }}
        >
          {props.viewDis ? props.viewDis : "Description *"}
        </Text>
        {!props.viewTitle ? (
          <TextInput
            onFocus={() => setDesBorder(colors.tertiary)}
            onBlur={() => {
              setDesBorder("black");
            }}
            maxLength={66}
            value={props.viewDis ? props.viewDis : description}
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
        ) : null}
      </View>
      <View>
        {props.viewTitle ? null : (
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
        )}
        <View
          style={{ height: 0.5, backgroundColor: "#cccccc", margin: 3 , marginVertical:props.viewTitle?10:null}}
        ></View>
        <FlatList
          numColumns={props.viewTitle?1: 2}
          data={props.viewTitle?props.viewPost.posts: props.saved_posts}
          renderItem={({ item, index }) => (
            <YoutubePost
              contentSmall={props.viewTitle?false: true}
              data={item}
              index={index}
              onSelect={onSelect}
              onHold={onHold}
              onHoldOut={onHoldOut}
              holdModal={false}
              images = {props.images}
            />
          )}
        />
        {!props.viewTitle?<TouchableOpacity
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
              {"Create Collection"}
            </Text>
          )}
        </TouchableOpacity>:null}
      </View>
      <Modal visible={isPreview}>
        {previewData ? (
          <YoutubePost
            holdModal={true}
            contentSmall={false}
            data={previewData}
            images = {props.images}
          />
        ) : null}
      </Modal>
    </View>
  );
};

export default CreateCollection;
