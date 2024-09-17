import { GrayThemedButton, PrimaryThemedButton } from "@/components/ThemedButton";
import { useFetchDecks } from "@/hooks/useFetchDecks";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function ExternalDeckScreen() {
  const {id} = useLocalSearchParams();
  const {decks} = useFetchDecks();
  const deck = decks.find((deck) => deck.id === id);

  if(!deck) {
    return <Text>Oops not found!</Text>
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
            <GrayThemedButton onPress={() => {}} extraStyle={{marginTop: 0, width: 100, padding: 8, height: 30}}>
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
          <PrimaryThemedButton onPress={() => {}}>
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