import { Playground } from "@/components/Playground";
import { useDeck } from "@/hooks/useDeck";
import { Level, updateData } from "@/utils/spaced-repetition";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';

export default function PlaygroundScreen() {
  const [index, setIndex] = useState(0)
  const { deck: deckName } = useLocalSearchParams();

  const {currentDeck:deck , saveWords, flattenedWords: words} = useDeck(deckName as string);

  useEffect(() => {
    // This effect will run when the component mounts and whenever currentDeck changes
  }, [deck]);
  
  const wordItem = words[index]
  const presentWord = wordItem ? wordItem['word'] : ''

  if (!deck) {
    return (
      <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.container}>
        <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.loadingText}>
          Loading deck...
        </ThemedText>
      </ThemedView>
    );
  }

  const nextWord = (level: Level) => {
    const newWords = updateData(deck.words, presentWord, level);
    saveWords(newWords);
    const newIndex = index + 1;
    if (newIndex < words.length) {
      setIndex(newIndex);
    } else {
      setIndex(-1);
    }
  }

  return (
    <ThemedSafeAreaView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.container}>
      <ThemedText lightColor={Colors.light.text} darkColor={Colors.gray[300]} style={styles.headerText}>
        A Step at a time
      </ThemedText>
      { wordItem ? (
        <Playground word={presentWord} data={deck.words[presentWord]} next={nextWord}/>
      ) : (
        <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.congratsText}>
          Congratulations! You have finished the deck.
        </ThemedText>
      )}
    </ThemedSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 16,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 14,
    margin: 16,
  },
  congratsText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 16,
  },
});