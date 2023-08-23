import {useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Car from '../components/Car';
import {useDispatch} from 'react-redux';
import {deleteCar} from '../redux/actions/carActions';

function MyCars() {
  const route = useRoute();
  const cars: any = route.params.cars;
  const dispatch = useDispatch();
  const handleRemoveCar = (car: any) => {
    // Dispatch the deleteCar action
    dispatch(deleteCar({car}));
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>My Cars:</Text>
        {cars.map((car: any, index: number) => (
          <Car key={index} car={car} onRemove={() => handleRemoveCar(car)} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },

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
  carContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default MyCars;
