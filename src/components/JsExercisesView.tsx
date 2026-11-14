import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Search, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal, 
  BookOpen, 
  Sparkles, 
  CheckCircle, 
  Circle, 
  SlidersHorizontal,
  Code2,
  ExternalLink,
  Edit3,
  Clock
} from 'lucide-react';
import { EXERCISES, Exercise } from '../data/exercises';
import { executeJsCode, OutputEntry, playAudioChime } from '../utils/runner';
import { Visualizer } from './Visualizer';

interface JsExercisesViewProps {
  soundEnabled: boolean;
  initialExerciseId?: string;
}

export const JsExercisesView: React.FC<JsExercisesViewProps> = ({
  soundEnabled,
  initialExerciseId
}) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>(() => {
    if (initialExerciseId) {
      const match = EXERCISES.find((e) => e.id === initialExerciseId);
      if (match) return match;
    }
    return EXERCISES[0];
  });

  const [inputValues, setInputValues] = useState<(string | number)[]>(() => {
    const ex = initialExerciseId 
      ? EXERCISES.find((e) => e.id === initialExerciseId) || EXERCISES[0]
      : EXERCISES[0];
    return ex.prompts.map((p) => p.type === 'number' ? Number(p.value) : p.value);
  });

  const [outputEntries, setOutputEntries] = useState<OutputEntry[]>([]);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Edit code mode
  const [isEditingCode, setIsEditingCode] = useState(false);
  const [customCode, setCustomCode] = useState<string>(selectedExercise.code);

  // Completed items in localStorage
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('erka_completed_exercises');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // When exercise changes
  const handleSelectExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setInputValues(exercise.prompts.map((p) => p.type === 'number' ? Number(p.value) : p.value));
    setOutputEntries([]);
    setExecutionTime(null);
    setIsEditingCode(false);
    setCustomCode(exercise.code);
    if (soundEnabled) playAudioChime('click');
  };

  const handleInputChange = (index: number, val: string, type: 'number' | 'text') => {
    const updated = [...inputValues];
    updated[index] = type === 'number' && val !== '' ? Number(val) : val;
    setInputValues(updated);
  };

  const handleApplyPreset = (values: (string | number)[]) => {
    setInputValues(values);
    if (soundEnabled) playAudioChime('click');
  };

  const handleRun = () => {
    setIsRunning(true);
    const codeToRun = isEditingCode ? customCode : selectedExercise.code;
    const result = executeJsCode(codeToRun, inputValues);

    setOutputEntries(result.entries);
    setExecutionTime(result.executionTimeMs);
    setIsRunning(false);

    if (soundEnabled) {
      if (result.success) playAudioChime('success');
    }

    if (result.success && !completedIds.includes(selectedExercise.id)) {
      const updated = [...completedIds, selectedExercise.id];
      setCompletedIds(updated);
      try {
        localStorage.setItem('erka_completed_exercises', JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  };

  // Keyboard shortcut Ctrl+Enter or Cmd+Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedExercise, inputValues, isEditingCode, customCode, completedIds, soundEnabled]);

  const copyCodeToClipboard = () => {
    const code = isEditingCode ? customCode : selectedExercise.code;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const toggleCompleted = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isCompleted = completedIds.includes(id);
    const updated = isCompleted ? completedIds.filter((item) => item !== id) : [...completedIds, id];
    setCompletedIds(updated);
    try {
      localStorage.setItem('erka_completed_exercises', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Filter exercises
  const filteredExercises = EXERCISES.filter((ex) => {
    const matchesQuery = ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ex.lesson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ex.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ex.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLesson = selectedLesson === 'all' || ex.lesson === selectedLesson;
    const matchesType = selectedType === 'all' || ex.type === selectedType;
    return matchesQuery && matchesLesson && matchesType;
  });

  const lessons = ['all', 'Хичээл 8', 'Хичээл 9', 'Хичээл 10', 'Хичээл 11'];

  return (
    <div className="space-y-6 py-2">
      {/* Exercise Dashboard Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#201014]/80 border border-amber-900/40 p-4 sm:p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-amber-100 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-amber-400" />
              <span>JS Бодлогын Сан (14 Дасгал)</span>
            </h1>
            <span className="text-xs bg-red-950 text-amber-200 border border-red-700/50 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{completedIds.length}/14 Гүйцэтгэсэн</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-amber-200/70 mt-1">
            Хичээл 8–11 дасгалууд. Оролтын утгуудыг тохируулан бодлогыг ажиллуулж, кодын дүн шинжилгээг харна уу.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-700 via-amber-600 to-amber-700 hover:from-red-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-950/60 transition-all hover:scale-105 active:scale-95 ring-1 ring-amber-400/40"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Ажиллуулах</span>
            <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded text-amber-200 hidden sm:inline">
              Ctrl+Enter
            </span>
          </button>

          {/* Noticeable & slightly bigger Origin button */}
          <a
            href="https://genuine-blancmange-197e49.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-950/90 via-[#271319] to-amber-950/90 hover:from-amber-900 hover:to-[#381a24] text-amber-100 hover:text-white border-2 border-amber-400/80 hover:border-amber-300 font-bold text-sm shadow-md shadow-amber-950/50 transition-all hover:scale-105 active:scale-95 ring-1 ring-amber-400/30 shrink-0"
            title="Эх Netlify төслийг шинэ цонхонд нээх"
          >
            <ExternalLink className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">🌐 Эх Netlify сайт (Origin)</span>
            <span className="sm:hidden">Эх сайт</span>
          </a>
        </div>
      </div>

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Exercises Sidebar (4 cols) */}
        <aside className="lg:col-span-4 bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-4 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Бодлого хайх (нэр, сэдэв)..."
              className="w-full bg-[#160a0e] border border-amber-900/40 text-xs rounded-xl pl-9 pr-3 py-2 text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Lesson Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            {lessons.map((lesson) => (
              <button
                key={lesson}
                onClick={() => setSelectedLesson(lesson)}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
                  selectedLesson === lesson
                    ? 'bg-gradient-to-r from-red-700 to-amber-700 text-white shadow-sm ring-1 ring-amber-400/30'
                    : 'bg-[#29141a] text-amber-200/70 hover:text-amber-100'
                }`}
              >
                {lesson === 'all' ? 'Бүх хичээл' : lesson}
              </button>
            ))}
          </div>

          {/* Exercise List */}
          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {filteredExercises.map((exercise) => {
              const isSelected = selectedExercise.id === exercise.id;
              const isDone = completedIds.includes(exercise.id);

              return (
                <div
                  key={exercise.id}
                  onClick={() => handleSelectExercise(exercise)}
                  className={`p-3 rounded-2xl border text-left cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#32161f] to-[#28131a] border-amber-500/70 shadow-lg shadow-red-950/40 ring-1 ring-amber-400/30'
                      : 'bg-[#180b0f]/60 border-amber-900/30 hover:border-amber-700/60 hover:bg-[#251218]'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#2b141b] text-amber-300">
                        {exercise.lesson}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-red-950/60 text-amber-200 border border-red-700/40">
                        {exercise.type}
                      </span>
                    </div>

                    <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-amber-200' : 'text-stone-200'}`}>
                      {exercise.title}
                    </h4>
                    <p className="text-[11px] text-amber-200/60 line-clamp-1 mt-0.5">
                      {exercise.description}
                    </p>
                  </div>

                  <button
                    onClick={(e) => toggleCompleted(exercise.id, e)}
                    className="p-1 text-stone-500 hover:text-emerald-400 transition-colors shrink-0"
                    title={isDone ? 'Гүйцэтгэсэн' : 'Гүйцэтгэснээр тэмдэглэх'}
                  >
                    {isDone ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Active Exercise Workspace (8 cols) */}
        <main className="lg:col-span-8 space-y-6">
          {/* Active Exercise Hero Banner */}
          <section className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-red-950 text-amber-200 px-2.5 py-0.5 rounded-full font-bold border border-red-700/50">
                  {selectedExercise.lesson}
                </span>
                <span className="text-xs bg-[#2b141b] text-amber-200 px-2.5 py-0.5 rounded-full font-medium">
                  {selectedExercise.category}
                </span>
                <span className="text-xs bg-amber-950/60 text-amber-300 border border-amber-700/40 px-2 py-0.5 rounded-full">
                  {selectedExercise.prompts.length ? `${selectedExercise.prompts.length} Оролттой` : 'Автомат'}
                </span>
              </div>

              <div className="text-[11px] text-amber-400/70 font-mono">
                {selectedExercise.file}
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-amber-100">
              {selectedExercise.title}
            </h2>

            <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
              {selectedExercise.description}
            </p>
          </section>

          {/* Dynamic Visualizer Demo */}
          <Visualizer exercise={selectedExercise} inputValues={inputValues} />

          {/* Inputs & Outputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Panel */}
            <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                  <span>Оролтууд (Inputs)</span>
                </h3>
                <span className="text-[11px] text-amber-400/60 font-mono">
                  prompt() утгууд
                </span>
              </div>

              {selectedExercise.prompts.length === 0 ? (
                <div className="p-4 rounded-2xl bg-[#160a0e] border border-amber-900/30 text-xs text-amber-200/70 text-center">
                  Энэ бодлого хэрэглэгчийн оролтгүйгээр шууд тооцоологдон ажиллана.
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedExercise.prompts.map((prompt, idx) => (
                    <div key={idx} className="space-y-1">
                      <label className="text-xs font-medium text-amber-200/90 block">
                        {prompt.label}
                      </label>
                      <input
                        type={prompt.type === 'number' ? 'number' : 'text'}
                        value={inputValues[idx] !== undefined ? String(inputValues[idx]) : ''}
                        onChange={(e) => handleInputChange(idx, e.target.value, prompt.type)}
                        placeholder={prompt.placeholder || prompt.label}
                        className="w-full bg-[#160a0e] border border-amber-900/40 rounded-xl px-3.5 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-500 font-mono"
                      />
                      {prompt.helper && (
                        <p className="text-[10px] text-amber-400/50">{prompt.helper}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Presets Quick Fill */}
              {selectedExercise.presets && selectedExercise.presets.length > 0 && (
                <div className="pt-2 border-t border-amber-900/30">
                  <div className="text-[10px] uppercase font-semibold text-amber-400/70 tracking-wider mb-2">
                    Бэлэн жишээ пресетүүд:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedExercise.presets.map((preset, i) => (
                      <button
                        key={i}
                        onClick={() => handleApplyPreset(preset.values)}
                        className="text-[11px] px-2.5 py-1 rounded-xl bg-[#2a131a] hover:bg-[#381a23] hover:text-amber-200 text-amber-300/80 border border-amber-900/40 transition-colors"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Output Panel */}
            <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-amber-400" />
                    <span>Гаралт (Output Console)</span>
                  </h3>
                  {executionTime !== null && (
                    <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{executionTime} ms</span>
                    </span>
                  )}
                </div>

                <div className="bg-[#14080b] border border-amber-900/40 rounded-2xl p-3.5 min-h-[170px] max-h-[260px] overflow-y-auto space-y-2 font-mono text-xs">
                  {outputEntries.length === 0 ? (
                    <div className="text-amber-400/40 italic text-center py-8">
                      'Ажиллуулах' товчлуур дээр дарж үр дүнг энд харна уу.
                    </div>
                  ) : (
                    outputEntries.map((entry) => {
                      if (entry.type === 'prompt') {
                        return (
                          <div key={entry.id} className="p-2 rounded-xl bg-[#221016] border border-amber-900/40 text-amber-300/80">
                            <span className="text-amber-400 font-bold mr-1.5">[Оролт]</span>
                            <span className="text-stone-200">{entry.text}</span>
                          </div>
                        );
                      }
                      if (entry.type === 'alert') {
                        return (
                          <div key={entry.id} className="p-2.5 rounded-xl bg-gradient-to-r from-red-950/70 to-amber-950/70 border border-amber-500/40 text-amber-100 whitespace-pre-wrap">
                            <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-300" />
                              <span>Alert Мэдэгдэл:</span>
                            </div>
                            <div>{entry.text}</div>
                          </div>
                        );
                      }
                      if (entry.type === 'error') {
                        return (
                          <div key={entry.id} className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 whitespace-pre-wrap">
                            {entry.text}
                          </div>
                        );
                      }
                      return (
                        <div key={entry.id} className="text-stone-300">
                          {entry.text}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {outputEntries.length > 0 && (
                <div className="flex items-center justify-between pt-2 border-t border-amber-900/30">
                  <span className="text-[11px] text-amber-400/50">
                    {outputEntries.length} үйлдэл хэвлэгдсэн
                  </span>
                  <button
                    onClick={() => setOutputEntries([])}
                    className="text-xs text-amber-300/80 hover:text-amber-100 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Цэвэрлэх</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Code Viewer & Editor Panel */}
          <section className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                  JavaScript Эх Код
                </h3>
                <span className="text-[11px] text-amber-400/60 font-mono">({selectedExercise.file})</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditingCode(!isEditingCode)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    isEditingCode
                      ? 'bg-amber-600 text-white border-amber-500'
                      : 'bg-[#2a141b] text-amber-200 border-amber-900/50 hover:bg-[#341b23]'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingCode ? 'Засах горим' : 'Код засах'}</span>
                </button>

                {isEditingCode && (
                  <button
                    onClick={() => setCustomCode(selectedExercise.code)}
                    className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-[#2a141b] hover:bg-[#341b23] text-amber-300 border border-amber-900/50 flex items-center gap-1"
                    title="Анхны кодоор сэргээх"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}

                <button
                  onClick={copyCodeToClipboard}
                  className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-[#2a141b] hover:bg-[#341b23] text-amber-200 border border-amber-900/50 flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Хуулагдлаа!' : 'Хуулах'}</span>
                </button>
              </div>
            </div>

            {isEditingCode ? (
              <textarea
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                rows={10}
                className="w-full bg-[#14080b] border border-amber-500/50 rounded-2xl p-4 text-xs font-mono text-amber-100 focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed resize-y"
              />
            ) : (
              <div className="bg-[#14080b] border border-amber-900/40 rounded-2xl p-4 overflow-x-auto text-xs font-mono text-amber-100/90 leading-relaxed max-h-60 overflow-y-auto">
                <pre>{selectedExercise.code}</pre>
              </div>
            )}
          </section>

          {/* Educational Explanation Breakdown */}
          <section className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Бодлогын Тайлбар & Алгоритмын Зарчим</span>
            </div>

            <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
              {selectedExercise.explanation.overview}
            </p>

            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-amber-400/80 uppercase tracking-wider">
                Алхамчилсан ажиллагаа:
              </div>
              <div className="space-y-1.5">
                {selectedExercise.explanation.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-300">
                    <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-amber-900/30 flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-semibold text-amber-400/70 uppercase tracking-wider">
                Суралцах ойлголтууд:
              </span>
              {selectedExercise.explanation.concepts.map((concept) => (
                <span
                  key={concept}
                  className="text-[11px] px-2 py-0.5 rounded-lg bg-[#2b141b] text-amber-200 border border-amber-900/40"
                >
                  {concept}
                </span>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
