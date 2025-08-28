export interface DesignStyle {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  tips: string[];
}

export interface GeneratedDesign {
  id: string;
  originalImage: string;
  generatedImage: string;
  style: string;
  description: string;
  createdAt: Date;
}

export interface User {
  id: string;
  deviceId: string;
  isAuthenticated: boolean;
  subscription: 'free' | 'premium';
  usageCount: number;
  lastReset: Date;
}

export interface AppState {
  user: User;
  designs: GeneratedDesign[];
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface GenerateImageRequest {
  image: string; // Image URI for React Native
  style: string;
}

export interface GenerateImageResponse {
  imageUrl: string;
  id: string;
}

export interface StyleInfoRequest {
  style: string;
}

export interface StyleInfoResponse {
  description: string;
  tips: string[];
}

export type DesignStyleType = 
  | 'modern'
  | 'minimalist' 
  | 'bohemian'
  | 'rustic'
  | 'industrial'
  | 'eclectic'
  | 'scandinavian'
  | 'traditional';
