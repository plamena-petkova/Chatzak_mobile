import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View, Image, TextInput } from "react-native";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/chatzakLogo.png")}
      />

      <TextInput
        placeholder="Username"
        style={styles.input}
        onChangeText={(value) => setUsername(value)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        onChangeText={(value) => setPass(value)}
      />
      <View style={styles.button}>
        <Button
          title="Login"
          onPress={() => console.log("User and pass", username, pass)}
        />
      </View>

      <Text>
        Username:{username} and Pass:{pass}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    backgroundColor: "#C7EBF9",
    padding: 30,
  },
  input: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#777",
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 15,
  },

  logo: {
    width: "100%",
    height: "25%",
    marginBottom: 20,
    borderRadius:7
  },
});
