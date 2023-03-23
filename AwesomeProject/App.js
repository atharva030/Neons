import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import SignInScreen from './src/Screens/SignInScreen/SignInScreen';
import HomeScreen from './src/Screens/SignInScreen/HomeScreen';
import AddTask from './src/Components/AddTask';
const App=()=> {
  
  return (
    <SafeAreaView style={styles.root}>
      {/* <HomeScreen/>*/}
      <AddTask/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root:{
    // flex:1,
    backgroundColor:"#f9f9f9",
    // fontFamily:"Poppins-Black"
  }
});

export default App;
