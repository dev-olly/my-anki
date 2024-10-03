import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { ModalForm } from '@/components/ModalForm';
import { GrayThemedButton, PrimaryThemedButton } from '@/components/ThemedButton';
import { WordItem } from '@/components/WordItem';
import { Colors } from '@/constants/Colors';
import { useDeck } from '@/hooks/useDeck';
import { LOWER_BOUND } from '@/utils/spaced-repetition';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { useThemeColor } from '@/hooks/useThemeColor';

const NoWords = ({openModal}: {openModal: () => void}) => {
  return (
    <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.noWordContainer}>
      <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.noWordsContent}>
        <ThemedText lightColor={Colors.light.text} darkColor={Colors.gray[300]} style={styles.noTextTitle}>You don't have any words yet.</ThemedText>
        <ThemedText lightColor={Colors.light.text} darkColor={Colors.gray[300]} style={styles.noTextContent}>Add some words and start learning!</ThemedText>
        <View style={styles.noTextButtonContainer}>
          <PrimaryThemedButton onPress={openModal} extraStyle={{width: 250, marginTop: 0}}>
            <ThemedText lightColor={Colors.light.background} darkColor={Colors.dark.background}>Create Words</ThemedText>
          </PrimaryThemedButton>
        </View>
      </ThemedView>
    </ThemedView>
  )
}

export default function DeckScreen() {
  const [word, setWord] = useState('')
  const [translation, setTranslation] = useState('')
  const [showModal, setShowModal] = useState(false);

  const { deck: deckName } = useLocalSearchParams();

  const {currentDeck:deck , saveAndSetCurrentDeck} = useDeck(deckName as string)

  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

  const words = Object.keys(deck?.words || {})

  const addWord = async () => {
    if(!deck) return
    const newWords = {...deck.words, [word]: {translation, ease: LOWER_BOUND, interval: 1, lastReview: new Date().toISOString(), nextReview: new Date().toISOString()}};
    saveAndSetCurrentDeck(newWords);
    setWord('');
    setTranslation('');
    setShowModal(false);
  };

  const deleteWord = (word: string) => {
    if(!deck) return
    const newWords = {...deck.words};
    delete newWords[word];
    saveAndSetCurrentDeck(newWords);
  }

  const editWord = (oldWord: string) => (newWord: string, newTranslation: string) => {
    if(!deck) return
    const newWords = {...deck.words, [newWord]: {translation: newTranslation, ease: LOWER_BOUND, interval: 1, lastReview: new Date().toISOString(), nextReview: new Date().toISOString()}};
    if(oldWord !== newWord) delete newWords[oldWord];
    saveAndSetCurrentDeck(newWords);
  }

  return (
    // <ThemedSafeAreaView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.AndroidSafeArea}>
      <SafeAreaView style={{backgroundColor, ...styles.AndroidSafeArea}}>
        {words.length == 0 && <NoWords openModal={() => setShowModal(true)} />}
        {words.length > 0 && (
          <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={{ flex: 1, marginHorizontal: 16}}>
            <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={{fontSize: 22, fontWeight: 'bold', marginVertical: 16}}>{deck?.name}</ThemedText>
            <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.listheader}>
              <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text}>{words.length} words.</ThemedText>
              <GrayThemedButton onPress={() => setShowModal(true)} extraStyle={{marginTop: 0}}>
                <ThemedText lightColor={Colors.light.text} darkColor={Colors.gray[800]} style={{fontSize: 12, fontWeight: 'bold'}}>Add Word</ThemedText>
              </GrayThemedButton>
            </ThemedView>
            <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={{marginTop: 16, height: '80%'}}>
              {deck && <FlatList data={words} renderItem={({item}) => <WordItem word={item} translation={deck.words[item].translation} onDelete={deleteWord} editWord={editWord(item)} />} />}   
            </ThemedView>
            <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={{height: '20%'}}>
              <Link href={`/decks/${deckName}/playground`} asChild>
                <PrimaryThemedButton onPress={() => undefined} extraStyle={{width: '100%', marginTop: 0}}>
                  <ThemedText lightColor={Colors.light.background} darkColor={Colors.dark.background}>Start Deck</ThemedText>
                </PrimaryThemedButton>
              </Link>
            </ThemedView>
          </ThemedView>
        )}
      
        {showModal && <ModalForm word={word} translation={translation} showModal={showModal} setShowModal={setShowModal} setWord={setWord} setTranslation={setTranslation} onSubmit={addWord} title="Add Word" buttonText="Create" />}

      </SafeAreaView>

   // </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    // backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, 
    // borderWidth: 2, 
    // borderColor: 'blue'
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: 'semibold',
    marginLeft: 16,
    marginTop: 16,
  },
  noWordContainer: {
    flex: 1,
  },
  noWordsContent: {
    alignItems: 'center',
    flex: 0,
  },
  noTextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 16,
  },
  noTextContent: {
    marginTop: 4,
    fontSize: 12,
  },
  noTextButtonContainer: {
    marginTop: 16,
  },
  addDeckButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Ensure text is visible
  },
  container: { 
    height: '15%', 
    backgroundColor: 'white', 
    paddingTop: '5%', 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'   
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
  listheader: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  startDeckButton: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'black',
  }
});