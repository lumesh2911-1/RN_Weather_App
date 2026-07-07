import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { axiosInstance } from '../utils/axiosInstance';
import { API_KEY } from '@env';

const HomeScreen = () => {
  const city = 'Raipur';
  const getWeather = async () => {
    try {
      const response = await axiosInstance.get(`/current.json?key=${API_KEY}&q=${city}&aqi=no`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});