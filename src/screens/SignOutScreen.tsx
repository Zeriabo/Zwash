import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import Config from 'react-native-config';
import {useSelector, useDispatch} from 'react-redux';
import {signIn, signOut} from '../redux/actions/AuthActions';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

const SignOutScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const error = useSelector((state: any) => state.user.error);
  useEffect(() => {
    if (user.user && user.user.id != undefined) {
      dispatch(signOut());
    }
  }, [user, navigation]);
  if (user.user && user.user.id != undefined) {
    return (
      <View style={styles.container}>
        <Text>Sign out unsuccessful</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Sign out successful</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message: {
    color: 'green',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignOutScreen;
