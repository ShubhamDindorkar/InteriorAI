import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useStore } from '../src/hooks/useStore';
import { colors } from '../src/lib/theme';

export default function RootLayout() {
  const { initializeApp } = useStore();

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.light.background,
          },
          headerTintColor: colors.light.text.heading,
          headerTitleStyle: {
            fontFamily: 'Poppins_700Bold',
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
