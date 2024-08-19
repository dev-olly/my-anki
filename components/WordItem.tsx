
import { StyleSheet, Text, View } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';



export const WordItem = ({word}: {word: string}) => {

  const renderRightActions = () => {
    // const trans = 
    return (
      <View style={styles.optionContainer}>
        <RectButton style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </RectButton>
        <RectButton style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </RectButton>
      </View>
    )
  }
  return (
    <Swipeable renderRightActions={renderRightActions}>
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
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    padding: 10,
    height: '100%',
  },
  editButton: {
    backgroundColor: 'blue',
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