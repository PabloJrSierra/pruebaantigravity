import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAcademic, NavTab } from '../context/AcademicContext';

interface TabItem {
  id: NavTab;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
}

const TABS: TabItem[] = [
  { id: 'pensum', label: 'Pensum', icon: 'layers-outline', activeIcon: 'layers' },
  { id: 'progreso', label: 'Métricas', icon: 'pie-chart-outline', activeIcon: 'pie-chart' },
  { id: 'horario', label: 'Horario', icon: 'calendar-outline', activeIcon: 'calendar' },
  { id: 'perfil', label: 'Perfil', icon: 'person-outline', activeIcon: 'person' },
];

export function FloatingNavBar() {
  const { activeTab, setActiveTab } = useAcademic();

  return (
    <View style={styles.floatingContainer}>
      <View style={styles.dockBar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.7}
              accessibilityLabel={`Ir a pestaña ${tab.label}`}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={isActive ? tab.activeIcon : tab.icon}
                  size={20}
                  color={isActive ? '#00E5FF' : '#94A3B8'}
                />
                {isActive && <View style={styles.activeGlowDot} />}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isActive ? styles.tabLabelActive : styles.tabLabelInactive,
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 100,
  },
  dockBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.94)',
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 20,
    width: '100%',
    maxWidth: 420,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 22,
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(0, 229, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.4)',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeGlowDot: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#00E5FF',
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  tabLabelActive: {
    color: '#00E5FF',
  },
  tabLabelInactive: {
    color: '#94A3B8',
  },
});
