import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-reanimated';
import ContactsScreen from './contacts';
import HomeScreen from './index';
import SideMenu from './SideMenu';
import SecureX from './securex';


const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F0F1A',
          borderTopColor: 'transparent',
        },
        tabBarActiveTintColor: '#5A5AFD',
        tabBarInactiveTintColor: '#aaa',
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Feather.glyphMap = 'circle';

          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'Settings') iconName = 'settings';

          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="SideMenu" >
        {()=><SideMenu visible={true} onClose={() => {}}/>}
      </Tab.Screen>
      <Tab.Screen name="SecureX" component={SecureX} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: '#0F0F1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
};