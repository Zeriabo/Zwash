import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CarWashingProgram, Station} from '../redux/types/stationsActionTypes';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {MyDrawer} from '../components/Drawer';

interface Props {
  route: RouteProp<{params: {station: Station}}, 'params'>;
  navigation: NavigationProp<any>;
}

const StationPage: React.FC<Props> = ({route, navigation}) => {
  const {station} = route.params;

  const programs: CarWashingProgram[] = station.programs;

  const handleProgramSelection = (selectedProgram: CarWashingProgram) => {
    navigation.navigate('Buywash', {selectedProgram});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Station Details</Text>
      <Text style={styles.infoText}>Station Name: {station.name}</Text>
      <Text style={styles.infoText}>Station Address: {station.address}</Text>
      <Text style={styles.programsTitle}>Programs:</Text>
      {programs.map(program => (
        <TouchableOpacity
          key={program.id}
          style={styles.programContainer}
          onPress={() => handleProgramSelection(program)}>
          <Text style={styles.programText}>{program.program}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

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
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  programsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  programContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#eaeaea',
    marginBottom: 10,
  },
  programText: {
    fontSize: 14,
  },
});

export default StationPage;
