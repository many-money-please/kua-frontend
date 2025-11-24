# 🧪 Docker 로컬 테스트 가이드

카페24 계정 없이도 로컬에서 Docker 배포를 테스트할 수 있습니다!

## 📋 사전 준비

### 1. Docker 설치 확인
```bash
docker --version
docker-compose --version
```

설치되어 있지 않다면:
- Windows: [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) 설치

### 2. 환경 변수 파일 생성 (선택사항)

`.env` 파일을 생성하세요 (없어도 빌드는 가능하지만, 일부 기능은 작동하지 않을 수 있습니다):

```bash
# .env 파일 생성 (프로젝트 루트에)
NEXT_PUBLIC_KAKAO_MAP_KEY=your_key_here
NEXT_PUBLIC_API_URL=http://localhost:8000
NODE_ENV=production
```

> 💡 **참고**: 카카오 맵 키가 없어도 빌드와 실행은 가능합니다. 다만 카카오 맵 기능만 작동하지 않을 뿐입니다.

## 🚀 테스트 방법

### 방법 1: npm 스크립트 사용 (가장 간단)

```bash
# 1. Docker 이미지 빌드 및 실행
npm run docker:test

# 2. 브라우저에서 확인
# http://localhost:3000 접속

# 3. 중지
npm run docker:stop
```

### 방법 2: Docker 명령어 직접 사용

```bash
# 1. 이미지 빌드
npm run docker:build
# 또는
docker build -t kua-frontend:latest .

# 2. 컨테이너 실행
npm run docker:run
# 또는
docker run -p 3000:3000 --env-file .env kua-frontend:latest

# 3. 중지: Ctrl+C 또는 다른 터미널에서
docker ps  # 실행 중인 컨테이너 확인
docker stop <container-id>
```

### 방법 3: Docker Compose 사용

```bash
# 빌드 및 실행
docker-compose up --build

# 백그라운드 실행
docker-compose up -d --build

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down
```

## ✅ 테스트 체크리스트

빌드 및 실행 후 다음을 확인하세요:

- [ ] Docker 이미지가 성공적으로 빌드되는가?
- [ ] 컨테이너가 정상적으로 시작되는가?
- [ ] `http://localhost:3000`에서 웹사이트가 로드되는가?
- [ ] 정적 파일(이미지, 폰트)이 정상적으로 로드되는가?
- [ ] 페이지 네비게이션이 작동하는가?
- [ ] 콘솔에 에러가 없는가?

## 🔍 문제 해결

### 빌드 실패 시

```bash
# 빌드 로그 자세히 보기
docker build -t kua-frontend:latest . --progress=plain --no-cache

# 특정 스테이지에서 멈춰서 확인
docker build -t kua-frontend:latest . --target deps
```

### 실행 실패 시

```bash
# 컨테이너 로그 확인
docker logs <container-id>

# 또는 docker-compose 사용 시
docker-compose logs frontend
```

### 포트가 이미 사용 중일 때

`docker-compose.yml`에서 포트를 변경:
```yaml
ports:
  - "3001:3000"  # 호스트 포트를 3001로 변경
```

### 환경 변수 문제

```bash
# 환경 변수 없이 실행 (최소 테스트)
docker run -p 3000:3000 kua-frontend:latest

# 특정 환경 변수만 설정
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_KAKAO_MAP_KEY=test_key \
  kua-frontend:latest
```

## 📊 성능 확인

```bash
# 이미지 크기 확인
docker images kua-frontend

# 컨테이너 리소스 사용량 확인
docker stats <container-id>
```

## 🧹 정리

테스트 후 불필요한 이미지와 컨테이너 정리:

```bash
# 실행 중인 컨테이너 중지 및 제거
docker-compose down

# 이미지 제거
docker rmi kua-frontend:latest

# 사용하지 않는 이미지 일괄 제거
docker image prune -a
```

## 💡 팁

1. **빠른 테스트**: 코드 변경 후 다시 빌드하려면 `--no-cache` 옵션 사용
   ```bash
   docker build -t kua-frontend:latest . --no-cache
   ```

2. **개발 모드로 테스트**: Dockerfile을 수정하여 개발 모드로 실행할 수도 있습니다
   ```dockerfile
   # Dockerfile.dev 생성하여 개발 모드용 이미지 만들기
   ```

3. **볼륨 마운트**: 로컬 코드 변경을 즉시 반영하려면 볼륨 마운트 사용 (개발용)
   ```yaml
   volumes:
     - .:/app
     - /app/node_modules
   ```

## 🎯 다음 단계

로컬 테스트가 성공하면:
1. 카페24 배포 준비 완료! ✅
2. `DEPLOYMENT.md` 참고하여 실제 배포 진행
3. 백엔드 개발자와 API URL 협의


