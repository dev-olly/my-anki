import React, { useState } from "react";
import { Text, View } from 'react-native';

import { Playground } from "@/components/Playground";
import { WordData } from "@/types";
import { useDeck } from '../hooks/useDeck';



export default function DeskScreen() {
  const [index, setIndex] = useState(0)
  const [deck] = useDeck();
  
  // flatten deck to words array
  const words: Array<WordData & {word: string}> = Object.entries(deck).map(([word, data]) => ({
    word,
    ...data
  }));
  // sort by interval
  words.sort((a, b) => a.interval - b.interval);
  
  
  return (
    <View style={{ flex: 1, backgroundColor: 'white', height: '100%' }}>
      <Text style={{textAlign: 'center', fontSize: 14,  margin: 16 }}>A Step at a time</Text>
      <Playground />
    </View>
  )
}