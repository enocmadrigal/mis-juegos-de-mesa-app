import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../GlobalStyles';

export default function FindGameForOccasionButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={globalStyles.botonCajaJuego} onPress={onPress}>
      <Text style={globalStyles.botonTextoJuego}>Encuentra el juego para tu ocasión</Text>
    </TouchableOpacity>
  );
}

