import { showMessage } from 'react-native-flash-message';
const Toast = ({ type, message, description }) => {
    const showToast = () => {
      showMessage({
        message: message,
        description: description,
        type: type,
        icon: 'auto',
        duration: 3000,
        floating: true,
        position: 'top',
      });
    };
  
    return null;
  };
  export default Toast;
