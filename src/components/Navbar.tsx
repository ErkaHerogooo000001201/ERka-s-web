import React from 'react';
import {
  Globe,
  Code2,
  User,
  Rocket,
  PlaySquare,
  Volume2,
  VolumeX,
  ExternalLink,
  Menu,
  X,
  Gamepad2,
  LogIn,
  LogOut
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { ERKA_PROFILE, WEB_PROJECTS } from '../data/portfolio';

export type ActiveTab =
  | 'overview'
  | 'exercises'
  | 'anime-guess'
  | 'about'
  | 'future'
  | 'youtube';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  authUser: FirebaseUser | null;
  onGoogleSignIn: () => Promise<void>;
  onGoogleSignOut: () => Promise<void>;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  authUser,
  onGoogleSignIn,
  onGoogleSignOut
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [linksDropdownOpen, setLinksDropdownOpen] = React.useState(false);

  const navItems = [
    { id: 'overview' as ActiveTab, label: 'Бүх Вебүүд', icon: Globe, count: '5' },
    { id: 'exercises' as ActiveTab, label: 'JS Бодлого', icon: Code2, count: '14' },
    { id: 'anime-guess' as ActiveTab, label: 'Guess Games', icon: Gamepad2, count: '2' },
    { id: 'about' as ActiveTab, label: 'Миний Тухай', icon: User },
    { id: 'future' as ActiveTab, label: 'Зорилго', icon: Rocket },
    { id: 'youtube' as ActiveTab, label: 'YouTube', icon: PlaySquare, count: '5' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#160d10]/90 backdrop-blur-xl border-b border-amber-900/30 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand with photo of Erka & brother */}
          <div
            onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-amber-500/70 shadow-lg shadow-amber-950/60 group-hover:border-amber-300 transition-all">
              <img
                src={ERKA_PROFILE.photoWithBrother}
                alt="Erka with Brother"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base tracking-tight text-amber-100 group-hover:text-amber-300 transition-colors">
                  Erka's Web Hub
                </span>
                <span className="text-[10px] bg-amber-950/80 text-amber-200 border border-amber-600/50 px-2 py-0.5 rounded-full font-bold hidden xl:inline-flex items-center gap-1">
                  🔥 Warm Hub
                </span>
              </div>
              <p className="text-[11px] text-amber-200/70 font-medium hidden sm:block">
                Эрхэмбаяр дүүгийн хамт • Веб ертөнц
              </p>
            </div>
          </div>

          {/* Desktop Nav Tabs with warm colors */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#221317]/80 p-1.5 rounded-2xl border border-amber-900/40 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-red-700 via-amber-600 to-amber-700 text-white shadow-md shadow-red-950/60 ring-1 ring-amber-400/30'
                      : 'text-amber-200/70 hover:text-amber-100 hover:bg-amber-950/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-200' : 'text-amber-400/80'}`} />
                  <span>{item.label}</span>
                  {item.count && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-black/30 text-amber-200' : 'bg-stone-900 text-amber-300/80'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions & Links */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Auth Button */}
            {authUser ? (
              <button
                onClick={onGoogleSignOut}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#221317] hover:bg-[#2d181e] border border-amber-700/40 text-amber-200 text-xs font-semibold transition-colors"
                title={`${authUser.displayName || authUser.email} — Гарах`}
              >
                {authUser.photoURL ? (
                  <img
                    src={authUser.photoURL}
                    alt={authUser.displayName || 'User'}
                    className="w-5 h-5 rounded-full object-cover border border-amber-400/50"
                  />
                ) : (
                  <User className="w-3.5 h-3.5 text-amber-300" />
                )}
                <span className="max-w-[80px] truncate">{authUser.displayName?.split(' ')[0] || 'Тоглогч'}</span>
                <LogOut className="w-3 h-3 text-amber-400/70" />
              </button>
            ) : (
              <button
                onClick={onGoogleSignIn}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-950/70 hover:bg-amber-900/70 border border-amber-500/50 text-amber-100 text-xs font-bold transition-colors"
                title="Google бүртгэлээр нэвтрэх"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-300" />
                <span>Нэвтрэх</span>
              </button>
            )}

            {/* Origin Websites Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLinksDropdownOpen(!linksDropdownOpen)}
                className="flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-amber-950/90 via-[#271319] to-amber-950/90 hover:from-amber-900 hover:to-[#381a24] text-amber-100 hover:text-white px-3.5 py-2 rounded-xl border-2 border-amber-400/70 hover:border-amber-300 shadow-md shadow-amber-950/50 transition-all ring-1 ring-amber-400/30 active:scale-95"
                title="Эх Netlify & AI Studio хувилбарууд руу очих"
              >
                <ExternalLink className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="hidden sm:inline">🌐 Origin</span>
              </button>

              {linksDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 bg-[#1c1013] border border-amber-900/50 rounded-2xl shadow-2xl p-2 z-50 text-xs"
                  onClick={() => setLinksDropdownOpen(false)}
                >
                  <div className="px-2 py-1.5 font-bold text-amber-400 uppercase text-[10px] tracking-wider flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Эх Сайтууд & Тоглоом (Origin)</span>
                  </div>
                  {WEB_PROJECTS.map((proj) => (
                    <a
                      key={proj.id}
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-amber-950/40 text-stone-200 transition-colors group"
                    >
                      <div className="truncate mr-2">
                        <div className="font-semibold text-amber-100 group-hover:text-amber-300 truncate">
                          {proj.title}
                        </div>
                        <div className="text-[10px] text-amber-400/50 truncate">{proj.url}</div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 shrink-0" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                soundEnabled
                  ? 'bg-amber-950/50 border-amber-500/40 text-amber-300 hover:bg-amber-900/50'
                  : 'bg-[#221317] border-amber-900/40 text-stone-500 hover:text-stone-300'
              }`}
              title={soundEnabled ? 'Дуу асаалттай' : 'Дуу хаагдсан'}
              aria-label="Toggle sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#221317] border border-amber-900/40 text-amber-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#180e12] border-b border-amber-900/40 px-4 pt-2 pb-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive
                    ? 'bg-gradient-to-r from-red-700 to-amber-700 text-white shadow-md'
                    : 'text-amber-200/80 hover:bg-amber-950/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-black/30 text-amber-300">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-amber-900/30">
            {authUser ? (
              <button
                onClick={() => { onGoogleSignOut(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#221317] text-amber-200 text-sm font-semibold"
              >
                <span>Гарах ({authUser.displayName || authUser.email})</span>
                <LogOut className="w-4 h-4 text-amber-400" />
              </button>
            ) : (
              <button
                onClick={() => { onGoogleSignIn(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-100 text-sm font-bold"
              >
                <span>Google-ээр нэвтрэх</span>
                <LogIn className="w-4 h-4 text-amber-300" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
