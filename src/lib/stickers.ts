export interface StickerDef {
  id: string;
  name: string;
  category: "botanical" | "text" | "deco";
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
  // ── 보타니컬 ──
  {
    id: "leaf-branch-1",
    name: "유칼립투스",
    category: "botanical",
    width: 100,
    height: 140,
    svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 135 Q50 70 50 5" stroke="${SAGE_D}" stroke-width="1.5" fill="none"/>
      <ellipse cx="38" cy="25" rx="14" ry="8" fill="${SAGE}" transform="rotate(-30 38 25)" opacity="0.8"/>
      <ellipse cx="62" cy="40" rx="14" ry="8" fill="${SAGE}" transform="rotate(30 62 40)" opacity="0.8"/>
      <ellipse cx="36" cy="55" rx="13" ry="7" fill="${SAGE}" transform="rotate(-25 36 55)" opacity="0.7"/>
      <ellipse cx="64" cy="70" rx="13" ry="7" fill="${SAGE}" transform="rotate(25 64 70)" opacity="0.7"/>
      <ellipse cx="38" cy="85" rx="12" ry="7" fill="${SAGE}" transform="rotate(-20 38 85)" opacity="0.6"/>
      <ellipse cx="62" cy="100" rx="12" ry="7" fill="${SAGE}" transform="rotate(20 62 100)" opacity="0.6"/>
      <ellipse cx="42" cy="115" rx="10" ry="6" fill="${SAGE}" transform="rotate(-15 42 115)" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "leaf-branch-2",
    name: "올리브",
    category: "botanical",
    width: 120,
    height: 60,
    svg: `<svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 30 Q60 30 110 30" stroke="${SAGE_D}" stroke-width="1.2" fill="none"/>
      <ellipse cx="25" cy="22" rx="10" ry="5" fill="${SAGE}" transform="rotate(-20 25 22)" opacity="0.7"/>
      <ellipse cx="45" cy="24" rx="10" ry="5" fill="${SAGE}" transform="rotate(-15 45 24)" opacity="0.8"/>
      <ellipse cx="65" cy="24" rx="10" ry="5" fill="${SAGE}" transform="rotate(15 65 24)" opacity="0.8"/>
      <ellipse cx="85" cy="22" rx="10" ry="5" fill="${SAGE}" transform="rotate(20 85 22)" opacity="0.7"/>
      <ellipse cx="35" cy="38" rx="9" ry="5" fill="${SAGE}" transform="rotate(20 35 38)" opacity="0.7"/>
      <ellipse cx="55" cy="36" rx="9" ry="5" fill="${SAGE}" transform="rotate(15 55 36)" opacity="0.8"/>
      <ellipse cx="75" cy="36" rx="9" ry="5" fill="${SAGE}" transform="rotate(-15 75 36)" opacity="0.8"/>
      <ellipse cx="95" cy="38" rx="9" ry="5" fill="${SAGE}" transform="rotate(-20 95 38)" opacity="0.7"/>
    </svg>`,
  },
  {
    id: "wreath",
    name: "리스",
    category: "botanical",
    width: 150,
    height: 150,
    svg: `<svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
      <circle cx="75" cy="75" r="55" fill="none" stroke="${SAGE}" stroke-width="0.5" opacity="0.3"/>
      ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
        (a) =>
          `<ellipse cx="75" cy="20" rx="8" ry="14" fill="${SAGE}" opacity="0.5" transform="rotate(${a} 75 75)"/>`
      ).join("")}
      ${[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map(
        (a) =>
          `<ellipse cx="75" cy="23" rx="6" ry="11" fill="${SAGE_D}" opacity="0.4" transform="rotate(${a} 75 75)"/>`
      ).join("")}
    </svg>`,
  },
  {
    id: "flower-pink",
    name: "꽃 핑크",
    category: "botanical",
    width: 80,
    height: 80,
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="22" rx="12" ry="16" fill="${PINK}" opacity="0.7"/>
      <ellipse cx="22" cy="38" rx="12" ry="16" fill="${PINK_D}" opacity="0.6" transform="rotate(-72 22 38)"/>
      <ellipse cx="30" cy="58" rx="12" ry="16" fill="${PINK}" opacity="0.6" transform="rotate(-144 30 58)"/>
      <ellipse cx="50" cy="58" rx="12" ry="16" fill="${PINK_D}" opacity="0.6" transform="rotate(144 50 58)"/>
      <ellipse cx="58" cy="38" rx="12" ry="16" fill="${PINK}" opacity="0.6" transform="rotate(72 58 38)"/>
      <circle cx="40" cy="40" r="8" fill="${GOLD}" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "flower-cream",
    name: "꽃 크림",
    category: "botanical",
    width: 70,
    height: 70,
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="20" r="10" fill="${CREAM}" stroke="${PINK_D}" stroke-width="0.5" opacity="0.8"/>
      <circle cx="20" cy="35" r="10" fill="${CREAM}" stroke="${PINK_D}" stroke-width="0.5" opacity="0.8"/>
      <circle cx="35" cy="50" r="10" fill="${CREAM}" stroke="${PINK_D}" stroke-width="0.5" opacity="0.8"/>
      <circle cx="50" cy="35" r="10" fill="${CREAM}" stroke="${PINK_D}" stroke-width="0.5" opacity="0.8"/>
      <circle cx="35" cy="35" r="6" fill="${TAUPE_L}" opacity="0.4"/>
    </svg>`,
  },
  {
    id: "flower-lavender",
    name: "꽃 라벤더",
    category: "botanical",
    width: 75,
    height: 75,
    svg: `<svg viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="37" cy="18" rx="10" ry="14" fill="${LAVENDER}" opacity="0.7"/>
      <ellipse cx="20" cy="32" rx="10" ry="14" fill="${LAVENDER_D}" opacity="0.6" transform="rotate(-72 20 32)"/>
      <ellipse cx="25" cy="54" rx="10" ry="14" fill="${LAVENDER}" opacity="0.6" transform="rotate(-144 25 54)"/>
      <ellipse cx="50" cy="54" rx="10" ry="14" fill="${LAVENDER_D}" opacity="0.6" transform="rotate(144 50 54)"/>
      <ellipse cx="55" cy="32" rx="10" ry="14" fill="${LAVENDER}" opacity="0.6" transform="rotate(72 55 32)"/>
      <circle cx="37" cy="37" r="7" fill="${GOLD}" opacity="0.4"/>
    </svg>`,
  },
  {
    id: "flower-peach",
    name: "꽃 피치",
    category: "botanical",
    width: 80,
    height: 80,
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      ${[0, 60, 120, 180, 240, 300].map(
        (a) =>
          `<ellipse cx="40" cy="18" rx="10" ry="18" fill="${PEACH}" opacity="0.6" transform="rotate(${a} 40 40)"/>`
      ).join("")}
      <circle cx="40" cy="40" r="9" fill="${PEACH_D}" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "leaf-monstera",
    name: "몬스테라",
    category: "botanical",
    width: 100,
    height: 110,
    svg: `<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 105 L50 55" stroke="${SAGE_D}" stroke-width="2" fill="none"/>
      <path d="M50 55 C20 50 5 30 15 10 C25 -5 45 5 50 20 C55 5 75 -5 85 10 C95 30 80 50 50 55Z" fill="${SAGE}" opacity="0.7"/>
      <path d="M50 55 L50 20" stroke="${SAGE_D}" stroke-width="1" fill="none" opacity="0.5"/>
      <path d="M50 35 L35 20" stroke="${SAGE_D}" stroke-width="0.8" fill="none" opacity="0.4"/>
      <path d="M50 35 L65 20" stroke="${SAGE_D}" stroke-width="0.8" fill="none" opacity="0.4"/>
    </svg>`,
  },
  {
    id: "leaf-fern",
    name: "양치식물",
    category: "botanical",
    width: 50,
    height: 140,
    svg: `<svg viewBox="0 0 50 140" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 135 Q25 70 25 5" stroke="${SAGE_D}" stroke-width="1" fill="none"/>
      ${[15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115].map(
        (y, i) =>
          `<path d="M25 ${y} Q${i % 2 === 0 ? 8 : 42} ${y - 5} ${i % 2 === 0 ? 12 : 38} ${y - 10}" stroke="${SAGE}" stroke-width="0.8" fill="none" opacity="${0.8 - i * 0.05}"/>`
      ).join("")}
    </svg>`,
  },
  {
    id: "leaf-single",
    name: "잎사귀",
    category: "botanical",
    width: 60,
    height: 90,
    svg: `<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 85 Q30 50 30 10 C45 15 55 35 50 55 C45 70 35 80 30 85Z" fill="${SAGE}" opacity="0.6"/>
      <path d="M30 85 Q30 50 30 10 C15 15 5 35 10 55 C15 70 25 80 30 85Z" fill="${SAGE_D}" opacity="0.5"/>
      <path d="M30 85 L30 10" stroke="${SAGE_D}" stroke-width="1" fill="none" opacity="0.6"/>
    </svg>`,
  },
  {
    id: "flower-bouquet",
    name: "꽃다발",
    category: "botanical",
    width: 100,
    height: 120,
    svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M42 120 L50 65 L58 120Z" fill="${SAGE}" opacity="0.5"/>
      <circle cx="35" cy="45" r="15" fill="${PINK}" opacity="0.6"/>
      <circle cx="65" cy="45" r="15" fill="${PEACH}" opacity="0.6"/>
      <circle cx="50" cy="30" r="16" fill="${PINK_D}" opacity="0.6"/>
      <circle cx="30" cy="60" r="12" fill="${LAVENDER}" opacity="0.5"/>
      <circle cx="70" cy="60" r="12" fill="${PINK}" opacity="0.5"/>
      <circle cx="50" cy="50" r="8" fill="${GOLD}" opacity="0.4"/>
      <ellipse cx="25" cy="50" rx="8" ry="12" fill="${SAGE}" opacity="0.5" transform="rotate(-30 25 50)"/>
      <ellipse cx="75" cy="50" rx="8" ry="12" fill="${SAGE}" opacity="0.5" transform="rotate(30 75 50)"/>
    </svg>`,
  },
  {
    id: "wreath-floral",
    name: "꽃 리스",
    category: "botanical",
    width: 150,
    height: 150,
    svg: `<svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
      ${[0, 45, 90, 135, 180, 225, 270, 315].map(
        (a, i) =>
          `<ellipse cx="75" cy="18" rx="7" ry="13" fill="${i % 2 === 0 ? SAGE : SAGE_D}" opacity="0.5" transform="rotate(${a} 75 75)"/>`
      ).join("")}
      ${[22, 67, 112, 157, 202, 247, 292, 337].map(
        (a, i) =>
          `<circle cx="${75 + 52 * Math.cos((a * Math.PI) / 180)}" cy="${75 + 52 * Math.sin((a * Math.PI) / 180)}" r="6" fill="${[PINK, PEACH, LAVENDER, PINK_D][i % 4]}" opacity="0.6"/>`
      ).join("")}
    </svg>`,
  },
  {
    id: "cherry-blossom",
    name: "벚꽃",
    category: "botanical",
    width: 70,
    height: 70,
    svg: `<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      ${[0, 72, 144, 216, 288].map(
        (a) =>
          `<ellipse cx="35" cy="14" rx="7" ry="13" fill="${PINK}" opacity="0.7" transform="rotate(${a} 35 35)"/>`
      ).join("")}
      <circle cx="35" cy="35" r="5" fill="${DUSTY_ROSE}" opacity="0.5"/>
      ${[36, 108, 180, 252, 324].map(
        (a) =>
          `<ellipse cx="35" cy="16" rx="5" ry="10" fill="${PINK_D}" opacity="0.5" transform="rotate(${a} 35 35)"/>`
      ).join("")}
    </svg>`,
  },
  {
    id: "cotton-flower",
    name: "목화",
    category: "botanical",
    width: 80,
    height: 100,
    svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 100 L40 55" stroke="${TAUPE_L}" stroke-width="1.5" fill="none"/>
      <circle cx="40" cy="35" r="14" fill="white" opacity="0.9"/>
      <circle cx="28" cy="42" r="12" fill="white" opacity="0.85"/>
      <circle cx="52" cy="42" r="12" fill="white" opacity="0.85"/>
      <circle cx="33" cy="28" r="11" fill="white" opacity="0.8"/>
      <circle cx="47" cy="28" r="11" fill="white" opacity="0.8"/>
      <ellipse cx="30" cy="55" rx="7" ry="10" fill="${SAGE}" opacity="0.5" transform="rotate(-20 30 55)"/>
      <ellipse cx="50" cy="55" rx="7" ry="10" fill="${SAGE}" opacity="0.5" transform="rotate(20 50 55)"/>
    </svg>`,
  },

  // ── 텍스트 ──
  {
    id: "text-hello",
    name: "Hello Baby",
    category: "text",
    width: 140,
    height: 50,
    svg: `<svg viewBox="0 0 140 50" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="136" height="46" rx="23" fill="${CREAM}" stroke="${TAUPE_L}" stroke-width="1"/>
      <text x="70" y="31" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="${TAUPE}" letter-spacing="2">Hello Baby</text>
    </svg>`,
  },
  {
    id: "text-love",
    name: "With Love",
    category: "text",
    width: 130,
    height: 45,
    svg: `<svg viewBox="0 0 130 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="126" height="41" rx="20" fill="${PINK}" stroke="${PINK_D}" stroke-width="1"/>
      <text x="65" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="${TAUPE}" letter-spacing="1">with love ♡</text>
    </svg>`,
  },
  {
    id: "text-firstsmile",
    name: "First Smile",
    category: "text",
    width: 120,
    height: 45,
    svg: `<svg viewBox="0 0 120 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="41" rx="8" fill="${CREAM}" stroke="${GOLD}" stroke-width="1"/>
      <text x="60" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">First Smile</text>
    </svg>`,
  },
  {
    id: "text-firststep",
    name: "First Steps",
    category: "text",
    width: 120,
    height: 45,
    svg: `<svg viewBox="0 0 120 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="41" rx="8" fill="${CREAM}" stroke="${GOLD}" stroke-width="1"/>
      <text x="60" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">First Steps</text>
    </svg>`,
  },
  {
    id: "text-firstfood",
    name: "First Food",
    category: "text",
    width: 120,
    height: 45,
    svg: `<svg viewBox="0 0 120 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="41" rx="8" fill="${CREAM}" stroke="${GOLD}" stroke-width="1"/>
      <text x="60" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">First Food</text>
    </svg>`,
  },
  {
    id: "text-firstword",
    name: "First Words",
    category: "text",
    width: 120,
    height: 45,
    svg: `<svg viewBox="0 0 120 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="41" rx="8" fill="${CREAM}" stroke="${GOLD}" stroke-width="1"/>
      <text x="60" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">First Words</text>
    </svg>`,
  },
  {
    id: "text-firstteeth",
    name: "First Tooth",
    category: "text",
    width: 120,
    height: 45,
    svg: `<svg viewBox="0 0 120 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="41" rx="8" fill="${CREAM}" stroke="${GOLD}" stroke-width="1"/>
      <text x="60" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">First Tooth</text>
    </svg>`,
  },
  {
    id: "text-firstbath",
    name: "First Bath",
    category: "text",
    width: 120,
    height: 45,
    svg: `<svg viewBox="0 0 120 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="41" rx="8" fill="${MINT}" stroke="${SAGE_D}" stroke-width="1"/>
      <text x="60" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">First Bath</text>
    </svg>`,
  },
  {
    id: "text-firsttrip",
    name: "First Trip",
    category: "text",
    width: 120,
    height: 45,
    svg: `<svg viewBox="0 0 120 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="41" rx="8" fill="${PEACH}" stroke="${PEACH_D}" stroke-width="1"/>
      <text x="60" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">First Trip</text>
    </svg>`,
  },
  {
    id: "text-firsthaircut",
    name: "First Haircut",
    category: "text",
    width: 130,
    height: 45,
    svg: `<svg viewBox="0 0 130 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="126" height="41" rx="8" fill="${LAVENDER}" stroke="${LAVENDER_D}" stroke-width="1"/>
      <text x="65" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">First Haircut</text>
    </svg>`,
  },
  {
    id: "text-rollover",
    name: "First Roll Over",
    category: "text",
    width: 140,
    height: 45,
    svg: `<svg viewBox="0 0 140 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="136" height="41" rx="8" fill="${CREAM}" stroke="${GOLD}" stroke-width="1"/>
      <text x="70" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">First Roll Over</text>
    </svg>`,
  },
  {
    id: "text-sitting",
    name: "Sitting Up",
    category: "text",
    width: 120,
    height: 45,
    svg: `<svg viewBox="0 0 120 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="41" rx="8" fill="${MINT}" stroke="${SAGE_D}" stroke-width="1"/>
      <text x="60" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">Sitting Up</text>
    </svg>`,
  },
  {
    id: "text-crawling",
    name: "Crawling",
    category: "text",
    width: 120,
    height: 45,
    svg: `<svg viewBox="0 0 120 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="41" rx="8" fill="${PINK}" stroke="${PINK_D}" stroke-width="1"/>
      <text x="60" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">Crawling</text>
    </svg>`,
  },
  {
    id: "text-iloveyou",
    name: "I Love You",
    category: "text",
    width: 120,
    height: 45,
    svg: `<svg viewBox="0 0 120 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="41" rx="20" fill="${DUSTY_ROSE}" stroke="${DUSTY_ROSE}" stroke-width="1" opacity="0.4"/>
      <text x="60" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">I Love You ♡</text>
    </svg>`,
  },
  {
    id: "text-bestbaby",
    name: "Best Baby",
    category: "text",
    width: 120,
    height: 45,
    svg: `<svg viewBox="0 0 120 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="41" rx="20" fill="${GOLD}" stroke="${GOLD}" stroke-width="1" opacity="0.3"/>
      <text x="60" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">Best Baby ★</text>
    </svg>`,
  },
  {
    id: "text-growing",
    name: "Growing Up",
    category: "text",
    width: 120,
    height: 45,
    svg: `<svg viewBox="0 0 120 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="41" rx="20" fill="${SAGE}" stroke="${SAGE_D}" stroke-width="1" opacity="0.4"/>
      <text x="60" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">Growing Up</text>
    </svg>`,
  },
  {
    id: "text-precious",
    name: "Precious Moment",
    category: "text",
    width: 150,
    height: 45,
    svg: `<svg viewBox="0 0 150 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="146" height="41" rx="8" fill="${CREAM}" stroke="${TAUPE_L}" stroke-width="1"/>
      <text x="75" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">Precious Moment</text>
    </svg>`,
  },
  {
    id: "text-thankyou",
    name: "Thank You",
    category: "text",
    width: 120,
    height: 45,
    svg: `<svg viewBox="0 0 120 45" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="41" rx="20" fill="${PEACH}" stroke="${PEACH_D}" stroke-width="1" opacity="0.6"/>
      <text x="60" y="29" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${TAUPE}">Thank You</text>
    </svg>`,
  },

  // ── 데코 ──
  {
    id: "heart",
    name: "하트",
    category: "deco",
    width: 60,
    height: 55,
    svg: `<svg viewBox="0 0 60 55" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 50 C10 35 0 20 0 14 C0 6 6 0 14 0 C20 0 26 4 30 10 C34 4 40 0 46 0 C54 0 60 6 60 14 C60 20 50 35 30 50Z" fill="${PINK}" opacity="0.8"/>
    </svg>`,
  },
  {
    id: "heart-outline",
    name: "하트 라인",
    category: "deco",
    width: 60,
    height: 55,
    svg: `<svg viewBox="0 0 60 55" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 50 C10 35 0 20 0 14 C0 6 6 0 14 0 C20 0 26 4 30 10 C34 4 40 0 46 0 C54 0 60 6 60 14 C60 20 50 35 30 50Z" fill="none" stroke="${TAUPE_L}" stroke-width="1.5"/>
    </svg>`,
  },
  {
    id: "heart-dusty",
    name: "하트 로즈",
    category: "deco",
    width: 60,
    height: 55,
    svg: `<svg viewBox="0 0 60 55" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 50 C10 35 0 20 0 14 C0 6 6 0 14 0 C20 0 26 4 30 10 C34 4 40 0 46 0 C54 0 60 6 60 14 C60 20 50 35 30 50Z" fill="${DUSTY_ROSE}" opacity="0.6"/>
    </svg>`,
  },
  {
    id: "star",
    name: "별",
    category: "deco",
    width: 60,
    height: 58,
    svg: `<svg viewBox="0 0 60 58" xmlns="http://www.w3.org/2000/svg">
      <polygon points="30,2 37,22 58,22 41,35 47,55 30,43 13,55 19,35 2,22 23,22" fill="${GOLD}" opacity="0.6"/>
    </svg>`,
  },
  {
    id: "star-outline",
    name: "별 라인",
    category: "deco",
    width: 60,
    height: 58,
    svg: `<svg viewBox="0 0 60 58" xmlns="http://www.w3.org/2000/svg">
      <polygon points="30,2 37,22 58,22 41,35 47,55 30,43 13,55 19,35 2,22 23,22" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    </svg>`,
  },
  {
    id: "ribbon",
    name: "리본",
    category: "deco",
    width: 140,
    height: 40,
    svg: `<svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,8 15,0 15,40 0,32" fill="${PINK_D}" opacity="0.7"/>
      <rect x="15" y="0" width="110" height="40" fill="${PINK}" opacity="0.8"/>
      <polygon points="125,0 140,8 140,32 125,40" fill="${PINK_D}" opacity="0.7"/>
    </svg>`,
  },
  {
    id: "ribbon-gold",
    name: "금색 리본",
    category: "deco",
    width: 140,
    height: 40,
    svg: `<svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,8 15,0 15,40 0,32" fill="${GOLD}" opacity="0.5"/>
      <rect x="15" y="0" width="110" height="40" fill="${GOLD}" opacity="0.35"/>
      <polygon points="125,0 140,8 140,32 125,40" fill="${GOLD}" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "cloud",
    name: "구름",
    category: "deco",
    width: 100,
    height: 60,
    svg: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="38" rx="40" ry="18" fill="white" opacity="0.8"/>
      <circle cx="35" cy="28" r="18" fill="white" opacity="0.8"/>
      <circle cx="55" cy="24" r="22" fill="white" opacity="0.8"/>
      <circle cx="72" cy="32" r="14" fill="white" opacity="0.8"/>
    </svg>`,
  },
  {
    id: "crown",
    name: "왕관",
    category: "deco",
    width: 80,
    height: 60,
    svg: `<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
      <polygon points="5,50 5,25 20,35 40,10 60,35 75,25 75,50" fill="${GOLD}" opacity="0.6" stroke="${TAUPE_L}" stroke-width="1"/>
      <circle cx="5" cy="25" r="3" fill="${GOLD}" opacity="0.8"/>
      <circle cx="40" cy="10" r="3" fill="${GOLD}" opacity="0.8"/>
      <circle cx="75" cy="25" r="3" fill="${GOLD}" opacity="0.8"/>
    </svg>`,
  },
  {
    id: "moon",
    name: "달",
    category: "deco",
    width: 60,
    height: 60,
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="25" fill="${GOLD}" opacity="0.4"/>
      <circle cx="40" cy="25" r="20" fill="${CREAM}"/>
    </svg>`,
  },
  {
    id: "sparkle",
    name: "반짝이",
    category: "deco",
    width: 50,
    height: 50,
    svg: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 5 L28 20 L43 25 L28 30 L25 45 L22 30 L7 25 L22 20Z" fill="${GOLD}" opacity="0.6"/>
    </svg>`,
  },
  {
    id: "sparkle-small",
    name: "작은 반짝이",
    category: "deco",
    width: 30,
    height: 30,
    svg: `<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 3 L17 12 L26 15 L17 18 L15 27 L13 18 L4 15 L13 12Z" fill="${GOLD}" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "bow",
    name: "리본 매듭",
    category: "deco",
    width: 80,
    height: 60,
    svg: `<svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="25" cy="25" rx="22" ry="15" fill="${PINK}" opacity="0.7" transform="rotate(-20 25 25)"/>
      <ellipse cx="55" cy="25" rx="22" ry="15" fill="${PINK}" opacity="0.7" transform="rotate(20 55 25)"/>
      <circle cx="40" cy="28" r="6" fill="${PINK_D}" opacity="0.8"/>
      <path d="M36 34 L32 55" stroke="${PINK_D}" stroke-width="2" fill="none"/>
      <path d="M44 34 L48 55" stroke="${PINK_D}" stroke-width="2" fill="none"/>
    </svg>`,
  },
  {
    id: "circle-frame",
    name: "원형 프레임",
    category: "deco",
    width: 120,
    height: 120,
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="55" fill="none" stroke="${TAUPE_L}" stroke-width="1.5"/>
      <circle cx="60" cy="60" r="50" fill="none" stroke="${PINK_D}" stroke-width="0.8" stroke-dasharray="3 4"/>
    </svg>`,
  },
  {
    id: "diamond",
    name: "다이아몬드",
    category: "deco",
    width: 50,
    height: 65,
    svg: `<svg viewBox="0 0 50 65" xmlns="http://www.w3.org/2000/svg">
      <polygon points="25,2 48,20 25,63 2,20" fill="${LAVENDER}" opacity="0.5" stroke="${LAVENDER_D}" stroke-width="1"/>
      <line x1="2" y1="20" x2="48" y2="20" stroke="${LAVENDER_D}" stroke-width="0.8" opacity="0.5"/>
    </svg>`,
  },
  {
    id: "butterfly",
    name: "나비",
    category: "deco",
    width: 70,
    height: 55,
    svg: `<svg viewBox="0 0 70 55" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="22" cy="20" rx="18" ry="16" fill="${LAVENDER}" opacity="0.5" transform="rotate(-10 22 20)"/>
      <ellipse cx="48" cy="20" rx="18" ry="16" fill="${LAVENDER}" opacity="0.5" transform="rotate(10 48 20)"/>
      <ellipse cx="25" cy="38" rx="13" ry="12" fill="${LAVENDER_D}" opacity="0.4" transform="rotate(-5 25 38)"/>
      <ellipse cx="45" cy="38" rx="13" ry="12" fill="${LAVENDER_D}" opacity="0.4" transform="rotate(5 45 38)"/>
      <line x1="35" y1="10" x2="35" y2="50" stroke="${TAUPE_L}" stroke-width="1.5"/>
    </svg>`,
  },
  {
    id: "footprint",
    name: "발자국",
    category: "deco",
    width: 50,
    height: 70,
    svg: `<svg viewBox="0 0 50 70" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="25" cy="42" rx="16" ry="24" fill="${PINK_D}" opacity="0.6"/>
      <circle cx="13" cy="13" r="6" fill="${PINK_D}" opacity="0.6"/>
      <circle cx="25" cy="8" r="5.5" fill="${PINK_D}" opacity="0.6"/>
      <circle cx="36" cy="12" r="5.5" fill="${PINK_D}" opacity="0.6"/>
      <circle cx="42" cy="21" r="5" fill="${PINK_D}" opacity="0.6"/>
      <circle cx="8" cy="22" r="5" fill="${PINK_D}" opacity="0.6"/>
    </svg>`,
  },
  {
    id: "rainbow",
    name: "무지개",
    category: "deco",
    width: 100,
    height: 55,
    svg: `<svg viewBox="0 0 100 55" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="${PINK}" stroke-width="5" opacity="0.5"/>
      <path d="M16 50 A34 34 0 0 1 84 50" fill="none" stroke="${PEACH}" stroke-width="5" opacity="0.5"/>
      <path d="M22 50 A28 28 0 0 1 78 50" fill="none" stroke="${GOLD}" stroke-width="5" opacity="0.4"/>
      <path d="M28 50 A22 22 0 0 1 72 50" fill="none" stroke="${SAGE}" stroke-width="5" opacity="0.4"/>
      <path d="M34 50 A16 16 0 0 1 66 50" fill="none" stroke="${LAVENDER}" stroke-width="5" opacity="0.4"/>
    </svg>`,
  },
  {
    id: "balloon",
    name: "풍선",
    category: "deco",
    width: 45,
    height: 90,
    svg: `<svg viewBox="0 0 45 90" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="22" cy="30" rx="19" ry="26" fill="${PINK}" opacity="0.7"/>
      <polygon points="22,56 18,62 26,62" fill="${PINK_D}" opacity="0.7"/>
      <path d="M22 62 Q25 72 20 82 Q18 87 22 90" stroke="${TAUPE_L}" stroke-width="0.8" fill="none"/>
    </svg>`,
  },
  {
    id: "balloon-bunch",
    name: "풍선 다발",
    category: "deco",
    width: 90,
    height: 100,
    svg: `<svg viewBox="0 0 90 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="28" rx="16" ry="22" fill="${PINK}" opacity="0.6"/>
      <ellipse cx="55" cy="25" rx="16" ry="22" fill="${LAVENDER}" opacity="0.6"/>
      <ellipse cx="42" cy="35" rx="16" ry="22" fill="${PEACH}" opacity="0.6"/>
      <path d="M30 50 Q35 60 40 70" stroke="${TAUPE_L}" stroke-width="0.8" fill="none"/>
      <path d="M55 47 Q50 60 45 70" stroke="${TAUPE_L}" stroke-width="0.8" fill="none"/>
      <path d="M42 57 Q42 65 42 70" stroke="${TAUPE_L}" stroke-width="0.8" fill="none"/>
      <path d="M40 70 Q42 80 38 90 Q36 95 42 100" stroke="${TAUPE_L}" stroke-width="1" fill="none"/>
    </svg>`,
  },
  {
    id: "confetti",
    name: "꽃가루",
    category: "deco",
    width: 100,
    height: 80,
    svg: `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="20" r="3" fill="${PINK}" opacity="0.7"/>
      <circle cx="50" cy="10" r="2.5" fill="${GOLD}" opacity="0.6"/>
      <circle cx="80" cy="25" r="3" fill="${LAVENDER}" opacity="0.7"/>
      <circle cx="30" cy="50" r="2" fill="${PEACH}" opacity="0.6"/>
      <circle cx="65" cy="55" r="3" fill="${SAGE}" opacity="0.6"/>
      <circle cx="90" cy="45" r="2.5" fill="${PINK_D}" opacity="0.7"/>
      <rect x="20" y="35" width="5" height="2" fill="${GOLD}" opacity="0.5" transform="rotate(30 22 36)"/>
      <rect x="55" y="30" width="5" height="2" fill="${PINK}" opacity="0.5" transform="rotate(-20 57 31)"/>
      <rect x="75" y="60" width="5" height="2" fill="${LAVENDER}" opacity="0.5" transform="rotate(45 77 61)"/>
      <rect x="10" y="65" width="5" height="2" fill="${SAGE}" opacity="0.5" transform="rotate(-30 12 66)"/>
      <rect x="45" y="70" width="5" height="2" fill="${PEACH_D}" opacity="0.5" transform="rotate(15 47 71)"/>
      <path d="M38 15 L40 12 L42 15 L40 18Z" fill="${GOLD}" opacity="0.5"/>
      <path d="M72 12 L74 9 L76 12 L74 15Z" fill="${DUSTY_ROSE}" opacity="0.5"/>
    </svg>`,
  },
];

export const stickerCategories = [
  { id: "botanical", name: "보타니컬" },
  { id: "text", name: "텍스트" },
  { id: "deco", name: "장식" },
] as const;
