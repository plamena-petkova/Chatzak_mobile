import { Text, View, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import { useSelector } from "react-redux";
import { SvgUri } from "react-native-svg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IconButton from "../components/IconButton";

export default function UserProfile() {
  const currentUser = useSelector((state) => state.auth.user);

  const editIcon = (
    <MaterialCommunityIcons name="lead-pencil" size={18} color="#2D5DA4" />
  );
  const deleteIcon = (
    <MaterialCommunityIcons name="delete" size={18} color="#2D5DA4" />
  );

  return (
    <View style={globalStyles.container}>
      <View
        style={{ width: "100%", height: "30%", alignItems: "center" }}
        key={currentUser._id}
      >
        <SvgUri
          uri={currentUser.avatarImg}
          style={globalStyles.avatarProfile}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 25 }}>Username:</Text>
        <Text style={{ fontSize: 25 }}>{currentUser.username}</Text>

        <IconButton title={editIcon} onPress={() => console.log("Edit")} />
      </View>
      <View style={{
          flexDirection: "row",
          padding:30,
          justifyContent: "space-around",
        }}>
      <Text style={{ fontSize: 25 }}>Avatar:</Text>
      <SvgUri
          uri={currentUser.avatarImg}
          
        />

        <IconButton title={editIcon} onPress={() => console.log("Edit")} />
      </View>
    </View>
  );
}
