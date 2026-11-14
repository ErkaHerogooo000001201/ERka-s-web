export interface WebProject {
  id: string;
  title: string;
  subtitle: string;
  category: 'Coding & Logic' | 'Personal & Portfolio' | 'Career & Dreams' | 'Media & Entertainment' | 'Games & Fun';
  badge: string;
  badgeColor: string;
  url: string;
  externalOnlyPreview?: boolean;
  summary: string;
  features: string[];
  tags: string[];
  icon: string;
  stats?: { label: string; value: string }[];
}

export interface VideoItem {
  id: string;
  title: string;
  category: 'All' | 'Music' | 'Game' | 'Live' | 'Anime';
  embedUrl: string;
  channel: string;
  channelAvatar: string;
  views?: string;
  timeAgo?: string;
}

export const ERKA_PROFILE = {
  name: "Эрхэмбаяр",
  nickname: "Erka",
  email: "erkhembayar1ch@gmail.com",
  age: 13,
  birthday: "12-р сарын 1",
  birthYear: 2013,
  role: "Junior Web Developer & Game Enthusiast",
  dream: "IT инженер болж, хит тоглоом хөгжүүлж дэлхийд нэрд гарах, мөн шилдэг сагсан бөмбөгийн тамирчин болох.",
  photoWithBrother: "/assets/aistudio/image_699f191e.png",
  curryPhoto: "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/08/1200/675/Stephen-Curry4.jpg?ve=1&tl=1",
  favoritePlayer: "Stephen Curry (#30 Golden State Warriors)",
  favoriteFood: "Жеюүг (Солонгос амтат халуун ногоотой хуурсан мах)",
  family: {
    brother: "Хөөрхөн дүү (Ах дүү хоёрын дурсамжит зураг)",
    caption: "Эрхэмбаяр бяцхан дүүгийнхээ хамт ❤️✨"
  },
  pet: {
    name: "Цэцэгхэн",
    type: "Туулай 🐰",
    memory: "Надад Цэцэгхэн нэртэй хөөрхөн туулай байсан."
  },
  animes: [
    { title: "My Hero Academia", japanese: "僕のヒーローアカデミア", emoji: "🥦💥🦸", desc: "Бүтэн үзсэн", color: "from-emerald-500 to-green-600" },
    { title: "Demon Slayer", japanese: "鬼滅の刃", emoji: "🗡️🌸👹", desc: "Бүтэн үзсэн", color: "from-rose-500 to-red-600" },
    { title: "Jujutsu Kaisen", japanese: "呪術廻戦", emoji: "🤞🟣👁️", desc: "Бүтэн үзсэн", color: "from-indigo-500 to-purple-600" }
  ],
  games: [
    { name: "Mobile Legends: Bang Bang", genre: "MOBA", icon: "⚔️", level: "Active Player", color: "from-blue-600 to-indigo-800" },
    { name: "Brawl Stars", genre: "Action Brawler", icon: "⭐", level: "Active Player", color: "from-amber-500 to-orange-600" },
    { name: "Standoff 2", genre: "Tactical FPS", icon: "🎯", level: "Active Player", color: "from-red-600 to-rose-800" },
    { name: "Roblox", genre: "Sandbox & Minigames", icon: "🧱", level: "Active Player", color: "from-slate-700 to-slate-900" }
  ],
  skillsGoal: {
    it: [
      { skill: "Код бичиж сурах (JavaScript, HTML, CSS)", level: 85, icon: "💻" },
      { skill: "Сайн зурах ба дизайн гаргах", level: 75, icon: "🎨" },
      { skill: "Тоглоом хөгжүүлэх логик & алгоритм", level: 80, icon: "🕹️" }
    ],
    basketball: [
      { skill: "Тэнхээ, тэсвэр хатуужилтай болох", level: 88, icon: "⚡" },
      { skill: "Оновчтой шидэлт & бөмбөг залгуулалт", level: 82, icon: "🏀" },
      { skill: "Багийн тоглолт, хурдтай сэтгэлгээ", level: 85, icon: "🏆" }
    ]
  }
};

export const WEB_PROJECTS: WebProject[] = [
  {
    id: "js-exercises",
    title: "JS Exercises Dashboard (Бодлогын сан)",
    subtitle: "Хичээл 8–11 интерактив JavaScript дасгалууд",
    category: "Coding & Logic",
    badge: "14 Interactive Exercises",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    url: "https://genuine-blancmange-197e49.netlify.app",
    summary: "JavaScript-ийн математик, нөхцөлт шалгалт, for давталт, массивын алгоритмуудыг шууд оролт өгөн ажиллуулж шалгах боломжтой бүрэн хэмжээний систем.",
    features: [
      "14 интерактив бодлого бүрэн ажиллагаатай",
      "Оролт (prompt), гаралт (alert, console.log) дэмжигч",
      "Кодын тайлбар, шаталсан бодолт ба пресетүүд",
      "Шууд код засах ба турших sandbox горим"
    ],
    tags: ["JavaScript", "Algorithm", "Interactive Hub", "Netlify"],
    icon: "Code2",
    stats: [
      { label: "Бодлогын тоо", value: "14" },
      { label: "Хичээлүүд", value: "8, 9, 10, 11" },
      { label: "Кодын төрөл", value: "JS ES6+" }
    ]
  },
  {
    id: "erka-first-web",
    title: "Erka's First Web (Миний Анхны Веб)",
    subtitle: "Эрхэмбаярын анхны хувийн танилцуулга хуудас",
    category: "Personal & Portfolio",
    badge: "First Creation",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    url: "https://flourishing-malabi-935183.netlify.app/",
    summary: "Эрхэмбаярын хамгийн анх бичсэн өөрийн тухай вэб хуудас. Төрсөн өдөр, сагсан бөмбөгийн сонирхол, анимэ, тоглоомууд ба туулай Цэцэгхэний түүх.",
    features: [
      "Стивен Карригийн зурагтай сагсны булан",
      "Дуртай 3 анимэгийн жагсаалт (MHA, Demon Slayer, JJK)",
      "Дуртай хоол: Жеюүг",
      "Тоглодог 4 гол тоглоом & туулайн дурсамж"
    ],
    tags: ["HTML5", "CSS", "First Web", "Netlify"],
    icon: "User",
    stats: [
      { label: "Нас", value: "13 настай" },
      { label: "Төрсөн өдөр", value: "12 сарын 1" },
      { label: "Дуртай тамирчин", value: "Stephen Curry" }
    ]
  },
  {
    id: "erka-future-job",
    title: "My Future Job (Мөрөөдлийн Ажил)",
    subtitle: "IT инженер, тоглоом хөгжүүлэгч & Сагсчин болох зорилго",
    category: "Career & Dreams",
    badge: "Big Ambitions",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    url: "https://flourishing-malabi-935183.netlify.app/Erka's%20file.html",
    summary: "Ирээдүйд IT инженер болж, хит тоглоом бүтээж нэрд гарах, мөн мэргэжлийн сагсны тамирчин болох зорилгын тухай веб хуудас.",
    features: [
      "IT чиглэлээр: Код бичиж сурах, сайн зурах",
      "Сагсан бөмбөгөөр: Тэнхээтэй болох, оновчтой шидэх",
      "'Яагаад энэ ажил вэ?' зорилгын тайлбар",
      "Сонирхол ба ирээдүйн алсын хараа"
    ],
    tags: ["Career Goal", "Game Dev", "Basketball", "IT Engineering"],
    icon: "Rocket",
    stats: [
      { label: "Зорилтот мэргэжил", value: "IT инженер" },
      { label: "Чиглэл", value: "Game Development" },
      { label: "Спорт", value: "Basketball" }
    ]
  },
  {
    id: "erka-youtube",
    title: "My Own YouTube (Эрхэмбаярын YouTube)",
    subtitle: "Эркагийн өөрийн зохион бүтээсэн видео платформ",
    category: "Media & Entertainment",
    badge: "YouTube Clone UI",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    url: "https://flourishing-malabi-935183.netlify.app/youtube",
    summary: "Эрхэмбаярын сонирхдог шилдэг контентуудыг цуглуулсан тусгай YouTube клон веб хуудас. MrBeast, Brawl Stars, Roblox, MPL Live болон Спайси хоолны видеонууд.",
    features: [
      "YouTube UI зохиомж (Sidebar, Topbar, Search, Categories)",
      "Ангилал: All, Music, Game, Live, Anime",
      "Шууд үзэх YouTube IFrame тоглуулагч",
      "Шилдэг контент бүтээгчдийн видеонууд"
    ],
    tags: ["YouTube Clone", "Video Hub", "Interactive Media", "UI Layout"],
    icon: "PlaySquare",
    stats: [
      { label: "Видеоны тоо", value: "5+ шилдэг бичлэг" },
      { label: "Ангилал", value: "5 төрөл" },
      { label: "UI төрөл", value: "YouTube Layout" }
    ]
  },
  {
    id: "anime-guess",
    title: "Anime & Sport Guess Games",
    subtitle: "Анимэ & Спорт таах тоглоом + Firestore Leaderboard",
    category: "Games & Fun",
    badge: "AI Studio Game + Leaderboard",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    url: "https://ai.studio/apps/d75c8c39-975a-4fc7-a3de-c843d1241497",
    externalOnlyPreview: true,
    summary: "Эрхэмбаярын бүтээсэн Anime Guess болон Sport Guess тоглоомууд! Classic, Timed, Hard горимуудаар тоглож, дуусах үедээ нэрээ оруулан Firestore Leaderboard-д бүртгүүлээрэй.",
    features: [
      "Anime Guess ба Sport Guess хоёр төрлийн тоглоом",
      "Classic, Timed (60s), Hard горимын сонголт",
      "Тоглоом дуусахад нэр, оноо, горимыг Firestore-д хадгална",
      "Шууд эх AI Studio тоглоом руу холбогдсон"
    ],
    tags: ["Anime Guess", "Sport Guess", "Firestore", "Leaderboard"],
    icon: "Gamepad2",
    stats: [
      { label: "Төрөл", value: "Anime & Sport Quiz" },
      { label: "Горимууд", value: "Classic / Timed / Hard" },
      { label: "Өгөгдлийн сан", value: "Firebase Firestore" }
    ]
  }
];

export const YOUTUBE_VIDEOS: VideoItem[] = [
  {
    id: "plN7JMbadRg",
    title: "Eat everything In A Store, Win $1,000,000",
    category: "All",
    embedUrl: "https://www.youtube.com/embed/plN7JMbadRg?si=NbVFqkWbLAvCslZP",
    channel: "MrBeast",
    channelAvatar: "https://www.rw-designer.com/icon-image/22106-256x256x32.png",
    views: "185M views",
    timeAgo: "1 year ago"
  },
  {
    id: "D-EgFgTJOgk",
    title: "Help find Gus! (Brawl Stars Animations)",
    category: "Game",
    embedUrl: "https://www.youtube.com/embed/D-EgFgTJOgk?si=KbHNAmRjFUEgW4mM",
    channel: "Brawl Stars Animation",
    channelAvatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6ueRHobwBSDcdciwXmjhYbMYcIY5V2_WA_po7--hx7w&s=10",
    views: "12M views",
    timeAgo: "8 months ago"
  },
  {
    id: "NWt-biENmjg",
    title: "I Joined my LUCKIEST Admin Abuse EVER in Steal an Egg!",
    category: "Game",
    embedUrl: "https://www.youtube.com/embed/NWt-biENmjg?si=b0vFDAyqXsH3J2og",
    channel: "Roblox Gaming",
    channelAvatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3KmOtj54z4_9Mf36q6izg0jcqNYAcEbJzX0YXnFoNdw&s=10",
    views: "3.4M views",
    timeAgo: "4 months ago"
  },
  {
    id: "BxFJb1xcCRY",
    title: "🔴 LIVE | MPL PH S18 | ENGLISH - Week 8 Day 2",
    category: "Live",
    embedUrl: "https://www.youtube.com/embed/BxFJb1xcCRY?si=JWDpSjhx-TPkv8lv",
    channel: "Mobile Legends: Bang Bang Esports",
    channelAvatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb6C4CnY4hcCwgz9J7lwADc8G4reiVgVhw9EBpsbQNQg&s=10",
    views: "245K views",
    timeAgo: "Streamed live"
  },
  {
    id: "1fGScw5eX0M",
    title: "10 Levels Of Spicy Food Challenge",
    category: "All",
    embedUrl: "https://www.youtube.com/embed/1fGScw5eX0M?si=wuHH1gxXZxNshySR",
    channel: "Spicy Food Club",
    channelAvatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvwitKpmZ4j3tTs4rNRBMm7wjJw8nMp5SokD63x_gB8A&s",
    views: "8.9M views",
    timeAgo: "2 years ago"
  }
];
