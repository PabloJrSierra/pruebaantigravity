import React from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AcademicProvider } from '@/context/AcademicContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AcademicProvider>
        <StatusBar style="light" />
        <Slot />
      </AcademicProvider>
    </SafeAreaProvider>
  );
}
