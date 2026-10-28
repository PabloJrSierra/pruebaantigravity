import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAcademic, AREA_CONFIG } from '../context/AcademicContext';
import { SubjectStatus } from '../types/academic';

export function SubjectDetailModal() {
  const { selectedSubject, setSelectedSubject, updateSubjectStatus, allSubjects } =
    useAcademic();

  if (!selectedSubject) return null;

  const areaConfig = AREA_CONFIG[selectedSubject.area];

  const handleStatusChange = (newStatus: SubjectStatus) => {
    updateSubjectStatus(
      selectedSubject.id,
      newStatus,
      newStatus === 'aprobada' ? selectedSubject.grade || 4.2 : undefined
    );
  };

  const handleGradeChange = (grade: number) => {
    updateSubjectStatus(selectedSubject.id, 'aprobada', grade);
  };

  return (
    <Modal
      visible={!!selectedSubject}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setSelectedSubject(null)}>
      <View style={styles.modalOverlay}>
        <Pressable style={styles.backdrop} onPress={() => setSelectedSubject(null)} />

        <View style={styles.sheetContainer}>
          {/* Grab handle */}
          <View style={styles.handleBar} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Header info */}
            <View style={styles.headerRow}>
              <View>
                <View style={styles.metaRow}>
                  <Text style={styles.codeText}>{selectedSubject.code}</Text>
                  <Text style={styles.semText}>• Semestre {selectedSubject.semester}</Text>
                  <View style={styles.creditsBadge}>
                    <Text style={styles.creditsText}>{selectedSubject.credits} Créditos</Text>
                  </View>
                </View>
                <Text style={styles.title}>{selectedSubject.name}</Text>
              </View>

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setSelectedSubject(null)}>
                <Ionicons name="close" size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {/* Area Badge Banner */}
            <View
              style={[
                styles.areaBanner,
                { backgroundColor: areaConfig.bg, borderColor: areaConfig.border },
              ]}>
              <Ionicons
                name={areaConfig.icon as any}
                size={16}
                color={areaConfig.color}
              />
              <Text style={[styles.areaBannerText, { color: areaConfig.color }]}>
                Área de Formación: {areaConfig.label}
              </Text>
            </View>

            {/* Interactive Status Switcher */}
            <View style={styles.interactiveBox}>
              <Text style={styles.boxTitle}>Estado de la Materia</Text>
              <Text style={styles.boxSubtitle}>
                Toca para actualizar tu avance en tiempo real:
              </Text>
              <View style={styles.statusButtonsRow}>
                <TouchableOpacity
                  style={[
                    styles.statusBtn,
                    selectedSubject.status === 'aprobada' && styles.statusBtnApprovedActive,
                  ]}
                  onPress={() => handleStatusChange('aprobada')}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={
                      selectedSubject.status === 'aprobada' ? '#0A0F1D' : '#00E676'
                    }
                  />
                  <Text
                    style={[
                      styles.statusBtnText,
                      selectedSubject.status === 'aprobada' &&
                        styles.statusBtnTextActive,
                    ]}>
                    Aprobada
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.statusBtn,
                    selectedSubject.status === 'cursando' && styles.statusBtnCurrentActive,
                  ]}
                  onPress={() => handleStatusChange('cursando')}>
                  <Ionicons
                    name="play-circle"
                    size={16}
                    color={
                      selectedSubject.status === 'cursando' ? '#0A0F1D' : '#00E5FF'
                    }
                  />
                  <Text
                    style={[
                      styles.statusBtnText,
                      selectedSubject.status === 'cursando' &&
                        styles.statusBtnTextActive,
                    ]}>
                    Cursando
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.statusBtn,
                    selectedSubject.status === 'pendiente' && styles.statusBtnPendingActive,
                  ]}
                  onPress={() => handleStatusChange('pendiente')}>
                  <Ionicons
                    name="time"
                    size={16}
                    color={
                      selectedSubject.status === 'pendiente' ? '#0A0F1D' : '#94A3B8'
                    }
                  />
                  <Text
                    style={[
                      styles.statusBtnText,
                      selectedSubject.status === 'pendiente' &&
                        styles.statusBtnTextActive,
                    ]}>
                    Pendiente
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Grade Selector if Approved */}
              {selectedSubject.status === 'aprobada' && (
                <View style={styles.gradeSection}>
                  <Text style={styles.gradeLabel}>
                    Calificación Obtenida:{' '}
                    <Text style={styles.gradeHighlight}>
                      {selectedSubject.grade ? selectedSubject.grade.toFixed(1) : '4.2'} / 5.0
                    </Text>
                  </Text>
                  <View style={styles.gradePillsRow}>
                    {[3.5, 4.0, 4.2, 4.5, 4.8, 5.0].map((val) => {
                      const isSelected = selectedSubject.grade === val;
                      return (
                        <TouchableOpacity
                          key={val}
                          style={[
                            styles.gradePill,
                            isSelected && styles.gradePillActive,
                          ]}
                          onPress={() => handleGradeChange(val)}>
                          <Text
                            style={[
                              styles.gradePillText,
                              isSelected && styles.gradePillTextActive,
                            ]}>
                            {val.toFixed(1)}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}
            </View>

            {/* Course Details */}
            <View style={styles.detailSection}>
              <Text style={styles.sectionHeading}>Descripción de la Asignatura</Text>
              <Text style={styles.descriptionText}>{selectedSubject.description}</Text>
            </View>

            {/* Time Distribution */}
            <View style={styles.timeDistributionBox}>
              <View style={styles.timeCol}>
                <Ionicons name="school-outline" size={18} color="#00E5FF" />
                <Text style={styles.timeVal}>{selectedSubject.theoryHours}h/sem</Text>
                <Text style={styles.timeTitle}>Horas Teóricas</Text>
              </View>
              <View style={styles.timeDivider} />
              <View style={styles.timeCol}>
                <Ionicons name="construct-outline" size={18} color="#FF9100" />
                <Text style={styles.timeVal}>{selectedSubject.practiceHours}h/sem</Text>
                <Text style={styles.timeTitle}>Horas Laboratorio</Text>
              </View>
              <View style={styles.timeDivider} />
              <View style={styles.timeCol}>
                <Ionicons name="ribbon-outline" size={18} color="#00E676" />
                <Text style={styles.timeVal}>{selectedSubject.credits} Créditos</Text>
                <Text style={styles.timeTitle}>Peso Académico</Text>
              </View>
            </View>

            {/* Topics covered */}
            <View style={styles.detailSection}>
              <Text style={styles.sectionHeading}>Ejes Temáticos Principales</Text>
              <View style={styles.topicsList}>
                {selectedSubject.topics.map((topic, idx) => (
                  <View key={idx} style={styles.topicItem}>
                    <View style={styles.topicBullet}>
                      <Ionicons name="hardware-chip-outline" size={12} color="#00E5FF" />
                    </View>
                    <Text style={styles.topicText}>{topic}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Prerequisites */}
            <View style={styles.detailSection}>
              <Text style={styles.sectionHeading}>Prerrequisitos Académicos</Text>
              {selectedSubject.prerequisites.length === 0 ? (
                <Text style={styles.noPrereqText}>
                  Esta asignatura no requiere materias previas (sin prerrequisitos).
                </Text>
              ) : (
                <View style={styles.prereqListContainer}>
                  {selectedSubject.prerequisites.map((preCode) => {
                    const prereqSubject = allSubjects.find((s) => s.code === preCode);
                    const isApproved = prereqSubject?.status === 'aprobada';

                    return (
                      <View key={preCode} style={styles.prereqItem}>
                        <Ionicons
                          name={isApproved ? 'checkmark-circle' : 'alert-circle'}
                          size={18}
                          color={isApproved ? '#00E676' : '#FF9100'}
                        />
                        <View style={styles.prereqDetails}>
                          <Text style={styles.prereqName}>
                            {prereqSubject ? prereqSubject.name : preCode}
                          </Text>
                          <Text style={styles.prereqCodeBadge}>
                            Código: {preCode} •{' '}
                            {isApproved ? 'Cumplido' : 'Pendiente por aprobar'}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>

            {/* Schedule & Professor info if in progress */}
            {selectedSubject.status === 'cursando' && selectedSubject.professor && (
              <View style={styles.scheduleInfoBox}>
                <Text style={styles.scheduleBoxTitle}>Información de Cursado Activo</Text>
                <View style={styles.scheduleRow}>
                  <Ionicons name="person-circle-outline" size={16} color="#00E5FF" />
                  <Text style={styles.scheduleText}>Prof: {selectedSubject.professor}</Text>
                </View>
                <View style={styles.scheduleRow}>
                  <Ionicons name="business-outline" size={16} color="#FF9100" />
                  <Text style={styles.scheduleText}>Aula: {selectedSubject.classroom}</Text>
                </View>
                <View style={styles.scheduleRow}>
                  <Ionicons name="time-outline" size={16} color="#00E676" />
                  <Text style={styles.scheduleText}>Horario: {selectedSubject.schedule}</Text>
                </View>
              </View>
            )}
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
    maxHeight: '90%',
    paddingBottom: 24,
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 25,
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
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#00E5FF',
    fontFamily: 'monospace',
  },
  semText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  creditsBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  creditsText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E2E8F0',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 26,
    maxWidth: 270,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
    marginBottom: 18,
  },
  areaBannerText: {
    fontSize: 12,
    fontWeight: '700',
  },
  interactiveBox: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  boxTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  boxSubtitle: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
    marginBottom: 10,
  },
  statusButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statusBtnApprovedActive: {
    backgroundColor: '#00E676',
    borderColor: '#00E676',
  },
  statusBtnCurrentActive: {
    backgroundColor: '#00E5FF',
    borderColor: '#00E5FF',
  },
  statusBtnPendingActive: {
    backgroundColor: '#94A3B8',
    borderColor: '#94A3B8',
  },
  statusBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#CBD5E1',
  },
  statusBtnTextActive: {
    color: '#0A0F1D',
  },
  gradeSection: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  gradeLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 8,
  },
  gradeHighlight: {
    fontWeight: '800',
    color: '#00E676',
  },
  gradePillsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  gradePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  gradePillActive: {
    backgroundColor: 'rgba(0, 230, 118, 0.2)',
    borderColor: '#00E676',
  },
  gradePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  gradePillTextActive: {
    color: '#00E676',
  },
  detailSection: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: '#CBD5E1',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#94A3B8',
  },
  timeDistributionBox: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  timeCol: {
    flex: 1,
    alignItems: 'center',
  },
  timeDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  timeVal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 4,
  },
  timeTitle: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  topicsList: {
    gap: 8,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topicBullet: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicText: {
    fontSize: 12,
    color: '#CBD5E1',
    flex: 1,
  },
  noPrereqText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
  },
  prereqListContainer: {
    gap: 8,
  },
  prereqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  prereqDetails: {
    flex: 1,
  },
  prereqName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  prereqCodeBadge: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  scheduleInfoBox: {
    backgroundColor: 'rgba(0, 229, 255, 0.05)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
    gap: 8,
  },
  scheduleBoxTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#00E5FF',
    marginBottom: 4,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scheduleText: {
    fontSize: 12,
    color: '#CBD5E1',
  },
});
