import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAcademic, AREA_CONFIG } from '../context/AcademicContext';

export function ScheduleScreen() {
  const { inProgressSubjects, setSelectedSubject } = useAcademic();
  const [selectedDay, setSelectedDay] = useState<string>('todos');

  const days = [
    { key: 'todos', label: 'Todos' },
    { key: 'lun', label: 'Lun' },
    { key: 'mar', label: 'Mar' },
    { key: 'mie', label: 'Mié' },
    { key: 'jue', label: 'Jue' },
    { key: 'vie', label: 'Vie' },
    { key: 'sab', label: 'Sáb' },
  ];

  const filteredClasses = inProgressSubjects.filter((sub) => {
    if (selectedDay === 'todos') return true;
    const sched = (sub.schedule || '').toLowerCase();
    switch (selectedDay) {
      case 'lun':
        return sched.includes('lun');
      case 'mar':
        return sched.includes('mar');
      case 'mie':
        return sched.includes('mié') || sched.includes('mie');
      case 'jue':
        return sched.includes('jue');
      case 'vie':
        return sched.includes('vie');
      case 'sab':
        return sched.includes('sáb') || sched.includes('sab');
      default:
        return true;
    }
  });

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>
      {/* Title */}
      <View style={styles.headerBox}>
        <Text style={styles.headerBadge}>SEMESTRE ACTUAL (6°)</Text>
        <Text style={styles.screenTitle}>Horario Semanal</Text>
        <Text style={styles.screenSubtitle}>
          {inProgressSubjects.length} materias inscritas este período académico
        </Text>
      </View>

      {/* Day Selector Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysScroll}>
        {days.map((d) => {
          const isSelected = selectedDay === d.key;
          return (
            <TouchableOpacity
              key={d.key}
              style={[styles.dayChip, isSelected && styles.dayChipActive]}
              onPress={() => setSelectedDay(d.key)}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.dayChipText,
                  isSelected && styles.dayChipTextActive,
                ]}>
                {d.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Classes list */}
      <View style={styles.classesList}>
        {filteredClasses.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="sunny-outline" size={36} color="#64748B" />
            <Text style={styles.emptyTitle}>Sin clases programadas este día</Text>
            <Text style={styles.emptySub}>
              Aprovecha para adelantar laboratorios y proyectos de diseño.
            </Text>
          </View>
        ) : (
          filteredClasses.map((item) => {
            const areaConfig = AREA_CONFIG[item.area];
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.classCard}
                onPress={() => setSelectedSubject(item)}
                activeOpacity={0.8}>
                {/* Left accent bar */}
                <View
                  style={[styles.accentBar, { backgroundColor: areaConfig.color }]}
                />

                <View style={styles.cardContent}>
                  <View style={styles.cardTopRow}>
                    <View
                      style={[
                        styles.areaBadge,
                        { backgroundColor: areaConfig.bg, borderColor: areaConfig.border },
                      ]}>
                      <Text style={[styles.areaBadgeText, { color: areaConfig.color }]}>
                        {areaConfig.label}
                      </Text>
                    </View>
                    <View style={styles.timeBadge}>
                      <Ionicons name="time-outline" size={12} color="#00E5FF" />
                      <Text style={styles.timeText}>{item.schedule || 'Por definir'}</Text>
                    </View>
                  </View>

                  <Text style={styles.subjectName}>{item.name}</Text>

                  <View style={styles.cardMetaRow}>
                    <View style={styles.metaItem}>
                      <Ionicons name="location-outline" size={14} color="#FF9100" />
                      <Text style={styles.metaText}>{item.classroom || 'Aula General'}</Text>
                    </View>

                    <View style={styles.metaItem}>
                      <Ionicons name="person-outline" size={14} color="#94A3B8" />
                      <Text style={styles.metaText}>{item.professor || 'Docente titular'}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
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
  headerBox: {
    marginBottom: 16,
  },
  headerBadge: {
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
  screenSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  daysScroll: {
    gap: 8,
    paddingBottom: 16,
  },
  dayChip: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  dayChipActive: {
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
    borderColor: '#00E5FF',
  },
  dayChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  dayChipTextActive: {
    color: '#00E5FF',
  },
  classesList: {
    gap: 12,
  },
  classCard: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  accentBar: {
    width: 5,
  },
  cardContent: {
    flex: 1,
    padding: 14,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  areaBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  areaBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  timeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#00E5FF',
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 11,
    color: '#CBD5E1',
  },
  emptyCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#CBD5E1',
    marginTop: 10,
  },
  emptySub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 90,
  },
});
