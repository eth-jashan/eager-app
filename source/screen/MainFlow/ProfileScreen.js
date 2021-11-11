import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from '../../component/HeaderComponent';
import { colors } from '../../Constants/theme';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import TopicCard from '../../component/TopicCard';
import ImageTaker from '../../compon../../component/ImageTaker';


const ProfileScreen = () => {

  const [select, setSelect] = useState('posts');
  const [image, setImage] = useState([]);

  const onImageTaken = (value, size) => {
    setImage([value, size]);
  };

  const listOfPostTitles = ['#Post1', '#Post2', '#Post3', '#Post4'];
  const listOfFavs = ['#fav1', '#fav2', '#fav3', '#fav4'];

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
          title="arjun@gmail.com"
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
                source={{
                  uri: "https://is3-ssl.mzstatic.com/image/thumb/Music128/v4/93/f4/03/93f403d8-b07c-a1e6-1cc0-2239f74ce37a/artwork.jpg/400x400cc.jpg",
                }}
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
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.num}>12</Text>
              <Text style={styles.texts}>Posts</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.posts}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.num}>6</Text>
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
              data={select === "posts" ? listOfPostTitles : listOfFavs}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                return (
                  <TopicCard
                    item={item}
                    style={styles.card}
                    onSelect={() => {}}
                  />
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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