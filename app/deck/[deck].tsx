
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ModalForm } from '@/components/ModalForm';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { useDeck } from '@/hooks/useDeck';
import { LOWER_BOUND } from '@/utils/spaced-repetition';
import { WordItem } from '@/components/WordItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function DeckScreen() {
  const [word, setWord] = useState('')
  const { deck: deckName } = useLocalSearchParams();

  console.log('deckName', deckName)
  const {getDeck, saveWords, deleteDeck, editDeck} = useDeck(deckName as string)
  

  const deck = getDeck()

  const words = Object.keys(deck?.words || {})

  const [showModal, setShowModal] = useState(false);

  const initializeWord = (word: string) => {
    setWord(word);
    setShowModal(true);
  }

  const addWord = async (translation: string) => {
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
    if(!deck) return
    const newWords = {...deck.words, [word]: {translation, ease: LOWER_BOUND, interval: 1, lastReview: new Date().toISOString(), nextReview: new Date().toISOString()}};
    if(oldWord !== word) delete newWords[oldWord];
    saveWords(newWords);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ModalForm word={word} showModal={showModal} onClose={() => setShowModal(false)} onSubmit={addWord}/>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={setWord}
            value={word}
            placeholder="search for a word"
          />
          <Button
            title="Add"
            onPress={() => initializeWord(word)}
          />
          </View>
          {words.length == 0 && <View style={styles.noText}>
            <Text>You have no words, add some words and start learning!</Text>
          </View>}
          {
            words.length > 0 && <View style={{ flex: 1, marginTop: 10}}>
              <View style={styles.listheader}>
                <Text style={{ fontSize: 16, fontWeight: 'semibold', marginBottom: 10, marginLeft: 10 }}>{words.length} words.</Text>
                <Link href={`/playground`} asChild>
                  <Text style={styles.startDeckButton}>Start Deck </Text>
                </Link>
              </View>
              {deck && <FlatList data={words} renderItem={({item}) => <WordItem word={item} translation={deck.words[item].translation} onDelete={deleteWord} editWord={editWord} />} /> }   
            </View>
          }
      
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
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