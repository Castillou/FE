# Harmari_FE

할머리 프론트엔드 레포지토리입니다.

## Tech

- React + Typescript + Vite
- Tailwind Css
- React Router Dom
- axios
- prettier + esLint

## Structure

```tsx
// Harmari_FE 폴더구조
├─src
│  ├─routes
│  │  └─route
│  │     ├─[RouteName].tsx
│  │     └─index.ts
│  └───router.tsx
│
├─components // 공용 컴포넌트
│  └─[ComponentName]
│
├─config // axios 인스턴스 모음
│
├─constants
│
├─hooks
│
├─layouts
│  └─[layout].tsx
│
├─pages
│  ├─PageName
│  │  ├─components // 페이지 전용 컴포넌트
│  │  │   └─[ComponentName].tsx
│  │  └─index.ts
│  └─index.ts
│
├─types
│
└─utils
```

# Run Locally

1. Node.js 설치 (호환성을 위해 v18 또는 v20 권장)
2. 프로젝트 클론

```bash
git clone https://github.com/Harmari/FE.git
```

3. 프로젝트 진입

```bash
cd FE
```

4. 패키지 설치

```bash
npm install
```

5. 서버 실행

```bash
npm run dev
```

- lint 확인

```bash
npm run lint
```
