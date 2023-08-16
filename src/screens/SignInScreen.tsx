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
import {signIn} from '../redux/actions/AuthActions';

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

const SignInScreen: React.FC<Props> = ({navigation}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const error = useSelector((state: any) => state.user.error);

  useEffect(() => {
    if (user.user && user.user.id != undefined) {
      // Navigate to the "Stations" page
      navigation.navigate('Stations');
    }
  }, [user, navigation]);

  const handleSignIn = () => {
    const user = {
      username: username,
      password: password,
    };
    dispatch(signIn(user));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {user.user && <Text style={styles.message}>Signed in successfully!</Text>}
      {error && <Text style={styles.error}>{error.error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
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

export default SignInScreen;
