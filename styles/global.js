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
    marginBottom:20,
    textAlign:'justify'
  },
  logo: {
    width: "100%",
    height: "25%",
    marginBottom: 20,
    borderRadius:7
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom:10
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
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#2D5DA4',
      marginBottom:15,
      marginTop:15
    },
    textBtn: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
});
