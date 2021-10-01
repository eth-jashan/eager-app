import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from '../../component/HeaderComponent';
import { colors } from '../../Constants/theme';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import TopicCard from '../../component/TopicCard';


const ProfileScreen = () => {

  const [select, setSelect] = useState('posts');

  const listOfPostTitles = ['#Post1', '#Post2', '#Post3', '#Post4'];
  const listOfFavs = ['#fav1', '#fav2', '#fav3', '#fav4'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
      <ScrollView>
        <HeaderComponent
          headerStyles={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.black, height: 80, paddingHorizontal: 12 }}
          title='User_Name'
          titleStyle={{ color: colors.white, fontFamily: 'regular', justifyContent: 'center', alignSelf: 'center', fontSize: 24 }}
        />
        <View style={styles.details}>
          <View style={styles.imageContainer}>
            <Image
              fadeDuration={1000}
              source={{ uri: 'https://cdn.pixabay.com/photo/2018/04/26/16/31/marine-3352341_960_720.jpg' }}
              resizeMode='contain'
              style={styles.image}
            />
          </View>
          <View style={styles.posts}>
            <TouchableOpacity onPress={() => { }}>
              <Text style={styles.num}>12</Text>
              <Text style={styles.texts}>Posts</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.posts}>
            <TouchableOpacity onPress={() => { }}>
              <Text style={styles.num}>6</Text>
              <Text style={styles.texts}>Categories</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => { }}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Change Profile Photo</Text>
          </View>
        </TouchableOpacity>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

            <TouchableOpacity
              onPress={() => setSelect('posts')}
              style={{ borderBottomWidth: 1, borderBottomColor: select === 'posts' ? colors.primary : colors.white, padding: 20 }}
            >
              <Ionicons style={{ alignSelf: 'center' }} name="list" size={30}
                color={select === 'posts' ? colors.primary : colors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelect('favorites')}
              style={{ borderBottomWidth: 1, borderBottomColor: select === 'favorites' ? colors.primary : colors.white, padding: 20 }}
            >
              <Fontisto style={{ alignSelf: 'center' }} name="favorite" size={30}
                color={select === 'favorites' ? colors.primary : colors.white}
              />
            </TouchableOpacity>

          </View>

          <View style={{ flexDirection: 'column'}}>
            <FlatList
              data={select==='posts'?listOfPostTitles:listOfFavs}
              keyExtractor={item=>item}
              renderItem={({item}) => {
                return <TopicCard item={item} style={styles.card} onPress={()=>{}}/>
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
    justifyContent: 'center'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20
  },
  buttonText: {
    fontFamily: 'regular',
    textAlign: 'center',
    fontSize: 18,
    color: 'white'
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