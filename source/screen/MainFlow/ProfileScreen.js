import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, ActionSheetIOS } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from '../../component/HeaderComponent';
import { colors } from '../../Constants/theme';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import EditPostCard from '../../component/EditPostCard';
import ImageTaker from '../../compon../../component/ImageTaker';
import CreatePost from '../../component/CreatePost';
import { Modalize } from 'react-native-modalize';
import { AntDesign } from '@expo/vector-icons';

import * as postActions from '../../../store/actions/postCreation';
import { useDispatch, useSelector} from 'react-redux';


const{width,height} = Dimensions.get('window');

const ProfileScreen = (props) => {

  const [select, setSelect] = useState('posts');
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const modalizeRef = useRef(null);
  const dispatch = useDispatch();

  const onImageTaken = (value, size) => {
    setImage([value, size]);
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onDeleteHandler = () => {
    return {};
  };


  const listOfPostTitles = ['#Post1', '#Post2', '#Post3', '#Post4'];
  const listOfFavs = ['#fav1', '#fav2', '#fav3', '#fav4'];

  // const loadpost = async() => {
  //   const posts =  await postActions.getPost()
  //   setPosts(post);
  // }

  useEffect(() => {
    dispatch(postActions.getProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(postActions.getAllPost());
  }, [dispatch]);

  const userdetails = useSelector(state => state.post.userdetails);
  const userName = userdetails.user.username;
  const categories = userdetails.category;
  const savedPosts = userdetails.saved_posts;
  const userPosts = useSelector(state => state.post.posts.filter(post => 
    post.author === userName));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
      <ScrollView>
        <HeaderComponent
          headerStyles={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: colors.black,
            height: 60,
            paddingHorizontal: 12,
          }}
          title={userName}
          titleStyle={{
            color: colors.white,
            fontFamily: "regular",
            justifyContent: "center",
            alignSelf: "center",
            fontSize: 18,
          }}
        />
        <View style={styles.details}>
          <View style={styles.imageContainer}>
            {image.length === 0 ? (
              <Image
                fadeDuration={1000}
                source={require("../../../assets/default_DP.jpg")}
                resizeMode="contain"
                style={styles.image}
              />
            ) : (
              <Image
                fadeDuration={1000}
                source={{ uri: image[0].uri }}
                resizeMode="contain"
                style={styles.image}
              />
            )}
          </View>
          <View style={styles.posts}>
            <TouchableOpacity>
              <Text style={styles.num}>{userPosts.length.toString()}</Text>
              <Text style={styles.texts}>Posts</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.posts}>
            <TouchableOpacity>
              <Text style={styles.num}>{categories.length.toString()}</Text>
              <Text style={styles.texts}>Categories</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ImageTaker onImageTaken={onImageTaken} />

        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
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

          <View style={{ flexDirection: "column" }}>
            <FlatList
              data={select === "posts" ? userPosts : savedPosts}
              keyExtractor={(item) => item.id}
              renderItem={( itemData ) => {
                return (
                  <EditPostCard
                    title={itemData.item.title}
                    onClick={() => {
                      props.navigation.navigate("DetailScreen");
                    }}
                  >
                    <TouchableOpacity onPress={select==="posts"?onOpen:onDeleteHandler}>
                      {select === "posts" ?
                      <AntDesign name="edit" size={30} color="#ffffff" />
                      : <AntDesign name="delete" size={30} color="#ffffff" />
                      }
                    </TouchableOpacity>
                  </EditPostCard>
                );
              }}
            />
          </View>
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
};


const styles = StyleSheet.create({
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: colors.primary,
    borderWidth: 3,
    overflow: 'hidden',
    margin: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  posts: {
    margin: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  texts: {
    color: 'white',
    fontFamily: 'regular',
    fontSize: 16
  },
  num: {
    color: 'white',
    fontFamily: 'bold',
    fontSize: 16,
    alignSelf: 'center'
  },
  card: {
    backgroundColor: 'black',
  },
});

export default ProfileScreen;