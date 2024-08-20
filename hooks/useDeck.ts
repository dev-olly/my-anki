import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

import { Deck } from '../types';
import { STORAGE_KEY } from '../utils/keys';


export const useDeck = (deckName?: string) => {
  const [decks, setDecks] = useState<Deck[]>([]);
  
  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = async () => {
    try {
      const savedDecks = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedDecks) setDecks(JSON.parse(savedDecks));
    } catch (error) {
      console.error('Error loading decks:', error);
    }
  }

  const saveDeck = async (deck: Deck) => {
    try {
      const newDecks = [...decks, deck];  
      setDecks(newDecks);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDecks));
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
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
      setDecks(decks);
    }
  }

  const deleteDeck = async (deckName: string) => {
    const newDecks = decks.filter((deck) => deck.name !== deckName);
    setDecks(newDecks);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDecks));
  }

  const editDeck = async (deckName: string, newDeckName: string) => {
    const newDecks = decks.map((deck) => deck.name === deckName ? { ...deck, name: newDeckName } : deck);
    setDecks(newDecks);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDecks));
  }

  return {
    decks,
    saveDeck,
    loadWords,
    saveWords,
    deleteDeck,
    editDeck
  }
}