import { WordData } from "@/types";
import { Level, Levels } from "@/utils/spaced-repetition";
import React, { useState } from "react";
import { View, StyleSheet, Pressable } from 'react-native';
import { GrayThemedButton } from "./ThemedButton";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export const Playground = ({word, data, next}: {word: string, data: WordData, next: (level: Level) => void}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <ThemedView lightColor={Colors.light.background} darkColor={Colors.dark.background}>
      <ThemedText lightColor={Colors.light.text} darkColor={Colors.gray[300]} style={styles.wordText}>
        {word}
      </ThemedText>

      <ThemedView style={styles.contentContainer}>
        {showAnswer && (
          <ThemedText lightColor={Colors.light.text} darkColor={Colors.gray[300]} style={styles.translationText}>
            {data['translation']}
          </ThemedText>
        )}
        {!showAnswer ? (
          <GrayThemedButton onPress={() => setShowAnswer(true)}>
            <ThemedText lightColor={Colors.light.text} darkColor={Colors.gray[800]}>
              Show answer
            </ThemedText>
          </GrayThemedButton>
        ) : (
          (<View style={{ display: 'flex', flexDirection: 'row', gap: 24, justifyContent: 'center'}}>
            <Pressable onPress={() => {next(Levels.easy), setShowAnswer(false)}}>
              <ThemedText lightColor={Colors.blue[500]} darkColor={Colors.blue[500]} style={styles.tabButton}>{Levels.easy}</ThemedText>
            </Pressable>
              <Pressable onPress={() => {next(Levels.medium), setShowAnswer(false)}}>
                <ThemedText lightColor={Colors.blue[500]} darkColor={Colors.blue[500]} style={styles.tabButton}>{Levels.medium}</ThemedText>
            </Pressable>
            <Pressable onPress={() => {next(Levels.hard), setShowAnswer(false)}}>
              <ThemedText lightColor={Colors.blue[500]} darkColor={Colors.blue[500]} style={styles.tabButton}>{Levels.hard}</ThemedText>
            </Pressable>
          </View>)
        )}
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  wordText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  contentContainer: {
    paddingHorizontal: 8,
  },
  translationText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    margin: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
  },
  tabButton: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});