import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { globalStyles } from "../styles/global";
import CustomButton from "../components/CustomButton";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [names, setNames] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  return (
    <View style={globalStyles.container}>
      <Image
        style={globalStyles.logo}
        source={require("../assets/chatzakLogo.png")}
      />
      <Text style={globalStyles.heading}>Register</Text>
      <TextInput
        placeholder="Email"
        style={globalStyles.input}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        placeholder="Names"
        style={globalStyles.input}
        onChangeText={(value) => setNames(value)}
      />

      <TextInput
        placeholder="Username"
        style={globalStyles.input}
        onChangeText={(value) => setUsername(value)}
      />
      <TextInput
        placeholder="Password"
        textContentType="password"
        style={globalStyles.input}
        onChangeText={(value) => setPass(value)}
      />
      <CustomButton title="Register" />
    </View>
  );
}
