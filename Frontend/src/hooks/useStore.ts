import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, GeneratedDesign, AppState } from '../types';
import { storage } from '../lib/storage';
import { currentApi } from '../lib/api';
import * as ImagePicker from 'expo-image-picker';
import * as Device from 'expo-device';

interface StoreState extends AppState {
  // Actions
  initializeApp: () => Promise<void>;
  setUser: (user: User) => void;
  addDesign: (design: GeneratedDesign) => void;
  removeDesign: (designId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // AI Operations
  generateDesign: (imageUri: string, style: string) => Promise<void>;
  uploadImage: () => Promise<string | null>;
  takePhoto: () => Promise<string | null>;
  
  // User Management
  createGuestUser: () => Promise<void>;
  resetUsage: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: {
        id: '',
        deviceId: '',
        isAuthenticated: false,
        subscription: 'free',
        usageCount: 0,
        lastReset: new Date(),
      },
      designs: [],
      isLoading: false,
      error: null,

      // Actions
      initializeApp: async () => {
        set({ isLoading: true });
        try {
          // Load saved data
          const [savedUser, savedDesigns] = await Promise.all([
            storage.getUser(),
            storage.getDesigns(),
          ]);

          if (savedUser) {
            set({ user: savedUser });
          } else {
            // Create guest user if none exists
            await get().createGuestUser();
          }

          if (savedDesigns) {
            set({ designs: savedDesigns });
          }

          // Check if usage should be reset (24 hours)
          const user = get().user;
          const now = new Date();
          const lastReset = new Date(user.lastReset);
          const hoursSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);
          
          if (hoursSinceReset >= 24) {
            get().resetUsage();
          }
        } catch (error) {
          console.error('Error initializing app:', error);
          set({ error: 'Failed to initialize app' });
        } finally {
          set({ isLoading: false });
        }
      },

      setUser: (user: User) => {
        set({ user });
        storage.saveUser(user);
      },

      addDesign: (design: GeneratedDesign) => {
        const { designs } = get();
        const newDesigns = [design, ...designs];
        set({ designs: newDesigns });
        storage.saveDesigns(newDesigns);
      },

      removeDesign: (designId: string) => {
        const { designs } = get();
        const newDesigns = designs.filter(design => design.id !== designId);
        set({ designs: newDesigns });
        storage.saveDesigns(newDesigns);
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),

      clearError: () => set({ error: null }),

      // AI Operations
      generateDesign: async (imageUri: string, style: string) => {
        const { user } = get();
        
        // Check usage limits for free tier
        if (user.subscription === 'free' && user.usageCount >= 3) {
          set({ error: 'Daily limit reached. Upgrade to premium for unlimited designs.' });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          // For React Native, we'll pass the image URI directly
          // The API should handle the image processing
          const result = await currentApi.generateImage({ image: imageUri, style });
          
          // Get style info
          const styleInfo = await currentApi.getStyleInfo({ style });

          // Create new design
          const newDesign: GeneratedDesign = {
            id: result.id,
            originalImage: imageUri,
            generatedImage: result.imageUrl,
            style,
            description: styleInfo.description,
            createdAt: new Date(),
          };

          // Add design to store
          get().addDesign(newDesign);

          // Update usage count
          const updatedUser = {
            ...user,
            usageCount: user.usageCount + 1,
          };
          get().setUser(updatedUser);

        } catch (error) {
          console.error('Error generating design:', error);
          set({ error: 'Failed to generate design. Please try again.' });
        } finally {
          set({ isLoading: false });
        }
      },

      uploadImage: async (): Promise<string | null> => {
        try {
          // Request permissions
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            set({ error: 'Permission to access camera roll is required!' });
            return null;
          }

          // Launch image picker
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
          });

          if (!result.canceled && result.assets[0]) {
            return result.assets[0].uri;
          }

          return null;
        } catch (error) {
          console.error('Error uploading image:', error);
          set({ error: 'Failed to upload image' });
          return null;
        }
      },

      takePhoto: async (): Promise<string | null> => {
        try {
          // Request camera permissions
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') {
            set({ error: 'Permission to access camera is required!' });
            return null;
          }

          // Launch camera
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
          });

          if (!result.canceled && result.assets[0]) {
            return result.assets[0].uri;
          }

          return null;
        } catch (error) {
          console.error('Error taking photo:', error);
          set({ error: 'Failed to take photo' });
          return null;
        }
      },

      // User Management
      createGuestUser: async () => {
        try {
          let deviceId = await storage.getDeviceId();
          
          if (!deviceId) {
            deviceId = Device.osInternalBuildId || `device_${Date.now()}`;
            await storage.saveDeviceId(deviceId);
          }

          const guestUser: User = {
            id: `guest_${Date.now()}`,
            deviceId,
            isAuthenticated: false,
            subscription: 'free',
            usageCount: 0,
            lastReset: new Date(),
          };

          set({ user: guestUser });
          await storage.saveUser(guestUser);
        } catch (error) {
          console.error('Error creating guest user:', error);
          set({ error: 'Failed to create user account' });
        }
      },

      resetUsage: () => {
        const { user } = get();
        const updatedUser = {
          ...user,
          usageCount: 0,
          lastReset: new Date(),
        };
        get().setUser(updatedUser);
      },
    }),
    {
      name: 'interior-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        designs: state.designs,
      }),
    }
  )
);
