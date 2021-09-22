
import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export const CreatePostStyles = StyleSheet.create({
  textInput: {
    fontSize: 14,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    width: width * 0.9,
    fontWeight: "bold",
    color: "black",
    padding: 12,
    color: "white",
    marginVertical: 10,
  },
  descriptionTextInput: {
    fontSize: 14,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    width: width * 0.9,
    fontWeight: "bold",
    color: "black",
    padding: 12,
    color: "white",
    marginVertical: 10,
    textAlignVertical: "top",
    height: height * 0.25,
  },
});


export default CreatePostStyles