import { GenerateImageRequest, GenerateImageResponse, StyleInfoRequest, StyleInfoResponse } from '../types';

// Replace with your actual proxy server URL
const API_BASE_URL = 'https://your-proxy-server.com/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = {
  async generateImage(request: GenerateImageRequest): Promise<GenerateImageResponse> {
    try {
      const formData = new FormData();
      formData.append('image', request.image);
      formData.append('style', request.style);

      const response = await fetch(`${API_BASE_URL}/generate-image`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(response.status, errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Network error occurred');
    }
  },

  async getStyleInfo(request: StyleInfoRequest): Promise<StyleInfoResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/get-style-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(response.status, errorData.error || 'Failed to get style info');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Network error occurred');
    }
  },
};

// Mock API for development (remove in production)
export const mockApi = {
  async generateImage(request: GenerateImageRequest): Promise<GenerateImageResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return mock data
    return {
      imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
      id: `design_${Date.now()}`,
    };
  },

  async getStyleInfo(request: StyleInfoRequest): Promise<StyleInfoResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const styleInfo = {
      modern: {
        description: 'Clean lines, minimal decor, and a focus on functionality',
        tips: ['Use neutral colors', 'Incorporate geometric shapes', 'Keep surfaces clutter-free'],
      },
      minimalist: {
        description: 'Less is more - focus on essential elements only',
        tips: ['Limit color palette', 'Choose quality over quantity', 'Embrace negative space'],
      },
      bohemian: {
        description: 'Eclectic, artistic, and free-spirited design',
        tips: ['Mix patterns and textures', 'Use warm, earthy tones', 'Incorporate vintage pieces'],
      },
      rustic: {
        description: 'Natural materials and cozy, warm atmosphere',
        tips: ['Use wood and stone', 'Choose warm lighting', 'Add vintage accessories'],
      },
      industrial: {
        description: 'Raw materials, exposed elements, and urban aesthetic',
        tips: ['Expose structural elements', 'Use metal and concrete', 'Keep it open and airy'],
      },
      scandinavian: {
        description: 'Light, airy, and functional with natural elements',
        tips: ['Maximize natural light', 'Use light wood tones', 'Keep it simple and functional'],
      },
    };

    return styleInfo[request.style as keyof typeof styleInfo] || {
      description: 'A beautiful interior design style',
      tips: ['Start with a neutral base', 'Add personal touches', 'Consider lighting'],
    };
  },
};

// Use mock API for development
export const currentApi = __DEV__ ? mockApi : api;
