import { TextInput, FlatList, View, Text, StyleSheet, Image } from "react-native";
import Modal from "react-native-modal";
import GoToHomeButton from "../componentes/GoToHomeButton";
import { Pressable } from 'react-native';
import { games as allGames } from "../data/games";
import { gameImages } from "../data/gameImages";
import SortButton from "../componentes/SortButton";
import { useState, useEffect } from "react";
import SortScreen from "./SortScreen";
import { globalStyles } from '../GlobalStyles';
import DetailScreen from "./DetailScreen";

export default function AllOurGamesScreen({isVisible, onGoToHomeButtonPress}: {isVisible: boolean, onGoToHomeButtonPress: () => void}) {

    const [isSortButtonVisible, setIsSortButtonVisible] = useState(false);
    const [filter, setFilter] = useState<'recent' | 'oldest' | 'az' | 'za'>('recent');
    const [games, setGames] = useState(allGames);
    const [selectedGame, setSelectedGame] = useState<any | null>(null);

    const handleSortButtonPress = () => {
        setIsSortButtonVisible(!isSortButtonVisible);
    }

    const handleGoToHomeButtonPress = () => {
        onGoToHomeButtonPress();
    }

    const handleSort = (filtro: 'recent' | 'oldest' | 'az' | 'za') => {
        setFilter(filtro);
        setIsSortButtonVisible(false);
    }

    useEffect(() => {
        let sortedGames = [...allGames];
        if (filter === 'recent') {
            sortedGames.sort((a, b) =>
                new Date(b.acquisitionDate.split('/').reverse().join('-')).getTime() -
                new Date(a.acquisitionDate.split('/').reverse().join('-')).getTime()
            );
        } else if (filter === 'oldest') {
            sortedGames.sort((a, b) =>
                new Date(a.acquisitionDate.split('/').reverse().join('-')).getTime() -
                new Date(b.acquisitionDate.split('/').reverse().join('-')).getTime()
            );
        } else if (filter === 'az') {
            sortedGames.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filter === 'za') {
            sortedGames.sort((a, b) => b.name.localeCompare(a.name));
        }
        setGames(sortedGames);
    }, [filter]);

    return (
        <Modal
            isVisible={isVisible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={900}
            animationOutTiming={900}
            style={{margin: 0}}
        >
            <TextInput placeholder="Buscar juego..." />
            <FlatList
                data={games}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({item}) => (
                    <Pressable onPress={() => setSelectedGame(item)}>
                        <View style={styles.container}>
                            {item.mainImage && gameImages[item.mainImage] ? (
                                <View style={styles.imageWrapper}>
                                    <Image source={gameImages[item.mainImage]} resizeMode="contain" style={styles.image} />
                                </View>
                            ) : (
                                <View style={[styles.imageWrapper, {backgroundColor: '#ccc'}]}>
                                    <Text>Sin imagen</Text>
                                </View>
                            )}
                            <Text
                                style={[
                                    styles.gameName,
                                    item.name.length > 22 && { fontSize: 20 }
                                ]}
                            >
                                {item.name}
                            </Text>
                        </View>
                    </Pressable>
                )}
            />
            <View style={globalStyles.buttonsContainer}>
                <Pressable style={globalStyles.GoToHomeButtonContainer} onPress={handleGoToHomeButtonPress}>
                    <GoToHomeButton />
                </Pressable>
                <Pressable style={globalStyles.sortButtonContainer} onPress={handleSortButtonPress}>
                    <SortButton />
                </Pressable>
                <SortScreen
                    isVisible={isSortButtonVisible}
                    onSort={handleSort}
                    onGoToHomeButtonPress={onGoToHomeButtonPress}
                />
                <DetailScreen
                    isVisible={!!selectedGame}
                    game={selectedGame}
                    onGoToHomeButtonPress={onGoToHomeButtonPress}
                    onClose={() => setSelectedGame(null)}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: "70%",
        height: 280,
        alignSelf: "center",
        margin: 8,
        backgroundColor: "#e94343ff",
        borderRadius: 8,
        padding: 10,
        paddingTop: 16,
    },
    imageWrapper: {
        width: "95%",
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 8,
    },
    gameName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 4,
        textAlign: 'center',
        width: '100%',
    }
});