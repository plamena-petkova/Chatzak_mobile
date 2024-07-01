import { Text, Pressable, View } from "react-native";
import { globalStyles } from "../styles/global";
import { SvgUri } from "react-native-svg";


export default function UserChatButton(props) {
  const { onPress, user } = props;

  return (
    <Pressable style={globalStyles.userChatButton} onPress={onPress}>
      <View style={globalStyles.avatarStyle} key={user._id}>
        <SvgUri uri={user.avatarImg} />
      </View>
      <Text style={globalStyles.textUserChatBtn}>{user.username}</Text>
    </Pressable>
  );
}
