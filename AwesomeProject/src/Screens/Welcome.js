import { Text, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import styles from '../Styles/Welcome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { GoogleSignin } from 'react-native-google-signin';


class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null, // set initial state value to null
    };
  }

  async componentDidMount() {
    await GoogleSignin.configure({
      scopes: ['email'],
      webClientId: '<your-web-client-id>',
    });
  }

  handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ user: userInfo }); // update state with user info
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // login already in progress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error occurred
      }
    }
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.fullscreen}>
        <View style={[styles.titleView]}>
          <Text style={[styles.title1]}>TaskStack</Text>
          <Text style={[styles.title2]}>Manage{'\n'} your tasks easily</Text>
          <Text style={[styles.title3]}>
            Effortlessly manage your tasks with TaskStack.
          </Text>
        </View>

        <View style={[styles.mainContainer, { flexDirection: 'column' }]}>
          <TouchableOpacity
            style={styles.container}
            onPress={this.handleSignIn} >
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
  }
}

export default Welcome;
