import { FlatList, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { useState } from 'react';

import { DeckItem } from '@/components/DeckItem';
import { ModalDeckForm } from '@/components/ModalDeckForm';
import { GrayThemedButton, PrimaryThemedButton } from '@/components/ThemedButton';
import { Colors } from '@/constants/Colors';
import { useDeck } from '@/hooks/useDeck';
import { Deck } from '@/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';

const NoDeck = ({ openAddModal }: { openAddModal: () => void }) => {
  return (
    <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.noDeckContainer}>
      <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.noDecksContainer}>
        <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.noTextTitle}>You don't have any decks yet.</ThemedText>
        <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.noText}>Create a deck to get started</ThemedText>
        <GrayThemedButton onPress={openAddModal}>
          <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.addDeckButtonText}>Create Deck</ThemedText>
        </GrayThemedButton>
      </ThemedView>
      <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.bottomButtonContainer}>
        <PrimaryThemedButton onPress={openAddModal} extraStyle={{width: '100%'}}>
          <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.addDeckButtonText}>Create Deck</ThemedText>
        </PrimaryThemedButton>
      </ThemedView>
    </ThemedView>
  )
}

export default function HomeScreen() {
  const { decks, saveDeck, deleteDeck, editDeck } = useDeck();
  const [showModal, setShowModal] = useState(false);
  const [deckName, setDeckName] = useState('');
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
    setDeckName('');
  }

  const onDelete = (deckName: string) => {
    deleteDeck(deckName);
  }

  const onEdit = (deckName: string, newDeckName: string) => {
    editDeck(deckName, newDeckName);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedSafeAreaView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.safeArea}>
        <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.tabTitle}>All decks</ThemedText>
        {decks.length == 0 ?
          <NoDeck openAddModal={openAddModal} />
        : <ThemedView style={styles.container}>
            <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.deckListTitleContainer}>
              <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.deckListTitle}>{decks.length} decks</ThemedText>
              <GrayThemedButton onPress={openAddModal} extraStyle={{marginTop: 0}}>
                <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.addDeckButtonText}>Create Deck</ThemedText>
              </GrayThemedButton>
            </ThemedView>
            <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.deckList}>
              <FlatList data={decks} renderItem={({ item }) => <DeckItem deck={item} onDelete={onDelete} editDeck={onEdit} />} />
            </ThemedView>
          </ThemedView>}
      </ThemedSafeAreaView>
      {showModal && <ModalDeckForm onSubmit={onSubmit} showModal={showModal} setShowModal={setShowModal} deckName={deckName} setDeckName={setDeckName} title="Create a new Deck" />}
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
    flex: 1,
    marginTop: 16,
    marginHorizontal: 16,
  },
  deckList: {
    marginTop: 16,
    height: '100%',
  },
  deckListTitle: {
    fontSize: 14,
    fontWeight: 'semibold',
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});