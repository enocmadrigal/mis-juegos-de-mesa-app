import React from 'react';
import Modal from "react-native-modal";
import { Dimensions, View, StyleSheet } from "react-native";
import FindGameFlowScreen from './FindGameFlowScreen';

export default function FindGameForOccasionScreen({
  isVisible,
  onGoToHomeButtonPress,
}: {
  isVisible: boolean;
  onGoToHomeButtonPress: () => void;
}) {
  const windowWidth = Dimensions.get('window').width;
  const modalWidth = windowWidth > 700 ? "70%" : "70%";

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={900}
      animationOutTiming={900}
      style={{ margin: 0 }}
      backdropOpacity={0.7}
      backdropColor="#140606"
      onBackdropPress={onGoToHomeButtonPress}
    >
      <View style={[styles.modalContainer, { width: modalWidth }]}>
        <FindGameFlowScreen navigation={{ goBack: onGoToHomeButtonPress }} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 8,
    overflow: "hidden",
    maxHeight: "50%",
    marginTop: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});

