import React, { useState } from "react";
import { Modal, TextInput, View, FlatList, Text, Image, TouchableOpacity, StyleSheet, Platform, ImageSourcePropType } from "react-native";
import GoToHomeButton from "../componentes/GoToHomeButton";
import { games } from "../data/games";
import DetailScreen from "./DetailScreen";

export default function SearchGameScreen({ isVisible, onGoToHomeButtonPress }: { isVisible: boolean, onGoToHomeButtonPress: () => void }) {
    const [query, setQuery] = useState("");
    const [selectedGame, setSelectedGame] = useState<any | null>(null);

    const handleGoToHomeButtonPress = () => {
        setQuery("");
        setSelectedGame(null);
        onGoToHomeButtonPress();
    };

    // Filtrar juegos por nombre
    const filteredGames = query.trim().length === 0
        ? []
        : games.filter(g => g.name.toLowerCase().includes(query.trim().toLowerCase()));

    return (
        <Modal visible={isVisible} animationType="slide">
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar juego..."
                    value={query}
                    onChangeText={setQuery}
                    autoFocus
                />
                {filteredGames.length > 0 && (
                    <FlatList
                        data={filteredGames}
                        keyExtractor={item => item.id.toString()}
                        style={styles.suggestions}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.suggestionItem} onPress={() => setSelectedGame(item)}>
                                <Image source={item.mainImage as ImageSourcePropType} style={styles.thumbnail} />
                                <Text style={styles.suggestionText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
                        <TouchableOpacity onPress={handleGoToHomeButtonPress} style={{ marginTop: 24 }}>
                            <GoToHomeButton />
                        </TouchableOpacity>
            </View>
            {/* Modal de detalle del juego */}
            <DetailScreen
                isVisible={!!selectedGame}
                game={selectedGame}
                onGoToHomeButtonPress={handleGoToHomeButtonPress}
                onClose={() => setSelectedGame(null)}
            />
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'web' ? 40 : 20,
        paddingHorizontal: 18,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        maxWidth: 400,
        borderWidth: 1,
        borderColor: '#d06666ff',
        borderRadius: 12,
        padding: 12,
        fontSize: 20,
        marginBottom: 16,
        backgroundColor: '#f8f8f8',
    },
    suggestions: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        maxHeight: 320,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    suggestionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    thumbnail: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: '#eee',
    },
    suggestionText: {
        fontSize: 18,
        color: '#333',
    },
});