import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../Styles/Welcome';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Welcome = ({navigation}) => {
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
        <TouchableOpacity
          style={styles.container}
          onPress={() => console.warn('Sign IN with Google')}>
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
                style={styles.arrow}></IonIcon>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.container}
          onPress={() => console.warn('Sign IN with facebook')}>
          <View style={styles.card}>
            <Text style={styles.headingText}>Sign in with facebook </Text>
            <IonIcon
              name="logo-facebook"
              size={25}
              color="#6b8cff"
              style={styles.facebook_logo}></IonIcon>

            <View style={styles.rightIcon}>
              <IonIcon
                name="arrow-forward-outline"
                size={25}
                color="#6b8cff"
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
