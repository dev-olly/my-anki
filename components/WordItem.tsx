
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { ModalForm } from './ModalForm';



export const WordItem = ({word, translation, onDelete, editWord}: {word: string, translation : string, onDelete: (word: string) => void, editWord: (newWord: string, translation: string) => void}) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newWord, setNewWord] = useState(word);
  const [newTranslation, setNewTranslation] = useState(translation);

  return (
    <>

      <View style={styles.wordItem}>
        <Text style={{fontSize: 14}}>{word}</Text>
        <View style={styles.actions}>
          <Pressable onPress={() => setShowEditModal(true)}>
            <Text style={{marginRight: 10}}><Ionicons name="pencil" size={14} color={Colors.gray[600]} /></Text>
          </Pressable>
          <Pressable onPress={() => setShowModal(true)}>
            <Text><Ionicons name="trash" size={14} color={Colors.gray[600]}/></Text>
          </Pressable>
        </View>
      </View>

      {/* Delete Modal */}
      <Modal transparent={true} visible={showModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.popover}>
            <Text style={styles.title}>Are you sure you want to delete?</Text>
            <Text style={styles.body}>
              The word will be deleted from the deck and will not be available for review.
            </Text>
            <View style={styles.buttonContainer}>
              <Pressable onPress={() => {onDelete(word);  setShowModal(false); }}>
                <Text style={styles.affirmativeButtonText}>Yes, delete</Text>
              </Pressable>
              <Pressable onPress={() => {setShowModal(false); }}>
                <Text style={styles.cancelText}>No, cancel</Text>
              </Pressable>
            </View>
          </View>
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
    backgroundColor: 'white',
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
    backgroundColor: 'white',
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