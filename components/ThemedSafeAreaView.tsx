import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ThemedSafeAreaView = ({ children, lightColor, darkColor, style }: { children: React.ReactNode, lightColor?: string, darkColor?: string, style?: ViewStyle }) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  return <SafeAreaView style={[{ backgroundColor }, style]} >{children}</SafeAreaView>
}
