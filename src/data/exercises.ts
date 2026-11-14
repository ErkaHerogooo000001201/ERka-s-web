export interface PromptConfig {
  label: string;
  type: 'number' | 'text';
  value: string;
  placeholder?: string;
  helper?: string;
}

export interface PresetItem {
  name: string;
  values: (string | number)[];
}

export interface Exercise {
  id: string;
  file: string;
  title: string;
  lesson: string;
  lessonNum: number;
  category: string;
  type: 'Code Battle' | 'Дасгал' | 'Бонус';
  description: string;
  code: string;
  prompts: PromptConfig[];
  presets?: PresetItem[];
  explanation: {
    overview: string;
    steps: string[];
    concepts: string[];
  };
}

export const EXERCISES: Exercise[] = [
  {
    id: "8-amidarsan-hugatsaa",
    file: "8-amidarsan-hugatsaa.js",
    title: "8. Амьдарсан хугацаа",
    lesson: "Хичээл 8",
    lessonNum: 8,
    category: "Хувьсагч ба Арифметик",
    type: "Code Battle",
    description: "Наснаас хамаарч өдөр, цаг, минутын тоог тооцоолно.",
    prompts: [
      {
        label: "Нас (жилээр)",
        type: "number",
        value: "25",
        placeholder: "Жишээ нь: 25",
        helper: "Хүний амьдарсан насны тоо"
      }
    ],
    presets: [
      { name: "25 нас", values: [25] },
      { name: "18 нас", values: [18] },
      { name: "1 нас (хүүхэд)", values: [1] },
      { name: "50 нас", values: [50] }
    ],
    code: `// Хичээл 8 · Code Battle 2 — Амьдарсан хугацаа
let nas = Number(prompt("Хэдэн настай вэ?"));
let odor = nas * 365;
let tsag = odor * 24;
let minut = tsag * 60;

alert(nas + " нас = " + odor + " өдөр = " + tsag + " цаг = " + minut + " минут");`,
    explanation: {
      overview: "Хүний насыг өдөр, цаг, минутад хөрвүүлэх энгийн үржих үйлдлүүдийг харуулсан бодлого.",
      steps: [
        "prompt() ашиглан хэрэглэгчээс насыг авч Number() болгон хөрвүүлнэ.",
        "1 жилд 365 өдөр байх тул `nas * 365` хийж өдрийн тоог олно.",
        "1 өдөрт 24 цаг байх тул `odor * 24` хийнэ.",
        "1 цагт 60 минут байх тул `tsag * 60` хийж эцсийн үр дүнг alert() хийнэ."
      ],
      concepts: ["prompt()", "Number() хөрвүүлэлт", "Арифметик үржүүлэх үйлдэл", "String залгах (+)"]
    }
  },
  {
    id: "8-ireeduin-nas",
    file: "8-ireeduin-nas.js",
    title: "8. Ирээдүйн нас",
    lesson: "Хичээл 8",
    lessonNum: 8,
    category: "Хувьсагч ба Арифметик",
    type: "Дасгал",
    description: "Төрсөн он, ирээдүйн он дээр үндэслэн насийг тооцоолох.",
    prompts: [
      {
        label: "Төрсөн он",
        type: "number",
        value: "2000",
        placeholder: "Жишээ нь: 2000"
      },
      {
        label: "Аль онд шалгах вэ?",
        type: "number",
        value: "2030",
        placeholder: "Жишээ нь: 2030"
      }
    ],
    presets: [
      { name: "2000 -> 2030", values: [2000, 2030] },
      { name: "1995 -> 2050", values: [1995, 2050] },
      { name: "2010 -> 2026", values: [2010, 2026] }
    ],
    code: `// Хичээл 8 · Дасгал 3 — Ирээдүйн нас
let torsonOn = Number(prompt("Төрсөн он?"));
let irehOn = Number(prompt("Аль онд?"));
let nas = irehOn - torsonOn;

alert(irehOn + " онд " + nas + " настай болно");`,
    explanation: {
      overview: "Ирээдүйн он болон төрсөн оны ялгаврыг олж, тухайн үед хүрэх насыг тооцоолно.",
      steps: [
        "Төрсөн он болон сонирхож буй ирээдүйн оныг дараалан авна.",
        "Хасах үйлдлээр `irehOn - torsonOn` хийж насийг бодно.",
        "alert() ашиглан үр дүнг текст хэлбэрээр хэвлэнэ."
      ],
      concepts: ["Хасах үйлдэл", "Олон оролт авах", "Хувьсагч хадгалах"]
    }
  },
  {
    id: "8-tongorog-too",
    file: "8-tongorog-too.js",
    title: "8. Тонгорог тоо",
    lesson: "Хичээл 8",
    lessonNum: 8,
    category: "Орон салгах & Математик",
    type: "Code Battle",
    description: "4 оронтой тоог урвуу дарааллаар бичнэ.",
    prompts: [
      {
        label: "4 оронтой тоо",
        type: "number",
        value: "1234",
        placeholder: "Жишээ нь: 1234",
        helper: "Яг 4 оронтой тоо оруулна уу"
      }
    ],
    presets: [
      { name: "1234 → 4321", values: [1234] },
      { name: "9876 → 6789", values: [9876] },
      { name: "5002 → 2005", values: [5002] },
      { name: "1000 → 1", values: [1000] }
    ],
    code: `// Хичээл 8 · Code Battle 6 — Тонгорогсон тоо (4 оронтой)
let too = Number(prompt("4 оронтой тоо?"));
let a = too % 10;                      // 4-р орон (сүүлчийн цифр)
let b = Math.floor(too / 10) % 10;     // 3-р орон
let c = Math.floor(too / 100) % 10;    // 2-р орон
let d = Math.floor(too / 1000);        // 1-р орон (эхний цифр)
let urvuu = a * 1000 + b * 100 + c * 10 + d;

alert(too + " → " + urvuu);`,
    explanation: {
      overview: "4 оронтой тооны цифр бүрийг үлдэгдэлтэй хуваах (%) болон Math.floor() ашиглан салгаж аваад, эсрэг дарааллаар нийлүүлэн тонгоруулах сонгодог алгоритм.",
      steps: [
        "`too % 10` нь хамгийн арын 4-р орон (жишээ: 1234 % 10 = 4).",
        "`Math.floor(too / 10) % 10` нь 3-р орон (123 % 10 = 3).",
        "`Math.floor(too / 100) % 10` нь 2-р орон (12 % 10 = 2).",
        "`Math.floor(too / 1000)` нь эхний цифр (1).",
        "Тонгоргохдоо 4*1000 + 3*100 + 2*10 + 1 = 4321 болгоно."
      ],
      concepts: ["Үлдэгдэл олох үйлдэл (%)", "Math.floor()", "Оронгийн жин"]
    }
  },
  {
    id: "9-dun",
    file: "9-dun.js",
    title: "9. Дүн",
    lesson: "Хичээл 9",
    lessonNum: 9,
    category: "Нөхцөлт шалгалт (If/Else)",
    type: "Дасгал",
    description: "Онооны дагуу D, C, B, A, F зэрэглэл тодорхойлно.",
    prompts: [
      {
        label: "Оноо (0–100)",
        type: "number",
        value: "85",
        placeholder: "Жишээ нь: 85"
      }
    ],
    presets: [
      { name: "95 оноо (A)", values: [95] },
      { name: "82 оноо (B)", values: [82] },
      { name: "74 оноо (C)", values: [74] },
      { name: "63 оноо (D)", values: [63] },
      { name: "48 оноо (F)", values: [48] }
    ],
    code: `// Хичээл 9 · Дасгал 5 — Дүн
let onoo = Number(prompt("Оноо (0–100)?"));

if (onoo >= 90) {
  alert("A");
} else if (onoo >= 80) {
  alert("B");
} else if (onoo >= 70) {
  alert("C");
} else if (onoo >= 60) {
  alert("D");
} else {
  alert("F");
}`,
    explanation: {
      overview: "Оюутны сурлагын үнэлгээг `if-else if-else` шаталсан шалгалтаар шалгаж, харгалзах үсгэн үнэлгээг буцаана.",
      steps: [
        "Хэрэв onoo >= 90 бол 'A'",
        "Үгүй бол дараагийн шат: onoo >= 80 бол 'B'",
        "Үгүй бол: onoo >= 70 бол 'C'",
        "Үгүй бол: onoo >= 60 бол 'D'",
        "Дээрх нөхцөлийг хангахгүй буюу 60-аас доош бол 'F'"
      ],
      concepts: ["Шаталсан if / else if", "Харьцуулах оператор (>==)", "Логик урсгал"]
    }
  },
  {
    id: "9-nuuts-ug",
    file: "9-nuuts-ug.js",
    title: "9. Нууц үг",
    lesson: "Хичээл 9",
    lessonNum: 9,
    category: "Нөхцөлт шалгалт (If/Else)",
    type: "Дасгал",
    description: "Нууц үгээ давтаж оруулж зөв эсэхийг шалгана.",
    prompts: [
      {
        label: "Шинэ нууц үг",
        type: "text",
        value: "pass123",
        placeholder: "Нууц үгээ бичнэ үү"
      },
      {
        label: "Нууц үгээ дахин оруул",
        type: "text",
        value: "pass123",
        placeholder: "Баталгаажуулан давтаж бичнэ үү"
      }
    ],
    presets: [
      { name: "Ижил нууц үг (pass123)", values: ["pass123", "pass123"] },
      { name: "Зөрүүтэй нууц үг", values: ["securePassword", "wrongPass"] }
    ],
    code: `// Хичээл 9 · Дасгал 4 — Нууц үг
let password = prompt("Шинэ нууц үг?");
let password2 = prompt("Нууц үгээ дахин оруул");

if (password === password2) {
  alert("Нууц үг амжилттай солигдлоо");
} else {
  alert("Нууц үгээ зөв давтаж оруулаарай");
}`,
    explanation: {
      overview: "Хоёр текстэн мөр хоорондоо тэнцүү эсэхийг `===` strict equality оператороор шалгах бодлого.",
      steps: [
        "Эхний нууц үгийг авна.",
        "Баталгаажуулах хоёр дахь нууц үгийг авна.",
        "`password === password2` тэнцэж байвал амжилттай, зөрсөн бол алдааны мэдээлэл өгнө."
      ],
      concepts: ["Strict Equality (===)", "Текст харьцуулалт", "if / else"]
    }
  },
  {
    id: "9-undur-jil",
    file: "9-undur-jil.js",
    title: "9. Өндөр жил",
    lesson: "Хичээл 9",
    lessonNum: 9,
    category: "Логик оператор (&&, ||)",
    type: "Бонус",
    description: "Жилийг өндөр жил эсвэл энгийн жилээр тодорхойлно.",
    prompts: [
      {
        label: "Шалгах он",
        type: "number",
        value: "2024",
        placeholder: "Он оруулна уу (жишээ: 2024)"
      }
    ],
    presets: [
      { name: "2024 (Өндөр жил)", values: [2024] },
      { name: "2023 (Энгийн жил)", values: [2023] },
      { name: "2000 (Өндөр жил - 400 хуваагдана)", values: [2000] },
      { name: "1900 (Энгийн жил - 100 хуваагддаг)", values: [1900] }
    ],
    code: `// Хичээл 9 · Бонус — Өндөр жил
let on = Number(prompt("Он?"));

if ((on % 4 === 0 && on % 100 !== 0) || on % 400 === 0) {
  alert(on + " — өндөр жил");
} else {
  alert(on + " — энгийн");
}`,
    explanation: {
      overview: "Григорийн хуанлийн өндөр жил (Leap Year) тооцоолох дүрэм. 4-т хуваагддаг ба 100-д хуваагддаггүй, эсвэл 400-д бүтэн хуваагддаг жилүүд өндөр жил байна.",
      steps: [
        "`(on % 4 === 0 && on % 100 !== 0)`: 4 жилд нэг удаа, гэхдээ зуун жилийн зааг биш байх.",
        "`|| on % 400 === 0`: Харин 400 жилд нэг удаа давхар зуун байсан ч өндөр жил байна (жишээ нь: 2000 он).",
        "Нөхцөл биелвэл 'өндөр жил', үгүй бол 'энгийн' гэж хэвлэнэ."
      ],
      concepts: ["Логик AND (&&)", "Логик OR (||)", "Үлдэгдэл (%)", "Хуанлийн математик"]
    }
  },
  {
    id: "9-zamyn-tsagdaa",
    file: "9-zamyn-tsagdaa.js",
    title: "9. Замын цагдаа",
    lesson: "Хичээл 9",
    lessonNum: 9,
    category: "Нөхцөлт шалгалт (If/Else)",
    type: "Дасгал",
    description: "Хурдны дагуу торгууль, эрх хасалт эсэхийг шалгана.",
    prompts: [
      {
        label: "Машины хурд (км/ц)",
        type: "number",
        value: "80",
        placeholder: "Жишээ нь: 80"
      }
    ],
    presets: [
      { name: "75 км/ц (Хэвийн)", values: [75] },
      { name: "80 км/ц (Зөвшөөрөгдөх дээд)", values: [80] },
      { name: "95 км/ц (3 оноо алдсан, эрх хасагдаагүй)", values: [95] },
      { name: "110 км/ц (6 оноо алдсан, эрх хасагдсан)", values: [110] }
    ],
    code: `// Хичээл 9 · Дасгал 8 — Замын цагдаа
let speed = Number(prompt("Хурд (км/ц)?"));

if (speed <= 80) {
  alert("Хурд хэвийн");
} else {
  let onoo = Math.floor((speed - 80) / 5);
  if (onoo >= 5) {
    alert(onoo + " оноо алдсан. Эрх хасагдсан");
  } else {
    alert(onoo + " оноо алдсан. Эрх хасагдаагүй");
  }
}`,
    explanation: {
      overview: "Хурд 80 км/ц-аас хэтэрсэн 5 км/ц тутамд 1 оноо хасдаг замын цагдаагийн дүрмийг загварчилсан алгоритм.",
      steps: [
        "`speed <= 80` бол хурд хэвийн тул шийтгэлгүй.",
        "80-аас хэтэрвэл `Math.floor((speed - 80) / 5)` хийж алдсан оноог бодно.",
        "Хэрэв алдсан оноо >= 5 бол эрх хасагдана, үгүй бол эрх хасагдахгүй оноо алдана."
      ],
      concepts: ["Доторлогоо if (Nested if)", "Math.floor()", "Бодит амьдралын дүрмийг кодоор илэрхийлэх"]
    }
  },
  {
    id: "10-chiher-huvaah",
    file: "10-chiher-huvaah.js",
    title: "10. Чихэр хуваах",
    lesson: "Хичээл 10",
    lessonNum: 10,
    category: "Давталт (For loop)",
    type: "Дасгал",
    description: "Чихэрийг хүүхдүүдэд хэрхэн жигд хуваахыг тооцоолно.",
    prompts: [
      {
        label: "Чихэрийн тоо",
        type: "number",
        value: "20",
        placeholder: "Жишээ нь: 20"
      }
    ],
    presets: [
      { name: "20 чихэр", values: [20] },
      { name: "17 чихэр (Анхны тоо)", values: [17] },
      { name: "12 чихэр", values: [12] },
      { name: "7 чихэр (Анхны тоо)", values: [7] }
    ],
    code: `// Хичээл 10 · Дасгал 10 — Чихэр хуваах
let chiher = Number(prompt("Хэдэн чихэр байна?"));
let t = "";
let huvaagch = 0;

for (let i = 1; i <= chiher; i++) {
  if (chiher % i === 0) {
    t = t + i + " хүнд " + chiher / i + " ширхэг\\n";
    huvaagch = huvaagch + 1;
  }
}

if (huvaagch === 2) {
  t = t + "Анхны тоо";
}

alert(t);`,
    explanation: {
      overview: "Бүх боломжит хуваагчдыг for давталтаар олж, хэрвээ зөвхөн 1 ба өөртөө л хуваагддаг бол (huvaagch === 2) анхны тоо гэдгийг тодорхойлно.",
      steps: [
        "1-ээс эхлээд чихэрийн тоо хүртэл давтана.",
        "`chiher % i === 0` бол уг тоо хуваагч мөн тул `i хүнд chiher / i ширхэг` гэж үр дүнд нэмнэ.",
        "Нийт хуваагчийн тоо яг 2 байвал уг тоо Анхны тоо (Prime number) болно."
      ],
      concepts: ["for давталт", "Текст хуримтлуулах (Accumulator string)", "Анхны тоо тодорхойлох"]
    }
  },
  {
    id: "10-shatryn-budaa",
    file: "10-shatryn-budaa.js",
    title: "10. Шатрын будаа",
    lesson: "Хичээл 10",
    lessonNum: 10,
    category: "Давталт (For loop)",
    type: "Бонус",
    description: "Нүдний тоо дагуу шатрын будаа нийт хичнээн удаа нэмэгдэж байгааг тооцоолно.",
    prompts: [
      {
        label: "Хэдэн нүд (1–64)",
        type: "number",
        value: "5",
        placeholder: "Жишээ нь: 5"
      }
    ],
    presets: [
      { name: "5 нүд (31 будаа)", values: [5] },
      { name: "8 нүд (1 мөр: 255 будаа)", values: [8] },
      { name: "16 нүд (65,535 будаа)", values: [16] },
      { name: "32 нүд (4,294,967,295 будаа)", values: [32] }
    ],
    code: `// Хичээл 10 · Бонус — Шатрын будаа
let nud = Number(prompt("Хэдэн нүд?"));
let budaa = 1;
let niitBudaa = 0;

for (let i = 1; i <= nud; i++) {
  niitBudaa = niitBudaa + budaa;
  budaa = budaa * 2;
}

alert(niitBudaa + " будаа");`,
    explanation: {
      overview: "Эртний Энэтхэгийн домогт гардаг шатрын хөлөг дээрх будааны экспоненциал өсөлт: 1-р нүдэнд 1, 2-р нүдэнд 2, 3-р нүдэнд 4, 4-р нүдэнд 8 будаа гэх мэтчилэн 2 дахин үржигдэх цувааны нийлбэр (2^n - 1).",
      steps: [
        "Эхний нүдний будааг 1-ээр эхлүүлнэ.",
        "Нүд бүр дээр тухайн будааг нийт нийлбэрт нэмнэ: `niitBudaa = niitBudaa + budaa`.",
        "Дараагийн нүдэнд зориулж будааны тоог хоёр дахин үржүүлнэ: `budaa = budaa * 2`."
      ],
      concepts: ["Экспоненциал өсөлт", "Хуримтлуулагч хувьсагч (Sum accumulator)", "for давталт"]
    }
  },
  {
    id: "10-unelgee",
    file: "10-unelgee.js",
    title: "10. Үнэлгээ",
    lesson: "Хичээл 10",
    lessonNum: 10,
    category: "Давталт (For loop)",
    type: "Дасгал",
    description: "Үнэлгээгээр оноо болон од хэлбэртэй санал дүгнэлт гаргана.",
    prompts: [
      {
        label: "Үнэлгээ (1–5)",
        type: "number",
        value: "4",
        placeholder: "1-ээс 5 хүртэл"
      }
    ],
    presets: [
      { name: "5 од ⭐⭐⭐⭐⭐", values: [5] },
      { name: "4 од ⭐⭐⭐⭐", values: [4] },
      { name: "3 од ⭐⭐⭐", values: [3] },
      { name: "1 од ⭐", values: [1] }
    ],
    code: `// Хичээл 10 · Дасгал 4 — Үнэлгээ
let unelgee = Number(prompt("Үнэлгээ (1–5)?"));
let t = "";

for (let i = 1; i <= unelgee; i++) {
  t = t + "⭐";
}

alert(t);`,
    explanation: {
      overview: "Хэрэглэгчийн оруулсан тооны хэмжээгээр эерэг үнэлгээний од (⭐) тэмдэгтийг давталтаар залгаж харуулах дасгал.",
      steps: [
        "Хоосон текстэн мөр `let t = ''` зарлана.",
        "1-ээс үнэлгээ хүртэл гүйж, алхам бүрт од '⭐' нэмж залгана.",
        "Үүссэн оддын цувааг alert()-аар гаргана."
      ],
      concepts: ["Тэмдэгт мөр залгах (String concatenation)", "for давталт"]
    }
  },
  {
    id: "10-unii-husnegt",
    file: "10-unii-husnegt.js",
    title: "10. Үнийн хүснэгт",
    lesson: "Хичээл 10",
    lessonNum: 10,
    category: "Давталт (For loop)",
    type: "Дасгал",
    description: "Бараа бүтээгдэхүүний үнэ болон нийт дүнг 1-ээс 10 ширхэг хүртэл харуулна.",
    prompts: [
      {
        label: "Нэг ширхэгийн үнэ (₮)",
        type: "number",
        value: "1500",
        placeholder: "Жишээ нь: 1500"
      }
    ],
    presets: [
      { name: "1,500₮ (Талх)", values: [1500] },
      { name: "4,200₮ (Сүү)", values: [4200] },
      { name: "12,000₮ (Ном)", values: [1200] },
      { name: "25,000₮ (Цамц)", values: [25000] }
    ],
    code: `// Хичээл 10 · Дасгал 7 — Үнийн хүснэгт
let une = Number(prompt("Нэг ширхэгийн үнэ?"));
let t = "";

for (let i = 1; i <= 10; i++) {
  t = t + i + " ширхэг: " + i * une + "₮\\n";
}

alert(t);`,
    explanation: {
      overview: "Нэгжийн үнийг 1-ээс 10 ширхэг тутамд үржүүлж, үнийн хүснэгтийн жагсаалт үүсгэх дасгал.",
      steps: [
        "Барааны 1 ширхэгийн үнийг оруулна.",
        "for давталтаар 1-ээс 10 хүртэл гүйж `i * une` хийж нийт үнийг тооцно.",
        "Шинэ мөр (`\\n`) залгаж хүснэгт хэлбэрээр хэвлэнэ."
      ],
      concepts: ["Шинэ мөр шилжүүлэх (\\n)", "Үржих үйлдэл", "Форматтай хэвлэлт"]
    }
  },
  {
    id: "10-utasny-mungu",
    file: "10-utasny-mungu.js",
    title: "10. Утасны мөнгө",
    lesson: "Хичээл 10",
    lessonNum: 10,
    category: "Давталт (For loop)",
    type: "Дасгал",
    description: "Сар бүр хадгалсан мөнгө болон нийт хуримтлалыг сар бүрээр тооцоолно.",
    prompts: [
      {
        label: "Сар бүр хадгалах мөнгө (₮)",
        type: "number",
        value: "100000",
        placeholder: "Жишээ нь: 100000"
      },
      {
        label: "Хэдэн сар хадгалах вэ?",
        type: "number",
        value: "12",
        placeholder: "Жишээ нь: 12"
      }
    ],
    presets: [
      { name: "100,000₮ х 12 сар (1 жил)", values: [100000, 12] },
      { name: "250,000₮ х 6 сар (Хагас жил)", values: [250000, 6] },
      { name: "50,000₮ х 24 сар (2 жил)", values: [50000, 24] }
    ],
    code: `// Хичээл 10 · Дасгал 9 — Утасны мөнгө
let sarBur = Number(prompt("Сар бүр хэдэн төгрөг хадгалах вэ?"));
let sar = Number(prompt("Хэдэн сар?"));
let mungu = 0;
let t = "";

for (let i = 1; i <= sar; i++) {
  mungu = mungu + sarBur;
  t = t + i + "-р сар: " + mungu + "₮\\n";
}

alert(t);`,
    explanation: {
      overview: "Хуримтлалын сар бүрийн өсөлтийг харуулсан санхүүгийн тооцоологч. Сар бүр хуримтлуулах дүнг өмнөх үлдэгдэл дээр тасралтгүй нэмж тооцно.",
      steps: [
        "Сар бүрийн хуримтлуулах дүн болон сарын тоог авна.",
        "1-ээс заасан сар хүртэл гүйх явцдаа `mungu = mungu + sarBur` хийж нэмэгдүүлнэ.",
        "Сар бүрийн төгсгөлийн хуримтлагдсан нийт дүнг жагсаалт байдлаар гаргана."
      ],
      concepts: ["Нийлбэр хуримтлуулагч (Running total)", "for давталт"]
    }
  },
  {
    id: "11-rekord",
    file: "11-rekord.js",
    title: "11. Рекорд",
    lesson: "Хичээл 11",
    lessonNum: 11,
    category: "Массив & Хамгийн их/бага (Array)",
    type: "Дасгал",
    description: "Өгөгдсөн тоонуудын хамгийн их ба хамгийн бага утгыг олох.",
    prompts: [
      {
        label: "Тоонуудыг таслалаар бичнэ үү",
        type: "text",
        value: "1200,3400,900,5100,2800",
        placeholder: "Жишээ нь: 1200,3400,900,5100,2800",
        helper: "Таслалаар зааглагдсан тоонууд оруулна уу"
      }
    ],
    presets: [
      { name: "Үндсэн: 1200,3400,900,5100,2800", values: ["1200,3400,900,5100,2800"] },
      { name: "Цалин: 850000, 1400000, 2100000, 950000", values: ["850000, 1400000, 2100000, 950000"] },
      { name: "Температур: -15, 2, -28, 5, -3", values: ["-15, 2, -28, 5, -3"] },
      { name: "Оноо: 98, 45, 78, 92, 100, 64", values: ["98, 45, 78, 92, 100, 64"] }
    ],
    code: `// Хичээл 11 · Дасгал 5 — Рекорд
let inputText = prompt("Тоонуудыг таслалаар оруулна уу (жишээ: 1200,3400,900,5100,2800)");
let record = inputText
  ? inputText.split(",").map((value) => Number(value.trim())).filter((value) => !Number.isNaN(value))
  : [1200, 3400, 900, 5100, 2800];

if (record.length === 0) {
  record = [1200, 3400, 900, 5100, 2800];
}

let max = record[0];
let min = record[0];

for (let i = 0; i < record.length; i++) {
  if (record[i] > max) {
    max = record[i];
  }
  if (record[i] < min) {
    min = record[i];
  }
}

alert("Рекорд: " + max + "\\nХамгийн бага: " + min);`,
    explanation: {
      overview: "Массивын эхний элементийг max ба min гэж үзээд, давталтаар массив дундуур гүйж харьцуулан хамгийн их ба бага утгыг олох суурь алгоритм.",
      steps: [
        "Оролтын текстийг `,` таслалаар салган массив болгож тоонд хөрвүүлнэ.",
        "`max = record[0]`, `min = record[0]` гэж эхний элементийг жишиг болгоно.",
        "Давталтаар элемент бүрийг шалгаж: `record[i] > max` бол шинэ max, `record[i] < min` бол шинэ min болгоно.",
        "Эцэст нь хамгийн их (Рекорд) болон хамгийн багыг хэвлэнэ."
      ],
      concepts: ["Массив (Array)", "Хайлт ба харьцуулалт", "Max/Min алгоритм", "split() ба map()"]
    }
  },
  {
    id: "11-yu-uzeh-ve",
    file: "11-yu-uzeh-ve.js",
    title: "11. Өнөөдөр юу үзэх вэ?",
    lesson: "Хичээл 11",
    lessonNum: 11,
    category: "Массив & Хайлт (Array)",
    type: "Бонус",
    description: "Санамсаргүй байдлаар кино, анимэ сонгож өгөх эсвэл хайх програм.",
    prompts: [
      {
        label: "Анимэний нэр бичнэ үү (эсвэл хоосон үлдээж санамсаргүй сонгох)",
        type: "text",
        value: "Naruto",
        placeholder: "Жишээ нь: Naruto, One Piece гэх мэт"
      }
    ],
    presets: [
      { name: "Naruto хайх", values: ["Naruto"] },
      { name: "One Piece хайх", values: ["One Piece"] },
      { name: "Demon Slayer хайх", values: ["Demon Slayer"] },
      { name: "Хоосон (Санамсаргүй сонголт)", values: [""] }
    ],
    code: `// Хичээл 11 · Бонус — Өнөөдөр юу үзэх вэ?
let anime = ["Naruto", "One Piece", "Dragon Ball", "Attack on Titan", "Demon Slayer"];
let emoji = ["🍥🦊🍜", "🏴‍☠️👒🍖", "🐉🟠⭐", "🧱👊⚔️", "👹🗡️🌸"];
let angi = [220, 1150, 153, 89, 63];

let inputText = prompt("Анимэний нэрээ бичнэ үү (жишээ: Naruto)") || "";
let r = anime.findIndex((item) => item.toLowerCase() === inputText.trim().toLowerCase());

if (r === -1) {
  r = Math.floor(Math.random() * anime.length);
}

alert("Өнөөдөр: " + emoji[r] + " " + anime[r] + " (" + angi[r] + " анги)");`,
    explanation: {
      overview: "Зэрэгцээ массивууд (Parallel arrays) ашиглан нэр, эможи, ангийн тоог индексээр нь холбох, мөн Math.random() ашиглан санамсаргүй сонголт хийх бодлого.",
      steps: [
        "anime, emoji, angi гурван массивыг ижил урттайгаар зарлана.",
        "`findIndex()` ашиглан хэрэглэгчийн бичсэн анимэг олно.",
        "Олдохгүй бол `Math.floor(Math.random() * anime.length)` хийж санамсаргүй индекс гаргана.",
        "Индексийн дагуу холбогдох эможи, нэр, нийт ангийн тоог харуулна."
      ],
      concepts: ["Массивын аргууд (findIndex)", "Math.random()", "Зэрэгцээ массив (Parallel Arrays)"]
    }
  }
];
