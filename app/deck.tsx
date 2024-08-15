import React, { useState } from "react";
import { Text, View } from 'react-native';

import { Playground } from "@/components/Playground";
import { WordData } from "@/types";
import { useDeck } from '../hooks/useDeck';
import { Level, updateData } from "@/utils/spaced-repetition";


export default function DeskScreen() {
  const [index, setIndex] = useState(0)
  const [deck, setDeck] = useDeck();

  // flatten deck to words array
  const words: Array<WordData & {word: string}> = Object.entries(deck).map(([word, data]) => ({
    word,
    ...data
  }));
  // sort by interval
  words.sort((a, b) => a.interval - b.interval);

  
  const wordItem = words[index]
  const presentWord = wordItem ? wordItem['word'] : ''

  const nextWord = (level: Level) => {
    const newDeck = updateData(deck, presentWord, level);
    console.log('newDeck', newDeck)
    setDeck(newDeck);
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
      { wordItem ? <Playground word={presentWord} data={deck[presentWord]} next={nextWord}/> : 
        <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'semibold', margin: 16 }}>
          Congratulations! You have finished the deck.
        </Text>
      }
    </View>
  )
}