import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Pressable } from "react-native";
import { globalStyles } from "../styles/global";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authReducer";

export default function HomeScreen() {
  const navigation = useNavigation();

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  console.log("User", user?.username);

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
      {user.username ? (
        <>
          <Text style={globalStyles.text}>Welcome, {user?.username}</Text>
          <CustomButton
            title="Chats"
            onPress={() => navigation.navigate("UsersScreen")}
          />
          <CustomButton
            title="Logout"
            onPress={() => dispatch(logout())}
          />
        </>
      ) : (
        <>
          {" "}
          <CustomButton
            title="Login"
            onPress={() => navigation.navigate("Login")}
          />
          <CustomButton
            title="Sign Up"
            onPress={() => navigation.navigate("Register")}
          />
        </>
      )}

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
