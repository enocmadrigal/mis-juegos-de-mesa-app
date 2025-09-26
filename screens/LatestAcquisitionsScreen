import { Modal, TextInput } from "react-native";
import GoToHomeButton from "../componentes/GoToHomeButton";

export default function LatestAcquisitionsScreen({isVisible, onGoToHomeButtonPress}: {isVisible: boolean, onGoToHomeButtonPress: () => void}) {
    
    const handleGoToHomeButtonPress = () => {
    onGoToHomeButtonPress();
   }
    
    return (
        <Modal visible={isVisible}>
            <TextInput placeholder="Buscar juego..." />
             <GoToHomeButton onPress={handleGoToHomeButtonPress} />
        </Modal>
    )
}