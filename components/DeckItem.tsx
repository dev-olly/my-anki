import { Deck } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { ModalDeckForm } from './ModalDeckForm';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

export const DeckItem = ({deck, onDelete, editDeck}: {deck: Deck, onDelete: (deckName: string) => void, editDeck: (deckName: string, newDeckName: string) => void}) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newDeck, setNewDeck] = useState(deck.name);

  const onEdit = (deckName: string) => {
    editDeck(deck.name, deckName);
    setNewDeck(deckName);
    setShowEditModal(false);
  }

  return (
    <>
      <Link href={`/decks/${deck.name}` as const} asChild>
        <Pressable>
          <ThemedView lightColor={Colors.light.background} darkColor={Colors.gray[800]} style={styles.wordItem}>
            <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.deckName}>{deck.name}</ThemedText>
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
        </Pressable>
      </Link>

      {/* Delete Modal */}
      <Modal transparent={true} visible={showModal}>
        <View style={styles.modalOverlay}>
          <ThemedView lightColor={Colors.light.background} darkColor={Colors.gray[800]} style={styles.popover}>
            <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.title}>Are you sure you want to delete?</ThemedText>
            <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.body}>
              The word will be deleted from the deck and will not be available for review.
            </ThemedText>
            <View style={styles.buttonContainer}>
              <Pressable onPress={() => {onDelete(deck.name); setShowModal(false); }}>
                <ThemedText lightColor={Colors.red[600]} darkColor={Colors.red[600]} style={styles.affirmativeButtonText}>Yes, delete</ThemedText>
              </Pressable>
              <Pressable onPress={() => {setShowModal(false); }}>
                <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.cancelText}>No, cancel</ThemedText>
              </Pressable>
            </View>
          </ThemedView>
        </View>
      </Modal>

      {/* Edit Modal */}
      {showEditModal && <ModalDeckForm onSubmit={onEdit} showModal={showEditModal} setShowModal={setShowEditModal} deckName={newDeck} setDeckName={setNewDeck} title="Edit Deck" />}
    </>
  );
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
  deckName: {
    fontSize: 14,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  affirmativeButtonText: {
    fontSize: 14,
    marginRight: 10,
  },
  cancelText: {
    fontSize: 14,
  },
  // ... other styles remain unchanged
})