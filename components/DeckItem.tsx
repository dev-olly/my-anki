import { Deck } from "@/types";
import { View, Text } from "react-native";

export const DeckItem = ({deck}: {deck: Deck}) => {
  return (
    <View>
      <Text>{deck.name}</Text>
    </View>
  );
}