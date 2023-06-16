import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Station, CarWashingProgram} from '../redux/types/stationsActionTypes';
import {NavigationProp, RouteProp} from '@react-navigation/native';

interface Props {
  route: RouteProp<{params: {station: Station}}, 'params'>;
  navigation: NavigationProp<any>;
}

function StationPage({route, navigation}: Props) {
  const {station} = route.params;

  const programs: CarWashingProgram[] = station.programs[1];

  const handleProgramSelection = (selectedProgram: CarWashingProgram) => {
    console.log('Selected Program:', selectedProgram);
    navigation.navigate('Buywash', {selectedProgram});
  };

  return (
    <ImageBackground
      source={require('../assets/images/car-wash-background.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Station Details</Text>
        <Text style={styles.stationName}>Station Name: {station.name}</Text>
        <Text style={styles.stationAddress}>
          Station Address: {station.address}
        </Text>
        <Text style={styles.programsTitle}>Programs:</Text>
        {programs.map((program: CarWashingProgram) => (
          <TouchableOpacity
            key={program.id}
            style={styles.programContainer}
            onPress={() => handleProgramSelection(program)}>
            <Text style={styles.program}>{program.program}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stationAddress: {
    fontSize: 16,
    marginBottom: 20,
  },
  programsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  programContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#eaeaea',
    marginBottom: 10,
  },
  program: {
    fontSize: 14,
  },
});

export default StationPage;
