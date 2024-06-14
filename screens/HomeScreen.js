import { Text, View, Image, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authReducer";

import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function sendPushNotification(expoPushToken, title, body) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: { someData: 'goes here' },
  };

  
/*

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  }; 
 */

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export const token = expoPushToken;

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }

    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}


export default function HomeScreen() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(
    undefined
  );
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  const navigation = useNavigation();

  const user = useSelector((state) => state.auth.user);
  const allUsers = useSelector((state) => state.auth.allUsers);
  const dispatch = useDispatch();
  

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={globalStyles.containerScroll}>
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
