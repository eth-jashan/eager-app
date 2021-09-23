import React from 'react'
import {View,Text,Image,StyleSheet} from 'react-native'
import { colors } from '../Constants/theme';

const ResourceLink = () => {
    return (
      <View style={styles.container}>
        <View style={styles.linkBackground}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: "data:image/png;base64,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",
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.header}>
              <Text numberOfLines={1} style={styles.heading}>
                Stack Overflow - Where Developers Learn, Share
              </Text>
              <Text numberOfLines={1} style={styles.subHeading}>
                Stack Overflow is the largest, most trusted online community for
                developers to learn, share their programming knowledge, and
                build their careers
              </Text>
              <Text numberOfLines={1} style={styles.childLink}>
                stackoverflow.com
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.link}>https://google.com</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 7,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: colors.trasparentSecondaryBlack,
  },
  image: {
    width: 50,
    height: 50,
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