import { StatusBar } from "expo-status-bar";
import { Button, Text, View, Image, Pressable } from "react-native";
import { globalStyles } from "../styles/global";

export default function HomeScreen({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <Image
        style={globalStyles.logo}
        source={require("../assets/chatzakLogo.png")}
      />
      <Text style={globalStyles.heading}>Welcome to Chatzak</Text>
      <Text style={globalStyles.text}>
        Chatzak is a modern chat application designed to connect people with
        ease. Whether you're looking to chat with friends, family, or
        colleagues. Chatzak offers a seamless and user-friendly experience.
      </Text>

      <Pressable style={globalStyles.button}>
        <Text style={globalStyles.textBtn}>Login</Text>
      </Pressable>

      <Pressable style={globalStyles.button}>
        <Text style={globalStyles.textBtn}>Sign Up</Text>
      </Pressable>

      <View style={globalStyles.imgContainer}>
        <Image
          style={globalStyles.homePicture}
          source={require("../assets/home.png")}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
