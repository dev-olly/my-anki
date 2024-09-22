
import { EXTERNAL_DECKS_STORAGE_KEY } from '@/utils/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export type ExternalDeck = {
  id: number;
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
  let allData: ExternalDeck[] = [];
  
  // Loop through start indices 0 to 7
  for (let start = 0; start <= 7; start++) {
    const response = await fetch(`https://my-anki-e4bed32d7f5d.herokuapp.com/api/vocabs?start=${start}`);
    const data: {lessons: ExternalDeck[]} = await response.json();
    allData = [...allData, ...data.lessons];
  }

  await AsyncStorage.setItem(EXTERNAL_DECKS_STORAGE_KEY, JSON.stringify(allData));
  return allData;
}


export const useFetchDecks = () => {
  const [decks, setDecks] = useState<ExternalDeck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000)
    fetchDecks().then((decks) => {
      setDecks(decks);

    }).catch((error) => {
      console.error('Error fetching decks:', error);
      setError(error.message);
      setLoading(false);
    });
  }, []);

  return { decks, loading, setLoading,  error };
}