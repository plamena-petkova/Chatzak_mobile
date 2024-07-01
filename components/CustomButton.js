import { Text, Pressable } from "react-native";
import { globalStyles } from "../styles/global";

export default function CustomButton(props) {
  const { onPress, title } = props;

  const redBtn = title === 'Cancel';

  return (
    <Pressable style={!redBtn ? globalStyles.button : globalStyles.redButton} onPress={onPress} >
      <Text style={globalStyles.textBtn}>{title}</Text>
    </Pressable>
  );
}
