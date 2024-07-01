import { Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserById, logout } from "../store/authReducer";

export default function DeleteModal({modalVisible, handleModal}) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.user);
   

    const handleDeleteUser = () => {    
        const userId = currentUser._id;
        dispatch(deleteUserById(userId));
        dispatch(logout())
        navigation.navigate("Home");
      };
      
   

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          handleModal(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Do you really want to delete your account?
            </Text>
            <View>
              <CustomButton title={"Yes"} onPress={handleDeleteUser} />
              <CustomButton
                title={"Cancel"}
                onPress={() =>  handleModal(!modalVisible)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
