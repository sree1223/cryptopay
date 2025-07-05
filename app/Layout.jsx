import { Ionicons } from '@expo/vector-icons';
import { Stack, router, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGlobalStates } from '../hooks/globalStates';
// import Wrapper from './_layout';
import { BlurView } from 'expo-blur';
import TransactionSigner from './TransactionSigner';

// </BlurView>
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function Layout() {
  const pathname = usePathname();
  // console.log(useGlobalStates())
  const {menuVisible, setMenuVisible} = useGlobalStates();
  const [screen_width,setWidth] = useState(0);
  const [screen_height,setHeight] = useState(0);
    
  // console.log("✅ Context from layout:");
  useEffect(()=>{
    // alert("menuVisible-"+menuVisible)
    setHeight(menuVisible?SCREEN_HEIGHT:0)
    setWidth(menuVisible?SCREEN_WIDTH:0)
  },[menuVisible])
  // <Wrapper>
  // <AppProvider>
  return (
    <View style={{ flex: 1, overflow:"scroll" }}>
      <BlurView
        intensity={50}
        tint="dark"
        // style={{
        //   position: 'absolute',
        //   width: screen_width,
        //   height: screen_height,
        //   zIndex: 90,
        // }}
        onPress={()=>{setMenuVisible(false)}} style={{display:menuVisible?"flex":"none",width:menuVisible?screen_width:0,height:screen_height-10,elevated: 10,zIndex:10,position:"absolute",left:"0",backgroundColor:"#fff3"}}>
          <Pressable onPress={()=>{setMenuVisible(false)}} style={{width:menuVisible?screen_width:0,height:screen_height ,position:"absolute",left:"0",backgroundColor:""}}>
          </Pressable>
          <View onPress={()=>{e.preventDefault();setMenuVisible(true)}} style={{padding:10,paddingTop:60,width:menuVisible?300:0,height:screen_height-10 ,zIndex:100,elevated: 100,position:"absolute",left:"0",backgroundColor:"#222"}}>
            <Text style={{color:"white",paddingLeft:30,fontSize:30}}>Menu</Text>
          </View>
      </BlurView>
    {/* <SafeAreaView styles={styles.safe}> */}
    {/* <ScrollView contentContainerStyle={{ flexGrow: 1}}> */}

    <Stack screenOptions={{ headerShown: false,
        animation: 'none',
      }} />
      <TransactionSigner />
      {/* </ScrollView> */}
    {/* </SafeAreaView> */}

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
// </AppProvider>
// </Wrapper>

function TabButton({ label, icon, onPress, active }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabButton}>
      <Ionicons name={icon} size={22} color={active ? '#a374d1' : '#aaa'} />
      <Text style={[styles.label, active && { color: '#a374d1' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

// function Wrapper({children}) {
//     return <AppProvider>
//         {children}
//     </AppProvider>
// }

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
  safe: {
    flex: 1,
    backgroundColor: '#0a0618', // consistent dark bg
  },
});
