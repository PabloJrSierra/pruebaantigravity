import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAcademic } from '../context/AcademicContext';

export function HeaderBar() {
  const { setIsDrawerOpen, setIsCalculatorOpen, currentGPA } =
    useAcademic();

  return (
    <View style={styles.container}>
      {/* Drawer Toggle Button */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setIsDrawerOpen(true)}
        activeOpacity={0.7}
        accessibilityLabel="Abrir menú de perfil">
        <Ionicons name="grid-outline" size={22} color="#00E5FF" />
      </TouchableOpacity>

      {/* Title & Career Badge */}
      <View style={styles.titleContainer}>
        <View style={styles.badgeRow}>
          <Text style={styles.badgeText}>⚡ INGENIERÍA ⚙️</Text>
        </View>
        <Text style={styles.mainTitle} numberOfLines={1}>
          Electromecánica
        </Text>
      </View>

      {/* GPA & Calculator Quick Button */}
      <TouchableOpacity
        style={styles.gpaPill}
        onPress={() => setIsCalculatorOpen(true)}
        activeOpacity={0.8}
        accessibilityLabel="Abrir calculadora de promedio">
        <View style={styles.gpaDot} />
        <Text style={styles.gpaText}>{currentGPA > 0 ? `${currentGPA}` : '4.42'}</Text>
        <Ionicons name="calculator-outline" size={14} color="#00E5FF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0A0F1D',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 145, 0, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 145, 0, 0.25)',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FF9100',
    letterSpacing: 1.2,
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  gpaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)',
    gap: 6,
  },
  gpaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00E676',
  },
  gpaText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#00E5FF',
  },
});
