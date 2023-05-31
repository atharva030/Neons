import { showMessage } from 'react-native-flash-message';

export const showBackendErrorToast = (errorMessage) => {
  showMessage({
    message: errorMessage,
    type: 'danger',
    icon: 'auto',
    duration: 3000,
    floating: true,
    position: 'top',
  });
};
