import { Text, View, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import { useDispatch, useSelector } from "react-redux";
import { SvgUri } from "react-native-svg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IconButton from "../components/IconButton";
import CustomButton from "../components/CustomButton";
import { editUserById, getUserById, updateUsersAvatar } from "../store/authReducer";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";

export default function UserProfile() {
  const dispatch = useDispatch();

  const [editInput, setEditInput] = useState(false);
const [updatedUsername, setUpdatedUsername] = useState({username:''});

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

  const handleEditUser = () => {
      setEditInput(true);
  };

  

  const updateUsername = () => {
    
    const data = {
      currentUser, updatedUsername
    }
    dispatch(editUserById(data))
    setUpdatedUsername('');
    setEditInput(false);
    
  }

  useEffect(() => {
    getUserById(currentUser?._id);
  }, [currentUser, handleUpdateAvatar, updateUsername]);

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.userProfileAvatar} key={currentUser?._id}>
        <SvgUri
          uri={currentUser?.avatarImg}
          style={globalStyles.avatarProfile}
        />
        <CustomButton title={"Change Avatar"} onPress={handleUpdateAvatar} />
      </View>
      <View style={globalStyles.userProfileTextContainer}>
        <Text style={{ fontSize: 20 }}>Username:</Text>
        <Text style={{ fontSize: 20 }}>{currentUser?.username}</Text>
        {editInput &&  <><TextInput
        placeholder="Username"
        style={globalStyles.input}
        onChangeText={(value) => setUpdatedUsername({ username: value })}
      /><CustomButton title={'Update'} onPress={updateUsername}/></>}

        <IconButton title={editIcon} onPress={handleEditUser} />
      </View>
      <View style={globalStyles.userProfileTextContainer}>
        <Text style={{ fontSize: 20 }}>Names:</Text>
        <Text style={{ fontSize: 20 }}>{currentUser?.names}</Text>

        <IconButton title={editIcon} onPress={() => console.log("Edit")} />
      </View>
      <View style={globalStyles.userProfileTextContainer}>
        <Text style={{ fontSize: 20 }}>Email:</Text>
        <Text style={{ fontSize: 20 }}>{currentUser?.email}</Text>

        <IconButton title={editIcon} onPress={() => console.log("Edit")} />
      </View>
      <View style={globalStyles.userProfileTextContainer}>
        <Text style={{ fontSize: 20, color: "red" }}>Delete account:</Text>
        <Text style={{ fontSize: 20 }}>{currentUser?.username}</Text>
        <IconButton title={deleteIcon} onPress={() => console.log("Edit")} />
      </View>
    </View>
  );
}
