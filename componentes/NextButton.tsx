import { Image, StyleSheet } from 'react-native';

export default function SortButton() {
  return (
    <Image
      source={require('../assets/siguiente.png')}
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
