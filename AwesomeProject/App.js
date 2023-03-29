import React from 'react';
import {StyleSheet} from 'react-native';
import LoginScreen from './src/Screens/Login';
import RegisterScreen from './src/Screens/Register';
import Welcome from './src/Screens/Welcome';
import NavigationScreen from './src/Screens/NavigationScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddTeamMember from './src/Screens/AddTeamMember';
import EditTask from './src/Screens/EditTask';
import ProfileScreen from './src/Screens/ProfileScreen';
import AddTask from './src/Screens/AddTask';
import HomeScreen from './src/Screens/HomeScreen';
import BottomTabNavigator from './src/Screens/BottomTabNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
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
        {/* 
        <Stack.Screen
          name="NavigationScreen"
          component={NavigationScreen}
          options={{headerShown: false}} /> */}

        {/*         

        <Stack.Screen
          name="AddTask"
          component={AddTask}
          options={{headerShown: false}} />

        <Stack.Screen
          name="AddTeamMember"
          component={AddTeamMember}
          options={{headerShown: false}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
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
