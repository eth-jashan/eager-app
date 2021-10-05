import React from 'react'
import { useEffect } from 'react'
import {View, Text, Dimensions, Button, Touchable,StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import HeaderComponent from '../../component/HeaderComponent'
import { colors } from '../../Constants/theme'
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import LottieView from 'lottie-react-native';
import { lottieAnimation } from '../../Constants/assets'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import TopicCard from '../../component/TopicCard'

//actions
import { chooseCategory, getCategory } from '../../../store/actions/postCreation'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'


const {width, height} = Dimensions.get('window')

const TopicSelectionPage = (props) => {
  // const selectedCategory = []

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      await dispatch(getCategory());
      setLoading(false);
    };
    fetchPost();
  }, []);

  const onSelect = (postId, item) => {
    // console.log(postId)
    if (selectedCategory.some((x) => x === postId)) {
      console.log("it consist !");
      const array = selectedCategory.filter((x) => x !== postId);
      setSelectedCategory(array);

      console.log("----->", selectedCategory);
    } else {
      setSelectedCategory([...selectedCategory, item.id]);
      console.log("----->", selectedCategory);
    }
  };

  const submitCategory = async () => {
    //for mock we are using all the categories, cause we dont have enough post type for each :)
    //remove temp_cat and replace it with selectedCategory this if we have enough posts
    const temp_cat = [1, 7, 3, 6, 2, 8, 4];
    setSubmitLoading(true);
    await dispatch(chooseCategory(temp_cat));
    setSubmitLoading(false);
    props.navigation.navigate("Main");
  };

  const state = useSelector((x) => x.post.allCategories);
  const ooo = ["i", "l"];
  //  console.log(state)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
      <LottieView
        autoPlay={true}
        speed={1}
        source={lottieAnimation.background_bubble}
      />
      <HeaderComponent
        leftIcon={() => (
          <Ionicons
            style={{ alignSelf: "center" }}
            name="arrow-back-outline"
            size={24}
            color={"#ffffff"}
          />
        )}
        rightIcon={() =>
          !submitLoading ? (
            <Ionicons
              style={{ alignSelf: "center" }}
              name="checkmark-done-circle"
              size={24}
              color={
                selectedCategory.length === 0 ? "#ffffff" : colors.primaryLight
              }
              onPress={selectedCategory.length === 0 ? null : submitCategory}
            />
          ) : (
            <ActivityIndicator
              style={{ alignSelf: "center" }}
              size="small"
              color={colors.primaryLight}
            />
          )
        }
        headerStyles={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 80,
          paddingHorizontal: width * 0.035,
        }}
        title="Choose Your Topic"
        titleStyle={{
          color: "#ffffff",
          fontFamily: "regular",
          justifyContent: "center",
          alignSelf: "center",
          fontSize: 24,
        }}
      />
      <View style={{ flex: 1 }}>
        {!loading ? (
          <FlatList
            data={state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return <TopicCard item={item} onSelect={onSelect} />;
            }}
          />
        ) : (
          <ActivityIndicator
            style={{ alignSelf: "center", justifyContent: "center", flex: 1 }}
            size="large"
            color={"#ffffff"}
          />
        )}
        {/* <Button
          title="Floating Button"

        /> */}
      </View>
    </SafeAreaView>
  );
}


export default TopicSelectionPage