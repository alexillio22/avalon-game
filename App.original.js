import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('menu'); // 'menu', 'players', 'game'
  const [players, setPlayers] = useState([]);

  // Función para navegar entre pantallas
  const navigateToPlayers = () => {
    setCurrentScreen('players');
  };

  const navigateToGame = () => {
    if (players.length < 5) {
      alert('Necesitas al menos 5 jugadores para comenzar');
      return;
    }
    setCurrentScreen('game');
  };

  const navigateToMenu = () => {
    setCurrentScreen('menu');
  };

  // Pantalla del Menú Principal
  const renderMainMenu = () => (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>🏰 AVALON</Text>
        <Text style={styles.subtitle}>El Juego de Roles Épico</Text>
        <Text style={styles.description}>
          Únete a los Caballeros de la Mesa Redonda en su búsqueda del Santo Grial.
          Pero cuidado... algunos entre vosotros sirven a las fuerzas del mal.
        </Text>
      </View>

      <View style={styles.menuButtonsContainer}>
        <TouchableOpacity 
          style={[styles.menuButton, styles.playButton]} 
          onPress={navigateToGame}
        >
          <Text style={styles.menuButtonIcon}>⚔️</Text>
          <Text style={styles.menuButtonText}>JUGAR</Text>
          <Text style={styles.menuButtonSubtext}>Comenzar partida</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuButton, styles.playersButton]} 
          onPress={navigateToPlayers}
        >
          <Text style={styles.menuButtonIcon}>👥</Text>
          <Text style={styles.menuButtonText}>AÑADIR JUGADORES</Text>
          <Text style={styles.menuButtonSubtext}>Gestionar participantes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>🎭 Jugadores: {players.length}/10</Text>
        <Text style={styles.infoSubtext}>Mínimo 5 jugadores para comenzar</Text>
      </View>

      <StatusBar style={Platform.OS === 'web' ? 'auto' : 'light'} />
    </View>
  );

  // Pantalla temporal para otras secciones
  const renderPlayersScreen = () => (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Gestión de Jugadores</Text>
      <Text style={styles.screenSubtitle}>Próximamente...</Text>
      <TouchableOpacity style={styles.backButton} onPress={navigateToMenu}>
        <Text style={styles.backButtonText}>← Volver al Menú</Text>
      </TouchableOpacity>
      <StatusBar style={Platform.OS === 'web' ? 'auto' : 'light'} />
    </View>
  );

  const renderGameScreen = () => (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Partida de Avalon</Text>
      <Text style={styles.screenSubtitle}>Próximamente...</Text>
      <TouchableOpacity style={styles.backButton} onPress={navigateToMenu}>
        <Text style={styles.backButtonText}>← Volver al Menú</Text>
      </TouchableOpacity>
      <StatusBar style={Platform.OS === 'web' ? 'auto' : 'light'} />
    </View>
  );

  // Renderizar la pantalla actual
  if (currentScreen === 'menu') {
    return renderMainMenu();
  } else if (currentScreen === 'players') {
    return renderPlayersScreen();
  } else if (currentScreen === 'game') {
    return renderGameScreen();
  }

  return renderMainMenu(); // Fallback
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f1c',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  
  // Estilos del título principal
  titleContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 10,
    letterSpacing: 3,
    textAlign: 'center',
    ...(Platform.OS !== 'web' && {
      textShadowColor: 'rgba(255, 215, 0, 0.5)',
      textShadowOffset: {width: 0, height: 2},
      textShadowRadius: 10,
    }),
  },
  subtitle: {
    fontSize: 18,
    color: '#8b9dc3',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    color: '#6c7b95',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },

  // Estilos de los botones del menú
  menuButtonsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  menuButton: {
    width: '90%',
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    ...(Platform.OS !== 'web' && {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
    }),
  },
  playButton: {
    backgroundColor: '#2d5016',
    borderWidth: 2,
    borderColor: '#4a7c26',
  },
  playersButton: {
    backgroundColor: '#1a237e',
    borderWidth: 2,
    borderColor: '#3949ab',
  },
  menuButtonIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  menuButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  menuButtonSubtext: {
    color: '#cccccc',
    fontSize: 14,
    textAlign: 'center',
  },

  // Estilos de información
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    color: '#ffd700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoSubtext: {
    color: '#8b9dc3',
    fontSize: 14,
    textAlign: 'center',
  },

  // Estilos para pantallas secundarias
  screenTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 20,
    textAlign: 'center',
  },
  screenSubtitle: {
    fontSize: 18,
    color: '#8b9dc3',
    textAlign: 'center',
    marginBottom: 40,
  },
  backButton: {
    backgroundColor: '#4a4a4a',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 'auto',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
