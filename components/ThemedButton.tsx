import { Animated, Pressable, Text, ViewStyle } from 'react-native';
import { useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';


const defaultStyle = {
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  borderRadius: 40,
  padding: 12,
  marginLeft: 'auto' as const,
  marginRight: 'auto' as const,
  marginTop: 16,
  width: 120,
}

export const  PrimaryThemedButton = ({ children, onPress, style = defaultStyle }: { children: React.ReactNode, onPress: () => void, style?: ViewStyle }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bgColorAnim = useRef(new Animated.Value(0)).current;
  const buttonBgColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.gray[300], Colors.gray[500]]
  });

  const onPressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.timing(bgColorAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();
  }
  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    Animated.timing(bgColorAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }
  
  return (
    <Pressable onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}>
      <Animated.View style={[style, { transform: [{ scale: scaleAnim }], backgroundColor: buttonBgColor }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
