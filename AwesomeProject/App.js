import React, { useState, useEffect } from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/Screens/Login';
import RegisterScreen from './src/Screens/Register';
import Welcome from './src/Screens/Welcome';
// import NavigationScreen from './src/Screens/NavigationScreen';
import {NavigationContainer} from '@react-navigation/native';
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
import TaskContext from './src/Context/taskContext';
import Context from './src/Screens/Context';
const Stack = createNativeStackNavigator();

const App = () => {
  const [spinner, setSpinner] = useState(true)
  
  const loaderEffect = () => {
    setTimeout(() => {
      setSpinner(false)
    }, 500);
    // setSpinner(false)
  }

  useEffect(() => {
    loaderEffect();
  }, [])

  return (
    <TaskContext>
      {/* {spinner ? <Loader/> :
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NavigationScreen"
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EmailValid"
            component={EmailValid}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OtpValid"
            component={OtpValid}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Newpassword"
            component={Newpassword}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer> */}
      {/* } */}
      <Context/>
    </TaskContext>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: '#8d98b0',
    height: 70,
    borderTopLeftRadius:20,
    borderTopRightRadius: 20,
  },
  iconStyle: {
    marginBottom: -5, // adjust this value to align the icon with the text label
  },
});

export default App;