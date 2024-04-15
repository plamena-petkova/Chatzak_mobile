import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';

export default function App() {

  const onSubmitHandler = () => {

  }


  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../Chatzak_mobile/assets/chatzakLogo.png')}
      />
      <Text style={styles.heading}>Welcome to Chatzak</Text>
      <Text style={styles.text}>Chatzak is a modern chat application designed to connect people with ease. Whether you're looking to chat with friends, family, or colleagues, Chatzak offers a seamless and user-friendly experience.
Enjoy features such as sending messages, sharing emojis, and staying connected with your loved ones. Get started now by registering for a new account.</Text>
      <Image
        style={styles.homePicture}
        source={require('../Chatzak_mobile/assets/home.png')}
      />
      <TextInput style={styles.textInput} />
      <View style={styles.textInput}>
      <Button title='LOGIN' onPress={onSubmitHandler} />
      </View>
     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C7EBF9',
    padding:20
  
  },
  textInput: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20,
  },
  text:{
    fontFamily:'RobotoRegular',
    fontSize:20
  },
  logo:{
    width: 200,
    height: 100,
    //borderRadius:25,
    borderBottomRightRadius:30,
    borderTopLeftRadius:30,
    marginTop:40,
  },
  heading:{
    fontSize:30,
    fontWeight:'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:15,
    marginBottom:15,
    textAlign:'center'
  }, 
  homePicture: {
    width: 370,
    height: 300,
    objectFit:'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

