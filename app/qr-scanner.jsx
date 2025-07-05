import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Clipboard from 'expo-clipboard';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const RESCAN_DELAY = 3000; // 3 seconds

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedValue, setScannedValue] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    ens: '',
    evm: ''
  });
  const [autoRescanEnabled, setAutoRescanEnabled] = useState(false);
  const params = useLocalSearchParams();

  useEffect(() => {
    let timeoutId;
    if (isScanned && autoRescanEnabled) {
      timeoutId = setTimeout(() => {
        resetScanner();
      }, RESCAN_DELAY);
    }
    return () => clearTimeout(timeoutId);
  }, [isScanned, autoRescanEnabled]);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.permissionText}>Camera permission is required to scan QR codes</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarcodeScanned = (results) => {
    if (isScanned || !results?.data) return;
    
    const data = results.data;
    setScannedValue(data);
    setIsScanned(true);

    // Check if it's an EVM address
    if (data.startsWith('0x') && data.length === 42) {
      setContactData(prev => ({
        ...prev,
        evm: data
      }));
      return;
    }

    // Check if it's JSON data
    if (data.startsWith('{')) {
      try {
        const jsonData = JSON.parse(data);
        setContactData({
          name: jsonData.name || '',
          ens: jsonData.ens || jsonData.handle || '',
          evm: jsonData.evm || jsonData.address || ''
        });
      } catch (e) {
        console.log('Not valid JSON');
      }
    }
  };

  const saveContact = async () => {
    if (!contactData.name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }

    if (!contactData.evm && !contactData.ens) {
      Alert.alert('Error', 'At least EVM address or ENS is required');
      return;
    }

    Alert.alert('Success', 'Contact saved successfully!');
    resetScanner();
    router.back();
  };

  const copyToClipboard = async () => {
    if (!scannedValue) return;
    await Clipboard.setStringAsync(scannedValue);
    Alert.alert('Copied!', 'Address copied to clipboard');
  };

  const resetScanner = () => {
    setScannedValue(null);
    setIsScanned(false);
    setShowContactForm(false);
    setContactData({
      name: '',
      ens: '',
      evm: ''
    });
  };

  const toggleAutoRescan = () => {
    setAutoRescanEnabled(!autoRescanEnabled);
    if (!autoRescanEnabled && isScanned) {
      resetScanner();
    }
  };

  const onClose = () => {
    router.back();
  };

  return (
    <ScrollView style={{flexGrow:1}}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>QR Scanner</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Auto-rescan toggle */}
        {
          false &&
          <View style={styles.autoRescanContainer}>
          <Text style={styles.autoRescanText}>Auto-rescan: {autoRescanEnabled ? 'ON' : 'OFF'}</Text>
          <TouchableOpacity onPress={toggleAutoRescan} style={styles.toggleButton}>
            <Ionicons 
              name={autoRescanEnabled ? "toggle" : "toggle-outline"} 
              size={24} 
              color={autoRescanEnabled ? "#a374d1" : "#aaa"} 
            />
          </TouchableOpacity>
        </View>
        }

        {/* Camera View */}
        <View style={styles.cameraWrapper}>
          <CameraView
            style={styles.camera}
            facing={"back"}
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            onBarcodeScanned={isScanned ? undefined : handleBarcodeScanned}
          >
            <View style={styles.cameraOverlay}>
              <View style={styles.focusBox} />
              <Text style={styles.helpText}>Align QR code within the frame</Text>
            </View>
          </CameraView>
        </View>

        {/* Scanned Data */}
        {isScanned && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Scanned Data:</Text>
            <View style={styles.resultBox}>
              <Text style={styles.resultValue} numberOfLines={1} ellipsizeMode="middle">
                {scannedValue}
              </Text>
              <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                <Ionicons name="copy" size={20} color="#a374d1" />
              </TouchableOpacity>
            </View>

            {!showContactForm ? (
              <View style={styles.buttonGroup}>
                <TouchableOpacity 
                  onPress={() => setShowContactForm(true)} 
                  style={[styles.actionButton, styles.addContactButton]}
                >
                  <Text style={styles.buttonText}>Add as Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={resetScanner} 
                  style={[styles.actionButton, styles.rescanButton]}
                >
                  <Ionicons name="scan" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Rescan</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.contactForm}>
                <Text style={styles.formTitle}>New Contact</Text>
                
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Contact name"
                  placeholderTextColor="#aaa"
                  value={contactData.name}
                  onChangeText={(text) => setContactData({...contactData, name: text})}
                />

                <Text style={styles.inputLabel}>ENS Handle</Text>
                <TextInput
                  style={styles.input}
                  placeholder="@username.eth"
                  placeholderTextColor="#aaa"
                  value={contactData.ens}
                  onChangeText={(text) => setContactData({...contactData, ens: text})}
                />

                <Text style={styles.inputLabel}>EVM Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0x..."
                  placeholderTextColor="#aaa"
                  value={contactData.evm}
                  onChangeText={(text) => setContactData({...contactData, evm: text})}
                />

                <View style={styles.formButtons}>
                  <TouchableOpacity 
                    onPress={resetScanner} 
                    style={[styles.formButton, styles.cancelButton]}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={saveContact} 
                    style={[styles.formButton, styles.saveButton]}
                  >
                    <Text style={styles.buttonText}>Save Contact</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}

        {!isScanned && (
          <Text style={styles.instructionText}>
            Point your camera at a QR code to scan
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0618',
    minHeight: SCREEN_HEIGHT-10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#0a0618',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  autoRescanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  autoRescanText: {
    color: '#aaa',
    marginRight: 10,
  },
  toggleButton: {
    padding: 5,
  },
  cameraWrapper: {
    alignSelf: 'center',
    width: '90%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 12,
    marginTop: 20,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  focusBox: {
    width: '70%',
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: '#a374d1',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  helpText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  resultLabel: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 8,
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  resultValue: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  copyButton: {
    marginLeft: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  addContactButton: {
    backgroundColor: '#5267e3',
  },
  rescanButton: {
    backgroundColor: '#333',
  },
  contactForm: {
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  formTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputLabel: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#0f0f1a',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  formButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#333',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#5267e3',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  instructionText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0618',
    padding: 20,
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: '#5267e3',
    padding: 15,
    borderRadius: 10,
  },
});