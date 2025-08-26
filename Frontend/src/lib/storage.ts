import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, GeneratedDesign } from '../types';

const STORAGE_KEYS = {
  USER: 'interior_app_user',
  DESIGNS: 'interior_app_designs',
  DEVICE_ID: 'interior_app_device_id',
} as const;

export const storage = {
  // User data
  async getUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  },

  async clearUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  },

  // Generated designs
  async getDesigns(): Promise<GeneratedDesign[]> {
    try {
      const designsData = await AsyncStorage.getItem(STORAGE_KEYS.DESIGNS);
      return designsData ? JSON.parse(designsData) : [];
    } catch (error) {
      console.error('Error getting designs:', error);
      return [];
    }
  },

  async saveDesigns(designs: GeneratedDesign[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(designs));
    } catch (error) {
      console.error('Error saving designs:', error);
    }
  },

  async addDesign(design: GeneratedDesign): Promise<void> {
    try {
      const designs = await this.getDesigns();
      designs.unshift(design); // Add to beginning
      await this.saveDesigns(designs);
    } catch (error) {
      console.error('Error adding design:', error);
    }
  },

  async removeDesign(designId: string): Promise<void> {
    try {
      const designs = await this.getDesigns();
      const filteredDesigns = designs.filter(design => design.id !== designId);
      await this.saveDesigns(filteredDesigns);
    } catch (error) {
      console.error('Error removing design:', error);
    }
  },

  async clearDesigns(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.DESIGNS);
    } catch (error) {
      console.error('Error clearing designs:', error);
    }
  },

  // Device ID
  async getDeviceId(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.DEVICE_ID);
    } catch (error) {
      console.error('Error getting device ID:', error);
      return null;
    }
  },

  async saveDeviceId(deviceId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId);
    } catch (error) {
      console.error('Error saving device ID:', error);
    }
  },

  // Utility methods
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER,
        STORAGE_KEYS.DESIGNS,
        STORAGE_KEYS.DEVICE_ID,
      ]);
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  },

  async getStorageSize(): Promise<number> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += new Blob([value]).size;
        }
      }
      
      return totalSize;
    } catch (error) {
      console.error('Error calculating storage size:', error);
      return 0;
    }
  },
};
