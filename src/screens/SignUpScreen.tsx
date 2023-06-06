import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addMessage, clearMessages} from '../redux/types/messageActionTypes';
import {signUp} from '../redux/actions/AuthActions';
interface Props {
  navigation: any; // Update the type of the navigation prop as per your navigation library
}

const SignUpScreen: React.FC<Props> = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secretAnswer, setSecretAnswer] = useState<string>('');
  const [secretQuestion, setSecretQuestion] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignUp = () => {
    // Perform sign up logic here
    // You can access the form values using the state variables
    const user = {
      '@class': 'com.zwash.pojos.User',
      firstName: firstName,
      lastName: lastName,
      password: password,
      secretAnswer: secretAnswer,
      secretQuestion: secretQuestion,
      username: username,
      dateOfBirth: dateOfBirth,
    };
    dispatch(signUp(user));
    // axios
    //   .post(Config.REACT_APP_SERVER_URL + '/users/register', user)
    //   .then((response: any) => {
    //     console.log(response);
    //     navigation.navigate('Home'); // Navigate to the home screen upon successful sign-in
    //   })
    //   .catch((error: any) => {
    //     dispatch(addMessage({id: 1, text: error.response.data}));

    //     setTimeout(() => {
    //       dispatch(clearMessages());
    //     }, 2000);
    //   });
    //navigation.navigate('Home'); // Navigate to the home screen upon successful sign-in
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Secret Answer"
        value={secretAnswer}
        onChangeText={setSecretAnswer}
      />
      <TextInput
        style={styles.input}
        placeholder="Secret Question"
        value={secretQuestion}
        onChangeText={setSecretQuestion}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});

export default SignUpScreen;
