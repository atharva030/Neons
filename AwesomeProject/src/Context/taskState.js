import React from "react";
import TaskContext from "./taskContext";
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const TaskState = ({ children ,navigation}) => {
    // const navigation = useNavigation();

    const handleLogin = async (email, password) => {
      console.log("From the context API", email, password);
    
      try {
        const response = await fetch('https://tsk-final-backend.vercel.app/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.authToken);
        await AsyncStorage.setItem('auth-token', data.authToken);
        console.log('Next');
        return await true;
      } catch (err) {
        console.log(err);
        return false;
      }
    };
    
    
  return (
    <TaskContext.Provider value={{handleLogin}}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskState;
