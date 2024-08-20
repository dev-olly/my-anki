
import { Button, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, Animated } from 'react-native';

import { ModalForm } from '@/components/ModalForm';
import { Link } from 'expo-router';
import { useState, useRef } from 'react';

import { useDeck } from '@/hooks/useDeck';
import { LOWER_BOUND } from '@/utils/spaced-repetition';
import { WordItem } from '@/components/WordItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '@/constants/Colors';


export default function HomeScreen() {
  const [decks, setDecks] = useState([]);
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
    // Add your logic for adding a deck here
    console.log('Add Deck pressed');
  };

  const buttonBgColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.light.tint, Colors.blue[500]]
  });

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.rectangle}></View>
        <View>
          {decks.length == 0 && <View>
            <Text style={styles.noText}>Hola! You have no decks, add some decks and start learning!</Text>
            <Pressable onPressIn={onPressIn}
              onPressOut={onPressOut}
              onPress={onPress}>
              <Animated.View style={[styles.addDeckButton, { transform: [{ scale: scaleAnim }], backgroundColor: buttonBgColor }]}>
                <Text style={styles.addDeckButtonText}>Add Deck</Text>
              </Animated.View>
            </Pressable>
          </View>}
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    width: '100%',
    height: '45%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // create a gradient from top to bottom
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