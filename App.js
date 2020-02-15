import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { StatusBar, StyleSheet, View, Alert, YellowBox } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { FontAwesome } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';

import Globals from './constants/Globals';

import io from 'socket.io-client';

console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
const socket = io.connect(`${Globals.server}:${Globals.port_1}/inicio_fleet/inicio_fleet/`);

socket.on('connect', () => {
  console.log('Conectado: ', socket.id);
});

async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      ...FontAwesome.font,
      'aller-lt': require('./assets/fonts/Aller_Lt.ttf'),
      'aller-bd': require('./assets/fonts/Aller_Bd.ttf'),
    }),
  ]);
}

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      Alert.alert('Sin conexión', 'Verifique su conexión e intente nuevamente.')
    }
  });

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ff8834" barStyle="dark-content-content" />
        <AppNavigator screenProps={{ socket: socket, id_propietario: 7 }} />
      </View>
    );
  }
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

