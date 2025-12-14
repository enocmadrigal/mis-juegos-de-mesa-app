import { TextInput, FlatList, View, Text, StyleSheet, Image } from "react-native";
import Modal from "react-native-modal";
import GoToHomeButton from "../componentes/GoToHomeButton";
import { Pressable } from 'react-native';
import { games } from "../data/games";
import SortButton from "../componentes/SortButton";
import { useState, useEffect } from "react";
import SortScreen from "./SortScreen";
import { globalStyles } from '../GlobalStyles';
import DetailScreen from "./DetailScreen";

export default function AllOurGamesScreen({
    isVisible,
    onGoToHomeButtonPress,
    filteredGames
}: {
    isVisible: boolean,
    onGoToHomeButtonPress: () => void,
    filteredGames?: any[]
}) {

    const [isSortButtonVisible, setIsSortButtonVisible] = useState(false);
    const [sortFilter, setSortFilter] = useState<'recent' | 'oldest' | 'az' | 'za'>('recent');
    const [selectedGame, setSelectedGame] = useState<any | null>(null);

    // Reinicia el detalle cuando se cierra el modal
    useEffect(() => {
        if (!isVisible) {
            setSelectedGame(null);
        }
    }, [isVisible]);

    const handleSortButtonPress = () => {
        setIsSortButtonVisible(!isSortButtonVisible);
    }

    const handleGoToHomeButtonPress = () => {
        onGoToHomeButtonPress();
    }

    const handleSort = (filter: 'recent' | 'oldest' | 'az' | 'za') => {
        setSortFilter(filter);
        setIsSortButtonVisible(false);
    }

    // Usar los juegos filtrados si existen, si no, usar todos
    function getSortedGames() {
        const data = filteredGames ?? games;
        if (sortFilter === 'recent') {
            // Más recientes primero (mayor purchaseOrder primero)
            return [...data].sort((a, b) => b.purchaseOrder - a.purchaseOrder);
        }
        if (sortFilter === 'oldest') {
            // Más antiguos primero (menor purchaseOrder primero)
            return [...data].sort((a, b) => a.purchaseOrder - b.purchaseOrder);
        }
        if (sortFilter === 'az') {
            return [...data].sort((a, b) => a.name.localeCompare(b.name));
        }
        if (sortFilter === 'za') {
            return [...data].sort((a, b) => b.name.localeCompare(a.name));
        }
        return data;
    }

    return (
        <Modal
            isVisible={isVisible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={900}
            animationOutTiming={900}
            style={{margin: 0}}
        >
            <FlatList
                data={getSortedGames()}
                keyExtractor={(item) => item?.id?.toString?.() ?? Math.random().toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({item}) => (
                    <Pressable onPress={() => setSelectedGame(item)}>
                        <View style={styles.container}>
                            {item.mainImage ? (
                                <View style={styles.imageWrapper}>
                                    <Image source={item.mainImage} resizeMode="contain" style={styles.image} />
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