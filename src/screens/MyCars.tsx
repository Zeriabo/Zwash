import {useRoute} from '@react-navigation/native';
import React, {useReducer} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Car from '../components/Car';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCar} from '../redux/actions/carActions';
import CarType from '../redux/types/CarType';
import {Alert} from 'react-native';
function MyCars() {
  const route = useRoute();
  const cars: CarType[] = route.params.cars;
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const handleRemoveCar = (car: any) => {
    const carToRemove: CarType = {
      carId: car.carId,
      registrationPlate: car.registerationPlate,
      dateOfManufacture: car.dateOfManufacture,
      token: user.user.token,
      deviceRegistrationToken: '',
      manufacture: car.manufacture,
    };
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this car?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const carToRemove: CarType = {
              carId: car.carId,
              registrationPlate: car.registerationPlate,
              dateOfManufacture: car.dateOfManufacture,
              token: user.user.token,
              deviceRegistrationToken: '',
              manufacture: car.manufacture,
            };
            dispatch(deleteCar({carToRemove}));
          },
        },
      ],
      {cancelable: true},
    );
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
