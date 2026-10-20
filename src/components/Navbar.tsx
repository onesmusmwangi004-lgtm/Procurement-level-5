import React from 'react';
import {
  BookOpen,
  FileQuestion,
  HelpCircle,
  Calculator,
  Layers,
  Search,
  Sparkles,
  Award,
  BookMarked,
  CheckCircle2,
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'curriculum' | 'notes' | 'knec-drill' | 'quiz' | 'formula' | 'flashcards' | 'glossary';
  setActiveTab: (tab: 'curriculum' | 'notes' | 'knec-drill' | 'quiz' | 'formula' | 'flashcards' | 'glossary') => void;
  openAiTutor: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  completedNotesCount: number;
  totalNotesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAiTutor,
  searchQuery,
  setSearchQuery,
  completedNotesCount,
  totalNotesCount,
}) => {
  const readinessPercentage = Math.round((completedNotesCount / Math.max(1, totalNotesCount)) * 100);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Accreditation badge */}
          <div
            className="flex items-center gap-3 cursor-pointer shrink-0"
            onClick={() => setActiveTab('curriculum')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <Award className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
                  KNEC Level 5
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  Accredited
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Supply Chain Management Hub</p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search syllabus, PPADA, EOQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* Progress pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Syllabus Covered:</span>
              <span className="font-bold text-amber-400">{readinessPercentage}%</span>
            </div>

            {/* AI Examiner & Tutor Button */}
            <button
              onClick={openAiTutor}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs tracking-wide shadow-md shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>KNEC AI Tutor</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center space-x-1 overflow-x-auto py-2 no-scrollbar border-t border-slate-800/60 text-xs font-medium">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'curriculum'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Curriculum Units
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'notes'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            Accredited Deep Notes
          </button>

          <button
            onClick={() => setActiveTab('knec-drill')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'knec-drill'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileQuestion className="w-3.5 h-3.5" />
            KNEC Exam Drill (Sec A & B)
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'quiz'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Interactive Mock Quiz
          </button>

          <button
            onClick={() => setActiveTab('formula')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'formula'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            Formula Lab (EOQ & Stock)
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'flashcards'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Revision Flashcards
          </button>

          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'glossary'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Kenyan SCM Glossary
          </button>
        </nav>
      </div>
    </header>
  );
};
