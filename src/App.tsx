import React, { useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { Navbar, ActiveTab } from './components/Navbar';
import { WebsOverview } from './components/WebsOverview';
import { JsExercisesView } from './components/JsExercisesView';
import { AboutErka } from './components/AboutErka';
import { FutureJob } from './components/FutureJob';
import { YouTubeClone } from './components/YouTubeClone';
import { AnimeGuessHub } from './components/AnimeGuessHub';
import { ERKA_PROFILE, WEB_PROJECTS } from './data/portfolio';
import { signInWithGoogle, signOutUser, subscribeAuth } from './firebase';
import { Heart, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [targetExerciseId, setTargetExerciseId] = useState<string | undefined>();
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsub = subscribeAuth((user) => {
      setAuthUser(user);
    });
    return () => unsub();
  }, []);

  const handleOpenExercise = (id: string) => {
    setTargetExerciseId(id);
    setActiveTab('exercises');
  };

  const handleGoogleSignIn = async (): Promise<FirebaseUser | null> => {
    try {
      const user = await signInWithGoogle();
      setAuthUser(user);
      return user;
    } catch (err) {
      console.error('Google Sign-In failed:', err);
      return null;
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await signOutUser();
      setAuthUser(null);
    } catch (err) {
      console.error('Sign-Out failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#13070a] text-amber-100 flex flex-col selection:bg-red-600 selection:text-white relative overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        authUser={authUser}
        onGoogleSignIn={async () => { await handleGoogleSignIn(); }}
        onGoogleSignOut={handleGoogleSignOut}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
        {activeTab === 'overview' && (
          <WebsOverview
            onSelectTab={setActiveTab}
            onOpenExercise={handleOpenExercise}
          />
        )}

        {activeTab === 'exercises' && (
          <JsExercisesView
            soundEnabled={soundEnabled}
            initialExerciseId={targetExerciseId}
          />
        )}

        {activeTab === 'anime-guess' && (
          <AnimeGuessHub
            soundEnabled={soundEnabled}
            authUser={authUser}
            onGoogleSignIn={handleGoogleSignIn}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'about' && (
          <AboutErka onSelectTab={setActiveTab} />
        )}

        {activeTab === 'future' && (
          <FutureJob onSelectTab={setActiveTab} />
        )}

        {activeTab === 'youtube' && (
          <YouTubeClone />
        )}
      </main>

      {/* Global Warm Footer */}
      <footer className="border-t border-amber-900/40 bg-[#0f0406]/95 py-10 mt-12 text-xs text-amber-200/70 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-amber-400/60 shrink-0">
                <img
                  src={ERKA_PROFILE.photoWithBrother}
                  alt="Erka with Brother"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-bold text-amber-100">Erka's Web Hub</span>
                <span className="text-amber-500/40 mx-2">•</span>
                <span>Эрхэмбаяр дүүгийн хамт</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {WEB_PROJECTS.map((proj) => (
                <a
                  key={proj.id}
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#1a0c10] border border-amber-900/50 hover:border-amber-400 text-amber-200 hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold shadow-sm"
                  title="Эх хувилбар руу очих"
                >
                  <span>🌐 {proj.title.split(' (')[0]} (Origin)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-amber-900/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-amber-200/60">
            <div>
              © 2026 {ERKA_PROFILE.name} ({ERKA_PROFILE.nickname}). Бүх эрх хуулиар хамгаалагдсан.
            </div>
            <div className="flex items-center gap-1.5 text-amber-300/80">
              <span>Made with love for family, coding</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>& basketball</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
