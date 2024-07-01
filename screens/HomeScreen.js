import { Text, View, Image, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authReducer";
import PushNotification, { sendPushNotification } from "../utils/pushNotifications";
import { useEffect } from "react";


export default function HomeScreen() {
  const navigation = useNavigation();

  const user = useSelector((state) => state.auth.user);
  const allUsers = useSelector((state) => state.auth.allUsers);
  const dispatch = useDispatch();

  async function notification() {
    await sendPushNotification('ExponentPushToken[InZNcQG0UvdIxFny5i5OKd]', 'Here us the message')
   }

  useEffect(() => {
    notification()
  }, [])
  

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={globalStyles.containerScroll}>
        <Image
          style={globalStyles.logo}
          source={require("../assets/chatzakLogo.png")}
        />
        <Text style={globalStyles.heading}>Welcome to Chatzak</Text>
        <PushNotification />
        <Text style={globalStyles.text}>
          Chatzak is a modern chat application designed to connect people with
          ease. Whether you're looking to chat with friends, family, or
          colleagues. Chatzak offers a seamless and user-friendly experience.
        </Text>
        {user?.username ? (
          <>
            <Text style={globalStyles.text}>Welcome, {user?.username}</Text>
            <CustomButton
              title="Chats"
              onPress={() => navigation.navigate("UsersScreen")}
            />
            <CustomButton title="Logout" onPress={() => dispatch(logout())} />
            <CustomButton
              title="Settings"
              onPress={() => navigation.navigate("UserProfile")}
            />
          </>
        ) : (
          <>
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
        <View style={{ flex: 1, height:700 }}>
          <Image
            style={globalStyles.homePicture}
            source={require("../assets/home.png")}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </View>
  );
}
