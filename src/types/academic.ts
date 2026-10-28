export type SubjectArea =
  | 'básicas'
  | 'mecánica'
  | 'eléctrica'
  | 'control'
  | 'económico-administrativa'
  | 'complementaria';

export type SubjectStatus = 'aprobada' | 'cursando' | 'pendiente';

export interface Subject {
  id: string;
  code: string;
  name: string;
  semester: number;
  credits: number;
  theoryHours: number;
  practiceHours: number;
  prerequisites: string[];
  area: SubjectArea;
  description: string;
  topics: string[];
  status: SubjectStatus;
  grade?: number;
  classroom?: string;
  professor?: string;
  schedule?: string;
}

export interface Semester {
  id: number;
  number: number;
  title: string;
  subtitle: string;
  totalCredits: number;
  subjects: Subject[];
}

export interface StudentProfile {
  name: string;
  career: string;
  faculty: string;
  studentId: string;
  currentSemester: number;
  avatarUrl?: string;
  gpa: number;
  totalCreditsProgram: number;
}
