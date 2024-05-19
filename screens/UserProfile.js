import { Text, View, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import { useDispatch, useSelector } from "react-redux";
import { SvgUri } from "react-native-svg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IconButton from "../components/IconButton";
import CustomButton from "../components/CustomButton";
import {
  editUserById,
  getUserById,
  updateUsersAvatar,
} from "../store/authReducer";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";

export default function UserProfile() {
  const dispatch = useDispatch();

  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editNames, setEditNames] = useState(false);
  const [updatedField, setUpdatedField] = useState({
    username: "",
    email: "",
    names: "",
  });

  const currentUser = useSelector((state) => state.auth.user);

  const editIcon = (
    <MaterialCommunityIcons name="lead-pencil" size={18} color="#2D5DA4" />
  );
  const deleteIcon = (
    <MaterialCommunityIcons name="delete" size={18} color="red" />
  );

  const randomNumber = Math.floor(Math.random() * 13);

  const handleUpdateAvatar = () => {
    dispatch(updateUsersAvatar({ currentUser, randomNumber }));
  };

  const updateField = () => {
    const data = {
      currentUser,
      updatedField,
    };
    dispatch(editUserById(data));
    setUpdatedField("");
    if (editUsername) {
      setEditUsername(false);
    }
    if (editEmail) {
      setEditEmail(false);
    }
    if (editNames) {
      setEditNames(false);
    }
  };

  useEffect(() => {
    getUserById(currentUser?._id);
  }, [currentUser, handleUpdateAvatar, updateField]);

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.userProfileAvatar} key={currentUser?._id}>
        <SvgUri
          uri={currentUser?.avatarImg}
          style={globalStyles.avatarProfile}
        />
        <CustomButton title={"Change Avatar"} onPress={handleUpdateAvatar} />
      </View>
      <View
        style={
          !editUsername
            ? globalStyles.userProfileTextContainer
            : globalStyles.userProfileInputContainer
        }
      >
        <Text style={{ fontSize: 20 }}>Username:</Text>
        <Text style={{ fontSize: 20 }}>{currentUser?.username}</Text>
        <View>
          {editUsername && (
            <>
              <TextInput
                placeholder="Username"
                style={globalStyles.input}
                onChangeText={(value) => setUpdatedField({ username: value })}
              />
              <CustomButton title={"Update"} onPress={updateField} />
              <CustomButton
                title={"Cancel"}
                onPress={() => setEditUsername(false)}
              />
            </>
          )}
        </View>

        {!editUsername && (
          <IconButton title={editIcon} onPress={() => setEditUsername(true)} />
        )}
      </View>
      <View
        style={
          !editNames
            ? globalStyles.userProfileTextContainer
            : globalStyles.userProfileInputContainer
        }
      >
        <Text style={{ fontSize: 20 }}>Names:</Text>
        <Text style={{ fontSize: 20 }}>{currentUser?.names}</Text>
        <View>
          {editNames && (
            <>
              <TextInput
                placeholder="Names"
                style={globalStyles.input}
                onChangeText={(value) => setUpdatedField({ names: value })}
              />
              <CustomButton title={"Update"} onPress={updateField} />
              <CustomButton
                title={"Cancel"}
                onPress={() => setEditNames(false)}
              />
            </>
          )}
        </View>
        {!editNames && (
          <IconButton title={editIcon} onPress={() => setEditNames(true)} />
        )}
      </View>
      <View
        style={
          !editEmail
            ? globalStyles.userProfileTextContainer
            : globalStyles.userProfileInputContainer
        }
      >
        <Text style={{ fontSize: 20 }}>Email:</Text>
        <Text style={{ fontSize: 20 }}>{currentUser?.email}</Text>
        <View>
          {editEmail && (
            <>
              <TextInput
                placeholder="Names"
                style={globalStyles.input}
                onChangeText={(value) => setUpdatedField({ email: value })}
              />
              <CustomButton title={"Update"} onPress={updateField} />
              <CustomButton
                title={"Cancel"}
                onPress={() => setEditEmail(false)}
              />
            </>
          )}
        </View>
        {!editEmail && (
          <IconButton title={editIcon} onPress={() => setEditEmail(true)} />
        )}
      </View>
      <View style={globalStyles.userProfileTextContainer}>
        <Text style={{ fontSize: 20, color: "red" }}>Delete account:</Text>
        <Text style={{ fontSize: 20 }}>{currentUser?.username}</Text>
        <IconButton title={deleteIcon} onPress={() => console.log("Edit")} />
      </View>
    </View>
  );
}
