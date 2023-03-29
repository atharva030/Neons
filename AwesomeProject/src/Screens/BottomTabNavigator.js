import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddTask from './AddTask';
import AddTeamMember from './AddTeamMember';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function BottomTabNavigator() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="AddTask" component={TaskStack} />
        <Tab.Screen name="AddTeamMember" component={AddTeamMember} />
      </Tab.Navigator>
    );
  }

function TaskStack(){
    return(
        <Stack.Navigator>
        <Stack.Screen name="AddTask" component={AddTask} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
             
    </Stack.Navigator>
    );
}


export default BottomTabNavigator;