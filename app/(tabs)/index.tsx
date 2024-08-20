
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ModalForm } from '@/components/ModalForm';
import { Link } from 'expo-router';
import { useState } from 'react';

import { useDeck } from '@/hooks/useDeck';
import { LOWER_BOUND } from '@/utils/spaced-repetition';
import { WordItem } from '@/components/WordItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function HomeScreen() {
  const [decks, setDecks] = useState([]);

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          {decks.length == 0 && <View>
            <Text style={styles.noText}>Hola! You have no decks, add some decks and start learning!</Text>
            <Button title="Create Deck" onPress={() => {}}/>
          </View>}
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  noText: {
    textAlign: 'center',
    height: '85%' 
  },
});