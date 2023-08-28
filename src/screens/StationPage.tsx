import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {CarWashingProgram, Station} from '../redux/types/stationsActionTypes';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';
import {useDispatch} from 'react-redux';
import {selectStation} from '../redux/actions/stationActions';
interface Props {
  route: RouteProp<{params: {station: Station}}, 'params'>;
  navigation: NavigationProp<any>;
}

const StationPage: React.FC<Props> = ({route, navigation}) => {
  const {station} = route.params;
  const dispatch = useDispatch();

  dispatch(selectStation(route.params.station.id));

  const programs: CarWashingProgram[] = station.programs;

  const handleProgramSelection = (selectedProgram: CarWashingProgram) => {
    navigation.navigate('Buywash', {selectedProgram});
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      ),
      headerTitle: '', // Remove the header title
      headerTitleAlign: 'left', // Align the header title to the left
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <HeaderBackButton
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />
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
  backButton: {
    marginRight: 300,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default StationPage;
