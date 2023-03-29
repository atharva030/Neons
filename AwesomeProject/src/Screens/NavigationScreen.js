import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {StyleSheet} from 'react-native';
import AddTask from './AddTask';
import {BottomNavigation, Text} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';


import HomeScreen from './HomeScreen';
import RegisterScreen from './Register';
// import Welcome from './src/Screens/Welcome';
// import Landing from './src/Screens/Landing';
import MemberSelect from './AddTeamMember';
import AddTeamMember from './AddTeamMember';
import ProfileScreen from './ProfileScreen';

const Navigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    // {key: 'LoginScreen', title: 'Login'},
    {key: 'HomeScreen', title: 'Home'},
    {key: 'AddTask', title: 'Add Task'},
    {key: 'AddTeamMember', title: 'Add Team'},
    {key: 'ProfileScreen', title: 'Profile'}
  ]);

  const renderIcon = ({route, color, focused}) => {
    let iconName;

    switch (route.key) {
      case 'AddTeamMember':
        iconName = focused ? 'account' : 'account-outline';
        break;
      case 'LoginScreen':
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
    AddTeamMember: AddTeamMember,
    RegisterScreen: RegisterScreen,
    HomeScreen: HomeScreen,
    ProfileScreen: ProfileScreen,
    // MemberSelect: MemberSelect,
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
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: '#8d98b0',
    height: 70,
  },
  iconStyle: {
    marginBottom: -5, // adjust this value to align the icon with the text label
  },
});

export default Navigation;
