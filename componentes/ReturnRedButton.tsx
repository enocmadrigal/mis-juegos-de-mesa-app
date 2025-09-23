import { Image, StyleSheet } from 'react-native';

export default function ReturnRedButton() {
  return (
    <Image
      source={require('../assets/returnRedButton.png')}
      style={styles.imagen}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  boton: {
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagen: {
    width: 48,
    height: 48,
  },
});
