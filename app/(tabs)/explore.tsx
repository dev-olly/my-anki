import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import ExternalDeckList from '@/components/ExternalDeckList';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SkeletonLoader from '@/components/SkeletonLoader';
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemedInput } from '@/components/ThemedInput';
import { ExternalDeck, useFetchDecks } from '@/hooks/useFetchDecks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXTERNAL_DECKS_STORAGE_KEY } from '@/utils/keys';


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
  const { decks, loading, setLoading, error } = useFetchDecks();
  const [filteredDecks, setFilteredDecks] = useState<ExternalDeck[]>([...decks]);
  const [level, setLevel] = useState<string>('');


  const onSearch = (text: string) => {
    setSearch(text);
    setTimeout(() => {
      setLoading(true);
      setFilteredDecks(decks.filter((deck) => deck.title.toLowerCase().includes(text.toLowerCase())));
      setLoading(false);
    }, 1000);
  }

  const onLevelPress = (newLevel: string) => {
    // set to empty if level is equal to current level
    setLoading(true);
    if(level === newLevel) {
      setLevel('');
      setFilteredDecks(decks);
    } else {
      setLevel(newLevel);
      setFilteredDecks(decks.filter((deck) => deck.level === newLevel));
    }
    setLoading(false);
  }

  // useEffect(() => {
  //   AsyncStorage.removeItem(EXTERNAL_DECKS_STORAGE_KEY)
  // }, [])

  useEffect(() => {
    console.log('first decks', decks[0]);
    setFilteredDecks([...decks]);
  }, [decks]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: Colors.light.background, dark: Colors.dark.tint }}
        headerChildren={<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          
          <ThemedInput placeholder="Enter search" onChangeText={onSearch} value={search} />
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
