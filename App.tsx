import React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigationScreen from './src/navigation/RootNavigationScreen';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={{ flex: 1 }}>
        <RootNavigationScreen />
      </View>
    </SafeAreaProvider>
  );
};

export default App;