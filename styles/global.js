import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7EBF9",
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: "RobotoRegular",
    marginBottom: 20,
    textAlign: "justify",
    flex: 1,
  },
  logo: {
    width: "100%",
    height: "25%",
    marginBottom: 20,
    borderRadius: 7,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 10,
  },
  imgContainer: {
    display: "flex",
    alignItems: "center",
  },
  homePicture: {
    width: 220,
    height: 220,
    objectFit: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2D5DA4",
    marginBottom: 15,
    marginTop: 15,
  },
  textBtn: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#777",
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  userChatButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 15,
    backgroundColor: "#DDE7EE",
    marginBottom: 15,
    marginTop: 15,
    border: 1,
    borderRadius: 4,
  },
  textUserChatBtn: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    marginRight: 10,
  },
  avatarContainer: {
    width: 100,
    height: 100,
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  chatScreenName: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 15,
    backgroundColor: "#DDE7EE",
    marginBottom: 15,
    border: 1,
    borderRadius: 4,
  },
  inputMsg: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#777",
    padding: 8,
    margin: 10,
  },
  inputContainer: {
    position: "absolute",
    width: "100vw",
    height: "90vh",
    justifyContent: "space-between",
  },
  messageChipFromMe: {
    borderWidth: 1,
    borderRadius: 7,
    borderBottomRightRadius: 0,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    backgroundColor: "pink",
    justifyContent:'flex-start',
    marginLeft:75,
    marginRight:20

  },
  messageChipForMe: {
    borderRadius: 7,
    borderWidth: 1,
    borderBottomLeftRadius: 0,
    padding: 8,
    margin: 10,
    backgroundColor: "blue",
    justifyContent:'flex-end',
    marginRight:75,
    marginLeft:20
  },
});
