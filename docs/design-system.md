# 🎨 탑툰챗 디자인 시스템 가이드 v2

모든 값은 `theme.css`의 CSS 변수를 단일 원본(Single Source of Truth)으로 사용합니다.

> **테마:** 다크 테마 전용 (라이트 테마 미지원). 향후 확장 시 `prefers-color-scheme` 기반 분기 예정.

---

## 1. Foundations (기초 요소)

### 1.1 Color (색상)

상태 변화(Hover, Active)는 별도 색상 대신 **Opacity 오버레이** 방식을 권장합니다.

#### Background (배경)

| Token | Value | 용도 |
| :--- | :--- | :--- |
| `--color-bg-primary` | #0F0F0F | 페이지 배경 |
| `--color-bg-secondary` | #1A1A1A | 카드, 섹션 배경 |
| `--color-bg-tertiary` | #2A2A2A | 입력 필드, 필터 탭 |
| `--color-bg-elevated` | #333333 | 드롭다운 메뉴, 모달 |

#### Text (텍스트)

| Token | Value | 용도 |
| :--- | :--- | :--- |
| `--color-text-primary` | #FFFFFF | 제목, 캐릭터 이름 |
| `--color-text-secondary` | rgba(255,255,255,0.55) | 대사 프리뷰, 서브카피 |
| `--color-text-tertiary` | rgba(255,255,255,0.35) | 수치, 캡션 |
| `--color-text-disabled` | rgba(255,255,255,0.2) | 비활성 텍스트 |

#### Common (공통)

| Token | Value | 용도 |
| :--- | :--- | :--- |
| `--color-common-white` | #FFFFFF | 버튼 레이블 등 고정 흰색 |
| `--color-common-black` | #000000 | 오버레이 베이스 |

#### Brand (브랜드)

| Token | Value | 용도 |
| :--- | :--- | :--- |
| `--color-brand-primary` | #EE2C39 | CTA 버튼, 활성 탭 |
| `--color-brand-secondary` | #D42531 | hover 상태 |
| `--color-brand-primary-hover` | rgba(238,44,57,0.08) | 사이드바 활성 배경 |

#### Accent (강조)

| Token | Value | 용도 |
| :--- | :--- | :--- |
| `--color-accent-new` | #EE2C39 | NEW 뱃지 *(추후 brand와 분리 예정)* |
| `--color-accent-live` | #E24B4A | 실시간 인디케이터 |
| `--color-accent-coin` | #FFD700 | 코인 아이콘 |
| `--color-accent-promo` | #F05255 | 프로모션 강조 |

#### Semantic (시맨틱)

| Token | Value | 용도 |
| :--- | :--- | :--- |
| `--color-success` | #4CAF50 | 성공 |
| `--color-warning` | #FF9800 | 경고 |
| `--color-error` | #EE2C39 | 에러 |

#### Border (테두리)

| Token | Value | 용도 |
| :--- | :--- | :--- |
| `--color-border-default` | rgba(255,255,255,0.08) | 카드, 구분선 |
| `--color-border-hover` | rgba(255,255,255,0.15) | 호버 강조 |
| `--color-border-active` | #EE2C39 | 포커스, 선택 |

#### Tag (태그)

| Token | Value | 용도 |
| :--- | :--- | :--- |
| `--color-tag-bg` | rgba(255,255,255,0.08) | 해시태그 배경 |
| `--color-tag-text` | rgba(255,255,255,0.6) | 해시태그 텍스트 |

---

### 1.2 Typography (타이포그래피)

**Font Family:** `--font-family-base` (Pretendard Variable)

> **반응형 처리:** Mobile-first로 정의하며, `≥1024px` 미디어쿼리에서 Desktop 값으로 오버라이드합니다.
> (`theme.css` 하단 `@media (min-width: 1024px)` 블록 참조)

| Style | Token | Mobile | Desktop | Weight | Line-height | 용도 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Display | `--font-size-display` | 28px | 38px | Bold (700) | 1.2 | 배너 메인 타이틀 |
| Heading | `--font-size-heading` | 16px | 18px | Bold (700) | 1.4 | 섹션 타이틀 |
| Title | `--font-size-title` | 14px | 16px | SemiBold (600) | 1.5 | 캐릭터 이름, 버튼 |
| Body | `--font-size-body` | 14px | 16px | Regular (400) | 1.5 | 대사 프리뷰 |
| Body SM | `--font-size-body-sm` | 13px | 13px | Regular (400) | 1.5 | 보조 본문 |
| Caption | `--font-size-caption` | 12px | 13px | Regular (400) | 1.4 | 조회수, 지표 |
| Micro | `--font-size-micro` | 11px | 12px | Regular (400) | 1.3 | 해시태그, 뱃지 |

---

### 1.3 Grid & Spacing (그리드 및 간격)

#### Breakpoints

| 구간 | 너비 | 카드 열 | 사이드바 | 패딩 |
| :--- | :--- | :--- | :--- | :--- |
| Mobile | ~767px | 2열 | 없음 (하단 탭바) | 16px |
| Tablet | 768~1023px | 3열 | 축소 (`--sidebar-width-collapsed` 64px) | 20px |
| Desktop | 1024px~ | 4~6열 | 확장 (`--sidebar-width` 240px) | 24px |

#### Grid Gap

| Token | Value | 용도 |
| :--- | :--- | :--- |
| `--grid-gap-mobile` | 12px | 모바일 카드 그리드 갭 |
| `--grid-gap-desktop` | 16px | 태블릿/데스크탑 카드 그리드 갭 |

#### Spacing

| Token | Value | 용도 |
| :--- | :--- | :--- |
| `--spacing-xs` | 4px | 아이콘-텍스트, 태그 내부 |
| `--spacing-sm` | 8px | 카드 내부, 뱃지 패딩 |
| `--spacing-md` | 12px | 카드 간 갭, 그리드 갭 |
| `--spacing-lg` | 16px | 섹션 내부 패딩 |
| `--spacing-xl` | 24px | 섹션 간 간격 |
| `--spacing-2xl` | 32px | 대섹션 구분 |

#### Border Radius

| Token | Value | 용도 |
| :--- | :--- | :--- |
| `--radius-sm` | 4px | 뱃지, 태그 |
| `--radius-md` | 8px | 버튼, 인풋 |
| `--radius-lg` | 12px | 카드 |
| `--radius-xl` | 16px | 모달, 바텀시트 |
| `--radius-full` | 9999px | 아바타, pill 버튼 |

#### Layout

| Token | Value | 용도 |
| :--- | :--- | :--- |
| `--sidebar-width` | 240px | 데스크탑 사이드바 확장 |
| `--sidebar-width-collapsed` | 64px | 태블릿 사이드바 축소 |
| `--tabbar-height` | 56px | 모바일 하단 탭바 |
| `--header-height` | 56px | 상단 헤더 |

#### Elevation & Z-index

| Token | Value | 용도 |
| :--- | :--- | :--- |
| `--shadow-md` | 0 4px 12px rgba(0,0,0,0.3) | 드롭다운, 모달 그림자 |
| `--z-dropdown` | 100 | 드롭다운 |
| `--z-sticky` | 200 | 고정 헤더 |
| `--z-modal` | 1000 | 모달, 바텀시트 |
| `--z-toast` | 1100 | 토스트 알림 |

#### Transition

| Token | Value | 용도 |
| :--- | :--- | :--- |
| `--transition-fast` | 150ms ease | 호버, 토글 |
| `--transition-normal` | 250ms ease | 패널 열기/닫기 |
| `--transition-slow` | 400ms ease | 페이지 전환 |

---

## 2. Components (컴포넌트)

### 2.1 Button (버튼)

| Type | Background | Text | Radius | 용도 |
| :--- | :--- | :--- | :--- | :--- |
| Primary | `--color-brand-primary` | `--color-common-white` | `--radius-md` | "대화 시작하기" CTA |
| Secondary | `--color-bg-tertiary` | `--color-text-primary` | `--radius-md` | 보조 액션 |
| Ghost | transparent | `--color-text-secondary` | `--radius-md` | "더보기" |
| Pill (비활성) | `--color-bg-tertiary` | `--color-text-secondary` | `--radius-full` | 장르 필터 |
| Pill (활성) | `--color-text-primary` | `--color-bg-primary` | `--radius-full` | 선택된 필터 |

**Sizes:** Large (48px), Medium (40px), Small (32px)

**Interaction:**

| 상태 | 처리 | 구현 |
| :--- | :--- | :--- |
| Hover | 밝기 +10% | `filter: brightness(1.1)` |
| Active | 살짝 축소 | `transform: scale(0.98)` |
| Disabled | 반투명 | `opacity: 0.4; pointer-events: none` |
| Transition | | `transition: var(--transition-fast)` |

---

### 2.2 Section Header (섹션 헤더)

구조: `[타이틀 + 이모지]  [서브카피] ......... [실시간 지표]`

| 요소 | Style | Color | 예시 |
| :--- | :--- | :--- | :--- |
| 타이틀 | Heading, Bold | `--color-text-primary` | "인기 캐릭터 🔥" |
| 서브카피 | Caption | `--color-text-secondary` | "지금까지 **14,242번**의 화끈한 대화가 오갔어요" |
| 실시간 지표 | Caption | `--color-text-secondary` | "🔴 지금 **1,247명**이 빠져드는 중" |
| 강조 숫자 | Caption, Medium | `--color-text-primary` | "14,242번", "1,247명" |

---

### 2.3 Card (캐릭터 카드)

| 속성 | 값 |
| :--- | :--- |
| Background | `--color-bg-secondary` |
| Radius | `--radius-lg` |
| Border | `--color-border-default` |
| 썸네일 비율 | 3:4 (`aspect-ratio: 3/4`) |
| 내부 패딩 | `--spacing-sm` `--spacing-md` |

**Variants:**

| Variant | 구성 |
| :--- | :--- |
| 인기 | 이름(Title) + 대사(Body, 1줄 말줄임) + 수치(Caption) |
| 신규 | 인기 + NEW 뱃지(좌상단) + 해시태그(하단) |

**Interaction:**

| 상태 | 처리 |
| :--- | :--- |
| Hover | `border-color: var(--color-border-hover)` |
| Transition | `transition: var(--transition-fast)` |

**반응형 그리드:**

| 화면 | 열 수 | 갭 |
| :--- | :--- | :--- |
| Mobile | 2 | `--grid-gap-mobile` |
| Tablet | 3 | `--grid-gap-desktop` |
| Desktop | 4~6 | `--grid-gap-desktop` |

---

### 2.4 Badge (뱃지)

| Type | Background | Text | Radius | 용도 |
| :--- | :--- | :--- | :--- | :--- |
| NEW | `--color-accent-new` | `--color-common-white`, SemiBold | `--radius-sm` | 신규 캐릭터 |
| Live Dot | `--color-accent-live` | — | 50% (7×7px) | 실시간 지표 |
| Genre | `--color-bg-tertiary` | `--color-text-secondary` | `--radius-sm` | 장르 라벨 |
| Count | transparent | `--color-text-tertiary` | — | "👁 5.1만" 인라인 |

---

### 2.5 Tag (태그)

| 속성 | 값 |
| :--- | :--- |
| Background | `--color-tag-bg` |
| Text | `--color-tag-text`, Micro |
| Radius | `--radius-sm` |
| Padding | 3px 8px |
| 간격 | `--spacing-xs` |

---

### 2.6 Form / Input (입력 필드)

| 속성 | 값 |
| :--- | :--- |
| Background | `--color-bg-tertiary` |
| Text | `--color-text-primary` |
| Placeholder | `--color-text-tertiary` |
| Border | `--color-border-default` |
| Focus Border | `--color-border-active` |
| Radius | `--radius-md` |
| Height | 44px (Mobile) / 40px (Desktop) |
| Transition | `var(--transition-fast)` |

---

### 2.7 Dropdown (드롭다운)

| 속성 | 값 |
| :--- | :--- |
| 트리거 | Input과 동일 + chevron |
| 메뉴 배경 | `--color-bg-secondary` |
| 메뉴 Border | `--color-border-default` |
| 메뉴 Radius | `--radius-md` |
| 메뉴 Shadow | `--shadow-md` |
| 메뉴 z-index | `--z-dropdown` |
| 옵션 높이 | 40px |
| 옵션 Hover | `--color-bg-tertiary` |

---

### 2.8 Banner / Carousel (배너 캐러셀)

| 속성 | 값 |
| :--- | :--- |
| 배경 | 이미지 풀블리드 |
| 높이 (Mobile) | 200px |
| 높이 (Desktop) | 320px |
| Radius | `--radius-lg` |
| 인디케이터 | dot, 8px, 활성 `--color-common-white`, 비활성 `rgba(255,255,255,0.35)` |
| 자동 전환 | 4초 |
| 전환 애니메이션 | slide, `var(--transition-slow)` |
| 오버레이 | 하단 그라디언트 `rgba(0,0,0,0) → rgba(0,0,0,0.6)` |
| 타이틀 | Display, Bold, `--color-common-white` |
| 서브타이틀 | Body, `--color-text-secondary` |

---

### 2.9 Search Bar (검색 바)

| 속성 | 값 |
| :--- | :--- |
| 트리거 | 헤더 내 아이콘 + 단축키 힌트 (`⌘K` / `Ctrl+K`) |
| 모달 배경 | `--color-bg-elevated` |
| Input | Form/Input 스펙과 동일 |
| 결과 리스트 | Dropdown 옵션과 동일 |
| z-index | `--z-modal` |
| Radius | `--radius-xl` |

---

### 2.10 Coin Display (코인 잔액)

| 속성 | 값 |
| :--- | :--- |
| 위치 | 헤더 우측 |
| 아이콘 색상 | `--color-accent-coin` |
| 텍스트 | Title, SemiBold, `--color-text-primary` |
| 숫자 포맷 | 천 단위 콤마 (`21,150`) |

---

### 2.11 Chat History Item (최근 대화 리스트)

사이드바 하단에 표시되는 최근 대화 목록 아이템입니다.

| 속성 | 값 |
| :--- | :--- |
| 아바타 | 40×40px, `--radius-full` |
| 이름 | Title, SemiBold, `--color-text-primary`, 1줄 말줄임 |
| 프리뷰 | Caption, `--color-text-secondary`, 1줄 말줄임 |
| 높이 | 56px |
| 패딩 | `--spacing-sm` `--spacing-md` |
| Hover | `--color-bg-tertiary` |

---

### 2.12 Genre Filter (장르 필터 탭)

탐색 섹션 상단의 가로 스크롤 필터 그룹입니다.

| 속성 | 값 |
| :--- | :--- |
| 컨테이너 | 가로 스크롤, `overflow-x: auto`, 스크롤바 숨김 |
| 아이템 | Pill 버튼 (2.1 참조) |
| 간격 | `--spacing-sm` |
| 고정 위치 | `position: sticky; top: var(--header-height)` |
| z-index | `--z-sticky` |

---

### 2.13 Navigation (네비게이션)

#### 사이드바 (Desktop, ≥1024px)

| 속성 | 값 |
| :--- | :--- |
| 너비 | `--sidebar-width` / `--sidebar-width-collapsed` |
| 배경 | `--color-bg-primary` |
| 보더 | `--color-border-default` (우측) |
| 아이템 높이 | 44px, `--radius-md` |
| 활성 | `--color-brand-primary` 텍스트 + `--color-brand-primary-hover` 배경 |
| 비활성 | `--color-text-tertiary` (아이콘), `--color-text-secondary` (텍스트) |
| Transition | `var(--transition-normal)` (축소/확장) |

메뉴: 홈 · 탐색 | 내 채팅 · 즐겨찾기 · 컬렉션 · 설정 | 탑툰 바로가기

#### 하단 탭바 (Mobile, <1024px)

| 속성 | 값 |
| :--- | :--- |
| 높이 | `--tabbar-height` + safe-area |
| 배경 | `--color-bg-primary` |
| 보더 | `--color-border-default` (상단) |
| 아이콘 | 24px / 활성 `--color-brand-primary`, 비활성 `--color-text-tertiary` |
| 라벨 | Caption / 아이콘과 동일 색상 |

탭: 홈 · 탐색 · 채팅 · 프로필

---

## 3. 토큰 파일 구조

| 파일 | 역할 | 수정 기준 |
| :--- | :--- | :--- |
| `theme.css` | CSS 변수 정의 (원본) | Figma 변수 변경 시 |
| `theme.js` | JS 토큰 참조용 | theme.css와 동기화 |
| `tailwind.config.js` | Tailwind ↔ CSS 변수 매핑 | 토큰 추가/삭제 시 |

---

