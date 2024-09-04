import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SkeletonLoader = () => {
  return (
    <View>
      <Text>Deck List</Text>
      <View style={styles.tabList}>
        {[...Array(3)].map((_, index) => (
          <View key={index} style={styles.skeletonTab} />
        ))}
      </View>
      <View style={styles.deckList}>
        {[...Array(5)].map((_, index) => (
          <SkeletonDeckItem key={index} />
        ))}
      </View>
    </View>
  );
};

const SkeletonDeckItem = () => (
  <View style={styles.skeletonItem}>
    <View style={styles.skeletonTitle} />
    <View style={styles.skeletonDescription} />
  </View>
);

const styles = StyleSheet.create({
  tabList: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 16,
  },
  skeletonTab: {
    width: 80,
    height: 32,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
    borderRadius: 16,
  },
  deckList: {
    padding: 16,
  },
  skeletonItem: {
    marginBottom: 16,
  },
  skeletonTitle: {
    height: 24,
    width: '80%',
    backgroundColor: '#e0e0e0',
    marginBottom: 8,
    borderRadius: 4,
  },
  skeletonDescription: {
    height: 16,
    width: '60%',
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});

export default SkeletonLoader;