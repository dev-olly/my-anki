import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { useState } from 'react';

import { DeckItem } from '@/components/DeckItem';
import { ModalDeckForm } from '@/components/ModalDeckForm';
import { GrayThemedButton, PrimaryThemedButton } from '@/components/ThemedButton';
import { Colors } from '@/constants/Colors';
import { useDeck } from '@/hooks/useDeck';
import { Deck } from '@/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const NoDeck = ({ openAddModal }: { openAddModal: () => void }) => {
  return (
    <View style={styles.noDeckContainer}>
      <View style={styles.noDecksContainer}>
        <Text style={styles.noTextTitle}>You don't have any decks yet.</Text>
        <Text style={styles.noText}>Create a deck to get started</Text>
        <GrayThemedButton onPress={openAddModal}>
          <Text style={styles.addDeckButtonText}>Create Deck</Text>
        </GrayThemedButton>
      </View>
      <View style={styles.bottomButtonContainer}>
        <PrimaryThemedButton onPress={openAddModal} extraStyle={{width: '100%'}}>
          <Text style={{ color: Colors.light.background }}>Create Deck</Text>
        </PrimaryThemedButton>
      </View>
    </View>
  )
}

export default function HomeScreen() {
  const { decks, saveDeck, deleteDeck, editDeck } = useDeck();
  const [showModal, setShowModal] = useState(false);
  const openAddModal = () => {
    setShowModal(true);
  };

  const onSubmit = (deckName: string) => {
    const deck: Deck = {
      name: deckName,
      dateCreated: new Date().toISOString(),
      words: {},
    };
    saveDeck(deck);
    setShowModal(false);
  }

  const onDelete = (deckName: string) => {
    deleteDeck(deckName);
  }

  const onEdit = (deckName: string, newDeckName: string) => {
    editDeck(deckName, newDeckName);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.tabTitle}>All decks</Text>
        {decks.length == 0 ?
          <NoDeck openAddModal={openAddModal} />
        : <View style={styles.container}>
            <View style={styles.deckListTitleContainer}>
              <Text style={styles.deckListTitle}> You have {decks.length} decks</Text>
              {/* <Pressable onPress={openAddModal}>
                <View style={styles.createDeckButton}>
                  <Text style={styles.createDeckButtonText}>Create Deck</Text>
                </View>
              </Pressable> */}
            </View>
            <FlatList data={decks} style={styles.deckList} renderItem={({ item }) => <DeckItem deck={item} onDelete={onDelete} editDeck={onEdit} />} />
          </View>}
      </SafeAreaView>
      <ModalDeckForm onSubmit={onSubmit} showModal={showModal} setShowModal={setShowModal} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  noText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
  },
  tabTitle: {
    fontSize: 22,
    fontWeight: 'semibold',
    marginLeft: 16,
    marginTop: 16,
  },
  container: {
    // flex: 1,
    marginTop: 16,
  },
  deckList: {
    marginTop: 16,
  },
  deckListTitle: {
    fontSize: 16,
    marginLeft: 10,
  },
  addDeckButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.gray[900],
  },
  deckListTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  createDeckButton: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 10,
  },
  createDeckButtonText: {
    color: Colors.light.background,
  },
  noTextTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 16,
    textAlign: 'center',
  },
  noDecksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.gray[400],
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  noDeckContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  bottomButtonContainer: {
    marginBottom: 16,
  },
  safeArea: {
    flex: 1,
  },
});