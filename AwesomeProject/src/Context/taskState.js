import React from "react";
import TaskContext from "./taskContext";
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const TaskState = ({ children ,navigation}) => {
    // const navigation = useNavigation();

    const handleLogin = (email, password) => {
      console.log("From the context API", email, password);
    
      return fetch('https://tsk-final-backend.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(async data => {
          console.log(data.authToken);
          await AsyncStorage.setItem('auth-token', data.authToken);
          console.log('Next');
          // navigation.navigate('NavigationScreen');
          return true; // Resolve the promise with true
        })
        .catch(err => {
          console.log(err);
          return false; // Resolve the promise with false
        });
    };
    
    
  return (
    <TaskContext.Provider value={{handleLogin}}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskState;
