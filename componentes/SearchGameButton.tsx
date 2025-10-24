import { View, Text, StyleSheet, Pressable } from 'react-native';
import { globalStyles } from '../GlobalStyles';

export default function SearchGameButton({ onPress }) {
  
  const handleSearchGameButtonPress = () => {
    onPress();
  };

  return (
    <Pressable style={globalStyles.botonCajaJuego} onPress={handleSearchGameButtonPress}>
      <Text style={globalStyles.botonTextoJuego}>Buscar juego por nombre 🔎</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
 
});