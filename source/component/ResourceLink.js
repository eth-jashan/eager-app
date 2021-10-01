import React from 'react'
import {View,Text,Image,StyleSheet, Dimensions, Linking,Button} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from "@expo/vector-icons"; 

import { colors } from '../Constants/theme';

const { width, height } = Dimensions.get("window");

const ResourceLink = ({data,onPress}) => {

  const handleClick = () => {
    Linking.canOpenURL(data.url).then((supported) => {
      if (supported) {
        Linking.openURL(data.url);
      } else {
        console.log("Don't know how to open URI: " + data.url);
      }
    });
  };

  const afterSlash = data.url.split('/')
  // console.log(afterSlash)
  const domainName = afterSlash[2]

    return (
      <View style={styles.container}>
        <TouchableOpacity style={{alignItems:"flex-end"}} onPress={() => onPress(data.id)}>
          <Entypo name="cross" size={13} color="white" />
        </TouchableOpacity>
        <View style={styles.linkBackground}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: data.image,
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.header}>
              <Text numberOfLines={1} style={styles.heading}>
                {data.title}
              </Text>
              {data.description ? (
                <Text numberOfLines={1} style={styles.subHeading}>
                  {data.description}
                </Text>
              ) : null}
              <Text numberOfLines={1} style={styles.childLink}>
                {domainName}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handleClick}>
          <Text style={styles.link}>{data.url}</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 7,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: colors.trasparentSecondaryBlack,
    width:width*0.9
  },
  image: {
    width: 25,
    height: 25,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  linkBackground: {
    padding: 7,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: colors.trasparentSecondaryBlack,
  },
  imageContainer: {
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  header: {
    alignItems: "flex-start",
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  heading: {
    color: "white",
    fontSize: 15,
    fontFamily: "medium",
    paddingLeft: 3,
  },
  subHeading: {
    color: "#cccccc",
    fontSize: 13,
    fontFamily: "light",
    paddingTop: 3,
    paddingLeft: 3,
  },
  childLink: {
    color: "#cccccc",
    fontSize: 12,
    fontFamily: "ultra-light",
    paddingTop: 3,
    paddingLeft: 3,
  },
  link: {
    color: colors.link,
    paddingLeft:7
  },
});

export default ResourceLink;