import { Button, Text, Pressable, Image, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function UserChatButton(props) {
  const { onPress, user } = props;

  return (
    <Pressable style={globalStyles.userChatButton} onPress={onPress}>
      <Text style={globalStyles.textUserChatBtn}>{user.username}</Text>
      <View style={{ width: 30, height: 30 }} key={user._id}>
        <Image
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "stretch",
          }}
          source={{
            uri: user.avatarImg,
          }}
        />
      </View>
    </Pressable>
  );
}
