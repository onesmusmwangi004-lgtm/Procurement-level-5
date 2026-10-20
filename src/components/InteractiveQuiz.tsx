import React, { useState } from 'react';
import { QuizQuestion } from '../types/curriculum';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ArrowRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface InteractiveQuizProps {
  questions: QuizQuestion[];
  onOpenNotesForUnit?: (unitId: string) => void;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  questions,
  onOpenNotesForUnit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    { questionId: string; selected: number; isCorrect: boolean }[]
  >([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === currentQ.correctAnswerIndex;
    if (isCorrect) setScore((prev) => prev + 1);

    setUserAnswers((prev) => [
      ...prev,
      { questionId: currentQ.id, selected: selectedOption, isCorrect },
    ]);
    setIsAnswerSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setUserAnswers([]);
    setQuizFinished(false);
  };

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-850 border border-slate-800 text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block">
          KNEC Level 5 Mock Test
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Interactive Knowledge Drill</h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Test your immediate recall of key legal thresholds, formulas, definitions, and operational procedures.
        </p>
      </div>

      {!quizFinished ? (
        <div className="rounded-2xl bg-slate-850 border border-slate-800 p-6 md:p-8 space-y-6 shadow-xl">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
            <span>
              Question <strong className="text-white">{currentIndex + 1}</strong> of{' '}
              <strong className="text-white">{questions.length}</strong>
            </span>
            <div className="flex items-center gap-2">
              <span>Score:</span>
              <span className="font-bold text-amber-400 font-mono">
                {score} / {currentIndex + (isAnswerSubmitted ? 1 : 0)}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQ.correctAnswerIndex;

              let buttonStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';

              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  buttonStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected) {
                  buttonStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                } else {
                  buttonStyle = 'bg-slate-900/40 border-slate-800/40 text-slate-500';
                }
              } else if (isSelected) {
                buttonStyle = 'bg-amber-500/10 border-amber-500 text-white font-semibold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 font-mono text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner when answered */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2 animate-fadeIn text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white">KNEC Examination Explanation:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
              <div className="pt-1 text-slate-400 italic">
                <strong className="text-amber-400 not-italic">Examiner Note: </strong>
                {currentQ.knceFocusNote}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs disabled:opacity-50 transition-all shadow-md shadow-amber-500/20 active:scale-95"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all shadow-md active:scale-95"
              >
                <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'View Final Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="rounded-2xl bg-slate-850 border border-slate-800 p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/10">
            <Award className="w-8 h-8 text-slate-950" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Mock Quiz Completed!</h2>
            <p className="text-xs text-slate-400">Here is your KNEC Level 5 readiness score:</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 inline-block px-12">
            <div className="text-4xl font-extrabold text-amber-400 font-mono">{percentage}%</div>
            <div className="text-xs text-slate-300 mt-1">
              {score} out of {questions.length} questions correct
            </div>
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto">
            {percentage >= 80
              ? 'Distinction performance! You have firm command over the core definitions, formulas, and Kenyan PPADA 2015 legislation.'
              : percentage >= 60
              ? 'Credit pass. Review the detailed revision notes on your missed topics before taking the final KNEC paper.'
              : 'Pass/Referral. We strongly recommend going through the Deep Notes reader and Flashcards to solidify core supply chain principles.'}
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
