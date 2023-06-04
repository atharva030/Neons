import React, { useState, useEffect } from 'react';
import { StyleSheet, BackHandler, ToastAndroid } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/Screens/Login';
import RegisterScreen from './src/Screens/Register';
import Welcome from './src/Screens/Welcome';
// import NavigationScreen from './src/Screens/NavigationScreen';
import AddTeamMember from './src/Screens/AddTeamMember';
import EditTask from './src/Screens/EditTask';
import EmailValid from './src/Components/ForgotPassword/EmailValid';
import OtpValid from './src/Components/ForgotPassword/OtpValid';
import Newpassword from './src/Components/ForgotPassword/Newpassword';
import ProfileScreen from './src/Screens/ProfileScreen';
import AddTask from './src/Screens/AddTask';
import HomeScreen from './src/Screens/HomeScreen';
import BottomTabNavigator from './src/Screens/BottomTabNavigator';
import Loader from './src/Screens/Loader';
const Stack = createNativeStackNavigator();

const App = () => {
  const [spinner, setSpinner] = useState(true);

  let backPressTimer = null;

  const handleBackPress = () => {
    if (Platform.OS === 'android') {
      if (backPressTimer && backPressTimer + 2000 >= Date.now()) {
        BackHandler.exitApp();
        return true;
      } else {
        ToastAndroid.show('Press back again to exit !', ToastAndroid.SHORT);
        backPressTimer = Date.now();
        return true;
      }
    }
  };
  
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const loaderEffect = () => {
      setTimeout(() => {
        setSpinner(false);
      }, 500);
      // setSpinner(false)
    };

    loaderEffect();
  }, []);

  return (
    <>
      {spinner ? (
        <Loader />
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NavigationScreen"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EmailValid"
              component={EmailValid}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OtpValid"
              component={OtpValid}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Newpassword"
              component={Newpassword}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: '#8d98b0',
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconStyle: {
    marginBottom: -5, // adjust this value to align the icon with the text label
  },
});

export default App;
