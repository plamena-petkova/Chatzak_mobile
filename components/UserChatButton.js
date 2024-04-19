import { Button, Text, Pressable, Image } from "react-native";
import { globalStyles } from "../styles/global";

export default function UserChatButton(props) {
  const { onPress, user } = props;

  console.log('UserChatButton', user)

  return (
    <Pressable style={globalStyles.userChatButton} onPress={onPress} >
      <Image style={globalStyles.avatar}
        source={user.avatar} key={user._id} /><Text style={globalStyles.textUserChatBtn}>{user.username}</Text>
    </Pressable>
  );
}
