import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RootState} from '../redux/store';
import {useSelector} from 'react-redux';
import {Station, CarWashingProgram} from '../redux/types/stationsActionTypes'; // Replace with the correct types
import {NavigationProp, RouteProp} from '@react-navigation/native';

interface Props {
  route: RouteProp<{params: {station: Station}}, 'params'>;
  navigation: NavigationProp<any>;
}

function StationPage({route, navigation}: Props) {
  const {station} = route.params;

  const programs: CarWashingProgram[] = station.programs[1];

  const handleProgramSelection = (selectedProgram: CarWashingProgram) => {
    // Perform the action when a program is selected
    navigation.navigate('Buywash', {selectedProgram});
    // Add your logic here to handle program selection
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Station Details</Text>
      <Text style={styles.stationName}>Station Name: {station.name}</Text>
      <Text style={styles.stationAddress}>
        Station Address: {station.address}
      </Text>
      <Text style={styles.programsTitle}>Programs:</Text>
      {programs.map((program: any) => (
        <TouchableOpacity
          key={program.id}
          style={styles.programContainer}
          onPress={() => handleProgramSelection(program)}>
          <Text style={styles.program}>{program.program}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stationId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stationAddress: {
    fontSize: 16,
    fontWeight: 'bold',
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
