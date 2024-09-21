import { GrayThemedButton, PrimaryThemedButton } from "@/components/ThemedButton";
import { useDeck } from "@/hooks/useDeck";
import { ExternalDeck, useFetchDecks } from "@/hooks/useFetchDecks";
import { Deck, WordData } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ExternalDeckScreen() {
  const {id} = useLocalSearchParams();
  const {saveDeck} = useDeck();
  const {decks} = useFetchDecks();
  const deck = decks.find((deck) => deck.id === id);
  
  
  if(!deck) {
    return <Text>Oops not found!</Text>
  }

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
    // router.push(`/decks/${newDeck.name}`);
    router.push(`/`);

  }
  return (
    <ScrollView>
      <View>
        <Image source={{uri: 'https://res.cloudinary.com/db5aqdx6s/image/upload/v1725405050/nicos_weg_cr1lj4.webp'}} style={styles.deckItemImage} />
        <View style={{padding: 16}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Nicos weg - {deck.title}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 12, fontWeight: 'bold'}}> {deck.level}</Text>
              <Text style={{marginLeft: 10, fontSize: 12}}>|   {deck.words.length} words</Text>
            </View>
            <GrayThemedButton onPress={() => onSaveDeck(deck)} extraStyle={{marginTop: 0, width: 100, padding: 8, height: 30}}>
              <Text style={{fontSize: 12, fontWeight: 'bold'}}>Add to deck</Text>
            </GrayThemedButton>
          </View>
        </View>

        <View style={{paddingHorizontal: 16, marginTop: 8}}>
          {deck.words.map((word, index) => (
            <View key={index} style={{backgroundColor: 'white', padding: 12, borderRadius: 10, marginBottom: 8}}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>{word.german}</Text>
              <Text style={{fontSize: 12, color: 'gray', marginTop: 4}}>{word.translation}</Text>
            </View>
          ))}
        </View>

        <View>
          <PrimaryThemedButton onPress={() => onSaveDeck(deck)}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Add to deck</Text>
          </PrimaryThemedButton>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  deckItemImage: {
    width: '100%',
    height: 200,
  }
})