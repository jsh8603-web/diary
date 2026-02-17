/**
 * Tests for src/lib/stickers.ts
 * - stickers array structure
 * - Each sticker's required properties
 * - stickerCategories validation
 * - category values are valid
 */

import { stickers, stickerCategories, type StickerDef } from "../stickers";

describe("stickers", () => {
  it("should be a non-empty array", () => {
    expect(Array.isArray(stickers)).toBe(true);
    expect(stickers.length).toBeGreaterThan(0);
  });

  it("each sticker should have all required properties", () => {
    stickers.forEach((sticker: StickerDef) => {
      expect(sticker).toHaveProperty("id");
      expect(sticker).toHaveProperty("name");
      expect(sticker).toHaveProperty("category");
      expect(sticker).toHaveProperty("svg");
      expect(sticker).toHaveProperty("width");
      expect(sticker).toHaveProperty("height");
    });
  });

  it("each sticker id should be a non-empty string", () => {
    stickers.forEach((sticker) => {
      expect(typeof sticker.id).toBe("string");
      expect(sticker.id.length).toBeGreaterThan(0);
    });
  });

  it("each sticker name should be a non-empty string", () => {
    stickers.forEach((sticker) => {
      expect(typeof sticker.name).toBe("string");
      expect(sticker.name.length).toBeGreaterThan(0);
    });
  });

  it("each sticker svg should be a non-empty string containing <svg", () => {
    stickers.forEach((sticker) => {
      expect(typeof sticker.svg).toBe("string");
      expect(sticker.svg).toContain("<svg");
    });
  });

  it("each sticker width and height should be positive numbers", () => {
    stickers.forEach((sticker) => {
      expect(typeof sticker.width).toBe("number");
      expect(typeof sticker.height).toBe("number");
      expect(sticker.width).toBeGreaterThan(0);
      expect(sticker.height).toBeGreaterThan(0);
    });
  });

  it("each sticker id should be unique", () => {
    const ids = stickers.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('each sticker category should be one of "botanical", "text", or "deco"', () => {
    const validCategories = ["botanical", "text", "deco"];
    stickers.forEach((sticker) => {
      expect(validCategories).toContain(sticker.category);
    });
  });

  it("should have stickers in all defined categories", () => {
    const usedCategories = new Set(stickers.map((s) => s.category));
    expect(usedCategories.has("botanical")).toBe(true);
    expect(usedCategories.has("text")).toBe(true);
    expect(usedCategories.has("deco")).toBe(true);
  });
});

describe("stickerCategories", () => {
  it("should be a non-empty array", () => {
    expect(Array.isArray(stickerCategories)).toBe(true);
    expect(stickerCategories.length).toBeGreaterThan(0);
  });

  it("each category should have id and name properties", () => {
    stickerCategories.forEach((cat) => {
      expect(cat).toHaveProperty("id");
      expect(cat).toHaveProperty("name");
      expect(typeof cat.id).toBe("string");
      expect(typeof cat.name).toBe("string");
    });
  });

  it("should contain botanical, text, and deco categories", () => {
    const categoryIds = stickerCategories.map((c) => c.id);
    expect(categoryIds).toContain("botanical");
    expect(categoryIds).toContain("text");
    expect(categoryIds).toContain("deco");
  });

  it("category ids should be unique", () => {
    const ids = stickerCategories.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("all sticker categories should appear in stickerCategories", () => {
    const categoryIds = stickerCategories.map((c) => c.id);
    const usedCategories = new Set(stickers.map((s) => s.category));
    usedCategories.forEach((cat) => {
      expect(categoryIds).toContain(cat);
    });
  });
});
