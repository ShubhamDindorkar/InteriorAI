import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const colors = {
  light: {
    primary: '#6366F1', // Indigo
    primaryLight: '#818CF8',
    primaryDark: '#4F46E5',
    secondary: '#EC4899', // Pink
    background: '#FAFAFA',
    card: '#FFFFFF',
    cardHover: '#F8FAFC',
    text: {
      heading: '#1F2937',
      body: '#374151',
      muted: '#6B7280',
    },
    border: '#E5E7EB',
    success: '#10B981', // Emerald
    error: '#EF4444', // Red
    warning: '#F59E0B', // Amber
    info: '#3B82F6', // Blue
    gradient: {
      primary: ['#6366F1', '#8B5CF6'], // Indigo to Purple
      secondary: ['#EC4899', '#F97316'], // Pink to Orange
      success: ['#10B981', '#059669'], // Emerald gradient
    },
    accent: {
      purple: '#8B5CF6',
      pink: '#EC4899',
      orange: '#F97316',
      yellow: '#EAB308',
      green: '#22C55E',
      blue: '#3B82F6',
    },
  },
  dark: {
    primary: '#6366F1',
    primaryLight: '#818CF8',
    primaryDark: '#4F46E5',
    secondary: '#EC4899',
    background: '#111827',
    card: '#1F2937',
    cardHover: '#374151',
    text: {
      heading: '#F9FAFB',
      body: '#D1D5DB',
      muted: '#9CA3AF',
    },
    border: '#374151',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    gradient: {
      primary: ['#6366F1', '#8B5CF6'],
      secondary: ['#EC4899', '#F97316'],
      success: ['#10B981', '#059669'],
    },
    accent: {
      purple: '#8B5CF6',
      pink: '#EC4899',
      orange: '#F97316',
      yellow: '#EAB308',
      green: '#22C55E',
      blue: '#3B82F6',
    },
  },
};

export const typography = {
  fonts: {
    heading: 'Poppins_700Bold',
    body: 'Inter_400Regular',
    bodyMedium: 'Inter_500Medium',
  },
  sizes: {
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    body: 16,
    caption: 14,
    small: 12,
  },
  lineHeights: {
    h1: 40,
    h2: 36,
    h3: 32,
    h4: 28,
    body: 24,
    caption: 20,
    small: 16,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
};

export const layout = {
  screenWidth,
  screenHeight,
  maxWidth: 400,
  headerHeight: 60,
  tabBarHeight: 80,
};

export const designStyles = [
  {
    id: 'modern',
    name: 'Modern',
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300&h=200&fit=crop',
    description: 'Clean lines, minimal decor, and a focus on functionality',
    tips: ['Use neutral colors', 'Incorporate geometric shapes', 'Keep surfaces clutter-free'],
    color: '#6366F1',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
    description: 'Less is more - focus on essential elements only',
    tips: ['Limit color palette', 'Choose quality over quantity', 'Embrace negative space'],
    color: '#8B5CF6',
  },
  {
    id: 'bohemian',
    name: 'Bohemian',
    thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&h=200&fit=crop',
    description: 'Eclectic, artistic, and free-spirited design',
    tips: ['Mix patterns and textures', 'Use warm, earthy tones', 'Incorporate vintage pieces'],
    color: '#EC4899',
  },
  {
    id: 'rustic',
    name: 'Rustic',
    thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&h=200&fit=crop',
    description: 'Natural materials and cozy, warm atmosphere',
    tips: ['Use wood and stone', 'Choose warm lighting', 'Add vintage accessories'],
    color: '#F97316',
  },
  {
    id: 'industrial',
    name: 'Industrial',
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300&h=200&fit=crop',
    description: 'Raw materials, exposed elements, and urban aesthetic',
    tips: ['Expose structural elements', 'Use metal and concrete', 'Keep it open and airy'],
    color: '#6B7280',
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
    description: 'Light, airy, and functional with natural elements',
    tips: ['Maximize natural light', 'Use light wood tones', 'Keep it simple and functional'],
    color: '#10B981',
  },
];

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  layout,
  designStyles,
};
