import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMessages } from "../store/chatReducer";
import UserChatButton from "../components/UserChatButton";
import { TextInput } from "react-native-web";

export default function UsersChat() {
  const dispatch = useDispatch();
  const currentChat = useSelector((state) => state.chat.currentChat);
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);

  const [msg, setMsg] = useState("");
  console.log("MSG", msg);

  useEffect(() => {
    if (currentChat) {
      dispatch(getAllMessages({ from: currentUser._id, to: currentChat._id }));
    }
  }, [dispatch, currentChat, getAllMessages, currentUser]);

  console.log("msgs", messages);

  return (
    <View style={globalStyles.inputContainer}>
      <View style={globalStyles.chatScreenName}>
        <Text style={globalStyles.textUserChatBtn}>{currentUser.username}</Text>
        <View style={{ width: 30, height: 30 }} key={currentUser._id}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "stretch",
            }}
            source={{
              uri: currentUser.avatarImg,
            }}
          />
        </View>
      </View>
      <ScrollView>
        <View>
          {messages.map((msg) => {
            return (
              <View key={msg.id}>
                <Text
                  style={
                    msg.fromSelf
                      ? globalStyles.messageChipFromMe
                      : globalStyles.messageChipForMe
                  }
                >
                  {msg.message}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <TextInput
        placeholder="Type your message..."
        style={globalStyles.inputMsg}
        onChangeText={(msg) => setMsg(msg)}
      />
    </View>
  );
}
