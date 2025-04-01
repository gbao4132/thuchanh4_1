import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const LocationScreen = ({ navigation }) => {
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('');
  const [visible, setVisible] = useState(false);

  const zones = ['Banasree', 'Rampura', 'Mirpur', 'Uttara', 'Dhanmondi'];

  const handleSubmit = () => {
    if (!zone || !area) {
      alert('Please select your zone and enter your area');
      return;
    }
    navigation.navigate('Login');
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Image 
          source={require('../assets/location-header.png')} 
          style={styles.headerImage}
          resizeMode="contain"
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>Select Your Location</Text>
          <Text style={styles.subtitle}>Switch on your location to stay in tune with what's happening in your area</Text>
          
          <Text style={styles.label}>Your Zone</Text>
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <TouchableOpacity style={styles.dropdown} onPress={() => setVisible(true)}>
                <Text style={styles.dropdownText}>{zone}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" style={styles.dropdownIcon} />
              </TouchableOpacity>
            }
          >
            {zones.map((zoneItem, index) => (
              <Menu.Item key={index} onPress={() => { setZone(zoneItem); setVisible(false); }} title={zoneItem} />
            ))}
          </Menu>
          
          <Text style={styles.label}>Your Area</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={area}
              onChangeText={setArea}
              placeholder="Type your area"
              placeholderTextColor="#999"
            />
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" style={styles.inputIcon} />
          </View>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 165, 
    marginTop: 60,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    color: '#333',
  },
  dropdownIcon: {
    position: 'absolute',
    right: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    flex: 1,
    color: '#333',
  },
  inputIcon: {
    position: 'absolute',
    right: 10,
  },
  button: {
    backgroundColor: '#53b175',
    padding: 22,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LocationScreen;