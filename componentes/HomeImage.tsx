import { StyleSheet, Image } from 'react-native';

export default function HomeImage() {
  return (
    <Image
      source={require('../assets/monopolyGuy.png')}
      style={{ width: 200, height: 200, marginBottom: 20 }}
      resizeMode="contain"
    />
  );
  
}

const styles = StyleSheet.create({

});