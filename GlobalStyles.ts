import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  botonCajaJuego: {
    width: '70%',
    backgroundColor: '#ff0000ff',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    margin: 10,
    borderWidth: 2,
    borderColor: '#23301daf',
    borderStyle: 'solid',
  },
  botonTextoJuego: {
    color: '#ffffffaf',
    fontWeight: 'bold',
    fontSize: 21,
    textAlign: 'center',
  }, 
  buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        width: '70%',
        alignSelf: 'center',
    },
    GoToHomeButtonContainer: {
        flex: 1,
        alignItems: 'center',
         // borderLeftColor: '#d06666ff',
       // borderLeftWidth: 2,
        borderColor: '#d06666ff',
        borderWidth: 2,
        borderRadius: 50,
        marginRight: 8,
    },
    sortButtonContainer: {
        flex: 1,
        alignItems: 'center',
        // borderLeftColor: '#d06666ff',
       // borderLeftWidth: 2,
        borderColor: '#d06666ff',
        borderWidth: 2,
        borderRadius: 50,
        marginLeft: 8,
    },
});
