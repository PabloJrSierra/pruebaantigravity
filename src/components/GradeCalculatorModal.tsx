import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAcademic } from '../context/AcademicContext';

export function GradeCalculatorModal() {
  const { isCalculatorOpen, setIsCalculatorOpen, currentGPA } = useAcademic();

  const [corte1, setCorte1] = useState<number>(3.8);
  const [corte2, setCorte2] = useState<number>(3.5);
  const [targetFinal, setTargetFinal] = useState<number>(3.0);

  if (!isCalculatorOpen) return null;

  // Weights: Corte 1 (30%), Corte 2 (30%), Examen Final (40%)
  const accumulated = corte1 * 0.3 + corte2 * 0.3;
  const neededForTarget = (targetFinal - accumulated) / 0.4;
  const neededClamped = Math.max(0, Number(neededForTarget.toFixed(2)));

  const handleAdjust = (setter: React.Dispatch<React.SetStateAction<number>>, delta: number) => {
    setter((prev) => {
      const next = Number((prev + delta).toFixed(1));
      return Math.min(5.0, Math.max(0.0, next));
    });
  };

  return (
    <Modal
      visible={isCalculatorOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsCalculatorOpen(false)}>
      <View style={styles.modalOverlay}>
        <Pressable style={styles.backdrop} onPress={() => setIsCalculatorOpen(false)} />

        <View style={styles.sheetContainer}>
          <View style={styles.handleBar} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Header */}
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.badgeLabel}>SIMULADOR ACADÉMICO</Text>
                <Text style={styles.sheetTitle}>Calculadora de Calificaciones</Text>
              </View>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setIsCalculatorOpen(false)}>
                <Ionicons name="close" size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {/* Current GPA Summary */}
            <View style={styles.gpaHeroCard}>
              <View>
                <Text style={styles.gpaHeroLabel}>Tu Promedio Acumulado Actual</Text>
                <Text style={styles.gpaHeroSub}>Calculado de asignaturas aprobadas</Text>
              </View>
              <View style={styles.gpaHeroCircle}>
                <Text style={styles.gpaHeroVal}>{currentGPA}</Text>
                <Text style={styles.gpaHeroScale}>/ 5.0</Text>
              </View>
            </View>

            {/* Target Passed Grade Simulator */}
            <View style={styles.simCard}>
              <View style={styles.simHeader}>
                <Ionicons name="calculator" size={18} color="#00E5FF" />
                <Text style={styles.simTitle}>¿Cuánto necesito en el Examen Final?</Text>
              </View>
              <Text style={styles.simSub}>
                Ponderación típica: Corte 1 (30%), Corte 2 (30%), Final (40%).
              </Text>

              {/* Corte 1 Control */}
              <View style={styles.controlRow}>
                <View>
                  <Text style={styles.controlTitle}>Primer Corte (30%)</Text>
                  <Text style={styles.controlSub}>Aporta: {(corte1 * 0.3).toFixed(2)} pts</Text>
                </View>
                <View style={styles.stepperContainer}>
                  <TouchableOpacity
                    style={styles.stepperBtn}
                    onPress={() => handleAdjust(setCorte1, -0.1)}>
                    <Text style={styles.stepperBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.stepperVal}>{corte1.toFixed(1)}</Text>
                  <TouchableOpacity
                    style={styles.stepperBtn}
                    onPress={() => handleAdjust(setCorte1, 0.1)}>
                    <Text style={styles.stepperBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Corte 2 Control */}
              <View style={styles.controlRow}>
                <View>
                  <Text style={styles.controlTitle}>Segundo Corte (30%)</Text>
                  <Text style={styles.controlSub}>Aporta: {(corte2 * 0.3).toFixed(2)} pts</Text>
                </View>
                <View style={styles.stepperContainer}>
                  <TouchableOpacity
                    style={styles.stepperBtn}
                    onPress={() => handleAdjust(setCorte2, -0.1)}>
                    <Text style={styles.stepperBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.stepperVal}>{corte2.toFixed(1)}</Text>
                  <TouchableOpacity
                    style={styles.stepperBtn}
                    onPress={() => handleAdjust(setCorte2, 0.1)}>
                    <Text style={styles.stepperBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Target Final Grade Selector */}
              <View style={styles.targetSection}>
                <Text style={styles.targetLabel}>Nota mínima deseada para pasar:</Text>
                <View style={styles.targetPillsRow}>
                  {[3.0, 3.5, 4.0, 4.5].map((target) => (
                    <TouchableOpacity
                      key={target}
                      style={[
                        styles.targetPill,
                        targetFinal === target && styles.targetPillActive,
                      ]}
                      onPress={() => setTargetFinal(target)}>
                      <Text
                        style={[
                          styles.targetPillText,
                          targetFinal === target && styles.targetPillTextActive,
                        ]}>
                        {target.toFixed(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Calculation Result */}
              <View
                style={[
                  styles.resultCard,
                  neededClamped > 5.0
                    ? styles.resultFail
                    : neededClamped <= 3.0
                    ? styles.resultEasy
                    : styles.resultWarn,
                ]}>
                <Ionicons
                  name={
                    neededClamped > 5.0
                      ? 'close-circle'
                      : neededClamped <= 3.0
                      ? 'checkmark-circle'
                      : 'alert-circle'
                  }
                  size={28}
                  color={
                    neededClamped > 5.0
                      ? '#FF5252'
                      : neededClamped <= 3.0
                      ? '#00E676'
                      : '#FF9100'
                  }
                />
                <View style={styles.resultInfo}>
                  <Text style={styles.resultMainLabel}>
                    Necesitas sacar en el Examen Final:
                  </Text>
                  <Text style={styles.resultScoreText}>
                    {neededClamped > 5.0 ? 'Mayor a 5.0 (Inalcanzable)' : `${neededClamped} / 5.0`}
                  </Text>
                  <Text style={styles.resultHint}>
                    Llevas acumulado {(accumulated).toFixed(2)} de {targetFinal.toFixed(1)} puntos necesarios.
                  </Text>
                </View>
              </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1.5,
    borderTopColor: 'rgba(0, 229, 255, 0.3)',
    maxHeight: '85%',
    paddingBottom: 24,
  },
  handleBar: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 36,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  badgeLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#00E5FF',
    letterSpacing: 1,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gpaHeroCard: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
  },
  gpaHeroLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  gpaHeroSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  gpaHeroCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#00E5FF',
  },
  gpaHeroVal: {
    fontSize: 18,
    fontWeight: '900',
    color: '#00E5FF',
  },
  gpaHeroScale: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '600',
  },
  simCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  simHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  simTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  simSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 16,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  controlTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E2E8F0',
  },
  controlSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  stepperBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00E5FF',
  },
  stepperVal: {
    width: 44,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  targetSection: {
    marginTop: 14,
  },
  targetLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 8,
  },
  targetPillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  targetPill: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  targetPillActive: {
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
    borderColor: '#00E5FF',
  },
  targetPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  targetPillTextActive: {
    color: '#00E5FF',
  },
  resultCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 12,
  },
  resultEasy: {
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    borderColor: 'rgba(0, 230, 118, 0.3)',
  },
  resultWarn: {
    backgroundColor: 'rgba(255, 145, 0, 0.1)',
    borderColor: 'rgba(255, 145, 0, 0.3)',
  },
  resultFail: {
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    borderColor: 'rgba(255, 82, 82, 0.3)',
  },
  resultInfo: {
    flex: 1,
  },
  resultMainLabel: {
    fontSize: 11,
    color: '#CBD5E1',
    fontWeight: '500',
  },
  resultScoreText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },
  resultHint: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
});
