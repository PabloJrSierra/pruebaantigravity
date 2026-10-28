import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAcademic } from '@/context/AcademicContext';
import { HeaderBar } from '@/components/HeaderBar';
import { SideDrawer } from '@/components/SideDrawer';
import { FloatingNavBar } from '@/components/FloatingNavBar';
import { SubjectDetailModal } from '@/components/SubjectDetailModal';
import { GradeCalculatorModal } from '@/components/GradeCalculatorModal';
import { PensumScreen } from '@/screens/PensumScreen';
import { ProgressScreen } from '@/screens/ProgressScreen';
import { ScheduleScreen } from '@/screens/ScheduleScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';

export default function MainScreen() {
  const { activeTab } = useAcademic();

  const renderCurrentScreen = () => {
    switch (activeTab) {
      case 'pensum':
        return <PensumScreen />;
      case 'progreso':
        return <ProgressScreen />;
      case 'horario':
        return <ScheduleScreen />;
      case 'perfil':
        return <ProfileScreen />;
      default:
        return <PensumScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Top Header */}
      <HeaderBar />

      {/* Screen Content */}
      <View style={styles.screenWrapper}>{renderCurrentScreen()}</View>

      {/* Floating Bottom Navigation Bar */}
      <FloatingNavBar />

      {/* Side Profile Drawer */}
      <SideDrawer />

      {/* Interactive Subject Detail Modal Sheet */}
      <SubjectDetailModal />

      {/* Interactive Grade & GPA Calculator Modal */}
      <GradeCalculatorModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1D',
  },
  screenWrapper: {
    flex: 1,
  },
});
