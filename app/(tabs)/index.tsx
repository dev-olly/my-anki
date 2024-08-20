
import { Animated, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { useRef, useState } from 'react';

import { ModalDeckForm } from '@/components/ModalDeckForm';
import { Colors } from '@/constants/Colors';
import { useDeck } from '@/hooks/useDeck';
import { Deck } from '@/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DeckItem } from '@/components/DeckItem';


export default function HomeScreen() {
  const {decks, saveDeck, deleteDeck, editDeck} = useDeck();
  const [showModal, setShowModal] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bgColorAnim = useRef(new Animated.Value(0)).current;

  const onPressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.timing(bgColorAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();
  }
  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    Animated.timing(bgColorAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }
  const onPress = () => {
    setShowModal(true);
  };

  const buttonBgColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.light.tint, Colors.blue[500]]
  });

  const onSubmit = (deckName: string) => {
    const deck: Deck = {
      name: deckName,
      dateCreated: new Date().toISOString(),
      words: {},
    };
    saveDeck(deck);
    setShowModal(false);
  }

  const onDelete = (deckName: string) => {
    deleteDeck(deckName);
  }

  const onEdit = (deckName: string, newDeckName: string) => {
    editDeck(deckName, newDeckName);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ModalDeckForm onSubmit={onSubmit} showModal={showModal} setShowModal={setShowModal} />
        <View style={styles.rectangle}></View>
        <View>
          {decks.length == 0 ? <View>
            <Text style={styles.noText}>Hola! You have no decks, add some decks and start learning!</Text>
            <Pressable onPressIn={onPressIn}
              onPressOut={onPressOut}
              onPress={onPress}>
              <Animated.View style={[styles.addDeckButton, { transform: [{ scale: scaleAnim }], backgroundColor: buttonBgColor }]}>
                <Text style={styles.addDeckButtonText}>Add Deck</Text>
              </Animated.View>
            </Pressable>
          </View> : <View>
              <Text> You have {decks.length} decks</Text>
              <FlatList data={decks} renderItem={({item}) => <DeckItem deck={item} onDelete={onDelete} editDeck={onEdit} />} />
            </View>}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    width: '100%',
    height: '45%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: Colors.light.tint,
  },
  noText: {
    textAlign: 'center',
    marginTop: 20,
  },
  addDeckButton: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    // backgroundColor: Colors.light.tint,
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 16,
  },
  addDeckButtonText: {
    color: Colors.light.background,
  },
});