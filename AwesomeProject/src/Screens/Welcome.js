import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {statusCodes} from 'react-native-google-signin';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
import styles from '../Styles/Welcome';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastComponent from '../Components/Toast/toast';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native';
import googleI from '../../assets/googleI.png';

GoogleSignin.configure({
  scopes: ['email'],

  webClientId:
    '461468934097-cfeol86ft1lq1gmsr5iqjsija3fipfp6.apps.googleusercontent.com',

  offlineAccess: true,
});
const handleSuccess = () => {
  ToastComponent({message: 'Login Sucessfull'});
};

const handleBackendError = () => {
  ToastComponent({message: 'Check your Network'});
};

const Welcome = ({navigation}) => {
  useEffect(() => {
    getUserData();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const data = JSON.parse(userData);

        console.log(data.Signin_Method);
      } else {
        console.log('User data not found in AsyncStorage.');
      }
    } catch (error) {
      console.log('Error while retrieving user data:', error);
    }
  };
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      const currentUser = auth().currentUser;
      console.log('I am outside account');

      setUser(currentUser);

      // console.log('This is user ', currentUser.email, currentUser.uid);
      if (currentUser == null) {
        ToastComponent({message: 'Try Again'});
      } else {
        try {
          if (!currentUser.email || !currentUser.uid) {
            ToastComponent({message: 'Please fill in all fields'});
            return;
          }
          setIsLoading(true);
          const response = await fetch(
            'https://tsk-final-backend.vercel.app/api/auth/login',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: currentUser.email,
                password: currentUser.uid,
              }),
            },
          );

          const data = await response.json();
          console.log(data);
          setIsLoading(false);
          if (!response.ok) {
            navigation.navigate('GuInfo', {
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              pass: user.uid,
              // Signin_Method: user.Signin_Method,
            });
            // ToastComponent({
            //   message: data.error || 'Invalid email or password',
            // });
          } else {
            // Login successful, perform any necessary actions (e.g., store user data, navigate to next screen)
            await AsyncStorage.setItem(
              'user',
              JSON.stringify({
                authToken: data.authToken,
                userRole: data.userRole,
                userName: data.userName,
                userDes: data.designation,
                photoUrl: data.photoUrl,
                email: currentUser.email,
                Signin_Method: data.Signin_Method,
              }),
            );
            // console.log('this is the methdoe ', Signin_Method);
            handleSuccess();
            navigation.navigate('NavigationScreen');
          }
        } catch (error) {
          setIsLoading(false);
          console.log(error);
          handleBackendError();
        }
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign-in flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in operation is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services not available or outdated');
      } else {
        console.log(
          'Something went wrong with Google Sign-In: ',
          error.message,
        );
      }
    }
  };

  const handleSignUp = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      const currentUser = auth().currentUser;
      setUser(currentUser);
      console.log(
        'This is user ',
        currentUser.email,
        currentUser.displayName,
        currentUser.photoURL,
        currentUser.uid,
      );

      if (currentUser.email == null) {
        Alert.alert('Please provide your name and Email to continue');
      } else {
        handleNavigation(currentUser);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign-in flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in operation is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services not available or outdated');
      } else {
        console.log(
          'Something went wrong with Google Sign-In: ',
          error.message,
        );
      }
    }
  };

  const handleNavigation = user => {
    navigation.navigate('GuInfo', {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      pass: user.uid,
    });
  };

  return (
    <View style={styles.fullscreen}>
      <LinearGradient
        colors={['#1e010b', '#001314']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={{height: '100%'}}>
        <View>
          <View style={[styles.titleView]}>
            <Text style={[styles.title1]}>TaskStack</Text>
            <Text style={[styles.title2]}>Manage{'\n'} your tasks easily</Text>
            <Text style={[styles.title3]}>
              Effortlessly manage your tasks with TaskStack.
            </Text>
          </View>
          <View style={[styles.mainContainer, {flexDirection: 'column'}]}>
            <TouchableOpacity style={styles.container} onPress={handleSignIn}>
              <LinearGradient
                colors={['#140d13', '#0a1a1b']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                style={styles.card}>
                <Text style={styles.headingText}>Sign in with Google </Text>
                {/* <IonIcon
                  name="logo-google"
                  size={25}
                  color="#6b8cff"
                  style={styles.google_logo}></IonIcon> */}
                <Image source={googleI} style={styles.google_logo}/>

                <View style={styles.rightIcon}>
                  <IonIcon
                    name="arrow-forward-outline"
                    size={25}
                    color="#70686a"
                    // onPress={handleSignIn}
                    style={styles.arrow}></IonIcon>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.container} onPress={handleSignUp}>
              <LinearGradient
                colors={['#140d13', '#0a1a1b']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                style={styles.card}>
                <Text style={styles.headingText}>Sign Up with Google </Text>
                <IonIcon
                  name="logo-google"
                  size={25}
                  color="#6b8cff"
                  style={styles.google_logo}></IonIcon>
                <View style={styles.rightIcon}>
                  <IonIcon
                    name="arrow-forward-outline"
                    size={25}
                    color="#70686a"
                    onPress={handleSignUp}
                    style={styles.arrow}></IonIcon>
                </View>
              </LinearGradient>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.container}
              onPress={() => navigation.navigate('Login')}>
              <LinearGradient
                colors={['#140d13', '#0a1a1b']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                style={styles.card}>
                <Text style={styles.headingText}>Sign in with Email</Text>
                <IonIcon
                  name="mail-outline"
                  size={25}
                  color="#6b8cff"
                  style={styles.email_logo}></IonIcon>
                <View style={styles.rightIcon}>
                  <IonIcon
                    name="arrow-forward-outline"
                    size={25}
                    color="#70686a"
                    style={styles.arrow}></IonIcon>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};
export default Welcome;
