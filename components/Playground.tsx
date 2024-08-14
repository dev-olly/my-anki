import React, { useState } from "react";
import { Button, Text, View } from 'react-native';


export const Playground = () => {

  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <View>
        <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold', margin: 16 }}>Der Mann</Text>

        <View>
          {showAnswer && <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold', margin: 16 }}>The Man</Text>}
          {!showAnswer ? (<Button title="Show answer" onPress={() => setShowAnswer(true)} /> ) :
          (<View style={{ display: 'flex', flexDirection: 'row', gap: 16, justifyContent: 'center'}}>
            <Button title="Easy"/>
            <Button title="Medium"/>
            <Button title="Hard"/>
          </View>)
          }
        </View>
      </View>
  )
}