import { Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useGlobalStates } from '../hooks/globalStates';

const DEFAULT_CHAINS = [
  { id: 'eth', name: 'Ethereum', icon: 'logo-react' },
  { id: 'arb', name: 'Arbitrum', icon: 'logo-react' },
  { id: 'base', name: 'Base', icon: 'layers' },
  { id: 'monad', name: 'Monad', icon: 'logo-nodejs' },
];

const walletAddress = '1A2b...3C4d';

const coins = [
  { name: 'Bitcoin', symbol: 'BTC', balance: '0.01000000', usd: '$0.00', icon: 'dollar-sign' },
  { name: 'Ethereum', symbol: 'ETH', balance: '0.00000000', usd: '$0.00', icon: 'layers' },
  { name: 'Solana', symbol: 'SOL', balance: '0.00000000', usd: '$0.00', icon: 'cpu' },
  { name: 'Cardano', symbol: 'ADA', balance: '0.00000000', usd: '$0.00', icon: 'aperture' },
  { name: 'Ripple', symbol: 'XRP', balance: '0.00000000', usd: '$0.00', icon: 'activity' },
];

export default function App() {
  const { menuVisible, setMenuVisible } = useGlobalStates();
  const [currentChain, setCurrentChain] = useState(DEFAULT_CHAINS[0]);
  const [chains, setChains] = useState(DEFAULT_CHAINS);
  const [showChainModal, setShowChainModal] = useState(false);
  const [newChainName, setNewChainName] = useState('');
  const [newChainId, setNewChainId] = useState('');

  
  const { showSigningRequest } = useGlobalStates();

  const initiateTransaction = () => {
    const txData = {
      contractAddress: '0x...',
      functionName: 'transfer',
      // other transaction details
    };
    showSigningRequest(txData);
  };

  useEffect(() => {
    const loadChains = async () => {
      try {
        const savedChains = await AsyncStorage.getItem('chains');
        const savedCurrentChain = await AsyncStorage.getItem('currentChain');
        
        if (savedChains) {
          setChains(JSON.parse(savedChains));
        }
        
        if (savedCurrentChain) {
          setCurrentChain(JSON.parse(savedCurrentChain));
        }
      } catch (error) {
        console.error('Error loading chains:', error);
      }
    };
    
    loadChains();
  }, []);

  const saveCurrentChain = async (chain) => {
    setCurrentChain(chain);
    try {
      await AsyncStorage.setItem('currentChain', JSON.stringify(chain));
    } catch (error) {
      console.error('Error saving current chain:', error);
    }
    setShowChainModal(false);
  };

  const addNewChain = async () => {
    if (!newChainName || !newChainId) return;
    
    const newChain = {
      id: newChainId.toLowerCase(),
      name: newChainName,
      icon: 'link' // Default icon
    };
    
    const updatedChains = [...chains, newChain];
    setChains(updatedChains);
    
    try {
      await AsyncStorage.setItem('chains', JSON.stringify(updatedChains));
      setNewChainName('');
      setNewChainId('');
    } catch (error) {
      console.error('Error saving new chain:', error);
    }
  };

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
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Wallet', headerShown: false }} />
      
      {/* Header with Chain Selector */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
          <Feather name="menu" size={32} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.chainSelector}
          onPress={() => setShowChainModal(true)}
        >
          <Ionicons name={currentChain.icon} size={20} color="#a374d1" />
          <Text style={styles.chainText}>{currentChain.name}</Text>
          <Ionicons name="chevron-down" size={16} color="#a374d1" />
        </TouchableOpacity>
      </View>

      {/* Wallet Address */}
      <View style={styles.rowBetween}>
        <Text style={styles.subText}>Copy address</Text>
        <TouchableOpacity onPress={copyAddress} style={styles.copyButton}>
          <Text style={styles.copyText}>{walletAddress}</Text>
        </TouchableOpacity>
      </View>

      {/* Send / Receive Buttons */}
      <View style={styles.rowButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.sendButton]}
          onPress={() => {
            initiateTransaction();
            // router.push('/send')
          }}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.receiveButton]}
          onPress={() => router.push('/receive')}
        >
          <Text style={styles.buttonText}>Receive</Text>
        </TouchableOpacity>
      </View>

      {/* Asset List */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your assets</Text>
        <Text style={styles.chainIndicator}>on {currentChain.name}</Text>
      </View>
      <FlatList
        data={coins}
        keyExtractor={(item) => item.symbol}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      {/* Chain Selection Modal */}
      <Modal
        visible={showChainModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowChainModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Network</Text>
            
            {/* Chain List */}
            <FlatList
              data={chains}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable 
                  style={styles.chainItem}
                  onPress={() => saveCurrentChain(item)}
                >
                  <Ionicons name={item.icon} size={24} color="#a374d1" />
                  <Text style={styles.chainItemText}>{item.name}</Text>
                  {item.id === currentChain.id && (
                    <Ionicons name="checkmark" size={20} color="#4ade80" />
                  )}
                </Pressable>
              )}
              style={styles.chainList}
            />
            
            {/* Add New Chain */}
            <View style={styles.addChainContainer}>
              <Text style={styles.addChainTitle}>Add Custom Network</Text>
              <TextInput
                style={styles.input}
                placeholder="Chain Name"
                placeholderTextColor="#aaa"
                value={newChainName}
                onChangeText={setNewChainName}
              />
              <TextInput
                style={styles.input}
                placeholder="Chain ID"
                placeholderTextColor="#aaa"
                value={newChainId}
                onChangeText={setNewChainId}
              />
              <TouchableOpacity 
                style={styles.addButton}
                onPress={addNewChain}
              >
                <Text style={styles.buttonText}>Add Network</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowChainModal(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
    paddingHorizontal: 20,
    paddingTop: 60,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  chainIndicator: {
    color: '#a374d1',
    fontSize: 14,
    marginLeft: 8,
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
  },
  chainSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E3A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 15,
    flex: 1,
    justifyContent: 'space-between',
    maxWidth: 200,
    marginLeft:"auto",
  },
  chainText: {
    color: '#fff',
    marginHorizontal: 8,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  chainList: {
    maxHeight: 200,
    marginBottom: 20,
  },
  chainItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#0f0f1a',
    borderRadius: 10,
    marginBottom: 8,
  },
  chainItemText: {
    color: '#fff',
    flex: 1,
    marginLeft: 12,
  },
  addChainContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  addChainTitle: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#0f0f1a',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  addButton: {
    backgroundColor: '#5267e3',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  closeButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
});