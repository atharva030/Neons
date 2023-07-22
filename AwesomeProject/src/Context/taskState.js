import React from "react";
import TaskContext from "./taskContext";
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const TaskState = ({ children, navigation }) => {

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
      return true;
    } catch (err) {
      // console.log);
      return err;
    }
  };

  const handleSubmitRegister = async (name, email, password, phone, role, cnfpassword,selectedDesignation) => {
    
    try {
      console.log("This is from taskstack",name, email, password, phone, role,cnfpassword);
      if (password === cnfpassword) {
        // setSpinner(true);
        const response = await fetch('https://tsk-final-backend.vercel.app/api/auth/createuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            userRole: role,
            password: password,
            designation:selectedDesignation
          }),
        });
  
        const res = await response.json();
        console.log(res);
        // await AsyncStorage.setItem('auth-token', res.authToken);
        // const auth = await AsyncStorage.getItem('auth-token');
        // console.log(auth);

        return true;
      } else {
        console.log('Password Not Matched');
        return false;
      }
    } catch (error) {
      console.error(error);
      // handleBackendError()
      return false;
    }
  };
  
  return (
    <TaskContext.Provider value={{ handleLogin,handleSubmitRegister }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskState;
