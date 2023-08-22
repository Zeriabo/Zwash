import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchStations} from '../redux/actions/stationsActions';
import {RootState} from '../redux/store';
import {Station} from '../redux/types/stationsActionTypes';
import MapView, {Marker, Region} from 'react-native-maps';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import markerIcon from '../assets/images/wash-washing.png';
import Geolocation from 'react-native-geolocation-service';
import MainMenu from '../components/MainMenu';
import {
  PERMISSIONS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';
import {
  ApolloProvider,
  useQuery,
  ApolloClient,
  InMemoryCache,
  gql,
} from '@apollo/client';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

const Stations: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();

  const [initialRegion, setInitialRegion] = useState<Region | null>(null);
  const stations: Station[] = useSelector<RootState, Station[]>(
    state => state.stations.stations,
  );
  // const error: string | null = useSelector<RootState, string | null>(
  //   state => state.stations.error,
  // );
  const getCurrentLocation = () => {
    Geolocation.requestAuthorization('whenInUse');
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const region = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setInitialRegion(region);
      },
      error => {
        console.log('Geolocation error:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
      const granted = await PermissionsAndroid.request(permission);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } else if (Platform.OS === 'ios') {
      const permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      let status = await check(permission);

      console.log(status);

      if (status === 'granted') return true;
      if (status === 'blocked') {
        // TODO: Show some informational UI, educating the user to change the permission via the Settings app.
        await openSettings();
        return false;
      }

      status = await request(permission, {
        title: 'Sample',
        message: 'We need access to your location to show relevant content.',
        buttonPositive: 'OK',
      });

      return status === 'granted';
    }
  };

  useEffect(() => {
    dispatch(fetchStations());
    requestLocationPermission();
  }, []);

  const handleStationClick = (station: Station) => {
    navigation.navigate('StationPage', {station});
  };

  // if (error) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.errorText}>Error loading stations: {error}</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stations</Text>
      <MainMenu navigation={navigation} />
      <MapView style={styles.map} initialRegion={initialRegion}>
        {stations &&
          stations.map((station: any) => (
            <Marker
              key={station.id}
              coordinate={{
                latitude: station.latitude,
                longitude: station.longitude,
              }}
              title={station.name}
              description={station.address}
              onPress={() => handleStationClick(station)}>
              <Image source={markerIcon} style={{width: 30, height: 30}} />
            </Marker>
          ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Stations;
