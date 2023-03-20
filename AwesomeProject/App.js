/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import SignInScreen from './src/Screens/SignInScreen/SignInScreen';
import HomeScreen from './src/Screens/SignInScreen/HomeScreen';
const App=()=> {
  return (
    <SafeAreaView style={styles.root}>
      <HomeScreen/>      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor:"#f9f9f9",
    // fontFamily:"Poppins-Black"
  }
});

export default App;
