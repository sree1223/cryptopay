import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Clipboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function Contacts() {
  const defaultContacts = [
    { id: 1, name: 'Alice', evm: '0x8D34fF7c8D2dB093c7eD5D678F91D22123456789', handle: '@alice.eth' },
    { id: 2, name: 'Bob', evm: '0x1234567890ABCDEF1234567890ABCDEF12345678', handle: null },
  ];

  const [contacts, setContacts] = useState([]);
  const [mode, setMode] = useState('list');
  const [editContact, setEditContact] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', evm: '', handle: '' });

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('contacts');
      if (saved) {
        setContacts(JSON.parse(saved));
      } else {
        setContacts(defaultContacts);
      }
    })();
  }, []);

  const persistContacts = async (newContacts) => {
    setContacts(newContacts);
    await AsyncStorage.setItem('contacts', JSON.stringify(newContacts));
  };

  const resetForm = () => {
    setForm({ name: '', evm: '', handle: '' });
    setEditContact(null);
    setMode('list');
    setEditMode(false);
  };

  const isValidEvm = (addr) => addr.startsWith('0x') && addr.length === 42;

  const saveContact = async () => {
    if (!form.name.trim()) return Alert.alert('Name is required');
    if (!form.evm.trim() && !form.handle.trim()) return Alert.alert('Enter at least address or handle');
    if (form.evm && !isValidEvm(form.evm.trim())) return Alert.alert('Invalid EVM address');

    const updated = editContact
      ? contacts.map(c => (c.id === editContact.id ? { ...editContact, ...form } : c))
      : [...contacts, { id: Date.now(), ...form }];

    await persistContacts(updated);
    resetForm();
  };

  const deleteContact = async (id) => {
    const updated = contacts.filter(c => c.id !== id);
    await persistContacts(updated);
  };

  const clearAll = async () => {
    await persistContacts(defaultContacts);
  };

  const copy = (address) => {
    Clipboard.setString(address);
    Alert.alert('Copied', address);
  };

  const startEdit = (contact) => {
    setForm({ name: contact.name, evm: contact.evm || '', handle: contact.handle || '' });
    setEditContact(contact);
    setMode('form');
  };

  if (mode === 'form') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{editContact ? 'Edit Contact' : 'Add Contact'}</Text>
        <TextInput
          placeholder="Name"
          value={form.name}
          onChangeText={(v) => setForm({ ...form, name: v })}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="EVM Address (0x...)"
          value={form.evm}
          onChangeText={(v) => setForm({ ...form, evm: v })}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="Handle (@name.xyz)"
          value={form.handle}
          onChangeText={(v) => setForm({ ...form, handle: v })}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <View style={styles.row}>
          <TouchableOpacity onPress={resetForm} style={styles.cancelBtn}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveContact} style={styles.saveBtn}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  useEffect(()=>{
    // alert(JSON.stringify(router))
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title} onPress={()=>router.push('/tabs/')}>Contacts</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0a0618',
      paddingHorizontal: 20,
      paddingTop: 60,
    },
    title: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
    },
    title2: {
      padding: 10,
      paddingBottom: 20,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      paddingVertical: 10,
      paddingLeft: 20,
      paddingRight: 10,
    },
    scrollList: {
      paddingBottom: 80,
      gap: 14,
    },
    contactCard: {
      backgroundColor: '#5267e3',
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    name: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    subtext: {
      color: '#eee',
      fontSize: 13,
      marginTop: 2,
    },
    input: {
      backgroundColor: '#000e26',
      color: '#fff',
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 10,
      marginBottom: 12,
      borderWidth: 0.5,
      borderColor: '#3370ff',
      marginVertical: 8,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    row2: {
      marginTop: 15,
    },
    cancelBtn: {
      flex: 1,
      backgroundColor: '#636e72',
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    saveBtn: {
      flex: 1,
      backgroundColor: '#5267e3',
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    btnText: {
      color: '#fff',
      fontWeight: '600',
    },
  });
