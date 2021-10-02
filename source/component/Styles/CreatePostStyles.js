
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
    backgroundColor: colors.tags,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    flexDirection:'row'
  },
  addLink: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    width: 90,
  },
  preview: {
    backgroundColor: colors.secondaryLight,
    borderRadius: 6,
    padding: 12,
    width: width * 0.9,
  },
  helpContainer: {
    backgroundColor: colors.modal,
    padding: 10,
    height: height * 0.75,
    margin: 10,
    borderRadius: 6,
    elevation: 10,
  },
  helpSubContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headingUnderline: {
    height: 3,
    backgroundColor: "#ffffff",
    width: width * 0.45,
  },
  helpScrollView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  blockElement: {
    padding: 15,
    borderTopWidth: 0.5,
    width: width * 0.5,
    borderRightWidth: 1,
    borderColor: colors.modal,
    backgroundColor: colors.octa,
  },
  helpHeadingBlock: {
    padding: 15,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    width: width * 0.5,
    borderColor: colors.modal,
    backgroundColor: colors.octa,
  },
  helpHeading: {
    fontSize: 16,
    fontWeight: "bold",
  },
  helpElementText: {
    fontSize: 12,
    color: colors.secondaryBlack,
    fontFamily: "console",
  },
  helpSyntaxText: {
    fontSize: 12,
    fontFamily: "console",
    color: colors.secondaryBlack,
  },
  DropDownContainer: {
    alignItems: "center",
    marginTop:15,
    marginHorizontal:11,
    justifyContent: "center",
    alignSelf: "center",

  },
});


export default CreatePostStyles