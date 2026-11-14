import React from 'react';
import { 
  Rocket, 
  Gamepad2, 
  Trophy, 
  Code2, 
  Palette, 
  Flame, 
  Target, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ERKA_PROFILE } from '../data/portfolio';
import { ActiveTab } from './Navbar';

interface FutureJobProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export const FutureJob: React.FC<FutureJobProps> = ({ onSelectTab }) => {
  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#241318] via-[#2a131b] to-[#1c0d12] border border-amber-900/50 p-6 sm:p-10 shadow-2xl shadow-red-950/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-700/50 text-amber-200 text-xs font-bold mb-3">
            <Rocket className="w-3.5 h-3.5 text-amber-400" />
            <span>Erka's Future Job & Vision</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-amber-100 tracking-tight leading-tight">
            Миний Мөрөөдлийн <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-100 to-red-400 bg-clip-text text-transparent">
              Ирээдүйн Ажил ба Зорилго
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-amber-100/80 leading-relaxed max-w-2xl">
            "IT инженер болж, хит тоглоом хөгжүүлж дэлхийд нэрд гарах юм. Мөн сагсан бөмбөгийн шилдэг тамирчин болно."
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onSelectTab('exercises')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg shadow-red-950/50 transition-all hover:scale-105 active:scale-95 ring-1 ring-amber-400/40"
            >
              <Code2 className="w-4 h-4" />
              <span>JS Бодлогоор ур чадвараа хөгжүүлэх</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {/* Noticeable & slightly bigger Origin button */}
            <a
              href="https://flourishing-malabi-935183.netlify.app/Erka's%20file.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-950/90 via-[#271319] to-amber-950/90 hover:from-amber-900 hover:to-[#381a24] text-amber-100 hover:text-white border-2 border-amber-400/80 hover:border-amber-300 font-bold text-sm shadow-md shadow-amber-950/50 transition-all hover:scale-105 active:scale-95 ring-1 ring-amber-400/30"
              title="Эх Netlify хувилбарыг шинэ цонхонд нээх"
            >
              <span>🌐 Эх "Erka's file.html" (Origin)</span>
              <ExternalLink className="w-4 h-4 text-amber-300" />
            </a>
          </div>
        </div>
      </section>

      {/* Two Main Pillars: IT Engineering & Basketball */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pillar 1: IT & Game Dev */}
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase">
                Зорилго 1
              </span>
              <h2 className="text-xl font-bold text-amber-100">
                IT Инженер & Тоглоом Хөгжүүлэгч
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
            Хүмүүсийн тоглох дуртай, сонирхолтой адал явдал, өндөр график бүхий тоглоомыг бүтээн дэлхийд Монголынхоо нэрийг гаргах нь миний мөрөөдөл.
          </p>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-amber-400/90 uppercase tracking-wider">
              Хэрэгтэй ур чадварууд (IT Skills)
            </h3>

            <div className="space-y-3">
              <div className="bg-[#170a0e]/70 p-3.5 rounded-2xl border border-amber-900/30">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-amber-100 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Код бичиж сурах (JS, HTML, CSS, C#)</span>
                  </span>
                  <span className="text-emerald-400 font-bold">85% Суралцаж буй</span>
                </div>
                <div className="h-2 bg-[#2a1319] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-600 via-amber-600 to-amber-400 w-[85%] rounded-full"></div>
                </div>
              </div>

              <div className="bg-[#170a0e]/70 p-3.5 rounded-2xl border border-amber-900/30">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-amber-100 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-rose-400" />
                    <span>Сайн зурах & Тоглоомын арт дизайн</span>
                  </span>
                  <span className="text-amber-400 font-bold">75% Хөгжүүлж буй</span>
                </div>
                <div className="h-2 bg-[#2a1319] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-rose-600 to-amber-500 w-[75%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 2: Basketball */}
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase">
                Зорилго 2
              </span>
              <h2 className="text-xl font-bold text-amber-100">
                Сагсан Бөмбөгийн Тамирчин
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
            Stephen Curry шиг 3 онооны шидэлттэй, талбай дээр хурдтай, багаа удирдан ялалтад хүргэх чадвартай сагсчин болох зорилготой.
          </p>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-amber-400/90 uppercase tracking-wider">
              Хэрэгтэй ур чадварууд (Basketball Skills)
            </h3>

            <div className="space-y-3">
              <div className="bg-[#170a0e]/70 p-3.5 rounded-2xl border border-amber-900/30">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-amber-100 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>Тэнхээ, тэсвэр хатуужилтай болох</span>
                  </span>
                  <span className="text-amber-400 font-bold">88% Бэлтгэлтэй</span>
                </div>
                <div className="h-2 bg-[#2a1319] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-600 to-amber-500 w-[88%] rounded-full"></div>
                </div>
              </div>

              <div className="bg-[#170a0e]/70 p-3.5 rounded-2xl border border-amber-900/30">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-amber-100 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-rose-400" />
                    <span>Оновчтой шидэлт & Техник</span>
                  </span>
                  <span className="text-rose-400 font-bold">82% Дасгалжиж буй</span>
                </div>
                <div className="h-2 bg-[#2a1319] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-rose-600 to-red-500 w-[82%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Job Section */}
      <section className="bg-gradient-to-br from-[#261319] via-[#1e0e13] to-[#1c0d12] border border-amber-900/40 rounded-3xl p-6 sm:p-8 text-center max-w-3xl mx-auto">
        <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-amber-100 mb-2">
          "Яагаад энэ ажил вэ?"
        </h3>
        <p className="text-lg font-bold text-amber-300 italic mb-4">
          "Учир нь миний сонирхол юм."
        </p>
        <p className="text-xs sm:text-sm text-amber-200/70 max-w-xl mx-auto leading-relaxed">
          Хүн өөрийн дуртай зүйлээ хийхэд хэзээ ч ядрахгүй, үргэлж урагшилж чаддаг. Эрхэмбаярын хувьд код бичих ба сагсан бөмбөг тоглох нь түүний амьдралын хамгийн том сонирхол ба урам зориг юм!
        </p>
      </section>
    </div>
  );
};
