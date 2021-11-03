import React, { useEffect, useState } from 'react'
import {View,Text, ImageBackground, Dimensions} from 'react-native';
import HeaderComponent from './HeaderComponent';
import CollectionStyles from './Styles/CollectionStyles';

//actions
import { loadStaticImages } from '../../store/actions/postCreation';


const Collection = ({title,description,link}) => {
  const[Images,setImages] = useState();

    const loadImages = async () => {
      console.log("yooo");
      const response = await loadStaticImages();
      setImages(response);
      console.log(response);
    };

  useEffect(()=>{
    loadImages()
  },[])
  
    return (
      <View style={CollectionStyles.cardContainer}>
        <ImageBackground
          source={{
            // uri: Images?Images[0]:null,
            uri: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
          }}
          style={CollectionStyles.image}
          blurRadius={2.5}
          imageStyle={{ borderRadius: 6, opacity: 0.5 }}
        >
          <Text style={CollectionStyles.title}>{title}</Text>
          <Text numberOfLines={3} style={CollectionStyles.description}>
            {description}
          </Text>
        </ImageBackground>
      </View>
    );
}

export default Collection;