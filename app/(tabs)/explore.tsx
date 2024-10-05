import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import ExternalDeckList from '@/components/ExternalDeckList';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SkeletonLoader from '@/components/SkeletonLoader';
import { ThemedInput } from '@/components/ThemedInput';
import { Colors } from '@/constants/Colors';
import { ExternalDeck, useFetchDecks } from '@/hooks/useFetchDecks';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';

const ErrorMessage = () => {
  return (
    <ThemedView darkColor={Colors.gray[800]} lightColor={Colors.light.background} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Ionicons name="sad-outline" size={48} color={Colors.gray[500]} />
      <ThemedText lightColor={Colors.light.text} darkColor={Colors.gray[400]} style={{fontSize: 20, fontWeight: 'bold'}}>Error, the server is not running</ThemedText>
    </ThemedView>
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


  useEffect(() => {
    setFilteredDecks([...decks]);
  }, [decks]);

  return (
    <ThemedSafeAreaView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.AndroidSafeArea}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: Colors.light.background, dark: Colors.dark.background }}
        headerChildren={<ThemedView style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          
          <ThemedInput placeholder="Enter search" lightColor={Colors.gray[200]} darkColor={Colors.gray[800]} onChangeText={onSearch} value={search} />
          </ThemedView>}>
          {error && <ErrorMessage />}

          {loading ? <SkeletonLoader /> : <ExternalDeckList decks={filteredDecks} onLevelPress={onLevelPress} level={level} />}
      </ParallaxScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    // backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
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
