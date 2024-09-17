import { Colors } from "@/constants/Colors";
import { ExternalDeck } from "@/hooks/useFetchDecks";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import { View,Text, Pressable, StyleSheet, Image } from "react-native";

const Levels = ["A1", "A2", "B1", "B2", "C1", "C2"]

const LevelTab = ({level, onLevelPress, active}: {level: string, onLevelPress: (level: string) => void, active: boolean}) => {
 return (
    <Pressable style={({pressed}) => [styles.tabButton, (pressed || active) && styles.tabButtonPressed]} onPress={() => onLevelPress(level)}>
      {({pressed}) => <Text style={[styles.tabButtonText, (pressed || active) && styles.tabButtonTextActive]}>{level}</Text>}
    </Pressable>
 )
}

const DeckItem = ({deck}: {deck: ExternalDeck}) => {
  return (
    <Link href={`/external/${deck.id}`}>
      <View style={styles.deckItem}>
        <Image source={{uri: 'https://res.cloudinary.com/db5aqdx6s/image/upload/v1725405050/nicos_weg_cr1lj4.webp'}} style={styles.deckItemImage} />
        <View>
          <Text style={styles.deckItemTitle}>Nicos weg - {deck.title}</Text>
          <View style={styles.deckItemLevelContainer}>
            <Text style={styles.deckItemLevel}>{deck.level}</Text>
            <Text style={styles.deckItemWordsCount}>|  {deck.words.length} words</Text>
          </View>
        </View>
        <View style={styles.deckItemActions}>
          <View style={styles.deckItemAddButton}>
            <Text><Ionicons name="add" size={16} color="black" /></Text>
          </View>
        </View>
      </View>
    </Link>
  )
}

export default function ExternalDeckList({decks,  onLevelPress, level}: {decks: ExternalDeck[], onLevelPress: (level: string) => void, level: string }) {
  return (
    <View style={{marginTop: 6}}>
      <Text>Deck List</Text>
      <View style={styles.tabList}>
        {Levels.map((item) => (
          <LevelTab level={item} key={item} onLevelPress={onLevelPress} active={level === item} />
        ))}
      </View>
      {decks.length > 0 ? (
        <View style={styles.deckList}>
          {decks.map((deck: any) => (
            <DeckItem deck={deck} key={deck.id} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyCard}>
              <Ionicons name="sad-outline" size={48} color={Colors.gray[500]} />
              <Text style={styles.emptyCardText}>Sorry, we couldn't find any decks at the moment</Text>
            </View>
          </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
    overflow: 'scroll',
  },
  tabButton: {
    borderWidth: 1,
    borderColor: Colors.gray[500], 
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    backgroundColor: 'white',
  },
  tabButtonPressed: {
    backgroundColor: Colors.gray[500],
  },
  tabButtonText: {
    fontSize: 12,
    color: Colors.gray[500],
  },
  tabButtonTextActive: {
    color: 'white',
  },
  deckList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginTop: 8,
  },
  deckItem: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.gray[200], 
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: Colors.light.background,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deckItemImage: {
    width: 40,
    height: 40,
    backgroundColor: Colors.gray[200],
    borderRadius: 6,
  },
  deckItemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  deckItemLevel: {
    fontSize: 10,
    color: Colors.gray[500],
    fontWeight: 600,
  },
  deckItemWordsCount: {
    fontSize: 12,
    color: Colors.gray[500],
  },
  deckItemLevelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  deckItemActions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 'auto',
  },
  deckItemAddButton: {
    borderWidth: 1,
    borderColor: Colors.gray[200], 
    borderRadius: 30,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: Colors.gray[200],
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    marginTop: 30
  },
  emptyCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '70%',
    height: 120,
    borderWidth: 1,
    borderColor: Colors.gray[200], 
    borderRadius: 6,
    backgroundColor: Colors.light.background,
    shadowColor: Colors.gray[200],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 16,
  },
  emptyCardText: {
    fontSize: 14,
    color: Colors.gray[500],
    textAlign: 'center',
  }
})