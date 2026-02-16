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

export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  return imageCompression(file, options);
}

export async function uploadPhoto(
  file: File,
  entryDate: string,
  index: number
): Promise<PhotoInfo> {
  const compressed = await compressImage(file);
  const ext = file.name.split(".").pop() || "jpg";
  const path = `photos/${entryDate}/${Date.now()}_${index}.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, compressed);
  const url = await getDownloadURL(storageRef);
  return { url, path };
}

export async function deletePhoto(path: string) {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}
