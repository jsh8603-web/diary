# Product Requirements Document: Baby Diary (우리 아기 일기)

## 1. Product Overview

Baby Diary is a Progressive Web App (PWA) for recording and sharing daily baby growth moments. It provides a warm, family-friendly interface for parents to write diary entries with photos, and allows family members to view entries and leave comments.

## 2. Target Users

- **Primary**: Parents (admin users) who write and manage diary entries
- **Secondary**: Family members and friends who view entries and leave comments

## 3. Core Features

### 3.1 Home Page (/)
- Hero section with baby photo and app title "우리 아기 일기"
- Grid of 6 most recent diary entries with thumbnails
- List of 10 most recent comments
- Call-to-action button "일기 보러가기" linking to diary list

### 3.2 Authentication (/login)
- Google OAuth sign-in
- Email/password sign-in and sign-up
- Sign-up requires: name, email, password (min 6 chars)
- Automatic redirect to home after successful login
- Error display for failed authentication attempts
- Role-based access: admin users determined by ADMIN_EMAILS env variable

### 3.3 Diary List (/diary)
- Paginated diary entry list (20 per page)
- Entries grouped by month (yyyy년 M월)
- Each entry shows: thumbnail, date, title, content preview
- "더 보기" (Load more) button for pagination
- Empty state with link to write first diary
- Click entry to navigate to detail page

### 3.4 Diary Detail (/diary?date=YYYY-MM-DD)
- Full diary entry display: date, title, content
- Photo gallery with grid layout
- Photo lightbox with:
  - Arrow navigation (keyboard + click)
  - Touch swipe support on mobile
  - ESC to close
  - Dot indicators for photo position
- Comment section (visible to all, posting requires login)
- Admin controls: Edit and Delete buttons
- Delete confirmation dialog
- "목록으로" (Back to list) navigation

### 3.5 Write New Diary (/write) - Admin Only
- Protected by AuthGuard (login required + admin check)
- Date picker (defaults to today)
- Optional title field
- Content textarea (required)
- Photo upload (max 10 photos)
- Photo preview grid with remove button
- Built-in photo editor/decorator ("꾸미기")
- Duplicate date check before saving
- Submit saves to Firebase Firestore + Storage
- Redirects to diary detail after save

### 3.6 Edit Diary (/write?date=YYYY-MM-DD) - Admin Only
- Pre-fills form with existing diary data
- Same features as write form
- Can add/remove photos
- Updates existing entry in Firebase

### 3.7 PDF Export (/export) - Admin Only
- Date range selection (start date, end date)
- Validation: both dates required, start <= end
- Generates A5 PDF with:
  - Cover page with title and date range
  - Photo pages with images
  - Text pages with date, title, content
  - Korean font support (NotoSansKR)
- Progress bar during generation
- Downloads as: 육아일기_{startDate}_{endDate}.pdf

### 3.8 Navigation
- Sticky header with backdrop blur
- Desktop: horizontal nav links
- Mobile: hamburger menu with backdrop overlay
- Dynamic links based on auth state:
  - Not logged in: 일기 목록, 로그인
  - Logged in (non-admin): 일기 목록, 로그아웃
  - Logged in (admin): 일기 목록, 글쓰기, 내보내기, 로그아웃

## 4. Technical Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React 19, Tailwind CSS 4
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **PDF**: jsPDF with dynamic import
- **Font**: Noto Serif KR (app), NotoSansKR (PDF)
- **PWA**: Service Worker, manifest.json
- **Language**: TypeScript

## 5. Non-Functional Requirements

- **PWA Support**: Installable on mobile devices
- **Performance**: Lazy loading images, dynamic imports, memo components
- **Responsive**: Mobile-first with sm breakpoint adaptations
- **Korean Language**: Full Korean UI with Korean date formatting (date-fns/locale/ko)
- **Accessibility**: aria-labels, role attributes, keyboard navigation in lightbox
