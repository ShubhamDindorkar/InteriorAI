import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useStore } from '../../src/hooks/useStore';
import { ImageUpload } from '../../src/components/forms/ImageUpload';
import { StylePicker } from '../../src/components/forms/StylePicker';
import { Button } from '../../src/components/ui/Button';
import { Card } from '../../src/components/ui/Card';
import { GradientBackground } from '../../src/components/ui/GradientBackground';
import { colors, typography, spacing } from '../../src/lib/theme';

export default function HomeScreen() {
  const {
    user,
    isLoading,
    error,
    uploadImage,
    generateDesign,
    clearError,
  } = useStore();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK', onPress: clearError }]);
    }
  }, [error, clearError]);

  const handleImageSelect = async () => {
    const imageUri = await uploadImage();
    if (imageUri) {
      setSelectedImage(imageUri);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
  };

  const handleGenerateDesign = async () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select a room photo first.');
      return;
    }

    if (!selectedStyle) {
      Alert.alert('No Style', 'Please select a design style.');
      return;
    }

    await generateDesign(selectedImage, selectedStyle);
  };

  const canGenerate = selectedImage && selectedStyle && !isLoading;

  return (
    <GradientBackground variant="subtle">
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🎨 InteriorAI</Text>
          <Text style={styles.subtitle}>Transform your space with AI magic</Text>
        </View>

        {/* Usage Info */}
        <Card variant="elevated" padding="medium" style={styles.usageCard}>
          <Text style={styles.usageText}>
            {user.subscription === 'free' 
              ? `✨ Free designs today: ${3 - user.usageCount}/3`
              : '🌟 Unlimited designs'
            }
          </Text>
        </Card>

        {/* Image Upload */}
        <ImageUpload
          imageUri={selectedImage}
          onImageSelect={handleImageSelect}
          onImageRemove={handleImageRemove}
        />

        {/* Style Picker */}
        {selectedImage && (
          <StylePicker
            selectedStyle={selectedStyle}
            onStyleSelect={handleStyleSelect}
          />
        )}

        {/* Generate Button */}
        {selectedImage && selectedStyle && (
          <View style={styles.generateSection}>
            <Button
              title="Generate Design"
              onPress={handleGenerateDesign}
              loading={isLoading}
              disabled={!canGenerate}
              size="large"
              style={styles.generateButton}
            />
            <Text style={styles.generateHint}>
              This will create a beautiful {selectedStyle} design for your room
            </Text>
          </View>
        )}

        {/* Empty State */}
        {!selectedImage && (
          <Card variant="elevated" padding="large" style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>🚀 Ready to Transform?</Text>
            <Text style={styles.emptyStateText}>
              Upload a photo of your room and choose a style to see the magic happen!
            </Text>
          </Card>
        )}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.h1,
    fontFamily: typography.fonts.heading,
    color: colors.light.text.heading,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.body,
    fontFamily: typography.fonts.body,
    color: colors.light.text.body,
  },
  usageCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  usageText: {
    fontSize: typography.sizes.caption,
    fontFamily: typography.fonts.body,
    color: colors.light.text.body,
    textAlign: 'center',
  },
  generateSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  generateButton: {
    marginBottom: spacing.md,
  },
  generateHint: {
    fontSize: typography.sizes.caption,
    fontFamily: typography.fonts.body,
    color: colors.light.text.muted,
    textAlign: 'center',
  },
  emptyState: {
    marginHorizontal: spacing.md,
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  emptyStateTitle: {
    fontSize: typography.sizes.h3,
    fontFamily: typography.fonts.heading,
    color: colors.light.text.heading,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: typography.sizes.body,
    fontFamily: typography.fonts.body,
    color: colors.light.text.body,
    textAlign: 'center',
    lineHeight: typography.lineHeights.body,
  },
});
