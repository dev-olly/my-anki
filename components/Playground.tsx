import { WordData } from "@/types";
import { Level, Levels } from "@/utils/spaced-repetition";
import React, { useState } from "react";
import { Button, Text, View } from 'react-native';


export const Playground = ({word, data, next}: {word: string, data: WordData, next: (level: Level) => void}) => {

  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <View>
        <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold', margin: 16 }}>{word}</Text>

        <View>
          {showAnswer && <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'semibold', margin: 16 }}>{data['translation']}</Text>}
          {!showAnswer ? (<Button title="Show answer" onPress={() => setShowAnswer(true)} /> ) :
          (<View style={{ display: 'flex', flexDirection: 'row', gap: 16, justifyContent: 'center'}}>
            <Button onPress={() => next(Levels.easy) } title={Levels.easy}/>
            <Button onPress={() => next(Levels.medium)} title={Levels.medium}/>
            <Button onPress={() => next(Levels.hard)} title={Levels.hard}/>
          </View>)
          }
        </View>
      </View>
  )
}