import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

import { Deck } from '../types';
import { NEW_STORAGE_KEY } from '../utils/keys';


export const useDeck = (deckName?: string) => {
  const [decks, setDecks] = useState<Deck[]>([]);
  
  
  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = async () => {
    try {
      const savedDecks = await AsyncStorage.getItem(NEW_STORAGE_KEY);
      if (savedDecks) setDecks(JSON.parse(savedDecks));
    } catch (error) {
      console.error('Error loading decks:', error);
    }
  }

  const saveDeck = async (deck: Deck) => {
    try {
      setDecks([...decks, deck]);
      await AsyncStorage.setItem(NEW_STORAGE_KEY, JSON.stringify(decks));
    } catch (error) {
      console.error('Error saving deck:', error);
    }
  }

  const loadWords = (deckName: string ): Deck | undefined => {
    const deck = decks.find((deck) => deck.name === deckName);
    return deck;
  };

  const saveWords = async (words: Deck['words']) => {
    const itemDeck = decks.find((deck) => deck.name === deckName);
    if (itemDeck) {
      itemDeck.words = words;
      decks.map((deck) => deck.name === deckName ? itemDeck : deck);  
      await AsyncStorage.setItem(NEW_STORAGE_KEY, JSON.stringify(decks));
      setDecks(decks);
    }
  }

  return {
    decks,
    saveDeck,
    loadWords,
    saveWords
  }
}