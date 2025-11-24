# 카페24 Docker 배포 가이드

## 📋 사전 준비 사항

### 1. 환경 변수 설정

`.env.example` 파일을 참고하여 다음 환경 변수들을 준비하세요:

- `NEXT_PUBLIC_KAKAO_MAP_KEY`: 카카오 맵 API 키
- `NEXT_PUBLIC_API_URL`: 백엔드 API URL (카페24 배포 환경에 맞게 설정)

### 2. Docker 이미지 빌드 및 테스트

#### 로컬에서 Docker 이미지 빌드

```bash
docker build -t kua-frontend:latest .
```

#### 로컬에서 Docker 컨테이너 실행 테스트

```bash
docker-compose up -d
```

또는 직접 실행:

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_KAKAO_MAP_KEY=your_key \
  -e NEXT_PUBLIC_API_URL=http://your-backend-url \
  kua-frontend:latest
```

#### 헬스체크

브라우저에서 `http://localhost:3000` 접속하여 정상 작동 확인

### 3. 카페24 배포 전 체크리스트

- [ ] Docker 이미지가 정상적으로 빌드되는지 확인
- [ ] 로컬에서 Docker 컨테이너가 정상 실행되는지 확인
- [ ] 환경 변수 값들이 올바르게 설정되었는지 확인
- [ ] 백엔드 API URL이 올바른지 확인
- [ ] 카카오 맵 API 키가 유효한지 확인
- [ ] 프로덕션 빌드가 성공하는지 확인 (`npm run build`)

## 🚀 카페24 배포 절차

### 1. Docker 이미지 준비

프로젝트 루트에 다음 파일들이 있어야 합니다:

- `Dockerfile`
- `.dockerignore`
- `docker-compose.yml` (선택사항)

### 2. 카페24 Docker 배포 설정

카페24 관리자 페이지에서:

1. Docker 서비스 활성화
2. Git 저장소 연결 또는 Docker 이미지 업로드
3. 환경 변수 설정:
    - `NEXT_PUBLIC_KAKAO_MAP_KEY`
    - `NEXT_PUBLIC_API_URL`
    - `NODE_ENV=production`
4. 포트 설정: `3000` (또는 카페24에서 지정한 포트)
5. 빌드 및 배포 실행

### 3. 백엔드와의 통신

프론트엔드와 백엔드가 같은 Docker 네트워크에 있다면:

- `NEXT_PUBLIC_API_URL=http://backend:8000` (서비스 이름 사용)
- 또는 외부 URL 사용: `NEXT_PUBLIC_API_URL=https://api.yourdomain.com`

### 4. 배포 후 확인 사항

- [ ] 웹사이트가 정상적으로 로드되는지 확인
- [ ] API 호출이 정상적으로 작동하는지 확인
- [ ] 카카오 맵이 정상적으로 표시되는지 확인
- [ ] 정적 파일(이미지, 폰트 등)이 정상적으로 로드되는지 확인
- [ ] 콘솔에 에러가 없는지 확인

## 🔧 트러블슈팅

### 빌드 실패 시

- Node.js 버전 확인 (현재 Dockerfile은 Node 20 사용)
- `package.json`의 의존성 확인
- 빌드 로그 확인

### 런타임 에러 시

- 환경 변수가 올바르게 설정되었는지 확인
- 백엔드 API URL이 올바른지 확인
- Docker 컨테이너 로그 확인: `docker logs <container-id>`

### 포트 충돌 시

- 카페24에서 지정한 포트 번호 확인
- `Dockerfile`의 `EXPOSE` 포트와 일치하는지 확인

## 📝 참고 사항

- Next.js는 `standalone` 모드로 빌드되어 최소한의 파일만 포함됩니다
- 정적 파일은 `.next/static`에 포함되어 자동으로 서빙됩니다
- 환경 변수는 빌드 타임과 런타임 모두에서 필요할 수 있습니다 (`NEXT_PUBLIC_` 접두사)

## 🔗 관련 파일

- `Dockerfile`: 프로덕션 Docker 이미지 빌드 설정
- `docker-compose.yml`: 로컬 개발/테스트용 Docker Compose 설정
- `.env.example`: 환경 변수 템플릿
- `next.config.ts`: Next.js 설정 (standalone 모드 포함)

