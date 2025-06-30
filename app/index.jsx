import { Feather } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// import { router } from 'expo-router';
import { useGlobalStates } from '../hooks/globalStates';


const walletAddress = '1A2b...3C4d';

const coins = [
  { name: 'Bitcoin', symbol: 'BTC', balance: '0.01000000', usd: '$0.00', icon: 'dollar-sign' },
  { name: 'Ethereum', symbol: 'ETH', balance: '0.00000000', usd: '$0.00', icon: 'layers' },
  { name: 'Solana', symbol: 'SOL', balance: '0.00000000', usd: '$0.00', icon: 'cpu' },
  { name: 'Cardano', symbol: 'ADA', balance: '0.00000000', usd: '$0.00', icon: 'aperture' },
  { name: 'Ripple', symbol: 'XRP', balance: '0.00000000', usd: '$0.00', icon: 'activity' },
];

// const router = useRouter();


export default function App() {
  const {menuVisible, setMenuVisible} = useGlobalStates();
  // alert(JSON.stringify(MenuProvider.visible))

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     router.push('/SideMenu');
  //   },1000)
  // },[])

  const copyAddress = () => {
    Alert.alert('Copied', `Wallet address: ${walletAddress}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.coinItem}>
      <View style={styles.coinLeft}>
        <View style={styles.iconBox}>
          <Feather name={item.icon} size={20} color="#A8A8F0" />
        </View>
        <View>
          <Text style={styles.coinName}>{item.name}</Text>
          <Text style={styles.coinBalance}>{item.balance}</Text>
        </View>
      </View>
      <Text style={styles.coinUsd}>{item.usd}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} >
      {/* <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} /> */}
      <Stack.Screen options={{ title: 'Wallet', headerShown: false }} />
      <View style={styles.headerRow}>
        <TouchableOpacity  style={styles.menuButton} onPress={()=>{
          // setMenuVisible(true);
          // router.push({
          //   pathname: '/SideMenu',
          //   params: { name: 'Alice', age: 30 },
          // });
          setMenuVisible(true)
          // alert(true)
        }}>
          <Feather name="menu" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Web3 Pay 🪙</Text>
      </View>

      {/* Copy Wallet Address */}
      <View style={styles.rowBetween}>
        <Text style={styles.subText}>Copy address</Text>
        <TouchableOpacity onPress={copyAddress} style={styles.copyButton}>
          <Text style={styles.copyText}>{walletAddress}</Text>
        </TouchableOpacity>
      </View>

      {/* Send / Receive Buttons */}
      <View style={styles.rowButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.sendButton]} onPress={()=>{
          // setMenuVisible(true);
          router.push({
            pathname: '/send',
          })
          //   params: { name: 'Alice', age: 30 },
          // });
        }} >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.receiveButton]}>
          <Text style={styles.buttonText} onPress={()=>{
          // setMenuVisible(true);
          router.push({
            pathname: '/receive',
          })
          //   params: { name: 'Alice', age: 30 },
          // });
        }}>Receive</Text>
        </TouchableOpacity>
      </View>

      {/* Asset List */}
      <Text style={styles.sectionTitle}>Your assets</Text>
      <FlatList
        data={coins}
        keyExtractor={(item) => item.symbol}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
    paddingHorizontal: 20,
    paddingTop: 60,
    // paddingLeft:50,
    // paddingRight:50,
    // display: "hidden"
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  subText: {
    color: '#aaa',
    fontSize: 14,
  },
  copyButton: {
    backgroundColor: '#1E1E3A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  copyText: {
    color: '#A0A0F8',
    fontSize: 14,
  },
  rowButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: '#5A5AFD',
  },
  receiveButton: {
    backgroundColor: '#1E1E3A',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  coinItem: {
    backgroundColor: '#161628',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coinLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBox: {
    backgroundColor: '#20204A',
    padding: 8,
    borderRadius: 10,
    marginRight: 10,
  },
  coinName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  coinBalance: {
    color: '#aaa',
    fontSize: 13,
  },
  coinUsd: {
    color: '#fff',
    fontWeight: '500',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 5,
  },
  menuButton: {
    marginRight: 20,
    padding: 4,
  }
});
