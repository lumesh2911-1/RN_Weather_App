import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RootNavigationScreen from './src/navigation/RootNavigationScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <RootNavigationScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
