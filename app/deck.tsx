import React, { useState, useEffect } from "react";
import { Button, Text, View } from 'react-native';


export default function DeskScreen() {
  const [showAnswer, setShowAnswer] = useState(false);

  
  
  return (
    <View style={{ flex: 1, backgroundColor: 'white', height: '100%' }}>
      <Text style={{textAlign: 'center', fontSize: 14,  margin: 16 }}>A Step at a time</Text>
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