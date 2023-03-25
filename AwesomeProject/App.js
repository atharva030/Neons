import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {StyleSheet} from 'react-native';
import HomeScreen from './src/Screens/HomeScreen';
import AddTask from './src/Screens/AddTask';
import LoginScreen from './src/Screens/Login';
import {BottomNavigation, Text} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RegisterScreen from './src/Screens/Register';
import Welcome from './src/Screens/Welcome';
import Landing from './src/Screens/Landing';

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'LoginScreen', title: 'Login'},
    {key: 'RegisterScreen', title: 'Register'},
    {key: 'AddTask', title: 'Add Task'},
    {key: 'HomeScreen', title: 'Home'},
  ]);

  const renderIcon = ({route, color, focused}) => {
    let iconName;

    switch (route.key) {
      case 'LoginScreen':
        iconName = focused ? 'account' : 'account-outline';
        break;
      case 'RegisterScreen':
        iconName = focused ? 'account-edit' : 'account-edit-outline';
        break;
      case 'AddTask':
        iconName = focused ? 'plus-circle' : 'plus-circle-outline';
        break;
      case 'HomeScreen':
        iconName = focused ? 'home' : 'home-outline';
        break;
    }

    return (
      <Icon name={iconName} size={20} color={color} style={styles.iconStyle} />
    );
  };

  const renderScene = BottomNavigation.SceneMap({
    AddTask: AddTask,
    LoginScreen: LoginScreen,
    RegisterScreen: RegisterScreen,
    HomeScreen: HomeScreen,
  });

  return (
    <SafeAreaProvider>
      <BottomNavigation
        barStyle={styles.barStyle}
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderIcon={renderIcon}
        renderScene={renderScene}
      />
      {/* <Welcome/> */}
      {/* <Landing/> */}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: '#8d98b0',
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconStyle: {
    marginBottom: -5, // adjust this value to align the icon with the text label
  },
});

export default App;
