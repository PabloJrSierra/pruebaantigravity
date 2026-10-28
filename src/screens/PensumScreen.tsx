import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAcademic } from '../context/AcademicContext';
import { SubjectCard } from '../components/SubjectCard';

export function PensumScreen() {
  const {
    semesters,
    activeSemester,
    setActiveSemester,
    searchQuery,
    setSearchQuery,
    selectedArea,
    setSelectedArea,
    selectedStatus,
    setSelectedStatus,
    allSubjects,
  } = useAcademic();

  const currentSemesterData = useMemo(() => {
    return semesters.find((s) => s.number === activeSemester) || semesters[0];
  }, [semesters, activeSemester]);

  // Filter subjects based on search, semester, area and status
  const displayedSubjects = useMemo(() => {
    let list = currentSemesterData.subjects;

    // If searching, search across all semesters
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      list = allSubjects.filter(
        (sub) =>
          sub.name.toLowerCase().includes(q) ||
          sub.code.toLowerCase().includes(q) ||
          sub.area.toLowerCase().includes(q)
      );
    }

    if (selectedArea !== 'todas') {
      list = list.filter((sub) => sub.area === selectedArea);
    }

    if (selectedStatus !== 'todas') {
      list = list.filter((sub) => sub.status === selectedStatus);
    }

    return list;
  }, [currentSemesterData, searchQuery, selectedArea, selectedStatus, allSubjects]);

  // Semester metrics
  const semApprovedCredits = useMemo(() => {
    return currentSemesterData.subjects
      .filter((s) => s.status === 'aprobada')
      .reduce((acc, s) => acc + s.credits, 0);
  }, [currentSemesterData]);

  const areasList: { key: string; label: string; icon?: string }[] = [
    { key: 'todas', label: 'Todas' },
    { key: 'eléctrica', label: '⚡ Eléctrica' },
    { key: 'mecánica', label: '⚙️ Mecánica' },
    { key: 'control', label: '🤖 Control' },
    { key: 'básicas', label: '📐 Básicas' },
    { key: 'económico-administrativa', label: '💼 Gestión' },
    { key: 'complementaria', label: '📘 Complementaria' },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>
      {/* Search Input Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#64748B" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por materia, código (ej. ELE-601)..."
          placeholderTextColor="#64748B"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Horizontal Semesters Carousel */}
      <View style={styles.semestersCarouselContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.semestersCarousel}>
          {semesters.map((sem) => {
            const isActive = sem.number === activeSemester && searchQuery.length === 0;
            const approvedInSem = sem.subjects.filter((s) => s.status === 'aprobada').length;
            const totalInSem = sem.subjects.length;

            return (
              <TouchableOpacity
                key={sem.id}
                style={[
                  styles.semPill,
                  isActive && styles.semPillActive,
                ]}
                onPress={() => {
                  setSearchQuery('');
                  setActiveSemester(sem.number);
                }}
                activeOpacity={0.8}>
                <View style={styles.semPillHeader}>
                  <Text
                    style={[
                      styles.semPillNumber,
                      isActive && styles.semPillNumberActive,
                    ]}>
                    Semestre {sem.number}
                  </Text>
                  {approvedInSem === totalInSem && (
                    <Ionicons name="checkmark-circle" size={12} color="#00E676" />
                  )}
                </View>
                <Text
                  style={[
                    styles.semPillSub,
                    isActive && styles.semPillSubActive,
                  ]}>
                  {approvedInSem}/{totalInSem} mat · {sem.totalCredits} CR
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Knowledge Area Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.areaFiltersRow}>
        {areasList.map((item) => {
          const isSelected = selectedArea === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.areaChip, isSelected && styles.areaChipActive]}
              onPress={() => setSelectedArea(item.key)}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.areaChipText,
                  isSelected && styles.areaChipTextActive,
                ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Semester Hero Banner (if not searching) */}
      {searchQuery.length === 0 ? (
        <View style={styles.semesterHeroCard}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroSemesterTitle}>
                {currentSemesterData.title}
              </Text>
              <Text style={styles.heroSemesterSubtitle}>
                {currentSemesterData.subtitle}
              </Text>
            </View>
            <View style={styles.heroCreditsBadge}>
              <Text style={styles.heroCreditsNum}>
                {semApprovedCredits}/{currentSemesterData.totalCredits}
              </Text>
              <Text style={styles.heroCreditsLabel}>Créditos</Text>
            </View>
          </View>

          {/* Mini progress bar of the semester */}
          <View style={styles.heroProgressBg}>
            <View
              style={[
                styles.heroProgressFill,
                {
                  width: `${Math.round(
                    (semApprovedCredits / currentSemesterData.totalCredits) * 100
                  )}%`,
                },
              ]}
            />
          </View>
        </View>
      ) : (
        <View style={styles.searchNotice}>
          <Ionicons name="filter" size={14} color="#00E5FF" />
          <Text style={styles.searchNoticeText}>
            Mostrando resultados de búsqueda en toda la carrera: ({displayedSubjects.length} materias)
          </Text>
        </View>
      )}

      {/* Status Filter Selector */}
      <View style={styles.statusTabsRow}>
        {[
          { key: 'todas', label: 'Todas' },
          { key: 'aprobada', label: 'Aprobadas' },
          { key: 'cursando', label: 'En Curso' },
          { key: 'pendiente', label: 'Pendientes' },
        ].map((tab) => {
          const isSelected = selectedStatus === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.statusTabBtn, isSelected && styles.statusTabBtnActive]}
              onPress={() => setSelectedStatus(tab.key)}>
              <Text
                style={[
                  styles.statusTabBtnText,
                  isSelected && styles.statusTabBtnTextActive,
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Subjects List */}
      <View style={styles.subjectsContainer}>
        {displayedSubjects.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="folder-open-outline" size={40} color="#64748B" />
            <Text style={styles.emptyTitle}>No se encontraron materias</Text>
            <Text style={styles.emptySubtitle}>
              Prueba cambiando los filtros de área o estado.
            </Text>
          </View>
        ) : (
          displayedSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))
        )}
      </View>

      {/* Bottom Spacer for Floating Bottom Bar */}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 8,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#FFFFFF',
    padding: 0,
  },
  semestersCarouselContainer: {
    marginBottom: 12,
  },
  semestersCarousel: {
    gap: 8,
    paddingRight: 16,
  },
  semPill: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    minWidth: 120,
  },
  semPillActive: {
    backgroundColor: 'rgba(0, 229, 255, 0.12)',
    borderColor: '#00E5FF',
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  semPillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  semPillNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94A3B8',
  },
  semPillNumberActive: {
    color: '#00E5FF',
  },
  semPillSub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 3,
  },
  semPillSubActive: {
    color: '#CBD5E1',
  },
  areaFiltersRow: {
    gap: 6,
    paddingBottom: 14,
  },
  areaChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  areaChipActive: {
    backgroundColor: 'rgba(255, 145, 0, 0.15)',
    borderColor: '#FF9100',
  },
  areaChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  areaChipTextActive: {
    color: '#FF9100',
  },
  semesterHeroCard: {
    backgroundColor: '#131B2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroSemesterTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroSemesterSubtitle: {
    fontSize: 11,
    color: '#00E5FF',
    marginTop: 2,
    maxWidth: 220,
  },
  heroCreditsBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
  },
  heroCreditsNum: {
    fontSize: 14,
    fontWeight: '800',
    color: '#00E5FF',
  },
  heroCreditsLabel: {
    fontSize: 9,
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  heroProgressBg: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  heroProgressFill: {
    height: '100%',
    backgroundColor: '#00E676',
    borderRadius: 3,
  },
  searchNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    padding: 10,
    borderRadius: 10,
    gap: 8,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
  },
  searchNoticeText: {
    fontSize: 12,
    color: '#00E5FF',
    fontWeight: '600',
  },
  statusTabsRow: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 3,
    marginBottom: 16,
  },
  statusTabBtn: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 8,
  },
  statusTabBtnActive: {
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
  },
  statusTabBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  statusTabBtnTextActive: {
    color: '#00E5FF',
    fontWeight: '700',
  },
  subjectsContainer: {
    marginBottom: 10,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#CBD5E1',
    marginTop: 10,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  bottomSpacer: {
    height: 90,
  },
});
