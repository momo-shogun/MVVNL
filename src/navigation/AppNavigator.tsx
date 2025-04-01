import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screen/DashboardScreen';
import PunchScreen from '../screen/PunchScreen';
import SearchScreen from '../screen/SearchScreen';
import RegistrationScreen from '../screen/RegistrationScreen';
import { Image } from 'react-native';
import loginScreen from '../screen/LoginScreen';
import LoginScreen from '../screen/LoginScreen';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type RootStackParamList = {
  Dashboard: undefined;
  Punch: undefined;
  Search: undefined;
  Registration: undefined;
  Login: undefined;
};

export type ProfileScreenNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Dashboard'>;
export type PunchScreenNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Punch'>;
export type SearchScreenNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Search'>;
export type RegistrationScreenNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Registration'>;
export type LoginScreenNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Login'>;

const Tab = createBottomTabNavigator<RootStackParamList>();

const TabIcon = ({ color, size, path }: { color: string; size: number; path: any }) => (
  <Image source={path} style={{ width: size, height: size, tintColor: color }} />
);

function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon color={color} size={size} path={require('../assets/dashboard.png')} />
          ),
          headerShown: false,
        }}
      />
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