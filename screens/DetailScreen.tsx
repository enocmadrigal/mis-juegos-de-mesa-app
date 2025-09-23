import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, Image, ScrollView, Linking, Pressable, Platform, Animated, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import GoToHomeButton from "../componentes/GoToHomeButton";
import SortButton from "../componentes/SortButton";
import { globalStyles } from '../GlobalStyles';
import { gameImages } from "../data/gameImages";
import { WebView } from 'react-native-webview';
import { gameDetailImages } from "../data/gameDetailImages";

// Helper para importar íconos dinámicamente
const iconMap: Record<string, any> = {
    players: require("../assets/icons/amongUsRojo.png"),
    duration: require("../assets/icons/dinamitaTiempo.png"),
    mode: require("../assets/icons/sharingan.png"),
    categories: require("../assets/icons/pinturaColores.png"),
    publisher: require("../assets/icons/crayonRojo.png"),
    acquisitionDate: require("../assets/icons/specialOfferRojo.png"),
    // Agrega aquí más íconos según los nombres de tus archivos
};

function InfoItem({ icon, text }: { icon: string, text: string }) {
    return (
        <View style={styles.infoItem}>
            <Image source={iconMap[icon]} style={styles.infoIcon} />
            <Text style={styles.infoValue}>{text}</Text>
        </View>
    );
}


export default function DetailScreen({
    isVisible,
    game,
    onGoToHomeButtonPress,
    onClose
}: {
    isVisible: boolean,
    game: any,
    onGoToHomeButtonPress: () => void,
    onClose: () => void
}) {
    if (!game) return null;

    // Helper para mostrar categorías como string
    const categories = Array.isArray(game.categories) ? game.categories.join(', ') : game.categories;

    // Helper para videoUrl: si es un link, abrirlo; si es local, mostrar texto
    const isWebUrl = typeof game.videoUrl === 'string' && (game.videoUrl.startsWith('http://') || game.videoUrl.startsWith('https://'));

    // Helper para saber si es un link embebible (YouTube, Facebook, etc.)
    const canEmbed =
        isWebUrl &&
        (game.videoUrl.includes("youtube.com") ||
         game.videoUrl.includes("youtu.be") ||
         game.videoUrl.includes("facebook.com") ||
         game.videoUrl.includes("tiktok.com") ||
         game.videoUrl.includes("instagram.com"));

    // Helper para obtener el embed URL de YouTube
    function getEmbedUrl(url: string) {
        if (url.includes("youtube.com/watch?v=")) {
            const videoId = url.split("v=")[1].split("&")[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        if (url.includes("youtu.be/")) {
            const videoId = url.split("youtu.be/")[1].split("?")[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        // Puedes agregar más reglas para otras plataformas si lo deseas
        return url;
    }

    const images = gameDetailImages[game.id] || [];

    // Carrusel de imágenes
    const [currentIndex, setCurrentIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const handleChangeImage = (direction: "next" | "prev") => {
        let newIndex = currentIndex;
        if (direction === "next") {
            newIndex = (currentIndex + 1) % images.length;
        } else {
            newIndex = (currentIndex - 1 + images.length) % images.length;
        }
        // Fade out, change image, then fade in (más suave)
        Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => {
            setCurrentIndex(newIndex);
            Animated.timing(fadeAnim, { toValue: 1, duration: 350, useNativeDriver: true }).start();
        });
    };

    // Helper para obtener el estilo del contenedor del video
    const getVideoContainerStyle = () => {
        return {
            width: '100%',
            maxWidth: 700,
            aspectRatio: 16 / 9,
            minHeight: 220,
            maxHeight: 360,
            alignSelf: 'center',
            marginBottom: 18,
            borderRadius: 12,
            overflow: 'hidden',
            backgroundColor: '#000',
        };
    };

    return (
        <Modal
            isVisible={isVisible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInTiming={900}
            animationOutTiming={900}
            style={{ margin: 0 }}
        >
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.title}>{game.name}</Text>
                    {images.length > 0 ? (
                        <View style={styles.carouselContainer}>
                            <TouchableOpacity
                                style={styles.arrowContainer}
                                onPress={() => handleChangeImage("prev")}
                                disabled={images.length <= 1}
                            >
                                <Text style={styles.arrow}>{'‹'}</Text>
                            </TouchableOpacity>
                            <Animated.Image
                                source={images[currentIndex]}
                                style={[styles.carouselImage, { opacity: fadeAnim }]}
                                resizeMode="contain"
                            />
                            <TouchableOpacity
                                style={styles.arrowContainer}
                                onPress={() => handleChangeImage("next")}
                                disabled={images.length <= 1}
                            >
                                <Text style={styles.arrow}>{'›'}</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={[styles.image, styles.noImage]}>
                            <Text>Sin imagen</Text>
                        </View>
                    )}
                    <View style={styles.infoRow}>
                        <InfoItem icon="players" text={game.players + " jugadores"} />
                        <InfoItem icon="duration" text={game.duration} />
                        <InfoItem icon="mode" text={game.mode} />
                        <InfoItem icon="categories" text={categories} />
                        <InfoItem icon="publisher" text={game.publisher} />
                        <InfoItem icon="acquisitionDate" text={game.acquisitionDate} />
                    </View>
                    <Text style={styles.subtitle}>Resumen del juego</Text>
                    <Text style={styles.description}>{game.description}</Text>
                    <Text style={styles.subtitle}>Tutorial</Text>
                    {game.videoUrl ? (
                        canEmbed ? (
                            Platform.OS === 'web' ? (
                                <View style={styles.videoContainer}>
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={getEmbedUrl(game.videoUrl)}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Tutorial"
                                        style={{
                                            borderRadius: 12,
                                            overflow: 'hidden',
                                            width: '100%',
                                            height: '100%',
                                            minHeight: 220,
                                            maxHeight: 360,
                                            display: 'block',
                                            background: '#000'
                                        }}
                                    />
                                </View>
                            ) : (
                                <View style={styles.videoContainer}>
                                    <WebView
                                        source={{ uri: getEmbedUrl(game.videoUrl) }}
                                        style={styles.webview}
                                        javaScriptEnabled
                                        domStorageEnabled
                                    />
                                </View>
                            )
                        ) : isWebUrl ? (
                            <Text
                                style={styles.link}
                                onPress={() => Linking.openURL(game.videoUrl)}
                            >
                                {game.videoUrl}
                            </Text>
                        ) : (
                            <Text style={styles.videoText}>{game.videoUrl}</Text>
                        )
                    ) : (
                        <Text style={styles.videoText}>No hay tutorial disponible.</Text>
                    )}
                </ScrollView>
            </View>
            <View style={globalStyles.buttonsContainer}>
                <Pressable style={globalStyles.GoToHomeButtonContainer} onPress={onGoToHomeButtonPress}>
                    <GoToHomeButton />
                </Pressable>
                <Pressable style={globalStyles.sortButtonContainer} onPress={onClose}>
                    <SortButton />
                </Pressable>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginBottom: 0,
        paddingHorizontal: 18,
        paddingTop: 24,
    },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: 32,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#d06666ff',
        marginBottom: 16,
        textAlign: 'center',
    },
    image: {
        width: 220,
        height: 220,
        borderRadius: 12,
        backgroundColor: '#fff', // Cambiado de '#eee' a '#fff'
        marginBottom: 12,
    },
    noImage: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoLine: {
        fontSize: 15,
        color: '#444',
        marginBottom: 18,
        textAlign: 'center',
    },
    infoLabel: {
        color: '#d06666ff',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#d06666ff',
        marginTop: 18,
        marginBottom: 6,
        alignSelf: 'center', // Cambiado de 'flex-start' a 'center'
        textAlign: 'center', // Añadido para asegurar centrado del texto
    },
    description: {
        fontSize: 20,
        color: '#222',
        marginBottom: 18,
        alignSelf: 'center',
        textAlign: 'justify', // Justifica el texto (alineado a ambos lados)
    },
    videoText: {
        fontSize: 15,
        color: '#444',
        marginBottom: 18,
        alignSelf: 'flex-start',
    },
    link: {
        fontSize: 15,
        color: '#1e90ff',
        textDecorationLine: 'underline',
        marginBottom: 18,
        alignSelf: 'flex-start',
    },
    infoRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 18,
        gap: 8,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 4,
        marginVertical: 2,
    },
    infoIcon: {
        width: 60, // Ajusta aquí el tamaño (ancho)
        height: 60, // Ajusta aquí el tamaño (alto)
        marginRight: 4,
        resizeMode: 'contain', // Asegura que no se recorten y mantengan proporción
    },
    infoValue: {
        fontSize: 20, // <--- Cambia este valor para ajustar el tamaño de la letra junto al icono
        color: '#444',
        fontWeight: 'normal',
    },
    videoContainer: {
        width: '100%',
        maxWidth: 700,
        aspectRatio: 16 / 9,
        minHeight: 220,
        maxHeight: 360,
        alignSelf: 'center',
        marginBottom: 18,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    webview: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    imagesScroll: {
        width: '100%',
        maxWidth: 700,
        alignSelf: 'center',
        marginBottom: 18,
    },
    carouselContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 700,
        marginBottom: 18,
        minHeight: 220,
        maxHeight: 300,
    },
    arrowContainer: {
        paddingHorizontal: 12,
        paddingVertical: 30,
        zIndex: 2,
    },
    arrow: {
        fontSize: 40,
        color: '#d06666ff',
        fontWeight: 'bold',
        opacity: 0.7,
    },
    carouselImage: {
        width: 220,
        height: 220,
        borderRadius: 12,
        backgroundColor: '#fff',
        marginHorizontal: 8,
    },
});