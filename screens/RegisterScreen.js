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
import { fetchUsers, register } from "../store/authReducer";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { socket } from "../socket";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [names, setNames] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitRegisterHandler = async () => {
    const data = { username, password, email, names };

    if (email && names && username && password) {
      dispatch(register(data))
        .unwrap()
        .then(() => {
          navigation.navigate("Home");
          dispatch(fetchUsers());
          socket.connect();
        })
        .catch((error) => {
          console.error("Error", error.message);
          return;
        });
    }
  };

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
        onChangeText={(value) => setPassword(value)}
      />
      <CustomButton title="Register" onPress={submitRegisterHandler} />
    </View>
  );
}
