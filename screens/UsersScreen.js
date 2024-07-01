import {
  View,
  ScrollView,
} from "react-native";
import { globalStyles } from "../styles/global";

import UserChatButton from "../components/UserChatButton";
import { useNavigation } from "@react-navigation/native";
import { setCurrentChat } from "../store/chatReducer";
import { useDispatch, useSelector } from "react-redux";

export default function UsersScreen() {
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.auth.allUsers);

  const navigation = useNavigation();

  const handleUserChat = (user) => {
    dispatch(setCurrentChat(user));
    navigation.navigate("UserChat", {chat:user.username});
  };

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        {allUsers.map((user) => {
          return (
            <View key={user._id}>
              <UserChatButton
                user={user}
                onPress={() => handleUserChat(user)}
                style={globalStyles.text}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
