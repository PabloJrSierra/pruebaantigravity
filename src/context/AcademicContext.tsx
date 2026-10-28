import React, { createContext, useContext, useState, useMemo } from 'react';
import { initialSemestersData, initialStudentProfile } from '../data/electromecanicaData';
import { Semester, StudentProfile, Subject, SubjectArea, SubjectStatus } from '../types/academic';

export type NavTab = 'pensum' | 'progreso' | 'horario' | 'perfil';

interface AreaStat {
  area: SubjectArea;
  totalSubjects: number;
  approvedSubjects: number;
  totalCredits: number;
  approvedCredits: number;
  color: string;
  icon: string;
  label: string;
}

interface AcademicContextType {
  semesters: Semester[];
  profile: StudentProfile;
  activeSemester: number;
  setActiveSemester: (sem: number) => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  selectedSubject: Subject | null;
  setSelectedSubject: (subject: Subject | null) => void;
  isCalculatorOpen: boolean;
  setIsCalculatorOpen: (open: boolean) => void;
  updateSubjectStatus: (subjectId: string, newStatus: SubjectStatus, newGrade?: number) => void;
  // Computed values
  totalProgramCredits: number;
  approvedCredits: number;
  inProgressCredits: number;
  pendingCredits: number;
  progressPercentage: number;
  approvedCount: number;
  inProgressCount: number;
  pendingCount: number;
  currentGPA: number;
  areaStats: Record<SubjectArea, AreaStat>;
  allSubjects: Subject[];
  inProgressSubjects: Subject[];
}

const AcademicContext = createContext<AcademicContextType | undefined>(undefined);

export const AREA_CONFIG: Record<
  SubjectArea,
  { label: string; color: string; icon: string; bg: string; border: string }
> = {
  eléctrica: {
    label: 'Eléctrica',
    color: '#00E5FF',
    icon: 'flash',
    bg: 'rgba(0, 229, 255, 0.12)',
    border: 'rgba(0, 229, 255, 0.35)',
  },
  mecánica: {
    label: 'Mecánica',
    color: '#FF9100',
    icon: 'cog',
    bg: 'rgba(255, 145, 0, 0.12)',
    border: 'rgba(255, 145, 0, 0.35)',
  },
  control: {
    label: 'Control y Automatización',
    color: '#00E676',
    icon: 'hardware-chip',
    bg: 'rgba(0, 230, 118, 0.12)',
    border: 'rgba(0, 230, 118, 0.35)',
  },
  básicas: {
    label: 'Ciencias Básicas',
    color: '#B388FF',
    icon: 'calculator',
    bg: 'rgba(179, 136, 255, 0.12)',
    border: 'rgba(179, 136, 255, 0.35)',
  },
  'económico-administrativa': {
    label: 'Gestión y Economía',
    color: '#FFD600',
    icon: 'trending-up',
    bg: 'rgba(255, 214, 0, 0.12)',
    border: 'rgba(255, 214, 0, 0.35)',
  },
  complementaria: {
    label: 'Complementaria',
    color: '#90CAF9',
    icon: 'book',
    bg: 'rgba(144, 202, 249, 0.12)',
    border: 'rgba(144, 202, 249, 0.35)',
  },
};

export function AcademicProvider({ children }: { children: React.ReactNode }) {
  const [semesters, setSemesters] = useState<Semester[]>(initialSemestersData);
  const [profile] = useState<StudentProfile>(initialStudentProfile);
  const [activeSemester, setActiveSemester] = useState<number>(6);
  const [activeTab, setActiveTab] = useState<NavTab>('pensum');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('todas');
  const [selectedStatus, setSelectedStatus] = useState<string>('todas');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);

  const allSubjects = useMemo(() => {
    return semesters.flatMap((sem) => sem.subjects);
  }, [semesters]);

  const inProgressSubjects = useMemo(() => {
    return allSubjects.filter((s) => s.status === 'cursando');
  }, [allSubjects]);

  const updateSubjectStatus = (
    subjectId: string,
    newStatus: SubjectStatus,
    newGrade?: number
  ) => {
    setSemesters((prevSemesters) =>
      prevSemesters.map((sem) => ({
        ...sem,
        subjects: sem.subjects.map((sub) => {
          if (sub.id === subjectId) {
            const updated = {
              ...sub,
              status: newStatus,
              grade: newGrade !== undefined ? newGrade : sub.grade,
            };
            // Also update currently selected subject in modal if it's the same
            if (selectedSubject && selectedSubject.id === subjectId) {
              setSelectedSubject(updated);
            }
            return updated;
          }
          return sub;
        }),
      }))
    );
  };

  // Metrics calculation
  const totalProgramCredits = useMemo(() => {
    return allSubjects.reduce((acc, sub) => acc + sub.credits, 0);
  }, [allSubjects]);

  const approvedCredits = useMemo(() => {
    return allSubjects
      .filter((sub) => sub.status === 'aprobada')
      .reduce((acc, sub) => acc + sub.credits, 0);
  }, [allSubjects]);

  const inProgressCredits = useMemo(() => {
    return allSubjects
      .filter((sub) => sub.status === 'cursando')
      .reduce((acc, sub) => acc + sub.credits, 0);
  }, [allSubjects]);

  const pendingCredits = useMemo(() => {
    return allSubjects
      .filter((sub) => sub.status === 'pendiente')
      .reduce((acc, sub) => acc + sub.credits, 0);
  }, [allSubjects]);

  const progressPercentage = useMemo(() => {
    if (totalProgramCredits === 0) return 0;
    return Math.round((approvedCredits / totalProgramCredits) * 100);
  }, [approvedCredits, totalProgramCredits]);

  const approvedCount = useMemo(() => {
    return allSubjects.filter((sub) => sub.status === 'aprobada').length;
  }, [allSubjects]);

  const inProgressCount = useMemo(() => {
    return allSubjects.filter((sub) => sub.status === 'cursando').length;
  }, [allSubjects]);

  const pendingCount = useMemo(() => {
    return allSubjects.filter((sub) => sub.status === 'pendiente').length;
  }, [allSubjects]);

  const currentGPA = useMemo(() => {
    const graded = allSubjects.filter(
      (sub) => sub.status === 'aprobada' && typeof sub.grade === 'number'
    );
    if (graded.length === 0) return 0;
    const weightedSum = graded.reduce(
      (acc, sub) => acc + (sub.grade || 0) * sub.credits,
      0
    );
    const totalCreds = graded.reduce((acc, sub) => acc + sub.credits, 0);
    return totalCreds > 0 ? Number((weightedSum / totalCreds).toFixed(2)) : 0;
  }, [allSubjects]);

  const areaStats = useMemo(() => {
    const areas: SubjectArea[] = [
      'mecánica',
      'eléctrica',
      'control',
      'básicas',
      'económico-administrativa',
      'complementaria',
    ];

    const stats: Record<SubjectArea, AreaStat> = {} as Record<SubjectArea, AreaStat>;

    areas.forEach((area) => {
      const areaSubs = allSubjects.filter((s) => s.area === area);
      const approvedSubs = areaSubs.filter((s) => s.status === 'aprobada');
      const totalCreds = areaSubs.reduce((acc, s) => acc + s.credits, 0);
      const approvedCreds = approvedSubs.reduce((acc, s) => acc + s.credits, 0);

      stats[area] = {
        area,
        totalSubjects: areaSubs.length,
        approvedSubjects: approvedSubs.length,
        totalCredits: totalCreds,
        approvedCredits: approvedCreds,
        color: AREA_CONFIG[area].color,
        icon: AREA_CONFIG[area].icon,
        label: AREA_CONFIG[area].label,
      };
    });

    return stats;
  }, [allSubjects]);

  return (
    <AcademicContext.Provider
      value={{
        semesters,
        profile,
        activeSemester,
        setActiveSemester,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedArea,
        setSelectedArea,
        selectedStatus,
        setSelectedStatus,
        isDrawerOpen,
        setIsDrawerOpen,
        selectedSubject,
        setSelectedSubject,
        isCalculatorOpen,
        setIsCalculatorOpen,
        updateSubjectStatus,
        totalProgramCredits,
        approvedCredits,
        inProgressCredits,
        pendingCredits,
        progressPercentage,
        approvedCount,
        inProgressCount,
        pendingCount,
        currentGPA,
        areaStats,
        allSubjects,
        inProgressSubjects,
      }}>
      {children}
    </AcademicContext.Provider>
  );
}

export function useAcademic() {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error('useAcademic must be used within an AcademicProvider');
  }
  return context;
}
