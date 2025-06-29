# 🔐 Secure Contacts Wallet (React Native + Expo)

A modern crypto contact wallet built with **React Native**, **Expo**, and `expo-router`.  
Designed to help manage EVM wallet addresses and ENS-style handles locally — with optional biometric protection.
Fully open-source to build APK your self

---

## 📱 Project Purpose

- Provides a easy to go setup for further Crypto Android Apps
- Create a Fully Safe Multi-Sig Wallet App with push notifications
- Fast, Clean UI, Safeset as Multi-Sig
- Maintain an offline contact book for wallet addresses and ENS-style names  
- Support both direct **EVM addresses** and **custom domain handles**  
- Persist data locally, securely — without needing internet or wallet connection  
- Allow optional biometric unlock (Android)  
- Designed for crypto teams, users, or multi-sig wallet members

---

## 📦 Getting Started

### 1. Install dependencies

    npm install

### 2. Run the Expo Dev Server

    npx expo start

> You can use **Expo Go** on Android, or launch via Android Emulator.

---

## 🏗 Android: Build APK Locally (Gradle)

This project supports full offline APK builds using the native Android toolchain (Gradle).

### 1. ✅ Configure Architectures

In your `android/gradle.properties` file, ensure the following line exists:

    reactNativeArchitectures=armeabi-v7a,x86,arm64-v8a,x86_64

You can customize this list to reduce APK size (e.g. just `armeabi-v7a` for most devices / 'x86_64' for some emulators).

### 2. APK Split by Architecture (Optional Optimization)

In your `android/app/build.gradle`, you'll find:

```gradle
splits {
  abi {
    enable true
    reset()
    include "armeabi-v7a" // You can add any architecture as below
    // include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
    universalApk false  // Set to true to generate a single APK for all ABIs
  }
}
```

### 3. 🧱 Build APK

From your project root:

    cd android
    ./gradlew assembleRelease

After the build completes, your APK will be located at:

    android/app/build/outputs/apk/release/app-release.apk

You can now install it on a physical Android device or emulator.

---

## ☁️ Cloud Build with EAS

Build your APK using Expo’s cloud service:

    eas build --platform android

Optional: Inspect bundle output:

    eas build:inspect --platform android --stage archive --output inspect.json

> See: [EAS Build Docs](https://docs.expo.dev/build/introduction)

---

## 🔐 Secure Storage & Biometrics

This app includes a secure storage demo:

- Uses `expo-local-authentication` for biometric unlock (face/fingerprint)
- Uses `expo-secure-store` to securely store secrets (encrypted via Android Keystore)

💡 Live example is in: `app/Secure.tsx`

⚠️ Note: Demo stores the decrypted secret in a React `useState()` variable — avoid this pattern for production wallets.

---

## 📁 Where Data is Stored

- Contacts → `AsyncStorage` (`@react-native-async-storage/async-storage`)
- Secrets → `expo-secure-store` (Keystore-backed encryption)
- Debug APKs → `android/app/build/outputs/apk/release/app-release.apk`
- Temporary cache → `.expo/`, `.expo-router/`, `node_modules/`

---

## 🧩 Core Libraries Used

- **expo-router** — file-based routing
- **expo-local-authentication** — Android biometric auth
- **expo-secure-store** — encrypted key-value storage
- **@react-native-async-storage/async-storage** — persistent local storage
- **react-native-keychain** — optional native-level secure key management
- **expo-dev-client** — supports native modules during development

---

## 📬 Helpful Docs

- https://docs.expo.dev
- https://docs.expo.dev/eas/credentials/overview/
- https://reactnative.dev/docs/environment-setup
- https://docs.expo.dev/versions/latest/sdk/securestore/
- https://docs.expo.dev/versions/latest/sdk/local-authentication/

---

## ✨ Author

Built with 💜 by [@dheram](https://github.com/dheram)  
→ https://dheram.com  
→ https://blog.dheram.com

---

## 🔓 License

MIT — use, fork, remix freely.
