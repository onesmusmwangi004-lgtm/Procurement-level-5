import React, { useState } from 'react';
import { GlossaryTerm } from '../types/curriculum';
import { Search, BookOpen, Scale, Tag } from 'lucide-react';

interface GlossaryViewProps {
  terms: GlossaryTerm[];
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ terms }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = Array.from(new Set(terms.map((t) => t.category)));

  const filtered = terms.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchTerm.trim() === '' ||
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.acronym && item.acronym.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-850 border border-slate-800 text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block">
          Kenyan & International SCM Dictionary
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Procurement & Supply Chain Glossary</h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Instant definitions, legal references, and operational acronyms tested under the KNEC Level 5 curriculum.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-850 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search terms (e.g. PPADA, EOQ, CIF)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-amber-500/20 text-amber-300 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            All Categories ({terms.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-500/20 text-amber-300 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Terms Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base">{item.term}</h3>
                  {item.acronym && (
                    <span className="font-mono text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {item.acronym}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium shrink-0">
                {item.category}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {item.definition}
            </p>

            {item.kenyanContext && (
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/30 text-xs text-emerald-300/90 leading-relaxed flex items-start gap-2">
                <Scale className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-emerald-300 font-semibold">Kenyan Context: </strong>
                  {item.kenyanContext}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
