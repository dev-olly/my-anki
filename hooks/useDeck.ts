import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

import { Deck } from '../types';
import { STORAGE_KEY } from '../utils/keys';


export const useDeck = (deckName?: string) => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [currentDeck, setCurrentDeck] = useState<Deck | undefined>();

  useEffect(() => {
    loadDecks();
  }, []);

  useEffect(() => {
    if(deckName) {
      getDeck();
    }
  }, [decks, deckName]);

  const getDeck = (): Deck | undefined => {
    const deck = decks.find((deck) => deck.name === deckName);
    setCurrentDeck(deck);
    return deck;
  };


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
      const deckName = deck.name;
      const deckExists = decks.some((deck) => deck.name === deckName);
      if (deckExists) {
        console.error('Deck already exists');
        return;
      }
      const newDecks = [...decks, deck];  
      setDecks(newDecks);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDecks));
    } catch (error) {
      console.error('Error saving deck:', error);
    }
  }

  const saveWords = async (words: Deck['words']) => {
    const updatedDecks = decks.map((deck) => 
      deck.name === deckName ? { ...deck, words } : deck
    );
    setDecks(updatedDecks);
    setCurrentDeck(updatedDecks.find(deck => deck.name === deckName));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDecks));
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
    currentDeck,
    saveDeck,
    getDeck,
    saveWords,
    deleteDeck,
    editDeck
  }
}