import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {create_paymentIntent} from '../redux/actions/BuyActions';

const BuywashScreen: React.FC<Props> = ({route, navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const selectedProgram = route.params.selectedProgram;
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [program, setProgram] = useState({});

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={require('../assets/background.jpg')}
        style={styles.imageBackground}> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.programTitle}>{selectedProgram.program}</Text>
        <Text style={styles.programDescription}>
          {selectedProgram.description}
        </Text>
        <Text style={styles.programPrice}>Price: {selectedProgram.price}</Text>
        <Button
          title="Buy Now"
          onPress={() => {
            setProgram({
              ...selectedProgram,
              '@class': 'com.zwash.pojos.ConcreteCarWashingProgram',
            });
            console.log(program);
            //create payment intent then go to check out screen.
            dispatch(create_paymentIntent(program));
            navigation.navigate('CheckoutScreen', {program: selectedProgram});
          }}
        />
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  detailsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  programTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  programDescription: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  programPrice: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
});

export default BuywashScreen;
