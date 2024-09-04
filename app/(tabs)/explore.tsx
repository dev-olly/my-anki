import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';

import ExternalDeckList from '@/components/ExternalDeckList';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SkeletonLoader from '@/components/SkeletonLoader';
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';


type ExternalDeck = {
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
  const response = await fetch('http://localhost:8080/api/vocabs');
  const data = await response.json();
  return data;
}


export default function TabTwoScreen() {
  const [search, setSearch] = useState('');
  const [decks, setDecks] = useState<ExternalDeck[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredDecks, setFilteredDecks] = useState<ExternalDeck[]>([]);
  
  useEffect(() => {
    fetchDecks().then((decks) => {
      setDecks(decks);
      setFilteredDecks(decks);
      setLoading(false);
    });
  }, [search]);

  // chill until users stop typing and all decks are loaded 
  const onSearch = (text: string) => {
    setSearch(text);
    setTimeout(() => {
      setLoading(true);
      setFilteredDecks(decks.filter((deck) => deck.title.toLowerCase().includes(text.toLowerCase())));
      setLoading(false);
    }, 1000);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: Colors.light.background, dark: Colors.dark.tint }}
        headerChildren={<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            placeholder="search episodes"
            onChangeText={onSearch}
          />
          </View>}>
          {loading ? <SkeletonLoader /> : <ExternalDeckList decks={filteredDecks} />}
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '90%',
  },
});
