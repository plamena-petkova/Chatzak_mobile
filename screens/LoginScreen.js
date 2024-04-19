import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, Image, TextInput } from "react-native";
import { globalStyles } from "../styles/global";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { fetchUsers, login } from "../store/authReducer";

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLoginHandler = async (event) => {
    const data = { username, password };

    if (username && password) {
      dispatch(login(data))
        .unwrap()
        .then(() => {
          navigation.navigate("Home");
          dispatch(fetchUsers());
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
      <Text style={globalStyles.heading}>Login</Text>
      <TextInput
        placeholder="Username"
        style={globalStyles.input}
        onChangeText={(value) => setUsername(value)}
      />
      <TextInput
        placeholder="Password"
        style={globalStyles.input}
        onChangeText={(value) => setPassword(value)}
      />
      <CustomButton title="Login" onPress={submitLoginHandler} />

      <Text>
        Username:{username} and Pass:{password}
      </Text>
    </View>
  );
}
