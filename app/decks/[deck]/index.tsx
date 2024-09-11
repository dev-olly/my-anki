import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import { GrayThemedButton, PrimaryThemedButton } from '@/components/ThemedButton';
import { ModalForm } from '@/components/ModalForm';
import { Colors } from '@/constants/Colors';
import { useDeck } from '@/hooks/useDeck';
import { LOWER_BOUND } from '@/utils/spaced-repetition';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { WordItem } from '@/components/WordItem';


const NoWords = ({openModal}: {openModal: () => void}) => {
  return (
    <View style={styles.noWordContainer}>
      <View style={styles.noWordsContent}>
        <View>
          <Text style={styles.noTextTitle}>You don't have any words yet.</Text>
        </View>
        <View style={{marginTop: 8}}>
          <Text style={styles.noText}>Add some words and start learning!</Text>
        </View>
        <View style={styles.buttonContainer}>

          <PrimaryThemedButton onPress={openModal} extraStyle={{width: 250, marginTop: 0}}>
            <Text style={{ color: Colors.light.background }}>Create Words</Text>
        </PrimaryThemedButton>
        </View>
      </View>
    </View>
  )
}

export default function DeckScreen() {
  const [word, setWord] = useState('')
  const [translation, setTranslation] = useState('')
  const [showModal, setShowModal] = useState(false);

  const { deck: deckName } = useLocalSearchParams();

  const {currentDeck:deck , saveWords} = useDeck(deckName as string)

  const words = Object.keys(deck?.words || {})

  useEffect(() => {
    // This effect will run when the component mounts and whenever currentDeck changes
  }, [deck]);

  const addWord = async () => {
    if(!deck) return
    const newWords = {...deck.words, [word]: {translation, ease: LOWER_BOUND, interval: 1, lastReview: new Date().toISOString(), nextReview: new Date().toISOString()}};
    saveWords(newWords);
    setWord('');
    setShowModal(false);
  };

  const deleteWord = (word: string) => {
    if(!deck) return
    const newWords = {...deck.words};
    delete newWords[word];
    saveWords(newWords);
  }

  const editWord = (oldWord: string, word: string, translation: string) => {
    console.log('edit word', oldWord, word, translation)
    if(!deck) return
    const newWords = {...deck.words, [word]: {translation, ease: LOWER_BOUND, interval: 1, lastReview: new Date().toISOString(), nextReview: new Date().toISOString()}};
    if(oldWord !== word) delete newWords[oldWord];
    saveWords(newWords);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {words.length == 0 && <NoWords openModal={() => setShowModal(true)} />}
        
          {
            words.length > 0 && <View style={{ flex: 1, marginTop: 16, marginHorizontal: 16}}>
              <View style={styles.listheader}>
                <Text >{words.length} words.</Text>
                <GrayThemedButton onPress={() => setShowModal(true)} extraStyle={{marginTop: 0}}>
                  <Text style={{fontSize: 12, fontWeight: 'bold', color: Colors.gray[900]}}>Add Word</Text>
                </GrayThemedButton>
              </View>
              <View style={{marginTop: 16, height: '80%'}}>
                {deck && <FlatList data={words} renderItem={({item}) => <WordItem word={item} translation={deck.words[item].translation} onDelete={deleteWord} editWord={editWord} />} /> }   
              </View>
              <View style={{height: '20%'}}>
                <Link href={`/decks/${deckName}/playground`} asChild>
                  <PrimaryThemedButton onPress={() => undefined} extraStyle={{width: '100%', marginTop: 0}}>
                    <Text style={{ color: Colors.light.background }}>Start Deck</Text>
                  </PrimaryThemedButton>
                </Link>
              </View>
            </View>
          }
      
        {showModal && <ModalForm word={word} translation={translation} showModal={showModal} setShowModal={setShowModal} setWord={setWord} setTranslation={setTranslation} onSubmit={addWord} title="Add Word" buttonText="Create" />}

      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  tabTitle: {
    fontSize: 16,
    fontWeight: 'semibold',
    marginLeft: 16,
    marginTop: 16,
  },
  noWordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noWordsContent: {
    alignItems: 'center',
    // gap: 16,
    // padding: 20, // Add some padding
    flex: 0,
  },
  buttonContainer: {
    // marginTop: 24,
  },
  noTextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Ensure text is visible
    paddingTop: 16,
  },
  noText: {
    paddingTop: 16,
    fontSize: 14,
    color: 'black', // Ensure text is visible
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
  noText: { 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '85%' 
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