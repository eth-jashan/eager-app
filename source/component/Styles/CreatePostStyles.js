
import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../Constants/theme";
const { width, height } = Dimensions.get("window");

export const CreatePostStyles = StyleSheet.create({
  textInput: {
    fontSize: 15,
    backgroundColor: colors.secondaryLight,
    borderRadius: 6,
    width: width * 0.9,
    padding: 12,
    color: "white",
    marginBottom: 13,
  },
  descriptionTextInput: {
    fontSize: 15,
    backgroundColor: colors.secondaryLight,
    borderRadius: 6,
    width: width * 0.9,
    padding: 12,
    color: "white",
    marginBottom: 20,
    textAlignVertical: "top",
    height: height * 0.25,
  },
  label: {
    color: colors.tertiary,
    fontWeight: "bold",
    marginVertical: 4,
    fontSize: 18,
  },
  heading: {
    color: "#fff",
    fontSize: 27,
    fontFamily: "medium",
    marginVertical: 10,
  },
  tagInput: {
    backgroundColor: colors.secondaryLight,
    borderWidth: 1,
    fontSize: 15,
    borderRadius: 6,
    color: "#FFF",
  },
  tag: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  addLink: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    width:90
  },
});


export default CreatePostStyles