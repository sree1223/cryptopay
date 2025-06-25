import { Stack, router, usePathname } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  const pathname = usePathname();

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false,
        animation: 'none', // 👈 disables transition animations
      }} />

      {/* Bottom Bar */}
      <View style={styles.tabBar}>
        <TabButton
          label="Home"
          icon="home-outline"
          active={pathname === '/'}
          onPress={() => router.push('/')}
        />
        <TabButton
          label="Contacts"
          icon="people-outline"
          active={pathname === '/contacts'}
          onPress={() => router.push('/contacts')}
        />
        <TabButton
          label="SecureX"
          icon="lock-closed-outline"
          active={pathname === '/securex'}
          onPress={() => router.push('/securex')}
        />
      </View>
    </View>
  );
}

function TabButton({ label, icon, onPress, active }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabButton}>
      <Ionicons name={icon} size={22} color={active ? '#a374d1' : '#aaa'} />
      <Text style={[styles.label, active && { color: '#a374d1' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#0a0618',
    borderTopWidth: 0.5,
    borderTopColor: '#333',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
  },
  tabButton: {
    alignItems: 'center',
  },
  label: {
    color: '#aaa',
    fontSize: 11,
    marginTop: 2,
  },
});
