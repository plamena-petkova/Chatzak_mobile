import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';


export default function HomeScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/chatzakLogo.png')}
      />
      <Text style={styles.heading}>Welcome to Chatzak</Text>
      <Text style={styles.text}>Chatzak is a modern chat application designed to connect people with ease.</Text>
      <View style={styles.text}>
      <Button title='LOGIN'  />
      </View>
      <View>
      <Button title='SIGN UP'  />
      </View>
      <View style={styles.imgContainer}>
      <Image
        style={styles.homePicture}
        source={require('../assets/home.png')}
      />   
      </View>
        
      <StatusBar style="auto" />
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    justifyContent:'space-around',
    alignContent:'center',
    flex: 1,
    backgroundColor: '#C7EBF9',
    paddingLeft:15,
    paddingRight:15
  
  },
  text:{
    textAlign:'center',
    fontSize:16,
    fontFamily:'RobotoRegular'
  },
  logo:{
    width: 170,
    height: 90,
    borderBottomRightRadius:30,
    borderTopLeftRadius:30,
  },
  heading:{
    fontSize:30,
    fontWeight:'bold',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center'
  }, 
  homePicture: {
    width: 220,
    height: 220,
    objectFit:'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    display:'flex',
    alignItems:'center'
  }
});

