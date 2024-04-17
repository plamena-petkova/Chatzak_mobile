import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";
import HomeScreen from "../Chatzak_mobile/screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import {useFonts} from "expo-font";
import { useState } from "react";
import  AppLoading from "expo-app-loading";


export default function App() {
  let [fontsLoaded] = useFonts({
    'RobotoRegular': require("../Chatzak_mobile/assets/fonts/RobotoRegular.ttf"),
});

  if (fontsLoaded) {
    return (
      <>
        <HomeScreen />
      </>
    );
  } else {
    return (
      <AppLoading />
    );
  }
}
