"use client";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./config";
import imageCompression from "browser-image-compression";
import type { PhotoInfo } from "../types";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
  "image/heif",
];
const MAX_FILE_SIZE_MB = 20; // 압축 전 최대 허용 사이즈
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "heic", "heif"];

function validateFile(file: File): void {
  if (!file) {
    throw new Error("파일이 없습니다.");
  }

  // 파일 타입 검증
  if (file.type && !ALLOWED_TYPES.includes(file.type.toLowerCase())) {
    throw new Error(
      `지원하지 않는 파일 형식입니다: ${file.type}. 지원 형식: JPEG, PNG, GIF, WebP, HEIC`
    );
  }

  // 확장자 검증 (type이 빈 문자열인 경우 대비)
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  if (ext && !ALLOWED_EXTENSIONS.includes(ext)) {
    throw new Error(
      `지원하지 않는 파일 확장자입니다: .${ext}`
    );
  }

  // 용량 제한 체크
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > MAX_FILE_SIZE_MB) {
    throw new Error(
      `파일 크기가 너무 큽니다: ${fileSizeMB.toFixed(1)}MB (최대 ${MAX_FILE_SIZE_MB}MB)`
    );
  }
}

function sanitizeFileName(name: string): string {
  // 파일명에서 위험한 문자 제거, 경로 탐색 방지
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/\.\./g, "_");
}

export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("이미지 압축 실패, 원본 사용:", error);
    // 압축 실패 시 원본 파일 반환 (네트워크나 WebWorker 오류 등)
    return file;
  }
}

export async function uploadPhoto(
  file: File,
  entryDate: string,
  index: number
): Promise<PhotoInfo> {
  validateFile(file);

  if (!entryDate || !/^\d{4}-\d{2}-\d{2}$/.test(entryDate)) {
    throw new Error("잘못된 날짜 형식입니다.");
  }

  const compressed = await compressImage(file);
  const rawExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const ext = ALLOWED_EXTENSIONS.includes(rawExt) ? rawExt : "jpg";
  const safeName = sanitizeFileName(`${Date.now()}_${index}.${ext}`);
  const path = `photos/${entryDate}/${safeName}`;
  const storageRef = ref(storage, path);

  await uploadBytes(storageRef, compressed, {
    contentType: compressed.type || `image/${ext === "jpg" ? "jpeg" : ext}`,
  });

  const url = await getDownloadURL(storageRef);
  return { url, path };
}

export async function deletePhoto(path: string) {
  if (!path) {
    throw new Error("삭제할 파일 경로가 없습니다.");
  }
  // 경로 탐색 공격 방지
  if (path.includes("..") || !path.startsWith("photos/")) {
    throw new Error("잘못된 파일 경로입니다.");
  }
  const storageRef = ref(storage, path);
  try {
    await deleteObject(storageRef);
  } catch (error: unknown) {
    const code = (error as { code?: string })?.code;
    // 이미 삭제된 파일인 경우 에러 무시
    if (code === "storage/object-not-found") {
      console.warn("이미 삭제된 파일:", path);
      return;
    }
    throw error;
  }
}
