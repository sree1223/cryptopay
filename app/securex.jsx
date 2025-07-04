import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as KeyChain from 'react-native-keychain';

export default function Secure() {
  const [data, setData] = useState(null);

  const storeSecret = async () => {
    await SecureStore.setItemAsync('secretData', 'my_secret_token_123');
    try{
      await KeyChain.setGenericPassword("username","password"
        // {
        //   accessible:KeyChain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        //   securityLevel:KeyChain.SECURITY_LEVEL.SECURE_HARDWARE,
        //   storage:KeyChain.STORAGE_TYPE.RSA,
        //   authenticationPrompt: {
        //     "title": "Authenticate to retrieve secret",
        //     "cancel": "Cancel"
        //   }
        // }
      );
    }catch(e){
      alert(e);
    }
    // Alert.alert('Stored', 'Secret has been saved securely.');
  };
  // useEffect(()=>{
  //   (async()=>{
  //   try{
  //     await KeyChain.setGenericPassword("username","password",{accessible:KeyChain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY});
  //     // KeyChain.setGenericPassword
  //     alert((await KeyChain.getGenericPassword()).username.toString());
  //   }catch(e){
  //     alert(e);
  //   }})()
  // })

  const unlockAndRead = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const supported = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    try{
      console.log(await (await KeyChain.getGenericPassword()).username.toString())
    }catch(e){
      alert(e);
    }

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
