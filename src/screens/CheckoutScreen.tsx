import React, {useState, useEffect} from 'react';
import Stripe from 'react-stripe-checkout';
import {useDispatch} from 'react-redux';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {checkout} from '../redux/actions/BuyActions';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxedContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  cardContainer: {
    height: '60%',
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  checkoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: 'purple',
    marginTop: 16,
  },
  headingText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
    marginTop: 4,
    letterSpacing: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 500,
    color: 'black',
    marginLeft: 8,
    marginTop: 4,
    letterSpacing: 1,
  },
  image: {
    width: 64,
    height: 64,
    marginRight: 16,
    borderRadius: 5,
  },
  checkoutText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  pageBreak: {
    marginVertical: 10,
  },

  cartContainer: {marginVertical: 8},
  checkoutAreaContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
});

const CheckoutScreen = (program: any) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [item, setItem] = useState({});
  useEffect(() => {
    setItem(program.route.params.program);
  }, []);

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams(
        'pk_test_51NInIUC7hkCZnQICpeKcU6piJANDfXyV3wcXXFPP39hu4KlZRMj4AvuHPiSv5Kv30KGK79zFRMRfGR2rtw0XQJEV00IYaSztHB',
      );
  };
  async function handleToken(token: {id: any}) {
    console.log(token);
    await axios
      .post('http://localhost:8080/v1/payment/charge', '', {
        headers: {
          token: token.id,
          amount: 500,
        },
      })
      .then(() => {
        console.log('Payment Success');
      })
      .catch(error => {
        console.log(error);
      });
  }

  const fetchPaymentSheetParams = async (token: any) => {
    const response = await fetch(`http://localhost:7001/v1/payment/charge`, {
      method: 'POST',
      headers: {
        token: token.id,
        amount: '500',
      },
    })
      .then(() => {
        Alert.alert('Payment Success');
      })
      .catch(error => {
        console.log(error);
      });

    useEffect(() => {
      initializePaymentSheet();
    }, []);

    const {paymentIntentId, ephemeralKey, customerId} = await response.json();

    return {
      paymentIntent: paymentIntentId,
      ephemeralKey,
      customer: customerId,
    };
  };

  const openPaymentSheet = async () => {
    // begin the payment process by calling payment intent
    dispatch(checkout(item));
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.boxedContainer}>
        <View style={styles.cartContainer}>
          <Text style={styles.headingText}>Selected Program</Text>
        </View>

        <View key={item.id} style={styles.cardContainer}>
          <Image source={{uri: item.imageUrl}} style={styles.image} />
          <View>
            <Text style={styles.itemText}>{item.program}</Text>
            <Text style={styles.itemPrice}>Price: €{item.price}</Text>
            <View style={styles.pageBreak} />
            <Text style={styles.itemText}>{item.description}</Text>
          </View>
        </View>
        <View style={styles.checkoutAreaContainer}>
          <TouchableOpacity
            onPress={openPaymentSheet}
            style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CheckoutScreen;
