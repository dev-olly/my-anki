import { Animated, Pressable, Text, ViewStyle } from 'react-native';
import { useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';


const grayDefaultStyle = {
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  borderRadius: 40,
  padding: 12,
  marginLeft: 'auto' as const,
  marginRight: 'auto' as const,
  marginTop: 16,
  width: 120,
}

const primaryDefaultStyle = {
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  borderRadius: 40,
  paddingVertical: 10,
  paddingHorizontal: 12,
  marginLeft: 'auto' as const,
  marginRight: 'auto' as const,
  marginTop: 16,
  width: '90%' as const,
  height: 40,
}

export const  GrayThemedButton = ({ children, onPress, style = grayDefaultStyle, extraStyle = {} }: { children: React.ReactNode, onPress: () => void, style?: ViewStyle, extraStyle?: ViewStyle }) => {
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
      <Animated.View style={[style, extraStyle, { transform: [{ scale: scaleAnim }], backgroundColor: buttonBgColor }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}


export const  PrimaryThemedButton = ({ children, onPress, extraStyle = {}}: { children: React.ReactNode, onPress: () => void, extraStyle?: ViewStyle}) => {
  const bgColorAnim = useRef(new Animated.Value(0)).current;
  const buttonBgColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.sky[700], Colors.sky[900]]
  });

  const onPressIn = () => {
    Animated.parallel([
      Animated.timing(bgColorAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();
  }
  const onPressOut = () => {
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
      <Animated.View style={[primaryDefaultStyle, extraStyle, {  backgroundColor: buttonBgColor }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
