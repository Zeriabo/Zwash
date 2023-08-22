import React from 'react';
import {View, Text, StyleSheet, Button, ImageBackground} from 'react-native';
import {NavigationScreenProp, NavigationRoute} from 'react-navigation';
import MainMenu from '../components/MainMenu';
interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ImageBackground
      source={require('../assets/images/car-wash-background.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Zwash</Text>
        <Button title="Sign In" onPress={handleSignIn} />
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' if you want to stretch the image
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
  },
});

export default HomeScreen;
