import { Button, Text, Pressable } from "react-native";
import { globalStyles } from "../styles/global";

export default function PictureButton(props) {
  const { onPress, title } = props;

  return (
    <Pressable style={globalStyles.emojiBtn} onPress={onPress} >
      <Text style={globalStyles.textBtn}>{title}</Text>
    </Pressable>
  );
}
