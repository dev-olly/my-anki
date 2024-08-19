
import { Colors } from '@/constants/Colors';
import { useRef, useState } from 'react';
import { Animated, Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { RectButton, TextInput } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';



export const WordItem = ({word, translation, onDelete, editWord}: {word: string, translation : string, onDelete: (word: string) => void, editWord: (oldWord: string, word: string, translation  : string) => void}) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newWord, setNewWord] = useState(word);
  const [newTranslation, setNewTranslation] = useState(translation);
  const swipeableRef = useRef<Swipeable>(null);
  
  const renderRightActions = (progress: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.optionContainer}>
        <Animated.View style={{ flex:1, transform: [{ translateX: trans }] }}>
          <RectButton style={styles.editButton} onPress={() => setShowEditModal(true) }>
            <Text style={styles.editButtonText}>Edit</Text>
          </RectButton>
        </Animated.View>
        <Animated.View style={{ flex:1, transform: [{ translateX: trans }] }}>
            <RectButton style={styles.deleteButton} onPress={() => setShowModal(true)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </RectButton>
        </Animated.View>
      </View>
    )
  }

  return (
    <Swipeable renderRightActions={renderRightActions} rightThreshold={20} ref={swipeableRef}>
      <View style={styles.wordItem}>
        <Text>{word}</Text>
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
              <Pressable onPress={() => {onDelete(word); swipeableRef.current?.close(); setShowModal(false); }}>
                <Text style={styles.affirmativeButtonText}>Yes, delete</Text>
              </Pressable>
              <Pressable onPress={() => {setShowModal(false); swipeableRef.current?.close(); }}>
                <Text style={styles.cancelText}>No, cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal transparent={true} visible={showEditModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.popover}>
            <Text style={styles.title}>Edit</Text>
            <TextInput
              value={newWord}
              placeholder="word"
              style={styles.input}
              onChangeText={setNewWord}
            />
            <TextInput
              value={newTranslation}
              placeholder="translation"
              style={styles.input}
              onChangeText={setNewTranslation}
            />
            <Pressable onPress={() => {editWord(word, newWord, newTranslation); swipeableRef.current?.close(); setShowEditModal(false); }}>
              <View>
                <Text style={styles.saveButtonText}>Save</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => {swipeableRef.current?.close(); setShowEditModal(false); }}>
              <View>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </View>
            </Pressable>
          </View>

        </View>
      </Modal>
    </Swipeable>
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
  wordItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'gray',
    width: '100%',
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