import { Image, Text, View, StyleSheet, ScrollView, TextInput } from "react-native";
import { globalStyles } from "../styles/global";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMessages } from "../store/chatReducer";
import SendButton from "../components/SendButton";
import { socket } from "../socket";
import axios from "axios";
import { sendMessageRoute } from "../utils/apiRoutes";
import { setOnlineUsers } from "../store/authReducer";


export default function UsersChat() {
  const dispatch = useDispatch();
  const currentChat = useSelector((state) => state.chat.currentChat);
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);

  const [msg, setMsg] = useState("");

  const [arrivalMsg, setArrivalMsg] = useState("");



  useEffect(() => {
    if (socket) {
      console.log('message if socket', socket);
      socket.on("msg-receive", (data) => {
        console.log('message=>data', data);
        setArrivalMsg({ fromSelf: false, message: data.message });
      });
      socket.on("msg-edited", (data) => {
        setArrivalMsg({ fromSelf: false, message: data.message });
      });
      socket.on("update-users", (users) => {
        dispatch(setOnlineUsers(users));
      });
    };

    return () => {
      socket.off("msg-receive");
      socket.off("msg-edited");
      socket.off("update-users");
      socket.disconnect();
    };
  }, []);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser?._id,
      to: currentChat?._id,
      message: msg,
    });

    socket.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...msg];
    msgs.push({ fromSelf: true, message: msg });

    setMsg(msgs);
  };

  useEffect(() => {
    if (currentChat) {
      dispatch(getAllMessages({ from: currentUser._id, to: currentChat._id }));
    }
  }, [dispatch, currentChat, getAllMessages, currentUser, msg]);

  useEffect(() => {
    if (currentUser) {
      socket.emit("add-user", currentUser._id);
    }
  }, [currentChat]);

  useEffect(() => {
    arrivalMsg && setMsg((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  console.log('Arrival', arrivalMsg);
  console.log('Message', msg);


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

      </ScrollView>
      <View style={globalStyles.inputMsg}>
      <TextInput
        placeholder="Type your message..."
        onChangeText={(msg) => setMsg(msg)}
        style={globalStyles.messageText}
      />
      <SendButton title={'Send'} onPress={() => handleSendMsg(msg)}/>
      </View>
    </View>
  );
}
