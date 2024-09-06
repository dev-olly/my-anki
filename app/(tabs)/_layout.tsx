
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tintColor = Colors.sky[600];

  const screenOptions = {
    tabBarActiveTintColor: tintColor,
    headerShown: false,
  };

  const tabScreens = [
    {
      name: 'index',
      title: 'Home',
      icon: { focused: 'home', unfocused: 'home-outline' },
    },
    {
      name: 'explore',
      title: 'Explore',
      icon: { focused: 'library', unfocused: 'library-outline' },
    },
  ];

  return (
    <Tabs screenOptions={screenOptions}>
      {tabScreens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? screen.icon.focused : screen.icon.unfocused} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

