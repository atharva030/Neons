import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {statusCodes} from 'react-native-google-signin';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
import styles from '../Styles/Welcome';
import {Alert} from 'react-native';
GoogleSignin.configure({
  scopes: ['email'],
  webClientId:
    '461468934097-cfeol86ft1lq1gmsr5iqjsija3fipfp6.apps.googleusercontent.com',
  offlineAccess: true,
});
const Welcome = ({navigation}) => {
  const [user, setUser] = useState(false);
  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      setUser(auth().currentUser);
      //console.log('This is user ', user.email, user.displayName, user.photoURL);
      
      // if (user.email && user.displayName) {
      //   handleNavigation(user);
      // } else {
        
      //   Alert.alert('Please provide your name and Email to continue');
      // }

      if(user == null){
        console.log('try again');
      }else{
        handleNavigation(user);
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
      pass : user.uid,
    });
  };
  return (
    <View style={styles.fullscreen}>
      <View style={[styles.titleView]}>
        <Text style={[styles.title1]}>TaskStack</Text>
        <Text style={[styles.title2]}>Manage{'\n'} your tasks easily</Text>
        <Text style={[styles.title3]}>
          Effortlessly manage your tasks with TaskStack.
        </Text>
      </View>

      <View style={[styles.mainContainer, {flexDirection: 'column'}]}>
        <TouchableOpacity style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.headingText}>Sign in with Google </Text>
            <IonIcon
              name="logo-google"
              size={25}
              color="#6b8cff"
              style={styles.google_logo}></IonIcon>
            <View style={styles.rightIcon}>
              <IonIcon
                name="arrow-forward-outline"
                size={25}
                color="#6b8cff"
                onPress={handleSignIn}
                style={styles.arrow}></IonIcon>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate('Login')}>
          <View style={styles.card}>
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
                color="#6b8cff"
                style={styles.arrow}></IonIcon>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Welcome;
