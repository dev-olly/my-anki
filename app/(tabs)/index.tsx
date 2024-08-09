import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

import { Image, StyleSheet, Platform, View, TextInput, Alert, Button, Text, FlatList, SafeAreaView, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { Link } from 'expo-router';

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
  const [words, setWords] = useState<string[]>([])

  useEffect(() => {
    loadWords();
  }, []);

  const loadWords = async () => {
    try {
      const savedWords = await AsyncStorage.getItem('words');
      if (savedWords) setWords(JSON.parse(savedWords));
    } catch (error) {
      console.error('Error loading words:', error);
    }
  };

  const addWord = async (word: string) => {
    const newWords = [...words, word];
    setWords(newWords);
    setWord('');
    try {
      await AsyncStorage.setItem('words', JSON.stringify(newWords));
    } catch (error) {
      console.error('Error saving words:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: '15%', backgroundColor: 'white', paddingTop: '5%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'   }}>
        <TextInput
          style={styles.input}
          onChangeText={setWord}
          value={word}
          placeholder="search for a word"
        />
        <Button
          title="Add"
          onPress={() => addWord(word)}
        />
        </View>
        {words.length == 0 && <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '85%' }}>
          <Text>You have no words, add some words and start learning!</Text>
        </View>}
        {
          words.length > 0 && <View style={{ flex: 1, marginTop: 10}}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: 'semibold', marginBottom: 10, marginLeft: 10 }}>{words.length} words.</Text>
              <Button title="Start" onPress={() => Alert.alert('Starting...')} />
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
});