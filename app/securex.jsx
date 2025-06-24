import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export default function SecureDemoScreen() {
  const [data, setData] = useState(null);

  const storeSecret = async () => {
    await SecureStore.setItemAsync('secretData', 'my_secret_token_123');
    Alert.alert('Stored', 'Secret has been saved securely.');
  };

  const unlockAndRead = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const supported = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !enrolled) {
      Alert.alert('Error', 'Biometric authentication is not available.');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to access secret',
      fallbackLabel: 'Use Passcode',
    });

    if (result.success) {
      const value = await SecureStore.getItemAsync('secretData');
      setData(value);
    } else {
      Alert.alert('Failed', 'Authentication failed.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={storeSecret}>
        <Text style={styles.text}>🔐 Store Secret</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={unlockAndRead}>
        <Text style={styles.text}>🔓 Unlock with Biometrics</Text>
      </TouchableOpacity>

      {data && <Text style={styles.result}>Secret: {data}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0618' },
  btn: {
    backgroundColor: '#5267e3',
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
    width: 250,
    alignItems: 'center',
  },
  text: { color: '#fff', fontSize: 16, fontWeight: '600' },
  result: { marginTop: 20, color: '#b4a9ff', fontSize: 15 },
});
