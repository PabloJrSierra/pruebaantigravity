import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAcademic } from '../context/AcademicContext';

export function ProfileScreen() {
  const {
    profile,
    currentGPA,
    progressPercentage,
    approvedCredits,
    totalProgramCredits,
    setIsCalculatorOpen,
    setActiveTab,
  } = useAcademic();

  const achievements = [
    {
      icon: 'flash',
      color: '#00E5FF',
      title: 'Especialista en Sistemas Eléctricos',
      desc: 'Completados Circuitos I y II, Máquinas Estáticas y Rotativas.',
      status: 'En curso',
    },
    {
      icon: 'cog',
      color: '#FF9100',
      title: 'Diseñador Mecánico & CAD',
      desc: 'Completado Dibujo Técnico, GD&T, Estática y Mecánica de Materiales.',
      status: 'Alcanzado',
    },
    {
      icon: 'calculator',
      color: '#B388FF',
      title: 'Ciclo de Ciencias Básicas',
      desc: 'Cálculo Diferencial, Integral, Vectorial y Ecuaciones Diferenciales.',
      status: '100% Completado',
    },
    {
      icon: 'hardware-chip',
      color: '#00E676',
      title: 'Automatización & Control',
      desc: 'Sistemas de Control Automático y Microcontroladores.',
      status: 'En progreso',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>
      {/* Profile Hero Header */}
      <View style={styles.profileHero}>
        <View style={styles.avatarGlowCircle}>
          <Text style={styles.avatarInitials}>PS</Text>
          <View style={styles.badgeOnline}>
            <Ionicons name="checkmark-sharp" size={10} color="#0A0F1D" />
          </View>
        </View>

        <Text style={styles.userName}>{profile.name}</Text>
        <Text style={styles.userCareer}>{profile.career}</Text>
        <Text style={styles.facultyText}>{profile.faculty}</Text>

        <View style={styles.tagRow}>
          <View style={styles.semBadge}>
            <Text style={styles.semBadgeText}>{profile.currentSemester}° Semestre Activo</Text>
          </View>
          <View style={styles.idBadge}>
            <Text style={styles.idBadgeText}>ID: {profile.studentId}</Text>
          </View>
        </View>
      </View>

      {/* KPI Cards Row */}
      <View style={styles.kpiRow}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiNumber}>{currentGPA}</Text>
          <Text style={styles.kpiLabel}>Promedio GPA</Text>
          <Text style={styles.kpiSub}>Escala de 0.0 a 5.0</Text>
        </View>

        <View style={styles.kpiCard}>
          <Text style={styles.kpiNumber}>{progressPercentage}%</Text>
          <Text style={styles.kpiLabel}>Avance de Carrera</Text>
          <Text style={styles.kpiSub}>{approvedCredits}/{totalProgramCredits} Créditos</Text>
        </View>
      </View>

      {/* Quick Action Button */}
      <TouchableOpacity
        style={styles.calcActionBtn}
        onPress={() => setIsCalculatorOpen(true)}
        activeOpacity={0.8}>
        <View style={styles.calcActionIcon}>
          <Ionicons name="calculator" size={20} color="#00E5FF" />
        </View>
        <View style={styles.calcActionTexts}>
          <Text style={styles.calcActionTitle}>Calculadora de Calificaciones</Text>
          <Text style={styles.calcActionSub}>
            Simula tu nota del examen final y proyecta tu promedio
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#00E5FF" />
      </TouchableOpacity>

      {/* Competencies / Achievements Section */}
      <View style={styles.sectionHeader}>
        <Ionicons name="ribbon-outline" size={16} color="#FF9100" />
        <Text style={styles.sectionTitle}>Hitos & Competencias del Ingeniero</Text>
      </View>

      <View style={styles.achievementsList}>
        {achievements.map((item, index) => (
          <View key={index} style={styles.achievementCard}>
            <View
              style={[
                styles.achieveIconWrap,
                { backgroundColor: `${item.color}15`, borderColor: `${item.color}40` },
              ]}>
              <Ionicons name={item.icon as any} size={18} color={item.color} />
            </View>
            <View style={styles.achieveInfo}>
              <View style={styles.achieveTop}>
                <Text style={styles.achieveTitle}>{item.title}</Text>
                <Text style={[styles.achieveStatus, { color: item.color }]}>
                  {item.status}
                </Text>
              </View>
              <Text style={styles.achieveDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Program Summary Card */}
      <View style={styles.programCard}>
        <Text style={styles.programTitle}>Información del Programa</Text>
        <View style={styles.programRow}>
          <Text style={styles.programLabel}>Duración Oficial:</Text>
          <Text style={styles.programVal}>9 Semestres Académicos</Text>
        </View>
        <View style={styles.programRow}>
          <Text style={styles.programLabel}>Modalidad:</Text>
          <Text style={styles.programVal}>Presencial Diurna</Text>
        </View>
        <View style={styles.programRow}>
          <Text style={styles.programLabel}>Total de Asignaturas:</Text>
          <Text style={styles.programVal}>54 Materias</Text>
        </View>
        <View style={styles.programRow}>
          <Text style={styles.programLabel}>Créditos Totales:</Text>
          <Text style={styles.programVal}>{totalProgramCredits} Créditos Académicos</Text>
        </View>

        <TouchableOpacity
          style={styles.viewPensumBtn}
          onPress={() => setActiveTab('pensum')}>
          <Text style={styles.viewPensumBtnText}>Ver Malla Curricular Completa</Text>
          <Ionicons name="arrow-forward" size={14} color="#00E5FF" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1D',
  },
  scrollContent: {
    paddingTop: 14,
    paddingHorizontal: 16,
  },
  profileHero: {
    backgroundColor: '#131B2E',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
  },
  avatarGlowCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#00E5FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    position: 'relative',
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  avatarInitials: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0A0F1D',
  },
  badgeOnline: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#00E676',
    borderWidth: 2,
    borderColor: '#131B2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userCareer: {
    fontSize: 13,
    fontWeight: '700',
    color: '#00E5FF',
    marginTop: 2,
  },
  facultyText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  semBadge: {
    backgroundColor: 'rgba(255, 145, 0, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 145, 0, 0.3)',
  },
  semBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FF9100',
  },
  idBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  idBadgeText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#CBD5E1',
    fontWeight: '600',
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  kpiNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#00E5FF',
  },
  kpiLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 4,
  },
  kpiSub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  calcActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)',
  },
  calcActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calcActionTexts: {
    flex: 1,
    marginLeft: 12,
  },
  calcActionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  calcActionSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#CBD5E1',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  achievementsList: {
    gap: 10,
    marginBottom: 20,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    gap: 12,
  },
  achieveIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  achieveInfo: {
    flex: 1,
  },
  achieveTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  achieveTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  achieveStatus: {
    fontSize: 10,
    fontWeight: '700',
  },
  achieveDesc: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
    lineHeight: 15,
  },
  programCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  programTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  programRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  programLabel: {
    fontSize: 12,
    color: '#94A3B8',
  },
  programVal: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  viewPensumBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
  },
  viewPensumBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00E5FF',
  },
  bottomSpacer: {
    height: 90,
  },
});
