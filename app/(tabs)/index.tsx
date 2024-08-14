import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ModalForm } from '@/components/ModalForm';
import { Link } from 'expo-router';
import { useState } from 'react';

import { useDeck } from '@/hooks/useDeck';
import { STORAGE_KEY } from '@/utils/keys';
import { UPPER_BOUND } from '@/utils/spaced-repetition';



const WordItem = ({word}: {word: string}) => {
  return (
    <Link href={`/deck`} asChild>
      <Pressable style={{ flex: 1, padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderColor: 'gray', width: '100%' }}>
            <Text>{word}</Text>
      </Pressable>
    </Link>
  )
}

export default function HomeScreen() {
  const [word, setWord] = useState('')
  const [deck, setDeck] = useDeck()

  const words = Object.keys(deck)

  const [showModal, setShowModal] = useState(false);


  const initializeWord = (word: string) => {
    setWord(word);
    setShowModal(true);
  }

  const addWord = async (translation: string) => {

    const newWords = {...deck, [word]: {translation, ease: UPPER_BOUND, interval: 1, lastReview: new Date().toISOString(), nextReview: new Date().toISOString()}};
    setDeck(newWords);
    setWord('');
    setShowModal(false);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newWords));
    } catch (error) {
      console.error('Error saving words:', error);
    }
  };

  return (
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
              <Link href={`/deck`} asChild>
                <Text style={styles.startDeckButton}>Start Deck </Text>
              </Link>
            </View>
            <FlatList data={words} renderItem={({item}) => <WordItem word={item} />} />    
          </View>
        }

      {/* <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
          <ThemedText>
            Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
            Press{' '}
            <ThemedText type="defaultSemiBold">
              {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
            </ThemedText>{' '}
            to open developer tools.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          <ThemedText>
            Tap the Explore tab to learn more about what's included in this starter app.
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView> */}
    
    </SafeAreaView>
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