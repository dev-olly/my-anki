import { Colors } from "@/constants/Colors";
import { TextInput, StyleSheet, ViewStyle } from "react-native"

export const ThemedInput = ({placeholder, onChangeText, value, extraStyle}: {placeholder: string, onChangeText: (text: string) => void, value: string, extraStyle?: ViewStyle}) => {
  return (
    <TextInput
      style={[styles.input, extraStyle]}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    // borderWidth: 1,
    padding: 12,
    width: '100%',
    borderRadius: 10,
    backgroundColor: Colors.gray[100],
    color: Colors.gray[700],
  },
});