import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Subject } from '../types/academic';
import { useAcademic, AREA_CONFIG } from '../context/AcademicContext';

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const { setSelectedSubject } = useAcademic();
  const areaConfig = AREA_CONFIG[subject.area];

  const getStatusBadge = () => {
    switch (subject.status) {
      case 'aprobada':
        return (
          <View style={[styles.statusBadge, styles.statusApproved]}>
            <Ionicons name="checkmark-circle" size={14} color="#00E676" />
            <Text style={[styles.statusText, { color: '#00E676' }]}>
              Aprobada {subject.grade ? `(${subject.grade.toFixed(1)})` : ''}
            </Text>
          </View>
        );
      case 'cursando':
        return (
          <View style={[styles.statusBadge, styles.statusCurrent]}>
            <View style={styles.pulseDot} />
            <Text style={[styles.statusText, { color: '#00E5FF' }]}>En Curso</Text>
          </View>
        );
      case 'pendiente':
      default:
        return (
          <View style={[styles.statusBadge, styles.statusPending]}>
            <Ionicons name="ellipse-outline" size={12} color="#94A3B8" />
            <Text style={[styles.statusText, { color: '#94A3B8' }]}>Pendiente</Text>
          </View>
        );
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedSubject(subject)}
      activeOpacity={0.8}
      accessibilityLabel={`Materia ${subject.name}`}>
      {/* Top Meta Row */}
      <View style={styles.topRow}>
        <View style={styles.codeCreditsRow}>
          <Text style={styles.codeText}>{subject.code}</Text>
          <View style={styles.creditsBadge}>
            <Text style={styles.creditsText}>{subject.credits} CR</Text>
          </View>
        </View>

        <View
          style={[
            styles.areaBadge,
            { backgroundColor: areaConfig.bg, borderColor: areaConfig.border },
          ]}>
          <Text style={[styles.areaText, { color: areaConfig.color }]}>
            {areaConfig.label}
          </Text>
        </View>
      </View>

      {/* Subject Name */}
      <Text style={styles.subjectName}>{subject.name}</Text>

      {/* Bottom Info & Status Row */}
      <View style={styles.bottomRow}>
        <View style={styles.hoursRow}>
          <Ionicons name="time-outline" size={12} color="#64748B" />
          <Text style={styles.hoursText}>
            {subject.theoryHours}h Teoría · {subject.practiceHours}h Práctica
          </Text>
        </View>

        {getStatusBadge()}
      </View>

      {/* Prerequisites hint if any */}
      {subject.prerequisites.length > 0 && (
        <View style={styles.prereqRow}>
          <Text style={styles.prereqLabel}>Prerrequisito: </Text>
          <Text style={styles.prereqList} numberOfLines={1}>
            {subject.prerequisites.join(', ')}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  codeCreditsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  codeText: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#94A3B8',
  },
  creditsBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  creditsText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#E2E8F0',
  },
  areaBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  areaText: {
    fontSize: 10,
    fontWeight: '700',
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
    lineHeight: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hoursText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 5,
  },
  statusApproved: {
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.3)',
  },
  statusCurrent: {
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.4)',
  },
  statusPending: {
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00E5FF',
  },
  prereqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  prereqLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  prereqList: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
    flex: 1,
  },
});
