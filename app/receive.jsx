// File: receive.jsx
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ReceiveScreen() {
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uo,setuo]=useState(false);

  // useEffect(()=>{
  //   setTimeout(() => {
  //     setuo(true);
  //   }, 3000);
  // },[])
  
  // User information - in a real app this would come from context or storage
  const userInfo = {
    name: 'Alice Crypto',
    ens: 'alice.eth',
    evmAddress: '0x8D34fF7c8D2dB093c7eD5D678F91D22123456789',
    username: '@alice_crypto'
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(userInfo.evmAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    Alert.alert('Copied', 'Address copied to clipboard');
  };

  const shareAddress = async () => {
    try {
      await Share.share({
        message: `Send crypto to me at: ${userInfo.evmAddress}`,
        title: 'My Crypto Address'
      });
    } catch (error) {
      Alert.alert('Error', 'Sharing failed');
    }
  };

  return (
    <View style={styles.inner}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Receive Crypto</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Card Container */}
      <View style={styles.card}>
        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#a374d1" />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.name}>{userInfo.name}</Text>
            <Text style={styles.username}>{userInfo.username}</Text>
          </View>
        </View>

        {/* QR Code */}
        <View style={styles.qrContainer}>
          <QRCode 
            value={userInfo.evmAddress || '0x0'}
            size={SCREEN_WIDTH * 0.5}
            backgroundColor="#fff"
            color="#0a0618"
          />
          <View style={styles.qrLabel}>
            <Ionicons name="qr-code" size={20} color="#a374d1" />
            <Text style={styles.qrText}>Scan to send</Text>
          </View>
        </View>

        {/* ENS Address */}
        <View style={styles.addressSection}>
          <Ionicons name="at" size={16} color="#a374d1" style={styles.addressIcon} />
          <Text style={styles.ensAddress}>{userInfo.ens}</Text>
        </View>

        {/* EVM Address */}
        <TouchableOpacity 
          style={styles.addressContainer}
          onPress={copyToClipboard}
          onLongPress={() => setShowFullAddress(!showFullAddress)}
        >
          <Ionicons name="wallet" size={16} color="#a374d1" style={styles.addressIcon} />
          <Text style={styles.addressText} numberOfLines={1}>
            {showFullAddress 
              ? userInfo.evmAddress 
              : `${userInfo.evmAddress.slice(0, 6)}...${userInfo.evmAddress.slice(-4)}`}
          </Text>
          <Ionicons 
            name={copied ? "checkmark" : "copy"} 
            size={16} 
            color={copied ? "#4ade80" : "#a374d1"} 
          />
        </TouchableOpacity>

        {/* Hint */}
        <Text style={styles.hintText}>
          Tap to copy, long press to {showFullAddress ? 'shorten' : 'expand'}
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton} onPress={shareAddress}>
            <Ionicons name="share-social" size={20} color="#a374d1" />
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={copyToClipboard}>
            <Ionicons name={copied ? "checkmark" : "copy"} size={20} color="#a374d1" />
            <Text style={styles.buttonText}>{copied ? 'Copied!' : 'Copy'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Network Selector - Placeholder for future implementation */}
      <View style={styles.networkSelector}>
        <Text style={styles.selectorLabel}>Receive on:</Text>
        <TouchableOpacity style={styles.networkButton}>
          <Text style={styles.networkText}>Ethereum</Text>
          <Ionicons name="chevron-down" size={16} color="#a374d1" />
        </TouchableOpacity>
      </View>

      {/* Security Tip */}
      <BlurView intensity={40} tint="dark" style={styles.securityTip}>
        <Ionicons name="shield-checkmark" size={20} color="#4ade80" />
        <Text style={styles.tipText}>
          Only send assets to this address on the Ethereum network
        </Text>
      </BlurView>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      padding: 16,
      paddingTop: 40
    },
    inner: {
      flex: 1,
      alignItems: 'center',
      paddingTop:50,
      backgroundColor:"#000",
    },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
    position:"absolute",
    top:0,
    zIndex:1,
    paddingHorizontal:30,
    backgroundColor:"#000",
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0f0f1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileText: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  username: {
    color: '#a374d1',
    fontSize: 14,
  },
  qrContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
  },
  qrLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  qrText: {
    color: '#0a0618',
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },
  addressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f0f1a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    width: '100%',
  },
  ensAddress: {
    color: '#a374d1',
    fontSize: 16,
    fontWeight: '500',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f0f1a',
    borderRadius: 12,
    padding: 12,
    width: '100%',
  },
  addressIcon: {
    marginRight: 10,
  },
  addressText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    fontWeight: '500',
  },
  hintText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // gap: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f0f1a',
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  buttonText: {
    color: '#a374d1',
    fontWeight: '600',
  },
  networkSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectorLabel: {
    color: '#aaa',
    marginRight: 10,
  },
  networkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  networkText: {
    color: '#a374d1',
    fontWeight: '500',
    marginRight: 4,
  },
  securityTip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    // gap: 8,
  },
  tipText: {
    color: '#4ade80',
    fontSize: 12,
    flex: 1,
  },
});