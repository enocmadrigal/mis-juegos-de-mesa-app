import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import SearchGameButton from '../componentes/SearchGameButton';
import LatestAcquisitionsButton from '../componentes/LatestAcquisitionsButton';
import AllOurGamesButton from '../componentes/AllOurGamesButton';
import SearchGameScreen from './SearchGamesScreen';
import AllOurGamesScreen from './AllOurGamesScreen';
import LatestAcquisitionsScreen from './LatestAcquisitionsScreen';
import React, { useState } from 'react';
import HomeImage from '../componentes/HomeImage';


export default function HomeScreen() {
  const [isAllOurGamesButtonVisible, setIsAllOurGamesButtonVisible] = useState(false);
  const [isSearchGameButtonVisible, setIsSearchGameButtonVisible] = useState(false);
  const [isLatestAcquisitionsButtonVisible, setIsLatestAcquisitionsButtonVisible] = useState(false);

  const handleAllOurGamesButtonPress = () => {
    setIsAllOurGamesButtonVisible(true);
    setIsSearchGameButtonVisible(false);
    setIsLatestAcquisitionsButtonVisible(false);
  };

  const handleSearchGameButtonPress = () => {
    setIsAllOurGamesButtonVisible(false);
    setIsSearchGameButtonVisible(true);
    setIsLatestAcquisitionsButtonVisible(false);
  };

  const handleLatestAcquisitionsButtonPress = () => {
    setIsAllOurGamesButtonVisible(false);
    setIsSearchGameButtonVisible(false);
    setIsLatestAcquisitionsButtonVisible(true);
  };

  const handleGoToHomeButtonPress = () => {
    setIsAllOurGamesButtonVisible(false);
    setIsSearchGameButtonVisible(false);
    setIsLatestAcquisitionsButtonVisible(false);
  }

  return (

    <ImageBackground source={require('../assets/tableroMonopolyDefinitivo.jpg')} style={styles.fondo} resizeMode="cover">
      <View style={styles.contenedorPrincipal}>
        <HomeImage />
        <AllOurGamesButton onPress={handleAllOurGamesButtonPress} />
        <AllOurGamesScreen isVisible={isAllOurGamesButtonVisible} onGoToHomeButtonPress={handleGoToHomeButtonPress} />
        <SearchGameButton onPress={handleSearchGameButtonPress} />
        <SearchGameScreen isVisible={isSearchGameButtonVisible} onGoToHomeButtonPress={handleGoToHomeButtonPress} />
        <LatestAcquisitionsButton onPress={handleLatestAcquisitionsButtonPress} />
        <LatestAcquisitionsScreen isVisible={isLatestAcquisitionsButtonVisible} onGoToHomeButtonPress={handleGoToHomeButtonPress} />

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contenedorPrincipal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(88, 56, 234, 0.3)', // opcional: para dar un leve overlay
  },
});