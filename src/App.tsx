import React, { useState, useEffect } from 'react';
import { ACCREDITED_UNITS } from './data/curriculumData';
import { KNEC_QUESTIONS, PRACTICE_QUIZ_QUESTIONS } from './data/knecQuestionsData';
import { ACCREDITED_FLASHCARDS } from './data/flashcardsData';
import { SUPPLY_CHAIN_GLOSSARY } from './data/glossaryData';
import { KNECQuestion } from './types/curriculum';

import { Navbar } from './components/Navbar';
import { CurriculumView } from './components/CurriculumView';
import { DeepNotesReader } from './components/DeepNotesReader';
import { KnecExamDrill } from './components/KnecExamDrill';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { FormulaLab } from './components/FormulaLab';
import { FlashcardsView } from './components/FlashcardsView';
import { GlossaryView } from './components/GlossaryView';
import { AiTutorModal } from './components/AiTutorModal';

import {
  BookOpen,
  FileQuestion,
  HelpCircle,
  Calculator,
  Layers,
  Search,
  Sparkles,
  Award,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'curriculum' | 'notes' | 'knec-drill' | 'quiz' | 'formula' | 'flashcards' | 'glossary'
  >('curriculum');

  const [selectedUnitId, setSelectedUnitId] = useState<string>('scm-501');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('scm-501-t1');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAiTutorOpen, setIsAiTutorOpen] = useState<boolean>(false);

  // Persistent completed topics
  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('knec_completed_topics');
      return saved ? JSON.parse(saved) : ['scm-501-t1'];
    } catch {
      return ['scm-501-t1'];
    }
  });

  // Persistent question bank (standard + AI generated)
  const [allQuestions, setAllQuestions] = useState<KNECQuestion[]>(() => {
    try {
      const saved = localStorage.getItem('knec_custom_questions');
      if (saved) {
        const parsed = JSON.parse(saved);
        const validated = parsed.map((q: any) => ({
          ...q,
          difficulty: q.difficulty || (q.section === 'Section B' ? 'Advanced' : 'Intermediate'),
        }));
        return [...KNEC_QUESTIONS, ...validated];
      }
    } catch {
      // fallback
    }
    return KNEC_QUESTIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('knec_completed_topics', JSON.stringify(completedTopics));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [completedTopics]);

  const toggleCompleteTopic = (topicId: string) => {
    setCompletedTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const handleAddCustomQuestions = (newQuestions: KNECQuestion[]) => {
    setAllQuestions((prev) => {
      const combined = [...prev, ...newQuestions];
      try {
        const customOnly = combined.filter((q) => q.id.startsWith('ai-gen-'));
        localStorage.setItem('knec_custom_questions', JSON.stringify(customOnly));
      } catch (e) {
        console.warn(e);
      }
      return combined;
    });
  };

  const totalTopicsCount = ACCREDITED_UNITS.reduce(
    (sum, unit) => sum + unit.subTopics.length,
    0
  );

  const handleOpenNotes = (unitId: string, topicId?: string) => {
    setSelectedUnitId(unitId);
    const targetUnit = ACCREDITED_UNITS.find((u) => u.id === unitId);
    if (targetUnit && targetUnit.subTopics.length > 0) {
      setSelectedTopicId(topicId || targetUnit.subTopics[0].id);
    }
    setActiveTab('notes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDrill = (unitId: string) => {
    setSelectedUnitFilter(unitId);
    setActiveTab('knec-drill');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeUnit = ACCREDITED_UNITS.find((u) => u.id === selectedUnitId) || ACCREDITED_UNITS[0];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAiTutor={() => setIsAiTutorOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        completedNotesCount={completedTopics.length}
        totalNotesCount={totalTopicsCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Results Overlay if query is active */}
        {searchQuery.trim().length > 1 && (
          <div className="mb-8 p-6 rounded-2xl bg-slate-850 border border-amber-500/30 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Search className="w-3.5 h-3.5" />
                Search Results for "{searchQuery}":
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-white"
              >
                Clear Search
              </button>
            </div>

            {/* Matching Topics */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Matching Syllabus Topics:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ACCREDITED_UNITS.flatMap((u) =>
                  u.subTopics
                    .filter(
                      (t) =>
                        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.keyPoints.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                    .map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          handleOpenNotes(u.id, t.id);
                          setSearchQuery('');
                        }}
                        className="text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/30 transition-all text-xs"
                      >
                        <span className="font-bold text-white block mb-0.5">{t.title}</span>
                        <span className="text-[11px] text-amber-400 font-mono block">{u.code}</span>
                      </button>
                    ))
                ).slice(0, 6)}
              </div>
            </div>

            {/* Matching Glossary Terms */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Matching Glossary Acronyms & Terms:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {SUPPLY_CHAIN_GLOSSARY.filter(
                  (g) =>
                    g.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (g.acronym && g.acronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    g.definition.toLowerCase().includes(searchQuery.toLowerCase())
                )
                  .slice(0, 3)
                  .map((term, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                      <div className="font-bold text-white flex items-center justify-between">
                        <span>{term.term}</span>
                        {term.acronym && (
                          <span className="text-amber-400 font-mono text-[10px]">{term.acronym}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{term.definition}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Curriculum Overview */}
        {activeTab === 'curriculum' && (
          <CurriculumView
            units={ACCREDITED_UNITS}
            onSelectUnit={setSelectedUnitId}
            onOpenNotes={handleOpenNotes}
            onOpenDrill={handleOpenDrill}
            completedTopics={completedTopics}
          />
        )}

        {/* Tab 2: Deep Dive Revision Notes */}
        {activeTab === 'notes' && (
          <DeepNotesReader
            units={ACCREDITED_UNITS}
            selectedUnitId={selectedUnitId}
            setSelectedUnitId={setSelectedUnitId}
            selectedTopicId={selectedTopicId}
            setSelectedTopicId={setSelectedTopicId}
            completedTopics={completedTopics}
            toggleCompleteTopic={toggleCompleteTopic}
            onJumpToDrill={handleOpenDrill}
          />
        )}

        {/* Tab 3: KNEC Examination Drill */}
        {activeTab === 'knec-drill' && (
          <KnecExamDrill
            questions={allQuestions}
            units={ACCREDITED_UNITS}
            selectedUnitFilter={selectedUnitFilter}
            setSelectedUnitFilter={setSelectedUnitFilter}
            onAddCustomQuestions={handleAddCustomQuestions}
          />
        )}

        {/* Tab 4: Interactive Quiz Drill */}
        {activeTab === 'quiz' && (
          <InteractiveQuiz
            questions={PRACTICE_QUIZ_QUESTIONS}
            onOpenNotesForUnit={(unitId) => handleOpenNotes(unitId)}
          />
        )}

        {/* Tab 5: Formula Lab */}
        {activeTab === 'formula' && <FormulaLab />}

        {/* Tab 6: Flashcards Spaced Repetition */}
        {activeTab === 'flashcards' && (
          <FlashcardsView cards={ACCREDITED_FLASHCARDS} units={ACCREDITED_UNITS} />
        )}

        {/* Tab 7: Glossary */}
        {activeTab === 'glossary' && <GlossaryView terms={SUPPLY_CHAIN_GLOSSARY} />}
      </main>

      {/* AI Tutor Floating Assistant Modal */}
      <AiTutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        activeUnitTitle={activeUnit.title}
      />

      {/* Bottom Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-slate-200 font-semibold">
                KNEC Level 5 Supply Chain Management Revision Portal
              </p>
              <p className="text-[11px] text-slate-400">
                Accredited Craft Certificate Curriculum • Aligned with TVET CDACC & PPADA 2015
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-slate-400">
            <span>Kenya National Examinations Council (KNEC) Syllabus</span>
            <span>•</span>
            <span>KISM Professional Ethics Standards</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
