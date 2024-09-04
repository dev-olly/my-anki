import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';

import ExternalDeckList from '@/components/ExternalDeckList';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SkeletonLoader from '@/components/SkeletonLoader';
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';


const fetchDecks = async () => {
  const response = await fetch('http://localhost:8080/api/vocabs');
  const data = await response.json();
  return data;
}



export default function TabTwoScreen() {
  const [search, setSearch] = useState('');
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchDecks().then((decks) => {
      setDecks([]);
      setLoading(false);
    });
  }, [search]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: Colors.light.background, dark: Colors.dark.tint }}
        headerChildren={<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            placeholder="search episodes"
          />
          </View>}>
          {loading ? <SkeletonLoader /> : <ExternalDeckList decks={decks} />}
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
