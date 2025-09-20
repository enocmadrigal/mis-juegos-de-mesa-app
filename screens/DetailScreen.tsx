import React from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import GoToHomeButton from "../componentes/GoToHomeButton";
import SortButton from "../componentes/SortButton";
import { globalStyles } from '../GlobalStyles';
import { Pressable } from "react-native";

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
                {/* Aquí puedes agregar detalles del juego si lo deseas */}
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
        // Asegura que el contenido no tape los botones
        marginBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
