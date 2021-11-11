import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { colors } from "../Constants/theme";
const { width, height } = Dimensions.get("window");

const ImageTaker = (props) => {
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [imageDimensions,setImageDimensions] = useState();

  const checkFileSize = async (fileURI) => {
    const fileSizeInBytes = await FileSystem.getInfoAsync(fileURI);
    return fileSizeInBytes;
  };

  const fileHandler = async () => {
    const permission = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (!permission) {
      return;
    }
    const imgFile = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [3, 2]
    });
    console.log(imgFile)
    
    const fileSize = await checkFileSize(imgFile.uri);
    console.log("file size : ", fileSize.size);
    if (fileSize.size <= 3000000) {
      setError('');
      setImage(imgFile.uri);
      setImageDimensions(imgFile.height)
      props.onImageTaken(imgFile,fileSize.size);
    } else {
      setError("Image Size should be equal or less than 3MB");
      props.onImageTaken('',fileSize.size);
    }
    
  };

  //FUTURE REFERENCE
  //   const cameraHandler = async () => {
  //     const permission = await ImagePicker.getCameraPermissionsAsync();
  //     if (!permission) {
  //       return;
  //     }
  //     const imgFile = await ImagePicker.launchCameraAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [2, 2],
  //       quality: 1,
  //     });
  //     setImage(imgFile.uri);
  //     props.onImageTaken(imgFile.uri);
  //   };

  //works only in bareflow
  // const allFilesHandler = async () => {
  //   try {
  //     const allFile = await await DocumentPicker.pickMultiple({
  //       type: [DocumentPicker.types.images],
  //     });
  //     const tempArray = [];
  //     for (let i = 0; i < allFile.length; i++) {
  //       const getAllData = {
  //         uri: `${allFile[i].uri}`,
  //         type: `${allFile[i].type}`,
  //         name: `${allFile[i].name}`,
  //         size: `${allFile[i].size}`,
  //       };
  //       tempArray.push(getAllData);
  //     }
  //     props.onImageTaken(tempArray);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       return;
  //     } else {
  //       throw err;
  //     }
  //   }
  // };

  //works only in bareflow
  // const specificFileHandler = async () => {
  //   try {
  //     const allFile = await await DocumentPicker.pick({
  //       type: [DocumentPicker.types.images],
  //     });
  //       const getAllData = {
  //         uri: `${allFile.uri}`,
  //         type: `${allFile.type}`,
  //         name: `${allFile.name}`,
  //         size: `${allFile.size}`,
  //       };

  //     props.onImageTaken(getAllData);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       return 200;
  //     } else {
  //       throw err;
  //     }
  //   }
  // };

  // const pickImage = async() => {
  //     setError("");
  //     let result = await DocumentPicker.getDocumentAsync({ type: "image/*",multiple:false });

  //      props.onImageTaken(result);
  //      if (result.type === "success") {
  //          if (result.size <= 3000000) {
  //              setImage(result.uri);
  //             }else{
  //                 setError('Image Size should be equal or less than 3MB')
  //             }
  //      }

  // }

  return (
    <View>
      <TouchableOpacity
        onPress={fileHandler}
        style={{
          borderColor: error.trim().length === 0 ? colors.octaSecondry : "red",
          borderWidth: 1,
          padding: 8,
          borderRadius: 8,
          width: Dimensions.get("window").width * 0.9,
          alignSelf: "center",
          marginVertical: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {error.trim().length === 0 ? (
          image.trim().length > 0 ? (
            <Image
              style={{ height: height*0.2, width: width*0.85, alignSelf: "center",borderRadius:6 }}
              resizeMode={"cover"}
              source={{
                uri: image,
              }}
            />
          ) : (
            <Entypo
              name="images"
              size={20}
              color={colors.octaSecondry}
              style={{ marginHorizontal: 4 }}
            />
          )
        ) : (
          <MaterialIcons
            name="error-outline"
            size={24}
            color="red"
            style={{ marginHorizontal: 4 }}
          />
        )}
        {image.trim().length === 0 ? (
          <Text
            style={{
              fontSize: error.trim().length === 0 ? 18 : 14,
              alignSelf: "center",
              color: error.trim().length === 0 ? colors.octaSecondry : "red",
            }}
          >
            {error.trim().length === 0
              ? "Upload Image"
              : "Image Size should be equal or less than 3MB"}
          </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default ImageTaker;
