import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, SafeAreaView, TextInput, Button, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import ExternalDeckList from '@/components/ExternalDeckList';
import { useEffect, useState } from 'react';


const fetchDecks = async () => {
  const response = await fetch('http://localhost:8080/api/vocabs');
  const data = await response.json();
  return data;
}

export default function TabTwoScreen() {
  const [search, setSearch] = useState('');
  const [decks, setDecks] = useState([]);
  
  useEffect(() => {
    fetchDecks().then(setDecks);
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
          <ExternalDeckList decks={decks} />
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
