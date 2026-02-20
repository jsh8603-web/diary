export interface StickerDef {
  id: string;
  name: string;
  category: "baby-items" | "milestone" | "emotion" | "deco";
  svg: string;
  width: number;
  height: number;
}

// 소프트 핑크/크림/토프 컬러 팔레트
const PINK = "#F5E6E0";
const PINK_D = "#E8CFC6";
const TAUPE = "#9D7658";
const TAUPE_L = "#B8956F";
const SAGE = "#C2CEBC";
const SAGE_D = "#A3B299";
const CREAM = "#FFF8F0";
const GOLD = "#D4A574";
const LAVENDER = "#D8D0E3";
const LAVENDER_D = "#B8AECA";
const PEACH = "#FADCC4";
const PEACH_D = "#F0C4A8";
const MINT = "#C5DED0";
const DUSTY_ROSE = "#D4A5A5";

export const stickers: StickerDef[] = [
  // ── 아기용품 (baby-items) ──
  {
    id: "baby-stroller",
    name: "유모차",
    category: "baby-items",
    width: 110,
    height: 100,
    svg: `<svg viewBox="0 0 110 100" xmlns="http://www.w3.org/2000/svg">
      <!-- 캐노피 -->
      <path d="M20 45 Q22 20 70 20 L70 45Z" fill="${PEACH}" opacity="0.7"/>
      <path d="M18 45 Q20 18 72 18 L72 45Z" fill="${PEACH_D}" opacity="0.4"/>
      <!-- 바구니 몸체 -->
      <rect x="18" y="44" width="54" height="26" rx="8" fill="${PINK}" opacity="0.75"/>
      <!-- 핸들 -->
      <path d="M70 44 Q90 30 90 20" stroke="${TAUPE_L}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- 바퀴 테두리 -->
      <circle cx="30" cy="80" r="12" fill="${CREAM}" stroke="${TAUPE_L}" stroke-width="2" opacity="0.8"/>
      <circle cx="62" cy="80" r="12" fill="${CREAM}" stroke="${TAUPE_L}" stroke-width="2" opacity="0.8"/>
      <!-- 바퀴 중심 -->
      <circle cx="30" cy="80" r="4" fill="${TAUPE_L}" opacity="0.5"/>
      <circle cx="62" cy="80" r="4" fill="${TAUPE_L}" opacity="0.5"/>
      <!-- 프레임 -->
      <line x1="18" y1="70" x2="30" y2="80" stroke="${TAUPE_L}" stroke-width="2"/>
      <line x1="72" y1="70" x2="62" y2="80" stroke="${TAUPE_L}" stroke-width="2"/>
    </svg>`,
  },
  {
    id: "baby-bottle",
    name: "젖병",
    category: "baby-items",
    width: 60,
    height: 110,
    svg: `<svg viewBox="0 0 60 110" xmlns="http://www.w3.org/2000/svg">
      <!-- 젖꼭지 -->
      <ellipse cx="30" cy="10" rx="7" ry="9" fill="${PEACH_D}" opacity="0.7"/>
      <!-- 목 부분 -->
      <rect x="23" y="16" width="14" height="8" fill="${TAUPE_L}" opacity="0.5"/>
      <!-- 캡 링 -->
      <rect x="20" y="22" width="20" height="6" rx="3" fill="${SAGE_D}" opacity="0.6"/>
      <!-- 병 몸통 -->
      <rect x="16" y="26" width="28" height="62" rx="12" fill="${MINT}" opacity="0.6"/>
      <!-- 눈금 -->
      <line x1="35" y1="40" x2="42" y2="40" stroke="${SAGE_D}" stroke-width="1" opacity="0.5"/>
      <line x1="35" y1="52" x2="42" y2="52" stroke="${SAGE_D}" stroke-width="1" opacity="0.5"/>
      <line x1="35" y1="64" x2="42" y2="64" stroke="${SAGE_D}" stroke-width="1" opacity="0.5"/>
      <line x1="35" y1="76" x2="42" y2="76" stroke="${SAGE_D}" stroke-width="1" opacity="0.5"/>
      <!-- 액체 -->
      <rect x="16" y="60" width="28" height="28" rx="0" fill="${PEACH}" opacity="0.4"/>
      <rect x="16" y="84" width="28" height="4" rx="0" fill="${CREAM}" opacity="0.3"/>
      <!-- 병 바닥 -->
      <ellipse cx="30" cy="88" rx="14" ry="5" fill="${MINT}" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "baby-pacifier",
    name: "공갈젖꼭지",
    category: "baby-items",
    width: 80,
    height: 80,
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <!-- 방패 (실드) -->
      <ellipse cx="40" cy="42" rx="28" ry="22" fill="${LAVENDER}" opacity="0.65"/>
      <ellipse cx="40" cy="42" rx="24" ry="18" fill="none" stroke="${LAVENDER_D}" stroke-width="1" opacity="0.6"/>
      <!-- 구멍 왼쪽 -->
      <circle cx="28" cy="42" r="4" fill="white" opacity="0.6"/>
      <!-- 구멍 오른쪽 -->
      <circle cx="52" cy="42" r="4" fill="white" opacity="0.6"/>
      <!-- 젖꼭지 넥 -->
      <ellipse cx="40" cy="26" rx="7" ry="5" fill="${PEACH_D}" opacity="0.7"/>
      <!-- 젖꼭지 -->
      <ellipse cx="40" cy="14" rx="11" ry="13" fill="${PEACH}" opacity="0.7"/>
      <!-- 링 -->
      <circle cx="40" cy="62" r="8" fill="none" stroke="${LAVENDER_D}" stroke-width="2.5" opacity="0.7"/>
    </svg>`,
  },
  {
    id: "baby-crib",
    name: "아기침대",
    category: "baby-items",
    width: 120,
    height: 90,
    svg: `<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg">
      <!-- 프레임 좌측 -->
      <rect x="8" y="20" width="5" height="58" rx="2" fill="${TAUPE_L}" opacity="0.6"/>
      <!-- 프레임 우측 -->
      <rect x="107" y="20" width="5" height="58" rx="2" fill="${TAUPE_L}" opacity="0.6"/>
      <!-- 상단 레일 -->
      <rect x="6" y="18" width="108" height="7" rx="3" fill="${TAUPE_L}" opacity="0.6"/>
      <!-- 하단 레일 -->
      <rect x="6" y="68" width="108" height="7" rx="3" fill="${TAUPE_L}" opacity="0.5"/>
      <!-- 매트리스 -->
      <rect x="14" y="62" width="92" height="14" rx="4" fill="${CREAM}" opacity="0.8"/>
      <!-- 침구 -->
      <ellipse cx="60" cy="62" rx="38" ry="10" fill="${PINK}" opacity="0.6"/>
      <!-- 슬랫 (살대) -->
      <rect x="28" y="25" width="4" height="43" rx="2" fill="${PEACH_D}" opacity="0.5"/>
      <rect x="44" y="25" width="4" height="43" rx="2" fill="${PEACH_D}" opacity="0.5"/>
      <rect x="60" y="25" width="4" height="43" rx="2" fill="${PEACH_D}" opacity="0.5"/>
      <rect x="76" y="25" width="4" height="43" rx="2" fill="${PEACH_D}" opacity="0.5"/>
      <rect x="88" y="25" width="4" height="43" rx="2" fill="${PEACH_D}" opacity="0.5"/>
      <!-- 다리 -->
      <rect x="10" y="75" width="5" height="14" rx="2" fill="${TAUPE_L}" opacity="0.5"/>
      <rect x="105" y="75" width="5" height="14" rx="2" fill="${TAUPE_L}" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "baby-rattle",
    name: "딸랑이",
    category: "baby-items",
    width: 70,
    height: 100,
    svg: `<svg viewBox="0 0 70 100" xmlns="http://www.w3.org/2000/svg">
      <!-- 딸랑이 머리 -->
      <circle cx="35" cy="28" r="24" fill="${PEACH}" opacity="0.7"/>
      <circle cx="35" cy="28" r="18" fill="${PEACH_D}" opacity="0.4"/>
      <!-- 점들 (구슬 느낌) -->
      <circle cx="27" cy="22" r="3" fill="${DUSTY_ROSE}" opacity="0.5"/>
      <circle cx="43" cy="22" r="3" fill="${DUSTY_ROSE}" opacity="0.5"/>
      <circle cx="35" cy="34" r="3" fill="${DUSTY_ROSE}" opacity="0.5"/>
      <!-- 손잡이 넥 -->
      <rect x="30" y="50" width="10" height="8" rx="3" fill="${TAUPE_L}" opacity="0.5"/>
      <!-- 손잡이 -->
      <rect x="27" y="55" width="16" height="40" rx="8" fill="${MINT}" opacity="0.65"/>
      <!-- 손잡이 디테일 -->
      <ellipse cx="35" cy="75" rx="5" ry="2" fill="${SAGE_D}" opacity="0.3"/>
    </svg>`,
  },
  {
    id: "baby-bib",
    name: "턱받이",
    category: "baby-items",
    width: 90,
    height: 100,
    svg: `<svg viewBox="0 0 90 100" xmlns="http://www.w3.org/2000/svg">
      <!-- 넥 스트랩 (좌) -->
      <ellipse cx="22" cy="18" rx="16" ry="10" fill="${PINK_D}" opacity="0.6" transform="rotate(-15 22 18)"/>
      <!-- 넥 스트랩 (우) -->
      <ellipse cx="68" cy="18" rx="16" ry="10" fill="${PINK_D}" opacity="0.6" transform="rotate(15 68 18)"/>
      <!-- 목 원형 -->
      <circle cx="45" cy="18" r="12" fill="${CREAM}" opacity="0.9"/>
      <!-- 턱받이 몸통 -->
      <path d="M10 28 Q10 90 45 94 Q80 90 80 28 Q65 22 45 22 Q25 22 10 28Z" fill="${PINK}" opacity="0.7"/>
      <!-- 포켓 라인 -->
      <path d="M20 75 Q45 85 70 75" stroke="${PINK_D}" stroke-width="2" fill="none" opacity="0.6"/>
      <!-- 별 모양 장식 -->
      <polygon points="45,50 48,58 56,58 50,63 52,71 45,66 38,71 40,63 34,58 42,58" fill="${GOLD}" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "baby-onesie",
    name: "아기옷",
    category: "baby-items",
    width: 100,
    height: 110,
    svg: `<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">
      <!-- 왼쪽 소매 -->
      <path d="M10 28 Q5 20 8 10 Q14 6 22 12 L30 32Z" fill="${LAVENDER}" opacity="0.65"/>
      <!-- 오른쪽 소매 -->
      <path d="M90 28 Q95 20 92 10 Q86 6 78 12 L70 32Z" fill="${LAVENDER}" opacity="0.65"/>
      <!-- 몸통 상단 -->
      <path d="M30 18 Q38 12 50 12 Q62 12 70 18 L72 50 L28 50Z" fill="${LAVENDER_D}" opacity="0.5"/>
      <!-- 몸통 -->
      <rect x="22" y="48" width="56" height="44" rx="6" fill="${LAVENDER}" opacity="0.7"/>
      <!-- 스냅 버튼 가랑이 -->
      <path d="M22 88 Q35 100 50 102 Q65 100 78 88" fill="${LAVENDER_D}" opacity="0.5"/>
      <!-- 스냅 버튼 점들 -->
      <circle cx="38" cy="96" r="2.5" fill="${LAVENDER_D}" opacity="0.7"/>
      <circle cx="50" cy="98" r="2.5" fill="${LAVENDER_D}" opacity="0.7"/>
      <circle cx="62" cy="96" r="2.5" fill="${LAVENDER_D}" opacity="0.7"/>
      <!-- 하트 장식 -->
      <path d="M50 60 C44 52 36 54 36 62 C36 68 44 74 50 80 C56 74 64 68 64 62 C64 54 56 52 50 60Z" fill="${PINK}" opacity="0.6"/>
    </svg>`,
  },
  {
    id: "baby-monitor",
    name: "베이비모니터",
    category: "baby-items",
    width: 80,
    height: 90,
    svg: `<svg viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
      <!-- 안테나 -->
      <line x1="60" y1="8" x2="68" y2="2" stroke="${TAUPE_L}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="68" cy="2" r="2" fill="${TAUPE_L}" opacity="0.6"/>
      <!-- 본체 -->
      <rect x="10" y="10" width="60" height="52" rx="8" fill="${CREAM}" opacity="0.85"/>
      <!-- 화면 -->
      <rect x="16" y="16" width="48" height="34" rx="4" fill="${MINT}" opacity="0.5"/>
      <!-- 아기 실루엣 (화면 안) -->
      <ellipse cx="40" cy="24" rx="7" ry="7" fill="${PEACH}" opacity="0.6"/>
      <ellipse cx="40" cy="36" rx="9" ry="8" fill="${PEACH}" opacity="0.5"/>
      <!-- 버튼 열 -->
      <circle cx="26" cy="70" r="4" fill="${SAGE}" opacity="0.6"/>
      <circle cx="40" cy="70" r="4" fill="${PINK}" opacity="0.6"/>
      <circle cx="54" cy="70" r="4" fill="${PEACH}" opacity="0.6"/>
      <!-- 받침대 -->
      <rect x="30" y="62" width="20" height="6" rx="2" fill="${TAUPE_L}" opacity="0.4"/>
      <rect x="24" y="78" width="32" height="6" rx="3" fill="${TAUPE_L}" opacity="0.4"/>
    </svg>`,
  },
  {
    id: "baby-tricycle",
    name: "세발자전거",
    category: "baby-items",
    width: 120,
    height: 90,
    svg: `<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg">
      <!-- 핸들바 -->
      <line x1="48" y1="20" x2="72" y2="20" stroke="${TAUPE_L}" stroke-width="3" stroke-linecap="round"/>
      <line x1="60" y1="20" x2="60" y2="38" stroke="${TAUPE_L}" stroke-width="2.5"/>
      <!-- 안장 -->
      <ellipse cx="60" cy="35" rx="14" ry="5" fill="${PEACH}" opacity="0.7"/>
      <!-- 프레임 (앞) -->
      <line x1="60" y1="40" x2="32" y2="62" stroke="${TAUPE_L}" stroke-width="2.5"/>
      <!-- 프레임 (뒤) -->
      <line x1="60" y1="40" x2="88" y2="62" stroke="${TAUPE_L}" stroke-width="2"/>
      <line x1="60" y1="40" x2="95" y2="62" stroke="${TAUPE_L}" stroke-width="2"/>
      <!-- 앞바퀴 -->
      <circle cx="32" cy="70" r="16" fill="none" stroke="${SAGE_D}" stroke-width="2.5" opacity="0.7"/>
      <circle cx="32" cy="70" r="6" fill="${SAGE}" opacity="0.5"/>
      <!-- 뒷바퀴 좌 -->
      <circle cx="88" cy="70" r="13" fill="none" stroke="${PINK_D}" stroke-width="2.5" opacity="0.7"/>
      <circle cx="88" cy="70" r="5" fill="${PINK}" opacity="0.5"/>
      <!-- 뒷바퀴 우 -->
      <circle cx="108" cy="70" r="10" fill="none" stroke="${PINK_D}" stroke-width="2" opacity="0.6"/>
      <circle cx="108" cy="70" r="4" fill="${PINK}" opacity="0.4"/>
      <!-- 페달 -->
      <circle cx="32" cy="70" r="3" fill="${GOLD}" opacity="0.6"/>
      <line x1="32" y1="67" x2="26" y2="60" stroke="${GOLD}" stroke-width="2" opacity="0.6"/>
    </svg>`,
  },
  {
    id: "baby-teddy",
    name: "곰인형",
    category: "baby-items",
    width: 90,
    height: 100,
    svg: `<svg viewBox="0 0 90 100" xmlns="http://www.w3.org/2000/svg">
      <!-- 귀 -->
      <circle cx="22" cy="18" r="12" fill="${PEACH_D}" opacity="0.65"/>
      <circle cx="22" cy="18" r="7" fill="${PEACH}" opacity="0.5"/>
      <circle cx="68" cy="18" r="12" fill="${PEACH_D}" opacity="0.65"/>
      <circle cx="68" cy="18" r="7" fill="${PEACH}" opacity="0.5"/>
      <!-- 머리 -->
      <circle cx="45" cy="32" r="26" fill="${PEACH_D}" opacity="0.7"/>
      <!-- 얼굴 베이스 -->
      <ellipse cx="45" cy="38" rx="16" ry="12" fill="${CREAM}" opacity="0.7"/>
      <!-- 눈 -->
      <circle cx="37" cy="27" r="4" fill="${TAUPE}" opacity="0.6"/>
      <circle cx="53" cy="27" r="4" fill="${TAUPE}" opacity="0.6"/>
      <circle cx="38" cy="26" r="1.5" fill="white" opacity="0.7"/>
      <circle cx="54" cy="26" r="1.5" fill="white" opacity="0.7"/>
      <!-- 코 -->
      <ellipse cx="45" cy="36" rx="4" ry="3" fill="${DUSTY_ROSE}" opacity="0.6"/>
      <!-- 입 -->
      <path d="M40 41 Q45 46 50 41" stroke="${TAUPE_L}" stroke-width="1.5" fill="none"/>
      <!-- 몸통 -->
      <ellipse cx="45" cy="74" rx="22" ry="24" fill="${PEACH_D}" opacity="0.65"/>
      <!-- 배꼽 원 -->
      <circle cx="45" cy="72" r="8" fill="${CREAM}" opacity="0.6"/>
      <!-- 팔 -->
      <ellipse cx="20" cy="65" rx="10" ry="16" fill="${PEACH_D}" opacity="0.6" transform="rotate(15 20 65)"/>
      <ellipse cx="70" cy="65" rx="10" ry="16" fill="${PEACH_D}" opacity="0.6" transform="rotate(-15 70 65)"/>
    </svg>`,
  },
  {
    id: "baby-duck",
    name: "오리인형",
    category: "baby-items",
    width: 80,
    height: 85,
    svg: `<svg viewBox="0 0 80 85" xmlns="http://www.w3.org/2000/svg">
      <!-- 몸통 -->
      <ellipse cx="40" cy="60" rx="28" ry="22" fill="${GOLD}" opacity="0.65"/>
      <!-- 꼬리 -->
      <path d="M66 55 Q80 50 78 62 Q74 68 66 66Z" fill="${GOLD}" opacity="0.6"/>
      <!-- 날개 -->
      <ellipse cx="30" cy="62" rx="14" ry="9" fill="${PEACH_D}" opacity="0.5" transform="rotate(-10 30 62)"/>
      <!-- 머리 -->
      <circle cx="52" cy="28" r="18" fill="${GOLD}" opacity="0.7"/>
      <!-- 눈 -->
      <circle cx="58" cy="24" r="4" fill="${TAUPE}" opacity="0.7"/>
      <circle cx="59" cy="23" r="1.5" fill="white" opacity="0.8"/>
      <!-- 부리 -->
      <ellipse cx="68" cy="30" rx="8" ry="5" fill="${PEACH_D}" opacity="0.8"/>
      <path d="M62 32 Q68 36 74 32" stroke="${TAUPE_L}" stroke-width="1" fill="none" opacity="0.5"/>
      <!-- 볼 -->
      <circle cx="54" cy="32" r="5" fill="${PEACH}" opacity="0.4"/>
      <!-- 발 -->
      <ellipse cx="30" cy="80" rx="10" ry="5" fill="${PEACH_D}" opacity="0.6"/>
      <ellipse cx="50" cy="80" rx="10" ry="5" fill="${PEACH_D}" opacity="0.6"/>
    </svg>`,
  },
  {
    id: "baby-diaper",
    name: "기저귀",
    category: "baby-items",
    width: 100,
    height: 80,
    svg: `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
      <!-- 기저귀 뒷판 -->
      <path d="M8 20 Q8 10 20 10 L80 10 Q92 10 92 20 L92 65 Q92 75 80 75 L20 75 Q8 75 8 65Z" fill="${CREAM}" opacity="0.8"/>
      <!-- 가운데 패드 영역 -->
      <rect x="30" y="18" width="40" height="46" rx="10" fill="white" opacity="0.7"/>
      <!-- 왼쪽 탭 -->
      <path d="M8 28 Q2 32 2 40 Q2 48 8 52 L20 52 L20 28Z" fill="${PEACH}" opacity="0.6"/>
      <!-- 오른쪽 탭 -->
      <path d="M92 28 Q98 32 98 40 Q98 48 92 52 L80 52 L80 28Z" fill="${PEACH}" opacity="0.6"/>
      <!-- 왼쪽 테이프 -->
      <rect x="12" y="34" width="14" height="12" rx="3" fill="${LAVENDER}" opacity="0.6"/>
      <!-- 오른쪽 테이프 -->
      <rect x="74" y="34" width="14" height="12" rx="3" fill="${LAVENDER}" opacity="0.6"/>
      <!-- 허리밴드 -->
      <rect x="8" y="14" width="84" height="8" rx="4" fill="${PINK}" opacity="0.5"/>
      <!-- 별 장식 -->
      <polygon points="50,38 52,44 58,44 53,48 55,54 50,50 45,54 47,48 42,44 48,44" fill="${GOLD}" opacity="0.4"/>
    </svg>`,
  },

  // ── 마일스톤 (milestone) ──
  {
    id: "ms-footprints",
    name: "발자국",
    category: "milestone",
    width: 70,
    height: 90,
    svg: `<svg viewBox="0 0 70 90" xmlns="http://www.w3.org/2000/svg">
      <!-- 왼쪽 발바닥 -->
      <ellipse cx="20" cy="55" rx="13" ry="20" fill="${PINK_D}" opacity="0.65"/>
      <!-- 왼쪽 발가락 -->
      <circle cx="11" cy="33" r="5" fill="${PINK_D}" opacity="0.65"/>
      <circle cx="18" cy="29" r="4.5" fill="${PINK_D}" opacity="0.65"/>
      <circle cx="25" cy="28" r="4.5" fill="${PINK_D}" opacity="0.65"/>
      <circle cx="31" cy="31" r="4" fill="${PINK_D}" opacity="0.65"/>
      <circle cx="35" cy="37" r="3.5" fill="${PINK_D}" opacity="0.65"/>
      <!-- 오른쪽 발바닥 -->
      <ellipse cx="52" cy="38" rx="13" ry="20" fill="${DUSTY_ROSE}" opacity="0.55"/>
      <!-- 오른쪽 발가락 -->
      <circle cx="43" cy="16" r="5" fill="${DUSTY_ROSE}" opacity="0.55"/>
      <circle cx="50" cy="12" r="4.5" fill="${DUSTY_ROSE}" opacity="0.55"/>
      <circle cx="57" cy="11" r="4.5" fill="${DUSTY_ROSE}" opacity="0.55"/>
      <circle cx="63" cy="14" r="4" fill="${DUSTY_ROSE}" opacity="0.55"/>
      <circle cx="67" cy="20" r="3.5" fill="${DUSTY_ROSE}" opacity="0.55"/>
    </svg>`,
  },
  {
    id: "ms-birthday",
    name: "생일케이크",
    category: "milestone",
    width: 90,
    height: 110,
    svg: `<svg viewBox="0 0 90 110" xmlns="http://www.w3.org/2000/svg">
      <!-- 초 3개 -->
      <rect x="22" y="24" width="6" height="18" rx="3" fill="${GOLD}" opacity="0.7"/>
      <rect x="42" y="18" width="6" height="22" rx="3" fill="${PEACH_D}" opacity="0.7"/>
      <rect x="62" y="24" width="6" height="18" rx="3" fill="${LAVENDER}" opacity="0.7"/>
      <!-- 불꽃 -->
      <ellipse cx="25" cy="20" rx="4" ry="6" fill="${GOLD}" opacity="0.8"/>
      <ellipse cx="45" cy="14" rx="4" ry="6" fill="${GOLD}" opacity="0.8"/>
      <ellipse cx="65" cy="20" rx="4" ry="6" fill="${GOLD}" opacity="0.8"/>
      <!-- 케이크 상단 (크림) -->
      <path d="M8 48 Q15 38 25 42 Q35 46 45 40 Q55 34 65 40 Q75 46 82 42 L82 56 L8 56Z" fill="${CREAM}" opacity="0.85"/>
      <!-- 케이크 1층 -->
      <rect x="8" y="54" width="74" height="24" rx="4" fill="${PINK}" opacity="0.7"/>
      <!-- 1층 장식 -->
      <circle cx="25" cy="66" r="4" fill="${DUSTY_ROSE}" opacity="0.6"/>
      <circle cx="45" cy="66" r="4" fill="${GOLD}" opacity="0.6"/>
      <circle cx="65" cy="66" r="4" fill="${LAVENDER_D}" opacity="0.6"/>
      <!-- 케이크 2층 -->
      <rect x="18" y="76" width="54" height="22" rx="4" fill="${PEACH}" opacity="0.7"/>
      <!-- 크림 웨이브 -->
      <path d="M18 76 Q27 68 36 76 Q45 84 54 76 Q63 68 72 76" stroke="${CREAM}" stroke-width="2" fill="none" opacity="0.7"/>
    </svg>`,
  },
  {
    id: "ms-first-birthday",
    name: "첫돌",
    category: "milestone",
    width: 80,
    height: 100,
    svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
      <!-- 왕관 -->
      <polygon points="10,50 10,28 22,38 40,14 58,38 70,28 70,50" fill="${GOLD}" opacity="0.65" stroke="${TAUPE_L}" stroke-width="1"/>
      <circle cx="10" cy="28" r="4" fill="${GOLD}" opacity="0.8"/>
      <circle cx="40" cy="14" r="4" fill="${GOLD}" opacity="0.8"/>
      <circle cx="70" cy="28" r="4" fill="${GOLD}" opacity="0.8"/>
      <!-- 왕관 보석 -->
      <circle cx="25" cy="40" r="3" fill="${PEACH}" opacity="0.7"/>
      <circle cx="55" cy="40" r="3" fill="${PEACH}" opacity="0.7"/>
      <!-- 숫자 1 몸통 -->
      <rect x="34" y="56" width="12" height="36" rx="4" fill="${TAUPE_L}" opacity="0.6"/>
      <!-- 숫자 1 상단 사선 -->
      <path d="M28 68 L34 58" stroke="${TAUPE_L}" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
      <!-- 숫자 1 받침 -->
      <rect x="24" y="88" width="32" height="8" rx="4" fill="${TAUPE_L}" opacity="0.55"/>
      <!-- 별 장식 -->
      <polygon points="14,72 16,78 22,78 17,82 19,88 14,84 9,88 11,82 6,78 12,78" fill="${GOLD}" opacity="0.5"/>
      <polygon points="66,72 68,78 74,78 69,82 71,88 66,84 61,88 63,82 58,78 64,78" fill="${GOLD}" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "ms-growth",
    name: "키재기",
    category: "milestone",
    width: 50,
    height: 130,
    svg: `<svg viewBox="0 0 50 130" xmlns="http://www.w3.org/2000/svg">
      <!-- 자 몸통 -->
      <rect x="10" y="5" width="30" height="120" rx="4" fill="${CREAM}" opacity="0.85" stroke="${TAUPE_L}" stroke-width="1"/>
      <!-- 눈금 큰 것 (10단위) -->
      <line x1="10" y1="20" x2="28" y2="20" stroke="${TAUPE_L}" stroke-width="1.5" opacity="0.7"/>
      <line x1="10" y1="44" x2="28" y2="44" stroke="${TAUPE_L}" stroke-width="1.5" opacity="0.7"/>
      <line x1="10" y1="68" x2="28" y2="68" stroke="${TAUPE_L}" stroke-width="1.5" opacity="0.7"/>
      <line x1="10" y1="92" x2="28" y2="92" stroke="${TAUPE_L}" stroke-width="1.5" opacity="0.7"/>
      <line x1="10" y1="116" x2="28" y2="116" stroke="${TAUPE_L}" stroke-width="1.5" opacity="0.7"/>
      <!-- 눈금 작은 것 (5단위) -->
      <line x1="10" y1="32" x2="22" y2="32" stroke="${TAUPE_L}" stroke-width="1" opacity="0.5"/>
      <line x1="10" y1="56" x2="22" y2="56" stroke="${TAUPE_L}" stroke-width="1" opacity="0.5"/>
      <line x1="10" y1="80" x2="22" y2="80" stroke="${TAUPE_L}" stroke-width="1" opacity="0.5"/>
      <line x1="10" y1="104" x2="22" y2="104" stroke="${TAUPE_L}" stroke-width="1" opacity="0.5"/>
      <!-- 색깔 마커 (성장 표시) -->
      <rect x="28" y="62" width="10" height="4" rx="2" fill="${PEACH_D}" opacity="0.7"/>
      <rect x="28" y="38" width="10" height="4" rx="2" fill="${SAGE}" opacity="0.7"/>
      <!-- 화살표 (성장) -->
      <polygon points="40,14 36,22 44,22" fill="${GOLD}" opacity="0.6"/>
    </svg>`,
  },
  {
    id: "ms-crawling",
    name: "기어다니기",
    category: "milestone",
    width: 110,
    height: 70,
    svg: `<svg viewBox="0 0 110 70" xmlns="http://www.w3.org/2000/svg">
      <!-- 머리 -->
      <circle cx="88" cy="20" r="16" fill="${PEACH_D}" opacity="0.7"/>
      <!-- 머리카락 -->
      <path d="M78 10 Q88 4 98 10" stroke="${TAUPE_L}" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5"/>
      <!-- 눈 -->
      <circle cx="84" cy="18" r="2.5" fill="${TAUPE}" opacity="0.6"/>
      <circle cx="92" cy="18" r="2.5" fill="${TAUPE}" opacity="0.6"/>
      <!-- 미소 -->
      <path d="M83 24 Q88 28 93 24" stroke="${TAUPE_L}" stroke-width="1.5" fill="none" opacity="0.6"/>
      <!-- 몸통 -->
      <ellipse cx="58" cy="38" rx="28" ry="16" fill="${PEACH}" opacity="0.6"/>
      <!-- 오른팔 (앞) -->
      <path d="M75 32 Q82 20 80 12" stroke="${PEACH_D}" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.65"/>
      <!-- 왼팔 (뒤) -->
      <path d="M48 34 Q38 22 36 14" stroke="${PEACH_D}" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.6"/>
      <!-- 오른다리 -->
      <path d="M45 48 Q32 55 24 65" stroke="${PEACH_D}" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.65"/>
      <!-- 왼다리 -->
      <path d="M66 50 Q68 62 64 68" stroke="${PEACH_D}" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.6"/>
      <!-- 볼 -->
      <circle cx="95" cy="24" r="5" fill="${DUSTY_ROSE}" opacity="0.4"/>
    </svg>`,
  },
  {
    id: "ms-walking",
    name: "첫걸음",
    category: "milestone",
    width: 60,
    height: 110,
    svg: `<svg viewBox="0 0 60 110" xmlns="http://www.w3.org/2000/svg">
      <!-- 머리 -->
      <circle cx="34" cy="14" r="12" fill="${PEACH_D}" opacity="0.7"/>
      <!-- 머리카락 -->
      <path d="M26 8 Q34 2 42 8" stroke="${TAUPE_L}" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.5"/>
      <!-- 눈 -->
      <circle cx="30" cy="13" r="2" fill="${TAUPE}" opacity="0.6"/>
      <circle cx="38" cy="13" r="2" fill="${TAUPE}" opacity="0.6"/>
      <!-- 미소 -->
      <path d="M30 18 Q34 22 38 18" stroke="${TAUPE_L}" stroke-width="1.5" fill="none" opacity="0.6"/>
      <!-- 몸통 -->
      <rect x="24" y="28" width="20" height="28" rx="8" fill="${LAVENDER}" opacity="0.65"/>
      <!-- 왼팔 (앞으로) -->
      <path d="M24 34 Q12 38 10 48" stroke="${LAVENDER_D}" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.6"/>
      <!-- 오른팔 (뒤로) -->
      <path d="M44 34 Q52 40 54 50" stroke="${LAVENDER_D}" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.55"/>
      <!-- 왼다리 (앞으로 내딛기) -->
      <path d="M28 56 Q22 72 14 82" stroke="${PEACH_D}" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.65"/>
      <!-- 발 왼쪽 -->
      <ellipse cx="12" cy="86" rx="9" ry="5" fill="${PEACH_D}" opacity="0.65"/>
      <!-- 오른다리 (뒤) -->
      <path d="M36 56 Q40 74 42 84" stroke="${PEACH_D}" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.6"/>
      <!-- 발 오른쪽 -->
      <ellipse cx="42" cy="88" rx="9" ry="5" fill="${PEACH_D}" opacity="0.6"/>
      <!-- 볼 -->
      <circle cx="40" cy="18" r="4" fill="${DUSTY_ROSE}" opacity="0.4"/>
    </svg>`,
  },
  {
    id: "ms-tooth",
    name: "첫이빨",
    category: "milestone",
    width: 70,
    height: 80,
    svg: `<svg viewBox="0 0 70 80" xmlns="http://www.w3.org/2000/svg">
      <!-- 치아 외형 -->
      <path d="M12 10 Q12 4 20 4 L50 4 Q58 4 58 10 L58 48 Q58 58 52 62 Q46 66 43 58 Q40 50 35 50 Q30 50 27 58 Q24 66 18 62 Q12 58 12 48Z" fill="white" opacity="0.9" stroke="${TAUPE_L}" stroke-width="1.5"/>
      <!-- 치아 중앙 선 (치아 분할) -->
      <line x1="35" y1="4" x2="35" y2="50" stroke="${PINK_D}" stroke-width="1" opacity="0.4"/>
      <!-- 반짝이 효과 -->
      <path d="M20 15 L22 12 L24 15 L22 18Z" fill="${GOLD}" opacity="0.5"/>
      <circle cx="48" cy="20" r="3" fill="${GOLD}" opacity="0.4"/>
      <!-- 볼 뺨 -->
      <circle cx="10" cy="55" r="8" fill="${PINK}" opacity="0.5"/>
      <circle cx="60" cy="55" r="8" fill="${PINK}" opacity="0.5"/>
      <!-- 스마일 -->
      <path d="M20 72 Q35 80 50 72" stroke="${TAUPE_L}" stroke-width="2" fill="none" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "ms-first-food",
    name: "이유식",
    category: "milestone",
    width: 90,
    height: 90,
    svg: `<svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      <!-- 그릇 -->
      <ellipse cx="52" cy="68" rx="34" ry="14" fill="${CREAM}" opacity="0.7"/>
      <path d="M20 56 Q20 78 52 80 Q84 78 84 56Z" fill="${CREAM}" opacity="0.75"/>
      <ellipse cx="52" cy="56" rx="32" ry="12" fill="${PEACH}" opacity="0.65"/>
      <!-- 음식 (이유식) -->
      <ellipse cx="52" cy="52" rx="26" ry="9" fill="${GOLD}" opacity="0.5"/>
      <!-- 숟가락 -->
      <ellipse cx="22" cy="24" rx="9" ry="12" fill="${SAGE}" opacity="0.7"/>
      <rect x="20" y="34" width="4" height="32" rx="2" fill="${SAGE_D}" opacity="0.65"/>
      <!-- 숟가락 내용물 -->
      <ellipse cx="22" cy="24" rx="6" ry="8" fill="${PEACH_D}" opacity="0.5"/>
      <!-- 별 장식 -->
      <polygon points="68,22 70,28 76,28 71,32 73,38 68,34 63,38 65,32 60,28 66,28" fill="${GOLD}" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "ms-first-book",
    name: "첫그림책",
    category: "milestone",
    width: 100,
    height: 80,
    svg: `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
      <!-- 책 왼쪽 페이지 -->
      <path d="M50 10 Q30 8 12 14 L12 72 Q30 66 50 70Z" fill="${LAVENDER}" opacity="0.7"/>
      <!-- 책 오른쪽 페이지 -->
      <path d="M50 10 Q70 8 88 14 L88 72 Q70 66 50 70Z" fill="${PEACH}" opacity="0.7"/>
      <!-- 책 등뼈 -->
      <rect x="47" y="8" width="6" height="64" rx="2" fill="${TAUPE_L}" opacity="0.5"/>
      <!-- 왼쪽 페이지 그림 (별) -->
      <polygon points="28,28 30,34 36,34 31,38 33,44 28,40 23,44 25,38 20,34 26,34" fill="${GOLD}" opacity="0.5"/>
      <!-- 왼쪽 텍스트 라인 -->
      <line x1="18" y1="52" x2="44" y2="52" stroke="${LAVENDER_D}" stroke-width="1.5" opacity="0.5"/>
      <line x1="18" y1="58" x2="40" y2="58" stroke="${LAVENDER_D}" stroke-width="1.5" opacity="0.5"/>
      <line x1="18" y1="64" x2="44" y2="64" stroke="${LAVENDER_D}" stroke-width="1.5" opacity="0.4"/>
      <!-- 오른쪽 페이지 그림 (꽃) -->
      <circle cx="72" cy="28" r="10" fill="${PINK}" opacity="0.5"/>
      <circle cx="60" cy="28" r="7" fill="${PINK_D}" opacity="0.4"/>
      <circle cx="72" cy="38" r="7" fill="${PINK_D}" opacity="0.4"/>
      <circle cx="72" cy="28" r="4" fill="${GOLD}" opacity="0.4"/>
      <!-- 오른쪽 텍스트 라인 -->
      <line x1="56" y1="52" x2="84" y2="52" stroke="${PEACH_D}" stroke-width="1.5" opacity="0.5"/>
      <line x1="56" y1="58" x2="80" y2="58" stroke="${PEACH_D}" stroke-width="1.5" opacity="0.5"/>
      <line x1="56" y1="64" x2="84" y2="64" stroke="${PEACH_D}" stroke-width="1.5" opacity="0.4"/>
    </svg>`,
  },
  {
    id: "ms-first-photo",
    name: "첫사진",
    category: "milestone",
    width: 90,
    height: 80,
    svg: `<svg viewBox="0 0 90 80" xmlns="http://www.w3.org/2000/svg">
      <!-- 카메라 본체 -->
      <rect x="8" y="22" width="74" height="50" rx="8" fill="${TAUPE_L}" opacity="0.6"/>
      <!-- 상단 돌출부 (뷰파인더/핫슈) -->
      <rect x="28" y="14" width="34" height="12" rx="5" fill="${TAUPE}" opacity="0.55"/>
      <!-- 셔터 버튼 -->
      <circle cx="70" cy="18" r="6" fill="${PEACH_D}" opacity="0.7"/>
      <circle cx="70" cy="18" r="3.5" fill="${CREAM}" opacity="0.7"/>
      <!-- 렌즈 외곽 -->
      <circle cx="40" cy="48" r="22" fill="${TAUPE}" opacity="0.5"/>
      <!-- 렌즈 중간 -->
      <circle cx="40" cy="48" r="16" fill="${MINT}" opacity="0.5"/>
      <!-- 렌즈 내부 -->
      <circle cx="40" cy="48" r="10" fill="${SAGE_D}" opacity="0.55"/>
      <!-- 렌즈 반사 -->
      <circle cx="35" cy="43" r="3" fill="white" opacity="0.4"/>
      <!-- 플래시 -->
      <rect x="68" y="30" width="8" height="6" rx="2" fill="${GOLD}" opacity="0.6"/>
    </svg>`,
  },
  {
    id: "ms-newborn",
    name: "신생아",
    category: "milestone",
    width: 80,
    height: 100,
    svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
      <!-- 포대기 외형 -->
      <path d="M15 40 Q10 55 10 70 Q10 90 40 92 Q70 90 70 70 Q70 55 65 40Z" fill="${CREAM}" opacity="0.85"/>
      <!-- 포대기 무늬 -->
      <path d="M15 40 Q40 48 65 40" stroke="${PINK_D}" stroke-width="1" fill="none" opacity="0.4"/>
      <path d="M12 55 Q40 63 68 55" stroke="${PINK_D}" stroke-width="1" fill="none" opacity="0.3"/>
      <!-- 포대기 접힌 부분 -->
      <path d="M15 40 Q40 50 65 40 Q55 28 40 26 Q25 28 15 40Z" fill="${PINK}" opacity="0.6"/>
      <!-- 아기 얼굴 -->
      <circle cx="40" cy="20" r="18" fill="${PEACH_D}" opacity="0.75"/>
      <!-- 모자 -->
      <path d="M23 16 Q25 6 40 5 Q55 6 57 16Z" fill="${PINK}" opacity="0.7"/>
      <line x1="22" y1="17" x2="58" y2="17" stroke="${PINK_D}" stroke-width="2" opacity="0.5"/>
      <!-- 눈 (감은) -->
      <path d="M33 19 Q36 22 39 19" stroke="${TAUPE}" stroke-width="1.5" fill="none" opacity="0.6"/>
      <path d="M41 19 Q44 22 47 19" stroke="${TAUPE}" stroke-width="1.5" fill="none" opacity="0.6"/>
      <!-- 코 -->
      <ellipse cx="40" cy="24" rx="2.5" ry="2" fill="${DUSTY_ROSE}" opacity="0.5"/>
      <!-- 입 -->
      <path d="M36 28 Q40 32 44 28" stroke="${TAUPE_L}" stroke-width="1.5" fill="none" opacity="0.5"/>
      <!-- 볼 -->
      <circle cx="29" cy="24" r="5" fill="${PINK}" opacity="0.4"/>
      <circle cx="51" cy="24" r="5" fill="${PINK}" opacity="0.4"/>
    </svg>`,
  },
  {
    id: "ms-stork",
    name: "황새",
    category: "milestone",
    width: 110,
    height: 100,
    svg: `<svg viewBox="0 0 110 100" xmlns="http://www.w3.org/2000/svg">
      <!-- 보자기 -->
      <ellipse cx="30" cy="72" rx="22" ry="18" fill="${PINK}" opacity="0.7"/>
      <path d="M10 70 Q30 88 50 70" fill="${PINK_D}" opacity="0.5"/>
      <!-- 보자기 매듭 -->
      <circle cx="30" cy="52" r="8" fill="${PINK_D}" opacity="0.65"/>
      <!-- 황새 몸통 -->
      <ellipse cx="72" cy="55" rx="26" ry="18" fill="white" opacity="0.85"/>
      <!-- 날개 -->
      <path d="M50 48 Q55 30 80 34 Q90 36 96 44" fill="${CREAM}" opacity="0.75"/>
      <path d="M50 58 Q55 72 80 70 Q92 68 96 60" fill="${CREAM}" opacity="0.6"/>
      <!-- 목 -->
      <path d="M94 50 Q102 42 100 30 Q98 20 95 14" stroke="white" stroke-width="10" stroke-linecap="round" fill="none"/>
      <!-- 머리 -->
      <circle cx="96" cy="10" r="10" fill="white" opacity="0.85"/>
      <!-- 부리 -->
      <path d="M100 8 L114 12 L100 16Z" fill="${PEACH_D}" opacity="0.8"/>
      <!-- 눈 -->
      <circle cx="102" cy="8" r="2.5" fill="${TAUPE}" opacity="0.7"/>
      <!-- 보자기 묶는 줄 -->
      <path d="M30 60 Q28 56 30 52" stroke="${PINK_D}" stroke-width="2" fill="none"/>
      <!-- 다리 -->
      <line x1="62" y1="72" x2="56" y2="90" stroke="${PEACH_D}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
      <line x1="74" y1="72" x2="76" y2="90" stroke="${PEACH_D}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
      <!-- 발 -->
      <line x1="50" y1="90" x2="62" y2="90" stroke="${PEACH_D}" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
      <line x1="70" y1="90" x2="82" y2="90" stroke="${PEACH_D}" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
    </svg>`,
  },

  // ── 감정표현 (emotion) ──
  {
    id: "emo-happy",
    name: "웃는얼굴",
    category: "emotion",
    width: 70,
    height: 70,
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="30" fill="${PEACH}" opacity="0.8"/>
      <ellipse cx="23" cy="28" rx="5" ry="6" fill="${TAUPE}" opacity="0.7"/>
      <ellipse cx="47" cy="28" rx="5" ry="6" fill="${TAUPE}" opacity="0.7"/>
      <ellipse cx="23" cy="26" rx="3" ry="4" fill="${CREAM}" opacity="0.5"/>
      <ellipse cx="47" cy="26" rx="3" ry="4" fill="${CREAM}" opacity="0.5"/>
      <path d="M22 43 Q35 56 48 43" stroke="${TAUPE}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="22" cy="38" r="5" fill="${DUSTY_ROSE}" opacity="0.4"/>
      <circle cx="48" cy="38" r="5" fill="${DUSTY_ROSE}" opacity="0.4"/>
    </svg>`,
  },
  {
    id: "emo-laugh",
    name: "깔깔웃음",
    category: "emotion",
    width: 70,
    height: 70,
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="30" fill="${PEACH}" opacity="0.8"/>
      <path d="M20 28 Q23 24 26 28" stroke="${TAUPE}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M44 28 Q47 24 50 28" stroke="${TAUPE}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M19 43 Q35 60 51 43" stroke="${TAUPE}" stroke-width="2" fill="${DUSTY_ROSE}" opacity="0.5"/>
      <ellipse cx="35" cy="49" rx="8" ry="5" fill="${CREAM}" opacity="0.7"/>
      <circle cx="20" cy="38" r="6" fill="${DUSTY_ROSE}" opacity="0.4"/>
      <circle cx="50" cy="38" r="6" fill="${DUSTY_ROSE}" opacity="0.4"/>
    </svg>`,
  },
  {
    id: "emo-heart",
    name: "하트",
    category: "emotion",
    width: 65,
    height: 60,
    svg: `<svg viewBox="0 0 65 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 55 C12 38 2 22 2 15 C2 7 8 1 16 1 C22 1 28 5 32 11 C36 5 42 1 50 1 C58 1 63 7 63 15 C63 22 53 38 32 55Z" fill="${DUSTY_ROSE}" opacity="0.75"/>
      <ellipse cx="20" cy="18" rx="8" ry="6" fill="${CREAM}" opacity="0.3" transform="rotate(-30 20 18)"/>
    </svg>`,
  },
  {
    id: "emo-heart-outline",
    name: "하트라인",
    category: "emotion",
    width: 65,
    height: 60,
    svg: `<svg viewBox="0 0 65 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 55 C12 38 2 22 2 15 C2 7 8 1 16 1 C22 1 28 5 32 11 C36 5 42 1 50 1 C58 1 63 7 63 15 C63 22 53 38 32 55Z" fill="none" stroke="${DUSTY_ROSE}" stroke-width="2.5" opacity="0.8"/>
      <path d="M32 48 C18 35 10 24 10 17 C10 12 13 9 17 9 C21 9 25 12 28 17" fill="none" stroke="${PINK}" stroke-width="1.2" opacity="0.5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: "emo-sleep",
    name: "잠자기",
    category: "emotion",
    width: 70,
    height: 70,
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="37" r="28" fill="${LAVENDER}" opacity="0.7"/>
      <path d="M20 37 Q35 37 50 37" stroke="${TAUPE_L}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M21 30 Q25 26 29 30" stroke="${TAUPE}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M41 30 Q45 26 49 30" stroke="${TAUPE}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M40 10 L44 6 L44 10 L48 6" stroke="${LAVENDER_D}" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.7"/>
      <path d="M50 14 L53 11 L53 14 L56 11" stroke="${LAVENDER_D}" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.6"/>
      <path d="M57 22 L59 20 L59 22 L61 20" stroke="${LAVENDER_D}" stroke-width="1.1" fill="none" stroke-linecap="round" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "emo-cry",
    name: "울기",
    category: "emotion",
    width: 70,
    height: 75,
    svg: `<svg viewBox="0 0 70 75" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="28" fill="${PEACH}" opacity="0.75"/>
      <ellipse cx="22" cy="29" rx="5" ry="6" fill="${TAUPE}" opacity="0.7"/>
      <ellipse cx="48" cy="29" rx="5" ry="6" fill="${TAUPE}" opacity="0.7"/>
      <path d="M23 45 Q35 42 47 45" stroke="${TAUPE}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M21 35 Q19 45 18 55 Q20 60 22 55" stroke="${LAVENDER_D}" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.7"/>
      <path d="M49 35 Q51 45 52 55 Q50 60 48 55" stroke="${LAVENDER_D}" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.7"/>
      <ellipse cx="35" cy="42" rx="3" ry="1.5" fill="${TAUPE_L}" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "emo-wink",
    name: "윙크",
    category: "emotion",
    width: 70,
    height: 70,
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="30" fill="${PEACH}" opacity="0.8"/>
      <ellipse cx="23" cy="28" rx="5" ry="6" fill="${TAUPE}" opacity="0.7"/>
      <ellipse cx="23" cy="26" rx="3" ry="4" fill="${CREAM}" opacity="0.5"/>
      <path d="M44 27 Q47 24 50 27" stroke="${TAUPE}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M22 43 Q35 56 48 43" stroke="${TAUPE}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="22" cy="38" r="5" fill="${DUSTY_ROSE}" opacity="0.4"/>
      <circle cx="48" cy="38" r="5" fill="${DUSTY_ROSE}" opacity="0.4"/>
    </svg>`,
  },
  {
    id: "emo-angel",
    name: "천사",
    category: "emotion",
    width: 70,
    height: 75,
    svg: `<svg viewBox="0 0 70 75" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="35" cy="10" rx="20" ry="5" fill="${GOLD}" opacity="0.55" stroke="${GOLD}" stroke-width="1.5"/>
      <circle cx="35" cy="42" r="28" fill="${CREAM}" opacity="0.85"/>
      <ellipse cx="23" cy="36" rx="5" ry="6" fill="${TAUPE}" opacity="0.65"/>
      <ellipse cx="47" cy="36" rx="5" ry="6" fill="${TAUPE}" opacity="0.65"/>
      <ellipse cx="23" cy="34" rx="3" ry="4" fill="${CREAM}" opacity="0.5"/>
      <ellipse cx="47" cy="34" rx="3" ry="4" fill="${CREAM}" opacity="0.5"/>
      <path d="M22 50 Q35 62 48 50" stroke="${TAUPE_L}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="22" cy="45" r="5" fill="${DUSTY_ROSE}" opacity="0.35"/>
      <circle cx="48" cy="45" r="5" fill="${DUSTY_ROSE}" opacity="0.35"/>
    </svg>`,
  },
  {
    id: "emo-kiss",
    name: "뽀뽀",
    category: "emotion",
    width: 65,
    height: 65,
    svg: `<svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="33" r="28" fill="${PEACH}" opacity="0.75"/>
      <ellipse cx="20" cy="27" rx="4" ry="5" fill="${TAUPE}" opacity="0.7"/>
      <ellipse cx="44" cy="27" rx="4" ry="5" fill="${TAUPE}" opacity="0.7"/>
      <ellipse cx="32" cy="44" rx="9" ry="6" fill="${DUSTY_ROSE}" opacity="0.65"/>
      <ellipse cx="32" cy="42" rx="7" ry="3" fill="${CREAM}" opacity="0.5"/>
      <path d="M50 12 C53 8 58 10 56 15 C54 12 51 14 50 12Z" fill="${DUSTY_ROSE}" opacity="0.7"/>
      <path d="M57 18 C60 15 64 17 62 21 C60 18 57 20 57 18Z" fill="${DUSTY_ROSE}" opacity="0.6"/>
      <circle cx="20" cy="35" r="5" fill="${DUSTY_ROSE}" opacity="0.35"/>
      <circle cx="44" cy="35" r="5" fill="${DUSTY_ROSE}" opacity="0.35"/>
    </svg>`,
  },
  {
    id: "emo-surprised",
    name: "놀람",
    category: "emotion",
    width: 70,
    height: 70,
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="30" fill="${CREAM}" opacity="0.85"/>
      <ellipse cx="22" cy="27" rx="6" ry="7" fill="${TAUPE}" opacity="0.7"/>
      <ellipse cx="48" cy="27" rx="6" ry="7" fill="${TAUPE}" opacity="0.7"/>
      <ellipse cx="22" cy="25" rx="3.5" ry="4.5" fill="${CREAM}" opacity="0.6"/>
      <ellipse cx="48" cy="25" rx="3.5" ry="4.5" fill="${CREAM}" opacity="0.6"/>
      <path d="M20 20 Q22 16 26 20" stroke="${TAUPE_L}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M44 20 Q46 16 50 20" stroke="${TAUPE_L}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="35" cy="47" rx="8" ry="9" fill="${TAUPE_L}" opacity="0.5"/>
      <ellipse cx="35" cy="47" rx="5" ry="6" fill="${CREAM}" opacity="0.6"/>
    </svg>`,
  },
  {
    id: "emo-love-eyes",
    name: "사랑눈",
    category: "emotion",
    width: 70,
    height: 70,
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="30" fill="${PINK}" opacity="0.75"/>
      <path d="M22 29 C18 24 12 27 14 32 C15 36 22 41 22 41 C22 41 29 36 30 32 C32 27 26 24 22 29Z" fill="${DUSTY_ROSE}" opacity="0.8"/>
      <path d="M48 29 C44 24 38 27 40 32 C41 36 48 41 48 41 C48 41 55 36 56 32 C58 27 52 24 48 29Z" fill="${DUSTY_ROSE}" opacity="0.8"/>
      <path d="M22 48 Q35 60 48 48" stroke="${TAUPE}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="22" cy="42" r="5" fill="${DUSTY_ROSE}" opacity="0.35"/>
      <circle cx="48" cy="42" r="5" fill="${DUSTY_ROSE}" opacity="0.35"/>
    </svg>`,
  },
  {
    id: "emo-star-eyes",
    name: "반짝눈",
    category: "emotion",
    width: 70,
    height: 70,
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="30" fill="${PEACH}" opacity="0.8"/>
      <polygon points="22,22 24,28 30,28 25,32 27,38 22,34 17,38 19,32 14,28 20,28" fill="${GOLD}" opacity="0.75"/>
      <polygon points="48,22 50,28 56,28 51,32 53,38 48,34 43,38 45,32 40,28 46,28" fill="${GOLD}" opacity="0.75"/>
      <path d="M22 49 Q35 61 48 49" stroke="${TAUPE}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="22" cy="43" r="5" fill="${DUSTY_ROSE}" opacity="0.35"/>
      <circle cx="48" cy="43" r="5" fill="${DUSTY_ROSE}" opacity="0.35"/>
    </svg>`,
  },

  // ── 장식 (deco) ──
  {
    id: "deco-balloons",
    name: "풍선",
    category: "deco",
    width: 90,
    height: 110,
    svg: `<svg viewBox="0 0 90 110" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="32" rx="16" ry="22" fill="${PINK}" opacity="0.65"/>
      <polygon points="20,54 16,60 24,60" fill="${PINK_D}" opacity="0.65"/>
      <ellipse cx="55" cy="28" rx="16" ry="22" fill="${LAVENDER}" opacity="0.65"/>
      <polygon points="55,50 51,56 59,56" fill="${LAVENDER_D}" opacity="0.65"/>
      <ellipse cx="37" cy="38" rx="16" ry="22" fill="${PEACH}" opacity="0.65"/>
      <polygon points="37,60 33,66 41,66" fill="${PEACH_D}" opacity="0.65"/>
      <path d="M20 60 Q30 75 38 70 Q46 65 55 56" stroke="${TAUPE_L}" stroke-width="0.8" fill="none"/>
      <path d="M37 66 Q38 80 37 100" stroke="${TAUPE_L}" stroke-width="1" fill="none"/>
      <ellipse cx="18" cy="24" rx="5" ry="3" fill="${CREAM}" opacity="0.35" transform="rotate(-30 18 24)"/>
      <ellipse cx="53" cy="20" rx="5" ry="3" fill="${CREAM}" opacity="0.35" transform="rotate(-30 53 20)"/>
      <ellipse cx="35" cy="30" rx="5" ry="3" fill="${CREAM}" opacity="0.35" transform="rotate(-30 35 30)"/>
    </svg>`,
  },
  {
    id: "deco-star-balloons",
    name: "별풍선",
    category: "deco",
    width: 85,
    height: 105,
    svg: `<svg viewBox="0 0 85 105" xmlns="http://www.w3.org/2000/svg">
      <polygon points="28,5 33,18 47,18 36,27 40,40 28,31 16,40 20,27 9,18 23,18" fill="${GOLD}" opacity="0.65"/>
      <polygon points="62,18 65,27 74,27 67,33 69,42 62,37 55,42 57,33 50,27 59,27" fill="${PEACH}" opacity="0.65"/>
      <path d="M28 40 Q32 55 37 65" stroke="${TAUPE_L}" stroke-width="0.8" fill="none"/>
      <path d="M62 42 Q60 55 55 65" stroke="${TAUPE_L}" stroke-width="0.8" fill="none"/>
      <path d="M37 65 Q46 65 55 65 Q48 75 48 100" stroke="${TAUPE_L}" stroke-width="1" fill="none"/>
    </svg>`,
  },
  {
    id: "deco-rainbow",
    name: "무지개",
    category: "deco",
    width: 110,
    height: 65,
    svg: `<svg viewBox="0 0 110 65" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 60 A47 47 0 0 1 102 60" fill="none" stroke="${DUSTY_ROSE}" stroke-width="6" opacity="0.55"/>
      <path d="M15 60 A40 40 0 0 1 95 60" fill="none" stroke="${PEACH}" stroke-width="6" opacity="0.55"/>
      <path d="M22 60 A33 33 0 0 1 88 60" fill="none" stroke="${GOLD}" stroke-width="6" opacity="0.5"/>
      <path d="M29 60 A26 26 0 0 1 81 60" fill="none" stroke="${MINT}" stroke-width="6" opacity="0.5"/>
      <path d="M36 60 A19 19 0 0 1 74 60" fill="none" stroke="${LAVENDER}" stroke-width="6" opacity="0.5"/>
      <ellipse cx="19" cy="60" rx="8" ry="5" fill="${CREAM}" opacity="0.7"/>
      <ellipse cx="91" cy="60" rx="8" ry="5" fill="${CREAM}" opacity="0.7"/>
    </svg>`,
  },
  {
    id: "deco-crown",
    name: "왕관",
    category: "deco",
    width: 90,
    height: 70,
    svg: `<svg viewBox="0 0 90 70" xmlns="http://www.w3.org/2000/svg">
      <polygon points="5,58 5,30 22,42 45,10 68,42 85,30 85,58" fill="${GOLD}" opacity="0.6" stroke="${TAUPE_L}" stroke-width="1"/>
      <rect x="5" y="55" width="80" height="10" rx="2" fill="${GOLD}" opacity="0.5"/>
      <circle cx="5" cy="30" r="4" fill="${DUSTY_ROSE}" opacity="0.75"/>
      <circle cx="45" cy="10" r="4" fill="${DUSTY_ROSE}" opacity="0.75"/>
      <circle cx="85" cy="30" r="4" fill="${DUSTY_ROSE}" opacity="0.75"/>
      <circle cx="25" cy="57" r="3" fill="${CREAM}" opacity="0.6"/>
      <circle cx="45" cy="57" r="3" fill="${CREAM}" opacity="0.6"/>
      <circle cx="65" cy="57" r="3" fill="${CREAM}" opacity="0.6"/>
    </svg>`,
  },
  {
    id: "deco-confetti",
    name: "꽃가루",
    category: "deco",
    width: 110,
    height: 90,
    svg: `<svg viewBox="0 0 110 90" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="18" r="4" fill="${PINK}" opacity="0.7"/>
      <circle cx="55" cy="8" r="3" fill="${GOLD}" opacity="0.65"/>
      <circle cx="90" cy="20" r="4" fill="${LAVENDER}" opacity="0.7"/>
      <circle cx="30" cy="55" r="3" fill="${PEACH}" opacity="0.65"/>
      <circle cx="72" cy="58" r="4" fill="${SAGE}" opacity="0.65"/>
      <circle cx="100" cy="45" r="3" fill="${PINK_D}" opacity="0.7"/>
      <circle cx="45" cy="78" r="3.5" fill="${MINT}" opacity="0.65"/>
      <circle cx="80" cy="80" r="3" fill="${DUSTY_ROSE}" opacity="0.6"/>
      <rect x="22" y="35" width="6" height="3" rx="1" fill="${GOLD}" opacity="0.55" transform="rotate(30 25 36)"/>
      <rect x="60" y="30" width="6" height="3" rx="1" fill="${PINK}" opacity="0.55" transform="rotate(-20 63 31)"/>
      <rect x="82" y="62" width="6" height="3" rx="1" fill="${LAVENDER}" opacity="0.55" transform="rotate(45 85 63)"/>
      <rect x="10" y="68" width="6" height="3" rx="1" fill="${SAGE}" opacity="0.55" transform="rotate(-30 13 69)"/>
      <rect x="50" y="45" width="6" height="3" rx="1" fill="${PEACH_D}" opacity="0.55" transform="rotate(15 53 46)"/>
      <path d="M40 15 L43 10 L46 15 L43 20Z" fill="${GOLD}" opacity="0.55"/>
      <path d="M78 10 L81 5 L84 10 L81 15Z" fill="${DUSTY_ROSE}" opacity="0.55"/>
    </svg>`,
  },
  {
    id: "deco-party",
    name: "파티모자",
    category: "deco",
    width: 75,
    height: 95,
    svg: `<svg viewBox="0 0 75 95" xmlns="http://www.w3.org/2000/svg">
      <polygon points="37,5 65,85 10,85" fill="${LAVENDER}" opacity="0.7" stroke="${LAVENDER_D}" stroke-width="1"/>
      <polygon points="37,5 50,45 24,45" fill="${LAVENDER_D}" opacity="0.4"/>
      <rect x="10" y="82" width="55" height="10" rx="5" fill="${PEACH}" opacity="0.6"/>
      <circle cx="20" cy="50" r="4" fill="${PINK}" opacity="0.6"/>
      <circle cx="50" cy="40" r="3.5" fill="${GOLD}" opacity="0.6"/>
      <circle cx="35" cy="65" r="3" fill="${DUSTY_ROSE}" opacity="0.6"/>
      <circle cx="55" cy="65" r="2.5" fill="${MINT}" opacity="0.6"/>
      <path d="M37 5 Q42 2 45 5 Q42 8 37 5Z" fill="${GOLD}" opacity="0.65"/>
      <circle cx="37" cy="5" r="3" fill="${GOLD}" opacity="0.7"/>
    </svg>`,
  },
  {
    id: "deco-bow",
    name: "리본매듭",
    category: "deco",
    width: 90,
    height: 70,
    svg: `<svg viewBox="0 0 90 70" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="27" cy="28" rx="24" ry="16" fill="${PINK}" opacity="0.7" transform="rotate(-18 27 28)"/>
      <ellipse cx="63" cy="28" rx="24" ry="16" fill="${PINK}" opacity="0.7" transform="rotate(18 63 28)"/>
      <ellipse cx="27" cy="28" rx="14" ry="8" fill="${PINK_D}" opacity="0.5" transform="rotate(-18 27 28)"/>
      <ellipse cx="63" cy="28" rx="14" ry="8" fill="${PINK_D}" opacity="0.5" transform="rotate(18 63 28)"/>
      <circle cx="45" cy="30" r="8" fill="${DUSTY_ROSE}" opacity="0.75"/>
      <circle cx="45" cy="30" r="4" fill="${PINK}" opacity="0.6"/>
      <path d="M41 38 L37 58" stroke="${PINK_D}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M49 38 L53 58" stroke="${PINK_D}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: "deco-ribbon",
    name: "리본띠",
    category: "deco",
    width: 150,
    height: 45,
    svg: `<svg viewBox="0 0 150 45" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,10 18,0 18,45 0,35" fill="${PINK_D}" opacity="0.7"/>
      <rect x="18" y="0" width="114" height="45" fill="${PINK}" opacity="0.75"/>
      <polygon points="132,0 150,10 150,35 132,45" fill="${PINK_D}" opacity="0.7"/>
      <ellipse cx="75" cy="22" rx="30" ry="8" fill="${CREAM}" opacity="0.2"/>
    </svg>`,
  },
  {
    id: "deco-cloud",
    name: "구름",
    category: "deco",
    width: 110,
    height: 70,
    svg: `<svg viewBox="0 0 110 70" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="55" cy="50" rx="46" ry="18" fill="${CREAM}" opacity="0.85"/>
      <circle cx="38" cy="36" r="20" fill="${CREAM}" opacity="0.85"/>
      <circle cx="60" cy="30" r="25" fill="${CREAM}" opacity="0.85"/>
      <circle cx="80" cy="40" r="16" fill="${CREAM}" opacity="0.85"/>
      <ellipse cx="55" cy="50" rx="46" ry="18" fill="${LAVENDER}" opacity="0.15"/>
    </svg>`,
  },
  {
    id: "deco-moon",
    name: "달과별",
    category: "deco",
    width: 90,
    height: 90,
    svg: `<svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      <circle cx="38" cy="48" r="28" fill="${GOLD}" opacity="0.45"/>
      <circle cx="50" cy="40" r="22" fill="${CREAM}" opacity="0.9"/>
      <polygon points="75,10 77,17 84,17 78,21 80,28 75,24 70,28 72,21 66,17 73,17" fill="${GOLD}" opacity="0.65"/>
      <polygon points="82,50 83,55 88,55 84,58 85,63 82,60 79,63 80,58 76,55 81,55" fill="${GOLD}" opacity="0.55"/>
      <circle cx="22" cy="20" r="3" fill="${GOLD}" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "deco-gift",
    name: "선물상자",
    category: "deco",
    width: 90,
    height: 95,
    svg: `<svg viewBox="0 0 90 95" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="35" width="74" height="55" rx="3" fill="${PEACH}" opacity="0.7"/>
      <rect x="8" y="35" width="74" height="15" rx="3" fill="${PEACH_D}" opacity="0.6"/>
      <rect x="38" y="35" width="14" height="55" fill="${DUSTY_ROSE}" opacity="0.4"/>
      <ellipse cx="24" cy="28" rx="18" ry="10" fill="${PINK}" opacity="0.65" transform="rotate(-10 24 28)"/>
      <ellipse cx="66" cy="28" rx="18" ry="10" fill="${PINK}" opacity="0.65" transform="rotate(10 66 28)"/>
      <ellipse cx="24" cy="28" rx="10" ry="5" fill="${PINK_D}" opacity="0.5" transform="rotate(-10 24 28)"/>
      <ellipse cx="66" cy="28" rx="10" ry="5" fill="${PINK_D}" opacity="0.5" transform="rotate(10 66 28)"/>
      <circle cx="45" cy="30" r="7" fill="${DUSTY_ROSE}" opacity="0.7"/>
    </svg>`,
  },
  {
    id: "deco-sparkle",
    name: "반짝이",
    category: "deco",
    width: 90,
    height: 90,
    svg: `<svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
      <path d="M45 8 L49 35 L76 45 L49 55 L45 82 L41 55 L14 45 L41 35Z" fill="${GOLD}" opacity="0.65"/>
      <path d="M20 10 L22 20 L32 22 L22 24 L20 34 L18 24 L8 22 L18 20Z" fill="${GOLD}" opacity="0.55"/>
      <path d="M72 5 L74 13 L82 15 L74 17 L72 25 L70 17 L62 15 L70 13Z" fill="${GOLD}" opacity="0.5"/>
      <path d="M78 62 L79 68 L85 69 L79 70 L78 76 L77 70 L71 69 L77 68Z" fill="${PEACH_D}" opacity="0.6"/>
      <circle cx="15" cy="65" r="3" fill="${GOLD}" opacity="0.5"/>
    </svg>`,
  },
];

export const stickerCategories = [
  { id: "baby-items", name: "아기용품" },
  { id: "milestone", name: "마일스톤" },
  { id: "emotion", name: "감정표현" },
  { id: "deco", name: "장식" },
] as const;
