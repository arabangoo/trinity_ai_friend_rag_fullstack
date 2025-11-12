# Trinity AI Friend - Multi-AI RAG Chat System

**Gemini File Search Store 기반 멀티 AI 채팅 시스템**

3개의 최신 AI (GPT, Claude, Gemini)가 동시에 답변하며 파일 기반 지능형 RAG 검색을 제공합니다.

---

## 주요 기능

### 1. 멀티 AI 동시 응답
- **GPT-4o** (OpenAI)
- **Claude Sonnet 4** (Anthropic)
- **Gemini 2.0 Flash** (Google)

### 2. Gemini File Search Store 기반 RAG
- ✅ **자동 청킹 및 임베딩** (무료 제공, 코드 불필요)
- ✅ **시맨틱 검색** (의미 기반 문서 검색)
- ✅ **영구 데이터 저장** (재시작 후에도 유지)
- ✅ **비용 최적화** (저장소 유지비 무료)

### 3. 실시간 멀티 AI 체험
- 3개 AI가 동시에 답변 생성
- 각 AI의 독특한 스타일 비교
- 업로드된 파일 기반 정확한 답변

---

## 프로젝트 구조

```
gemini_file_search_rag_fullstack/
├── backend/                      # FastAPI 백엔드
│   ├── main.py                   # 메인 서버 (Multi-AI RAG)
│   ├── ai_manager.py             # 멀티 AI 통합 관리자
│   ├── file_search_manager.py    # Gemini File Search Store 관리자
│   ├── data/                     # 메타데이터 저장소
│   │   └── file_search_metadata.json
│   └── .env                      # API 키 설정
├── frontend/                     # React + TypeScript
│   ├── src/
│   │   ├── App.tsx               # 메인 UI
│   │   └── App.css               # 스타일
│   └── public/
│       └── ai_image/             # AI 캐릭터 이미지
└── ai_image/                     # 원본 이미지
```

---

## 빠른 시작 가이드

### 1. 사전 요구사항

- **Node.js** 18+
- **Python** 3.12+
- **API 키** (최소 1개 필요)
  - [OpenAI API Key](https://platform.openai.com/api-keys) (선택)
  - [Anthropic API Key](https://console.anthropic.com/) (선택)
  - [Google Gemini API Key](https://aistudio.google.com/apikey) (필수)

### 2. 설치

#### 백엔드 설정

```bash
cd backend

# 가상환경 생성 (권장)
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# 의존성 설치
pip install -e .

# 환경 변수 설정
copy .env.example .env
# .env 파일에 아래와 같이 API 키 입력
```

**.env 파일 예시:**
```env
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here  # 선택
ANTHROPIC_API_KEY=your_anthropic_api_key_here  # 선택
```

#### 프론트엔드 설정

```bash
cd frontend

# 의존성 설치
npm install
```

### 3. 실행

#### 백엔드 실행

```bash
cd backend
python main.py
```

**실행 결과:**
```
✅ OpenAI (GPT) 연결 완료
✅ Anthropic (Claude) 연결 완료
✅ Google (Gemini) 연결 완료
✅ Gemini File Search Manager 초기화 완료
🚀 Trinity AI Friend 시작
✅ 사용 가능한 AI: GPT, Claude, Gemini
INFO:     Uvicorn running on http://0.0.0.0:8000
```

#### 프론트엔드 실행

```bash
cd frontend
npm run dev
```

**실행 결과:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/app/
➜  Network: http://192.168.x.x:5173/app/
```

### 4. 접속

브라우저에서 **http://localhost:5173/app/** 열기

---

## 사용 방법

### 1. 파일 업로드 (RAG 활성화)

1. 화면 상단 **프로젝트 파일 업로드** 버튼 클릭
2. PDF, DOCX, TXT 파일 선택
3. **업로드** 버튼 클릭

**지원 파일 형식:**
- PDF (`.pdf`)
- Word (`.docx`)
- 텍스트 (`.txt`, `.json`)
- 이미지 (`.png`, `.jpg`, `.jpeg`)

**처리 과정:**
```
파일 업로드
    ↓
Gemini File Search Store에 저장
    ↓
자동 청킹 (문서 분할)
    ↓
자동 임베딩 (벡터화)
    ↓
인덱싱 완료
```

### 2. AI 채팅 사용

원하는 AI를 호출하여 질문할 수 있습니다:

```
@GPT 오늘 날씨 알려줘
@Claude 코드 리뷰해줘
@Gemini PDF에서 핵심 내용 찾아줘
```

**멘션 없이 입력** 시 3개 AI 모두가 동시에 답변합니다.

### 3. 대화 히스토리 초기화

좌측 상단 **이전 대화 초기화** 버튼 클릭

---

## API 엔드포인트

### 파일 관리

```http
POST   /api/upload           # 파일 업로드 (File Search Store에 저장)
GET    /api/documents        # 업로드된 문서 목록
DELETE /api/documents/{id}   # 문서 삭제
```

### 채팅

```http
POST   /api/chat             # 일반 채팅 (JSON 응답)
POST   /api/chat/stream      # 스트리밍 채팅 (Server-Sent Events)
```

**요청 예시:**
```json
{
  "message": "업로드한 PDF의 요약을 보여줘",
  "include_context": true
}
```

### 히스토리

```http
GET    /api/history          # 대화 히스토리 조회
DELETE /api/history          # 히스토리 초기화
```

### 헬스 체크

```http
GET    /health               # 서버 상태 확인
```

---

## Gemini File Search Store 동작 원리

### Google File Search란?

**Google File Search Store**는 Google AI가 제공하는 관리형 RAG(Retrieval-Augmented Generation) 서비스입니다. 
기존 RAG 시스템과 달리 복잡한 설정 없이 파일을 업로드하면 자동으로 청킹, 임베딩, 인덱싱이 완료됩니다.

**기존 RAG vs File Search Store**

| 항목 | 기존 RAG 방식 | File Search Store |
|------|-------------|-------------------|
| 청킹 | 직접 구현 필요 | ✅ 자동 처리 |
| 임베딩 | 별도 API 호출 필요 | ✅ 자동 생성 (무료) |
| 벡터 DB | 별도 설치/관리 필요 | ✅ 클라우드 제공 |
| 검색 로직 | 직접 구현 | ✅ Gemini가 자동 수행 |
| 코드 복잡도 | 높음 (100+ 줄) | 낮음 (10줄 이하) |
| 비용 | 임베딩 API 비용 | 인덱싱만 과금 ($0.15/1M) |

### 자동 RAG 파이프라인

**1. 파일 업로드 (사용자)**
- 사용자가 PDF, DOCX, TXT, 이미지 파일 업로드
- 지원 형식: `.pdf`, `.docx`, `.txt`, `.json`, `.png`, `.jpg`, `.jpeg`
- 최대 파일 크기: 100MB

**2. File Search Store에 저장 (Gemini Cloud)**
- ✅ **자동 청킹**: 문서를 최적 크기로 분할 (일반적으로 512-1024 토큰)
- ✅ **자동 임베딩**: Gemini Embedding 모델(`text-embedding-004`)로 벡터화
- ✅ **인덱싱**: 구글의 벡터 DB에 저장하여 시맨틱 검색 가능하게 만듦
- ✅ **메타데이터 추출**: 파일 제목, 작성자, 날짜 등 자동 추출

**3. 메타데이터 저장 (로컬 JSON)**
- Store 정보 및 파일 목록을 `backend/data/file_search_metadata.json`에 저장
- 서버 재시작 후에도 업로드된 파일 정보 유지
- Store ID를 로컬에 보관하여 재사용 가능

**4. 채팅 시 자동 검색 (RAG 실행)**
```
사용자 질문
    ↓
Gemini API 호출 (File Search Tool 활성화)
    ↓
Gemini가 질문을 분석하여 관련 키워드 추출
    ↓
File Search Store에서 시맨틱 검색 수행
    ↓
가장 관련성 높은 청크 5-10개 선택
    ↓
선택된 청크를 컨텍스트로 사용하여 답변 생성
    ↓
출처 정보와 함께 사용자에게 응답
```

### File Search의 핵심 장점

#### 1. **완전 자동화된 RAG**
직접 구현할 필요 없이 파일만 업로드하면 모든 RAG 파이프라인이 자동으로 구성됩니다.

```python
# 기존 RAG (복잡한 코드)
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000)
chunks = text_splitter.split_documents(documents)
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)
retriever = vectorstore.as_retriever()
# ... 100+ 줄의 추가 코드

# File Search Store (간단한 코드)
uploaded_file = client.file_search_stores.upload_to_file_search_store(
    file="document.pdf",
    file_search_store_name=store_name
)
# 끝! 자동으로 청킹, 임베딩, 인덱싱 완료
```

#### 2. **비용 효율성**
- 초기 인덱싱만 과금: $0.15 / 1M 토큰
- Store 유지 비용: **무료**
- 쿼리 시 임베딩: **무료**
- 예시: 100페이지 PDF 업로드 → 약 $0.01-0.05

#### 3. **시맨틱 검색**
키워드 매칭이 아닌 의미 기반 검색으로 더 정확한 결과 제공

```
질문: "회사의 휴가 정책은?"
키워드 검색: "휴가" 단어만 찾음
시맨틱 검색: "연차", "유급휴가", "휴일", "연말연시" 등 관련 내용 모두 검색
```

#### 4. **영구 저장**
한 번 업로드한 파일은 File Search Store에 영구 보관되며, Store ID만 저장하면 언제든 재사용 가능합니다.

### 실제 동작 예시

**시나리오**: 회사 규정집 PDF를 업로드하고 질문하기

```bash
# 1. 파일 업로드
POST /api/upload
파일: "company_handbook.pdf" (50페이지)

# 백엔드 처리 (자동)
✅ File Search Store에 업로드
✅ 50페이지 → 약 120개 청크로 분할
✅ 각 청크를 768차원 벡터로 임베딩
✅ 벡터 DB에 인덱싱 완료
```

```bash
# 2. 질문하기
POST /api/chat
{
  "message": "재택근무 정책에 대해 알려줘",
  "include_context": true
}

# Gemini 내부 처리
1. "재택근무", "정책" 키워드 추출
2. File Search Store에서 시맨틱 검색
3. 관련도 높은 청크 발견:
   - "4장. 근무 형태 > 4.2 원격 근무"
   - "9장. 복리후생 > 9.3 유연 근무제"
4. 해당 청크를 컨텍스트로 답변 생성

# 응답
"회사의 재택근무 정책은 다음과 같습니다:
- 주 2회까지 재택근무 가능
- 사전 승인 필요
- 보안 VPN 사용 필수
(출처: 4장 근무 형태, 9장 복리후생)"
```

### 기술 세부사항

**사용 모델**
- 임베딩: `text-embedding-004` (768차원 벡터)
- 생성: `gemini-2.0-flash-exp`
- 청킹: Google의 최적화된 알고리즘 (자동)

**검색 알고리즘**
- 코사인 유사도 기반 벡터 검색
- 하이브리드 검색 (키워드 + 시맨틱)
- 자동 re-ranking으로 정확도 향상

**확장성**
- 무료 티어: 최대 1GB
- Tier 1: 10GB
- Tier 3: 1TB (엔터프라이즈)

### 비용 구조

| 항목 | 비용 |
|------|------|
| File Search Store 유지 | **무료** |
| 쿼리 시 임베딩 생성 | **무료** |
| 초기 인덱싱 | **$0.15 / 1M 토큰** |

**예시:** 100페이지 PDF 업로드 시 약 $0.01-0.05

---

## 데이터 저장

### 영구 저장 (서버 재시작 후에도 유지)

1. **File Search Store** (Gemini 클라우드)
   - 업로드된 파일
   - 자동 생성된 임베딩
   - 인덱싱

2. **메타데이터** (`backend/data/file_search_metadata.json`)
   - Store 정보
   - 업로드된 파일 목록

### 임시 저장 (서버 재시작 시 초기화)

1. **대화 히스토리** (메모리)
   - 사용자 질문
   - AI 응답

---

## AI 캐릭터 이미지

각 AI의 개성 있는 캐릭터 이미지가 표시됩니다:

```
frontend/public/ai_image/
├── ChatGPT_Image.png    # GPT 캐릭터
├── Claude_Image.png     # Claude 캐릭터
└── Gemini_Image.png     # Gemini 캐릭터
```

**이미지 교체 방법:**
1. `ai_image/` 폴더에 이미지 준비
2. 같은 이름으로 교체
3. 프론트엔드 재시작

---

## AI 개성 커스터마이징

각 AI의 말투와 성격을 자유롭게 변경할 수 있습니다!

### 현재 설정된 개성

- **GPT**: 젊고 스마트한 남자 - 현대적이고 똑부러진 말투 ('~네요', '~예요', '~거든요')
- **Claude**: 젊고 활기찬 여자 - 밝고 긍정적, 이모티콘 사용 ('~해요!', '~네요~', '~할게요!')
- **Gemini**: 연륜 있는 노년 남자 - 점잖고 무게감 있는 말투 ('~하시게', '~하네', '~이지', '~하오')

### 커스터마이징 방법

[backend/ai_manager.py](backend/ai_manager.py) 파일에서 각 AI의 시스템 프롬프트를 수정하세요.

#### 1. GPT 개성 변경

**위치**: `_get_gpt_response()` 및 `_get_gpt_response_stream()` 메서드

```python
# backend/ai_manager.py 168번째 줄 근처
{"role": "system", "content": "당신은 젊고 스마트한 남자 AI 어시스턴트입니다. 말투는 현대적이고 똑부러지며..."}
```

**예시: 귀여운 고양이 캐릭터로 변경**
```python
{"role": "system", "content": "당신은 귀여운 고양이 AI입니다. '냥', '~냥' 같은 말투를 사용하고, 장난스럽고 애교 있게 답변하세요. 가끔 '🐱', '😺' 이모티콘도 사용하세요!"}
```

#### 2. Claude 개성 변경

**위치**: `_get_claude_response()` 및 `_get_claude_response_stream()` 메서드

```python
# backend/ai_manager.py 214번째 줄 근처
system="당신은 젊고 활기찬 여자 AI 어시스턴트입니다. 밝고 긍정적인 에너지를..."
```

**예시: 전문가 비서로 변경**
```python
system="당신은 프로페셔널한 비즈니스 어시스턴트입니다. 공손하고 정중한 말투로 '~입니다', '~하겠습니다'를 사용하며, 명확하고 간결하게 답변하세요."
```

#### 3. Gemini 개성 변경

**위치**: `_get_gemini_response()` 및 `_get_gemini_response_stream()` 메서드

```python
# backend/ai_manager.py 255번째 줄 근처
system_instruction = "당신은 연륜 있고 지혜로운 노년의 현자입니다. 오랜 경험과..."
```

**예시: 과학자 캐릭터로 변경**
```python
system_instruction = "당신은 호기심 많은 과학자입니다. 모든 것을 과학적으로 설명하며, '실험 결과에 따르면', '데이터를 보면' 같은 표현을 자주 사용하세요. 🔬🧪"
```

### 개성 변경 후 적용

```bash
# 백엔드 재시작 (프론트엔드는 재시작 불필요)
cd backend
python main.py
```

### 커스터마이징 팁

1. **말투 일관성**: 한 가지 스타일로 일관되게 유지
2. **이모티콘 사용**: 캐릭터에 맞는 이모티콘 선택
3. **금지어 설정**: 특정 표현을 피하도록 지시 가능
4. **예제 제공**: "예를 들어 '안녕하세요~' 대신 '안녕!'처럼" 같은 구체적 예시 추가

### 다양한 개성 예시

**로봇 AI**
```python
"당신은 로봇 AI입니다. '삐빅', '계산 완료' 같은 로봇 특유의 표현을 사용하며, 논리적이고 정확하게 답변하세요. 🤖"
```

**해적 캐릭터**
```python
"당신은 유쾌한 해적입니다. '아하하!', '이놈!' 같은 호쾌한 말투를 사용하고, 모험과 자유를 사랑하는 성격입니다. ⛵🏴‍☠️"
```

**요리사**
```python
"당신은 열정적인 요리사입니다. 모든 것을 요리에 비유하며, '~맛있게', '~양념을 치듯' 같은 표현을 사용하세요. 👨‍🍳🍳"
```

**탐정**
```python
"당신은 명탐정입니다. '흠... 이건 수상하군', '단서를 찾았어!' 같은 추리 말투를 사용하며, 논리적으로 분석합니다. 🕵️‍♂️🔍"
```

---

## 주요 문제 해결

### 1. File Search Store가 초기화되지 않음

**증상:** 업로드한 파일이 AI에게 전달되지 않음

**해결:**
```bash
# 백엔드 실행 로그 확인:
# 아래 메시지가 표시되어야 정상:
✅ 새로운 File Search Store 생성: file_search_stores/...
```

권장사항:
- 파일 업로드 후 문서 목록 확인
- `GET /api/documents` 호출하여 문서 목록 확인

### 2. API 키 설정 오류

**증상:** "API 키를 확인해주세요" 오류

**해결:**
```bash
# .env 파일 확인
cat backend/.env

# API 키가 올바른지 확인
# 잘못된 예시:
GEMINI_API_KEY=AIzaSy...  # ✅ 올바름
GEMINI_API_KEY= AIzaSy... # ❌ 공백 있음
```

### 3. 이미지가 표시되지 않음

**해결:**
```bash
# 프론트엔드 재시작
cd frontend
npm run dev

# 브라우저 캐시 강제 새로고침 (Ctrl+Shift+R)
```

### 4. CORS 오류

**해결:**
```python
# backend/main.py에서 CORS 설정 확인
allow_origins=["*"]  # 모든 출처 허용
```

---

## 기술 스택 정보

### 백엔드 기술

**백엔드:**
- FastAPI
- Google Gemini API (File Search Store)
- OpenAI API
- Anthropic API
- Python 3.12+

**프론트엔드:**
- React 18
- TypeScript
- Vite
- Axios
- React Markdown

### 의존성

```bash
# 백엔드
backend/pyproject.toml

# 프론트엔드
frontend/package.json
```

---

## 라이선스

MIT License

