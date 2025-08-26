import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../ui/Card';
import { colors, typography, spacing, borderRadius } from '../../lib/theme';

const { width: screenWidth } = Dimensions.get('window');
const UPLOAD_AREA_HEIGHT = 200;

interface ImageUploadProps {
  imageUri: string | null;
  onImageSelect: () => void;
  onImageRemove: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  imageUri,
  onImageSelect,
  onImageRemove,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleImagePress = () => {
    if (imageUri) {
      Alert.alert(
        'Remove Image',
        'Do you want to remove the current image?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', style: 'destructive', onPress: onImageRemove },
        ]
      );
    } else {
      onImageSelect();
    }
  };

  const renderUploadArea = () => {
    if (imageUri) {
      return (
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={handleImagePress}
          activeOpacity={0.9}
        >
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
          <View style={styles.imageOverlay}>
            <Ionicons name="camera" size={32} color={colors.light.background} />
            <Text style={styles.overlayText}>Tap to change</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={[styles.uploadArea, isDragging && styles.dragging]}>
        <Ionicons
          name="cloud-upload-outline"
          size={48}
          color={colors.light.text.muted}
        />
        <Text style={styles.uploadTitle}>Upload Room Photo</Text>
        <Text style={styles.uploadSubtitle}>
          Tap to select a photo from your gallery
        </Text>
        <View style={styles.uploadInfo}>
          <Text style={styles.uploadInfoText}>
            • Supported formats: JPEG, PNG
          </Text>
          <Text style={styles.uploadInfoText}>• Max size: 10MB</Text>
        </View>
      </View>
    );
  };

  return (
    <Card variant="outlined" padding="large" style={styles.container}>
      <Text style={styles.title}>Room Photo</Text>
      <TouchableOpacity
        style={styles.uploadContainer}
        onPress={handleImagePress}
        activeOpacity={0.8}
      >
        {renderUploadArea()}
      </TouchableOpacity>
    </Card>
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
  },
  uploadContainer: {
    width: '100%',
    height: UPLOAD_AREA_HEIGHT,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  uploadArea: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.light.background,
    borderWidth: 3,
    borderColor: colors.light.border,
    borderStyle: 'dashed',
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dragging: {
    borderColor: colors.light.primary,
    backgroundColor: colors.light.cardHover,
    shadowColor: colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  uploadTitle: {
    fontSize: typography.sizes.h4,
    fontFamily: typography.fonts.bodyMedium,
    color: colors.light.text.heading,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  uploadSubtitle: {
    fontSize: typography.sizes.body,
    fontFamily: typography.fonts.body,
    color: colors.light.text.body,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  uploadInfo: {
    alignItems: 'center',
  },
  uploadInfoText: {
    fontSize: typography.sizes.caption,
    fontFamily: typography.fonts.body,
    color: colors.light.text.muted,
    marginBottom: spacing.xs,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
  },
  overlayText: {
    color: colors.light.background,
    fontSize: typography.sizes.caption,
    fontFamily: typography.fonts.bodyMedium,
    marginTop: spacing.sm,
  },
});
