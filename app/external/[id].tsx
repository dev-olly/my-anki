import { GrayThemedButton } from "@/components/ThemedButton";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ExternalDeckScreen() {
  return (
    <View>
      <Image source={{uri: 'https://res.cloudinary.com/db5aqdx6s/image/upload/v1725405050/nicos_weg_cr1lj4.webp'}} style={styles.deckItemImage} />
      <View style={{padding: 16}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Nicos weg - Gerechtigkeit?</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 12, fontWeight: 'bold'}}> A1</Text>
            <Text style={{marginLeft: 10, fontSize: 12}}>|   100 words</Text>
          </View>
          <GrayThemedButton onPress={() => {}} extraStyle={{marginTop: 0, width: 100, padding: 8, height: 30}}>
            <Text style={{fontSize: 12, fontWeight: 'bold'}}>Add to deck</Text>
          </GrayThemedButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  deckItemImage: {
    width: '100%',
    height: 200,
  }
})