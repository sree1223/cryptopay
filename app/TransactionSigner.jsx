// components/TransactionSigner.jsx
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import {
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useGlobalStates } from '../hooks/globalStates';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const TransactionSigner = () => {
  const { signingRequest, clearSigningRequest } = useGlobalStates();

  if (!signingRequest) return null;

  // Dummy transaction data structure
  const txData = {
    contractAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    functionName: 'transfer',
    params: {
      to: '0x123...456',
      value: '0.1 ETH'
    },
    value: '0.1 ETH',
    gasEstimate: '21000',
    gasPrice: '50 Gwei',
    nonce: 42,
    rawData: JSON.stringify({
      method: 'eth_sendTransaction',
      params: [{
        from: '0x123...456',
        to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        value: '0x16345785d8a0000',
        gas: '0x5208',
        gasPrice: '0x2d79883d2000'
      }]
    }, null, 2)
  };

  const handleSign = () => {
    // Here you would actually sign the transaction
    console.log('Signing transaction:', signingRequest);
    clearSigningRequest();
    // Add your signing logic here
  };

  const handleCancel = () => {
    clearSigningRequest();
  };

  return (
    <BlurView intensity={20} tint="light" style={styles.blurContainer}>
    <Pressable style={{height:"30%",position:"absolute",top:"0",backgroundColor:"transparent",width:"100%",elevation:1000,zIndex:1000}} onPress={() => {handleCancel()}} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Review Transaction</Text>
          <TouchableOpacity onPress={handleCancel}>
            <Ionicons name="close" size={24} color="#a374d1" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Always visible details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Transaction Overview</Text>
            <DetailRow label="Contract" value={txData.contractAddress} />
            <DetailRow label="Function" value={txData.functionName} />
            <DetailRow label="Value" value={txData.value} />
            <DetailRow label="Gas Estimate" value={txData.gasEstimate} />
            <DetailRow label="Gas Price" value={txData.gasPrice} />
            <DetailRow label="Nonce" value={txData.nonce} />
          </View>

          {/* Parameters */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Parameters</Text>
            {Object.entries(txData.params).map(([key, value]) => (
              <DetailRow key={key} label={key} value={value} />
            ))}
          </View>

          {/* Raw Data */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Raw Transaction Data</Text>
            <View style={styles.rawDataContainer}>
              <Text style={styles.rawDataText}>{txData.rawData}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.signButton]}
            onPress={handleSign}
          >
            <Text style={styles.buttonText}>Sign</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  blurContainer: {
    position: 'absolute',
    top: 0,
    height:"100%",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    elevation: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    width: '100%',
    // maxHeight: (SCREEN_HEIGHT-10) * 0.7,
    height:"70%",
    borderTopColor:"#acf",
    borderTopWidth:10,
    padding: 20,
    paddingBottom:40,
    position:"absolute",
    bottom:0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#a374d1',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  rawDataContainer: {
    backgroundColor: '#0f0f1a',
    borderRadius: 8,
    padding: 12,
  },
  rawDataText: {
    color: '#ddd',
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#333',
    marginRight: 10,
  },
  signButton: {
    backgroundColor: '#5267e3',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default TransactionSigner;