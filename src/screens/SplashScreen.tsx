import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import logo from '../assets/images/logo.png';
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B1220',
  },
  logo: {
    width: moderateScale(100),
    height: moderateScale(100),
    resizeMode: 'contain',
  },
});

