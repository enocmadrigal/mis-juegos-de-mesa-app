import React, { useState, useEffect } from "react";
import { Platform, View, Text, StyleSheet, Image, Pressable, Dimensions, DimensionValue } from "react-native";
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
    // Responsive config type
    type ResponsiveConfig = {
        flexDirection: 'column' | 'row' | 'row-reverse' | 'column-reverse';
        borderRadius: number;
        marginTop: number;
        marginLeft: number;
        marginRight: number;
        marginBottom: number;
        fontSize: number;
        containerWidth: DimensionValue; // Cambiado de string a DimensionValue
    };

    function getResponsiveConfig(): ResponsiveConfig {
        const width = Dimensions.get('window').width;
        const isLaptop = width < 600;
        return {
            flexDirection: isLaptop ? 'column' : 'row',
            borderRadius: isLaptop ? 40 : 70,
            marginTop: isLaptop ? 8 : 20,
            marginLeft: isLaptop ? 8 : 20,
            marginRight: isLaptop ? 8 : 20,
            marginBottom: isLaptop ? 8 : 20,
            fontSize: isLaptop ? 25 : 32,
            containerWidth: isLaptop ? '70%' : '100%', // Asegúrate que sean strings con '%'
        };
    }

    const [responsiveConfig, setResponsiveConfig] = useState<ResponsiveConfig>(getResponsiveConfig());

    useEffect(() => {
        const handleChange = () => setResponsiveConfig(getResponsiveConfig());
        const subscription = Dimensions.addEventListener('change', handleChange);

        return () => {
            subscription.remove();
        };
    }, []);

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
            <View style={[styles.container, { width: responsiveConfig.containerWidth }]}>
                <View style={[styles.twoBoxContainer, { flexDirection: responsiveConfig.flexDirection }]}>
                    <Pressable style={[
                        styles.upperLeftBoxContainer,
                        {
                            borderRadius: responsiveConfig.borderRadius,
                            marginTop: responsiveConfig.marginTop,
                            marginLeft: responsiveConfig.marginLeft,
                            marginRight: 8,
                            marginBottom: 8,
                        }
                    ]} onPress={() => onSort('recent')}>
                        <Text style={[styles.buttonText, { fontSize: responsiveConfig.fontSize }]}>Ultimas compras primero</Text>
                    </Pressable>
                    <Pressable style={[
                        styles.upperRightBoxContainer,
                        {
                            borderRadius: responsiveConfig.borderRadius,
                            marginTop: responsiveConfig.marginTop,
                            marginLeft: 8,
                            marginRight: responsiveConfig.marginRight,
                            marginBottom: 8,
                        }
                    ]} onPress={() => onSort('oldest')}>
                        <Text style={[styles.buttonText, { fontSize: responsiveConfig.fontSize }]}>Orden en que se fueron comprando</Text>
                    </Pressable>
                </View>
                <View style={[styles.twoBoxContainer, { flexDirection: responsiveConfig.flexDirection }]}>
                    <Pressable style={[
                        styles.downLeftBoxContainer,
                        {
                            borderRadius: responsiveConfig.borderRadius,
                            marginTop: 8,
                            marginLeft: responsiveConfig.marginLeft,
                            marginRight: 8,
                            marginBottom: responsiveConfig.marginBottom,
                        }
                    ]} onPress={() => onSort('az')}>
                        <Text style={[styles.buttonText, { fontSize: responsiveConfig.fontSize }]}>A-Z</Text>
                    </Pressable>
                    <Pressable style={[
                        styles.downRightBoxContainer,
                        {
                            borderRadius: responsiveConfig.borderRadius,
                            marginTop: 8,
                            marginLeft: 8,
                            marginRight: responsiveConfig.marginRight,
                            marginBottom: responsiveConfig.marginBottom,
                        }
                    ]} onPress={() => onSort('za')}>
                        <Text style={[styles.buttonText, { fontSize: responsiveConfig.fontSize }]}>Z-A</Text>
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
        // borderRadius, marginTop, marginLeft, marginRight, marginBottom serán dinámicos
    },
    upperRightBoxContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#d06666ff',
        borderWidth: 2,
        // borderRadius, marginTop, marginLeft, marginRight, marginBottom serán dinámicos
    },
    downLeftBoxContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#d06666ff',
        borderWidth: 2,
        // borderRadius, marginTop, marginLeft, marginRight, marginBottom serán dinámicos
    },
    downRightBoxContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#d06666ff',
        borderWidth: 2,
        // borderRadius, marginTop, marginLeft, marginRight, marginBottom serán dinámicos
    },
    buttonText: {
        color: '#d06666ff',
        fontWeight: 'bold',
        textAlign: 'center',
        // fontSize será dinámico
    },
});