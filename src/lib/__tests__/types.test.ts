/**
 * Tests for src/lib/types.ts
 * - ADMIN_EMAILS parsing
 * - isAdmin function
 */

// We need to test ADMIN_EMAILS which reads process.env at module load time.
// So we must set the env var BEFORE importing the module, then reset between groups.

describe("types - ADMIN_EMAILS and isAdmin", () => {
  const originalEnv = process.env.NEXT_PUBLIC_ADMIN_EMAILS;

  afterAll(() => {
    // Restore original env
    if (originalEnv !== undefined) {
      process.env.NEXT_PUBLIC_ADMIN_EMAILS = originalEnv;
    } else {
      delete process.env.NEXT_PUBLIC_ADMIN_EMAILS;
    }
  });

  describe("ADMIN_EMAILS parsing - with emails set", () => {
    beforeAll(() => {
      process.env.NEXT_PUBLIC_ADMIN_EMAILS = "admin@test.com, Manager@Test.COM , user@example.com";
    });

    afterAll(() => {
      // Clean module cache so next group re-imports with new env
      jest.resetModules();
    });

    it("should parse comma-separated emails into a trimmed lowercase array", () => {
      const { ADMIN_EMAILS } = require("../types");
      expect(ADMIN_EMAILS).toEqual([
        "admin@test.com",
        "manager@test.com",
        "user@example.com",
      ]);
    });

    it("should contain the correct number of emails", () => {
      const { ADMIN_EMAILS } = require("../types");
      expect(ADMIN_EMAILS).toHaveLength(3);
    });
  });

  describe("ADMIN_EMAILS parsing - with no env var", () => {
    beforeAll(() => {
      delete process.env.NEXT_PUBLIC_ADMIN_EMAILS;
      jest.resetModules();
    });

    it("should result in an empty array when env var is not set", () => {
      const { ADMIN_EMAILS } = require("../types");
      expect(ADMIN_EMAILS).toEqual([]);
    });
  });

  describe("ADMIN_EMAILS parsing - with empty string", () => {
    beforeAll(() => {
      process.env.NEXT_PUBLIC_ADMIN_EMAILS = "";
      jest.resetModules();
    });

    it("should result in an empty array when env var is empty string", () => {
      const { ADMIN_EMAILS } = require("../types");
      expect(ADMIN_EMAILS).toEqual([]);
    });
  });

  describe("ADMIN_EMAILS parsing - with whitespace-only entries", () => {
    beforeAll(() => {
      process.env.NEXT_PUBLIC_ADMIN_EMAILS = " , ,  ";
      jest.resetModules();
    });

    it("should filter out whitespace-only entries", () => {
      const { ADMIN_EMAILS } = require("../types");
      expect(ADMIN_EMAILS).toEqual([]);
    });
  });

  describe("isAdmin function", () => {
    beforeAll(() => {
      process.env.NEXT_PUBLIC_ADMIN_EMAILS = "admin@test.com, manager@test.com";
      jest.resetModules();
    });

    it("should return false for null email", () => {
      const { isAdmin } = require("../types");
      expect(isAdmin(null)).toBe(false);
    });

    it("should return false for undefined email", () => {
      const { isAdmin } = require("../types");
      expect(isAdmin(undefined)).toBe(false);
    });

    it("should return false for empty string email", () => {
      const { isAdmin } = require("../types");
      expect(isAdmin("")).toBe(false);
    });

    it("should return true for an admin email (exact match)", () => {
      const { isAdmin } = require("../types");
      expect(isAdmin("admin@test.com")).toBe(true);
    });

    it("should return true for an admin email (case insensitive)", () => {
      const { isAdmin } = require("../types");
      expect(isAdmin("Admin@Test.COM")).toBe(true);
      expect(isAdmin("MANAGER@TEST.COM")).toBe(true);
    });

    it("should return false for a non-admin email", () => {
      const { isAdmin } = require("../types");
      expect(isAdmin("random@user.com")).toBe(false);
    });
  });

  describe("isAdmin function - when no admin emails configured", () => {
    beforeAll(() => {
      delete process.env.NEXT_PUBLIC_ADMIN_EMAILS;
      jest.resetModules();
    });

    it("should return false for any email when ADMIN_EMAILS is empty", () => {
      const { isAdmin } = require("../types");
      expect(isAdmin("admin@test.com")).toBe(false);
      expect(isAdmin("anyone@example.com")).toBe(false);
    });
  });
});
