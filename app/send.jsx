import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as BarCodeScanner from 'expo-barcode-scanner';

export default function SendScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Load contacts from storage
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('contacts');
      if (saved) {
        const parsedContacts = JSON.parse(saved);
        setContacts(parsedContacts);
        setFilteredContacts(parsedContacts);
      }
    })();

    // Request camera permission
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Filter contacts based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (contact.handle && contact.handle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (contact.evm && contact.evm.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredContacts(filtered);
    }
  }, [searchQuery, contacts]);

  const handleQRScan = async () => {
    if (hasPermission === false) {
      Alert.alert('Permission required', 'Camera access is needed to scan QR codes');
      return;
    }

    router.push({
      pathname: '/qr-scanner',
      params: { returnScreen: 'send' }
    });
  };

  const handleContactSelect = (contact) => {
    router.push({
      pathname: '/send-amount',
      params: { 
        recipient: contact.name,
        address: contact.evm || contact.handle 
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Send Crypto</Text>
        <View style={{ width: 24 }} /> {/* Spacer for alignment */}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts or paste address"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={handleQRScan} style={styles.qrButton}>
          <Ionicons name="qr-code" size={24} color="#a374d1" />
        </TouchableOpacity>
      </View>

      {/* Contacts List */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.contactItem} 
            onPress={() => handleContactSelect(item)}
          >
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{item.name}</Text>
              {item.handle && <Text style={styles.contactHandle}>{item.handle}</Text>}
              {item.evm && (
                <Text style={styles.contactAddress}>
                  {item.evm.slice(0, 6)}...{item.evm.slice(-4)}
                </Text>
              )}
            </View>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchQuery ? 'No matching contacts found' : 'No contacts available'}
          </Text>
        }
        contentContainerStyle={styles.listContent}
      />

      {/* Manual Address Entry Option */}
      <TouchableOpacity 
        style={styles.manualEntry}
        onPress={() => router.push('/send-amount')}
      >
        <Text style={styles.manualEntryText}>Enter address manually</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0a0618',
      paddingHorizontal: 16,
      paddingTop: 60,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1a1a2e',
      borderRadius: 10,
      paddingHorizontal: 12,
      marginBottom: 20,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      color: '#fff',
      paddingVertical: 12,
    },
    qrButton: {
      padding: 8,
    },
    listContent: {
      paddingBottom: 20,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#1a1a2e',
    },
    contactInfo: {
      flex: 1,
    },
    contactName: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 4,
    },
    contactHandle: {
      color: '#a374d1',
      fontSize: 14,
    },
    contactAddress: {
      color: '#aaa',
      fontSize: 14,
    },
    emptyText: {
      color: '#aaa',
      textAlign: 'center',
      marginTop: 40,
    },
    manualEntry: {
      padding: 16,
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#1a1a2e',
    },
    manualEntryText: {
      color: '#a374d1',
      fontWeight: '500',
    },
  });