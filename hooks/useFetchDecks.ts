
import { EXTERNAL_DECKS_STORAGE_KEY } from '@/utils/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export type ExternalDeck = {
  id: string;
  title: string;
  level: string;
  lessonUrl: string;
  words: {
    german: string;
    translation: string;
    audioSource: string;
  }[];
}

const fetchDecks = async () => {
  // fetch from storage first
  const storageDecks = await AsyncStorage.getItem(EXTERNAL_DECKS_STORAGE_KEY);
  if(storageDecks) return JSON.parse(storageDecks);

  const response = await fetch('https://my-anki-e4bed32d7f5d.herokuapp.com/api/vocabs');
  const data = await response.json();
  await AsyncStorage.setItem(EXTERNAL_DECKS_STORAGE_KEY, JSON.stringify(data));
  return data;
}


export const useFetchDecks = () => {
  const [decks, setDecks] = useState<ExternalDeck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchDecks().then((decks) => {
      setDecks(decks);
      setLoading(false);

    }).catch((error) => {
      console.error('Error fetching decks:', error);
      setError(error.message);
      setLoading(false);
    });
  }, []);

  return { decks, loading, setLoading,  error };
}