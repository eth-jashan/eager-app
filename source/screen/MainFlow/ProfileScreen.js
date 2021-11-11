import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActionSheetIOS,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from "../../component/HeaderComponent";
import { colors } from "../../Constants/theme";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import EditPostCard from "../../component/EditPostCard";
import ImageTaker from "../../compon../../component/ImageTaker";
import CreatePost from "../../component/CreatePost";
import { Modalize } from "react-native-modalize";
import { AntDesign } from "@expo/vector-icons";

import * as postActions from "../../../store/actions/postCreation";
import { useDispatch, useSelector } from "react-redux";
import YoutubePost from "../../component/YoutubePost";
import { ActivityIndicator } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const ProfileScreen = (props) => {
  const [select, setSelect] = useState("posts");
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const modalizeRef = useRef(null);

  const [userdetails, setUserDetails] = useState();
  const [userName, setUsername] = useState();
  const [categories, setCategories] = useState();
  const [savedPosts, setSavedPosts] = useState();
  const [userPosts, setUserPost] = useState();
  const dispatch = useDispatch();

    const [Images, setImages] = useState();
    const [loader, setLoader] = useState(false);

    const loadImages = async () => {
      console.log("yooo");
      setLoader(true);
      const response = await postActions.loadStaticImages();
      setImages(response);
      console.log(response);
    };

  const onImageTaken = (value, size) => {
    setImage([value, size]);
  };

      function strToInt(str, arrLen) {
        const charArr = str.split("");
        let total = 0;
        const codeArr = charArr.forEach((char) => {
          total += char.charCodeAt(0);
        });
        const uniqueNum = parseInt(total % arrLen);
        console.log(uniqueNum);
        return uniqueNum;
      }

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onDeleteHandler = () => {
    return {};
  };
  const loadProfile = async () => {
    const userdetails = await postActions.getProfile();
    const allUserPosts = await postActions.getAllPost();
    
    console.log("userPostssssss->>>>", allUserPosts);
    setUserDetails(userdetails);
    const userName = userdetails.user.username;
    console.log('useeeeeeeeeeeeeeeeeeeeeeeeeeer',userName)
    const userPosts = await postActions.getUserPost(userName);
    // const userPosts = allUserPosts.filter((post) => post.author === userName);
    console.log("userPostssssss->>>>", userPosts);
    setUsername(userName);
    const categories = userdetails.category;
    setCategories(categories);
    const savedPosts = userdetails.saved_posts;
    setSavedPosts(savedPosts);

    setUserPost(userPosts);
    console.log('my maaaaaaaannnnnnnnnn',userPosts)
  };

    const onSelect = (id) => {
      console.log("going to detail");
    };

  useEffect(() => {
    const start = props.navigation.addListener("focus", () => {
      loadProfile();
      loadImages();
    });

    return start;
  }, [props.navigation]);

  // }
  if (savedPosts) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
        <ScrollView stickyHeaderIndices={[2]} style={{ flex: 1 }}>
          <HeaderComponent
            headerStyles={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 60,
              paddingHorizontal: 12,
            }}
            title={userName}
            titleStyle={{
              color: "#ffffff",
              fontFamily: "regular",
              justifyContent: "center",
              alignSelf: "center",
              fontSize: 18,
            }}
          />
          <View>
          <View style={styles.details}>
            <View style={styles.imageContainer}>
                  <Image
                  fadeDuration={1000}
                  source={{
                  uri: Images ? userName? Images.file[strToInt(userName, userName.length)]: null: null,
                          }}
                  resizeMode="contain"
                  style={styles.image}/>
                  <Text style={{position:'absolute',alignSelf:'center',fontSize:45,color:'#ffffff',textAlign:'center'}}>{userName.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.posts}>
              <TouchableOpacity>
                <Text style={styles.num}>
                  {userPosts ? userPosts.length : null}
                </Text>
                <Text style={styles.texts}>Posts</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.posts}>
              <TouchableOpacity>
                <Text style={styles.num}>
                  {categories ? categories.length : null}
                </Text>
                <Text style={styles.texts}>Categories</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>

          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around",padding:5,backgroundColor:colors.secondary }}
            >
              <TouchableOpacity
                onPress={() => setSelect("posts")}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor:
                    select === "posts" ? colors.primary : "#ffffff",
                  padding: 20,
                }}
              >
                <Ionicons
                  style={{ alignSelf: "center" }}
                  name="list"
                  size={24}
                  color={select === "posts" ? colors.primary : "#ffffff"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelect("favorites")}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor:
                    select === "favorites" ? colors.primary : "#ffffff",
                  padding: 20,
                }}
              >
                <Fontisto
                  style={{ alignSelf: "center" }}
                  name="favorite"
                  size={24}
                  color={select === "favorites" ? colors.primary : "#ffffff"}
                />
              </TouchableOpacity>
            </View>
            </View>

            <View style={{ flexDirection: "column" }}>
              <FlatList
                nestedScrollEnabled={true}
                data={select === "posts" ? userPosts : savedPosts}
                keyExtractor={(item) => item.id}
                renderItem={(itemData) => {
                  return (
                    <YoutubePost
                      contentSmall={false}
                      data={itemData.item}
                      index={itemData.index.toString()}
                      onSelect={onSelect}
                      holdModal={false}
                      images = {Images}
                    />
                  );
                }}
              />
            </View>
         
        </ScrollView>
        <Modalize
          modalStyle={{ backgroundColor: colors.modal }}
          modalHeight={height * 0.9}
          ref={modalizeRef}
          handlePosition={"inside"}
        >
          <CreatePost />
        </Modalize>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
                <ActivityIndicator
          style={{ justifyContent: "center", alignSelf: "center",top:height*0.4 }}
          size="small"
          color={colors.primaryLight}
        />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: colors.primary,
    borderWidth: 3,
    overflow: "hidden",
    margin: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  details: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  posts: {
    margin: 20,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  texts: {
    color: "white",
    fontFamily: "regular",
    fontSize: 16,
  },
  num: {
    color: "white",
    fontFamily: "bold",
    fontSize: 16,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "black",
  },
});

export default ProfileScreen;
