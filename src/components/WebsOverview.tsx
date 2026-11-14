import React from 'react';
import {
  Globe,
  Code2,
  User,
  Rocket,
  PlaySquare,
  ExternalLink,
  ArrowRight,
  Eye,
  Sparkles,
  Layers,
  CheckCircle,
  X,
  Heart,
  Gamepad2
} from 'lucide-react';
import { WEB_PROJECTS, ERKA_PROFILE, WebProject } from '../data/portfolio';
import { ActiveTab } from './Navbar';

interface WebsOverviewProps {
  onSelectTab: (tab: ActiveTab) => void;
  onOpenExercise?: (id: string) => void;
}

export const WebsOverview: React.FC<WebsOverviewProps> = ({ onSelectTab }) => {
  const [previewProject, setPreviewProject] = React.useState<WebProject | null>(null);

  const getTargetTab = (id: string): ActiveTab => {
    switch (id) {
      case 'js-exercises': return 'exercises';
      case 'erka-first-web': return 'about';
      case 'erka-future-job': return 'future';
      case 'erka-youtube': return 'youtube';
      case 'anime-guess': return 'anime-guess';
      default: return 'exercises';
    }
  };

  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5 text-amber-400" />;
      case 'User': return <User className="w-5 h-5 text-rose-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-emerald-400" />;
      case 'PlaySquare': return <PlaySquare className="w-5 h-5 text-red-400" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5 text-amber-300" />;
      default: return <Globe className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <div className="space-y-10 py-4">
      {/* Warm Hero Header with Erka & Brother Photo */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#231217] via-[#2a131b] to-[#1c0d12] border border-amber-900/50 p-6 sm:p-10 shadow-2xl shadow-red-950/40">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
          {/* Text Bio */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-amber-700/50 text-amber-200 text-xs font-bold mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Erka's Warm Portfolio & Game Hub 🔥</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-amber-100 tracking-tight leading-tight">
              Эрхэмбаярын Бүтээсэн <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-300 via-amber-100 to-red-400 bg-clip-text text-transparent">
                Бүх Вебүүдийн Хаб
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-amber-100/80 leading-relaxed">
              Сайн байна уу! Миний нэрийг Эрхэмбаяр гэдэг. Би 13 настай. Энд миний бүтээсэн бүх веб хуудсууд, тоглоомууд, ирээдүйн зорилго болон дүүтэйгээ авхуулсан дурсамжит зураг маань хамтдаа байрлаж байна.
            </p>

            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-3">
              <button
                onClick={() => onSelectTab('about')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-700 via-amber-600 to-amber-700 hover:from-red-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-950/50 transition-all hover:scale-105 active:scale-95 ring-1 ring-amber-400/40"
              >
                <User className="w-4 h-4" />
                <span>Миний & Дүүгийн тухай</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Erka & Brother Photo Card */}
          <div className="relative group shrink-0">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-amber-400/70 shadow-2xl shadow-amber-950/80 bg-stone-900 ring-4 ring-red-900/40">
              <img
                src={ERKA_PROFILE.photoWithBrother}
                alt="Эрхэмбаяр дүүгийнхээ хамт"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-amber-300 flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                    <span>Family & Warm Memories</span>
                  </div>
                  <div className="text-sm font-black text-white">
                    Эрхэмбаяр дүүтэйгээ хамт
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-red-600 to-amber-600 text-white px-3.5 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 border border-amber-300/40">
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Ах дүү хоёр</span>
            </div>
          </div>
        </div>

        {/* Warm Stats Grid */}
        <div className="mt-8 pt-8 border-t border-amber-900/40 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#1b0d11]/70 p-3.5 rounded-2xl border border-amber-900/40">
            <div className="text-2xl font-black text-amber-400">5 Веб</div>
            <div className="text-xs text-amber-200/70">Бүрэн бүтээгдсэн сайт & тоглоом</div>
          </div>
          <div className="bg-[#1b0d11]/70 p-3.5 rounded-2xl border border-amber-900/40">
            <div className="text-2xl font-black text-emerald-400">13 Настай</div>
            <div className="text-xs text-amber-200/70">Сурагч хөгжүүлэгч</div>
          </div>
          <div className="bg-[#1b0d11]/70 p-3.5 rounded-2xl border border-amber-900/40">
            <div className="text-2xl font-black text-rose-400">🏀 Сагс & Код</div>
            <div className="text-xs text-amber-200/70">Дуртай спорт ба хобби</div>
          </div>
        </div>
      </section>

      {/* Prominent Origin Websites Quick Bar */}
      <div className="bg-gradient-to-r from-red-950/80 via-[#2a141b] to-amber-950/80 border-2 border-amber-400/80 p-4 sm:p-5 rounded-3xl shadow-xl shadow-amber-950/40 flex flex-col md:flex-row items-center justify-between gap-4 ring-1 ring-amber-400/40">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/70 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-black text-amber-100 flex items-center gap-2 justify-center sm:justify-start">
              <span>🌐 Эх Вэбүүд & Тоглоом (Original Websites)</span>
              <span className="text-[10px] bg-red-900/80 text-amber-200 border border-red-700/60 px-2 py-0.5 rounded-full font-bold">
                Origin Live
              </span>
            </div>
            <p className="text-xs text-amber-200/80 mt-0.5">
              Эрхэмбаярын Netlify болон AI Studio дээр байршуулсан үндсэн эх сайтууд
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="https://genuine-blancmange-197e49.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1d0d12] hover:bg-[#2b141b] text-amber-100 hover:text-white border-2 border-amber-400 hover:border-amber-300 text-xs font-black transition-all shadow-md shadow-black/50 hover:scale-105 active:scale-95 ring-1 ring-amber-400/30"
          >
            <span>💻 JS Бодлогын Сан (Origin)</span>
            <ExternalLink className="w-4 h-4 text-amber-300" />
          </a>
          <a
            href="https://flourishing-malabi-935183.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1d0d12] hover:bg-[#2b141b] text-amber-100 hover:text-white border-2 border-amber-400 hover:border-amber-300 text-xs font-black transition-all shadow-md shadow-black/50 hover:scale-105 active:scale-95 ring-1 ring-amber-400/30"
          >
            <span>👤 Миний Веб & YouTube (Origin)</span>
            <ExternalLink className="w-4 h-4 text-amber-300" />
          </a>
          <a
            href="https://ai.studio/apps/d75c8c39-975a-4fc7-a3de-c843d1241497"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-900/90 to-amber-900/90 hover:from-red-800 hover:to-amber-800 text-amber-100 hover:text-white border-2 border-amber-300 hover:border-amber-200 text-xs font-black transition-all shadow-md shadow-black/50 hover:scale-105 active:scale-95 ring-1 ring-amber-400/40"
          >
            <span>🎮 Anime Guess Game (Origin)</span>
            <ExternalLink className="w-4 h-4 text-amber-300" />
          </a>
        </div>
      </div>

      {/* Projects Showcase Cards in Warm Style */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-amber-100 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>Веб Төслүүдийн Дэлгэрэнгүй</span>
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/70 mt-1">
              Төсөл бүрийг дотор нь нээж ашиглах эсвэл шууд эх хувилбараар нь шалгах боломжтой
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WEB_PROJECTS.map((project) => {
            const targetTab = getTargetTab(project.id);
            return (
              <div
                key={project.id}
                className="group relative bg-[#201014]/80 border border-amber-900/40 hover:border-amber-700/60 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#2c151c] border border-amber-900/50 flex items-center justify-center shrink-0 shadow-inner">
                        {getProjectIcon(project.icon)}
                      </div>
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border mb-1 bg-amber-500/20 text-amber-300 border-amber-500/30">
                          {project.badge}
                        </span>
                        <h3 className="font-bold text-lg text-amber-100 group-hover:text-amber-300 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed mb-4">
                    {project.summary}
                  </p>

                  {/* Features list */}
                  <div className="space-y-1.5 mb-5 bg-[#170a0e]/60 p-3.5 rounded-2xl border border-amber-900/30">
                    <div className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider mb-1">
                      Онцлог боломжууд
                    </div>
                    {project.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-stone-200">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono bg-[#281318] text-amber-300/80 px-2 py-0.5 rounded-lg border border-amber-900/40"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons with prominent Origin button */}
                <div className="pt-4 border-t border-amber-900/40 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectTab(targetTab)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-600 hover:to-amber-600 text-white font-bold text-xs transition-colors shadow-md shadow-red-950/40"
                    >
                      <span>Энд нээх</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setPreviewProject(project)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2a141b] hover:bg-[#341b23] text-amber-200 text-xs font-semibold border border-amber-900/50 transition-colors"
                      title="Вэб дотор урьдчилан харах"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Live Preview</span>
                    </button>
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-950/90 via-[#271319] to-amber-950/90 hover:from-amber-900 hover:to-[#381a24] text-amber-100 hover:text-white border-2 border-amber-400/80 hover:border-amber-300 font-bold text-sm shadow-md shadow-amber-950/50 transition-all hover:scale-105 active:scale-95 ring-1 ring-amber-400/30"
                    title="Эх хувилбарыг шинэ цонхонд нээх"
                  >
                    <span>🌐 Эх сайт (Origin)</span>
                    <ExternalLink className="w-4 h-4 text-amber-300 shrink-0" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Author Callout Banner with Erka & Brother photo */}
      <section className="bg-gradient-to-r from-[#2a131a] via-[#1f0d13] to-[#261218] border border-amber-900/50 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-lg shadow-amber-950/80 shrink-0">
            <img
              src={ERKA_PROFILE.photoWithBrother}
              alt="Erka with Brother"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
              <span>Бүтээгч: {ERKA_PROFILE.name} ({ERKA_PROFILE.nickname})</span>
              <span className="text-xs bg-red-950 text-amber-300 border border-red-700/60 px-2 py-0.2 rounded-full">
                13 нас
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-amber-100/80 mt-0.5">
              "{ERKA_PROFILE.dream}"
            </p>
            <div className="flex items-center gap-3 text-xs text-amber-300/70 mt-2">
              <span>🏀 Сагсан бөмбөг</span>
              <span>•</span>
              <span>👶 Бяцхан дүү</span>
              <span>•</span>
              <span>🍲 Жеюүг</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onSelectTab('about')}
          className="shrink-0 px-4 py-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 border border-amber-500/40 font-bold text-xs transition-colors"
        >
          Дүүтэйгээ авахуулсан зургийг үзэх →
        </button>
      </section>

      {/* Live Preview Modal */}
      {previewProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="bg-[#1b0d11] border border-amber-900/60 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-3.5 bg-[#14080b] border-b border-amber-900/50 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-semibold text-amber-200 truncate ml-2">
                  {previewProject.title} — {previewProject.url}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#271217] hover:bg-stone-800 text-amber-200 text-xs"
                  title="Шинэ таб дээр нээх"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setPreviewProject(null)}
                  className="p-1.5 rounded-lg bg-[#271217] hover:bg-rose-500/30 text-amber-200 hover:text-rose-300 transition-colors"
                  title="Хаах"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {previewProject.externalOnlyPreview ? (
              <div className="flex-1 bg-[#1b0d11] flex flex-col items-center justify-center p-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400/60 flex items-center justify-center text-amber-300">
                  <Gamepad2 className="w-8 h-8" />
                </div>
                <div className="max-w-md space-y-2">
                  <h3 className="text-xl font-black text-amber-100">
                    {previewProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
                    Google AI Studio аппууд нь аюулгүй байдлын үүднээс бусад сайтын цонх (iframe) дотор нээгдэхийг зөвшөөрдөггүй. Та доорх товч дээр дарж эх тоглоомоо шинэ цонхонд шууд нээх эсвэл манай веб хабын тоглоом руу орж тоглоорой!
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={previewProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-700 via-amber-600 to-amber-700 hover:from-red-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg border-2 border-amber-300/80 transition-all hover:scale-105"
                  >
                    <span>🌐 Эх AI Studio тоглоом нээх</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => {
                      setPreviewProject(null);
                      onSelectTab('anime-guess');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2a141b] hover:bg-[#341b23] text-amber-100 border border-amber-900/60 font-bold text-sm transition-colors"
                  >
                    <span>🎮 Энд тоглох & Leaderboard</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 bg-white relative">
                <iframe
                  src={previewProject.url}
                  title={previewProject.title}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
