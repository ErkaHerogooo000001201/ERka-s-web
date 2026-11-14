import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  Trophy, 
  Gamepad2, 
  Tv, 
  Utensils, 
  Heart, 
  ExternalLink, 
  Rocket, 
  PlaySquare, 
  Code2, 
  Mail,
  UserCheck,
  Baby
} from 'lucide-react';
import { ERKA_PROFILE } from '../data/portfolio';
import { ActiveTab } from './Navbar';

interface AboutErkaProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export const AboutErka: React.FC<AboutErkaProps> = ({ onSelectTab }) => {
  return (
    <div className="space-y-8 py-4">
      {/* Top Profile Header featuring Erka with Brother Photo */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#241217] via-[#2c151e] to-[#1c0d12] border border-amber-900/50 p-6 sm:p-10 shadow-2xl shadow-red-950/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          {/* Main Photo: Erka with his Little Brother */}
          <div className="relative group shrink-0">
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-amber-400/70 shadow-2xl shadow-amber-950/80 relative ring-4 ring-red-900/40">
              <img
                src={ERKA_PROFILE.photoWithBrother}
                alt="Эрхэмбаяр дүүгийн хамт"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                <div>
                  <div className="text-[10px] uppercase font-black tracking-wider text-amber-300 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                    <span>Гэр бүл • Дурсамж</span>
                  </div>
                  <div className="text-sm font-black text-white">
                    Эрхэмбаяр бяцхан дүүгийн хамт
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 text-white px-3.5 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1.5 border border-amber-300/40">
              <Baby className="w-3.5 h-3.5 text-amber-200" />
              <span>Ах Дүү хоёр ❤️</span>
            </div>
          </div>

          {/* Profile Bio */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-700/50 text-amber-200 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Хувийн танилцуулга & Гэр бүл</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-amber-100 tracking-tight">
              Сайн байна уу? <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-100 to-red-400 bg-clip-text text-transparent">
                Миний нэрийг {ERKA_PROFILE.name} гэдэг
              </span>
            </h1>

            <p className="mt-3 text-amber-100/80 text-sm sm:text-base leading-relaxed max-w-2xl">
              Би 13 настай. Миний төрсөн өдөр 12 сарын 1-нд болдог. Зураг дээрх нь миний хайртай бяцхан дүү бөгөөд бид хоёрын дурсамжит зураг юм. Би сагсан бөмбөг тоглох дуртай, чөлөөт цагаараа код бичих, тоглоом тоглох, анимэ үзэх дуртай!
            </p>

            {/* Quick Badges */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2.5">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#231217] border border-amber-900/50 text-xs text-amber-200">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Төрсөн өдөр: <strong>12-р сарын 1</strong></span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#231217] border border-amber-900/50 text-xs text-amber-200">
                <UserCheck className="w-3.5 h-3.5 text-rose-400" />
                <span>Нас: <strong>{ERKA_PROFILE.age} настай</strong></span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#231217] border border-amber-900/50 text-xs text-amber-200">
                <Baby className="w-3.5 h-3.5 text-emerald-400" />
                <span>Гэр бүл: <strong>Бяцхан дүүгийн ах</strong></span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#231217] border border-amber-900/50 text-xs text-amber-200">
                <Mail className="w-3.5 h-3.5 text-yellow-400" />
                <span>Имэйл: <strong>{ERKA_PROFILE.email}</strong></span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
              <button
                onClick={() => onSelectTab('future')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-700 to-amber-700 text-white font-bold text-xs shadow-lg shadow-red-950/40 hover:scale-105 active:scale-95 transition-all"
              >
                <Rocket className="w-4 h-4" />
                <span>Мөрөөдлийн Ажил & Зорилго</span>
              </button>
              <button
                onClick={() => onSelectTab('youtube')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2c141c] hover:bg-[#381a23] text-amber-100 border border-amber-900/50 font-bold text-xs transition-colors"
              >
                <PlaySquare className="w-4 h-4 text-red-400" />
                <span>Миний YouTube Хаб</span>
              </button>
              {/* Noticeable & slightly bigger Origin button */}
              <a
                href="https://flourishing-malabi-935183.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-950/90 via-[#271319] to-amber-950/90 hover:from-amber-900 hover:to-[#381a24] text-amber-100 hover:text-white border-2 border-amber-400/80 hover:border-amber-300 font-bold text-sm shadow-md shadow-amber-950/50 transition-all hover:scale-105 active:scale-95 ring-1 ring-amber-400/30"
                title="Эх Netlify хувилбарыг шинэ цонхонд нээх"
              >
                <span>🌐 Эх Netlify хуудас (Origin)</span>
                <ExternalLink className="w-4 h-4 text-amber-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Basketball & Stephen Curry Highlight */}
      <section className="bg-gradient-to-br from-[#241318] via-[#200f14] to-[#1c0d12] border border-amber-900/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-xl shrink-0">
          <img
            src={ERKA_PROFILE.curryPhoto}
            alt="Stephen Curry"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Би сагс тоглох дуртай!</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-100">
            Шүтээн: Stephen Curry (#30 Golden State Warriors)
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-amber-100/80 leading-relaxed">
            Сагсан бөмбөгийн талбай дээр оновчтой шидэлттэй, хурдтай, багийн тоглолттой болохын төлөө хичээллэдэг. Ирээдүйд мэргэжлийн сагсны тамирчин болох зорилготой.
          </p>
        </div>
      </section>

      {/* Grid: Anime & Gaming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Favorite Anime */}
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-amber-100 flex items-center gap-2">
              <Tv className="w-5 h-5 text-amber-400" />
              <span>Дуртай Анимэ (Бүтэн үзсэн)</span>
            </h2>
            <span className="text-xs bg-red-950 text-amber-300 border border-red-700/50 px-2.5 py-0.5 rounded-full font-bold">
              3 Шилдэг цуврал
            </span>
          </div>
          <p className="text-xs text-amber-200/80">
            "Миний дуртай анимэ, My Hero Academia, Demon Slayer, Jujutsu Kaisen бөгөөд хоёуланг нь бүтэн үзсэн."
          </p>

          <div className="space-y-3">
            {ERKA_PROFILE.animes.map((anime) => (
              <div
                key={anime.title}
                className="bg-[#170a0e]/70 border border-amber-900/30 hover:border-amber-700/60 p-4 rounded-2xl flex items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl p-2 rounded-xl bg-[#281318] border border-amber-900/40">
                    {anime.emoji}
                  </div>
                  <div>
                    <div className="font-bold text-amber-100 text-sm">{anime.title}</div>
                    <div className="text-xs text-amber-400/60">{anime.japanese}</div>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs font-bold">
                  ✓ {anime.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Games */}
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-amber-100 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-amber-400" />
              <span>Миний Тоглодог Тоглоомууд</span>
            </h2>
            <span className="text-xs bg-amber-950 text-amber-300 border border-amber-700/50 px-2.5 py-0.5 rounded-full font-bold">
              4 Тоглоом
            </span>
          </div>
          <p className="text-xs text-amber-200/80">
            "Миний тоглодог тоглоом, Mobile legends, Brawl stars, Standoff 2, Roblox."
          </p>

          <div className="grid grid-cols-2 gap-3">
            {ERKA_PROFILE.games.map((game) => (
              <div
                key={game.name}
                className="bg-[#170a0e]/70 border border-amber-900/30 hover:border-amber-700/60 p-3.5 rounded-2xl transition-all"
              >
                <div className="text-2xl mb-1.5">{game.icon}</div>
                <div className="font-bold text-amber-100 text-xs sm:text-sm truncate">{game.name}</div>
                <div className="text-[11px] text-amber-400/70">{game.genre}</div>
                <div className="mt-2 text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{game.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Food & Pet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Favorite Food */}
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-amber-400/80">Хамгийн дуртай хоол</div>
              <h3 className="text-xl font-bold text-amber-100">Жеюүг (Jeyuk Bokkeum) 🍲</h3>
            </div>
          </div>
          <p className="text-xs text-amber-100/80 leading-relaxed">
            Солонгос амтат халуун ногоотой хуурсан гахайн махтай хоол. Амтлаг ба халуун ногооны төгс зохицолтой учир хамгийн дуртай хоол минь юм!
          </p>
        </div>

        {/* Pet Rabbit */}
        <div className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-amber-400/80">Хайртай тэжээвэр амьтан</div>
              <h3 className="text-xl font-bold text-amber-100">Туулай Цэцэгхэн 🐰</h3>
            </div>
          </div>
          <p className="text-xs text-amber-100/80 leading-relaxed">
            "{ERKA_PROFILE.pet.memory}" Цагаан зөөлөн үстэй, үргэлж баяр хөөр бэлэглэдэг байсан нандин дурсамжтай найз минь юм.
          </p>
        </div>
      </div>
    </div>
  );
};
