import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, typography, spacing } from '../src/lib/theme';

export default function TestScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.title}>🎉 InteriorAI is Working!</Text>
        <Text style={styles.subtitle}>
          The app is successfully running with all dependencies installed.
        </Text>
        <View style={styles.features}>
          <Text style={styles.featureText}>✅ Expo SDK 53</Text>
          <Text style={styles.featureText}>✅ React Native 0.79.6</Text>
          <Text style={styles.featureText}>✅ TypeScript</Text>
          <Text style={styles.featureText}>✅ Expo Router</Text>
          <Text style={styles.featureText}>✅ Zustand State Management</Text>
          <Text style={styles.featureText}>✅ AsyncStorage</Text>
          <Text style={styles.featureText}>✅ Image Picker</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.h1,
    fontFamily: typography.fonts.heading,
    color: colors.light.text.heading,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.body,
    fontFamily: typography.fonts.body,
    color: colors.light.text.body,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: typography.lineHeights.body,
  },
  features: {
    alignItems: 'flex-start',
  },
  featureText: {
    fontSize: typography.sizes.body,
    fontFamily: typography.fonts.body,
    color: colors.light.text.body,
    marginBottom: spacing.sm,
  },
});
