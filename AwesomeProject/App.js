import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/Screens/Login';
import RegisterScreen from './src/Screens/Register';
import Welcome from './src/Screens/Welcome';
import EmailValid from './src/Components/ForgotPassword/EmailValid';
import OtpValid from './src/Components/ForgotPassword/OtpValid';
import Newpassword from './src/Components/ForgotPassword/Newpassword';
import BottomTabNavigator from './src/Screens/BottomTabNavigator';
import Loader from './src/Screens/Loader';
import TaskState from './src/Context/taskState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GuInfo from './src/Screens/GuInfo';
import MyComponent from './src/Screens/MyComponent';
import Register1 from './src/Screens/Register1';
const Stack = createNativeStackNavigator();

const App = () => {
  const [spinner, setSpinner] = useState(true);
  const [initialScreen, setInitialScreen] = useState('Welcome');

  useEffect(() => {
    const loaderEffect = () => {
      setTimeout(() => {
        setSpinner(false);
      }, 500);
    };

    loaderEffect();
  }, []);

  const checkAuthToken = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const data = JSON.parse(userData);
        return data.authToken;
      }
      return null;
    } catch (error) {
      console.log('Error checking auth token:', error);
      return null;
    }
  };

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      const authToken = await checkAuthToken();
      if (authToken) {
        setInitialScreen('NavigationScreen'); // Set the initial screen to NavigationScreen
      } else {
        setInitialScreen('Welcome'); // Set the initial screen to Welcome
      }
    };

    checkAuthAndNavigate();
  }, []);

  return (
    <TaskState>
      <NavigationContainer>
        {spinner ? (
          <Loader />
        ) : (
          <Stack.Navigator initialRouteName={initialScreen}>
            {/* <Stack.Screen
              name="Onbording"
              component={Onbording}
              options={{ headerShown: false }}
            /> */}
            {/* <Stack.Screen
            name="Welcome"
            component={MyComponent}
            options={{headerShown: false}}
            /> */}
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="GuInfo"
              component={GuInfo}
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
              name="Register1"
              component={Register1}
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
        )}
      </NavigationContainer>
    </TaskState>
  );
};

export default App;
