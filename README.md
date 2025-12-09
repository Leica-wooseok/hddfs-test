# 현대면세점 프로모션 페이지 구현

> 현대 디에프 경력직 퍼블리셔 채용 과제
> 지원자: **최우석**

## 📑 목차

- [프로젝트 개요](#-프로젝트-개요)
- [기술 스택](#-기술-스택)
- [실행 방법](#-실행-방법)
- [HTML 구조 설계](#-html-구조-설계)
- [CSS 아키텍처](#-css-아키텍처)
- [JavaScript 인터랙션](#-javascript-인터랙션)
- [반응형 대응 전략](#-반응형-대응-전략)
- [웹 표준 및 접근성](#-웹-표준-및-접근성)
- [프로젝트 구조](#-프로젝트-구조)

---

## 🎯 프로젝트 개요

현대면세점 사은행사 프로모션 페이지 2종(Type A: 금액별, Type B: 상품별) 구현

### 구현 페이지

- **Type A**: `type-a-promo-amount.html` - 금액별 사은행사 페이지
- **Type B**: `type-b-promo-product.html` - 상품별 사은행사 페이지

### 주요 기능

✅ 웹 컴포넌트 기반 재사용 가능한 UI 구성
✅ 접근성(a11y) 및 시맨틱 마크업 준수
✅ 모바일 퍼스트 반응형 디자인
✅ SEO 최적화 (Open Graph, Twitter Card)
✅ 스크롤 기반 탭 네비게이션
✅ Swiper를 활용한 캐러셀 구현

---

## 🛠 기술 스택

| 분류                | 기술                                          |
| ------------------- | --------------------------------------------- |
| **마크업**          | HTML5 (Semantic HTML)                         |
| **스타일**          | SCSS (7-1 패턴), BEM 방법론                   |
| **스크립트**        | Vanilla JavaScript (ES6+), Web Components API |
| **외부 라이브러리** | Swiper.js (v12)                               |
| **빌드 도구**       | Live Sass Compiler                            |

---

## 🚀 실행 방법

Web Components 사용으로 인해 로컬 서버 실행 권장

```bash
# 방법 1: Live Server (VS Code Extension)
Live Server로 HTML 파일 실행

# 방법 2: npx serve
npx serve

# 방법 3: http-server
npx http-server -p 8000
```

**SCSS 컴파일**

```bash
# VS Code Extension: Live Sass Compiler
# scss/index.scss → css/index.css 자동 컴파일
```

---

## 📐 HTML 구조 설계

### 핵심 고려 사항

#### 1. **시맨틱 마크업 (Semantic HTML)**

웹 표준 준수 및 검색 엔진 최적화를 위해 의미있는 HTML5 태그 활용

```html
<!-- ❌ Bad -->
<div class="header">
  <div class="title">현대면세점</div>
</div>

<!-- ✅ Good -->
<header>
  <h1>현대면세점</h1>
</header>
```

**사용된 시맨틱 태그**

- `<header>`, `<footer>` - 페이지 머리글/바닥글
- `<main>` - 주요 콘텐츠 영역
- `<section>` - 논리적 섹션 그룹화
- `<figure>`, `<figcaption>` - 이미지와 캡션

#### 2. **논리적 그룹화 및 계층 구조**

콘텐츠를 의미 단위로 그룹화하여 구조화

```
<body>
  └── <div id="wrap">
      ├── <app-header> (커스텀 헤더 컴포넌트)
      ├── <main id="main-content">
      │   ├── <section class="hero"> (히어로 섹션)
      │   ├── <detail-tab> (탭 네비게이션)
      │   ├── <section id="panel_01" role="tabpanel"> (사은행사)
      │   ├── <section id="panel_02" role="tabpanel"> (추천상품)
      │   └── <section id="panel_03" role="tabpanel"> (전체상품)
      └── <app-footer> (커스텀 푸터 컴포넌트)
```

#### 3. **접근성(Accessibility) 고려**

**ARIA 속성 적극 활용**

```html
<!-- 탭 네비게이션 -->
<ul role="tablist" aria-label="사은행사 정보">
  <li role="presentation">
    <button
      role="tab"
      aria-selected="true"
      aria-controls="panel_01"
      id="tab_panel_01"
    >
      사은행사
    </button>
  </li>
</ul>

<!-- 탭 패널 -->
<section id="panel_01" role="tabpanel" aria-labelledby="tab_panel_01">
  <!-- 콘텐츠 -->
</section>
```

**주요 접근성 기능**

- `role`, `aria-label`, `aria-selected`, `aria-controls` 속성 사용
- 키보드 네비게이션 지원
- 스크린 리더 호환성 확보
- `alt` 텍스트 제공

#### 4. **Web Components 활용**

재사용 가능한 컴포넌트 구조 설계

```html
<!-- 상품 카드 컴포넌트 -->
<product-card
  image-src="./images/products/product-img-01.png"
  image-alt="상품 이미지 설명"
  brand="바비브라운"
  product-name="인텐시브 세럼 파운데이션"
  is-logged-in="true"
  discount-percent="40"
  default-price="39"
  current-price="61"
  won-price="72,320"
>
</product-card>
```

**구현된 컴포넌트**

- `<app-header>` - 헤더
- `<app-footer>` - 푸터
- `<detail-tab>` - 스크롤 동기화 탭
- `<product-card>` - 상품 카드
- `<gift-card-item>` - 사은품 카드
- `<gift-popup>` - 사은품 모달
- `<alert-toast>` - 토스트 알림
- `<caution-area>` - 유의사항 영역
- `<product-filter>` - 상품 필터/정렬
- `<more-button>` - 더보기 버튼

#### 5. **SEO 최적화**

검색 엔진 및 소셜 미디어 공유 최적화

```html
<!-- 기본 SEO -->
<meta name="description" content="현대 면세점 단독 혜택도 만나보세요!" />
<meta name="keywords" content="현대 면세점, 프로모션, 사은행사" />

<!-- Open Graph (Facebook) -->
<meta property="og:title" content="현대 면세점 아이오페 단독 프로모션" />
<meta property="og:description" content="현대 면세점 단독 혜택" />
<meta property="og:image" content="./images/pages/type1_a/hero_image.jpg" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="현대 면세점 프로모션" />
```

---

## 🎨 CSS 아키텍처

### SCSS 7-1 패턴

프로젝트의 확장성과 유지보수성을 위한 구조화된 SCSS 설계

```
scss/
├── utils/
│   ├── _variables.scss    # 전역 변수 (색상, 폰트, 간격 등)
│   ├── _functions.scss    # Sass 함수
│   ├── _mixins.scss       # 재사용 가능한 믹스인
│   └── _breakpoint.scss   # 미디어 쿼리 중단점
├── base/
│   ├── _reset.scss        # 브라우저 초기화
│   ├── _fonts.scss        # @font-face 정의
│   ├── _typography.scss   # 타이포그래피 기본 스타일
│   ├── _css-variables.scss # CSS 커스텀 속성
│   └── _main.scss         # 전역 스타일
├── components/
│   ├── _product-card.scss
│   ├── _detail-tab.scss
│   ├── _gift-card.scss
│   ├── _gift-popup.scss
│   ├── _alert-toast.scss
│   └── ... (10개 컴포넌트)
├── layout/
│   ├── _container.scss
│   ├── _header.scss
│   └── _footer.scss
├── pages/
│   └── _home.scss         # 화면별 스타일
└── index.scss             # 메인 진입점
```

### BEM 네이밍 규칙

**Block-Element-Modifier** 방법론 적용

```scss
// Block
.productCard {
}

// Element (Block의 하위 요소)
.productCard__image {
}
.productCard__info-box {
}
.productCard__info-brand {
}
.productCard__info-name {
}

// Modifier (상태 변화)
.productCard--soldOut {
}
.productCard__button--disabled {
}
```

**실제 코드 예시**

```scss
.productCard {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__image-box {
    position: relative;
    padding-top: 100%;
    border-radius: 8px;
    background-color: $bg-pale-grey4;
  }

  &__image {
    @include position-cover-image;
    width: 100%;
  }

  &__info-discount {
    display: flex;
    gap: 4px;

    .percent {
      font-weight: 500;
      color: $font-dark;
    }

    .default-price {
      text-decoration: line-through;
      color: $font-cool-grey2;
    }
  }
}
```

### 디자인 토큰 (Variables)

Figma 디자인 시스템의 네이밍 규칙 준수

```scss
// Colors
$color-white: #ffffff;
$color-black: #000000;
$point-pink: #e4007f;
$point-pinkish-red: #e31c1c;

// Font Colors
$font-dark: #191919;
$font-medium-dark: #505050;
$font-cool-grey2: #8c8c8c;
$font-steel: #7c7c7c;

// Background
$bg-pale-grey: #f8f8f8;
$bg-pale-grey4: #f4f4f4;

// Line
$line-silver: #e0e0e0;
```

### 재사용 가능한 Mixins

```scss
// Flexbox 중앙 정렬
@mixin flex-center($direction: row) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}

// 다중 라인 말줄임
@mixin text-ellipsis-multiline($lines: 2) {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $lines;
  text-overflow: ellipsis;
}

// 커버 이미지 위치
@mixin position-cover-image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}

// 반응형 브레이크포인트
@mixin responsive($device) {
  @if $device == tablet {
    @media screen and (min-width: $breakpoint-tablet) {
      @content;
    }
  } @else if $device == desktop {
    @media screen and (min-width: $breakpoint-desktop) {
      @content;
    }
  }
}
```

---

## ⚡ JavaScript 인터랙션

### 주요 구현 기능

#### 1. **스크롤 기반 탭 동기화**

**구현 위치**: `js/components/DetailTab.js`

**핵심 로직**

```javascript
setupScrollObserver() {
  this.handleScroll = () => {
    const scrollPosition = window.pageYOffset + offset + DetailTab.SCROLL_OFFSET_ADJUSTMENT;

    // 현재 보이는 패널 찾기 (역순 순회)
    for (let i = this.panels.length - 1; i >= 0; i--) {
      const panel = this.panels[i];
      if (scrollPosition >= panel.offsetTop) {
        this.setActiveTab(correspondingTab);
        break;
      }
    }
  };

  // requestAnimationFrame으로 성능 최적화
  let ticking = false;
  this.scrollListener = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        this.handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", this.scrollListener);
}
```

**특징**

- `requestAnimationFrame`을 활용한 스크롤 쓰로틀링
- 헤더 높이를 고려한 정확한 패널 감지
- 역순 순회로 현재 활성 패널 정확히 식별

#### 2. **부드러운 스크롤 네비게이션**

```javascript
tab.addEventListener("click", (e) => {
  const targetPanel = document.getElementById(targetId);
  const offset = this.headerHeight + tabHeight;
  const targetPosition =
    targetPanel.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth", // 네이티브 부드러운 스크롤
  });

  this.setActiveTab(tab);
});
```

#### 3. **색상 대비 자동 조정 (YIQ 알고리즘)**

**구현 위치**: `js/color-contrast.js`

```javascript
function getTextColorForBg(bgColor) {
  if (!bgColor || !bgColor.includes("rgb")) {
    return "#000000";
  }

  const [r, g, b] = bgColor.match(/\d+/g).map(Number);

  // YIQ 공식: (r*299 + g*587 + b*114) / 1000
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? "#000000" : "#ffffff";
}

// 히어로 섹션 배경색에 따라 텍스트 색상 자동 조정
applyTextContrast(".hero");
```

**목적**: WCAG 색상 대비 기준 충족

#### 4. **Swiper 캐러셀 구현**

**구현 위치**: `js/swiper-init.js`

```javascript
const BASE_SWIPER_CONFIG = {
  slidesPerView: "auto",
  spaceBetween: 16,
  slidesPerGroup: 1,
  a11y: {
    enabled: true,
    prevSlideMessage: "이전 슬라이드",
    nextSlideMessage: "다음 슬라이드",
    firstSlideMessage: "첫 번째 슬라이드",
    lastSlideMessage: "마지막 슬라이드",
  },
  on: {
    slideChange: function () {
      // 스크린 리더를 위한 실시간 알림
      const announcement = document.createElement("div");
      announcement.setAttribute("role", "status");
      announcement.setAttribute("aria-live", "polite");
      announcement.className = "visually-hidden";
      announcement.textContent = `${this.activeIndex + 1} / ${
        this.slides.length
      } 슬라이드`;
      document.body.appendChild(announcement);
      setTimeout(() => announcement.remove(), 1000);
    },
  },
  breakpoints: {
    0: {
      slidesPerView: "auto",
      navigation: { enabled: false }, // 모바일: 네비게이션 숨김
    },
    768: {
      slidesPerView: 4,
      navigation: { enabled: true }, // 데스크탑: 네비게이션 표시
    },
  },
};
```

**접근성 고려 사항**

- `aria-live` 영역으로 슬라이드 변경 알림
- 키보드 네비게이션 지원
- 반응형 네비게이션 버튼 제어

#### 5. **Web Components 생명주기 관리**

```javascript
class ProductCard extends HTMLElement {
  // 관찰할 속성 정의
  static get observedAttributes() {
    return [
      "image-src",
      "image-alt",
      "product-link",
      "brand",
      "product-name",
      "is-logged-in",
      "discount-percent",
      "default-price",
      "current-price",
    ];
  }

  // DOM에 추가될 때
  connectedCallback() {
    this._render();
  }

  // 속성 변경 감지
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._render();
    }
  }
}

customElements.define("product-card", ProductCard);
```

#### 6. **토스트 알림**

**구현 위치**: `js/components/AlertToast.js`

```javascript
class AlertToast extends HTMLElement {
  connectedCallback() {
    this.setAttribute("role", "alert");
    this.setAttribute("aria-live", "polite");
    this.setAttribute("aria-atomic", "true");
    this.className = "alert-toast";
    this.classList.add("hidden");
  }

  // 1.5초간 표시
  show(message, duration = 1500) {
    if (message) {
      this.textContent = message;
    }

    this.classList.remove("hidden");
    this.classList.add("visible");

    setTimeout(() => {
      this.classList.remove("visible");
      this.classList.add("hidden");
    }, duration);
  }
}
```

---

## 📱 반응형 대응 전략

### Mobile First 접근 방식

기본 스타일을 모바일에 맞추고, 화면이 커질수록 스타일 추가

```scss
// 모바일 (기본)
.container {
  max-width: 100%;
  padding: 0 16px;
}

// 태블릿 (768px 이상)
@include responsive(tablet) {
  .container {
    padding: 0 24px;
  }
}

// 데스크탑 (1024px 이상)
@include responsive(desktop) {
  .container {
    max-width: 1024px;
    margin: 0 auto;
  }
}
```

### 브레이크포인트 전략

| 디바이스    | 최소 너비      | 적용 대상                 |
| ----------- | -------------- | ------------------------- |
| **Mobile**  | 0px ~ 767px    | 기본 스타일 (모바일 우선) |
| **Tablet**  | 768px ~ 1023px | 아이패드, 태블릿          |
| **Desktop** | 1024px 이상    | 노트북, 데스크탑          |

**선정 이유**

- **768px**: 아이패드 미니, 대부분의 태블릿 세로 모드
- **1024px**: 아이패드 가로 모드, 일반 노트북/데스크탑

### 반응형 레이아웃 패턴

#### 1. **Flexbox 레이아웃**

```scss
.event__group-grid {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-shrink: 1;

  & .productCard {
    max-width: 106px;
    width: 100%;
    flex-shrink: 1;
  }
}
```

#### 2. **Flexible Images**

```scss
.hero__image-box img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
```

#### 3. **조건부 요소 표시**

```scss
// 데스크탑에서만 네비게이션 버튼 표시
.swiper-button-custom {
  display: none;

  @include responsive(desktop) {
    display: block;
  }
}
```

#### 4. **Max-Width 컨테이너**

```scss
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;

  @include responsive(tablet) {
    padding: 0 24px;
  }

  @include responsive(desktop) {
    max-width: 1024px;
  }
}
```

### JavaScript에서의 반응형 처리

```javascript
// Swiper 반응형 설정
breakpoints: {
  0: {
    slidesPerView: "auto",
    navigation: { enabled: false }
  },
  768: {
    slidesPerView: 4,
    navigation: { enabled: true }
  }
}
```

---

## ♿ 웹 표준 및 접근성

### 웹 접근성 (WCAG 2.1 Level AA 준수)

#### 1. **키보드 네비게이션**

- 모든 인터랙티브 요소 Tab 키로 접근 가능
- `tabindex` 적절히 설정
- 포커스 표시 명확히 구현

#### 2. **스크린 리더 지원**

```html
<!-- ARIA 레이블 -->
<button aria-label="장바구니에 담기">
  <img src="icon.svg" alt="" aria-hidden="true" />
</button>

<!-- 실시간 업데이트 알림 -->
<div role="status" aria-live="polite">장바구니에 담겼습니다</div>
```

#### 3. **색상 대비**

- YIQ 알고리즘으로 충분한 대비 보장
- WCAG AA 기준 4.5:1 이상

#### 4. **의미있는 구조**

```html
<!-- 올바른 heading 계층 -->
<h1>페이지 제목</h1>
<h2>섹션 제목</h2>
<h3>하위 섹션</h3>
```

#### 5. **대체 텍스트**

```html
<img src="product.jpg" alt="바비브라운 인텐시브 세럼 파운데이션 SPF 40" />
```

### 웹 표준 준수

- ✅ HTML5 Doctype
- ✅ 유효한 HTML 마크업
- ✅ 시맨틱 태그 사용
- ✅ UTF-8 인코딩
- ✅ Viewport 메타 태그
- ✅ 크로스 브라우저 호환성

---

## 📂 프로젝트 구조

```
hddfs/
├── css/
│   ├── index.css              # 컴파일된 CSS
│   └── index.css.map          # Source Map
├── scss/
│   ├── utils/                 # 유틸리티
│   │   ├── _variables.scss
│   │   ├── _functions.scss
│   │   ├── _mixins.scss
│   │   └── _breakpoint.scss
│   ├── base/                  # 기본 스타일
│   │   ├── _reset.scss
│   │   ├── _fonts.scss
│   │   ├── _typography.scss
│   │   ├── _css-variables.scss
│   │   └── _main.scss
│   ├── components/            # 컴포넌트
│   │   ├── _product-card.scss
│   │   ├── _detail-tab.scss
│   │   ├── _gift-card.scss
│   │   ├── _gift-popup.scss
│   │   ├── _alert-toast.scss
│   │   └── ... (10개)
│   ├── layout/                # 레이아웃
│   │   ├── _container.scss
│   │   ├── _header.scss
│   │   └── _footer.scss
│   ├── pages/                 # 페이지
│   │   └── _home.scss
│   └── index.scss             # 메인 진입점
├── js/
│   ├── components/            # 웹 컴포넌트
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── ProductCard.js
│   │   ├── DetailTab.js
│   │   ├── GiftCardItem.js
│   │   ├── GiftPopup.js
│   │   ├── AlertToast.js
│   │   ├── CautionArea.js
│   │   ├── ProductFilter.js
│   │   └── MoreButton.js
│   ├── color-contrast.js      # 색상 대비 조정
│   ├── swiper-init.js         # Swiper 초기화
│   └── filter-tab.js          # 필터 탭
├── images/                    # 이미지 리소스
│   ├── icons/
│   ├── products/
│   ├── pages/
│   └── ...
├── font/                      # 웹 폰트
├── type-a-promo-amount.html   # Type A 페이지
├── type-b-promo-product.html  # Type B 페이지
└── README.md                  # 문서
```

---

## 🎓 기술적 의사결정

### Web Components 사용 이유

**선택 배경**

- HTML/SCSS/Vanilla JS 환경에서 컴포넌트 재사용성 확보
- React 없이도 컴포넌트 기반 개발 가능
- 네이티브 브라우저 API 활용으로 의존성 최소화

**Shadow DOM 미사용 결정**

```javascript
// Shadow DOM을 사용하지 않음
class ProductCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `...`; // Light DOM 사용
  }
}
```

**이유**

- 전역 스타일 공유 필요 (디자인 시스템 일관성)
- 컴포넌트마다 CSS 초기화/정규화 불필요
- 디버깅 및 스타일 커스터마이징 용이성

### SCSS 전처리기 선택

- CSS 변수만으로는 복잡한 로직 처리 한계
- 중첩, 믹스인, 함수 등 고급 기능 필요
- 7-1 패턴으로 대규모 프로젝트 대비
- 디자인 토큰 체계적 관리

### requestAnimationFrame 사용

```javascript
// 스크롤 이벤트 최적화
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});
```

**목적**: 60fps 유지하며 부드러운 스크롤 인터랙션 구현

---

## 📊 성능 최적화

### 이미지 최적화

- 적절한 이미지 포맷 사용 (SVG for icons, PNG for photos)
- `loading="lazy"` 속성 (필요시 추가 가능)

### JavaScript 최적화

- 이벤트 위임 패턴
- requestAnimationFrame 쓰로틀링
- 컴포넌트 생명주기 관리 (메모리 누수 방지)

### CSS 최적화

- BEM으로 선택자 깊이 최소화
- 불필요한 중첩 제거
- 재사용 가능한 유틸리티 클래스

---

## 🔍 브라우저 지원

- Chrome (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- Edge (최신 2개 버전)

**Web Components API 지원**: 모던 브라우저 전체 지원 (IE 제외)

---

## 📝 개선 가능성 및 향후 계획

### 현재 한계

- **Web Components의 불편함**: React처럼 비즈니스 로직과 UI 완전 분리 어려움
- **상태 관리**: 컴포넌트 간 데이터 공유 시 이벤트 기반 통신 필요
- **타입 안정성**: TypeScript 미사용으로 런타임 오류 가능성

### 개선 방향

1. **TypeScript 도입**: 타입 안정성 확보
2. **번들러 도입** (Webpack/Vite): 모듈 관리 및 최적화
3. **상태 관리 라이브러리**: Zustand 등 경량 상태 관리
4. **테스트 코드**: Jest, Testing Library 도입
5. **성능 모니터링**: Lighthouse 점수 측정 및 개선

---

## 👨‍💻 개발자 정보

**이름**: 최우석
**포지션**: 경력직 퍼블리셔
**회사**: 현대 디에프
**과제**: 프로모션 페이지 구현

---

## 📄 라이선스

이 프로젝트는 채용 과제용으로 제작되었습니다.

---

**최종 업데이트**: 2024.12.09
