
import { Colors } from '@/constants/Colors';
import { useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';



export const WordItem = ({word}: {word: string}) => {

  const swipeableRef = useRef<Swipeable>(null);
  
  const renderRightActions = (progress: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.optionContainer}>
        <Animated.View style={{ flex:1, transform: [{ translateX: trans }] }}>
          <RectButton style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </RectButton>
        </Animated.View>
        <Animated.View style={{ flex:1, transform: [{ translateX: trans }] }}>
            <RectButton style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </RectButton>
        </Animated.View>
      </View>
    )
  }
  return (
    <Swipeable renderRightActions={renderRightActions} rightThreshold={20} ref={swipeableRef}>
      <View style={styles.wordItem}>
        <Text>{word}</Text>
      </View>
    </Swipeable>
  )
}


const styles = StyleSheet.create({
  wordItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'gray',
    width: '100%',
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '40%',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  deleteButton: {
    backgroundColor: Colors.red[500],
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    padding: 10,
    height: '100%',
  },
  editButton: {
    backgroundColor: Colors.blue[500],
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    padding: 10,
    height: '100%',
  },
  editButtonText: {
    color: 'white',
  },
  deleteButtonText: {
    color: 'white',
  }
})