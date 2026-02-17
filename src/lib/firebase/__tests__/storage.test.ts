/**
 * Tests for src/lib/firebase/storage.ts
 * - compressImage, uploadPhoto, deletePhoto
 * - File type/size validation
 */

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

jest.mock("firebase/storage", () => ({
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
  deleteObject: jest.fn(),
}));

jest.mock("../config", () => ({
  db: {},
  auth: {},
  storage: {},
}));

jest.mock("browser-image-compression", () => {
  return jest.fn((file: File) =>
    Promise.resolve(
      new File(["compressed"], file.name, { type: file.type })
    )
  );
});

import { compressImage, uploadPhoto, deletePhoto } from "../storage";
import imageCompression from "browser-image-compression";

const mockedRef = ref as jest.MockedFunction<typeof ref>;
const mockedUploadBytes = uploadBytes as jest.MockedFunction<typeof uploadBytes>;
const mockedGetDownloadURL = getDownloadURL as jest.MockedFunction<typeof getDownloadURL>;
const mockedDeleteObject = deleteObject as jest.MockedFunction<typeof deleteObject>;
const mockedImageCompression = imageCompression as jest.MockedFunction<typeof imageCompression>;

function createMockFile(
  name: string,
  sizeInBytes: number,
  type: string
): File {
  const content = new Array(sizeInBytes).fill("a").join("");
  return new File([content], name, { type });
}

describe("storage service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedRef.mockReturnValue({} as any);
    // Restore default mock for imageCompression after clearAllMocks
    mockedImageCompression.mockImplementation((file: File) =>
      Promise.resolve(
        new File(["compressed"], file.name, { type: file.type })
      )
    );
  });

  // ── compressImage ──

  describe("compressImage", () => {
    it("should compress the image using browser-image-compression", async () => {
      const mockFile = createMockFile("photo.jpg", 1000, "image/jpeg");
      const compressedFile = new File(["compressed"], "photo.jpg", {
        type: "image/jpeg",
      });
      mockedImageCompression.mockResolvedValue(compressedFile);

      const result = await compressImage(mockFile);

      expect(imageCompression).toHaveBeenCalledWith(mockFile, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      expect(result).toBe(compressedFile);
    });

    it("should return original file if compression fails", async () => {
      const mockFile = createMockFile("photo.jpg", 1000, "image/jpeg");
      mockedImageCompression.mockRejectedValue(new Error("Compression failed"));

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      const result = await compressImage(mockFile);

      expect(result).toBe(mockFile);
      consoleSpy.mockRestore();
    });
  });

  // ── uploadPhoto ──

  describe("uploadPhoto", () => {
    it("should upload a photo and return PhotoInfo", async () => {
      const mockFile = createMockFile("photo.jpg", 1000, "image/jpeg");
      mockedUploadBytes.mockResolvedValue({} as any);
      mockedGetDownloadURL.mockResolvedValue("https://storage.example.com/photo.jpg");

      const result = await uploadPhoto(mockFile, "2025-01-15", 0);

      expect(result).toHaveProperty("url", "https://storage.example.com/photo.jpg");
      expect(result).toHaveProperty("path");
      expect(result.path).toContain("photos/2025-01-15/");
      expect(uploadBytes).toHaveBeenCalled();
      expect(getDownloadURL).toHaveBeenCalled();
    });

    it("should reject unsupported file types", async () => {
      const mockFile = createMockFile("document.pdf", 1000, "application/pdf");

      await expect(uploadPhoto(mockFile, "2025-01-15", 0)).rejects.toThrow(
        "지원하지 않는 파일 형식"
      );
    });

    it("should reject files that are too large", async () => {
      // Create a file larger than 20MB
      const largeSizeMB = 21;
      const mockFile = createMockFile(
        "huge.jpg",
        largeSizeMB * 1024 * 1024,
        "image/jpeg"
      );

      await expect(uploadPhoto(mockFile, "2025-01-15", 0)).rejects.toThrow(
        "파일 크기가 너무 큽니다"
      );
    });

    it("should accept all supported image types", async () => {
      mockedUploadBytes.mockResolvedValue({} as any);
      mockedGetDownloadURL.mockResolvedValue("https://storage.example.com/photo");

      const types = [
        { name: "photo.jpg", type: "image/jpeg" },
        { name: "photo.png", type: "image/png" },
        { name: "photo.gif", type: "image/gif" },
        { name: "photo.webp", type: "image/webp" },
      ];

      for (const { name, type } of types) {
        const mockFile = createMockFile(name, 1000, type);
        const result = await uploadPhoto(mockFile, "2025-01-15", 0);
        expect(result).toHaveProperty("url");
      }
    });

    it("should throw for invalid date format", async () => {
      const mockFile = createMockFile("photo.jpg", 1000, "image/jpeg");

      await expect(uploadPhoto(mockFile, "bad-date", 0)).rejects.toThrow(
        "잘못된 날짜 형식"
      );
    });

    it("should throw for empty date", async () => {
      const mockFile = createMockFile("photo.jpg", 1000, "image/jpeg");

      await expect(uploadPhoto(mockFile, "", 0)).rejects.toThrow(
        "잘못된 날짜 형식"
      );
    });

    it("should reject files with unsupported extensions even if type is empty", async () => {
      const mockFile = createMockFile("document.exe", 1000, "");

      await expect(uploadPhoto(mockFile, "2025-01-15", 0)).rejects.toThrow(
        "지원하지 않는 파일 확장자"
      );
    });
  });

  // ── deletePhoto ──

  describe("deletePhoto", () => {
    it("should delete a photo by storage path", async () => {
      mockedDeleteObject.mockResolvedValue(undefined);

      await deletePhoto("photos/2025-01-15/photo.jpg");

      expect(ref).toHaveBeenCalled();
      expect(deleteObject).toHaveBeenCalled();
    });

    it("should throw for empty path", async () => {
      await expect(deletePhoto("")).rejects.toThrow(
        "삭제할 파일 경로가 없습니다"
      );
    });

    it("should throw for path traversal attempts", async () => {
      await expect(deletePhoto("photos/../etc/passwd")).rejects.toThrow(
        "잘못된 파일 경로"
      );
    });

    it("should throw for paths not starting with photos/", async () => {
      await expect(deletePhoto("other/path/file.jpg")).rejects.toThrow(
        "잘못된 파일 경로"
      );
    });

    it("should silently handle already-deleted files (object-not-found)", async () => {
      mockedDeleteObject.mockRejectedValue({
        code: "storage/object-not-found",
      });

      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

      // Should NOT throw
      await expect(
        deletePhoto("photos/2025-01-15/photo.jpg")
      ).resolves.toBeUndefined();

      consoleSpy.mockRestore();
    });

    it("should rethrow other storage errors", async () => {
      mockedDeleteObject.mockRejectedValue({
        code: "storage/unauthorized",
        message: "Unauthorized",
      });

      await expect(
        deletePhoto("photos/2025-01-15/photo.jpg")
      ).rejects.toEqual(
        expect.objectContaining({ code: "storage/unauthorized" })
      );
    });
  });
});
