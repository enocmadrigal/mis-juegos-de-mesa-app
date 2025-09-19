import { View, Text, StyleSheet, Pressable } from 'react-native';
import { globalStyles } from '../GlobalStyles';

export default function AllOurGamesButton({ onPress }) {
  const handleAllOurGamesButtonPress = () => {
    onPress();
  };

  return (
    <Pressable style={globalStyles.botonCajaJuego} onPress={handleAllOurGamesButtonPress}>
      <Text style={globalStyles.botonTextoJuego}>Todos nuestros juegos 🎲</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({

});