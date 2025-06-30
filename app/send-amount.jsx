import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function SendAmountScreen() {
  const params = useLocalSearchParams();
  const [amount, setAmount] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Send</Text>
      </View>

      <View style={styles.recipientInfo}>
        <Text style={styles.recipientName}>{params.recipient || 'New Recipient'}</Text>
        <Text style={styles.recipientAddress}>{params.address || 'Enter address'}</Text>
      </View>

      <View style={styles.amountContainer}>
        <TextInput
          style={styles.amountInput}
          placeholder="0.00"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
          autoFocus
        />
        <Text style={styles.currency}>USD</Text>
      </View>

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0618',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    color: '#fff',
    fontSize: 24,
    marginRight: 15,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  recipientInfo: {
    marginBottom: 40,
  },
  recipientName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  recipientAddress: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 5,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 10,
    marginBottom: 30,
  },
  amountInput: {
    flex: 1,
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  currency: {
    color: '#aaa',
    fontSize: 18,
    marginLeft: 10,
  },
  nextButton: {
    backgroundColor: '#5267e3',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});