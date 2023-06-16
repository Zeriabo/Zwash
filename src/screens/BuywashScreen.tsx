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
import {buyWash} from '../redux/actions/BuyActions';
import axios from 'axios';
import Config from 'react-native-config';
import getStripe from '../lib/getStripe';
import {loadStripe} from '@stripe/stripe-js';
const BuywashScreen: React.FC<Props> = ({route, navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const selectedProgram = route.params.selectedProgram;
  const [checkoutUrl, setCheckoutUrl] = useState('');

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
        <Button title="Buy Now" onPress={() => {}} />
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
});

export default BuywashScreen;
