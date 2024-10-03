import { Colors } from "@/constants/Colors";
import { ExternalDeck } from "@/hooks/useFetchDecks";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View, Text, useColorScheme } from "react-native";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { GrayThemedButton } from '@/components/ThemedButton';

const Levels = ["A1", "A2", "B1", "B2", "C1", "C2"]

const LevelTab = ({level, onLevelPress, active}: {level: string, onLevelPress: (level: string) => void, active: boolean}) => {
  const theme = useColorScheme();
  const backgroundColor = theme === 'light' ? Colors.light.background : Colors.gray[800];
  return (
      <Pressable style={({pressed}) => [styles.tabButton, {backgroundColor: backgroundColor}, (pressed || active) && (theme === 'light' ? styles.tabLightButtonPressed : styles.tabDarkButtonPressed)]} onPress={() => onLevelPress(level)}>
        {({pressed}) => <Text style={[styles.tabButtonText, (pressed || active) && styles.tabButtonTextActive]}>{level}</Text>}
      </Pressable>
  )
}

const DeckItem = ({deck}: {deck: ExternalDeck}) => {
  const theme = useColorScheme();
  const borderColor = theme === 'light' ? Colors.gray[200] : Colors.gray[700];
  return (
    <Link href={`/external/${deck.id}`} asChild>
      <Pressable>
        <ThemedView lightColor={Colors.light.background} darkColor={Colors.gray[800]} style={styles.deckItem}>
          <Image source={{uri: 'https://res.cloudinary.com/db5aqdx6s/image/upload/v1725405050/nicos_weg_cr1lj4.webp'}} style={styles.deckItemImage} />
          <View>
            <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.deckItemTitle}>Nicos weg - {deck.title}</ThemedText>
            <View style={styles.deckItemLevelContainer}>
              <ThemedText lightColor={Colors.gray[500]} darkColor={Colors.gray[300]} style={styles.deckItemLevel}>{deck.level}</ThemedText>
              <ThemedText lightColor={Colors.gray[500]} darkColor={Colors.gray[300]} style={styles.deckItemWordsCount}>|  {deck.words.length} words</ThemedText>
            </View>
          </View>
          {/* <View style={styles.deckItemActions}>
            <ThemedView lightColor={Colors.gray[200]} darkColor={Colors.gray[700]} style={[styles.deckItemAddButton, {borderColor: borderColor}]}>
              <Ionicons name="add" size={16} color={Colors.light.text} />
            </ThemedView>
          </View> */}
        </ThemedView>
      </Pressable>
    </Link>
  )
}

export default function ExternalDeckList({decks,  onLevelPress, level}: {decks: ExternalDeck[], onLevelPress: (level: string) => void, level: string }) {
  return (
    <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={{marginTop: 6}}>
      <ThemedText lightColor={Colors.light.text} darkColor={Colors.gray[300]}>Deck List</ThemedText>
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
          <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.emptyState}>
            <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.emptyCard}>
              <Ionicons name="sad-outline" size={48} color={Colors.gray[500]} />
              <ThemedText lightColor={Colors.gray[500]} darkColor={Colors.gray[300]} style={styles.emptyCardText}>Sorry, we couldn't find any decks at the moment</ThemedText>
            </ThemedView>
          </ThemedView>
      )}
    </ThemedView>
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
    // backgroundColor: 'white',
  },
  tabLightButtonPressed: {
    backgroundColor: Colors.gray[500],
  },
  tabDarkButtonPressed: {
    backgroundColor: Colors.gray[600],
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
    // borderWidth: 1,
    // borderColor: Colors.gray[200], 
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    // backgroundColor: Colors.light.background,
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
    // marginTop: 4,
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
    borderRadius: 30,
    paddingHorizontal: 8,
    paddingVertical: 8,
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