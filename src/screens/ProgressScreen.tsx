import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAcademic, AREA_CONFIG } from '../context/AcademicContext';
import { SubjectArea } from '../types/academic';

export function ProgressScreen() {
  const {
    progressPercentage,
    approvedCredits,
    totalProgramCredits,
    inProgressCredits,
    pendingCredits,
    approvedCount,
    inProgressCount,
    pendingCount,
    currentGPA,
    areaStats,
    setIsCalculatorOpen,
  } = useAcademic();

  const areas: SubjectArea[] = [
    'eléctrica',
    'mecánica',
    'control',
    'básicas',
    'económico-administrativa',
    'complementaria',
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>
      {/* Title */}
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.titleBadge}>MÉTRICAS & AUDITORÍA</Text>
          <Text style={styles.screenTitle}>Progreso Académico</Text>
        </View>
        <TouchableOpacity
          style={styles.calcBtn}
          onPress={() => setIsCalculatorOpen(true)}>
          <Ionicons name="calculator-outline" size={16} color="#00E5FF" />
          <Text style={styles.calcBtnText}>Simular</Text>
        </TouchableOpacity>
      </View>

      {/* Main Career Battery / Circular Card */}
      <View style={styles.heroCard}>
        <View style={styles.heroGaugeContainer}>
          <View style={styles.gaugeOuterCircle}>
            <View style={styles.gaugeInnerCircle}>
              <Text style={styles.gaugePercentage}>{progressPercentage}%</Text>
              <Text style={styles.gaugeSub}>DE LA CARRERA</Text>
            </View>
          </View>
        </View>

        <View style={styles.heroInfoCol}>
          <Text style={styles.heroCareerText}>Ing. Electromecánica</Text>
          <Text style={styles.heroCreditsSummary}>
            {approvedCredits} <Text style={styles.heroCreditsMuted}>/ {totalProgramCredits} CR</Text>
          </Text>

          <View style={styles.heroGpaRow}>
            <View style={styles.gpaBadgeBox}>
              <Ionicons name="star" size={12} color="#FFD600" />
              <Text style={styles.gpaBadgeText}>Promedio: {currentGPA}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 3 Status Cards Row */}
      <View style={styles.statusCardsRow}>
        <View style={[styles.statusBox, { borderColor: 'rgba(0, 230, 118, 0.3)' }]}>
          <View style={[styles.statusIconWrap, { backgroundColor: 'rgba(0, 230, 118, 0.1)' }]}>
            <Ionicons name="checkmark-done-circle" size={18} color="#00E676" />
          </View>
          <Text style={[styles.statusBoxNum, { color: '#00E676' }]}>{approvedCount}</Text>
          <Text style={styles.statusBoxLabel}>Aprobadas</Text>
          <Text style={styles.statusBoxCredits}>{approvedCredits} Créditos</Text>
        </View>

        <View style={[styles.statusBox, { borderColor: 'rgba(0, 229, 255, 0.3)' }]}>
          <View style={[styles.statusIconWrap, { backgroundColor: 'rgba(0, 229, 255, 0.1)' }]}>
            <Ionicons name="sync-circle" size={18} color="#00E5FF" />
          </View>
          <Text style={[styles.statusBoxNum, { color: '#00E5FF' }]}>{inProgressCount}</Text>
          <Text style={styles.statusBoxLabel}>En Curso</Text>
          <Text style={styles.statusBoxCredits}>{inProgressCredits} Créditos</Text>
        </View>

        <View style={[styles.statusBox, { borderColor: 'rgba(148, 163, 184, 0.3)' }]}>
          <View style={[styles.statusIconWrap, { backgroundColor: 'rgba(148, 163, 184, 0.1)' }]}>
            <Ionicons name="time" size={18} color="#94A3B8" />
          </View>
          <Text style={[styles.statusBoxNum, { color: '#94A3B8' }]}>{pendingCount}</Text>
          <Text style={styles.statusBoxLabel}>Pendientes</Text>
          <Text style={styles.statusBoxCredits}>{pendingCredits} Créditos</Text>
        </View>
      </View>

      {/* Areas Breakdown Section */}
      <View style={styles.sectionHeader}>
        <Ionicons name="pie-chart-outline" size={16} color="#00E5FF" />
        <Text style={styles.sectionTitle}>Avance por Áreas del Conocimiento</Text>
      </View>

      <View style={styles.areasContainer}>
        {areas.map((areaKey) => {
          const stat = areaStats[areaKey];
          const config = AREA_CONFIG[areaKey];
          if (!stat) return null;

          const pct =
            stat.totalCredits > 0
              ? Math.round((stat.approvedCredits / stat.totalCredits) * 100)
              : 0;

          return (
            <View key={areaKey} style={styles.areaCard}>
              <View style={styles.areaCardTop}>
                <View style={styles.areaTitleRow}>
                  <View
                    style={[
                      styles.areaIconWrap,
                      { backgroundColor: config.bg, borderColor: config.border },
                    ]}>
                    <Ionicons name={config.icon as any} size={16} color={config.color} />
                  </View>
                  <View>
                    <Text style={styles.areaCardName}>{config.label}</Text>
                    <Text style={styles.areaCardSub}>
                      {stat.approvedSubjects} de {stat.totalSubjects} asignaturas aprobadas
                    </Text>
                  </View>
                </View>
                <Text style={[styles.areaPctText, { color: config.color }]}>{pct}%</Text>
              </View>

              {/* Progress bar */}
              <View style={styles.areaBarBg}>
                <View
                  style={[
                    styles.areaBarFill,
                    { width: `${pct}%`, backgroundColor: config.color },
                  ]}
                />
              </View>

              <View style={styles.areaFooter}>
                <Text style={styles.areaFooterCredits}>
                  {stat.approvedCredits} de {stat.totalCredits} créditos
                </Text>
                {pct === 100 && (
                  <View style={styles.completedBadge}>
                    <Ionicons name="checkmark" size={10} color="#00E676" />
                    <Text style={styles.completedText}>Completada</Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#00E5FF',
    letterSpacing: 1,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  calcBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)',
  },
  calcBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00E5FF',
  },
  heroCard: {
    flexDirection: 'row',
    backgroundColor: '#131B2E',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    gap: 16,
  },
  heroGaugeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeOuterCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: '#00E676',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  gaugeInnerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugePercentage: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  gaugeSub: {
    fontSize: 7,
    fontWeight: '800',
    color: '#00E676',
    letterSpacing: 0.8,
  },
  heroInfoCol: {
    flex: 1,
  },
  heroCareerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
  },
  heroCreditsSummary: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },
  heroCreditsMuted: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  heroGpaRow: {
    marginTop: 8,
  },
  gpaBadgeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 214, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 214, 0, 0.3)',
  },
  gpaBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFD600',
  },
  statusCardsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  statusBox: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  statusIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statusBoxNum: {
    fontSize: 18,
    fontWeight: '800',
  },
  statusBoxLabel: {
    fontSize: 11,
    color: '#CBD5E1',
    fontWeight: '600',
    marginTop: 2,
  },
  statusBoxCredits: {
    fontSize: 9,
    color: '#64748B',
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
  areasContainer: {
    gap: 10,
  },
  areaCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  areaCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  areaTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  areaIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  areaCardName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  areaCardSub: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 1,
  },
  areaPctText: {
    fontSize: 15,
    fontWeight: '900',
  },
  areaBarBg: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  areaBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  areaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  areaFooterCredits: {
    fontSize: 10,
    color: '#64748B',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 3,
  },
  completedText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#00E676',
  },
  bottomSpacer: {
    height: 90,
  },
});
