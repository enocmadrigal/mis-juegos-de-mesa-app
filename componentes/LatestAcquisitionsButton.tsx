import { View, Text, StyleSheet, Pressable } from 'react-native';
import { globalStyles } from '../GlobalStyles';

export default function LatestAcquisitionsButton({ onPress }) {

  const handleLatestAcquisitionsButtonPress = () => {
    onPress();
  };

  return (
    <Pressable style={globalStyles.botonCajaJuego} onPress={handleLatestAcquisitionsButtonPress}>
      <Text style={globalStyles.botonTextoJuego}>Ultimas adquisiciones 🛍️</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
 
});