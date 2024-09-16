import { Playground } from "@/components/Playground";
import { useDeck } from "@/hooks/useDeck";
import { WordData } from "@/types";
import { Level, updateData } from "@/utils/spaced-repetition";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useMemo, useEffect } from "react";
import { Text, View } from 'react-native';



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
      <View style={{ flex: 1, backgroundColor: 'white', height: '100%' }}>
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'semibold', margin: 16 }}>
          Loading deck...
        </Text>
      </View>
    );
  }

  const nextWord = (level: Level) => {
    const newWords = updateData(deck.words, presentWord, level);
    saveWords(newWords);
    const newIndex = index + 1;
    if (newIndex < words.length) {
      setIndex(newIndex);
    }else {
      setIndex(-1);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white', height: '100%' }}>
      <Text style={{textAlign: 'center', fontSize: 14,  margin: 16 }}>A Step at a time</Text>
      { wordItem ? <Playground word={presentWord} data={deck.words[presentWord]} next={nextWord}/> : 
        <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'semibold', margin: 16 }}>
          Congratulations! You have finished the deck.
        </Text>
      }
    </View>
  )
}