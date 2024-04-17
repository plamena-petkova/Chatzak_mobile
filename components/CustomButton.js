import { Button, Text, Pressable } from "react-native";
import { globalStyles } from "../styles/global";

export default function CustomButton(props) {
  const { onPress, title } = props;

  return (
    <Pressable style={globalStyles.button} onPress={onPress} >
      <Text style={globalStyles.textBtn}>{title}</Text>
    </Pressable>
  );
}
