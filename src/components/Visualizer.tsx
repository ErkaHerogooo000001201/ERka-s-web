import React from 'react';
import { Exercise } from '../data/exercises';
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  ArrowRightLeft, 
  Award, 
  Lock, 
  ShieldCheck, 
  ShieldAlert, 
  Gauge, 
  Gift, 
  Star, 
  Coins, 
  TrendingUp, 
  Film,
  CheckCircle2,
  XCircle,
  TreePine
} from 'lucide-react';

interface VisualizerProps {
  exercise: Exercise;
  inputValues: (string | number)[];
}

export const Visualizer: React.FC<VisualizerProps> = ({ exercise, inputValues }) => {
  switch (exercise.id) {
    case '8-amidarsan-hugatsaa': {
      const nas = Number(inputValues[0]) || 0;
      const days = nas * 365;
      const hours = days * 24;
      const minutes = hours * 60;
      const seconds = minutes * 60;
      const heartbeats = Math.round(days * 100000);

      return (
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" /> Хугацааны задлал ({nas} нас)
            </span>
            <span className="text-xs text-amber-300/70">1 жил = 365 хоног</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#170a0e] p-3 rounded-2xl border border-amber-900/30">
              <div className="text-xs text-amber-400/80">Өдөр</div>
              <div className="text-lg font-bold text-amber-300">{days.toLocaleString()}</div>
              <div className="text-[10px] text-amber-400/50">{nas} × 365</div>
            </div>
            <div className="bg-[#170a0e] p-3 rounded-2xl border border-amber-900/30">
              <div className="text-xs text-amber-400/80">Цаг</div>
              <div className="text-lg font-bold text-orange-400">{hours.toLocaleString()}</div>
              <div className="text-[10px] text-amber-400/50">{days.toLocaleString()} × 24</div>
            </div>
            <div className="bg-[#170a0e] p-3 rounded-2xl border border-amber-900/30">
              <div className="text-xs text-amber-400/80">Минут</div>
              <div className="text-lg font-bold text-emerald-400">{minutes.toLocaleString()}</div>
              <div className="text-[10px] text-amber-400/50">{hours.toLocaleString()} × 60</div>
            </div>
            <div className="bg-[#170a0e] p-3 rounded-2xl border border-amber-900/30">
              <div className="text-xs text-amber-400/80">Секунд</div>
              <div className="text-lg font-bold text-rose-400">{seconds.toLocaleString()}</div>
              <div className="text-[10px] text-amber-400/50">{minutes.toLocaleString()} × 60</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-200/80 bg-[#160a0e] p-3 rounded-2xl border border-amber-900/30">
            <span className="text-red-400 text-sm">❤️</span>
            <span>Таны зүрх амьдралын хугацаанд ойролцоогоор <strong className="text-amber-300">{heartbeats.toLocaleString()}</strong> удаа цохилсон байна!</span>
          </div>
        </div>
      );
    }

    case '8-ireeduin-nas': {
      const torsonOn = Number(inputValues[0]) || 2000;
      const irehOn = Number(inputValues[1]) || 2030;
      const nas = irehOn - torsonOn;
      const currentYear = new Date().getFullYear();
      const currentAge = currentYear - torsonOn;

      return (
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" /> Насны шугам ({torsonOn} он → {irehOn} он)
            </span>
            <span className="text-xs text-amber-300 font-bold">{nas >= 0 ? `${nas} нас хүрнэ` : 'Төрөөгүй байна'}</span>
          </div>
          <div className="relative pt-6 pb-2">
            <div className="h-3 bg-[#160a0e] rounded-full overflow-hidden flex">
              <div className="h-full bg-red-700 w-1/3" title="Өнгөрсөн үе"></div>
              <div className="h-full bg-amber-500 w-1/3" title="Одоо үе"></div>
              <div className="h-full bg-emerald-600 w-1/3" title="Ирээдүй"></div>
            </div>
            <div className="flex justify-between items-center text-xs mt-3 text-amber-200/70">
              <div>
                <span className="block font-bold text-amber-100">{torsonOn} он</span>
                <span className="text-[10px] text-amber-400/50">Төрсөн он (0 нас)</span>
              </div>
              <div className="text-center">
                <span className="block font-bold text-amber-300">{currentYear} он</span>
                <span className="text-[10px] text-amber-400/50">Одоо үе ({currentAge} нас)</span>
              </div>
              <div className="text-right">
                <span className="block font-bold text-emerald-400">{irehOn} он</span>
                <span className="text-[10px] text-emerald-300 font-medium">Зорилтот он ({nas} нас)</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case '8-tongorog-too': {
      const too = Math.abs(Number(inputValues[0]) || 1234);
      const a = too % 10;
      const b = Math.floor(too / 10) % 10;
      const c = Math.floor(too / 100) % 10;
      const d = Math.floor(too / 1000) % 10;
      const urvuu = a * 1000 + b * 100 + c * 10 + d;

      return (
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <ArrowRightLeft className="w-4 h-4 text-amber-400" /> Орон салгах задаргаа
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-[#160a0e] px-2.5 py-1 rounded-lg text-amber-200 font-mono">{too}</span>
              <span className="text-xs text-amber-400">→</span>
              <span className="text-xs bg-red-950/80 border border-red-700/50 px-2.5 py-1 rounded-lg text-amber-200 font-mono font-bold">{urvuu}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-[#170a0e] p-2.5 rounded-2xl border border-amber-900/30 text-center">
              <div className="text-[11px] text-amber-400/70">1-р орон (d)</div>
              <div className="text-xl font-bold text-amber-300 font-mono my-0.5">{d}</div>
              <div className="text-[10px] text-amber-400/50 font-mono">Math.floor({too}/1000)</div>
            </div>
            <div className="bg-[#170a0e] p-2.5 rounded-2xl border border-amber-900/30 text-center">
              <div className="text-[11px] text-amber-400/70">2-р орон (c)</div>
              <div className="text-xl font-bold text-orange-400 font-mono my-0.5">{c}</div>
              <div className="text-[10px] text-amber-400/50 font-mono">({Math.floor(too/100)}) % 10</div>
            </div>
            <div className="bg-[#170a0e] p-2.5 rounded-2xl border border-amber-900/30 text-center">
              <div className="text-[11px] text-amber-400/70">3-р орон (b)</div>
              <div className="text-xl font-bold text-emerald-400 font-mono my-0.5">{b}</div>
              <div className="text-[10px] text-amber-400/50 font-mono">({Math.floor(too/10)}) % 10</div>
            </div>
            <div className="bg-[#170a0e] p-2.5 rounded-2xl border border-amber-900/30 text-center">
              <div className="text-[11px] text-amber-400/70">4-р орон (a)</div>
              <div className="text-xl font-bold text-rose-400 font-mono my-0.5">{a}</div>
              <div className="text-[10px] text-amber-400/50 font-mono">{too} % 10</div>
            </div>
          </div>
          <div className="text-xs text-amber-200/80 bg-[#160a0e] p-2.5 rounded-xl font-mono text-center border border-amber-900/30">
            {a}×1000 + {b}×100 + {c}×10 + {d} = <span className="text-amber-300 font-bold">{urvuu}</span>
          </div>
        </div>
      );
    }

    case '9-dun': {
      const onoo = Number(inputValues[0]) || 0;
      let grade = "F";
      let gradeColor = "text-rose-400 border-rose-500/40 bg-rose-500/10";
      let statusDesc = "Хангалтгүй (Fails)";

      if (onoo >= 90) {
        grade = "A";
        gradeColor = "text-emerald-400 border-emerald-500/40 bg-emerald-500/10";
        statusDesc = "Маш сайн (Excellent)";
      } else if (onoo >= 80) {
        grade = "B";
        gradeColor = "text-amber-300 border-amber-500/40 bg-amber-500/10";
        statusDesc = "Сайн (Good)";
      } else if (onoo >= 70) {
        grade = "C";
        gradeColor = "text-orange-400 border-orange-500/40 bg-orange-500/10";
        statusDesc = "Дунд (Average)";
      } else if (onoo >= 60) {
        grade = "D";
        gradeColor = "text-yellow-400 border-yellow-500/40 bg-yellow-500/10";
        statusDesc = "Хангалттай (Passing)";
      }

      const tiers = [
        { label: "F (<60)", active: grade === "F", color: "bg-rose-600" },
        { label: "D (60–69)", active: grade === "D", color: "bg-yellow-600" },
        { label: "C (70–79)", active: grade === "C", color: "bg-orange-600" },
        { label: "B (80–89)", active: grade === "B", color: "bg-amber-600" },
        { label: "A (90–100)", active: grade === "A", color: "bg-emerald-600" },
      ];

      return (
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Дүнгийн хуваарилалт
            </span>
            <div className={`px-3 py-1 rounded-full border text-xs font-bold flex items-center gap-1.5 ${gradeColor}`}>
              <span>Үнэлгээ: {grade}</span>
              <span>•</span>
              <span className="font-normal">{statusDesc}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
              {tiers.map((t) => (
                <div
                  key={t.label}
                  className={`py-2 px-1 rounded-xl border transition-all ${
                    t.active
                      ? `${t.color} text-white font-bold shadow-lg scale-105 border-amber-300/60`
                      : 'bg-[#170a0e] text-amber-200/60 border-amber-900/30'
                  }`}
                >
                  <div className="text-sm">{t.label.split(' ')[0]}</div>
                  <div className="text-[10px] opacity-80">{t.label.split(' ')[1]}</div>
                </div>
              ))}
            </div>
            <div className="relative pt-2">
              <div className="h-2 bg-[#160a0e] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-500 transition-all duration-300"
                  style={{ width: `${Math.min(Math.max(onoo, 0), 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-amber-400/60 mt-1">
                <span>0 оноо</span>
                <span>Одоогийн оноо: <strong className="text-amber-200">{onoo}</strong></span>
                <span>100 оноо</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case '9-nuuts-ug': {
      const p1 = String(inputValues[0] ?? "");
      const p2 = String(inputValues[1] ?? "");
      const isMatch = p1 === p2 && p1.length > 0;

      return (
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-400" /> Нууц үгийн баталгаажуулалт
            </span>
            <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
              isMatch
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/40'
                : 'bg-rose-950/80 text-rose-300 border border-rose-600/40'
            }`}>
              {isMatch ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
              <span>{isMatch ? 'Тохирлоо (===)' : 'Зөрүүтэй байна'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#170a0e] p-3 rounded-2xl border border-amber-900/30">
              <div className="text-xs text-amber-400/80">Шинэ нууц үг</div>
              <div className="text-sm font-mono text-amber-100 mt-1">{p1 ? '•'.repeat(p1.length) + ` (${p1.length} тэмдэгт)` : '<хоосон>'}</div>
            </div>
            <div className="bg-[#170a0e] p-3 rounded-2xl border border-amber-900/30">
              <div className="text-xs text-amber-400/80">Давтан оруулсан нууц үг</div>
              <div className="text-sm font-mono text-amber-100 mt-1">{p2 ? '•'.repeat(p2.length) + ` (${p2.length} тэмдэгт)` : '<хоосон>'}</div>
            </div>
          </div>
        </div>
      );
    }

    case '9-undur-jil': {
      const year = Number(inputValues[0]) || 2024;
      const c1 = year % 4 === 0;
      const c2 = year % 100 !== 0;
      const c3 = year % 400 === 0;
      const isLeap = (c1 && c2) || c3;

      return (
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" /> Өндөр жилийн 3 дүрэм ({year} он)
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              isLeap ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/40' : 'bg-[#170a0e] text-amber-200'
            }`}>
              {isLeap ? '✨ Өндөр жил (366 хоног)' : 'Энгийн жил (365 хоног)'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className={`p-3 rounded-2xl border ${c1 ? 'bg-emerald-950/40 border-emerald-600/40 text-emerald-200' : 'bg-[#170a0e] border-amber-900/30 text-amber-200/60'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">1. 4-т хуваагдах</span>
                {c1 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-stone-500" />}
              </div>
              <div className="font-mono text-[11px]">{year} % 4 = {year % 4}</div>
            </div>

            <div className={`p-3 rounded-2xl border ${c2 ? 'bg-emerald-950/40 border-emerald-600/40 text-emerald-200' : 'bg-[#170a0e] border-amber-900/30 text-amber-200/60'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">2. 100-д хуваагдахгүй</span>
                {c2 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-stone-500" />}
              </div>
              <div className="font-mono text-[11px]">{year} % 100 = {year % 100}</div>
            </div>

            <div className={`p-3 rounded-2xl border ${c3 ? 'bg-emerald-950/40 border-emerald-600/40 text-emerald-200' : 'bg-[#170a0e] border-amber-900/30 text-amber-200/60'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">3. 400-д хуваагдах</span>
                {c3 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-stone-500" />}
              </div>
              <div className="font-mono text-[11px]">{year} % 400 = {year % 400}</div>
            </div>
          </div>
        </div>
      );
    }

    case '9-zamyn-tsagdaa': {
      const speed = Number(inputValues[0]) || 80;
      const isOver = speed > 80;
      const lostPoints = isOver ? Math.floor((speed - 80) / 5) : 0;
      const isRevoked = lostPoints >= 5;

      return (
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-amber-400" /> Хурдны хяналт ба Торгууль
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              !isOver ? 'bg-emerald-950/80 text-emerald-300' : isRevoked ? 'bg-rose-950/80 text-rose-300 border border-rose-600/40' : 'bg-amber-950/80 text-amber-300'
            }`}>
              {!isOver ? 'Хурд хэвийн' : isRevoked ? '🚫 Эрх хасагдсан' : '⚠️ Торгуультай'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#170a0e] p-3 rounded-2xl border border-amber-900/30">
              <div className="text-[11px] text-amber-400/80">Хурдны хязгаар</div>
              <div className="text-xl font-bold text-amber-100">80 <span className="text-xs font-normal text-amber-400/60">км/ц</span></div>
            </div>
            <div className="bg-[#170a0e] p-3 rounded-2xl border border-amber-900/30">
              <div className="text-[11px] text-amber-400/80">Таны хурд</div>
              <div className={`text-xl font-bold ${speed > 80 ? 'text-amber-300' : 'text-emerald-400'}`}>
                {speed} <span className="text-xs font-normal text-amber-400/60">км/ц</span>
              </div>
            </div>
            <div className="bg-[#170a0e] p-3 rounded-2xl border border-amber-900/30">
              <div className="text-[11px] text-amber-400/80">Алдсан оноо</div>
              <div className={`text-xl font-bold ${lostPoints >= 5 ? 'text-rose-400' : lostPoints > 0 ? 'text-amber-300' : 'text-emerald-400'}`}>
                {lostPoints} <span className="text-xs font-normal text-amber-400/60">оноо</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case '10-chiher-huvaah': {
      const chiher = Number(inputValues[0]) || 20;
      const divisors: { count: number; perPerson: number }[] = [];
      for (let i = 1; i <= chiher; i++) {
        if (chiher % i === 0) {
          divisors.push({ count: i, perPerson: chiher / i });
        }
      }
      const isPrime = divisors.length === 2;

      return (
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-amber-400" /> Хуваагчид ({chiher} чихэр)
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              isPrime ? 'bg-red-950/80 text-amber-200 border border-red-700/50' : 'bg-[#170a0e] text-amber-200'
            }`}>
              {isPrime ? '💎 Анхны тоо (Prime)' : `${divisors.length} хуваагчтай`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto pr-1">
            {divisors.map((d) => (
              <div key={d.count} className="bg-[#170a0e] p-2.5 rounded-xl border border-amber-900/30 text-xs text-center">
                <span className="text-amber-400/70">{d.count} хүнд</span>
                <span className="text-amber-200 font-bold ml-1.5">{d.perPerson} ширхэг</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case '10-shatryn-budaa': {
      const nud = Math.min(Math.max(Number(inputValues[0]) || 5, 1), 64);
      let budaa = 1;
      let niitBudaa = 0;
      const steps: { sq: number; current: number; total: number }[] = [];
      for (let i = 1; i <= Math.min(nud, 8); i++) {
        niitBudaa += budaa;
        steps.push({ sq: i, current: budaa, total: niitBudaa });
        budaa *= 2;
      }

      let fullTotal = BigInt(0);
      let cur = BigInt(1);
      for (let i = 1; i <= nud; i++) {
        fullTotal += cur;
        cur *= BigInt(2);
      }

      return (
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Шатрын будааны өсөлт ({nud} нүд)
            </span>
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
              Нийт: {fullTotal.toLocaleString()} ширхэг
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 text-center">
            {Array.from({ length: 8 }).map((_, idx) => {
              const sqNum = idx + 1;
              const active = sqNum <= nud;
              const step = steps[idx];
              return (
                <div
                  key={sqNum}
                  className={`p-2 rounded-xl border text-xs transition-all ${
                    active
                      ? 'bg-gradient-to-b from-red-950/70 to-amber-950/70 border-amber-500/50 text-amber-200'
                      : 'bg-[#14080b] border-amber-900/20 text-stone-600'
                  }`}
                >
                  <div className="text-[10px] text-amber-400/60 font-mono">#{sqNum}</div>
                  <div className="font-bold font-mono text-xs text-amber-300">
                    {active && step ? step.current.toLocaleString() : '-'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case '10-unelgee': {
      const unelgee = Math.min(Math.max(Number(inputValues[0]) || 4, 0), 10);
      return (
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Үнэлгээний дүрслэл
            </span>
            <span className="text-xs text-amber-300/70">{unelgee} од сонгосон</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-3 bg-[#160a0e] rounded-2xl border border-amber-900/30">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-2xl transition-transform ${
                  i < unelgee ? 'scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'opacity-20 grayscale'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>
        </div>
      );
    }

    case '10-unii-husnegt': {
      const une = Number(inputValues[0]) || 1500;
      return (
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-400" /> 1–10 ширхэгийн үнийн жагсаалт
            </span>
            <span className="text-xs text-amber-300 font-mono">1 ширхэг = {une.toLocaleString()}₮</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            {Array.from({ length: 10 }).map((_, idx) => {
              const qty = idx + 1;
              const total = qty * une;
              return (
                <div key={qty} className="bg-[#170a0e] p-2.5 rounded-xl border border-amber-900/30 flex items-center justify-between">
                  <span className="text-amber-400/70">{qty} ш</span>
                  <span className="font-mono font-bold text-amber-200">{total.toLocaleString()}₮</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case '10-utasny-mungu': {
      const sarBur = Number(inputValues[0]) || 100000;
      const sar = Math.min(Math.max(Number(inputValues[1]) || 12, 1), 60);
      const totalSavings = sarBur * sar;

      return (
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-400" /> Хуримтлалын явц ({sar} сар)
            </span>
            <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30 font-mono">
              Нийт: {totalSavings.toLocaleString()}₮
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-[#170a0e] p-2.5 rounded-xl border border-amber-900/30">
              <div className="text-[11px] text-amber-400/70">1-р сар</div>
              <div className="text-sm font-bold text-amber-200 font-mono">{sarBur.toLocaleString()}₮</div>
            </div>
            <div className="bg-[#170a0e] p-2.5 rounded-xl border border-amber-900/30">
              <div className="text-[11px] text-amber-400/70">Хагас жил (6 сар)</div>
              <div className="text-sm font-bold text-orange-300 font-mono">{(sarBur * Math.min(sar, 6)).toLocaleString()}₮</div>
            </div>
            <div className="bg-[#170a0e] p-2.5 rounded-xl border border-amber-900/30">
              <div className="text-[11px] text-amber-400/70">1 бүтэн жил (12 сар)</div>
              <div className="text-sm font-bold text-red-300 font-mono">{(sarBur * Math.min(sar, 12)).toLocaleString()}₮</div>
            </div>
            <div className="bg-[#170a0e] p-2.5 rounded-xl border border-amber-900/30">
              <div className="text-[11px] text-amber-400/70">Эцсийн хуримтлал</div>
              <div className="text-sm font-bold text-amber-300 font-mono">{totalSavings.toLocaleString()}₮</div>
            </div>
          </div>
        </div>
      );
    }

    case '11-rekord': {
      const rawText = String(inputValues[0] || "1200,3400,900,5100,2800");
      const list = rawText
        .split(",")
        .map((n) => Number(n.trim()))
        .filter((n) => !Number.isNaN(n));
      const numbers = list.length ? list : [1200, 3400, 900, 5100, 2800];
      const maxVal = Math.max(...numbers);
      const minVal = Math.min(...numbers);

      return (
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Хамгийн их & бага утга ({numbers.length} тоо)
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 font-bold">
                👑 Рекорд (Max): {maxVal}
              </span>
              <span className="text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30 font-bold">
                💎 Min: {minVal}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {numbers.map((val, idx) => {
              const isMax = val === maxVal;
              const isMin = val === minVal;
              return (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-xl border font-mono text-xs flex items-center gap-1.5 transition-all ${
                    isMax
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold shadow-md shadow-amber-950/40'
                      : isMin
                      ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold shadow-md shadow-red-950/40'
                      : 'bg-[#170a0e] border-amber-900/30 text-amber-200/80'
                  }`}
                >
                  <span>{val}</span>
                  {isMax && <span className="text-amber-400 text-xs">👑</span>}
                  {isMin && <span className="text-rose-400 text-xs">💎</span>}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case '11-yu-uzeh-ve': {
      const anime = ["Naruto", "One Piece", "Dragon Ball", "Attack on Titan", "Demon Slayer"];
      const emoji = ["🍥🦊🍜", "🏴‍☠️👒🍖", "🐉🟠⭐", "🧱👊⚔️", "👹🗡️🌸"];
      const angi = [220, 1150, 153, 89, 63];
      const query = String(inputValues[0] || "").trim().toLowerCase();

      return (
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <Film className="w-4 h-4 text-amber-400" /> Анимэ каталоги ба сонголт
            </span>
            <span className="text-xs text-amber-300/70">Нийт 5 анимэ санд байна</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {anime.map((title, i) => {
              const isMatch = query && title.toLowerCase().includes(query);
              return (
                <div
                  key={title}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    isMatch
                      ? 'bg-red-950/70 border-amber-400 ring-2 ring-amber-500/40'
                      : 'bg-[#170a0e] border-amber-900/30'
                  }`}
                >
                  <div className="text-2xl mb-1">{emoji[i]}</div>
                  <div className="text-xs font-bold text-amber-100 truncate">{title}</div>
                  <div className="text-[11px] text-amber-400/60 mt-0.5">{angi[i]} анги</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};
