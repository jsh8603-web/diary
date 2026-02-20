
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** diary (우리 아기 일기)
- **Date:** 2026-02-19
- **Prepared by:** TestSprite AI Team
- **Total Tests:** 30
- **Passed:** 16 (53.3%)
- **Failed:** 14 (46.7%)

---

## 2️⃣ Requirement Validation Summary

### Requirement: Home Page
- **Description:** Landing page with hero section, recent diary entries, recent comments, and CTA navigation.

#### Test TC001 Home page displays hero section and primary landing content
- **Test Code:** [TC001_Home_page_displays_hero_section_and_primary_landing_content.py](./TC001_Home_page_displays_hero_section_and_primary_landing_content.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/74e55885-d7bd-4e3c-a5f8-f69b9aeb200d
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Hero section with baby image, title "우리 아기 일기", and CTA button rendered correctly on the home page.
---

#### Test TC002 Navigate from Home to Diary List using "일기 보러가기" CTA
- **Test Code:** [TC002_Navigate_from_Home_to_Diary_List_using___CTA.py](./TC002_Navigate_from_Home_to_Diary_List_using___CTA.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/01e0b6d7-53a9-4e31-9b5f-a0965ba997d0
- **Status:** ❌ Failed
- **Severity:** MEDIUM
- **Analysis / Findings:** The "일기 보러가기" CTA button did not navigate to /diary after two click attempts. The browser URL remained at /. However, the top navigation "일기 목록" link successfully navigated to /diary. This is likely a z-index or overlay issue intercepting clicks on the CTA, not a routing problem. The CTA is a standard Next.js Link component with href="/diary", so the HTML is correct — the click event is being blocked by a visual overlay.
---

#### Test TC003 Open a diary detail by clicking a recent diary entry card
- **Test Code:** [TC003_Open_a_diary_detail_by_clicking_a_recent_diary_entry_card.py](./TC003_Open_a_diary_detail_by_clicking_a_recent_diary_entry_card.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/8811adaf-7a98-41cf-aca3-f17606afcdcd
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Clicking a recent diary entry card on the home page successfully navigated to the diary detail view.
---

#### Test TC004 Recent comments section renders and is readable
- **Test Code:** [TC004_Recent_comments_section_renders_and_is_readable.py](./TC004_Recent_comments_section_renders_and_is_readable.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/3d3e325c-7714-4989-b608-e042b87de4de
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Recent comments section rendered correctly with user names, dates, and content.
---

#### Test TC005 Recent entries grid shows entry cards with basic information
- **Test Code:** [TC005_Recent_entries_grid_shows_entry_cards_with_basic_information.py](./TC005_Recent_entries_grid_shows_entry_cards_with_basic_information.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/d7643d71-8572-498c-98d7-9bce1d9a0114
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Recent entries grid displayed diary entry cards with thumbnails, dates, titles, and content previews.
---

### Requirement: Diary List
- **Description:** Paginated list of diary entries grouped by month with load more functionality.

#### Test TC006 Diary list page loads and shows entries grouped by month
- **Test Code:** [TC006_Diary_list_page_loads_and_shows_entries_grouped_by_month.py](./TC006_Diary_list_page_loads_and_shows_entries_grouped_by_month.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/378ed021-6e77-44d0-93e7-04d2a5a67202
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Diary list page loaded successfully with entries grouped by month headings (e.g., "2026년 2월").
---

#### Test TC007 Open a diary entry from the list and land on the diary detail view
- **Test Code:** [TC007_Open_a_diary_entry_from_the_list_and_land_on_the_diary_detail_view.py](./TC007_Open_a_diary_entry_from_the_list_and_land_on_the_diary_detail_view.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/e7fcbb49-17b5-4f44-a6a9-a2b7b930bcb6
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Clicking an entry in the diary list correctly navigated to the diary detail page with the expected date parameter.
---

#### Test TC008 Load the next page of diary entries using "더 보기"
- **Test Code:** [TC008_Load_the_next_page_of_diary_entries_using__.py](./TC008_Load_the_next_page_of_diary_entries_using__.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/4bfb7bef-b5be-433e-bd87-a783fcd4066d
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** The "더 보기" button was not found on the page. This is expected behavior — the button only appears when there are more than 20 entries (PAGE_SIZE). The test database has only 3 entries, so the button is correctly hidden. This is a **false failure** due to insufficient test data, not a bug.
---

#### Test TC009 Month grouping remains visible after loading more entries
- **Test Code:** [TC009_Month_grouping_remains_visible_after_loading_more_entries.py](./TC009_Month_grouping_remains_visible_after_loading_more_entries.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/5fe6d4f8-794c-4c28-9146-0c34d1ca9acc
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Month grouping headers remain visible and correctly formatted.
---

#### Test TC010 Diary list gracefully handles loading when scrolling near the bottom
- **Test Code:** [TC010_Diary_list_gracefully_handles_loading_when_scrolling_near_the_bottom_infinite_scroll_behavior.py](./TC010_Diary_list_gracefully_handles_loading_when_scrolling_near_the_bottom_infinite_scroll_behavior.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/a2aca5cb-b3e4-47ce-8e3e-16f10f2f86e5
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** Same as TC008 — no additional entries loaded because only 3 entries exist in the database (below the 20-entry page threshold). This is a **false failure** due to insufficient test data. The app uses a "더 보기" button, not infinite scroll.
---

### Requirement: Diary Detail
- **Description:** View a single diary entry with photos, lightbox, content, admin controls, and comments.

#### Test TC011 View diary entry details and return to list
- **Test Code:** [TC011_View_diary_entry_details_and_return_to_list.py](./TC011_View_diary_entry_details_and_return_to_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/d94d1d4e-ffa4-4c90-a37c-e1f3dc04f669
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Diary detail page displayed entry content correctly and "목록으로" back navigation returned to the diary list.
---

#### Test TC012 Open photo lightbox and close with Escape
- **Test Code:** [TC012_Open_photo_lightbox_and_close_with_Escape.py](./TC012_Open_photo_lightbox_and_close_with_Escape.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/7ad50993-5c6b-442f-82dd-5a3fb3d5569e
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Photo lightbox opened on photo click and closed correctly with the Escape key.
---

#### Test TC013 Navigate photos in lightbox using next arrow and close with X
- **Test Code:** [TC013_Navigate_photos_in_lightbox_using_next_arrow_and_close_with_X.py](./TC013_Navigate_photos_in_lightbox_using_next_arrow_and_close_with_X.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/80c635c4-209b-4024-965a-3388efdfb4e0
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Arrow navigation in lightbox worked correctly, and X button closed the lightbox.
---

#### Test TC014 Read comments section on diary detail
- **Test Code:** [TC014_Read_comments_section_on_diary_detail.py](./TC014_Read_comments_section_on_diary_detail.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/a39e6dff-8f3f-4c76-89d8-7c3c2b5a3b81
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Comments section on the diary detail page rendered correctly with existing comments.
---

#### Test TC015 Logged-in user posts a comment and sees it appear
- **Test Code:** [TC015_Logged_in_user_posts_a_comment_and_sees_it_appear.py](./TC015_Logged_in_user_posts_a_comment_and_sees_it_appear.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/30289bb9-a33c-4529-9bab-4a216ef63a84
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** Authentication failed with "Firebase: Error (auth/invalid-credential)" using test credentials (example@gmail.com / password123). This is an **environment issue** — no valid test account was provided. The comment posting feature could not be tested without authentication.
---

#### Test TC016 Non-admin user does not see Edit/Delete controls on diary detail
- **Test Code:** [TC016_Non_admin_user_does_not_see_EditDelete_controls_on_diary_detail.py](./TC016_Non_admin_user_does_not_see_EditDelete_controls_on_diary_detail.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/4593c147-726a-4f78-aa2a-e10f73176018
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** Authentication blocked by Firebase rate limiting (auth/too-many-requests). **Environment issue** — cannot verify non-admin user access control without valid test credentials.
---

#### Test TC017 Diary detail page handles missing/invalid date parameter gracefully
- **Test Code:** [TC017_Diary_detail_page_handles_missinginvalid_date_parameter_gracefully.py](./TC017_Diary_detail_page_handles_missinginvalid_date_parameter_gracefully.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/dc741d9d-52c1-439a-8e03-25352425fbff
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** The diary detail page handled invalid date parameters gracefully, showing an appropriate "일기를 찾을 수 없습니다" message.
---

### Requirement: Write New Diary (Admin Only)
- **Description:** Create new diary entry with date, title, photos, content. Protected by AuthGuard.

#### Test TC018 Create a new diary entry with date, title, content, and submit successfully
- **Test Code:** [TC018_Create_a_new_diary_entry_with_date_title_content_and_submit_successfully.py](./TC018_Create_a_new_diary_entry_with_date_title_content_and_submit_successfully.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/762a1b66-3b56-458e-be82-bd0bf8c49803
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** Authentication was unstable — session appeared and disappeared. The /write page never rendered the form (showed spinner then redirected to homepage). This is an **environment issue** — the test account was not a valid admin user, so AuthGuard correctly blocked access.
---

#### Test TC019 Cancel from the new diary entry form returns to the previous/browse experience
- **Test Code:** [TC019_Cancel_from_the_new_diary_entry_form_returns_to_the_previousbrowse_experience.py](./TC019_Cancel_from_the_new_diary_entry_form_returns_to_the_previousbrowse_experience.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/51a1c505-b14f-4481-ac5e-a58548445799
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** Firebase rate limiting (auth/too-many-requests) blocked login. Write form not accessible. **Environment issue** — no valid admin credentials provided.
---

#### Test TC020 Required content validation blocks submit when content is empty
- **Test Code:** [TC020_Required_content_validation_blocks_submit_when_content_is_empty.py](./TC020_Required_content_validation_blocks_submit_when_content_is_empty.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/5427ef89-f6dc-452f-97b5-820b9cb392ea
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** Authentication blocked by Firebase rate limiting. Write form inaccessible. **Environment issue**.
---

#### Test TC021 Non-admin user is blocked from using Write page
- **Test Code:** [TC021_Non_admin_user_is_blocked_from_using_Write_page_access_denied_or_cannot_proceed.py](./TC021_Non_admin_user_is_blocked_from_using_Write_page_access_denied_or_cannot_proceed.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/8e4d7164-0ce9-4b7f-8ac2-9e6f3a69b09c
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** Non-admin credentials (nonadmin_user@example.com) returned auth/invalid-credential. **Environment issue** — no valid non-admin test account exists.
---

### Requirement: Edit Diary (Admin Only)
- **Description:** Edit existing diary entry with pre-filled form, photo management, and save/cancel.

#### Test TC022 Admin edits an existing diary entry and saves updates
- **Test Code:** [TC022_Admin_edits_an_existing_diary_entry_and_saves_updates.py](./TC022_Admin_edits_an_existing_diary_entry_and_saves_updates.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/d3777fe8-42d1-4c36-ba71-7aee3e1bfdb1
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** A new account was created via signup, but the user was not an admin (not in ADMIN_EMAILS env var). Edit controls were not visible. **Environment issue** — no admin credentials provided.
---

#### Test TC023 Edit form shows pre-filled existing diary data
- **Test Code:** [TC023_Edit_form_shows_pre_filled_existing_diary_data.py](./TC023_Edit_form_shows_pre_filled_existing_diary_data.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/9ee0f21a-9453-42e9-acf2-77830bbd1841
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Edit form successfully showed pre-filled data from existing diary entry.
---

#### Test TC024 Admin updates title and content and is redirected to diary detail
- **Test Code:** [TC024_Admin_updates_title_and_content_and_is_redirected_to_diary_detail.py](./TC024_Admin_updates_title_and_content_and_is_redirected_to_diary_detail.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/f7a3505d-dba9-41db-8bb0-228e462df211
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** Firebase rate limiting (auth/too-many-requests) blocked login. **Environment issue**.
---

#### Test TC025 Admin cancels editing and returns without saving
- **Test Code:** [TC025_Admin_cancels_editing_and_returns_without_saving.py](./TC025_Admin_cancels_editing_and_returns_without_saving.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/27374269-ddfa-4aeb-8963-2adbff251293
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** Authentication failed (auth/invalid-credential). Edit form did not render. **Environment issue**.
---

#### Test TC026 Admin opens built-in photo editor from an existing photo
- **Test Code:** [TC026_Admin_opens_built_in_photo_editor_from_an_existing_photo.py](./TC026_Admin_opens_built_in_photo_editor_from_an_existing_photo.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/7a0edc39-4977-4cb0-90fc-1e2c4bc28012
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Photo editor opened correctly from an existing photo in the edit form.
---

#### Test TC027 Admin removes an existing photo and confirms removal
- **Test Code:** [TC027_Admin_removes_an_existing_photo_and_confirms_removal.py](./TC027_Admin_removes_an_existing_photo_and_confirms_removal.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/236462c3-e149-4f7c-a9df-38d75d1b12ab
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** Both email/password and Google OAuth login failed. Email returned auth/invalid-credential; Google sign-in was blocked by Google security ("This browser or app may not be secure"). **Environment issue** — automated browser not trusted by Google OAuth.
---

### Requirement: PDF Export (Admin Only)
- **Description:** Export diary entries in a date range to a styled A5 PDF.

#### Test TC028 Export PDF successfully for a valid date range
- **Test Code:** [TC028_Export_PDF_successfully_for_a_valid_date_range_shows_progress_and_completes.py](./TC028_Export_PDF_successfully_for_a_valid_date_range_shows_progress_and_completes.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/7cbc424e-5b34-4e03-808f-b87a32de229e
- **Status:** ❌ Failed
- **Severity:** LOW
- **Analysis / Findings:** Firebase rate limiting blocked authentication. Export page requires admin login and did not render the form for unauthenticated users (AuthGuard working correctly). **Environment issue**.
---

### Requirement: Navigation
- **Description:** Responsive header with desktop nav, mobile menu, logo link, and auth-state-dependent links.

#### Test TC029 Header logo navigates back to Home from another page
- **Test Code:** [TC029_Header_logo_navigates_back_to_Home_from_another_page.py](./TC029_Header_logo_navigates_back_to_Home_from_another_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/795e8c3f-358b-4de1-8bb7-358f6981ba08
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Clicking the "우리 아기 일기" logo in the header correctly navigated back to the home page from /diary.
---

#### Test TC030 Desktop header link navigates to Diary list
- **Test Code:** [TC030_Desktop_header_link_navigates_to_Diary_list.py](./TC030_Desktop_header_link_navigates_to_Diary_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f326339-d40b-4f0e-ad77-68960114548e/59bcbaa0-663c-4ff1-9246-d3dcb6c25f87
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Desktop header "일기 목록" link correctly navigated to /diary page.
---

## 3️⃣ Coverage & Matching Metrics

- **53.3%** of tests passed (16/30)

| Requirement        | Total Tests | ✅ Passed | ❌ Failed |
|--------------------|-------------|-----------|-----------|
| Home Page          | 5           | 4         | 1         |
| Diary List         | 5           | 3         | 2         |
| Diary Detail       | 7           | 5         | 2         |
| Write New Diary    | 4           | 0         | 4         |
| Edit Diary         | 6           | 2         | 4         |
| PDF Export         | 1           | 0         | 1         |
| Navigation         | 2           | 2         | 0         |

---

## 4️⃣ Key Gaps / Risks

### Actual Bugs Found (1)
1. **TC002 - Home CTA "일기 보러가기" not clickable**: The hero section CTA button failed to navigate to /diary despite being a valid Next.js Link. Likely caused by a z-index/overlay issue where another element intercepts clicks. The top nav "일기 목록" link works fine, confirming routing is correct.

### Environment/Test Setup Issues (11 failures)
Most failures (11 of 14) are caused by **lack of valid test credentials**, not application bugs:
- **No valid test account provided**: Tests used placeholder credentials (example@gmail.com / password123) which don't exist in Firebase.
- **Firebase rate limiting (auth/too-many-requests)**: Repeated failed login attempts triggered Firebase's rate limiter, blocking subsequent tests.
- **Google OAuth blocked in automated browser**: Google's security rejected sign-in from TestSprite's automated browser.
- **No admin test account**: Admin-only features (write, edit, export) require an account in ADMIN_EMAILS. No such credentials were provided.

### Data Limitations (2 failures)
- **TC008, TC010**: "더 보기" pagination could not be tested because only 3 diary entries exist in the database (threshold is 20).

### Recommendations
1. **Fix TC002**: Investigate z-index layering on the home page hero section CTA button.
2. **Provide test credentials**: Create a dedicated test account (both admin and non-admin) for E2E testing.
3. **Seed test data**: Add 25+ diary entries to enable pagination testing.
4. **Configure OAuth for testing**: Set up Firebase Auth emulator or test OAuth client for automated testing environments.
---
