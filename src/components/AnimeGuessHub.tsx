import React, { useEffect, useState } from 'react';
import {
  Gamepad2,
  ExternalLink,
  Trophy,
  Flame,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Eye,
  Link2,
  Clock,
  Save,
  Flag,
  Heart
} from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { playAudioChime } from '../utils/runner';
import { GameMode, GameName, saveGameScore } from '../firebase';
import { ActiveTab } from './Navbar';
import { LeaderboardView } from './LeaderboardView';

interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  emojiClue: string;
  hint1: string;
  hint2: string;
  options: string[];
  imageUrl: string;
  erkaFavorite?: boolean;
}

const ANIME_QUESTIONS: QuizQuestion[] = [
  {
    id: 'mha',
    title: 'My Hero Academia',
    subtitle: '僕のヒーローアカデミア',
    emojiClue: '🥦 💥 🦸‍♂️ 🏫',
    hint1: 'Хүмүүсийн 80% нь "Quirk" буюу супер хүчтэй дэлхийд хүчгүй төрсөн хүү баатар болохыг мөрөөднө.',
    hint2: 'Гол дүр нь Изуку Мидория (Deku) бөгөөд All Might-аас One For All хүчийг өвлөж авдаг.',
    options: ['My Hero Academia', 'One Punch Man', 'Black Clover', 'Naruto'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21459-nYh85uj2Fuwr.jpg',
    erkaFavorite: true
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer',
    subtitle: '鬼滅の刃',
    emojiClue: '🗡️ 🌊 🔥 🌸 👹',
    hint1: 'Гэр бүлээ чөтгөрүүдэд алдсан хүү дүү охиноо хүн болгохын тулд чөтгөрийн ангууч болдог.',
    hint2: 'Танжиро Камадо ба түүний дүү Незуко. Амьсгалын техникүүд (Water & Sun Breathing).',
    options: ['Bleach', 'Demon Slayer', 'Blue Exorcist', 'Attack on Titan'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101922-WBsBl0ClmgYL.jpg',
    erkaFavorite: true
  },
  {
    id: 'jjk',
    title: 'Jujutsu Kaisen',
    subtitle: '呪術廻戦',
    emojiClue: '🤞 🟣 👁️ 👹 ⚡',
    hint1: 'Хараалт хуруу залгиснаар ахлах сургуулийн сурагчийн биед Хараалуудын хаан оршино.',
    hint2: 'Южи Итадори ба хүчирхэг багш Сатору Гожо (Domain Expansion: Infinite Void).',
    options: ['Chainsaw Man', 'Jujutsu Kaisen', 'Tokyo Ghoul', 'Mob Psycho 100'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx113415-LHBAeoZDIsnF.jpg',
    erkaFavorite: true
  },
  {
    id: 'naruto',
    title: 'Naruto',
    subtitle: 'ナルト',
    emojiClue: '🍥 🦊 🍜 🥷',
    hint1: 'Биедээ Есөн сүүлт үнэг тамгалуулсан өнчин хүү тосгоныхоо хамгийн хүчирхэг Хокаге болохыг хүснэ.',
    hint2: 'Rasengan, Shadow Clone Jutsu, Коноха тосгон.',
    options: ['Naruto', 'Dragon Ball', 'Hunter x Hunter', 'One Piece'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20-dE6UHbFFg1A5.jpg'
  },
  {
    id: 'one-piece',
    title: 'One Piece',
    subtitle: 'ワンピース',
    emojiClue: '🏴‍☠️ 👒 🍖 ⛵',
    hint1: 'Сүрлэн малгайт хүү Далайн дээрэмчдийн хаан болохоор Гранд Лайнаар аялна.',
    hint2: 'Монки Д. Луффи (Gomu Gomu no Mi жимс идсэн резинэн хүн).',
    options: ['Fairy Tail', 'One Piece', 'Vinland Saga', 'Seven Deadly Sins'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21-ELSYx3yMPcKM.jpg'
  },
  {
    id: 'aot',
    title: 'Attack on Titan',
    subtitle: '進撃の巨人',
    emojiClue: '🧱 ⚔️ 🦅 💥',
    hint1: 'Хүн төрөлхтөн аварга хананы цаана аврагдан амьдардаг ч нэгэн өдөр Аварга биетүүд ханыг эвдэнэ.',
    hint2: 'Эрен Егер, Микаса болон Survey Corps-ийн эрх чөлөөний төлөөх тулаан.',
    options: ['Attack on Titan', 'Fullmetal Alchemist', 'Code Geass', 'Solo Leveling'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx16498-buvcRTBx4NSm.jpg'
  },
  {
    id: 'dragon-ball',
    title: 'Dragon Ball',
    subtitle: 'ドラゴンボール',
    emojiClue: '🐉 🟠 ⭐ 🥋',
    hint1: '7 шидэт бөмбөгийг цуглуулснаар хүссэн хүслээ биелүүлдэг луу дуудаж болно.',
    hint2: 'Сон Гоку, Камехамеха долгион ба Super Saiyan хувирал.',
    options: ['Dragon Ball', 'Yu Yu Hakusho', 'Gintama', 'One Punch Man'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx223-scE5uJfXqqj8.png'
  },
  {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    subtitle: '俺だけレベルアップな件',
    emojiClue: '🗡️ 🌑 ⬆️ 👑 🐺',
    hint1: 'Дэлхийн хамгийн сул E-зэрэглэлийн анчин нууц "System"-ийг олсноор ганцаараа түвшин ахиж эхэлнэ.',
    hint2: 'Сон Жинвү, Сүүдрийн арми ба "Arise!" тушаал.',
    options: ['Solo Leveling', 'Sword Art Online', 'Tower of God', 'Overlord'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx151807-it355ZgzquUd.png'
  },
  {
    id: 'one-punch-man',
    title: 'One Punch Man',
    subtitle: 'ワンパンマン',
    emojiClue: '🥊 💥 👨‍🦲 🦸',
    hint1: 'Ердөө ганц цохилтоор ямар ч мангасыг устгадаг хэт хүчтэй баатар жинхэнэ өрсөлдөгчөө хайна.',
    hint2: 'Сайтама болон түүний киборг шавь Генос ("100 суниалт, 10 км гүйлт").',
    options: ['Mob Psycho 100', 'One Punch Man', 'My Hero Academia', 'Mashle'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21087-B5DHjqZ3kW4b.jpg'
  },
  {
    id: 'chainsaw-man',
    title: 'Chainsaw Man',
    subtitle: 'チェンソーマン',
    emojiClue: '🪚 🐕 🩸 😈',
    hint1: 'Өрөө төлөхийн тулд чөтгөр агнадаг ядуу хүү нохой-чөтгөр Почитатай нэгдсэнээр биенээсээ хөрөө гаргадаг болно.',
    hint2: 'Денжи, Макима, Аки болон Пауэр (Public Safety Devil Hunters).',
    options: ['Jujutsu Kaisen', 'Chainsaw Man', 'Dorohedoro', 'Devilman Crybaby'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx127230-DdP4vAdssLoz.png'
  },
  {
    id: 'spy-x-family',
    title: 'Spy x Family',
    subtitle: 'SPY×FAMILY',
    emojiClue: '🕵️ 🗡️ 👧 🥜 🐶',
    hint1: 'Нууц даалгаврын төлөө тагнуулч, хөлсний алуурчин, бодол уншдаг охин гурав хуурамч гэр бүл болно.',
    hint2: 'Лойд Форжер (Twilight), Ёр, ба самрын дуртай Аня Форжер ("Waku Waku!").',
    options: ['Spy x Family', 'Sakamoto Days', 'Buddy Daddies', 'Kaguya-sama'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx140960-Kb6R5nYQfjmP.jpg'
  },
  {
    id: 'death-note',
    title: 'Death Note',
    subtitle: 'デスノート',
    emojiClue: '📓 ✍️ 🍎 💀 🔍',
    hint1: 'Тэнгэрээс унасан хар дэвтэрт хэн нэгний нэрийг бичихэд тэр хүн зүрхний шигдээсээр амиа алдана.',
    hint2: 'Лайт Ягами (Kira), шинигами Рюк ба суут мөрдөгч L.',
    options: ['Death Note', 'Code Geass', 'Monster', 'Psycho-Pass'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1535-kUgkcrfOrkUM.jpg'
  },
  {
    id: 'hunter-x-hunter',
    title: 'Hunter x Hunter',
    subtitle: 'ハンター×ハンター',
    emojiClue: '🎣 ⚡ 🃏 🐜 🎒',
    hint1: 'Аавыгаа олохын тулд 12 настай хүү хамгийн хэцүү Анчны (Hunter) шалгалтад ордог.',
    hint2: 'Гон Фрикс, Киллуа Золдик, Курапика ба Нэн (Nen) хүч.',
    options: ['Naruto', 'Hunter x Hunter', 'Yu Yu Hakusho', 'Fairy Tail'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx11061-y5gsT1hoHuHw.png'
  },
  {
    id: 'bleach',
    title: 'Bleach',
    subtitle: 'ブリーチ',
    emojiClue: '⚔️ 👻 🍊 🌙 💀',
    hint1: 'Сүнс хардаг ахлах сургуулийн сурагч Сүнсний Хамгаалагчийн (Soul Reaper) хүчийг өвлөнө.',
    hint2: 'Ичиго Куросаки, Рукиа, Занпакуто сэлэм ба "Bankai!".',
    options: ['Bleach', 'Demon Slayer', 'Blue Exorcist', 'Soul Eater'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx269-d2GmRkJbMopq.png'
  },
  {
    id: 'tokyo-ghoul',
    title: 'Tokyo Ghoul',
    subtitle: '東京喰種',
    emojiClue: '😷 ☕ 👁️ 🔴 🦋',
    hint1: 'Токио хотод хүний махаар хооллодог биетүүдийн дунд жирийн оюутан хагас-гүл болон хувирна.',
    hint2: 'Кэн Канеки, Антейку кофе шоп болон нэг улаан нүд.',
    options: ['Parasyte', 'Tokyo Ghoul', 'Ajin', 'Seraph of the End'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b20605-k665mVkSug8D.jpg'
  },
  {
    id: 'haikyuu',
    title: 'Haikyuu!!',
    subtitle: 'ハイキュー!!',
    emojiClue: '🏐 🦅 🔟 ⚡ 🏆',
    hint1: 'Намхан нуруутай ч асар өндөр үсэрдэг хүү сургуулийнхаа волейболын багийг аварга болгохыг зорьдог.',
    hint2: 'Шоёо Хината ба Тобио Кагеяма, Карасуно ахлах сургууль ("Төмөр хэрээнүүд").',
    options: ['Kuroko’s Basketball', 'Haikyuu!!', 'Blue Lock', 'Slam Dunk'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20464-ooZUyBe4ptp9.png'
  },
  {
    id: 'blue-lock',
    title: 'Blue Lock',
    subtitle: 'ブルーロック',
    emojiClue: '⚽ 🔒 🔵 🥅 🔥',
    hint1: 'Японы шигшээ багт дэлхийн шилдэг "эгоист" довтлогчийг бэлтгэх хатуу бэлтгэлийн шорон-байгууламж.',
    hint2: 'Йоичи Исаги, Рин Итоши ба Жинпачи Эго.',
    options: ['Ao Ashi', 'Inazuma Eleven', 'Blue Lock', 'Captain Tsubasa'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx137822-U8naszP96vzC.png'
  },
  {
    id: 'fma',
    title: 'Fullmetal Alchemist',
    subtitle: '鋼の錬金術師',
    emojiClue: '🦾 ⚙️ 🔴 🧪 🛡️',
    hint1: 'Хоёр ах дүү хориотой алхимийн арга хэрэглэсний улмаас биеэ алдаж, Философийн чулууг хайна.',
    hint2: 'Эдвард ба Альфонс Элрик ("Тэнцүү солилцооны хууль").',
    options: ['Fullmetal Alchemist', 'Attack on Titan', 'Dr. Stone', 'Black Clover'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx5114-nSWCgQlmOMtj.jpg'
  },
  {
    id: 'vinland-saga',
    title: 'Vinland Saga',
    subtitle: 'ヴィンランド・サガ',
    emojiClue: '🪓 ⛵ ❄️ ⚔️ 🛡️',
    hint1: 'Викингүүдийн эрин үед аавынхаа өшөөг авахыг хүссэн хүү жинхэнэ дайчин гэж юу болохыг ойлгоно.',
    hint2: 'Торфинн ба Аскеладд ("Чи дайсангүй" — I have no enemies).',
    options: ['Vinland Saga', 'Berserk', 'Kingdom', 'Attack on Titan'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101348-2fhDFPCuMNiz.jpg'
  },
  {
    id: 'black-clover',
    title: 'Black Clover',
    subtitle: 'ブラッククローバー',
    emojiClue: '🍀 🖤 ⚔️ 📖 ✨',
    hint1: 'Хүн бүр ид шидтэй төрсөн хаант улсад ямар ч шидгүй хүү Шидийн Хаан болохыг мөрөөднө.',
    hint2: 'Аста ба Юно, 5 навчит хар хошоонгортой гримуар (Anti-Magic).',
    options: ['Fairy Tail', 'Black Clover', 'My Hero Academia', 'Magi'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx97940-fyh8o7gNbha0.png'
  },
  {
    id: 'mob-psycho',
    title: 'Mob Psycho 100',
    subtitle: 'モブサイコ100',
    emojiClue: '🥄 🧠 💯 👻 ⚡',
    hint1: 'Сэтгэл хөдлөл нь 100% хүрэхэд асар их телекинез хүч нь дэлбэрдэг ичимхий дунд сургуулийн хүү.',
    hint2: 'Шигэо Кагэяма ("Mob"), луйварчин багш Рэйгэн ба Димпл сүнс.',
    options: ['One Punch Man', 'Mob Psycho 100', 'Saiki K.', 'Dandadan'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21507-6YUSbh2m0N1p.jpg'
  },
  {
    id: 'code-geass',
    title: 'Code Geass',
    subtitle: 'コードギアス 反逆のルルーシュ',
    emojiClue: '♟️ 👁️ 🤖 👑 🎭',
    hint1: 'Харц тулгарсан хэн бүхэнд ганц удаа тушаал өгөх нууц хүч олж авсан цөлөгдсөн ханхүү эзэнт гүрний эсрэг босно.',
    hint2: 'Лелуш Ламперуж (Zero), Knightmare мех роботууд ба C.C.',
    options: ['Death Note', 'Code Geass', '86', 'Neon Genesis Evangelion'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1575-hsmWM2ydNm1m.jpg'
  },
  {
    id: 'sao',
    title: 'Sword Art Online',
    subtitle: 'ソードアート・オンライン',
    emojiClue: '⚔️ 🥽 🌐 🏰 🖤',
    hint1: 'Виртуал бодит ертөнцийн тоглоомд гацсан 10,000 тоглогч тоглоом дотор үхвэл бодит амьдрал дээр ч амиа алдана.',
    hint2: 'Кирито ("Хар илдчин") ба Асуна, Айнкрад цамхгийн 100 давхар.',
    options: ['Log Horizon', 'Sword Art Online', 'Shangri-La Frontier', 'Solo Leveling'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx11757-SxYDUzdr9rh2.jpg'
  },
  {
    id: 'frieren',
    title: 'Frieren: Beyond Journey’s End',
    subtitle: '葬送のフリーレン',
    emojiClue: '🪄 🧝‍♀️ 🌸 ⏳ 🧳',
    hint1: 'Чөтгөрийн хааныг дарсны дараа урт насалдаг эльф шидтэн хүн төрөлхтнийг илүү ойлгохоор шинэ аялалд гарна.',
    hint2: 'Фрирен, Ферн ба Старк — баатар Химмелийн дурсамжийг дагасан аялал.',
    options: ['Frieren: Beyond Journey’s End', 'Mushoku Tensei', 'Violet Evergarden', 'Delicious in Dungeon'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx154587-qQTzQnEJJ3oB.jpg'
  },
  {
    id: 'dandadan',
    title: 'Dandadan',
    subtitle: 'ダンダダン',
    emojiClue: '👽 👻 👓 👵 ⚡',
    hint1: 'Сүнсэнд итгэдэг охин ба харь гарагийнханд итгэдэг хүү хоёул ер бусын хүчтэй тулгарна.',
    hint2: 'Момо Аясэ, Окарун болон Турбо эмээ.',
    options: ['Dandadan', 'Chainsaw Man', 'Mob Psycho 100', 'Jujutsu Kaisen'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx171018-60q1B6GK2Ghb.jpg'
  },
  {
    id: 'kaiju-no-8',
    title: 'Kaiju No. 8',
    subtitle: '怪獣8号',
    emojiClue: '🦖 💥 🛡️ 🔫 🧪',
    hint1: 'Мангас цэвэрлэгчээр ажилладаг 32 настай эр өөрөө мангас болон хувирч Батлан хамгаалах хүчинд орно.',
    hint2: 'Кафка Хибино, Мина Аширо ба Рено Ичикава.',
    options: ['Attack on Titan', 'Kaiju No. 8', 'Godzilla Singular Point', 'Chainsaw Man'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx153288-25FBfFJzEQ5O.jpg'
  },
  {
    id: 'kuroko',
    title: "Kuroko's Basketball",
    subtitle: '黒子のバスケ',
    emojiClue: '🏀 👻 ⚡ 🔟 🏆',
    hint1: 'Гайхамшгийн үеийн 6 дахь "үл үзэгдэгч" тоглогч шинэ багийн андтайгаа хуучин андуудаа ялахыг зорьдог.',
    hint2: 'Тэцүя Куроко ба Тайга Кагами, Сейрин ахлах сургуулийн сагсан бөмбөг.',
    options: ['Slam Dunk', "Kuroko's Basketball", 'Haikyuu!!', 'Ahiru no Sora'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx11771-uvr44RAwRxPw.jpg'
  },
  {
    id: 'slam-dunk',
    title: 'Slam Dunk',
    subtitle: 'スラムダンク',
    emojiClue: '🏀 🔴 👨‍🦰 🔟 🔥',
    hint1: 'Дурласан охиндоо таалагдах гэж сагсан бөмбөгт орсон улаан үстэй танхай сурагч Шохоку багийн од болно.',
    hint2: 'Хананамичи Сакураги ("Суут тоглогч") ба Каэдэ Рукава.',
    options: ['Slam Dunk', "Kuroko's Basketball", 'Hajime no Ippo', 'Blue Lock'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx170-cmD8A0vZsp6g.jpg'
  },
  {
    id: 'dr-stone',
    title: 'Dr. Stone',
    subtitle: 'ドクターストーン',
    emojiClue: '🪨 🧪 ⚡ 🧠 🌍',
    hint1: 'Бүх хүн төрөлхтөн чулуужсанаас 3,700 жилийн дараа сэрсэн суут хүү шинжлэх ухаанаар соёл иргэншлийг дахин босгоно.',
    hint2: 'Сэнкү Ишигами ("10 тэрбум хувь итгэлтэй!").',
    options: ['Dr. Stone', 'Fullmetal Alchemist', 'Steins;Gate', 'Cells at Work!'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx105333-GybuoSoOZfpH.jpg'
  },
  {
    id: 'edgerunners',
    title: 'Cyberpunk: Edgerunners',
    subtitle: 'サイバーパンク エッジランナーズ',
    emojiClue: '🦾 🌆 🌙 ⚡ 💔',
    hint1: 'Night City-ийн гудамжны хүү нуруундаа Sandevistan кибер суулгац суулгаж хөлсний эджраннер болно.',
    hint2: 'Дэвид Мартинес ба Люси ("Сар руу нисэх мөрөөдөл").',
    options: ['Arcane', 'Cyberpunk: Edgerunners', 'Psycho-Pass', 'Akudama Drive'],
    imageUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx120377-ayZPoxiWt4Li.jpg'
  }
];

const SPORT_QUESTIONS: QuizQuestion[] = [
  {
    id: 'curry',
    title: 'Stephen Curry',
    subtitle: 'NBA • Golden State Warriors #30',
    emojiClue: '🏀 🎯 3️⃣ 🏆',
    hint1: 'NBA-ийн түүхэн дэх бүх цаг үеийн хамгийн олон 3 онооны шидэлт амжилттай болгосон тоглогч.',
    hint2: 'Golden State Warriors багийн #30 дугаартай од, 4 удаагийн NBA аварга ("Night Night").',
    options: ['Stephen Curry', 'LeBron James', 'Kevin Durant', 'Kyrie Irving'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Stephen_Curry_30.jpg/330px-Stephen_Curry_30.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    erkaFavorite: true
  },
  {
    id: 'messi',
    title: 'Lionel Messi',
    subtitle: 'Football • 8x Ballon d’Or',
    emojiClue: '⚽ 🐐 🇦🇷 🏆',
    hint1: '2022 оны Хөлбөмбөгийн ДАШТ-д Аргентины шигшээ багийг ахлан түрүүлсэн.',
    hint2: '8 удаа Ballon d’Or хүртсэн бөгөөд Барселона ба Интер Майамид тоглосон #10.',
    options: ['Cristiano Ronaldo', 'Lionel Messi', 'Neymar Jr', 'Kylian Mbappé'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Leo_Messi_Argentina_v_Egypt_7_July_2026-1.jpg/330px-Leo_Messi_Argentina_v_Egypt_7_July_2026-1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'lebron',
    title: 'LeBron James',
    subtitle: 'NBA • "King James" #23',
    emojiClue: '🏀 👑 💪 🚂',
    hint1: 'NBA-ийн бүх цаг үеийн онооны дээд амжилтыг (40,000+ оноо) эзэмшигч.',
    hint2: 'Майами Хит, Кливленд Кавальерс, Лос Анжелес Лейкерс багуудад аварга авсан "King".',
    options: ['Kobe Bryant', 'Michael Jordan', 'LeBron James', 'Giannis Antetokounmpo'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/LeBron_James_%2851959977144%29_%28cropped2%29.jpg/330px-LeBron_James_%2851959977144%29_%28cropped2%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'ronaldo',
    title: 'Cristiano Ronaldo',
    subtitle: 'Football • CR7 "SIUUU"',
    emojiClue: '⚽ 🇵🇹 7️⃣ ⚡',
    hint1: 'Албан ёсны тоглолтуудад 900+ гоол оруулсан Португалийн домогт довтлогч.',
    hint2: 'Манчестер Юнайтед, Реал Мадрид, Ювентус багуудад тоглосон CR7.',
    options: ['Cristiano Ronaldo', 'Karim Benzema', 'Erling Haaland', 'Luka Modrić'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Cristiano_Ronaldo_Croatia_v_Portugal_2_July_2026-075_%28cropped%29.jpg/330px-Cristiano_Ronaldo_Croatia_v_Portugal_2_July_2026-075_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'jokic',
    title: 'Nikola Jokić',
    subtitle: 'NBA • Denver Nuggets #15',
    emojiClue: '🏀 🐴 🎯 🇷🇸',
    hint1: 'Төвийн тоглогч байрлалаас гайхалтай дамжуулалт өгдөг, 3 удаагийн NBA MVP.',
    hint2: 'Сербийн "Joker" хочит Денвер Наггетс багийг 2023 онд NBA аварга болгосон од.',
    options: ['Nikola Jokić', 'Joel Embiid', 'Luka Dončić', 'Victor Wembanyama'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Nikola_Jokic_free_throw_%28cropped%29.jpg/330px-Nikola_Jokic_free_throw_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'mbappe',
    title: 'Kylian Mbappé',
    subtitle: 'Football • France #9 / #10',
    emojiClue: '⚽ 🇫🇷 🐢 💨',
    hint1: 'Ердөө 19 настайдаа 2018 оны Дэлхийн аварга шалгаруулах тэмцээнд түрүүлж гоолдсон.',
    hint2: 'Хурдаараа алдартай Францын од, 2024 онд Реал Мадрид багт нэгдсэн.',
    options: ['Vinícius Júnior', 'Kylian Mbappé', 'Jude Bellingham', 'Bukayo Saka'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Kylian_Mbappe_France_v_Senegal_16_June_2026-391_%28cropped%29.jpg/330px-Kylian_Mbappe_France_v_Senegal_16_June_2026-391_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'bolt',
    title: 'Usain Bolt',
    subtitle: 'Athletics • 100m World Record 9.58s',
    emojiClue: '🏃‍♂️ ⚡ 🇯🇲 🥇',
    hint1: '100 метр ба 200 метрийн гүйлтийн дэлхийн дээд амжилтын эзэн, Олимпийн 8 алтан медальтай.',
    hint2: 'Ямайкийн "Lightning Bolt", барианд орсны дараах алдарт аянга заадаг позтой.',
    options: ['Carl Lewis', 'Usain Bolt', 'Noah Lyles', 'Eliud Kipchoge'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Usain_Bolt_smiling_Berlin_2009.JPG/330px-Usain_Bolt_smiling_Berlin_2009.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'jordan',
    title: 'Michael Jordan',
    subtitle: 'NBA • Chicago Bulls #23 • "Air Jordan"',
    emojiClue: '🏀 🐐 ✈️ 6️⃣ 🏆',
    hint1: 'Chicago Bulls багийг NBA-ийн түүхэнд 6 удаа аварга болгож, 6 удаа Finals MVP авсан домог.',
    hint2: 'Агаарт дүүлэн үсэрдэг чадвараараа "Air Jordan" хочтой, өөрийн пүүзний брэндтэй.',
    options: ['Michael Jordan', 'Magic Johnson', 'Larry Bird', 'Scottie Pippen'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Michael_Jordan_in_2014.jpg/330px-Michael_Jordan_in_2014.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'kobe',
    title: 'Kobe Bryant',
    subtitle: 'NBA • Los Angeles Lakers #8 / #24',
    emojiClue: '🏀 🐍 💜 💛 🏆',
    hint1: 'Los Angeles Lakers багт бүтэн 20 улирал тоглож, нэг тоглолтод 81 оноо авсан домогт хамгаалагч.',
    hint2: '"Black Mamba" сэтгэлгээгээрээ алдартай, 5 удаагийн NBA аварга.',
    options: ['Allen Iverson', 'Kobe Bryant', 'Tracy McGrady', 'Dwyane Wade'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Kobe_Bryant_Dec_2014.jpg/330px-Kobe_Bryant_Dec_2014.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'giannis',
    title: 'Giannis Antetokounmpo',
    subtitle: 'NBA • Milwaukee Bucks #34',
    emojiClue: '🏀 🇬🇷 🦌 💪 🏆',
    hint1: 'Афинаас NBA-д ирж Milwaukee Bucks багийг 50 жилийн дараа NBA аварга болгосон 2 удаагийн MVP.',
    hint2: 'Асар урт алхалт болон хүчээрээ "Greek Freak" хэмээн нэрлэгддэг #34.',
    options: ['Giannis Antetokounmpo', 'Anthony Davis', 'Bam Adebayo', 'Pascal Siakam'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Giannis_Antetokounmpo_%2851915153421%29_%28cropped%29.jpg/330px-Giannis_Antetokounmpo_%2851915153421%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'luka',
    title: 'Luka Dončić',
    subtitle: 'NBA • #77 • Slovenia',
    emojiClue: '🏀 🇸🇮 ✨ 7️⃣7️⃣ 🎯',
    hint1: 'Европын Real Madrid-аас 19 настайдаа NBA-д орж, нэг тоглолтод 73 оноо авч байсан шилдэг хамгаалагч.',
    hint2: 'Ухаалаг дамжуулалт ба step-back 3 онооны шидэлтээрээ алдартай "Luka Magic" #77.',
    options: ['Trae Young', 'Luka Dončić', 'Devin Booker', 'Shai Gilgeous-Alexander'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Luka_Don%C4%8Di%C4%87_and_Marines%2C_2026_%28cropped%29.jpg/330px-Luka_Don%C4%8Di%C4%87_and_Marines%2C_2026_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'durant',
    title: 'Kevin Durant',
    subtitle: 'NBA • #35 / #7 • "Slim Reaper"',
    emojiClue: '🏀 🎯 🔥 🐍 🥇',
    hint1: 'Өндөр биетэй ч хамгаалагч шиг нарийн шидэлттэй, Олимпийн сагсан бөмбөгийн 4 алтан медальт.',
    hint2: 'Stephen Curry-тэй хамт Warriors-т 2 удаа NBA аварга болж Finals MVP авсан "KD".',
    options: ['Kevin Durant', 'Carmelo Anthony', 'Kawhi Leonard', 'Paul George'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Kevin_Durant%2C_Paris_2024_%28cropped%29.jpg/330px-Kevin_Durant%2C_Paris_2024_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'wembanyama',
    title: 'Victor Wembanyama',
    subtitle: 'NBA • San Antonio Spurs #1',
    emojiClue: '🏀 👽 🇫🇷 🗼 🛡️',
    hint1: '2.24 метр өндөр боловч 3 онооны шугамнаас шидэж, хамгаалалтад бүх шидэлтийг хаадаг залуу од.',
    hint2: 'Францын шигшээ баг болон San Antonio Spurs-ийн #1 дугаартай "Wemby".',
    options: ['Chet Holmgren', 'Rudy Gobert', 'Victor Wembanyama', 'Kristaps Porziņģis'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Victor_Wembanyama_San_Antonio_Spurs_2024.jpg/330px-Victor_Wembanyama_San_Antonio_Spurs_2024.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'shaq',
    title: "Shaquille O'Neal",
    subtitle: 'NBA • #34 / #32 • "Shaq"',
    emojiClue: '🏀 💥 💪 🏆 🎤',
    hint1: 'Талбайн самбарыг хүчтэй тохолтоороо хугалж байсан NBA-ийн түүхэн дэх хамгийн хүчирхэг төвийн тоглогч.',
    hint2: 'Kobe Bryant-тай хамт Lakers-т 3 дараалж аварга авсан "Diesel" буюу Shaq.',
    options: ["Shaquille O'Neal", 'Tim Duncan', 'Hakeem Olajuwon', 'Dwight Howard'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/TechCrunch_Disrupt_2023_-_Day_1_%28cropped%29.jpg/330px-TechCrunch_Disrupt_2023_-_Day_1_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'kyrie',
    title: 'Kyrie Irving',
    subtitle: 'NBA • "Uncle Drew" • Best Handles',
    emojiClue: '🏀 🪄 ⚡ 🌀 🎯',
    hint1: 'NBA-ийн түүхэн дэх хамгийн уран гоё бөмбөг залгуулалттай (dribbling) тоглогчдын нэг.',
    hint2: '2016 оны NBA Finals-ийн 7 дахь тоглолтод шийдвэрлэх 3 онооны шидэлтийг оруулсан "Uncle Drew".',
    options: ['Ja Morant', 'Kyrie Irving', 'Damian Lillard', 'James Harden'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Kyrie_Irving_%2851830909437%29_%28cropped%29.jpg/330px-Kyrie_Irving_%2851830909437%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'ant-edwards',
    title: 'Anthony Edwards',
    subtitle: 'NBA • Minnesota Timberwolves #5 • "Ant-Man"',
    emojiClue: '🏀 🐜 🐺 ⚡ 💥',
    hint1: 'Хүчирхэг тохолт, өөртөө итгэх итгэлээрээ NBA-ийн шинэ үеийн супер од гэгддэг Minnesota Timberwolves-ийн хамгаалагч.',
    hint2: '"Ant-Man" хочтой, АНУ-ын шигшээ багтай 2024 оны Парисын Олимпийн алтан медаль хүртсэн #5.',
    options: ['Anthony Edwards', 'Donovan Mitchell', 'Jalen Brunson', 'Tyrese Haliburton'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Anthony_Edwards_Argentina_v_Egypt_7_July_2026-069_%28cropped%29.jpg/330px-Anthony_Edwards_Argentina_v_Egypt_7_July_2026-069_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'sga',
    title: 'Shai Gilgeous-Alexander',
    subtitle: 'NBA • Oklahoma City Thunder #2',
    emojiClue: '🏀 🇨🇦 ⚡ 2️⃣ 🎯',
    hint1: 'Дундын зайн шидэлт болон тайван тоглолтоороо Oklahoma City Thunder багийг тэргүүлдэг Канадын од.',
    hint2: '"SGA" товчлолоор алдаршсан, 2024–25 оны NBA MVP болон аваргын гол баатар.',
    options: ['Shai Gilgeous-Alexander', 'De’Aaron Fox', 'Darius Garland', 'Jamal Murray'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/2023-08-09_Deutschland_gegen_Kanada_%28Basketball-L%C3%A4nderspiel%29_by_Sandro_Halank%E2%80%93109.jpg/330px-2023-08-09_Deutschland_gegen_Kanada_%28Basketball-L%C3%A4nderspiel%29_by_Sandro_Halank%E2%80%93109.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'tatum',
    title: 'Jayson Tatum',
    subtitle: 'NBA • Boston Celtics #0',
    emojiClue: '🏀 ☘️ 💚 0️⃣ 🏆',
    hint1: 'Boston Celtics багийг 2024 онд NBA-ийн түүхэн 18 дахь аварга болгоход гол үүрэг гүйцэтгэсэн довтлогч.',
    hint2: '0 дугаартай тоглодог бөгөөд Kobe Bryant-ийг шүтэж өссөн Celtics-ийн гол од.',
    options: ['Jaylen Brown', 'Jayson Tatum', 'Jimmy Butler', 'Paolo Banchero'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Celtics_at_Wizards_2024-12-044_%28cropped_2%29.jpg/330px-Celtics_at_Wizards_2024-12-044_%28cropped_2%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'iverson',
    title: 'Allen Iverson',
    subtitle: 'NBA • Philadelphia 76ers #3 • "The Answer"',
    emojiClue: '🏀 3️⃣ 👟 ⚡ 👑',
    hint1: 'Намхан биетэй ч асар хурдан кроссовер (crossover) хөдөлгөөнөөрөө Michael Jordan-ийг ч хуурч байсан домог.',
    hint2: '"The Answer" хочит, 2001 оны NBA MVP бөгөөд Philadelphia 76ers-ийн #3.',
    options: ['Allen Iverson', 'Isiah Thomas', 'Steve Nash', 'Chris Paul'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Allen_Iverson_08_B.jpg/330px-Allen_Iverson_08_B.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'duncan',
    title: 'Tim Duncan',
    subtitle: 'NBA • San Antonio Spurs #21',
    emojiClue: '🏀 🖤 🩶 🏆 5️⃣',
    hint1: 'San Antonio Spurs багт бүтэн 19 жил үнэнч тоглож, NBA-д 5 удаа аварга авсан шилдэг хүчний довтлогч.',
    hint2: 'Самбарын ойроос цэвэрхэн bank shot хийдэг "The Big Fundamental" #21.',
    options: ['Dirk Nowitzki', 'Kevin Garnett', 'Tim Duncan', 'David Robinson'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Tim_Duncan_Walks_Verizon_Center%27s_Floor_%28cropped%29_%28cropped%29.jpg/330px-Tim_Duncan_Walks_Verizon_Center%27s_Floor_%28cropped%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'ja-morant',
    title: 'Ja Morant',
    subtitle: 'NBA • Memphis Grizzlies #12',
    emojiClue: '🏀 🐻 ✈️ 💥 1️⃣2️⃣',
    hint1: 'Ер бусын өндөр үсрэлт, гайхалтай тохолтуудаараа фэнүүдийг шуугиулдаг Memphis Grizzlies-ийн холбогч.',
    hint2: 'NBA-ийн Оны шилдэг шинэ тоглогч (ROTY) болон Most Improved Player шагналт #12.',
    options: ['Ja Morant', 'Derrick Rose', 'Russell Westbrook', 'Zion Williamson'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Ja_Morant_2021.jpg/330px-Ja_Morant_2021.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'kawhi',
    title: 'Kawhi Leonard',
    subtitle: 'NBA • "The Klaw" • 2x Finals MVP',
    emojiClue: '🏀 🖐️ 🛡️ 🏆 🤖',
    hint1: 'Аварга том гартай, хамгаалалтын мастер бөгөөд хоёр өөр багт Finals MVP авсан цөөхөн тоглогчийн нэг.',
    hint2: '2019 онд Toronto Raptors-ийг түүхэнд нь анх удаа NBA аварга болгосон алдарт buzzer-beater шидэлтийн эзэн.',
    options: ['Kawhi Leonard', 'Paul George', 'Jimmy Butler', 'Scottie Pippen'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Kawhi_Leonard_%287440607%29_%28cropped%29.jpg/330px-Kawhi_Leonard_%287440607%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'dame',
    title: 'Damian Lillard',
    subtitle: 'NBA • "Dame Time" #0',
    emojiClue: '🏀 ⌚ 🎯 0️⃣ 🔥',
    hint1: 'Тоглолтын сүүлийн секундэд холын зайнаас buzzer-beater 3 оноо хийгээд бугуйгаа заадаг уламжлалтай.',
    hint2: '"Dame Time" хочтой, Portland Trail Blazers болон Milwaukee Bucks-ийн шилдэг холбогч.',
    options: ['Damian Lillard', 'Stephen Curry', 'Klay Thompson', 'Trae Young'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Damian_Lillard_%282021%29_%28cropped%29.jpg/330px-Damian_Lillard_%282021%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'magic',
    title: 'Magic Johnson',
    subtitle: 'NBA • Los Angeles Lakers #32 • "Showtime"',
    emojiClue: '🏀 ✨ 💜 💛 🏆',
    hint1: '2.06 метр өндөр боловч холбогчоор тоглож, Lakers-ийн "Showtime" эринийг 5 аваргаар тэргүүлсэн домог.',
    hint2: 'Larry Bird-тэй мөнхийн өрсөлдөгч байсан, "no-look pass" дамжуулалтын хаан #32.',
    options: ['Magic Johnson', 'Larry Bird', 'Kareem Abdul-Jabbar', 'John Stockton'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/Magic_Johnson_at_SXSW_2022_%2851958828669%29_%28cropped%29.jpg/330px-Magic_Johnson_at_SXSW_2022_%2851958828669%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  },
  {
    id: 'neymar',
    title: 'Neymar Jr',
    subtitle: 'Football • Brazil #10 • Santos / Barcelona / PSG',
    emojiClue: '⚽ 🇧🇷 🔟 ✨ 🕺',
    hint1: 'Бразилын шигшээ багийн бүх цаг үеийн мэргэн бууч бөгөөд уран хууралт, Joga Bonito тоглолтоороо алдартай.',
    hint2: 'Месси, Суарес нартай хамт Барселонагийн "MSN" гурвалыг бүрдүүлж Аваргуудын лигт түрүүлсэн.',
    options: ['Neymar Jr', 'Vinícius Júnior', 'Ronaldinho', 'Rodrygo'],
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Neymar_Junior_Brazil_V_Morocco_13_June_2026-40.jpg/330px-Neymar_Junior_Brazil_V_Morocco_13_June_2026-40.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'
  }
];

interface AnimeGuessHubProps {
  soundEnabled: boolean;
  authUser: FirebaseUser | null;
  onGoogleSignIn: () => Promise<FirebaseUser | null>;
  onSelectTab: (tab: ActiveTab) => void;
}

const ORIGIN_GAME_URL = 'https://ai.studio/apps/d75c8c39-975a-4fc7-a3de-c843d1241497';
const HARD_LIVES = 3;

const MODE_DESCRIPTIONS: Record<GameMode, { label: string; shortLabel: string; desc: string; badge: string }> = {
  Classic: {
    label: 'Classic',
    shortLabel: 'Classic',
    desc: 'Бүх асуулт санамсаргүй • Сэжүүр нээж болно (+20 оноо, сэжүүртэй +10)',
    badge: 'Бүх асуулт'
  },
  Timed: {
    label: 'Timed (60s)',
    shortLabel: 'Timed 60s',
    desc: '60 секундийн хурдны сорилт • Аль болох олон зөв таа (+25 оноо)',
    badge: '60 Секунд'
  },
  Hard: {
    label: 'Hard (3 Амь)',
    shortLabel: 'Hard 3❤️',
    desc: '3 амьтай, нэмэлт сэжүүргүй хүнд горим • Зөв +35, буруу -1❤️ & -5 оноо',
    badge: '3 Амь ❤️'
  }
};

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getShuffledQuestions(game: GameName): QuizQuestion[] {
  const pool = game === 'Anime Guess' ? ANIME_QUESTIONS : SPORT_QUESTIONS;
  return shuffleArray(pool).map((q) => ({
    ...q,
    options: shuffleArray(q.options)
  }));
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildFallbackPosterUrl(q: QuizQuestion): string {
  const safeTitle = escapeXml(q.title);
  const safeSub = escapeXml(q.subtitle);
  const firstEmoji = q.emojiClue.split(' ')[0] || '🎯';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="420" viewBox="0 0 320 420">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#3b121c"/>
        <stop offset="55%" stop-color="#240b12"/>
        <stop offset="100%" stop-color="#78350f"/>
      </linearGradient>
    </defs>
    <rect width="320" height="420" rx="24" fill="url(#bg)"/>
    <rect x="14" y="14" width="292" height="392" rx="18" fill="none" stroke="#f59e0b" stroke-opacity="0.6" stroke-width="3"/>
    <text x="160" y="180" text-anchor="middle" font-size="84">${firstEmoji}</text>
    <text x="160" y="290" text-anchor="middle" fill="#fef3c7" font-family="sans-serif" font-weight="900" font-size="24">${safeTitle}</text>
    <text x="160" y="325" text-anchor="middle" fill="#fcd34d" font-family="sans-serif" font-weight="600" font-size="14">${safeSub}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const AnimeGuessHub: React.FC<AnimeGuessHubProps> = ({
  soundEnabled,
  authUser,
  onGoogleSignIn,
  onSelectTab
}) => {
  const [gameViewMode, setGameViewMode] = useState<'play' | 'leaderboard'>('play');
  const [selectedGame, setSelectedGame] = useState<GameName>('Anime Guess');
  const [selectedMode, setSelectedMode] = useState<GameMode>('Classic');

  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    getShuffledQuestions('Anime Guess')
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [lives, setLives] = useState(HARD_LIVES);
  const [showHint2, setShowHint2] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [imgSrc, setImgSrc] = useState<string>('');

  // Game Finished & Score Save States
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [playerName, setPlayerName] = useState(() => authUser?.displayName || '');
  const [isSavingScore, setIsSavingScore] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [leaderboardRefreshKey, setLeaderboardRefreshKey] = useState(0);

  // Optional custom embed
  const [customEmbedUrl, setCustomEmbedUrl] = useState('');
  const [showEmbedFrame, setShowEmbedFrame] = useState(false);

  const currentQuestion = questions[questionIndex] || questions[0];

  // Keep revealed image synced to currentQuestion
  useEffect(() => {
    if (currentQuestion) {
      setImgSrc(currentQuestion.imageUrl);
    }
  }, [currentQuestion]);

  // Auto-populate playerName when authUser logs in if input is still empty
  useEffect(() => {
    if (authUser?.displayName && !playerName.trim()) {
      setPlayerName(authUser.displayName);
    }
  }, [authUser, playerName]);

  // Timed mode countdown
  useEffect(() => {
    if (selectedMode !== 'Timed' || isGameFinished || gameViewMode !== 'play') return;
    if (timeLeft <= 0) {
      setIsGameFinished(true);
      if (soundEnabled) playAudioChime('success');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedMode, isGameFinished, timeLeft, soundEnabled, gameViewMode]);

  const resetRound = (nextGame?: GameName, nextMode?: GameMode) => {
    const targetGame = nextGame ?? selectedGame;
    const targetMode = nextMode ?? selectedMode;
    if (nextGame) setSelectedGame(nextGame);
    if (nextMode) setSelectedMode(nextMode);
    setQuestions(getShuffledQuestions(targetGame));
    setQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCorrectCount(0);
    setLives(HARD_LIVES);
    setAnsweredCount(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowHint2(false);
    setTimeLeft(60);
    setIsGameFinished(false);
    setScoreSaved(false);
    setSaveError(null);
    if (soundEnabled) playAudioChime('clear');
  };

  const handleGuess = (option: string) => {
    if (selectedOption !== null || isGameFinished) return;
    setSelectedOption(option);
    const correct = option === currentQuestion.title;
    setIsCorrect(correct);
    setAnsweredCount((prev) => prev + 1);

    if (correct) {
      setCorrectCount((prev) => prev + 1);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > bestStreak) setBestStreak(nextStreak);

      let basePoints = 20;
      if (selectedMode === 'Classic') {
        basePoints = showHint2 ? 10 : 20;
      } else if (selectedMode === 'Timed') {
        basePoints = 25;
      } else if (selectedMode === 'Hard') {
        basePoints = 35;
      }
      const streakBonus = nextStreak >= 2 ? 5 : 0;
      setScore((prev) => prev + basePoints + streakBonus);
      if (soundEnabled) playAudioChime('success');
    } else {
      setStreak(0);
      if (selectedMode === 'Hard') {
        setScore((prev) => Math.max(0, prev - 5));
        setLives((prev) => Math.max(0, prev - 1));
      }
      if (soundEnabled) playAudioChime('click');
    }
  };

  const handleNextQuestion = () => {
    if (selectedMode === 'Hard' && lives <= 0) {
      setIsGameFinished(true);
      if (soundEnabled) playAudioChime('click');
      return;
    }
    if (questionIndex + 1 >= questions.length) {
      setIsGameFinished(true);
      if (soundEnabled) playAudioChime('success');
      return;
    }
    setQuestionIndex((prev) => prev + 1);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowHint2(false);
    if (soundEnabled) playAudioChime('click');
  };

  const handleFinishEarly = () => {
    setIsGameFinished(true);
    if (soundEnabled) playAudioChime('success');
  };

  const handleSaveScore = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);

    const trimmedName = playerName.trim();
    if (!trimmedName) {
      setSaveError('Тоглогчийн нэрээ заавал оруулна уу.');
      return;
    }

    setIsSavingScore(true);
    try {
      await saveGameScore({
        name: trimmedName,
        score,
        game: selectedGame,
        mode: selectedMode
      });

      setScoreSaved(true);
      setLeaderboardRefreshKey((prev) => prev + 1);
      if (soundEnabled) playAudioChime('success');
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSavingScore(false);
    }
  };

  const handleEmbedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customEmbedUrl.trim().startsWith('http')) {
      setShowEmbedFrame(true);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-8 py-2 sm:py-4">
      {/* Connected AI Studio Anime Guess Game Hero Banner (compact on phone) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#281219] via-[#2b141e] to-[#1a0b10] border-2 border-amber-400/70 p-4 sm:p-8 shadow-2xl shadow-red-950/50 ring-1 ring-amber-400/30">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/90 border border-amber-500/40 text-amber-200 text-[11px] sm:text-xs font-bold mb-2">
              <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
              <span>Anime Guess & Sport Guess 🔥</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-amber-100 tracking-tight leading-tight">
              Эрхэмбаярын{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-100 to-red-400 bg-clip-text text-transparent">
                Guess Games & Leaderboard
              </span>
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-amber-100/80 leading-relaxed">
              Санамсаргүй асуулт, хариултын дараах зураг болон 3 горимоор тоглож <span className="font-mono text-amber-300">Firestore</span> Leaderboard-д бүртгүүлээрэй!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full lg:w-auto">
            <a
              href={ORIGIN_GAME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-gradient-to-r from-red-700 via-amber-600 to-amber-700 hover:from-red-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm shadow-xl transition-all active:scale-95 border-2 border-amber-300/80 min-h-[44px]"
            >
              <Gamepad2 className="w-4 h-4 text-amber-200 shrink-0" />
              <span>🌐 Эх Тоглоом (Origin)</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-200 shrink-0" />
            </a>
          </div>
        </div>
      </section>

      {/* Prominent In-Tab Switcher: Play Games vs Leaderboard (Always clear on phones) */}
      <div className="grid grid-cols-2 gap-2 bg-[#201014]/95 border border-amber-900/50 p-1.5 sm:p-2 rounded-2xl shadow-lg sticky top-[68px] z-30 backdrop-blur-md">
        <button
          onClick={() => setGameViewMode('play')}
          className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all min-h-[44px] ${
            gameViewMode === 'play'
              ? 'bg-gradient-to-r from-red-700 via-amber-600 to-amber-700 text-white shadow-md ring-1 ring-amber-400/40'
              : 'text-amber-200/80 hover:text-white hover:bg-[#2a141b]'
          }`}
        >
          <Gamepad2 className="w-4 h-4 shrink-0" />
          <span>Тоглох</span>
        </button>

        <button
          onClick={() => setGameViewMode('leaderboard')}
          className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all min-h-[44px] ${
            gameViewMode === 'leaderboard'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md ring-1 ring-amber-300/60'
              : 'bg-amber-950/50 text-amber-200 hover:text-white border border-amber-500/40 hover:bg-amber-900/50'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-300 shrink-0" />
          <span>🏆 Leaderboard</span>
        </button>
      </div>

      {gameViewMode === 'leaderboard' ? (
        <LeaderboardView
          authUser={authUser}
          onGoogleSignIn={async () => { await onGoogleSignIn(); }}
          onSelectTab={onSelectTab}
          initialGame={selectedGame}
          refreshTrigger={leaderboardRefreshKey}
          onPlayGame={(game) => {
            resetRound(game, selectedMode);
            setGameViewMode('play');
          }}
        />
      ) : (
        <>
          {/* Main Interactive Game Arena */}
          <section className="bg-[#201014]/90 border border-amber-900/50 rounded-3xl p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-xl">
            {/* Game & Mode Selectors (Phone-friendly compact layout) */}
            <div className="space-y-3 pb-4 border-b border-amber-900/40">
              {/* Game Switcher + Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">
                  {(['Anime Guess', 'Sport Guess'] as GameName[]).map((game) => {
                    const active = selectedGame === game;
                    return (
                      <button
                        key={game}
                        onClick={() => resetRound(game, selectedMode)}
                        className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all min-h-[44px] ${
                          active
                            ? 'bg-gradient-to-r from-red-700 via-amber-600 to-amber-700 text-white shadow-lg ring-2 ring-amber-400/40'
                            : 'bg-[#160a0e] text-amber-200/75 hover:text-white border border-amber-900/50'
                        }`}
                      >
                        <span>{game === 'Anime Guess' ? '🎌' : '🏀'}</span>
                        <span>{game}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Live Stats Bar */}
                <div className="flex flex-wrap items-center justify-between sm:justify-end gap-1.5 sm:gap-2">
                  {selectedMode === 'Timed' && (
                    <div className={`px-2.5 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1 ${
                      timeLeft <= 10
                        ? 'bg-rose-950/90 border-rose-500 text-rose-200 animate-pulse'
                        : 'bg-[#160a0e] border-amber-500/40 text-amber-200'
                    }`}>
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      <span>{timeLeft}с</span>
                    </div>
                  )}

                  {selectedMode === 'Hard' && (
                    <div className="px-2.5 py-1.5 rounded-xl bg-[#160a0e] border border-rose-700/50 text-xs font-black text-rose-300 flex items-center gap-1">
                      {Array.from({ length: HARD_LIVES }).map((_, idx) => (
                        <Heart
                          key={idx}
                          className={`w-3.5 h-3.5 ${
                            idx < lives ? 'text-rose-500 fill-rose-500' : 'text-stone-700'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  <div className="px-2.5 py-1.5 rounded-xl bg-[#160a0e] border border-amber-900/40 text-xs font-bold text-amber-300 flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>{score}</span>
                  </div>

                  <div className="px-2.5 py-1.5 rounded-xl bg-[#160a0e] border border-amber-900/40 text-xs font-bold text-orange-300 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>{streak}</span>
                  </div>

                  {!isGameFinished && answeredCount > 0 && (
                    <button
                      onClick={handleFinishEarly}
                      className="px-2.5 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/50 text-xs font-bold text-emerald-200 flex items-center gap-1"
                      title="Тоглоомыг дуусгаж оноо хадгалах"
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>Дуусгах</span>
                    </button>
                  )}

                  <button
                    onClick={() => resetRound(selectedGame, selectedMode)}
                    className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#2a141b] hover:bg-[#341b23] border border-amber-900/50 text-xs font-semibold text-amber-200 flex items-center gap-1"
                    title="Дахин эхлэх"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Шинэчлэх</span>
                  </button>
                </div>
              </div>

              {/* Compact 3-Column Mode Selector (fits cleanly in 1 row on phones!) */}
              <div className="space-y-1.5">
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                  {(['Classic', 'Timed', 'Hard'] as GameMode[]).map((mode) => {
                    const info = MODE_DESCRIPTIONS[mode];
                    const active = selectedMode === mode;
                    return (
                      <button
                        key={mode}
                        onClick={() => resetRound(selectedGame, mode)}
                        className={`px-2 py-2 sm:p-3 rounded-xl sm:rounded-2xl border text-center sm:text-left transition-all min-h-[44px] ${
                          active
                            ? 'bg-amber-950/60 border-amber-400 ring-1 ring-amber-400/40'
                            : 'bg-[#160a0e]/80 border-amber-900/40 hover:border-amber-700/60'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
                          <span className={`text-xs font-black ${active ? 'text-amber-200' : 'text-amber-100/80'}`}>
                            <span className="sm:hidden">{info.shortLabel}</span>
                            <span className="hidden sm:inline">{info.label}</span>
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#2a141b] text-amber-300 font-bold self-center sm:self-auto">
                            {info.badge}
                          </span>
                        </div>
                        <div className="hidden sm:block text-[11px] text-amber-200/70 mt-1">{info.desc}</div>
                      </button>
                    );
                  })}
                </div>
                {/* Mobile 1-line active mode rule hint */}
                <p className="sm:hidden text-[11px] text-amber-200/75 text-center px-1">
                  {MODE_DESCRIPTIONS[selectedMode].desc}
                </p>
              </div>
            </div>

            {/* Either Game Over Name & Firestore Save Screen OR Active Question */}
            {isGameFinished ? (
              <div className="bg-[#160a0e] border-2 border-amber-400/70 rounded-3xl p-5 sm:p-8 max-w-2xl mx-auto space-y-5 text-center shadow-2xl">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500/30 to-red-600/30 border border-amber-400/60 flex items-center justify-center text-amber-300">
                  <Trophy className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                    {selectedMode === 'Hard' && lives <= 0 ? 'Амь дууслаа!' : 'Тоглоом дууслаа!'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-amber-100 mt-1">
                    Таны нийт оноо: <span className="text-amber-300">{score}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-amber-200/75 mt-1">
                    {selectedGame} • {selectedMode} горим • {correctCount}/{answeredCount} зөв • Дээд Streak: {bestStreak}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-left">
                  <div className="bg-[#221016] p-2.5 sm:p-3 rounded-xl border border-amber-900/40">
                    <div className="text-[10px] text-amber-400/70 uppercase font-bold">Тоглоом</div>
                    <div className="font-bold text-amber-100 mt-0.5 truncate">{selectedGame}</div>
                  </div>
                  <div className="bg-[#221016] p-2.5 sm:p-3 rounded-xl border border-amber-900/40">
                    <div className="text-[10px] text-amber-400/70 uppercase font-bold">Горим</div>
                    <div className="font-bold text-amber-100 mt-0.5">{selectedMode}</div>
                  </div>
                  <div className="bg-[#221016] p-2.5 sm:p-3 rounded-xl border border-amber-900/40">
                    <div className="text-[10px] text-amber-400/70 uppercase font-bold">Оноо</div>
                    <div className="font-black text-amber-300 mt-0.5">{score} оноо</div>
                  </div>
                  <div className="bg-[#221016] p-2.5 sm:p-3 rounded-xl border border-amber-900/40">
                    <div className="text-[10px] text-amber-400/70 uppercase font-bold">Огноо</div>
                    <div className="font-bold text-amber-100 mt-0.5">
                      {new Date().toLocaleDateString('mn-MN')}
                    </div>
                  </div>
                </div>

                {scoreSaved ? (
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 space-y-4">
                    <div className="flex items-center justify-center gap-2 text-emerald-300 font-black text-xs sm:text-sm">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>Амжилттай! Таны оноо Firestore "scores" санд хадгалагдлаа.</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-2.5">
                      <button
                        onClick={() => {
                          setGameViewMode('leaderboard');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-xs sm:text-sm shadow-lg min-h-[44px]"
                      >
                        <Trophy className="w-4 h-4" />
                        <span>🏆 Leaderboard руу очих</span>
                      </button>
                      <button
                        onClick={() => resetRound(selectedGame, selectedMode)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2a141b] hover:bg-[#351b23] text-amber-100 border border-amber-900/50 font-bold text-xs sm:text-sm min-h-[44px]"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Дахин тоглох</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveScore} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-bold text-amber-200 mb-1.5">
                        Тоглогчийн нэрээ оруулна уу:
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={40}
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Жишээ нь: Erka"
                        className="w-full bg-[#221016] border-2 border-amber-900/60 focus:border-amber-400 rounded-xl px-4 py-3 text-base text-amber-100 placeholder-amber-400/40 focus:outline-none font-bold"
                      />
                    </div>

                    {saveError && (
                      <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs">
                        {saveError}
                      </div>
                    )}

                    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                      <button
                        type="button"
                        onClick={() => resetRound(selectedGame, selectedMode)}
                        className="px-4 py-3 rounded-xl bg-[#2a141b] hover:bg-[#351b23] text-amber-200 border border-amber-900/50 text-xs font-bold min-h-[44px]"
                      >
                        Дахин тоглох
                      </button>

                      <button
                        type="submit"
                        disabled={isSavingScore}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-700 via-amber-600 to-amber-700 hover:from-red-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm shadow-lg border border-amber-300/60 disabled:opacity-50 min-h-[46px]"
                      >
                        <Save className="w-4 h-4" />
                        <span>
                          {isSavingScore ? 'Хадгалж байна...' : 'Оноогоо хадгалах (Нэвтрэхгүй)'}
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <>
                {/* Question Card */}
                <div className="bg-[#160a0e] border border-amber-900/40 rounded-2xl p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between text-xs text-amber-400/70">
                    <span>
                      Асуулт {questionIndex + 1} / {questions.length}
                    </span>
                    {currentQuestion.erkaFavorite && (
                      <span className="px-2 py-0.5 rounded-full bg-red-950/80 border border-red-700/50 text-amber-200 font-bold text-[10px] sm:text-[11px]">
                        ⭐ Эрхэмбаярын дуртай
                      </span>
                    )}
                  </div>

                  <div className="text-3xl sm:text-5xl py-1 sm:py-2 tracking-widest select-none">
                    {currentQuestion.emojiClue}
                  </div>

                  <div className="max-w-xl mx-auto space-y-2">
                    <div className="p-3 sm:p-3.5 rounded-xl bg-[#221016] border border-amber-900/30 text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                      <span className="font-bold text-amber-400 mr-1.5">Сэжүүр 1:</span>
                      {currentQuestion.hint1}
                    </div>

                    {selectedMode !== 'Hard' && (
                      showHint2 ? (
                        <div className="p-3 sm:p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs sm:text-sm text-amber-100 leading-relaxed">
                          <span className="font-bold text-amber-300 mr-1.5">Нэмэлт сэжүүр:</span>
                          {currentQuestion.hint2}
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowHint2(true)}
                          disabled={selectedOption !== null}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 disabled:opacity-40 py-1.5"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>
                            Нэмэлт сэжүүр харах {selectedMode === 'Classic' ? '(+10 оноо болно)' : ''}
                          </span>
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Revealed Image & Answer Card right after answering */}
                {selectedOption !== null && (
                  <div
                    className={`rounded-2xl border-2 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 shadow-xl transition-all ${
                      isCorrect
                        ? 'bg-emerald-950/35 border-emerald-500/70'
                        : 'bg-rose-950/35 border-rose-500/70'
                    }`}
                  >
                    <div className="w-36 h-48 sm:w-32 sm:h-44 rounded-2xl overflow-hidden border-2 border-amber-400/70 bg-[#12070a] shrink-0 shadow-lg">
                      <img
                        key={currentQuestion.id}
                        src={imgSrc || currentQuestion.imageUrl}
                        alt={currentQuestion.title}
                        referrerPolicy="no-referrer"
                        onError={() => {
                          const fallback = buildFallbackPosterUrl(currentQuestion);
                          if (imgSrc !== fallback) {
                            setImgSrc(fallback);
                          }
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-2.5 w-full">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-black/35 border border-white/10">
                        {isCorrect ? (
                          <span className="text-emerald-300">🎉 Зөв таалаа!</span>
                        ) : (
                          <span className="text-rose-300">😅 Буруу байна!</span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-xl font-black text-amber-100">
                          {currentQuestion.title}
                        </h3>
                        <p className="text-xs text-amber-300/80 font-medium">
                          {currentQuestion.subtitle}
                        </p>
                      </div>

                      <div className="pt-1">
                        <button
                          onClick={handleNextQuestion}
                          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm shadow-lg transition-all active:scale-95 min-h-[44px]"
                        >
                          {(selectedMode === 'Hard' && lives <= 0) || questionIndex + 1 >= questions.length
                            ? 'Үр дүн харах & Нэрээ хадгалах →'
                            : `Дараагийн асуулт → (${questionIndex + 1}/${questions.length})`}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {currentQuestion.options.map((option) => {
                    const isPicked = selectedOption === option;
                    const isAnswer = option === currentQuestion.title;
                    let btnStyle =
                      'bg-[#261218] hover:bg-[#321720] border-amber-900/50 hover:border-amber-500/60 text-amber-100';

                    if (selectedOption !== null) {
                      if (isAnswer) {
                        btnStyle =
                          'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-1 ring-emerald-400/50';
                      } else if (isPicked && !isAnswer) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                      } else {
                        btnStyle = 'bg-[#170a0e]/60 border-amber-900/20 text-stone-500';
                      }
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => handleGuess(option)}
                        disabled={selectedOption !== null}
                        className={`p-3.5 sm:p-4 rounded-2xl border-2 font-bold text-sm text-left transition-all flex items-center justify-between min-h-[50px] active:scale-[0.99] ${btnStyle}`}
                      >
                        <span className="pr-2">{option}</span>
                        {selectedOption !== null && isAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {selectedOption !== null && isPicked && !isAnswer && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </section>

          {/* Optional Deployed URL Embed Box */}
          <section className="bg-[#201014]/80 border border-amber-900/40 rounded-3xl p-4 sm:p-5 space-y-3 sm:space-y-4">
            <div>
              <h2 className="text-sm font-bold text-amber-100 flex items-center gap-2">
                <Link2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Эх AI Studio Тоглоомоо яг энд Iframe-ээр нээх (Сонголттой)</span>
              </h2>
              <p className="text-xs text-amber-200/70 mt-0.5">
                Хэрэв та тоглоомынхоо <span className="font-mono text-amber-300">.run.app</span> эсвэл <span className="font-mono text-amber-300">.netlify.app</span> нийтлэгдсэн линкийг оруулбал яг энэ дэлгэц дотор шууд ачаалж тоглож болно.
              </p>
            </div>

            <form onSubmit={handleEmbedSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="url"
                value={customEmbedUrl}
                onChange={(e) => setCustomEmbedUrl(e.target.value)}
                placeholder="https://ais-pre-...run.app"
                className="flex-1 bg-[#160a0e] border border-amber-900/50 rounded-xl px-3.5 py-2.5 text-sm sm:text-xs text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-400 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 text-amber-100 border border-amber-400/60 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0 min-h-[42px]"
              >
                <Eye className="w-4 h-4 text-amber-300" />
                <span>Энд ачаалах</span>
              </button>
              {showEmbedFrame && (
                <button
                  type="button"
                  onClick={() => setShowEmbedFrame(false)}
                  className="px-3 py-2.5 rounded-xl bg-[#2a141b] hover:bg-rose-950/60 text-amber-200 border border-amber-900/40 text-xs font-semibold shrink-0"
                >
                  Хаах
                </button>
              )}
            </form>

            {showEmbedFrame && customEmbedUrl && (
              <div className="w-full h-[460px] sm:h-[540px] rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-white shadow-2xl">
                <iframe
                  src={customEmbedUrl}
                  title="Anime Guess Game Live Embed"
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </div>
            )}
          </section>

          {/* Live Leaderboard Always Visible Inside Game Tab */}
          <div id="game-leaderboard">
            <LeaderboardView
              authUser={authUser}
              onGoogleSignIn={async () => { await onGoogleSignIn(); }}
              onSelectTab={onSelectTab}
              initialGame={selectedGame}
              refreshTrigger={leaderboardRefreshKey}
              onPlayGame={(game) => {
                resetRound(game, selectedMode);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
