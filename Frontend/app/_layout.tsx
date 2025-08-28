import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useStore } from '../src/hooks/useStore';
import { colors } from '../src/lib/theme';
import { LoadingScreen } from '../src/components/ui/LoadingScreen';

export default function RootLayout() {
  const { initializeApp } = useStore();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadAppResources() {
      try {
        await initializeApp();
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading app resources:', error);
        setFontsLoaded(true); // Continue anyway
      }
    }
    
    loadAppResources();
  }, [initializeApp]);

  if (!fontsLoaded) {
    return <LoadingScreen message="Loading fonts..." />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.light.background,
          },
          headerTintColor: colors.light.text.heading,
          headerTitleStyle: {
            fontFamily: 'Georgia',
          },
          contentStyle: {
            backgroundColor: colors.light.background,
          },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
