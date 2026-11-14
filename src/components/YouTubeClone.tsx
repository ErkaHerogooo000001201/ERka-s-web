import React, { useState } from 'react';
import { 
  PlaySquare, 
  Search, 
  ExternalLink,
  ThumbsUp,
  Share2
} from 'lucide-react';
import { YOUTUBE_VIDEOS, VideoItem } from '../data/portfolio';

export const YouTubeClone: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(YOUTUBE_VIDEOS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Game', 'Live', 'Anime', 'Music'];

  const filteredVideos = YOUTUBE_VIDEOS.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.channel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || video.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 py-4">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#201014]/80 border border-amber-900/40 p-4 sm:p-5 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-700 flex items-center justify-center text-white shadow-lg shadow-red-950/60 ring-1 ring-amber-400/30">
            <PlaySquare className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-amber-100">Erka's YouTube Video Hub</h2>
              <span className="text-[10px] bg-red-950 text-amber-200 border border-red-700/50 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <span>🔥</span>
                <span>Warm Edition</span>
              </span>
            </div>
            <p className="text-xs text-amber-200/70">
              Эрхэмбаярын дуртай тоглоом, сонирхолтой контентуудын цуглуулга
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Видео хайх..."
              className="w-full bg-[#160a0e] border border-amber-900/40 text-xs rounded-xl pl-9 pr-3 py-2 text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Noticeable & slightly bigger Origin button */}
          <a
            href="https://flourishing-malabi-935183.netlify.app/youtube"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-950/90 via-[#271319] to-amber-950/90 hover:from-amber-900 hover:to-[#381a24] text-amber-100 hover:text-white border-2 border-amber-400/80 hover:border-amber-300 font-bold text-sm shadow-md shadow-amber-950/50 transition-all hover:scale-105 active:scale-95 ring-1 ring-amber-400/30"
            title="Эх Netlify YouTube хуудсыг шинэ цонхонд нээх"
          >
            <ExternalLink className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="hidden sm:inline">🌐 Эх сайт (Origin)</span>
            <span className="sm:hidden">Эх сайт</span>
          </a>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-all shrink-0 ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-red-700 to-amber-700 text-white shadow-md shadow-red-950/40 ring-1 ring-amber-400/30'
                : 'bg-[#221217] text-amber-200/70 hover:text-amber-100 hover:bg-stone-800 border border-amber-900/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Cinema View & Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Video Cinema Player */}
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-video w-full rounded-3xl overflow-hidden bg-black border border-amber-900/40 shadow-2xl">
            <iframe
              src={selectedVideo.embedUrl}
              title={selectedVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Video Metadata */}
          <div className="bg-[#201014]/80 border border-amber-900/40 p-5 rounded-3xl space-y-4">
            <h1 className="text-base sm:text-lg font-bold text-amber-100">
              {selectedVideo.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-amber-900/30">
              <div className="flex items-center gap-3">
                <img
                  src={selectedVideo.channelAvatar}
                  alt={selectedVideo.channel}
                  className="w-10 h-10 rounded-full object-cover border border-amber-700/50"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTM5LnBuZw.png";
                  }}
                />
                <div>
                  <div className="font-bold text-sm text-amber-100">{selectedVideo.channel}</div>
                  <div className="text-[11px] text-amber-400/60">{selectedVideo.views || '1.2M views'} • {selectedVideo.timeAgo || 'Саяхан'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleLike(selectedVideo.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    liked[selectedVideo.id]
                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                      : 'bg-[#2a1319] text-amber-200 border-amber-900/40 hover:bg-[#341b22]'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{liked[selectedVideo.id] ? 'Liked' : 'Like'}</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedVideo.embedUrl);
                    alert("Бичлэгийн холбоосыг хууллаа!");
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#2a1319] text-amber-200 border border-amber-900/40 hover:bg-[#341b22]"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Хуваалцах</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Playlist Sidebar */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-amber-400/80 uppercase tracking-wider px-1 flex items-center justify-between">
            <span>Бусад видеонууд ({filteredVideos.length})</span>
            <span className="text-[10px] text-amber-400">Сонгож үзэх</span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredVideos.map((video) => {
              const isPlaying = selectedVideo.id === video.id;
              return (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`p-2.5 rounded-2xl border cursor-pointer transition-all flex gap-3 ${
                    isPlaying
                      ? 'bg-gradient-to-r from-red-950/60 to-amber-950/60 border-amber-500/50 shadow-md ring-1 ring-amber-500/30'
                      : 'bg-[#201014]/60 border-amber-900/30 hover:border-amber-700/50 hover:bg-[#28141a]'
                  }`}
                >
                  <div className="relative w-28 sm:w-32 aspect-video rounded-xl overflow-hidden shrink-0 bg-black flex items-center justify-center border border-amber-900/40">
                    <img
                      src={video.channelAvatar}
                      alt={video.title}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <PlaySquare className={`w-6 h-6 ${isPlaying ? 'text-red-500' : 'text-amber-200/80'}`} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xs font-bold line-clamp-2 ${isPlaying ? 'text-amber-200' : 'text-stone-200'}`}>
                      {video.title}
                    </h4>
                    <div className="text-[10px] text-amber-400/60 mt-1">{video.channel}</div>
                    <div className="text-[10px] text-stone-500">{video.views}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
