import React, { useEffect, useMemo, useState } from 'react';
import {
  Trophy,
  Crown,
  Medal,
  Gamepad2,
  RefreshCw,
  Calendar,
  Flame,
  Clock,
  ShieldAlert,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  GameMode,
  GameName,
  ScoreRecord,
  deleteScoreRecord,
  fetchScoresOnce,
  subscribeScores
} from '../firebase';
import { ActiveTab } from './Navbar';

interface LeaderboardViewProps {
  authUser: FirebaseUser | null;
  onGoogleSignIn: () => Promise<void>;
  onSelectTab?: (tab: ActiveTab) => void;
  onPlayGame?: (game: GameName) => void;
  initialGame?: GameName;
  refreshTrigger?: number;
}

type ModeFilter = 'All' | GameMode;

const MODE_LABELS: Record<ModeFilter, string> = {
  All: 'Бүх горим',
  Classic: 'Classic',
  Timed: 'Timed (60s)',
  Hard: 'Hard'
};

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  authUser,
  onSelectTab,
  onPlayGame,
  initialGame = 'Anime Guess',
  refreshTrigger = 0
}) => {
  const [selectedGame, setSelectedGame] = useState<GameName>(initialGame);
  const [selectedMode, setSelectedMode] = useState<ModeFilter>('All');
  const [scores, setScores] = useState<ScoreRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedGame(initialGame);
  }, [initialGame]);

  useEffect(() => {
    setLoading(true);
    const unsub = subscribeScores(
      (items) => {
        setScores(items);
        setLoading(false);
        setErrorMsg(null);
      },
      (err) => {
        setLoading(false);
        setErrorMsg(err.message);
      }
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    if (refreshTrigger > 0) {
      fetchScoresOnce()
        .then((items) => {
          setScores(items);
          setErrorMsg(null);
        })
        .catch((err) => {
          setErrorMsg(err instanceof Error ? err.message : String(err));
        });
    }
  }, [refreshTrigger]);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    try {
      const items = await fetchScoresOnce();
      setScores(items);
      setErrorMsg(null);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setRefreshing(false);
    }
  };

  const handleDeleteOwnScore = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteScoreRecord(id);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setDeletingId(null);
    }
  };

  // Count per game
  const gameCounts = useMemo(() => {
    return {
      'Anime Guess': scores.filter((s) => s.game === 'Anime Guess').length,
      'Sport Guess': scores.filter((s) => s.game === 'Sport Guess').length
    };
  }, [scores]);

  // Filter by game & mode, sort high -> low, take TOP 10
  const top10Scores = useMemo(() => {
    return scores
      .filter((item) => item.game === selectedGame)
      .filter((item) => selectedMode === 'All' || item.mode === selectedMode)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [scores, selectedGame, selectedMode]);

  const top3 = top10Scores.slice(0, 3);
  const rest = top10Scores.slice(3, 10);

  const formatDate = (record: ScoreRecord) => {
    if (record.createdAt && typeof record.createdAt.toDate === 'function') {
      return record.createdAt.toDate().toLocaleDateString('mn-MN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    }
    if (record.date) {
      const parsed = new Date(record.date);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed.toLocaleDateString('mn-MN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      }
      return record.date;
    }
    return 'Өнөөдөр';
  };

  const getRankBadgeStyle = (rankIndex: number) => {
    if (rankIndex === 0) {
      return {
        card: 'bg-gradient-to-br from-amber-500/25 via-[#2c170f] to-[#1d0e11] border-2 border-amber-400 shadow-2xl shadow-amber-900/40 ring-2 ring-amber-400/30',
        medal: '🥇 1-р байр',
        badge: 'bg-amber-400 text-stone-950',
        scoreColor: 'text-amber-300',
        icon: <Crown className="w-7 h-7 text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.7)]" />
      };
    }
    if (rankIndex === 1) {
      return {
        card: 'bg-gradient-to-br from-stone-300/15 via-[#241317] to-[#190c10] border-2 border-stone-300/70 shadow-xl shadow-black/50',
        medal: '🥈 2-р байр',
        badge: 'bg-stone-200 text-stone-950',
        scoreColor: 'text-stone-100',
        icon: <Medal className="w-6 h-6 text-stone-200" />
      };
    }
    return {
      card: 'bg-gradient-to-br from-orange-600/20 via-[#251215] to-[#190c10] border-2 border-orange-400/70 shadow-xl shadow-orange-950/40',
      medal: '🥉 3-р байр',
      badge: 'bg-orange-400 text-stone-950',
      scoreColor: 'text-orange-300',
      icon: <Medal className="w-6 h-6 text-orange-300" />
    };
  };

  return (
    <div className="space-y-5 sm:space-y-8 py-2 sm:py-4">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#281219] via-[#2b141e] to-[#1a0b10] border-2 border-amber-500/50 p-4 sm:p-8 shadow-2xl shadow-red-950/50">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/90 border border-amber-500/50 text-amber-200 text-[11px] sm:text-xs font-bold mb-2.5">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
              <span>Firestore Live Leaderboard • ТОП 10</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-amber-100 tracking-tight">
              Шилдэг Тоглогчдын{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-100 to-orange-400 bg-clip-text text-transparent">
                Leaderboard
              </span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-amber-100/75 max-w-xl">
              Firestore-ийн <span className="font-mono text-amber-300">"scores"</span> сангаас оноогоор их → бага эрэмбэлэн ТОП 10 амжилтыг харуулж байна. Тоглоом болон горимоо сонгон шүүж хараарай!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleManualRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#221217] hover:bg-[#311820] border border-amber-900/60 text-amber-200 text-xs font-bold transition-all"
            >
              <RefreshCw className={`w-4 h-4 text-amber-300 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Шинэчлэх</span>
            </button>

            <button
              onClick={() => {
                if (onPlayGame) {
                  onPlayGame(selectedGame);
                } else if (onSelectTab) {
                  onSelectTab('anime-guess');
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-700 via-amber-600 to-amber-700 hover:from-red-600 hover:to-amber-600 text-white text-xs font-black shadow-lg border border-amber-300/40 transition-all hover:scale-105"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Тоглож оноо авах</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Game Tabs & Mode Sub-tabs */}
      <section className="bg-[#201014]/90 border border-amber-900/50 rounded-3xl p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-xl">
        {/* Game Switcher Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-amber-900/40">
          <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">
            {(['Anime Guess', 'Sport Guess'] as GameName[]).map((game) => {
              const isSelected = selectedGame === game;
              return (
                <button
                  key={game}
                  onClick={() => setSelectedGame(game)}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all min-h-[44px] ${
                    isSelected
                      ? 'bg-gradient-to-r from-red-700 via-amber-600 to-amber-700 text-white shadow-lg shadow-red-950/60 ring-2 ring-amber-400/40'
                      : 'bg-[#170a0e] text-amber-200/70 hover:text-amber-100 border border-amber-900/40 hover:border-amber-700/60'
                  }`}
                >
                  <span>{game === 'Anime Guess' ? '🎌' : '🏀'}</span>
                  <span className="truncate">{game}</span>
                  <span className={`text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-black/30 text-amber-200' : 'bg-[#281318] text-amber-300/80'
                  }`}>
                    {gameCounts[game]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mode Sub-tabs inside Selected Game */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-amber-400/80 mr-1 uppercase tracking-wider">
            Горимоор шүүх:
          </span>
          {(['All', 'Classic', 'Timed', 'Hard'] as ModeFilter[]).map((mode) => {
            const active = selectedMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-amber-500/25 text-amber-200 border-2 border-amber-400 shadow-sm'
                    : 'bg-[#170a0e] text-amber-200/70 hover:text-amber-100 border border-amber-900/40'
                }`}
              >
                {mode === 'Timed' && <Clock className="w-3.5 h-3.5 text-amber-300" />}
                {mode === 'Hard' && <Flame className="w-3.5 h-3.5 text-rose-400" />}
                <span>{MODE_LABELS[mode]}</span>
              </button>
            );
          })}
        </div>

        {/* Error Display */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold">Firestore-оос мэдээлэл татахад алдаа гарлаа</div>
              <div className="font-mono text-[11px] opacity-80 break-all">{errorMsg}</div>
            </div>
          </div>
        )}

        {/* Loading or Empty State */}
        {loading ? (
          <div className="py-12 text-center text-amber-300/70 text-sm font-semibold animate-pulse">
            Leaderboard мэдээллийг Firestore-оос ачаалж байна...
          </div>
        ) : top10Scores.length === 0 ? (
          <div className="py-12 px-4 rounded-2xl bg-[#160a0e] border border-amber-900/40 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <Trophy className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-amber-100">
                Одоогоор "{selectedGame}" ({MODE_LABELS[selectedMode]}) дээр оноо бүртгэгдээгүй байна
              </h3>
              <p className="text-xs text-amber-200/70">
                Нэвтрэх шаардлагагүйгээр тоглоод нэрээ оруулж анхны оноогоо хадгалаарай!
              </p>
            </div>
            <button
              onClick={() => {
                if (onPlayGame) {
                  onPlayGame(selectedGame);
                } else if (onSelectTab) {
                  onSelectTab('anime-guess');
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-amber-700 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Одоо тоглох</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Highlighted Ranks 1–3 Podium */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-3 flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-300" />
                <span>Шилдэг 1–3-р байр (Podium)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {top3.map((record, idx) => {
                  const style = getRankBadgeStyle(idx);
                  const isOwn = authUser?.uid === record.uid;
                  return (
                    <div
                      key={record.id}
                      className={`rounded-3xl p-5 flex flex-col justify-between gap-4 transition-transform hover:-translate-y-1 ${style.card}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-black ${style.badge}`}>
                          {style.medal}
                        </span>
                        {style.icon}
                      </div>

                      <div>
                        <div className="text-lg font-black text-white truncate flex items-center gap-2">
                          <span>{record.name}</span>
                          {isOwn && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 font-bold">
                              Таны оноо
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-amber-200/75 mt-1 flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-black/30 border border-amber-500/30 text-amber-200 font-semibold">
                            {record.mode}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px]">
                            <Calendar className="w-3 h-3 text-amber-400" />
                            {formatDate(record)}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-amber-200/60 font-bold">
                            Нийт оноо
                          </div>
                          <div className={`text-2xl font-black ${style.scoreColor}`}>
                            {record.score} оноо
                          </div>
                        </div>
                        {isOwn && (
                          <button
                            onClick={() => handleDeleteOwnScore(record.id)}
                            disabled={deletingId === record.id}
                            className="p-2 rounded-xl bg-black/30 hover:bg-rose-950/80 text-amber-300/70 hover:text-rose-300 transition-colors"
                            title="Өөрийн энэ оноог устгах"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ranks 4–10 List */}
            {rest.length > 0 && (
              <div className="space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400/80 px-1">
                  4–10-р байр
                </div>
                <div className="bg-[#160a0e] border border-amber-900/40 rounded-2xl divide-y divide-amber-900/30 overflow-hidden">
                  {rest.map((record, i) => {
                    const rank = i + 4;
                    const isOwn = authUser?.uid === record.uid;
                    return (
                      <div
                        key={record.id}
                        className="px-4 py-3.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 hover:bg-[#221016] transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-8 h-8 rounded-xl bg-[#2a141b] border border-amber-900/50 text-amber-300 font-black text-xs flex items-center justify-center shrink-0">
                            #{rank}
                          </span>
                          <div className="min-w-0">
                            <div className="font-bold text-sm text-amber-100 truncate flex items-center gap-2">
                              <span>{record.name}</span>
                              {isOwn && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-600/40">
                                  Та
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-amber-300/60 flex items-center gap-2">
                              <span>{record.game}</span>
                              <span>•</span>
                              <span>{record.mode}</span>
                              <span>•</span>
                              <span>{formatDate(record)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 ml-auto">
                          <span className="px-3 py-1 rounded-xl bg-amber-950/60 border border-amber-700/40 text-amber-300 font-black text-sm">
                            {record.score} оноо
                          </span>
                          {isOwn && (
                            <button
                              onClick={() => handleDeleteOwnScore(record.id)}
                              disabled={deletingId === record.id}
                              className="p-1.5 rounded-lg hover:bg-rose-950/70 text-amber-400/60 hover:text-rose-300 transition-colors"
                              title="Устгах"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
