import React, { useState, useEffect } from "react";
import { Platform, View, Text, StyleSheet, Image, Pressable, Dimensions } from "react-native";
import GoToHomeButton from "../componentes/GoToHomeButton";
import SortButton from "../componentes/SortButton";
import { globalStyles } from '../GlobalStyles';
import Modal from "react-native-modal";

export default function SortScreen({
    isVisible,
    onSort,
    onGoToHomeButtonPress
}: {
    isVisible: boolean,
    onSort: (filter: 'recent' | 'oldest' | 'az' | 'za') => void,
    onGoToHomeButtonPress: () => void
}) {
    // Hook para flexDirection responsivo
    type FlexDirectionType = 'column' | 'row' | 'row-reverse' | 'column-reverse';
    const [flexDirection, setFlexDirection] = useState<FlexDirectionType>(getFlexDirection());

    useEffect(() => {
        const handleChange = () => setFlexDirection(getFlexDirection());
        const subscription = Dimensions.addEventListener('change', handleChange);

        return () => {
            subscription.remove();
        };
    }, []);

    function getFlexDirection(): FlexDirectionType {
        if (Platform.OS !== 'web') return 'column';
        return Dimensions.get('window').width < 600 ? 'column' : 'row';
    }

    const handleGoToHomeButtonPress = () => {
        onGoToHomeButtonPress();
        onSort('recent');
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
                <View style={[styles.twoBoxContainer, { flexDirection }]}>
                    <Pressable style={styles.upperLeftBoxContainer} onPress={() => onSort('recent')}>
                        <Text style={styles.buttonText}>Ultimas compras primero</Text>
                    </Pressable>
                    <Pressable style={styles.upperRightBoxContainer} onPress={() => onSort('oldest')}>
                        <Text style={styles.buttonText}>Orden en que se fueron comprando</Text>
                    </Pressable>
                </View>
                <View style={[styles.twoBoxContainer, { flexDirection }]}>
                    <Pressable style={styles.downLeftBoxContainer} onPress={() => onSort('az')}>
                        <Text style={styles.buttonText}>A-Z</Text>
                    </Pressable>
                    <Pressable style={styles.downRightBoxContainer} onPress={() => onSort('za')}>
                        <Text style={styles.buttonText}>Z-A</Text>
                    </Pressable>
                </View>
            </View>

            <View style={globalStyles.buttonsContainer}>
                <Pressable style={globalStyles.GoToHomeButtonContainer} onPress={handleGoToHomeButtonPress}>
                    <GoToHomeButton />
                </Pressable>
                <Pressable style={globalStyles.sortButtonContainer} onPress={() => onSort('recent')}>
                    <SortButton />
                </Pressable>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: Platform.OS === 'web' ? '70%' : '70%',
        alignSelf: 'center',
        borderRadius: 8,
        padding: 10,
        height: 700,
        marginTop: 23, 
        alignItems: 'center',
        justifyContent: 'center', 
    },
    twoBoxContainer: {
        flex: 1,
        width: '100%',
    },
    upperLeftBoxContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#d06666ff',
        borderWidth: 2,
        borderRadius: Platform.OS === 'web' ? 70 : 40,
        marginTop: Platform.OS === 'web' ? 20 : 8,
        marginLeft: Platform.OS === 'web' ? 20 : 8,
        marginRight: Platform.OS === 'web' ? 8 : 8,
        marginBottom: Platform.OS === 'web' ? 8 : 8,
    },
    upperRightBoxContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#d06666ff',
        borderWidth: 2,
        borderRadius: Platform.OS === 'web' ? 70 : 40,
        marginTop: Platform.OS === 'web' ? 20 : 8,
        marginLeft: Platform.OS === 'web' ? 8 : 8,
        marginRight: Platform.OS === 'web' ? 20 : 8,
        marginBottom: Platform.OS === 'web' ? 8 : 8,
    },
    downLeftBoxContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#d06666ff',
        borderWidth: 2,
        borderRadius: Platform.OS === 'web' ? 70 : 40,
        marginTop: Platform.OS === 'web' ? 8 : 8,
        marginLeft: Platform.OS === 'web' ? 20 : 8,
        marginRight: Platform.OS === 'web' ? 8 : 8,
        marginBottom: Platform.OS === 'web' ? 20 : 8,
    },
    downRightBoxContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#d06666ff',
        borderWidth: 2,
        borderRadius: Platform.OS === 'web' ? 70 : 40,
        marginTop: Platform.OS === 'web' ? 8 : 8,
        marginLeft: Platform.OS === 'web' ? 8 : 8,
        marginRight: Platform.OS === 'web' ? 20 : 8,
        marginBottom: Platform.OS === 'web' ? 20 : 8,
    },
    buttonText: {
        color: '#d06666ff',
        fontSize: Platform.OS === 'web' ? 32 : 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});