# 현대면세점 프로모션 페이지 구현

> 현대 디에프 경력직 퍼블리셔 채용 과제
> 지원자: **최우석**

## 📑 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택 및 실행 방법](#기술-스택-및-실행-방법)
- [HTML 구조 설계](#html-구조-설계)
- [CSS 아키텍처](#css-아키텍처)
- [JavaScript 인터랙션](#javascript-인터랙션)
- [반응형 대응 전략](#반응형-대응-전략)
- [웹 표준 및 접근성](#웹-표준-및-접근성)
- [기술적 의사결정](#기술적-의사결정)

---

## 🎯 프로젝트 개요

현대면세점 사은행사 프로모션 페이지 2종 구현

### 구현 페이지

- **Type A**: `type-a-promo-amount.html` - 금액별 사은행사
- **Type B**: `type-b-promo-product.html` - 상품별 사은행사

### 주요 기능

- 웹 컴포넌트 기반 재사용 가능한 UI 구성
- 접근성(WCAG 2.1 AA) 및 시맨틱 마크업 준수
- 모바일 퍼스트 반응형 디자인
- SEO 최적화 (Open Graph, Twitter Card)
- 스크롤 기반 탭 네비게이션
- Swiper 캐러셀 구현

---

## 🛠 기술 스택 및 실행 방법

### 기술 스택

| 분류           | 기술                                          |
| -------------- | --------------------------------------------- |
| **마크업**     | HTML5 (Semantic HTML)                         |
| **스타일**     | SCSS (7-1 패턴), BEM 방법론                   |
| **스크립트**   | Vanilla JavaScript (ES6+), Web Components API |
| **라이브러리** | Swiper.js (v12)                               |

### 실행 방법

```bash
# 로컬 서버 실행 (Web Components 사용)
npx serve
# 또는
Live Server (VS Code Extension)
```

---

## 📐 HTML 구조 설계

### 1. 시맨틱 마크업

의미있는 HTML5 태그로 구조화하여 SEO 및 접근성 향상

```html
<body>
  <div id="wrap">
    <app-header></app-header>
    <main id="main-content">
      <section class="hero"></section>
      <detail-tab></detail-tab>
      <section id="panel_01" role="tabpanel"></section>
    </main>
    <app-footer></app-footer>
  </div>
</body>
```

**사용 태그**: `<header>`, `<footer>`, `<main>`, `<section>`, `<figure>`, `<figcaption>`

### 2. ARIA 속성 활용

```html
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
```

### 3. Web Components

재사용 가능한 컴포넌트 10개 구현

```html
<product-card
  image-src="./images/products/product-img-01.png"
  brand="바비브라운"
  product-name="인텐시브 세럼 파운데이션"
  is-logged-in="true"
  discount-percent="40"
  current-price="61"
>
</product-card>
```

**구현 컴포넌트**: Header, Footer, DetailTab, ProductCard, GiftCardItem, GiftPopup, AlertToast, CautionArea, ProductFilter, MoreButton

### 4. SEO 최적화

```html
<meta name="description" content="현대 면세점 단독 혜택도 만나보세요!" />
<meta property="og:title" content="현대 면세점 아이오페 단독 프로모션" />
<meta property="og:image" content="./images/pages/type1_a/hero_image.jpg" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## 🎨 CSS 아키텍처

### SCSS 7-1 패턴

```
scss/
├── utils/      # 변수, 함수, 믹스인, 브레이크포인트
├── base/       # 리셋, 폰트, 타이포그래피
├── components/ # 10개 컴포넌트 스타일
├── layout/     # 컨테이너, 헤더, 푸터
├── pages/      # 페이지별 스타일
└── index.scss  # 메인 진입점
```

### BEM 네이밍 규칙

```scss
.productCard {
  &__image-box {
    position: relative;
    padding-top: 100%;
  }

  &__info-discount {
    display: flex;
    gap: 4px;

    .percent {
      color: $font-dark;
    }
  }
}
```

### 디자인 토큰

```scss
// Figma 디자인 시스템 네이밍 준수
$color-white: #ffffff;
$point-pink: #e4007f;
$font-dark: #191919;
$bg-pale-grey4: #f4f4f4;
```

### 재사용 Mixins

```scss
@mixin flex-center($direction: row) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}

@mixin text-ellipsis-multiline($lines: 2) {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: $lines;
}

@mixin responsive($device) {
  @if $device == tablet {
    @media screen and (min-width: 768px) {
      @content;
    }
  }
}
```

---

## ⚡ JavaScript 인터랙션

### 1. 스크롤 기반 탭 동기화

**파일**: `js/components/DetailTab.js`

```javascript
setupScrollObserver() {
  this.handleScroll = () => {
    const scrollPosition = window.pageYOffset + offset;

    // 현재 패널 찾기
    for (let i = this.panels.length - 1; i >= 0; i--) {
      if (scrollPosition >= this.panels[i].offsetTop) {
        this.setActiveTab(correspondingTab);
        break;
      }
    }
  };

  // requestAnimationFrame으로 성능 최적화
  let ticking = false;
  this.scrollListener = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        this.handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };
}
```

**핵심**: requestAnimationFrame 쓰로틀링, 헤더 높이 고려

### 2. Swiper 접근성

**파일**: `js/swiper-init.js`

```javascript
a11y: {
  enabled: true,
  prevSlideMessage: "이전 슬라이드",
  nextSlideMessage: "다음 슬라이드",
},
on: {
  slideChange: function() {
    // 스크린 리더 알림
    const announcement = document.createElement("div");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    announcement.textContent = `${this.activeIndex + 1} / ${this.slides.length}`;
    document.body.appendChild(announcement);
  }
}
```

## 📱 반응형 대응 전략

### Mobile First 접근

```scss
.container {
  padding: 0 16px; // 모바일 기본

  @include responsive(tablet) {
    padding: 0 24px; // 768px+
  }

  @include responsive(desktop) {
    max-width: 1024px; // 1024px+
    margin: 0 auto;
  }
}
```

### 브레이크포인트

| 디바이스 | 최소 너비      | 적용 대상        |
| -------- | -------------- | ---------------- |
| Mobile   | 0px ~ 767px    | 모바일 우선      |
| Tablet   | 768px ~ 1023px | 아이패드, 태블릿 |
| Desktop  | 1024px+        | 노트북, 데스크탑 |

**선정 이유**: Material Design, MUI, Statcounter 참고

### 레이아웃 패턴

```scss
// Flexbox 레이아웃
.productCard {
  width: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
// 조건부 요소 표시
.swiper-button-custom {
  display: none;

  @include responsive(desktop) {
    display: block;
  }
}
```

---

## ♿ 웹 표준 및 접근성

### WCAG 2.1 준수

#### 1. 스크린 리더 지원

```html
<button aria-label="장바구니에 담기">
  <img src="icon.svg" alt="" aria-hidden="true" />
</button>

<div role="status" aria-live="polite">장바구니에 담겼습니다</div>
```

#### 2. 의미있는 구조

```html
<h1>페이지 제목</h1>
<h2>섹션 제목</h2>
<h3>하위 섹션</h3>
```

### 웹 표준

- HTML5 Doctype
- 시맨틱 태그 사용
- UTF-8 인코딩
- Viewport 메타 태그
- 크로스 브라우저 호환성

---

## 🎓 기술적 의사결정

### 1. Web Components 선택 이유

- HTML/SCSS/JS 환경에서 컴포넌트 재사용성 확보
- React 없이 컴포넌트 기반 개발
- 네이티브 API로 의존성 최소화

**Shadow DOM 미사용**: 전역 스타일 공유

### 2. SCSS 전처리기

- 중첩, 믹스인, 함수 등 고급 기능
- 7-1 패턴으로 대규모 프로젝트 대비
- 디자인 토큰 체계적 관리

### 3. requestAnimationFrame

```javascript
// 스크롤 최적화
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});
```

---

## 📂 프로젝트 구조

```
hddfs/
├── css/
│   ├── index.css
│   └── index.css.map
├── scss/
│   ├── utils/         # 변수, 함수, 믹스인
│   ├── base/          # 리셋, 폰트, 타이포그래피
│   ├── components/    # 10개 컴포넌트
│   ├── layout/        # 레이아웃
│   ├── pages/         # 페이지
│   └── index.scss
├── js/
│   ├── components/    # 10개 웹 컴포넌트
│   ├── color-contrast.js
│   ├── swiper-init.js
│   └── filter-tab.js
├── images/
├── font/
├── type-a-promo-amount.html
├── type-b-promo-product.html
└── README.md
```

---

## 📊 성능 최적화

### JavaScript

- 이벤트 위임 패턴
- requestAnimationFrame 쓰로틀링

### CSS

- BEM으로 선택자 깊이 최소화
- 불필요한 중첩 제거
- 재사용 유틸리티 클래스

### 이미지

- SVG (icons), PNG (photos)

---

## 🔍 브라우저 지원

Chrome, Firefox, Safari, Edge (최신 2개 버전)

**Web Components API**: 모던 브라우저 지원 (IE 제외)

---

## 📝 개선 방향

### 현재 한계

- Web Components 상태 관리의 어려움
- TypeScript 미사용으로 타입 안정성 부족
