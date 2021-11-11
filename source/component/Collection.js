import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Dimensions } from "react-native";
import HeaderComponent from "./HeaderComponent";
import CollectionStyles from "./Styles/CollectionStyles";

const Collection = ({ title, description, link, images }) => {
  
  function strToInt(str, arrLen) {
    const charArr = str.split("");
    let total = 0;
    const codeArr = charArr.forEach((char) => {
      total += char.charCodeAt(0);
    });
    const uniqueNum = parseInt(total % arrLen);
    console.log(uniqueNum)
    return uniqueNum;

  }

  return (
    <View style={CollectionStyles.cardContainer}>
      <ImageBackground
        source={{
          // uri: Images?Images[0]:null,
          uri: images ? title? images.file[strToInt(title, title.length)]: null: null,
        }}
        style={CollectionStyles.image}
        imageStyle={{ borderRadius: 6, opacity: 0.9 }}
      >
        <Text style={CollectionStyles.title}>{title}</Text>
        <Text numberOfLines={3} style={CollectionStyles.description}>
          {description}
        </Text>
      </ImageBackground>
    </View>
  );
};

export default Collection;
