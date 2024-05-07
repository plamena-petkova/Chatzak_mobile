import { Text, Pressable, Image, View } from "react-native";
import { globalStyles } from "../styles/global";
import { SvgUri, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

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
