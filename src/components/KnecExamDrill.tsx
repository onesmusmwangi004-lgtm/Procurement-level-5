import React, { useState } from 'react';
import { KNECQuestion, UnitOfCompetency } from '../types/curriculum';
import {
  FileQuestion,
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles,
  HelpCircle,
  Award,
  AlertTriangle,
  Send,
  Loader2,
  PlusCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface KnecExamDrillProps {
  questions: KNECQuestion[];
  units: UnitOfCompetency[];
  selectedUnitFilter: string;
  setSelectedUnitFilter: (id: string) => void;
  onAddCustomQuestions: (newQuestions: KNECQuestion[]) => void;
}

export const KnecExamDrill: React.FC<KnecExamDrillProps> = ({
  questions,
  units,
  selectedUnitFilter,
  setSelectedUnitFilter,
  onAddCustomQuestions,
}) => {
  const [sectionFilter, setSectionFilter] = useState<'all' | 'Section A' | 'Section B'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');
  const [searchWord, setSearchWord] = useState('');
  const [revealedSchemes, setRevealedSchemes] = useState<Record<string, boolean>>({});

  // Student answer state per question
  const [studentAnswers, setStudentAnswers] = useState<Record<string, string>>({});
  const [gradingState, setGradingState] = useState<
    Record<
      string,
      {
        isLoading: boolean;
        result?: {
          awardedMarks: number;
          maxMarks: number;
          feedback: string;
          strengths: string[];
          improvements: string[];
          modelAnswerKeyPoints?: string[];
        };
        error?: string;
      }
    >
  >({});

  // Dynamic question generation modal/drawer
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateTopic, setGenerateTopic] = useState('');
  const [generateSection, setGenerateSection] = useState<'Section A' | 'Section B'>('Section A');
  const [generateDifficulty, setGenerateDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [generationSuccess, setGenerationSuccess] = useState<string | null>(null);

  const toggleRevealScheme = (qId: string) => {
    setRevealedSchemes((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleGradeAnswer = async (question: KNECQuestion) => {
    const studentText = studentAnswers[question.id];
    if (!studentText || studentText.trim().length === 0) {
      alert('Please write your answer in the box before submitting for AI marking.');
      return;
    }

    setGradingState((prev) => ({
      ...prev,
      [question.id]: { isLoading: true },
    }));

    try {
      const res = await fetch('/api/gemini/grade-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.questionText,
          maxMarks: question.marks,
          studentAnswer: studentText,
          markingScheme: question.markingScheme.map((m) => m.point),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to connect to AI Examiner marking service.');
      }

      const data = await res.json();
      setGradingState((prev) => ({
        ...prev,
        [question.id]: {
          isLoading: false,
          result: data,
        },
      }));
    } catch (err: any) {
      console.error(err);
      setGradingState((prev) => ({
        ...prev,
        [question.id]: {
          isLoading: false,
          error: err.message || 'Marking error. Please try again.',
        },
      }));
    }
  };

  const handleGenerateNewQuestions = async () => {
    setIsGenerating(true);
    setGenerationSuccess(null);
    try {
      const targetUnit = units.find((u) => u.id === selectedUnitFilter) || units[0];
      const res = await fetch('/api/gemini/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitTitle: targetUnit.title,
          topic: generateTopic || targetUnit.subTopics[0]?.title || 'Core Syllabus',
          questionType: generateSection,
          difficulty: generateDifficulty,
          count: 2,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate KNEC questions.');
      }

      const data = await res.json();
      if (data.questions && Array.isArray(data.questions)) {
        const mappedQuestions: KNECQuestion[] = data.questions.map((q: any, idx: number) => ({
          id: `ai-gen-${Date.now()}-${idx}`,
          unitId: targetUnit.id,
          unitTitle: targetUnit.title,
          paperCode: 'KNEC/SCM/L5/AI-SET',
          section: (q.type as 'Section A' | 'Section B') || generateSection,
          difficulty: (q.difficulty as 'Beginner' | 'Intermediate' | 'Advanced') || generateDifficulty,
          yearRef: 'AI Generated KNEC Mock',
          marks: q.marks || (generateSection === 'Section A' ? 4 : 20),
          topic: generateTopic || 'Supply Chain Management',
          questionText: q.question,
          markingScheme: Array.isArray(q.markingScheme)
            ? q.markingScheme.map((item: string) => ({
                point: item,
                marksAwarded: 1,
              }))
            : [{ point: 'Accurate technical answer required', marksAwarded: 1 }],
          examinerGuidance: q.examinerTip || 'Award full marks for clear procedural steps and definitions.',
          commonStudentPitfalls: ['Superficial explanations', 'Missing operational context'],
        }));

        onAddCustomQuestions(mappedQuestions);
        setGenerationSuccess(`Successfully generated and added ${mappedQuestions.length} new KNEC questions!`);
      }
    } catch (err: any) {
      console.error(err);
      alert('Error generating questions: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const matchesUnit = selectedUnitFilter === 'all' || q.unitId === selectedUnitFilter;
    const matchesSection = sectionFilter === 'all' || q.section === sectionFilter;
    const matchesDifficulty = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
    const matchesSearch =
      searchWord.trim() === '' ||
      q.questionText.toLowerCase().includes(searchWord.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchWord.toLowerCase()) ||
      (q.scenario && q.scenario.toLowerCase().includes(searchWord.toLowerCase()));

    return matchesUnit && matchesSection && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner & Question Generator Trigger */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-amber-950/30 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              KNEC Question Bank
            </span>
            <span className="text-xs text-slate-400">Section A & Section B Exam Series</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">KNEC Examination Drill & Testing Center</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Test your competence with authentic past-paper style questions. Practice written answers and get them graded
            instantly by our AI Examiner against official KNEC marking schemes!
          </p>
        </div>

        {/* Generate More Questions Box */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 shrink-0 space-y-2 text-xs">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Set New KNEC Exam Questions:
          </span>
          <div className="flex flex-wrap gap-2">
            <select
              value={generateSection}
              onChange={(e) => setGenerateSection(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs"
            >
              <option value="Section A">Section A (Short)</option>
              <option value="Section B">Section B (20 Marks)</option>
            </select>
            <select
              value={generateDifficulty}
              onChange={(e) => setGenerateDifficulty(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <button
              onClick={handleGenerateNewQuestions}
              disabled={isGenerating}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded flex items-center gap-1 transition-colors disabled:opacity-60"
            >
              {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <PlusCircle className="w-3.5 h-3.5" />}
              Generate
            </button>
          </div>
          {generationSuccess && <span className="text-[11px] text-emerald-400 block">{generationSuccess}</span>}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Unit Filter */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-400">Unit:</span>
          <select
            value={selectedUnitFilter}
            onChange={(e) => setSelectedUnitFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-medium focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Units ({questions.length})</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.code}: {u.title}
              </option>
            ))}
          </select>
        </div>

        {/* Section Filter */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setSectionFilter('all')}
            className={`px-3 py-1 rounded-md transition-colors ${
              sectionFilter === 'all' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Sections
          </button>
          <button
            onClick={() => setSectionFilter('Section A')}
            className={`px-3 py-1 rounded-md transition-colors ${
              sectionFilter === 'Section A'
                ? 'bg-amber-500/20 text-amber-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Section A (Short)
          </button>
          <button
            onClick={() => setSectionFilter('Section B')}
            className={`px-3 py-1 rounded-md transition-colors ${
              sectionFilter === 'Section B'
                ? 'bg-amber-500/20 text-amber-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Section B (Long)
          </button>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setDifficultyFilter('all')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              difficultyFilter === 'all' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Difficulties
          </button>
          <button
            onClick={() => setDifficultyFilter('Beginner')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
              difficultyFilter === 'Beginner'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Beginner
          </button>
          <button
            onClick={() => setDifficultyFilter('Intermediate')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
              difficultyFilter === 'Intermediate'
                ? 'bg-amber-500/20 text-amber-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Intermediate
          </button>
          <button
            onClick={() => setDifficultyFilter('Advanced')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
              difficultyFilter === 'Advanced'
                ? 'bg-rose-500/20 text-rose-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Advanced
          </button>
        </div>

        {/* Keyword Search */}
        <div className="w-full sm:w-56">
          <input
            type="text"
            placeholder="Search questions (e.g. EOQ, PPADA)..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-850 border border-slate-800 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No questions found matching your filter</h3>
            <p className="text-xs text-slate-400">
              Try changing the unit, section, or difficulty filter, or generate new questions using the AI button above.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q, index) => {
            const isSchemeRevealed = !!revealedSchemes[q.id];
            const currentGrading = gradingState[q.id];
            const isSectionA = q.section === 'Section A';

            return (
              <div
                key={q.id}
                className="rounded-2xl bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all p-6 space-y-4 shadow-sm"
              >
                {/* Question Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 font-bold text-xs flex items-center justify-center font-mono">
                      Q{index + 1}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isSectionA
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                      }`}
                    >
                      {q.section}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        q.difficulty === 'Beginner'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : q.difficulty === 'Intermediate'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{q.unitTitle}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{q.paperCode}</span>
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 font-mono">
                      [{q.marks} Marks]
                    </span>
                  </div>
                </div>

                {/* Scenario (if available) */}
                {q.scenario && (
                  <div className="p-4 rounded-xl bg-slate-900/90 border-l-4 border-amber-500 text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    <strong className="text-amber-400 not-italic block mb-1">Examination Scenario / Case:</strong>
                    {q.scenario}
                  </div>
                )}

                {/* Question Text */}
                <div className="text-sm sm:text-base font-semibold text-white leading-relaxed whitespace-pre-line">
                  {q.questionText}
                </div>

                {/* Student Answer Writing Area */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <span>Your Examination Answer:</span>
                      <span className="text-slate-500 text-[11px]">(Draft your points to test recall)</span>
                    </label>
                    {studentAnswers[q.id]?.length > 0 && (
                      <span className="text-slate-500 text-[11px]">
                        {studentAnswers[q.id].split(/\s+/).filter(Boolean).length} words
                      </span>
                    )}
                  </div>

                  <textarea
                    rows={isSectionA ? 4 : 7}
                    value={studentAnswers[q.id] || ''}
                    onChange={(e) =>
                      setStudentAnswers((prev) => ({
                        ...prev,
                        [q.id]: e.target.value,
                      }))
                    }
                    placeholder={
                      isSectionA
                        ? 'Type your concise points here (e.g. 1. Point one... 2. Point two...)'
                        : 'Structure your detailed answer with definitions, operational procedures, Kenyan legal citations, and practical examples...'
                    }
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors font-mono"
                  />

                  {/* Actions: AI Marking & Official Scheme */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={() => handleGradeAnswer(q)}
                      disabled={currentGrading?.isLoading}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-900/20 active:scale-95 disabled:opacity-50 transition-all"
                    >
                      {currentGrading?.isLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>KNEC Examiner Marking...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Grade My Answer with AI Examiner</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => toggleRevealScheme(q.id)}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                      {isSchemeRevealed ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{isSchemeRevealed ? 'Hide Marking Scheme' : 'Reveal KNEC Marking Scheme'}</span>
                    </button>
                  </div>
                </div>

                {/* AI Examiner Grading Result */}
                {currentGrading?.result && (
                  <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/40 space-y-3 mt-4 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                        <Award className="w-4 h-4" />
                        KNEC Examiner Evaluation Report
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Score Awarded:</span>
                        <span className="text-base font-extrabold text-amber-400 font-mono">
                          {currentGrading.result.awardedMarks} / {currentGrading.result.maxMarks} Marks
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                      {currentGrading.result.feedback}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      {currentGrading.result.strengths.length > 0 && (
                        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40">
                          <span className="font-bold text-emerald-400 block mb-1">Key Strengths Identified:</span>
                          <ul className="list-disc list-inside space-y-1 text-slate-300">
                            {currentGrading.result.strengths.map((str, sIdx) => (
                              <li key={sIdx}>{str}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {currentGrading.result.improvements.length > 0 && (
                        <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40">
                          <span className="font-bold text-amber-400 block mb-1">Areas to Boost Marks:</span>
                          <ul className="list-disc list-inside space-y-1 text-slate-300">
                            {currentGrading.result.improvements.map((imp, iIdx) => (
                              <li key={iIdx}>{imp}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Official KNEC Marking Scheme Drawer */}
                {isSchemeRevealed && (
                  <div className="p-5 rounded-xl bg-slate-900 border border-amber-500/30 space-y-4 mt-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-bold text-amber-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        Official KNEC Marking Scheme & Point Allocation:
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Total: {q.marks} Marks</span>
                    </div>

                    <div className="space-y-2">
                      {q.markingScheme.map((item, mIdx) => (
                        <div key={mIdx} className="flex items-start justify-between gap-3 text-xs text-slate-200 p-2 rounded bg-slate-850 border border-slate-800">
                          <div className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {mIdx + 1}
                            </span>
                            <span className="leading-relaxed">{item.point}</span>
                          </div>
                          <span className="text-amber-400 font-bold shrink-0 font-mono bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                            +{item.marksAwarded} mk
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Examiner Guidance */}
                    <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-700/30 text-xs text-amber-200/90 leading-relaxed">
                      <strong className="text-amber-400 block mb-0.5">KNEC Examiner Scoring Advice:</strong>
                      {q.examinerGuidance}
                    </div>

                    {/* Common Student Pitfalls */}
                    {q.commonStudentPitfalls && q.commonStudentPitfalls.length > 0 && (
                      <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-800/40 text-xs text-rose-200/90 leading-relaxed">
                        <strong className="text-rose-400 flex items-center gap-1 mb-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Common Candidate Pitfalls (What Causes Mark Loss):
                        </strong>
                        <ul className="list-disc list-inside space-y-0.5">
                          {q.commonStudentPitfalls.map((pitfall, pIdx) => (
                            <li key={pIdx}>{pitfall}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Sample Full Mark Response */}
                    {q.sampleFullMarkResponse && (
                      <div className="p-3 rounded-lg bg-slate-850 border border-slate-700 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-line">
                        <strong className="text-emerald-400 font-sans block mb-1">Sample Distinction-Grade Model Answer:</strong>
                        {q.sampleFullMarkResponse}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
