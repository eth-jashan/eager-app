import React from 'react'
import {View,Text, ImageBackground, Dimensions} from 'react-native';
import HeaderComponent from './HeaderComponent';
import CollectionStyles from './Styles/CollectionStyles';


const Collection = ({title,description,link}) => {
  
    return (
      <View style={CollectionStyles.cardContainer}>
        <ImageBackground
          source={{
            uri: link,
          }}
          style={CollectionStyles.image}
          blurRadius={2.5}
          imageStyle={{ borderRadius: 6, opacity: 0.5 }}
        >
          <Text style={CollectionStyles.title}>{title}</Text>
          <Text numberOfLines={3} style={CollectionStyles.description}>{description}</Text>
        </ImageBackground>
      </View>
    );
}

export default Collection;