// SideMenu.js
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// const router = useRouter();
import { router } from 'expo-router';
import { useMenuVisible } from '../hooks/globalStates';
import { useGlobalStates } from '../hooks/globalStates';
// const nav = useNavigation()




const SCREEN_WIDTH = Dimensions.get('window').width;

const topItems = ['Home', 'Profile', 'Settings'];
const bottomItems = ['Help', 'Log Out'];

export default function SideMenu() {
  // alert(useMenuVisible())
  const [menuVisible, setMenuVisible] = useGlobalStates();
  const visible = true;
  // const visible=true;
  const onClose=()=>{router.back()}
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.menu}>
        {/* X Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        {/* Heading */}
        <Text style={styles.heading}>Menu</Text>

        {/* Top Section */}
        <View style={styles.section}>
          {topItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.item} onPress={()=>{
              // router.push('/Contacts');
              router.push('/contacts');
            }}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Bottom Section */}
        <View style={styles.section}>
          {bottomItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.item, item === 'Log Out' && styles.logoutButton]}
              onPress={item === 'Log Out' ? () => router.back() : null}
            >
              <Text
                style={[styles.itemText, item === 'Log Out' && styles.logoutText]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

// export default SideMenu;

const SCREEN_HEIGHT = Dimensions.get('window').height;
// alert(SCREEN_HEIGHT)

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: "100%",
    paddingBottom: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    zIndex: 1000,
    elevation: 10, // For Android
  },
  menu: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    paddingTop: 60,
    paddingHorizontal: 20,
    position: 'absolute',
    left: 0,
    paddingBottom: 15,
    elevation: 10, // For Android
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 1001,
    elevation: 11, // For Android
  },
  closeText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  section: {
    gap: 20,
  },
  item: {
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#ffe5e5',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
