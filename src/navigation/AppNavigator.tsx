import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screen/DashboardScreen';
import PunchScreen from '../screen/PunchScreen';
import SearchScreen from '../screen/SearchScreen';
import RegistrationScreen from '../screen/RegistrationScreen';

type RootStackParamList = {
  Dashboard: undefined;
  Punch: undefined;
  Search: undefined;
  Registration: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarIcon: ({ color }) => (<DashboardIcon color={color} />) }} />
      <Tab.Screen name="Punch" component={PunchScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Registration" component={RegistrationScreen} />
    </Tab.Navigator>
  );
}

export default AppNavigator;