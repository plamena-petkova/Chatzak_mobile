import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Chatzak_mobile/screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import RegisterScreen from "./screens/RegisterScreen";
import UsersScreen from "./screens/UsersScreen";
import UsersChat from "./screens/UserChat";
import { Provider } from "react-redux";
import { store, persistor } from "../Chatzak_mobile/store/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import UserProfile from "./screens/UserProfile";

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          RobotoRegular: require("../Chatzak_mobile/assets/fonts/RobotoRegular.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="UsersScreen" component={UsersScreen} />
            <Stack.Screen name="UserChat" component={UsersChat}  options={({ route }) => ({ title: route.params.chat })} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
