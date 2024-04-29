import { Image, Text, View, TextInput, FlatList } from "react-native";
import { globalStyles } from "../styles/global";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMessages } from "../store/chatReducer";
import SendButton from "../components/SendButton";
import { socket } from "../socket";
import axios from "axios";
import { sendMessageRoute } from "../utils/apiRoutes";
import { setOnlineUsers } from "../store/authReducer";
import { SvgUri, SvgXml } from "react-native-svg";

export default function UsersChat() {
  const dispatch = useDispatch();

  const currentChat = useSelector((state) => state.chat.currentChat);
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);

  const [msg, setMsg] = useState("");

  const [arrivalMsg, setArrivalMsg] = useState("");

  useEffect(() => {
    if (currentUser._id && !socket.connected) {
      socket.connect();
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("msg-receive", (data) => {
        setArrivalMsg({ fromSelf: false, message: data.message });
      });
      socket.on("msg-edited", (data) => {
        setArrivalMsg({ fromSelf: false, message: data.message });
      });
      socket.on("update-users", (users) => {
        dispatch(setOnlineUsers(users));
      });
    }

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

    setMsg("");
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

  return (
    <View style={globalStyles.inputContainer}>
      <View style={globalStyles.chatScreenName}>
        <Text style={globalStyles.textUserChatBtn}>{currentChat.username}</Text>
        <View style={globalStyles.avatarContainer}>
        <SvgUri
      uri={currentChat.avatarImg} />
        </View>
      </View>
      <FlatList
        inverted
        data={[...messages].reverse()}
        renderItem={(msg) => {
          return (
            <View key={msg.item.id}>
              <Text
                style={
                  msg.item.fromSelf
                    ? globalStyles.messageChipFromMe
                    : globalStyles.messageChipForMe
                }
              >
                {msg.item.message}
              </Text>
            </View>
          );
        }}
        keyExtractor={(message) => message.id}
      />

      <View style={globalStyles.inputMsg}>
        <TextInput
          placeholder="Type your message..."
          onChangeText={(msg) => setMsg(msg)}
          style={globalStyles.messageText}
          value={msg || ""}
        />
        <SendButton title={"Send"} onPress={() => handleSendMsg(msg)} />
      </View>
    </View>
  );
}
