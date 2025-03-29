import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screen/DashboardScreen';
import PunchScreen from '../screen/PunchScreen';
import SearchScreen from '../screen/SearchScreen';
import RegistrationScreen from '../screen/RegistrationScreen';
import { Image } from 'react-native';

type RootStackParamList = {
  Dashboard: undefined;
  Punch: undefined;
  Search: undefined;
  Registration: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const TabIcon = ({ color, size, path }: { color: string; size: number; path: any }) => (
  <Image source={path} style={{ width: size, height: size, tintColor: color }} />
);

function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon color={color} size={size} path={require('../assets/dashboard.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Punch"
        component={PunchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon color={color} size={size} path={require('../assets/punch.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon color={color} size={size} path={require('../assets/search.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon color={color} size={size} path={require('../assets/registration.png')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;