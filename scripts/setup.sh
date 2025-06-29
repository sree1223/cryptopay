#!/bin/bash

echo "🔧 Setting up project..."

# 1. Generate .env from template
if [ ! -f ".env" ]; then
  echo "Creating .env..."
  cp .env.example .env
fi

# 2. Generate Android debug keystore
if [ ! -f "android/debug.keystore" ]; then
  echo "Generating Android debug.keystore..."
  keytool -genkey -v -keystore android/debug.keystore -storepass android -alias androiddebugkey \
    -keypass android -keyalg RSA -keysize 2048 -validity 10000 \
    -dname "CN=Android Debug,O=Android,C=US"
fi

# 3. Generate local.properties
ANDROID_HOME=$HOME/Library/Android/sdk
if [ ! -f "android/local.properties" ]; then
  echo "sdk.dir=$ANDROID_HOME" > android/local.properties
  echo "Created android/local.properties with sdk.dir=$ANDROID_HOME"
fi

echo "✅ Setup complete!"
