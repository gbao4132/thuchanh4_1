import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          setStoredUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogin = () => {
    if (!storedUser) {
      Alert.alert('No user found', 'Please sign up first.');
      return;
    }
    if (email === storedUser.email && password === storedUser.password) {
      Alert.alert('Login Successful', 'Welcome back!');
      navigation.navigate('Home'); // Chuyển đến màn hình chính hoặc dashboard
    } else {
      Alert.alert('Login Failed', 'Incorrect email or password.');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/login-header.png')} 
        style={styles.headerImage}
        resizeMode="contain"
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Loging</Text>
        <Text style={styles.subtitle}>Enter your email and password</Text>
        
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Loging</Text>
        </TouchableOpacity>
        
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 50, 
    marginTop: 60,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#53b175',
  },
  button: {
    backgroundColor: '#53b175',
    padding: 22,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#53b175',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
