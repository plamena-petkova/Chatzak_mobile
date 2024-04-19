import { Image, Text, View, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMessages } from "../store/chatReducer";

export default function UsersChat() {
  const dispatch = useDispatch();
  const currentChat = useSelector((state) => state.chat.currentChat);
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);

  const [chat, setChat] = useState({});

  useEffect(() => {
    if (currentChat) {
      setChat(currentChat);
      dispatch(getAllMessages({ from: currentUser._id, to: currentChat._id }))
    }
  }, [dispatch,currentChat, setChat, chat,getAllMessages, currentChat,currentUser]);

  console.log("msgs", messages )

  return (
    <View style={globalStyles.container}>
      <Text>{currentChat.username}</Text>
      <View style={styles.imgContainer}>
      <Image
      style={styles.image}
        source={{
          uri: currentChat?.avatarImg,
        }}
      />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    width:100,
    height:100
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
});