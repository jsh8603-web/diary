/**
 * Firestore 시드 데이터 스크립트
 *
 * 사용법:
 *   npm run seed          - 25개 일기 생성 (authorId: "seed-admin")
 *   npm run seed:clear    - seed-admin 일기 전체 삭제
 *
 * 사전 준비:
 *   1. Firebase 콘솔 > 프로젝트 설정 > 서비스 계정 > 새 비공개 키 생성
 *   2. 다운로드한 JSON 파일을 프로젝트 루트에 'service-account-key.json' 으로 저장
 */

import * as admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve } from "path";

const SERVICE_ACCOUNT_PATH = resolve(
  process.cwd(),
  "service-account-key.json"
);

function initAdmin() {
  if (admin.apps.length > 0) return;

  let serviceAccount: admin.ServiceAccount;
  try {
    serviceAccount = JSON.parse(
      readFileSync(SERVICE_ACCOUNT_PATH, "utf-8")
    ) as admin.ServiceAccount;
  } catch {
    console.error(
      "❌ service-account-key.json 파일을 찾을 수 없습니다.\n" +
        "   Firebase 콘솔 > 프로젝트 설정 > 서비스 계정 > 새 비공개 키 생성 후\n" +
        "   프로젝트 루트에 service-account-key.json 으로 저장하세요."
    );
    process.exit(1);
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const ENTRIES_COL = "entries";
const SEED_AUTHOR_ID = "seed-admin";
const SEED_AUTHOR_NAME = "시드 관리자";

interface SeedEntry {
  date: string;
  title?: string;
  content: string;
}

/** 25개 시드 데이터 (2025-11 ~ 2026-02, 4개월 분) */
const SEED_ENTRIES: SeedEntry[] = [
  // 2025년 11월 (3개)
  {
    date: "2025-11-05",
    title: "첫 뒤집기 성공!",
    content:
      "오늘 아기가 드디어 뒤집기에 성공했어요! 배밀이를 열심히 하더니 갑자기 스르르 뒤집혔어요. 너무 신기하고 기특해서 영상을 엄청 찍었답니다. 할머니한테도 바로 보내드렸어요.",
  },
  {
    date: "2025-11-14",
    title: "소아과 정기 검진",
    content:
      "4개월 건강검진을 다녀왔어요. 몸무게 6.8kg, 키 62cm로 정상 범위라고 하셨어요. 예방접종도 맞았는데 잠깐 울다가 금방 진정됐어요. 집에 와서 많이 먹고 잘 자고 있어요.",
  },
  {
    date: "2025-11-28",
    content:
      "추운 날씨에 처음으로 두꺼운 외투를 입혀서 산책을 나갔어요. 아기가 바람이 낯선지 눈을 꼭 감았다 뜨다 했어요. 공원 낙엽을 보여주었더니 신기한 듯 바라봤답니다.",
  },

  // 2025년 12월 (7개)
  {
    date: "2025-12-02",
    title: "이유식 첫 도전",
    content:
      "쌀미음으로 이유식을 처음 시작했어요. 한 숟가락 떠서 넣어줬더니 혀로 밀어내는 혀 내밀기 반사가 아직 있네요. 그래도 조금은 삼킨 것 같아요. 천천히 익혀가겠습니다.",
  },
  {
    date: "2025-12-08",
    title: "목 가누기 완성",
    content:
      "터미타임 할 때 목을 완전히 가누게 됐어요! 머리를 90도로 꼿꼿이 세우고 두리번두리번 하는 모습이 너무 귀여워요. 엎드려서 이렇게 오래 있은 건 처음이에요.",
  },
  {
    date: "2025-12-15",
    content:
      "오늘은 할아버지 할머니 댁에 놀러 갔어요. 아기를 보시고 너무 기뻐하셔서 종일 안고 계셨어요. 낯가림이 시작됐는지 처음엔 조금 울었지만 금방 적응했어요.",
  },
  {
    date: "2025-12-22",
    title: "첫 크리스마스 준비",
    content:
      "크리스마스 트리 앞에 아기를 앉혀 놓고 사진을 찍었어요. 반짝반짝 빛나는 전구를 보면서 눈을 크게 뜨고 신기하게 쳐다봤어요. 내년 이맘때는 뭘 하고 있을까요.",
  },
  {
    date: "2025-12-25",
    title: "메리 크리스마스!",
    content:
      "아기의 첫 크리스마스예요. 산타 모자를 씌우고 사진을 엄청 찍었어요. 루돌프 잠옷도 입혀봤는데 너무 귀엽더라고요. 가족들이 모두 모여 행복한 하루를 보냈습니다.",
  },
  {
    date: "2025-12-28",
    content:
      "한 해의 마지막이 다가오고 있어요. 올해는 아기와 함께한 첫 해라 정말 특별했어요. 힘든 순간도 있었지만 아기 웃음 하나에 모든 게 녹아버렸던 것 같아요.",
  },
  {
    date: "2025-12-31",
    title: "2025년의 마지막 날",
    content:
      "올 한해를 마무리하는 날이에요. 아기와 함께한 첫 한 해. 너무 많은 것들이 바뀌었고, 더 많이 사랑하게 됐어요. 내년에도 건강하고 행복하게 자라주길 바랍니다.",
  },

  // 2026년 1월 (8개)
  {
    date: "2026-01-01",
    title: "새해 첫날",
    content:
      "새해 첫날, 아기와 함께 해를 맞았어요. 아직 아기는 모르겠지만 엄마 아빠에게는 특별한 하루예요. 올 한 해도 건강하게 자라주렴.",
  },
  {
    date: "2026-01-04",
    content:
      "낮잠 패턴이 드디어 잡혀가고 있어요. 오전 오후 한 번씩 자고, 밤에 통잠에 가까워지고 있어요. 덕분에 엄마 아빠도 좀 더 쉬게 됐답니다.",
  },
  {
    date: "2026-01-08",
    title: "옹알이가 늘었어요",
    content:
      "아가 아가, 바바바 하는 옹알이가 많아졌어요. 말을 건네면 쳐다보면서 옹알이로 대답하는 것 같아요. 언제쯤 엄마, 아빠 소리를 들을 수 있을까요?",
  },
  {
    date: "2026-01-12",
    title: "이유식 2단계 시작",
    content:
      "쌀미음에서 야채 퓨레로 이유식을 업그레이드했어요. 당근 퓨레를 처음 먹어봤는데 뭔가 새로운 맛이 신기한지 입을 오물오물 했어요. 야채 이유식 잘 먹어줘서 다행이에요.",
  },
  {
    date: "2026-01-17",
    content:
      "오늘 목욕 시간에 발차기를 엄청 심하게 해서 욕조 물이 사방으로 튀었어요. 물 첨벙거리는 게 재미있나봐요. 웃으면서 발을 계속 찼답니다.",
  },
  {
    date: "2026-01-21",
    title: "앉기 연습 시작",
    content:
      "등 뒤에 쿠션을 받치고 앉기 연습을 시작했어요. 아직은 금방 옆으로 쓰러지지만 점점 균형을 잡아가고 있어요. 앉아서 장난감을 만지는 게 재미있어 보여요.",
  },
  {
    date: "2026-01-25",
    content:
      "추운 날씨에 감기 기운이 조금 있어서 병원에 갔어요. 다행히 가벼운 감기라 시럽만 처방받았어요. 빨리 나아라, 우리 아기.",
  },
  {
    date: "2026-01-30",
    title: "첫 이빨이 나오나봐요",
    content:
      "잇몸이 부어있고 침을 엄청 흘리고 있어요. 소아과 선생님이 곧 이빨이 나올 것 같다고 하셨어요. 이앓이가 시작된 건지 평소보다 더 칭얼거리네요.",
  },

  // 2026년 2월 (7개)
  {
    date: "2026-02-01",
    title: "첫 이빨 발견!",
    content:
      "드디어 아랫니 하나가 살짝 올라왔어요! 만져보니 뾰족뾰족 하더라고요. 이빨 나는 게 이렇게 설렐 줄이야. 사진을 찍으려고 했는데 입을 안 벌려줘서 힘들었어요.",
  },
  {
    date: "2026-02-04",
    content:
      "설 명절을 맞아 친척들이 한자리에 모였어요. 아기를 처음 보는 친척들이 많아서 아기가 눈이 휘둥그레졌어요. 세뱃돈도 처음으로 받았답니다!",
  },
  {
    date: "2026-02-08",
    title: "배밀이 레벨업",
    content:
      "배밀이가 엄청 빨라졌어요. 장난감을 눈 앞에 두면 열심히 기어가서 잡으려고 해요. 곧 손과 무릎으로 기어다닐 수 있을 것 같아요.",
  },
  {
    date: "2026-02-12",
    content:
      "오늘은 엄마 친구 아기와 처음으로 또래 친구를 만났어요. 서로 쳐다보기만 하고 어색해했지만 엄마들은 너무 신나게 수다 떨었답니다.",
  },
  {
    date: "2026-02-15",
    title: "이유식 잘 먹는 중",
    content:
      "이유식을 너무 잘 먹어서 벌써 두 번째 단계 식재료를 추가하고 있어요. 브로콜리, 감자, 단호박까지 도전했는데 다 잘 먹어요. 편식 없이 자라주렴.",
  },
  {
    date: "2026-02-17",
    content:
      "저녁에 아빠가 아기를 재우면서 자장가를 불러줬어요. 처음에는 눈을 동그랗게 뜨고 쳐다보다가 어느새 스르르 잠들었어요. 아빠가 뿌듯해했답니다.",
  },
  {
    date: "2026-02-19",
    title: "오늘도 행복한 하루",
    content:
      "아기가 처음으로 손가락으로 뭔가를 가리키는 것 같았어요. 창문 밖 새를 보면서 팔을 뻗더라고요. 세상이 점점 넓어지고 있는 우리 아기. 매일 매일이 새로운 발견이에요.",
  },
];

async function seed() {
  initAdmin();
  const db = admin.firestore();
  const batch = db.batch();

  console.log(`🌱 ${SEED_ENTRIES.length}개 일기 항목을 생성합니다...`);

  const now = admin.firestore.Timestamp.now();

  for (const entry of SEED_ENTRIES) {
    const ref = db.collection(ENTRIES_COL).doc(entry.date);
    const data: Record<string, unknown> = {
      date: entry.date,
      content: entry.content,
      photos: [],
      authorId: SEED_AUTHOR_ID,
      authorName: SEED_AUTHOR_NAME,
      createdAt: now,
      updatedAt: now,
    };
    if (entry.title) {
      data.title = entry.title;
    }
    batch.set(ref, data);
  }

  await batch.commit();
  console.log(`✅ ${SEED_ENTRIES.length}개 일기 항목 생성 완료!`);
  console.log("   '/diary' 페이지에서 '더 보기' 버튼을 확인하세요.");
}

async function clear() {
  initAdmin();
  const db = admin.firestore();

  console.log("🗑️  seed-admin 일기 항목을 삭제합니다...");

  const snap = await db
    .collection(ENTRIES_COL)
    .where("authorId", "==", SEED_AUTHOR_ID)
    .get();

  if (snap.empty) {
    console.log("   삭제할 시드 데이터가 없습니다.");
    return;
  }

  const batch = db.batch();
  snap.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();

  console.log(`✅ ${snap.size}개 시드 항목 삭제 완료!`);
}

const command = process.argv[2];
if (command === "clear") {
  clear().catch(console.error);
} else {
  seed().catch(console.error);
}
