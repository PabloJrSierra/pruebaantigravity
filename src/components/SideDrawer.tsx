import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAcademic, NavTab } from '../context/AcademicContext';

export function SideDrawer() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    profile,
    activeSemester,
    setActiveSemester,
    setActiveTab,
    setIsCalculatorOpen,
    progressPercentage,
    approvedCredits,
    totalProgramCredits,
    approvedCount,
    inProgressCount,
    pendingCount,
    currentGPA,
  } = useAcademic();

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    setIsDrawerOpen(false);
  };

  const handleSelectSemester = (sem: number) => {
    setActiveSemester(sem);
    setActiveTab('pensum');
    setIsDrawerOpen(false);
  };

  const handleOpenCalculator = () => {
    setIsDrawerOpen(false);
    setIsCalculatorOpen(true);
  };

  return (
    <Modal
      visible={isDrawerOpen}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setIsDrawerOpen(false)}>
      <View style={styles.modalOverlay}>
        {/* Backdrop to close */}
        <Pressable style={styles.backdrop} onPress={() => setIsDrawerOpen(false)} />

        {/* Sliding Panel */}
        <View style={styles.drawerContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Header with Close Button */}
            <View style={styles.drawerHeader}>
              <View style={styles.facultyBadge}>
                <Ionicons name="school" size={14} color="#00E5FF" />
                <Text style={styles.facultyBadgeText}>FACULTAD DE INGENIERÍA</Text>
              </View>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setIsDrawerOpen(false)}>
                <Ionicons name="close" size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {/* Profile Card */}
            <View style={styles.profileCard}>
              <View style={styles.avatarRow}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarInitials}>PS</Text>
                  <View style={styles.onlineBadge} />
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{profile.name}</Text>
                  <Text style={styles.profileCareer}>{profile.career}</Text>
                  <Text style={styles.studentId}>{profile.studentId}</Text>
                </View>
              </View>

              {/* Career Progress Box */}
              <View style={styles.progressBox}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Avance del Programa</Text>
                  <Text style={styles.progressVal}>{progressPercentage}%</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View
                    style={[styles.progressBarFill, { width: `${progressPercentage}%` }]}
                  />
                </View>
                <View style={styles.progressSubRow}>
                  <Text style={styles.progressSubText}>
                    {approvedCredits} de {totalProgramCredits} créditos aprobados
                  </Text>
                  <View style={styles.gpaSmallBadge}>
                    <Text style={styles.gpaSmallText}>GPA: {currentGPA}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Quick Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={[styles.statBox, { borderColor: 'rgba(0, 230, 118, 0.3)' }]}>
                <Text style={[styles.statNum, { color: '#00E676' }]}>{approvedCount}</Text>
                <Text style={styles.statLabel}>Aprobadas</Text>
              </View>
              <View style={[styles.statBox, { borderColor: 'rgba(0, 229, 255, 0.3)' }]}>
                <Text style={[styles.statNum, { color: '#00E5FF' }]}>{inProgressCount}</Text>
                <Text style={styles.statLabel}>En Curso</Text>
              </View>
              <View style={[styles.statBox, { borderColor: 'rgba(148, 163, 184, 0.3)' }]}>
                <Text style={[styles.statNum, { color: '#94A3B8' }]}>{pendingCount}</Text>
                <Text style={styles.statLabel}>Pendientes</Text>
              </View>
            </View>

            {/* Quick Semester Switcher */}
            <View style={styles.sectionHeader}>
              <Ionicons name="layers-outline" size={16} color="#00E5FF" />
              <Text style={styles.sectionTitle}>Saltar a Semestre (1 al 9)</Text>
            </View>
            <View style={styles.semesterChipsRow}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((sem) => {
                const isActive = activeSemester === sem;
                const isCurrent = sem === profile.currentSemester;
                return (
                  <TouchableOpacity
                    key={sem}
                    style={[
                      styles.semChip,
                      isActive && styles.semChipActive,
                      isCurrent && !isActive && styles.semChipCurrent,
                    ]}
                    onPress={() => handleSelectSemester(sem)}>
                    <Text
                      style={[
                        styles.semChipText,
                        isActive && styles.semChipTextActive,
                      ]}>
                      {sem}°
                    </Text>
                    {isCurrent && <View style={styles.currentDot} />}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Navigation Menu Links */}
            <View style={styles.sectionHeader}>
              <Ionicons name="compass-outline" size={16} color="#FF9100" />
              <Text style={styles.sectionTitle}>Accesos del Estudiante</Text>
            </View>

            <View style={styles.navLinksContainer}>
              <TouchableOpacity
                style={styles.navLinkItem}
                onPress={() => handleNavigate('pensum')}>
                <View style={[styles.navIconBox, { backgroundColor: 'rgba(0, 229, 255, 0.1)' }]}>
                  <Ionicons name="book-outline" size={18} color="#00E5FF" />
                </View>
                <View style={styles.navLinkInfo}>
                  <Text style={styles.navLinkTitle}>Plan de Estudios (Pensum)</Text>
                  <Text style={styles.navLinkSub}>Malla curricular de 9 semestres</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#64748B" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navLinkItem}
                onPress={() => handleNavigate('progreso')}>
                <View style={[styles.navIconBox, { backgroundColor: 'rgba(0, 230, 118, 0.1)' }]}>
                  <Ionicons name="bar-chart-outline" size={18} color="#00E676" />
                </View>
                <View style={styles.navLinkInfo}>
                  <Text style={styles.navLinkTitle}>Métricas de Rendimiento</Text>
                  <Text style={styles.navLinkSub}>Desglose por áreas y créditos</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#64748B" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navLinkItem}
                onPress={() => handleNavigate('horario')}>
                <View style={[styles.navIconBox, { backgroundColor: 'rgba(255, 145, 0, 0.1)' }]}>
                  <Ionicons name="calendar-outline" size={18} color="#FF9100" />
                </View>
                <View style={styles.navLinkInfo}>
                  <Text style={styles.navLinkTitle}>Horario Semanal</Text>
                  <Text style={styles.navLinkSub}>Materias activas de 6° semestre</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#64748B" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navLinkItem}
                onPress={handleOpenCalculator}>
                <View style={[styles.navIconBox, { backgroundColor: 'rgba(179, 136, 255, 0.1)' }]}>
                  <Ionicons name="calculator-outline" size={18} color="#B388FF" />
                </View>
                <View style={styles.navLinkInfo}>
                  <Text style={styles.navLinkTitle}>Calculadora de Promedio</Text>
                  <Text style={styles.navLinkSub}>Simulador de notas y promedios</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#64748B" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navLinkItem}
                onPress={() => handleNavigate('perfil')}>
                <View style={[styles.navIconBox, { backgroundColor: 'rgba(144, 202, 249, 0.1)' }]}>
                  <Ionicons name="person-outline" size={18} color="#90CAF9" />
                </View>
                <View style={styles.navLinkInfo}>
                  <Text style={styles.navLinkTitle}>Perfil Académico</Text>
                  <Text style={styles.navLinkSub}>Información y proyección de grado</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.drawerFooter}>
              <Text style={styles.footerBrand}>INGENIERÍA ELECTROMECÁNICA</Text>
              <Text style={styles.footerVersion}>Plan 2024 · Versión 1.0.0 UI</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawerContainer: {
    width: '82%',
    maxWidth: 340,
    height: '100%',
    backgroundColor: '#0F172A',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 36,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  facultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
  },
  facultyBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#00E5FF',
    letterSpacing: 0.8,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#00E5FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  avatarInitials: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0A0F1D',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00E676',
    borderWidth: 2,
    borderColor: '#1E293B',
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileCareer: {
    fontSize: 12,
    color: '#00E5FF',
    fontWeight: '600',
    marginTop: 1,
  },
  studentId: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  progressBox: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 12,
    padding: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  progressVal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#00E676',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00E676',
    borderRadius: 3,
  },
  progressSubRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressSubText: {
    fontSize: 10,
    color: '#64748B',
  },
  gpaSmallBadge: {
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  gpaSmallText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#00E5FF',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  statNum: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#CBD5E1',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  semesterChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 20,
  },
  semChip: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  semChipActive: {
    backgroundColor: '#00E5FF',
    borderColor: '#00E5FF',
  },
  semChipCurrent: {
    borderColor: '#FF9100',
    borderWidth: 1.5,
  },
  semChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  semChipTextActive: {
    color: '#0A0F1D',
  },
  currentDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF9100',
  },
  navLinksContainer: {
    gap: 8,
    marginBottom: 24,
  },
  navLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  navIconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLinkInfo: {
    flex: 1,
    marginLeft: 12,
  },
  navLinkTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  navLinkSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  drawerFooter: {
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  footerBrand: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 1.2,
  },
  footerVersion: {
    fontSize: 9,
    color: '#475569',
    marginTop: 2,
  },
});
