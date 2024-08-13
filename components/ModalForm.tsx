import React, { useState } from "react"
import { View, Text, SafeAreaView, Modal, StyleSheet, TextInput, Button, Pressable } from "react-native"

export const ModalForm = ({word, showModal, onClose, onSubmit}: {word: string, showModal: boolean, onClose: () => void, onSubmit: (translation: string) => void}) => {
  const [translation, setTranslation] = useState('');
  return (
    <SafeAreaView>
      <Modal animationType="slide" transparent={false} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Nice! Almost there...</Text>
            <Text style={styles.modalText}> Add a translation for <Text style={styles.modalTextBold}>{word}</Text>:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTranslation}
              value={translation}
              placeholder="The Man"
            />
            <Pressable onPress={() => onSubmit(translation)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Add</Text>
              </View>
            </Pressable>
            <Pressable onPress={onClose}>
              <Text style={styles.cancelButtonText}>Close</Text>
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
  input: {
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'semibold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 12,
    marginBottom: 10,
  },
  modalTextBold: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 16,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButtonText: {
    marginTop: 16,
    color: 'gray',
    textAlign: 'center',
  }
});