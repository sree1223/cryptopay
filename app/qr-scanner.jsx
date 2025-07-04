import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedValue, setScannedValue] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const onClose = ()=>{
    router.back();
  }

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text>Camera permission is required</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text>Grant</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarcodeScanned = (results) => {
    // alert(JSON.stringify(results?.data))
    if ((!isScanned || 1) && results?.data?.length > 10) {
      // alert(results[0].rawValue)
      const data = results.data;
      try {
        setScannedValue(data);
        setIsScanned(true);
      } catch (err) {
        setScannedValue('Invalid QR');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* 📷 Small square camera */}
      <View style={styles.cameraWrapper}>
        <CameraView
          style={styles.camera}
          facing={"back"}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={handleBarcodeScanned}
        >
          {/* ❌ Exit Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </CameraView>
      </View>

      {/* 🧾 Below camera */}
      <View style={styles.resultBox}>
        <Text style={styles.label}>Data</Text>
        <Text style={styles.value}>
          {scannedValue ? scannedValue : 'Waiting for QR code...'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  cameraWrapper: {
    alignSelf: 'center',
    width: 220,
    height: 220,
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#000',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#00000077',
    padding: 6,
    borderRadius: 20,
  },
  resultBox: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#444',
  },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: {
    backgroundColor: 'skyblue',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
});
