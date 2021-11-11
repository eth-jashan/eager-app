import React, { useState, useEffect } from "react";
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
import * as FileSystem from "expo-file-system";
import { colors } from "../Constants/theme";
import { useRoute } from "@react-navigation/core";
const { width, height } = Dimensions.get("window");

const ImageTaker = (props) => {
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [imageDimensions,setImageDimensions] = useState();
  const [isProfileImage, setIsProfileImage] = useState(false);

  const route = useRoute();  
  useEffect(() => {
        if(route.name === "Profile") {
            setIsProfileImage(true);
        } 
    },[]) 

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

    if(isProfileImage) {
        return (
        <TouchableOpacity onPress={fileHandler}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Change Profile Photo</Text>
          </View>
        </TouchableOpacity>
        );
    }
    else {
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
          )
    }
    
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 6,
        width: '60%',
        alignSelf: 'center',
        marginBottom: 20
      },
      buttonText: {
        fontFamily: 'regular',
        textAlign: 'center',
        fontSize: 16,
        color: 'white'
      },  
});

export default ImageTaker;

