import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput, StyleSheet, ViewStyle } from "react-native"

export const ThemedInput = ({placeholder, onChangeText, value, extraStyle, lightColor, darkColor}: {placeholder: string, onChangeText: (text: string) => void, value: string, extraStyle?: ViewStyle, lightColor?: string, darkColor?: string}) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const textColor = useThemeColor({ light: Colors.gray[700], dark: Colors.gray[200] }, 'text');
  return (
    <TextInput
      style={[styles.input, extraStyle, {backgroundColor, color: textColor}]}
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
  },
});