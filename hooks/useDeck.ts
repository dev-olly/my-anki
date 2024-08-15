import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Deck } from '../types';
import {STORAGE_KEY} from '../utils/keys';


export const useDeck = (): [Deck, (words: Deck) => Promise<void>] => {
  const [deck, setDeck] = useState<Deck>({});

  useEffect(() => {
    loadWords();
  }, []);

  const loadWords = async () => {
    try {
      const savedWords = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedWords) setDeck(JSON.parse(savedWords));
    } catch (error) {
      console.error('Error loading words:', error);
    }
  };

  const saveWords = async (words: Deck) => {
    try {
      setDeck(words);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(words));
    } catch (error) {
      console.error('Error saving words:', error);
    }
  }

  return [deck, saveWords]
}