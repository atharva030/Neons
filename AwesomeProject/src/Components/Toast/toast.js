import React from 'react';
import { ToastAndroid } from 'react-native';

const ToastComponent = ({ message }) => {
  const showToast = () => {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.TOP);
  };

  return showToast();
};

export default ToastComponent;
