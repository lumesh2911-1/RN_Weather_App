import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { moderateScale } from 'react-native-size-matters';
import {
  Clock3,
  CloudSun,
  Droplets,
  MapPin,
  Search,
  Thermometer,
  Wind,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_KEY } from '@env';
import { axiosInstance } from '../utils/axiosInstance';

type WeatherData = {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
  };
};

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateCity = (cityName: string) => {
    const trimmedCity = cityName.trim();

    if (!trimmedCity) {
      return 'Please enter a city name.';
    }

    if (trimmedCity.length < 2) {
      return 'City name should be at least 2 characters.';
    }

    if (!/^[a-zA-Z\s.-]+$/.test(trimmedCity)) {
      return 'City name can include only letters, spaces, dot and hyphen.';
    }

    return '';
  };

  const getWeather = async () => {
    const validationError = validateCity(city);
    if (validationError) {
      Alert.alert('Error', validationError);
      setWeather(null);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.get<WeatherData>(
        `/current.json?key=${API_KEY}&q=${city.trim()}&aqi=no`,
      );
      setWeather(response.data);
    } catch {
      setWeather(null);
      Alert.alert('Error', 'City not found. Please enter a valid city name.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weather App</Text>
        <Text style={styles.subtitle}>Check real-time weather by city</Text>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Enter city name"
          placeholderTextColor="#8E8E93"
          value={city}
          onChangeText={setCity}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={getWeather}>
          <Search color="#FFFFFF" size={moderateScale(18)} />
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {isLoading && <ActivityIndicator size="large" color="#00AEEF" style={styles.loader} />}

      {!weather && !isLoading && (
        <View style={styles.emptyState}>
          <CloudSun color="#FDBA74" size={moderateScale(28)} />
          <Text style={styles.emptyTitle}>Search your location</Text>
          <Text style={styles.emptySubtitle}>
            Enter city name and tap search to see weather details.
          </Text>
        </View>
      )}

      {weather && !isLoading && (
        <View style={styles.card}>
          <View style={styles.cityRow}>
            <MapPin color="#00AEEF" size={moderateScale(18)} />
            <Text style={styles.cityText}>
              {weather.location.name}, {weather.location.country}
            </Text>
          </View>
          <Text style={styles.conditionText}>{weather.current.condition.text}</Text>

          <View style={styles.tempRow}>
            <Thermometer color="#FF8A65" size={moderateScale(24)} />
            <Text style={styles.tempText}>{weather.current.temp_c}°C</Text>
          </View>

          <View style={styles.detailsRow}>
            <Droplets color="#4FC3F7" size={moderateScale(16)} />
            <Text style={styles.detailsText}>Humidity: {weather.current.humidity}%</Text>
          </View>

          <View style={styles.detailsRow}>
            <Wind color="#C7C7CC" size={moderateScale(16)} />
            <Text style={styles.detailsText}>Wind: {weather.current.wind_kph} km/h</Text>
          </View>

          <View style={styles.detailsRow}>
            <Thermometer color="#FFB74D" size={moderateScale(16)} />
            <Text style={styles.detailsText}>Feels Like: {weather.current.feelslike_c}°C</Text>
          </View>

          <View style={styles.detailsRow}>
            <Clock3 color="#8E8E93" size={moderateScale(16)} />
            <Text style={styles.timeText}>Local Time: {weather.location.localtime}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1220',
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(1),
  },
  header: {
    marginBottom: moderateScale(18),
  },
  title: {
    color: '#FFFFFF',
    fontSize: moderateScale(28),
    fontWeight: '800',
  },
  subtitle: {
    marginTop: moderateScale(4),
    color: '#9CA3AF',
    fontSize: moderateScale(14),
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  input: {
    flex: 1,
    backgroundColor: '#111827',
    borderWidth: moderateScale(1),
    borderColor: '#1F2937',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
    color: '#FFFFFF',
    fontSize: moderateScale(16),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(6),
    backgroundColor: '#F97316',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(11),
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: moderateScale(14),
  },
  loader: {
    marginTop: moderateScale(24),
  },

  emptyState: {
    marginTop: moderateScale(22),
    backgroundColor: '#111827',
    borderWidth: moderateScale(1),
    borderColor: '#1F2937',
    borderStyle: 'dashed',
    borderRadius: moderateScale(14),
    paddingVertical: moderateScale(22),
    paddingHorizontal: moderateScale(14),
    alignItems: 'center',
  },
  emptyTitle: {
    marginTop: moderateScale(10),
    color: '#E5E7EB',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  emptySubtitle: {
    marginTop: moderateScale(6),
    color: '#9CA3AF',
    fontSize: moderateScale(13),
    textAlign: 'center',
    lineHeight: moderateScale(18),
  },
  card: {
    marginTop: moderateScale(24),
    backgroundColor: '#111827',
    borderWidth: moderateScale(1),
    borderColor: '#1F2937',
    borderRadius: moderateScale(14),
    padding: moderateScale(16),
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  cityText: {
    color: '#FFFFFF',
    fontSize: moderateScale(22),
    fontWeight: '700',
    flex: 1,
  },
  conditionText: {
    marginTop: moderateScale(6),
    color: '#C7C7CC',
    fontSize: moderateScale(16),
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    marginTop: moderateScale(12),
  },
  tempText: {
    color: '#FFFFFF',
    fontSize: moderateScale(42),
    fontWeight: '800',
  },
  detailsRow: {
    marginTop: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  detailsText: {
    color: '#D1D1D6',
    fontSize: moderateScale(15),
  },
  timeText: {
    color: '#8E8E93',
    fontSize: moderateScale(13),
  },
});