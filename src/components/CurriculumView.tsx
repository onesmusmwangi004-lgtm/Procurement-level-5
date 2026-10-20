import React from 'react';
import { UnitOfCompetency } from '../types/curriculum';
import {
  BookOpen,
  Clock,
  Award,
  ArrowRight,
  CheckCircle,
  FileQuestion,
  Sparkles,
  Shield,
  Layers,
} from 'lucide-react';

interface CurriculumViewProps {
  units: UnitOfCompetency[];
  onSelectUnit: (unitId: string) => void;
  onOpenNotes: (unitId: string, topicId?: string) => void;
  onOpenDrill: (unitId: string) => void;
  completedTopics: string[];
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  units,
  onOpenNotes,
  onOpenDrill,
  completedTopics,
}) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner with Kenyan TVET & KNEC Level 5 info */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950/40 border border-slate-800 p-6 md:p-8">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>TVET CDACC & KNEC Level 5 Qualification Framework</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Craft Certificate in Supply Chain Management
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Master the official accredited curriculum for Level 5 Supply Chain Management.
            Deep-dive into comprehensive syllabus revision notes, Kenyan public procurement laws
            (PPADA 2015 & Regs 2020), warehouse operations, inventory mathematical models, and authentic
            KNEC examination questions with official marking schemes.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              7 Core Units of Competency
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              365 Total Nominal Hours
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              PPADA 2015 & KISM Aligned
            </span>
          </div>
        </div>
      </div>

      {/* Curriculum Units Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Units of Competency</h2>
            <p className="text-xs text-slate-400">Click any unit to access detailed revision notes or practice exam questions</p>
          </div>
          <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
            All 7 Units Accredited
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit) => {
            const unitTopicIds = unit.subTopics.map((t) => t.id);
            const unitCompletedCount = unitTopicIds.filter((id) => completedTopics.includes(id)).length;
            const progress = Math.round((unitCompletedCount / unit.subTopics.length) * 100);

            return (
              <div
                key={unit.id}
                className="group relative flex flex-col justify-between rounded-xl bg-slate-850/80 border border-slate-800 hover:border-slate-700 p-5 transition-all hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-400 font-mono">
                      {unit.code}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {unit.nominalHours} hrs
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors mb-2">
                    {unit.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {unit.summary}
                  </p>

                  {/* Learning outcomes preview */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
                      Core Learning Outcomes:
                    </span>
                    {unit.learningOutcomes.slice(0, 3).map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                        <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{outcome}</span>
                      </div>
                    ))}
                    {unit.learningOutcomes.length > 3 && (
                      <span className="text-[11px] text-slate-500 pl-4">
                        +{unit.learningOutcomes.length - 3} more outcomes
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  {/* Progress bar */}
                  <div className="pt-2 mb-4">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>Module Progress</span>
                      <span className="font-semibold text-slate-300">{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => onOpenNotes(unit.id)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Study Notes
                    </button>
                    <button
                      onClick={() => onOpenDrill(unit.id)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                    >
                      <FileQuestion className="w-3.5 h-3.5 text-amber-400" />
                      KNEC Drill
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* KNEC Exam Structure & Guide Box */}
      <div className="rounded-xl bg-slate-850 border border-slate-800 p-6">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          KNEC Level 5 Examination Format & Guidelines
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          The Kenya National Examinations Council (KNEC) administers two main examination papers for the Craft Certificate in Supply Chain Management:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700/60">
            <span className="font-bold text-amber-400 block mb-1">Section A: Short Answer Questions (40 Marks)</span>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>Contains 8 to 10 compulsory questions carrying 3 to 6 marks each.</li>
              <li>Tests precise definitions, lists, distinctions between documents (e.g. GRN vs Delivery Note), and short calculations.</li>
              <li>Examiners reward clear, concise factual points. Avoid lengthy essays here.</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700/60">
            <span className="font-bold text-emerald-400 block mb-1">Section B: Structured & Case Study Questions (60 Marks)</span>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>Contains 4 to 5 in-depth questions carrying 20 marks each; candidates answer 3.</li>
              <li>Features real-world scenarios, legal applications under PPADA 2015, warehouse design, and full EOQ mathematical calculations.</li>
              <li>Always show full formulas, step-by-step substitutions, and distinct numbered points with operational justifications.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
