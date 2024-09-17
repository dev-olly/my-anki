import { View, Text, Image, StyleSheet } from "react-native";

export default function ExternalDeckScreen() {
  return (
    <View>
      <Image source={{uri: 'https://res.cloudinary.com/db5aqdx6s/image/upload/v1725405050/nicos_weg_cr1lj4.webp'}} style={styles.deckItemImage} />
      <Text>External Deck</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  deckItemImage: {
    width: '100%',
    height: 200,
  }
})