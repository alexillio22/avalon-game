import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏰 AVALON</Text>
      <Text style={styles.subtitle}>¡Funciona!</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>
          Tocado {count} veces
        </Text>
      </TouchableOpacity>
      
      <Text style={styles.info}>
        {count > 0 ? '¡El juego responde correctamente!' : 'Toca el botón para probar'}
      </Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f1c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: '#8b9dc3',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2d5016',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#4a7c26',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  info: {
    color: '#ffd700',
    fontSize: 16,
    textAlign: 'center',
  },
});
