import { GrayThemedButton, PrimaryThemedButton } from "@/components/ThemedButton";
import { useDeck } from "@/hooks/useDeck";
import { ExternalDeck, useFetchDecks } from "@/hooks/useFetchDecks";
import { Deck, WordData } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";

export default function ExternalDeckScreen() {
  const {id} = useLocalSearchParams();
  const {saveDeck} = useDeck();
  const {decks} = useFetchDecks();
  const deck = decks.find((deck) => deck.id === Number(id));
  
  const onSaveDeck = (deck: ExternalDeck) => {
    const newDeck: Deck = {
      name: deck.title,
      dateCreated: new Date().toISOString(),
      words: deck.words.reduce<Record<string, WordData>>((acc, word) => {
        acc[word.german] = {
          translation: word.translation,
          ease: 0,
          interval: 0,
          lastReview: new Date().toISOString(),
          nextReview: new Date().toISOString(),
        };
        return acc;
      }, {}),
    };
    
    saveDeck(newDeck);
    router.push(`/`);
  }

  return (
    <ThemedSafeAreaView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.safeArea}>
      <ScrollView>
        {deck ? (
          <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background}>
            <Image source={{uri: 'https://res.cloudinary.com/db5aqdx6s/image/upload/v1725405050/nicos_weg_cr1lj4.webp'}} style={styles.deckItemImage} />
            <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.deckInfoContainer}>
              <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.deckTitle}>Nicos weg - {deck.title}</ThemedText>
              <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.deckMetaContainer}>
                <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.deckMeta}>
                  <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.deckMetaText}>{deck.level}</ThemedText>
                  <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.deckMetaText}>|   {deck.words.length} words</ThemedText>
                </ThemedView>
                <GrayThemedButton onPress={() => onSaveDeck(deck)} extraStyle={styles.addButton}>
                  <ThemedText lightColor={Colors.light.text} darkColor={Colors.gray[800]} style={styles.addButtonText}>Add to deck</ThemedText>
                </GrayThemedButton>
              </ThemedView>
            </ThemedView>

            <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.wordListContainer}>
              {deck.words.map((word, index) => (
                <ThemedView key={index} lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.wordItem}>
                  <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.wordGerman}>{word.german}</ThemedText>
                  <ThemedText lightColor={Colors.gray[300]} darkColor={Colors.gray[300]} style={styles.wordTranslation}>{word.translation}</ThemedText>
                </ThemedView>
              ))}
            </ThemedView>

            <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background} style={styles.bottomButtonContainer}>
              <PrimaryThemedButton onPress={() => onSaveDeck(deck)}>
                <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text} style={styles.bottomButtonText}>Add to deck</ThemedText>
              </PrimaryThemedButton>
            </ThemedView>
          </ThemedView>
        ) : (
          <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text}>Oops not found!</ThemedText>
        )}
      </ScrollView>
    </ThemedSafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  deckItemImage: {
    width: '100%',
    height: 200,
  },
  deckInfoContainer: {
    padding: 16,
  },
  deckTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deckMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  deckMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deckMetaText: {
    fontSize: 12,
    marginRight: 10,
  },
  addButton: {
    marginTop: 0,
    width: 100,
    padding: 4,
    height: 30,
  },
  addButtonText: {
    fontSize: 12,
  },
  wordListContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  wordItem: {
    borderRadius: 10,
    marginBottom: 16,
  },
  wordGerman: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  wordTranslation: {
    fontSize: 12,
    marginTop: 2,
  },
  bottomButtonContainer: {
    padding: 16,
  },
  bottomButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});