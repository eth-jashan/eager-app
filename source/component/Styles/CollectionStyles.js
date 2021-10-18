import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../Constants/theme";
const { width, height } = Dimensions.get("window");

const CollectionStyles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.secondaryBlack,
    borderRadius: 6,
    marginHorizontal: width * 0.02,
    width: width * 0.45,
    height: width * 0.3,
    elevation: 5,
    marginTop: width * 0.03,
    justifyContent: "center",
    marginBottom: width * 0.02,
  },
  title: {
    color: "#ffffff",
    fontFamily: "bold",
  },
  description: {
    color: "#ffffff",
    fontFamily: "light",
    fontSize: 12,
    marginTop: "5%",
  },
  image: {
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    width: width * 0.45,
  },
});

export default CollectionStyles