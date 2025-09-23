import React, { useState } from "react";
import { TextInput, View, FlatList, Text, Image, TouchableOpacity, StyleSheet, Platform, ImageSourcePropType } from "react-native";
import Modal from "react-native-modal";
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
        <Modal
            isVisible={isVisible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInTiming={900}
            animationOutTiming={900}
            backdropOpacity={0}
            style={modalStyles.modalArea}
        >
            <View style={modalStyles.modalContent}>
                <View style={modalStyles.searchRow}>
                    <TextInput
                        style={modalStyles.input}
                        placeholder="Buscar juego..."
                        value={query}
                        onChangeText={setQuery}
                        autoFocus
                    />
                    <TouchableOpacity onPress={handleGoToHomeButtonPress} style={modalStyles.goHomeButton}>
                        <GoToHomeButton />
                    </TouchableOpacity>
                </View>
                {filteredGames.length > 0 && (
                    <View style={modalStyles.suggestionsContainer}>
                        <FlatList
                            data={filteredGames}
                            keyExtractor={item => item.id.toString()}
                            style={modalStyles.suggestions}
                            keyboardShouldPersistTaps="handled"
                            renderItem={({ item }) => (
                                <TouchableOpacity style={modalStyles.suggestionItem} onPress={() => setSelectedGame(item)}>
                                    <Image source={item.mainImage as ImageSourcePropType} style={modalStyles.thumbnail} />
                                    <Text style={modalStyles.suggestionText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
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

    const modalStyles = StyleSheet.create({
        modalArea: {
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
        },
        modalContent: {
            width: '70%',
            alignSelf: 'center',
            position: 'absolute',
            top: '51.3%', // Ajusta este valor para que el modal cubra exactamente los botones
            height: 195, // o el valor que necesites, en px
            backgroundColor: '#fff',
            borderRadius: 18,
            paddingVertical: 10,
            shadowColor: '#000',
            shadowOpacity: 0.12,
            shadowRadius: 8,
            elevation: 4,
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        searchRow: {
            flexDirection: 'row',
            alignItems: 'center', // centra verticalmente los hijos
            width: '100%',
            justifyContent: 'center',
            marginBottom: 16,
        },
        goHomeButton: {
            marginLeft: 12,
            alignSelf: 'center',
        },
        suggestionsContainer: {
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            zIndex: 100,
            elevation: 10,
            alignItems: 'center',
        },
        suggestions: {
            width: '90%',
            maxWidth: 400,
            backgroundColor: '#fff',
            borderRadius: 12,
            marginTop: 8,
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
        input: {
            width: '90%',
            minWidth: 320,
            maxWidth: 600,
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: '#d06666ff',
            borderRadius: 18,
            paddingVertical: 10,
            paddingHorizontal: 16,
            fontSize: 26,
            marginBottom: 0,
            backgroundColor: '#f8f8f8',
            textAlign: 'center',
        },
    });