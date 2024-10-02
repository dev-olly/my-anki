import { WordData } from "@/types";
import { Level, Levels } from "@/utils/spaced-repetition";
import React, { useState } from "react";
import { Button, Pressable, Text, View, StyleSheet } from 'react-native';
import { GrayThemedButton } from "./ThemedButton";
import { Colors } from "@/constants/Colors";


export const Playground = ({word, data, next}: {word: string, data: WordData, next: (level: Level) => void}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <View>
        <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold', margin: 16 }}>{word}</Text>

        <View style={{paddingHorizontal: 8}}>
          {showAnswer && <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'semibold', margin: 16 }}>{data['translation']}</Text>}
          {!showAnswer ? (<GrayThemedButton onPress={() => setShowAnswer(true)}>
            <Text>Show answer</Text>
          </GrayThemedButton>) :
          (<View style={{ display: 'flex', flexDirection: 'row', gap: 24, justifyContent: 'center'}}>
            <Pressable onPress={() => {next(Levels.easy), setShowAnswer(false)}}>
              <Text style={styles.tabButton}>{Levels.easy}</Text>
            </Pressable>
              <Pressable onPress={() => {next(Levels.medium), setShowAnswer(false)}}>
                <Text style={styles.tabButton}>{Levels.medium}</Text>
            </Pressable>
            <Pressable onPress={() => {next(Levels.hard), setShowAnswer(false)}}>
              <Text style={styles.tabButton}>{Levels.hard}</Text>
            </Pressable>
          </View>)
          }
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  tabButton: {
    fontSize: 16,
    fontWeight: 'semibold',
    textTransform: 'capitalize',
    color: Colors.blue[500]
  },
});