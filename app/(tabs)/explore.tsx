import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import ExternalDeckList from '@/components/ExternalDeckList';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SkeletonLoader from '@/components/SkeletonLoader';
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';


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

const ErrorMessage = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Ionicons name="sad-outline" size={48} color={Colors.gray[500]} />
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Error, the server is not running</Text>
    </View>
  )
}

export default function TabTwoScreen() {
  const [search, setSearch] = useState('');
  const [decks, setDecks] = useState<ExternalDeck[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredDecks, setFilteredDecks] = useState<ExternalDeck[]>([]);
  const [level, setLevel] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  useEffect(() => {
    fetchDecks().then((decks) => {
      setDecks(decks);
      setFilteredDecks(decks);
      setLoading(false);
    }).catch((error) => {
      console.error('Error fetching decks:', error);
      setError(error.message);
      setLoading(false);
    });
  }, [search]);

  const onSearch = (text: string) => {
    setSearch(text);
    setTimeout(() => {
      setLoading(true);
      setFilteredDecks(decks.filter((deck) => deck.title.toLowerCase().includes(text.toLowerCase())));
      setLoading(false);
    }, 1000);
  }

  const onLevelPress = (level: string) => {
    setLevel(level);
    setLoading(true);
    setFilteredDecks(decks.filter((deck) => deck.level === level));
    setLoading(false);
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
          {loading ? <SkeletonLoader /> : <ExternalDeckList decks={filteredDecks} onLevelPress={onLevelPress} level={level} />}
          {error && <ErrorMessage />}
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
