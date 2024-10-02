import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { ModalForm } from './ModalForm';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export const WordItem = ({word, translation, onDelete, editWord}: {word: string, translation : string, onDelete: (word: string) => void, editWord: (newWord: string, translation: string) => void}) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newWord, setNewWord] = useState(word);
  const [newTranslation, setNewTranslation] = useState(translation);

  return (
    <>
      <ThemedView lightColor={Colors.light.background} darkColor={Colors.gray[800]} style={styles.wordItem}>
        <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={{fontSize: 14}}>{word}</ThemedText>
        <View style={styles.actions}>
          <Pressable onPress={() => setShowEditModal(true)}>
            <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={{marginRight: 10}}>
              <Ionicons name="pencil" size={14} />
            </ThemedText>
          </Pressable>
          <Pressable onPress={() => setShowModal(true)}>
            <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text}>
              <Ionicons name="trash" size={14} />
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>

      {/* Delete Modal */}
      <Modal transparent={true} visible={showModal}>
        <View style={styles.modalOverlay}>
          <ThemedView lightColor={Colors.light.background} darkColor={Colors.gray[800]} style={styles.popover}>
            <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.title}>Are you sure you want to delete?</ThemedText>
            <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.body}>
              The word will be deleted from the deck and will not be available for review.
            </ThemedText>
            <View style={styles.buttonContainer}>
              <Pressable onPress={() => {onDelete(word);  setShowModal(false); }}>
                <ThemedText lightColor={Colors.red[600]} darkColor={Colors.red[600]} style={styles.affirmativeButtonText}>Yes, delete</ThemedText>
              </Pressable>
              <Pressable onPress={() => {setShowModal(false); }}>
                <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.cancelText}>No, cancel</ThemedText>
              </Pressable>
            </View>
          </ThemedView>
        </View>
      </Modal>
      {showEditModal && <ModalForm word={newWord} translation={newTranslation} showModal={showEditModal} setShowModal={setShowEditModal} setWord={setNewWord} setTranslation={setNewTranslation} onSubmit={() => {editWord(newWord, newTranslation); setShowEditModal(false);}} title="Edit Word" buttonText="Save"/>}
    </>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popover: {
    padding: 10,
    borderRadius: 5,
    width: '75%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 10, 
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wordItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    marginBottom: 10,
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '40%',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  deleteButton: {
    backgroundColor: Colors.red[500],
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    padding: 10,
    height: '100%',
  },
  editButton: {
    backgroundColor: Colors.blue[500],
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    padding: 10,
    height: '100%',
  },
  editButtonText: {
    color: 'white',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    
  },
  affirmativeButtonText: {
    color: Colors.red[500],
    fontSize: 14,
    marginRight: 10,
  },
  cancelText: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  saveButtonText: {
    color: Colors.blue[500],
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  cancelButtonText: {
    color: Colors.red[500],
    textAlign: 'center',
    fontSize: 14,
  },
})