import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Card } from '../ui/Card';
import { colors, typography, spacing, borderRadius, designStyles } from '../../lib/theme';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.4;
const CARD_HEIGHT = 120;

interface StylePickerProps {
  selectedStyle: string | null;
  onStyleSelect: (style: string) => void;
}

export const StylePicker: React.FC<StylePickerProps> = ({
  selectedStyle,
  onStyleSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Style</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {designStyles.map((style) => (
          <TouchableOpacity
            key={style.id}
            style={[
              styles.styleCard,
              selectedStyle === style.id && styles.selectedCard,
            ]}
            onPress={() => onStyleSelect(style.id)}
            activeOpacity={0.8}
          >
            <Image source={{ uri: style.thumbnail }} style={styles.thumbnail} />
            <View style={styles.overlay}>
              <Text style={styles.styleName}>{style.name}</Text>
            </View>
            {selectedStyle === style.id && (
              <View style={styles.selectedIndicator}>
                <View style={styles.checkmark} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  title: {
    fontSize: typography.sizes.h3,
    fontFamily: typography.fonts.heading,
    color: colors.light.text.heading,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  styleCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.light.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: colors.light.primary,
    shadowColor: colors.light.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    transform: [{ scale: 1.02 }],
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: spacing.sm,
  },
  styleName: {
    color: colors.light.background,
    fontSize: typography.sizes.caption,
    fontFamily: typography.fonts.bodyMedium,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  checkmark: {
    width: 14,
    height: 14,
    backgroundColor: colors.light.background,
    borderRadius: 7,
  },
});
