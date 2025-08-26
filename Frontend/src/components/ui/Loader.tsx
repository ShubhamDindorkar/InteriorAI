import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../lib/theme';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color = colors.light.primary,
  text,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  text: {
    marginTop: spacing.md,
    fontSize: typography.sizes.body,
    fontFamily: typography.fonts.body,
    color: colors.light.text.body,
    textAlign: 'center',
  },
});
