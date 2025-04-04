import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from "react";

import { Deck } from '../types';
import { STORAGE_KEY } from '../utils/keys';


export const useDeck = (deckName?: string) => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [currentDeck, setCurrentDeck] = useState<Deck | undefined>();


  useEffect(() => {
    const loadDecksAndGetDeck = async () => {
      const loadedDecks = await loadDecks();
      if (deckName) {
        const [deck] = loadedDecks.filter((deck: Deck) => deck.name.toLowerCase().includes(deckName.toLowerCase()));
        setCurrentDeck(deck);
      }
    };

    loadDecksAndGetDeck();
  }, [deckName]);

  const flattenedWords = useMemo(() => {
    if (!currentDeck) return [];
    return Object.entries(currentDeck.words)
      .map(([word, data]) => ({ word, ...data }))
      .sort((a, b) => a.interval - b.interval);
  }, [currentDeck]);


  const loadDecks = async () => {
    try {
      const savedDecks = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedDecks) {
        const parsedDecks = await JSON.parse(savedDecks);
        await setDecks(parsedDecks);
        return parsedDecks;
      }
      return [];
    } catch (error) {
      console.error('Error loading decks:', error);
      return [];
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
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDecks));
  }

  const saveAndSetCurrentDeck = async (words: Deck['words']) => {
    if (!deckName) return;
    const updatedDecks = decks.map((deck) => 
      deck.name.includes(deckName) ? { ...deck, words } : deck
    );
    console.log('updatedDecks', updatedDecks)
    setDecks(updatedDecks);
    setCurrentDeck(updatedDecks.find(deck => deck.name.includes(deckName)));
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
    flattenedWords,
    saveDeck,
    saveAndSetCurrentDeck,
    saveWords,
    deleteDeck,
    editDeck
  }
}