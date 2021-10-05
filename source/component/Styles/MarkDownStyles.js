import { StyleSheet } from "react-native";
import { colors } from "../../Constants/theme";

export const MarkDownStyles = {
  text: {
    color: "white",
  },
  blockQuote: {
    marginLeft: 10,
    opacity: 0.8,
  },
  codeBlock: {
    fontFamily: "console",
    fontWeight: "300",
    backgroundColor: colors.secondaryBlack,
    color: "white",
    fontSize: 13,
    borderRadius: 6,
    padding: 3,
  },
  del: {
    textDecorationLine: "line-through",
  },
  em: {
    fontStyle: "italic",
  },
  heading: {
    fontWeight: "700",
  },
  heading1: {
    fontSize: 24,
    marginTop: 1,
    marginBottom: 3,
    marginLeft: 0,
    marginRight: 0,
  },
  heading2: {
    fontSize: 22,
    marginTop: 1,
    marginBottom: 3,
    marginLeft: 0,
    marginRight: 0,
  },
  heading3: {
    fontSize: 20,
    marginTop: 1,
    marginBottom: 3,
    marginLeft: 0,
    marginRight: 0,
  },
  heading4: {
    fontSize: 18,
    marginTop: 1,
    marginBottom: 3,
    marginLeft: 0,
    marginRight: 0,
  },
  heading5: {
    fontSize: 16,
    marginTop: 1,
    marginBottom: 3,
    marginLeft: 0,
    marginRight: 0,
  },
  heading6: {
    fontSize: 14,
    marginTop: 1,
    marginBottom: 3,
    marginLeft: 0,
    marginRight: 0,
  },
  hr: {
    backgroundColor: "#ccc",
    height: 0.5,
  },
  imageWrapper: {
    padding: 4,
    width: 320,
    height: 320,
  },
  image: {
    flexGrow: 1,
  },
  inlineCode: {
    fontFamily: "console",
    fontWeight: "300",
    backgroundColor: colors.secondaryBlack,
    color: "white",
    fontSize: 13,
    borderRadius: 6,
    padding: 3,
  },
  link: {
    color: "#0366d6",
  },
  list: {
    margin: 8,
  },
  listItem: {
    flexDirection: "row",
  },
  listItemNumber: {
    minWidth: 20,
    paddingRight: 2,
    color: "#ffffff",
  },
  listItemBullet: {
    minWidth: 20,
    paddingRight: 2,
    color: "#ffffff",
  },
  listItemOrderedContent: {
    flex: 1,
  },
  listItemUnorderedContent: {
    flex: 1,
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
  },
  strong: {
    fontWeight: "700",
  },
  table: {
    margin: 4,
    borderColor: "#222",
  },
  tableHeaderCell: {
    borderColor: "#222",
  },
  tableHeaderCellContent: {
    fontWeight: "700",
  },
  tableCell: {
    padding: 5,
  },
  tableCellOddRow: {
    backgroundColor: "rgba(128, 128, 128, 0.1)",
  },
  tableCellEvenRow: {},
  tableCellLastRow: {
    borderBottomWidth: 0,
  },
  tableCellOddColumn: {},
  tableCellEvenColumn: {},
  tableCellLastColumn: {
    borderRightWidth: 0,
  },
  tableCellContent: {},
  tableCellContentOddRow: {},
  tableCellContentEvenRow: {},
  tableCellContentLastRow: {},
  tableCellContentOddColumn: {},
  tableCellContentEvenColumn: {},
  tableCellContentLastColumn: {},
  u: {
    textDecorationLine: "underline",
  },
};

export default MarkDownStyles;
