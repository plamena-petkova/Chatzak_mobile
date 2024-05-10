import { Text, View, TextInput, FlatList, Image, Alert } from "react-native";
import { globalStyles } from "../styles/global";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMessages } from "../store/chatReducer";
import SendButton from "../components/SendButton";
import { socket } from "../socket";
import axios from "axios";
import { sendMessageRoute } from "../utils/apiRoutes";
import { setOnlineUsers } from "../store/authReducer";
import EmojiPicker from "rn-emoji-keyboard";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconAnt from "react-native-vector-icons/AntDesign";
import EmojiButton from "../components/EmojiButton";
import PictureButton from "../components/PictureButton";
import * as ImagePicker from "expo-image-picker";
import { firebase, storage } from "../config";
import * as FileSystem from "expo-file-system";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { SvgUri } from "react-native-svg";

export default function UsersChat() {
  const dispatch = useDispatch();

  const [msg, setMsg] = useState();
  const [arrivalMsg, setArrivalMsg] = useState("");
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const currentChat = useSelector((state) => state.chat.currentChat);
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);

  const emojiIcon = <IconEntypo name="emoji-happy" size={18} color="#2D5DA4" />;
  const pictureIcon = <IconAnt name="picture" size={18} color="#2D5DA4" />;

  const handlePick = (emojiObject) => {
    let message = msg;
    if (message === undefined) {
      message = emojiObject.emoji;
    } else {
      message += emojiObject.emoji;
    }
    setMsg(message);
  };

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

  const selectImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result.assets[0].uri);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const uploadImage = async () => {
    setUploading(true);

    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf("/") + 1);
      const refer = firebase.storage().ref().child(filename);
      //const refer = ref(storage, filename);

      await refer.put(blob);

      const firebaseStorage = getStorage();
      const reference = ref(firebaseStorage, refer);
      await getDownloadURL(reference).then((url) => {
        setMsg(url);
      });

      setUploading(false);
      Alert.alert("Photo uploaded!");
      setImage(null);
    } catch (e) {
      console.error(e);
      setUploading(false);
    }
  };

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
      <FlatList
        inverted
        data={[...messages].reverse()}
        renderItem={(msg) => {
          if (msg.item.message.startsWith("https://")) {
            return (
              <View key={msg.item.id}>
                <Image
                  source={{ uri: msg.item.message }}
                  resizeMode="contain"
                  style={{
                    width: 200,
                    height: 200,
                  }}
                />
              </View>
            );
          }

          //console.log("MSG", msg.item.message.startsWith("https://"));

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
      {image && (
        <View>
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, justifyContent: "center" }}
          />
          <SendButton title="Send image" onPress={uploadImage} />
        </View>
      )}
      <View style={globalStyles.inputMsg}>
        <EmojiButton
          title={emojiIcon}
          onPress={() => setIsOpenEmojiPicker(true)}
        />
        <TextInput
          placeholder="Type your message..."
          onChangeText={(msg) => setMsg(msg)}
          style={globalStyles.messageText}
          value={msg}
          onChange={() => setMsg("")}
        />
        <EmojiPicker
          onEmojiSelected={handlePick}
          open={isOpenEmojiPicker}
          onClose={() => setIsOpenEmojiPicker(false)}
        />
        <PictureButton title={pictureIcon} onPress={selectImage} />

        <SendButton title={"Send"} onPress={() => handleSendMsg(msg)} />
      </View>
    </View>
  );
}

/*
      <View style={globalStyles.chatScreenName}>
        <Text style={globalStyles.textUserChatBtn}>{currentChat.username}</Text>
        <View style={globalStyles.avatarContainer}>
          <SvgUri uri={currentChat.avatarImg} />
        </View>
      </View>
      */
