import React, { useState } from 'react';
import { Flashcard, UnitOfCompetency } from '../types/curriculum';
import {
  Layers,
  RotateCw,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Lightbulb,
} from 'lucide-react';

interface FlashcardsViewProps {
  cards: Flashcard[];
  units: UnitOfCompetency[];
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ cards, units }) => {
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [needsReviewIds, setNeedsReviewIds] = useState<string[]>([]);

  const filteredCards = cards.filter((c) => {
    const matchesUnit = selectedUnit === 'all' || c.unitId === selectedUnit;
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    return matchesUnit && matchesCat;
  });

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1 < filteredCards.length ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredCards.length - 1));
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * filteredCards.length));
  };

  const markMastered = (id: string) => {
    setMasteredIds((prev) => Array.from(new Set([...prev, id])));
    setNeedsReviewIds((prev) => prev.filter((item) => item !== id));
    handleNext();
  };

  const markNeedsReview = (id: string) => {
    setNeedsReviewIds((prev) => Array.from(new Set([...prev, id])));
    setMasteredIds((prev) => prev.filter((item) => item !== id));
    handleNext();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-850 border border-slate-800 text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block">
          Spaced Repetition System
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Accredited Revision Flashcards</h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Rapid-fire review of Kenyan PPADA statutes, Incoterms, warehouse documents, and Level 5 formulas.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-850 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Unit:</span>
          <select
            value={selectedUnit}
            onChange={(e) => {
              setSelectedUnit(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200"
          >
            <option value="all">All Units ({cards.length})</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.code}: {u.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200"
          >
            <option value="all">All Categories</option>
            <option value="Definition">Definitions</option>
            <option value="Legal/Statutory">Legal & PPADA 2015</option>
            <option value="Procedure">Procedures</option>
            <option value="Formula">Formulas</option>
            <option value="Acronym">Acronyms</option>
          </select>
        </div>

        <button
          onClick={handleShuffle}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 font-medium"
        >
          <Shuffle className="w-3.5 h-3.5 text-amber-400" />
          <span>Shuffle</span>
        </button>
      </div>

      {/* Flashcard Area */}
      {filteredCards.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-850 border border-slate-800 text-slate-400 text-xs">
          No flashcards found for this filter.
        </div>
      ) : (
        <div className="space-y-4">
          {/* Card counter */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Card <strong className="text-white">{currentIndex + 1}</strong> of{' '}
              <strong className="text-white">{filteredCards.length}</strong>
            </span>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-semibold">Mastered: {masteredIds.length}</span>
              <span className="text-amber-400 font-semibold">Review: {needsReviewIds.length}</span>
            </div>
          </div>

          {/* Flashcard Box */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[280px] p-8 rounded-2xl bg-gradient-to-br from-slate-850 to-slate-900 border-2 border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all flex flex-col justify-between shadow-2xl relative select-none group"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-amber-400 font-semibold">
                {currentCard.category}
              </span>
              <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                <RotateCw className="w-3 h-3" />
                {isFlipped ? 'Click to view Prompt' : 'Click to Reveal Answer'}
              </span>
            </div>

            {/* Card Center Content */}
            <div className="my-auto py-6 text-center">
              {!isFlipped ? (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest block">Question / Concept</span>
                  <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                    {currentCard.front}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block">Accredited Model Answer</span>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium whitespace-pre-line">
                    {currentCard.back}
                  </p>
                  <div className="pt-2 text-[11px] text-slate-400 font-mono">
                    Reference: {currentCard.keyReference}
                  </div>
                </div>
              )}
            </div>

            {/* Card Footer indicator */}
            <div className="text-center text-[10px] text-slate-600">
              {isFlipped ? 'Answer Mode' : 'Question Mode'}
            </div>
          </div>

          {/* Controls: Nav & Spaced Repetition Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
                title="Previous Card"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
                title="Next Card"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => markNeedsReview(currentCard.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold transition-colors"
              >
                <XCircle className="w-4 h-4" />
                <span>Needs Review</span>
              </button>
              <button
                onClick={() => markMastered(currentCard.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mastered</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
