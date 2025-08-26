import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../src/hooks/useStore';
import { Card } from '../../src/components/ui/Card';
import { BeforeAfterSlider } from '../../src/components/previews/BeforeAfterSlider';
import { GradientBackground } from '../../src/components/ui/GradientBackground';
import { colors, typography, spacing, borderRadius } from '../../src/lib/theme';

const { width: screenWidth } = Dimensions.get('window');

export default function GalleryScreen() {
  const { designs, removeDesign } = useStore();
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

  const getStyleColor = (style: string) => {
    const styleColors: { [key: string]: string } = {
      modern: '#6366F1',
      minimalist: '#8B5CF6',
      bohemian: '#EC4899',
      rustic: '#F97316',
      industrial: '#6B7280',
      scandinavian: '#10B981',
    };
    return styleColors[style] || '#6366F1';
  };

  const handleDeleteDesign = (designId: string) => {
    Alert.alert(
      'Delete Design',
      'Are you sure you want to delete this design?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => removeDesign(designId) 
        },
      ]
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (designs.length === 0) {
    return (
      <GradientBackground variant="subtle">
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          <View style={styles.emptyContainer}>
            <Ionicons 
              name="images-outline" 
              size={64} 
              color={colors.light.primary} 
            />
            <Text style={styles.emptyTitle}>🎨 No Designs Yet</Text>
            <Text style={styles.emptyText}>
              Your generated designs will appear here. Start by creating your first design!
            </Text>
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }

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
          <Text style={styles.title}>🎨 My Designs</Text>
          <Text style={styles.subtitle}>
            {designs.length} beautiful design{designs.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* Designs Grid */}
        <View style={styles.designsContainer}>
          {designs.map((design) => (
            <Card
              key={design.id}
              variant="elevated"
              padding="none"
              style={styles.designCard}
            >
              <TouchableOpacity
                style={styles.designContent}
                onPress={() => setSelectedDesign(selectedDesign === design.id ? null : design.id)}
                activeOpacity={0.9}
              >
                {/* Design Preview */}
                <View style={styles.previewContainer}>
                  <BeforeAfterSlider
                    beforeImage={design.originalImage}
                    afterImage={design.generatedImage}
                    style={styles.slider}
                  />
                </View>

                {/* Design Info */}
                <View style={styles.designInfo}>
                  <View style={styles.designHeader}>
                    <View style={[styles.styleBadge, { backgroundColor: getStyleColor(design.style) }]}>
                      <Text style={styles.styleText}>{design.style}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDeleteDesign(design.id)}
                      style={styles.deleteButton}
                    >
                      <Ionicons name="trash-outline" size={20} color={colors.light.error} />
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.description}>{design.description}</Text>
                  
                  <Text style={styles.date}>
                    Created {formatDate(design.createdAt)}
                  </Text>
                </View>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
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
  designsContainer: {
    paddingHorizontal: spacing.md,
  },
  designCard: {
    marginBottom: spacing.lg,
  },
  designContent: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  previewContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: spacing.md,
  },
  slider: {
    marginBottom: spacing.md,
  },
  designInfo: {
    padding: spacing.md,
  },
  designHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  styleBadge: {
    backgroundColor: colors.light.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  styleText: {
    color: colors.light.background,
    fontSize: typography.sizes.caption,
    fontFamily: typography.fonts.bodyMedium,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  deleteButton: {
    padding: spacing.xs,
  },
  description: {
    fontSize: typography.sizes.body,
    fontFamily: typography.fonts.body,
    color: colors.light.text.body,
    lineHeight: typography.lineHeights.body,
    marginBottom: spacing.sm,
  },
  date: {
    fontSize: typography.sizes.caption,
    fontFamily: typography.fonts.body,
    color: colors.light.text.muted,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.sizes.h2,
    fontFamily: typography.fonts.heading,
    color: colors.light.text.heading,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: typography.sizes.body,
    fontFamily: typography.fonts.body,
    color: colors.light.text.body,
    textAlign: 'center',
    lineHeight: typography.lineHeights.body,
  },
});
