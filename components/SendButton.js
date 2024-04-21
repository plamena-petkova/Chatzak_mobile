import { Button, Text, Pressable } from "react-native";
import { globalStyles } from "../styles/global";

export default function SendButton(props) {
  const { onPress, title } = props;

  return (
    <Pressable style={globalStyles.sendBtn} onPress={onPress} >
      <Text style={globalStyles.textBtn}>{title}</Text>
    </Pressable>
  );
}
