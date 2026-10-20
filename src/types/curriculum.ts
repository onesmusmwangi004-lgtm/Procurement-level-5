export interface SubTopic {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  kenyanLegalContext?: string;
  practicalExample?: string;
  examinerTips?: string;
  diagramOrTable?: {
    type: 'table' | 'flowchart' | 'comparison' | 'matrix';
    title: string;
    headers?: string[];
    rows?: string[][];
    steps?: { step: number; label: string; desc: string }[];
  };
}

export interface UnitOfCompetency {
  id: string;
  code: string;
  title: string;
  level: string; // "Level 5"
  accreditation: string; // "KNEC / TVET CDACC Accredited"
  nominalHours: number;
  iconName: string;
  color: string;
  summary: string;
  learningOutcomes: string[];
  subTopics: SubTopic[];
  keyFormulas?: {
    name: string;
    formula: string;
    variables: { symbol: string; meaning: string }[];
    exampleProblem: string;
    solutionSteps: string[];
  }[];
}

export interface KNECQuestion {
  id: string;
  unitId: string;
  unitTitle: string;
  paperCode: string; // e.g. "KNEC/SCM/L5/P1"
  section: 'Section A' | 'Section B';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  yearRef?: string;
  marks: number;
  topic: string;
  questionText: string;
  scenario?: string;
  markingScheme: {
    point: string;
    marksAwarded: number;
    explanation?: string;
  }[];
  examinerGuidance: string;
  commonStudentPitfalls: string[];
  sampleFullMarkResponse?: string;
}

export interface QuizQuestion {
  id: string;
  unitId: string;
  unitTitle?: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  knceFocusNote: string;
}

export interface Flashcard {
  id: string;
  unitId: string;
  front: string;
  back: string;
  category: 'Definition' | 'Acronym' | 'Formula' | 'Legal/Statutory' | 'Procedure';
  keyReference: string;
}

export interface GlossaryTerm {
  term: string;
  acronym?: string;
  definition: string;
  category: string;
  kenyanContext?: string;
}
