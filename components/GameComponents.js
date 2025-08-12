import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';

// Componente para el jugador héroe
export const Hero = ({ x, y, onPress }) => {
  const animatedValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animación de respiración para el héroe
    const breathAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    breathAnimation.start();

    return () => breathAnimation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.hero,
        {
          left: x - 25,
          top: y - 25,
          transform: [{ scale: animatedValue }],
        },
      ]}
    >
      <TouchableOpacity style={styles.heroTouchable} onPress={onPress}>
        <Text style={styles.heroIcon}>🛡️</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Componente para gemas coleccionables
export const Gem = ({ x, y, type = 'diamond', onCollect, id }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const glowValue = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animación de rotación continua
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );

    // Animación de brillo
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowValue, {
          toValue: 0.8,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    rotateAnimation.start();
    glowAnimation.start();

    return () => {
      rotateAnimation.stop();
      glowAnimation.stop();
    };
  }, []);

  const handlePress = () => {
    // Animación de colección
    Animated.parallel([
      Animated.timing(rotateValue, {
        toValue: 2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(glowValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onCollect(id, getGemValue(type));
    });
  };

  const getGemIcon = (type) => {
    switch (type) {
      case 'diamond': return '💎';
      case 'ruby': return '🔴';
      case 'emerald': return '💚';
      case 'sapphire': return '🔵';
      default: return '💎';
    }
  };

  const getGemValue = (type) => {
    switch (type) {
      case 'diamond': return 10;
      case 'ruby': return 15;
      case 'emerald': return 20;
      case 'sapphire': return 25;
      default: return 10;
    }
  };

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.gem,
        {
          left: x - 25,
          top: y - 25,
          transform: [{ rotate: spin }],
          opacity: glowValue,
        },
      ]}
    >
      <TouchableOpacity style={styles.gemTouchable} onPress={handlePress}>
        <Text style={styles.gemIcon}>{getGemIcon(type)}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Componente para mostrar efectos especiales
export const SpecialEffect = ({ x, y, type, onComplete }) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onComplete();
    });
  }, []);

  const getEffectIcon = (type) => {
    switch (type) {
      case 'collect': return '✨';
      case 'level_up': return '⭐';
      case 'bonus': return '🎉';
      default: return '✨';
    }
  };

  return (
    <Animated.View
      style={[
        styles.effect,
        {
          left: x - 20,
          top: y - 20,
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
        },
      ]}
    >
      <Text style={styles.effectIcon}>{getEffectIcon(type)}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  hero: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTouchable: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  heroIcon: {
    fontSize: 30,
  },
  gem: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gemTouchable: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(233, 69, 96, 0.3)',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#e94560',
  },
  gemIcon: {
    fontSize: 30,
  },
  effect: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  effectIcon: {
    fontSize: 25,
  },
});
