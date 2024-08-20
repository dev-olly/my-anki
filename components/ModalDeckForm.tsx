import { View, Text, SafeAreaView, Modal, StyleSheet, TextInput, Pressable   } from "react-native"
import { useState } from "react";
import { Colors } from "@/constants/Colors";

export const ModalDeckForm = () => {
  const [deckName, setDeckName] = useState('');
  return (
    <SafeAreaView>
      <Modal animationType="slide" transparent={true} visible={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add Deck</Text>
            <Text style={styles.modalText}>
              Create a new deck to store your words
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setDeckName}
              value={deckName}
              placeholder="Nicos weg A2 episode 1"
            />
            <Pressable>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Add</Text>
              </View>
            </Pressable>
            <Pressable>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
  }


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'semibold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 12,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  button: {
    marginTop: 16,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    backgroundColor: Colors.blue[500],
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButtonText: {
    marginTop: 16,
    color: Colors.red[500],
    textAlign: 'center',
  }
});