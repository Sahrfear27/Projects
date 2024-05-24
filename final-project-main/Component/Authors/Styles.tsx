import { Platform, StyleSheet } from "react-native";

const authorStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? 30 : 0,
    paddingBottom: 200,
  },
  row: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  editButton: {
    backgroundColor: "#15803d",
  },
  deleteButton: {
    backgroundColor: "#dc2626",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 25,
    color: "#444",
    textAlign: "center",
    margin: 20,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F5F5F5",
    marginTop: 10,
  },
  details: {
    flexDirection: "column",
    flex: 8,
  },
  imgBackground: {
    justifyContent: "center",
    height: 170,
  },
  addAuthor: {
    borderWidth: 1,
    borderColor: "#ecfeff",
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: "#006DA4",
    marginTop: 20,
  },
  addButton: {
    borderWidth: 1,
    borderColor: "#a8a29e",
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: "#15803d",
    marginTop: 20,
  },
});

export default authorStyle;
