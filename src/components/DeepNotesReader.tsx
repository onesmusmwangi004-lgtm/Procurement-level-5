import React, { useState } from 'react';
import { UnitOfCompetency, SubTopic } from '../types/curriculum';
import {
  BookOpen,
  ChevronRight,
  Sparkles,
  CheckCircle,
  Shield,
  Lightbulb,
  Building,
  HelpCircle,
  FileQuestion,
  Printer,
  Loader2,
  AlertCircle,
  Scale,
  RefreshCw,
} from 'lucide-react';

interface DeepNotesReaderProps {
  units: UnitOfCompetency[];
  selectedUnitId: string;
  setSelectedUnitId: (id: string) => void;
  selectedTopicId?: string;
  setSelectedTopicId: (id: string) => void;
  completedTopics: string[];
  toggleCompleteTopic: (topicId: string) => void;
  onJumpToDrill: (unitId: string) => void;
}

export const DeepNotesReader: React.FC<DeepNotesReaderProps> = ({
  units,
  selectedUnitId,
  setSelectedUnitId,
  selectedTopicId,
  setSelectedTopicId,
  completedTopics,
  toggleCompleteTopic,
  onJumpToDrill,
}) => {
  const currentUnit = units.find((u) => u.id === selectedUnitId) || units[0];
  const activeTopic =
    currentUnit.subTopics.find((t) => t.id === selectedTopicId) || currentUnit.subTopics[0];

  // AI Deep Dive state
  const [aiExpandedContent, setAiExpandedContent] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [customQuery, setCustomQuery] = useState('');
  const [aiError, setAiError] = useState<string | null>(null);

  const handleAiDeepDive = async (queryText?: string) => {
    setIsGeneratingAi(true);
    setAiError(null);
    try {
      const res = await fetch('/api/gemini/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: activeTopic.title,
          unitTitle: currentUnit.title,
          specificQuery: queryText || customQuery,
        }),
      });

      if (!res.ok) {
        throw new Error('Could not generate AI deep dive explanation.');
      }

      const data = await res.json();
      setAiExpandedContent(data.content);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Failed to generate AI deep dive. Please try again.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isCompleted = completedTopics.includes(activeTopic.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 print:block print:w-full print:p-0">
      {/* Left Sidebar: Unit Selector & Topic Navigation */}
      <div className="lg:col-span-4 space-y-4 print:hidden">
        {/* Unit Selector Dropdown */}
        <div className="rounded-xl bg-slate-850 border border-slate-800 p-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Select Curriculum Unit:
          </label>
          <select
            value={selectedUnitId}
            onChange={(e) => {
              setSelectedUnitId(e.target.value);
              const target = units.find((u) => u.id === e.target.value);
              if (target && target.subTopics.length > 0) {
                setSelectedTopicId(target.subTopics[0].id);
              }
              setAiExpandedContent(null);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-200 font-medium focus:outline-none focus:border-amber-500"
          >
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.code}: {unit.title}
              </option>
            ))}
          </select>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>{currentUnit.level}</span>
            <span className="text-amber-400 font-semibold">{currentUnit.nominalHours} Hours</span>
          </div>
        </div>

        {/* Topic Modules List */}
        <div className="rounded-xl bg-slate-850 border border-slate-800 p-4 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Module Topics ({currentUnit.subTopics.length}):
          </span>

          {currentUnit.subTopics.map((topic, index) => {
            const topicCompleted = completedTopics.includes(topic.id);
            const isSelected = topic.id === activeTopic.id;

            return (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  setAiExpandedContent(null);
                }}
                className={`w-full text-left p-3 rounded-lg text-xs transition-all flex items-start gap-2.5 ${
                  isSelected
                    ? 'bg-amber-500/10 text-white border border-amber-500/40 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {topicCompleted ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-600 text-[10px] flex items-center justify-center font-mono text-slate-400">
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold line-clamp-1">{topic.title}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{topic.summary}</div>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 mt-1 ${isSelected ? 'text-amber-400' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Unit Formulas preview if applicable */}
        {currentUnit.keyFormulas && currentUnit.keyFormulas.length > 0 && (
          <div className="rounded-xl bg-slate-850 border border-slate-800 p-4 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              Key Mathematical Formulas
            </span>
            <div className="space-y-2">
              {currentUnit.keyFormulas.map((f, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono">
                  <span className="text-slate-400 block text-[10px] font-sans">{f.name}:</span>
                  <span className="text-emerald-400 font-bold">{f.formula}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shortcut to practice KNEC questions */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-850 to-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-white block">Ready to test your knowledge?</span>
          <p className="text-xs text-slate-400">Practice authentic KNEC Level 5 exam questions for {currentUnit.code}.</p>
          <button
            onClick={() => onJumpToDrill(currentUnit.id)}
            className="w-full mt-2 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <FileQuestion className="w-3.5 h-3.5" />
            Go to {currentUnit.code} Exam Drill
          </button>
        </div>
      </div>

      {/* Main Content Area: Deep Dive Notes */}
      <div className="lg:col-span-8 space-y-6 print:w-full print:block print:space-y-4">
        {/* Print-Only Official Revision Sheet Letterhead */}
        <div className="hidden print:block border-b-2 border-slate-900 pb-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-slate-950 uppercase tracking-tight">
                KNEC Craft Certificate in Supply Chain Management (Level 5)
              </h1>
              <p className="text-xs font-semibold text-slate-700">
                TVET CDACC Accredited Revision Notes • Aligned with PPADA 2015 & KISM Standards
              </p>
            </div>
            <div className="text-right text-xs text-slate-600 font-mono">
              <span className="font-bold">{currentUnit.code}</span>
              <span className="block text-[10px]">Official Revision Sheet</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-300 flex items-center justify-between text-xs text-slate-800">
            <span><strong>Unit of Competency:</strong> {currentUnit.title} ({currentUnit.nominalHours} Hours)</span>
            <span><strong>Topic:</strong> {activeTopic.title}</span>
          </div>
        </div>

        {/* Note Header & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-850 border border-slate-800 print:border-slate-300 print:bg-white print:p-4 print-clean">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono border border-slate-700 print:border-slate-400 print:text-slate-900 print:bg-slate-100">
                {currentUnit.code}
              </span>
              <span className="text-xs text-slate-400 print:text-slate-600">{currentUnit.title}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white print:text-slate-950 tracking-tight">{activeTopic.title}</h1>
          </div>

          <div className="flex items-center gap-2 shrink-0 print:hidden">
            {/* Mark as Completed */}
            <button
              onClick={() => toggleCompleteTopic(activeTopic.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isCompleted
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
              }`}
            >
              <CheckCircle className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
              {isCompleted ? 'Completed' : 'Mark as Read'}
            </button>

            {/* Print to PDF Button */}
            <button
              onClick={handlePrint}
              title="Print or Save Revision Sheet as PDF"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Print to PDF</span>
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-sm leading-relaxed print-clean">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1 print:text-slate-900">
            Executive Topic Overview:
          </span>
          {activeTopic.summary}
        </div>

        {/* Key Revision Points */}
        <div className="p-6 rounded-2xl bg-slate-850 border border-slate-800 space-y-4 print-clean">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 print:border-slate-300">
            <BookOpen className="w-4 h-4 text-amber-400 print:text-slate-900" />
            <h2 className="text-base font-bold text-white print:text-slate-950 tracking-tight">Accredited Core Notes & Key Concepts</h2>
          </div>

          <div className="space-y-3">
            {activeTopic.keyPoints.map((point, idx) => {
              const colonIndex = point.indexOf(':');
              const hasTitle = colonIndex > 0 && colonIndex < 40;
              const titlePart = hasTitle ? point.slice(0, colonIndex) : null;
              const contentPart = hasTitle ? point.slice(colonIndex + 1) : point;

              return (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-300 print:text-slate-800 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 print:bg-slate-900 mt-2 shrink-0" />
                  <div>
                    {titlePart ? (
                      <>
                        <strong className="text-white print:text-slate-950 font-semibold">{titlePart}:</strong>
                        <span>{contentPart}</span>
                      </>
                    ) : (
                      <span>{point}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Diagram or Table (if available) */}
        {activeTopic.diagramOrTable && (
          <div className="p-6 rounded-2xl bg-slate-850 border border-slate-800 space-y-4 print-clean">
            <h3 className="text-sm font-bold text-white print:text-slate-950 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 print:bg-slate-900" />
              {activeTopic.diagramOrTable.title}
            </h3>

            {activeTopic.diagramOrTable.type === 'flowchart' && activeTopic.diagramOrTable.steps && (
              <div className="space-y-2">
                {activeTopic.diagramOrTable.steps.map((s) => (
                  <div key={s.step} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 print:border-slate-300 print:bg-slate-50">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 print:bg-slate-200 print:text-slate-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {s.step}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white print:text-slate-950 block">{s.label}</span>
                      <span className="text-xs text-slate-400 print:text-slate-700">{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(activeTopic.diagramOrTable.type === 'table' || activeTopic.diagramOrTable.type === 'matrix') && (
              <div className="overflow-x-auto rounded-lg border border-slate-800 print:border-slate-300">
                <table className="w-full text-left text-xs text-slate-300 print:text-slate-800">
                  <thead className="bg-slate-800 text-slate-200 uppercase tracking-wider font-semibold border-b border-slate-700 print:bg-slate-100 print:text-slate-900">
                    <tr>
                      {activeTopic.diagramOrTable.headers?.map((header, hIdx) => (
                        <th key={hIdx} className="py-2.5 px-3">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60 print:divide-slate-200 print:bg-white">
                    {activeTopic.diagramOrTable.rows?.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/40">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className={`py-2.5 px-3 ${cIdx === 0 ? 'font-semibold text-white print:text-slate-950' : ''}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Kenyan Legal & Statutory Callout Banner */}
        {activeTopic.kenyanLegalContext && (
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-700/40 space-y-2 print-clean">
            <div className="flex items-center gap-2 text-emerald-400 print:text-slate-900 font-bold text-xs uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              <span>Kenyan Legal Framework & PPADA 2015 Citation</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/90 print:text-slate-800 leading-relaxed">
              {activeTopic.kenyanLegalContext}
            </p>
          </div>
        )}

        {/* Practical Kenyan Industry Case Example */}
        {activeTopic.practicalExample && (
          <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 space-y-2 print-clean">
            <div className="flex items-center gap-2 text-cyan-400 print:text-slate-900 font-bold text-xs uppercase tracking-wider">
              <Building className="w-4 h-4" />
              <span>Practical Kenyan Industry Case Study</span>
            </div>
            <p className="text-xs sm:text-sm text-cyan-200/90 print:text-slate-800 leading-relaxed">
              {activeTopic.practicalExample}
            </p>
          </div>
        )}

        {/* Examiner Tips & Pitfall Warnings */}
        {activeTopic.examinerTips && (
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-600/40 space-y-2 print-clean">
            <div className="flex items-center gap-2 text-amber-400 print:text-slate-900 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>KNEC Examiner Passing Advice & Scoring Rubric</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-200/90 print:text-slate-800 leading-relaxed font-medium">
              {activeTopic.examinerTips}
            </p>
          </div>
        )}

        {/* Interactive AI Deep-Dive Explorer Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-amber-950/30 border border-amber-500/30 space-y-4 print:hidden">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-base text-white">AI Deep-Dive & Syllabus Expander</h3>
              </div>
              <p className="text-xs text-slate-300">
                Need extra depth? Have our AI Level 5 Examiner expand this concept with advanced operational
                case studies, calculations, and KNEC scoring models.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder={`Ask a specific question on ${activeTopic.title}...`}
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={() => handleAiDeepDive()}
              disabled={isGeneratingAi}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-60 transition-all shrink-0"
            >
              {isGeneratingAi ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Deep Dive This Topic</span>
                </>
              )}
            </button>
          </div>

          {aiError && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{aiError}</span>
            </div>
          )}

          {/* AI Generated Content Container */}
          {aiExpandedContent && (
            <div className="p-5 rounded-xl bg-slate-900 border border-amber-500/20 text-xs sm:text-sm text-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  KNEC Examiner Detailed Deep-Dive:
                </span>
                <button
                  onClick={() => handleAiDeepDive()}
                  className="text-slate-400 hover:text-amber-400 text-[11px] flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Regenerate
                </button>
              </div>

              <div className="prose prose-invert prose-xs max-w-none space-y-3 leading-relaxed whitespace-pre-line font-sans">
                {aiExpandedContent}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
