import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { colors, typography, spacing, borderRadius } from '../../lib/theme';

const { width: screenWidth } = Dimensions.get('window');
const SLIDER_WIDTH = screenWidth - spacing.md * 2;
const SLIDER_HEIGHT = 300;

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  style?: any;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  style,
}) => {
  const translateX = useSharedValue(SLIDER_WIDTH / 2);
  const [sliderPosition, setSliderPosition] = useState(SLIDER_WIDTH / 2);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
    },
    onActive: (event, context: any) => {
      const newPosition = context.startX + event.translationX;
      translateX.value = Math.max(0, Math.min(SLIDER_WIDTH, newPosition));
      runOnJS(setSliderPosition)(translateX.value);
    },
    onEnd: () => {
      // Optional: Add snap-to-center behavior
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const beforeImageStyle = useAnimatedStyle(() => {
    const width = interpolate(
      translateX.value,
      [0, SLIDER_WIDTH],
      [0, SLIDER_WIDTH],
      Extrapolate.CLAMP
    );

    return {
      width,
      overflow: 'hidden',
    };
  });

  const afterImageStyle = useAnimatedStyle(() => {
    const translateXAfter = interpolate(
      translateX.value,
      [0, SLIDER_WIDTH],
      [-SLIDER_WIDTH, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX: translateXAfter }],
    };
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        {/* After Image (Full) */}
        <Image source={{ uri: afterImage }} style={styles.fullImage} />
        
        {/* Before Image (Clipped) */}
        <Animated.View style={[styles.beforeImageContainer, beforeImageStyle]}>
          <Image source={{ uri: beforeImage }} style={styles.fullImage} />
        </Animated.View>

        {/* Slider Handle */}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.sliderHandle, animatedStyle]}>
            <View style={styles.handleLine} />
            <View style={styles.handleCircle}>
              <View style={styles.handleInner} />
            </View>
            <View style={styles.handleLine} />
          </Animated.View>
        </PanGestureHandler>

        {/* Labels */}
        <View style={styles.labelsContainer}>
          <View style={styles.label}>
            <Text style={styles.labelText}>BEFORE</Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.labelText}>AFTER</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.light.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  fullImage: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    resizeMode: 'cover',
  },
  beforeImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: SLIDER_HEIGHT,
    overflow: 'hidden',
  },
  sliderHandle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handleLine: {
    width: 2,
    height: '100%',
    backgroundColor: colors.light.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
  handleCircle: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  handleInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.light.primary,
  },
  labelsContainer: {
    position: 'absolute',
    bottom: spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  label: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  labelText: {
    color: colors.light.background,
    fontSize: typography.sizes.caption,
    fontFamily: typography.fonts.bodyMedium,
    fontWeight: '600',
  },
});
