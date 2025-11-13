# Trinity AI Friend - RAG Chat System

**Gemini File Search Store 기반 멀티 AI 채팅 시스템**

3개의 최신 AI (GPT, Claude, Gemini)가 동시에 답변하며 파일 기반 지능형 RAG 검색을 제공합니다.

<img width="2400" height="1400" alt="image_1" src="https://github.com/user-attachments/assets/7e152d79-4194-48ce-9488-5a6bb140d586" />

## 🎯 핵심 특징

- 🤖 **멀티 AI 동시 응답**: GPT, Claude, Gemini가 같은 질문에 각자의 스타일로 답변
- 📚 **자동 RAG 구축**: 파일 업로드만으로 자동 청킹, 임베딩, 인덱싱 완료
- 🔄 **컨텍스트 공유**: Gemini가 검색한 RAG 결과를 모든 AI가 활용
- 💬 **개성 있는 AI**: 각 AI가 독특한 캐릭터와 말투로 답변
- ⚡ **실시간 스트리밍**: SSE 방식으로 답변이 실시간으로 생성
- 🎨 **완전 커스터마이징**: AI 모델, 개성, 프롬프트 모두 변경 가능

## 🚀 빠른 시작

```bash
# 1. 저장소 클론
git clone <repository-url>
cd <folder-name>

# 2. 백엔드 설정 및 실행
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -e .
# .env 파일에 API 키 설정
python main.py

# 3. 프론트엔드 실행 (새 터미널)
cd frontend
npm install
npm run dev

# 4. 브라우저에서 http://localhost:5173/app/ 접속
```

**필수 요구사항:**
- Python 3.11+
- Node.js 18+
- Gemini API Key (AI 호출 / File Search Store 사용)
- OpenAI API Key (AI 호출)
- Anthropic API Key (AI 호출)

---

## 주요 기능

### 1. 멀티 AI 동시 응답
- **GPT-4o** (OpenAI) - 젊고 스마트한 남성 말투
- **Claude Sonnet 4** (Anthropic) - 활기찬 여성 말투
- **Gemini 2.5 Flash** (Google) - 지혜로운 노인 말투
- **랜덤 선택**: 1~3개 AI가 랜덤하게 선택되어 동시 답변
- **AI 지정**: `@GPT`, `@Claude`, `@Gemini` 멘션으로 특정 AI 호출 가능

### 2. Gemini File Search Store 기반 RAG
- ✅ **자동 청킹 및 임베딩** (무료 제공, 코드 불필요)
- ✅ **시맨틱 검색** (의미 기반 문서 검색)
- ✅ **영구 데이터 저장** (재시작 후에도 유지)
- ✅ **비용 최적화** (저장소 유지비 무료, 인덱싱만 $0.15/1M 토큰)
- ✅ **멀티 AI 공유**: Gemini가 검색한 결과를 GPT/Claude도 활용
- ✅ **문서 관리**: 웹 UI에서 문서 업로드/삭제 가능

<img width="2400" height="1400" alt="rag_1" src="https://github.com/user-attachments/assets/4d7b6a3e-acee-479d-b4f4-ab3908415c9b" />   
<img width="2400" height="1400" alt="rag_2" src="https://github.com/user-attachments/assets/3c12dfbf-5e99-4a56-8847-7dd17b487c8d" />   
<img width="2400" height="1400" alt="rag_3" src="https://github.com/user-attachments/assets/acb4cc2c-0990-4219-9354-e0af606c911c" />   

### 3. 실시간 스트리밍 응답
- Server-Sent Events (SSE)로 실시간 스트리밍
- 3개 AI가 동시에 답변 생성 (병렬 처리)
- 각 AI의 독특한 개성과 말투 체험
- 업로드된 파일 기반 정확한 RAG 답변

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
- **Python** 3.11+
- **API 키** (최소 1개 필요)
  - [OpenAI API Key](https://platform.openai.com/api-keys) (선택)
  - [Anthropic API Key](https://console.anthropic.com/) (선택)
  - [Google Gemini API Key](https://aistudio.google.com/apikey) (필수)

#### ⚠️ 중요: Google GenAI 버전 요구사항

**File Search Store 기능을 사용하려면 `google-genai` 버전 1.50.0 이상이 필수입니다.**

```bash
# 버전 확인
pip show google-genai

# 1.50.0 미만이면 업그레이드
pip install --upgrade google-genai
```

**문제 해결:**
- ❌ `'Client' object has no attribute 'file_search_stores'` 에러가 발생하면 → 버전이 1.50.0 미만
- ✅ 해결: `pip install --upgrade google-genai` 실행 후 백엔드 재시작

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
OPENAI_API_KEY=실제 GPT API 키 기입
ANTHROPIC_API_KEY=실제 클로드 API 키 기입
GEMINI_API_KEY=실제 제미나이 API 키 기입
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

### 3. RAG 데이터 관리

#### 📚 문서 관리 화면 접근
화면 상단 **📚 문서 관리** 버튼을 클릭하여 업로드된 문서 목록을 확인할 수 있습니다.

#### 문서 삭제
1. **개별 문서 삭제**
   - 문서 관리 모달에서 각 문서 옆의 **🗑️ 삭제** 버튼 클릭
   - 확인 메시지 후 해당 문서가 File Search Store에서 영구 삭제됩니다

2. **모든 문서 삭제**
   - 문서 관리 모달 하단의 **🗑️ 모든 문서 삭제** 버튼 클릭
   - RAG에 저장된 모든 문서가 삭제됩니다 (되돌릴 수 없음)

#### 문서 수정 시나리오
파일 내용이 업데이트된 경우:
```
1. 기존 문서 삭제 (📚 문서 관리 → 🗑️ 삭제)
   ↓
2. 새 버전 파일 업로드 (📎 버튼 → 파일 선택 → 전송)
   ↓
3. RAG가 새로운 내용으로 자동 업데이트
```

#### ⚠️ 주의사항
- **삭제는 영구적**: 삭제된 문서는 복구할 수 없습니다
- **RAG 즉시 반영**: 삭제/업로드 후 즉시 검색 결과에 반영됩니다
- **File Search Store 동기화**: 모든 작업은 Google File Search Store와 실시간 동기화됩니다

### 4. 대화 히스토리 초기화

화면 상단 **🗑️ 대화 초기화** 버튼 클릭

**차이점:**
- **대화 초기화**: 채팅 메시지만 삭제 (RAG 문서는 유지)
- **문서 삭제**: RAG 저장소의 문서 삭제 (채팅 메시지는 유지)

---

## API 엔드포인트

### 파일 관리

```http
POST   /api/upload           # 파일 업로드 (File Search Store에 저장)
GET    /api/documents        # 업로드된 문서 목록
DELETE /api/documents/{id}   # 특정 문서 삭제
DELETE /api/documents        # 모든 문서 삭제
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

**4. 채팅 시 자동 검색 (멀티 AI RAG 실행)**
```
사용자 질문
    ↓
[1단계] Gemini가 File Search Store에서 검색
    - File Search Tool 활성화
    - 질문 분석 및 관련 키워드 추출
    - 시맨틱 검색 수행
    - 가장 관련성 높은 청크 5-10개 선택
    - 관련 텍스트를 추출하여 반환
    ↓
[2단계] 추출된 텍스트를 모든 AI에게 공유
    - GPT: 추출된 텍스트를 프롬프트에 포함
    - Claude: 추출된 텍스트를 프롬프트에 포함
    - Gemini: 추출된 텍스트를 프롬프트에 포함
    ↓
[3단계] 1~3개 AI가 랜덤 선택되어 동시 답변 생성
    - 모두 같은 RAG 컨텍스트 기반
    - 각자의 개성과 말투로 답변
    - 병렬 처리로 동시 응답
    ↓
사용자에게 다양한 스타일의 답변 제공
```

**핵심 특징:**
- **단일 검색**: Gemini가 한 번만 검색하여 비용 절감
- **컨텍스트 공유**: 모든 AI가 동일한 정보 기반으로 답변
- **다양성 유지**: 각 AI의 독특한 말투와 관점으로 답변

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
    file_search_store_name=store_name,
    config={'display_name': 'My Document'}
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

**필수 패키지 버전**
- `google-genai` >= 1.50.0 (File Search Store 기능 필수)
- Python >= 3.11

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

## AI 모델 변경 매뉴얼

각 AI의 사용 모델을 자유롭게 변경할 수 있습니다. [backend/ai_manager.py](backend/ai_manager.py)에서 `model=` 파라미터를 수정하세요.

### 현재 사용 중인 모델

| AI | 모델명 | 파일 위치 |
|---|---|---|
| **GPT** | `gpt-4o` | [ai_manager.py:182, 216](backend/ai_manager.py#L182) |
| **Claude** | `claude-sonnet-4-20250514` | [ai_manager.py:256, 290](backend/ai_manager.py#L256) |
| **Gemini** (일반) | `gemini-2.5-flash` | [ai_manager.py:362, 432](backend/ai_manager.py#L362) |
| **Gemini** (RAG) | `gemini-2.5-flash` | [ai_manager.py:341, 411](backend/ai_manager.py#L341) |
| **File Search** | `gemini-2.5-flash` | [file_search_manager.py:191](backend/file_search_manager.py#L191) |

### 1. GPT 모델 변경

**파일**: `backend/ai_manager.py`
**수정 위치**: 2곳 (일반 응답, 스트리밍 응답)

```python
# Line 170: _get_gpt_response() 메서드
response = await self.openai_client.chat.completions.create(
    model="gpt-4o",  # ← 모델 변경시 수정
    messages=[...]
)

# Line 204: _get_gpt_response_stream() 메서드
stream = await self.openai_client.chat.completions.create(
    model="gpt-4o",  # ← 모델 변경시 수정
    messages=[...],
    stream=True
)
```

**사용 가능한 GPT 모델** ([OpenAI Models](https://platform.openai.com/docs/models))
- `gpt-4o` - 최신 멀티모달 모델 (현재 설정)
- `gpt-4o-mini` - 빠르고 저렴한 경량 버전
- `gpt-4-turbo` - 128k 컨텍스트, 고성능
- `o1` - 추론 특화 모델
- `o1-mini` - 추론 특화 경량 버전

### 2. Claude 모델 변경

**파일**: `backend/ai_manager.py`
**수정 위치**: 2곳 (일반 응답, 스트리밍 응답)

```python
# Line 244: _get_claude_response() 메서드
response = await self.anthropic_client.messages.create(
    model="claude-sonnet-4-20250514",  # ← 모델 변경시 수정
    max_tokens=2000,
    temperature=0.7,
    system="...",
    messages=[...]
)

# Line 278: _get_claude_response_stream() 메서드
async with self.anthropic_client.messages.stream(
    model="claude-sonnet-4-20250514",  # ← 모델 변경시 수정
    max_tokens=2000,
    messages=[...]
) as stream:
```

**사용 가능한 Claude 모델** ([Anthropic Models](https://docs.anthropic.com/en/docs/about-claude/models))
- `claude-sonnet-4-20250514` - Claude 4 Sonnet (현재 설정)
- `claude-opus-4-20250514` - Claude 4 Opus (최고 성능)
- `claude-3-5-sonnet-20241022` - Claude 3.5 Sonnet
- `claude-3-opus-20240229` - Claude 3 Opus

### 3. Gemini 모델 변경

**파일**: `backend/ai_manager.py`, `backend/file_search_manager.py`
**수정 위치**: 5곳 (일반 응답, 스트리밍 응답, File Search 검색)

```python
# ai_manager.py - Line 341: _get_gemini_response() - File Search 사용
response = await loop.run_in_executor(
    None,
    lambda: self.gemini_client.models.generate_content(
        model="gemini-2.5-flash",  # ← 모델 변경시 수정
        contents=message,
        config=types.GenerateContentConfig(...)
    )
)

# ai_manager.py - Line 362: _get_gemini_response() - File Search 미사용
response = await loop.run_in_executor(
    None,
    lambda: self.gemini_client.models.generate_content(
        model="gemini-2.5-flash",  # ← 모델 변경시 수정
        contents=message,
        config=types.GenerateContentConfig(...)
    )
)

# ai_manager.py - Line 411, 432: _get_gemini_response_stream() - 위와 동일하게 2곳

# file_search_manager.py - Line 191: get_context() - RAG 검색용
response = await loop.run_in_executor(
    None,
    lambda: self.client.models.generate_content(
        model="gemini-2.5-flash",  # ← RAG 검색도 동일 모델 사용
        contents=search_query,
        config=types.GenerateContentConfig(...)
    )
)
```

**사용 가능한 Gemini 모델** ([Google AI Models](https://ai.google.dev/gemini-api/docs/models))
- `gemini-2.5-flash` - Gemini 2.5 Flash (현재 설정, File Search 지원)
- `gemini-2.5-pro` - Gemini 2.5 Pro (최고 성능, File Search 지원)
- `gemini-1.5-pro` - Gemini 1.5 Pro (2M 컨텍스트, File Search 지원)
- `gemini-1.5-flash` - Gemini 1.5 Flash (빠르고 효율적, File Search 지원)
- ~~`gemini-2.0-flash-exp`~~ - ❌ File Search 미지원 (일반 채팅만 가능)
- ~~`gemini-1.0-pro`~~ - ❌ File Search 미지원 (일반 채팅만 가능)

**⚠️ 중요:**
- **File Search 기능을 사용하려면** 반드시 위의 ✅ 표시된 모델 사용
- RAG 없이 일반 채팅만 하는 경우 모든 Gemini 모델 사용 가능
- `ai_manager.py`와 `file_search_manager.py` 모두에서 모델 변경 필요

### 모델 변경 후 적용

```bash
# 백엔드만 재시작하면 됨 (프론트엔드 재시작 불필요)
cd backend
python main.py
```

### 주의사항

1. **모든 위치 수정 필요**: 각 AI마다 일반/스트리밍 응답 메서드가 있으므로, 모든 위치에서 모델명을 동일하게 수정해야 합니다.
2. **Gemini 모델 주의**: Gemini는 5곳(`ai_manager.py` 4곳 + `file_search_manager.py` 1곳) 모두 수정 필요
3. **File Search 호환성**: RAG 기능을 사용한다면 File Search 지원 모델만 선택 가능
4. **API 호환성 확인**: 변경하려는 모델이 현재 API 키로 접근 가능한지 확인하세요.
5. **비용 확인**: 모델마다 토큰당 비용이 다르므로, 공식 문서에서 가격을 확인하세요.
6. **컨텍스트 윈도우**: 모델마다 최대 입력 토큰 수가 다릅니다 (예: GPT-4o는 128k, Gemini 1.5 Pro는 2M).

### 모델 성능 비교 팁

다양한 모델을 테스트해보세요:
- **빠른 응답 필요**: `gpt-4o-mini`, `gemini-1.5-flash`, `claude-3-5-sonnet`
- **최고 성능 필요**: `o1`, `claude-opus-4`, `gemini-1.5-pro`
- **비용 최적화**: `gpt-4o-mini`, `gemini-1.5-flash`
- **긴 문서 처리**: `gemini-1.5-pro` (2M 컨텍스트)

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

## 트러블슈팅 가이드

이 섹션은 실제 개발 과정에서 발생했던 주요 이슈와 해결 방법을 정리한 것입니다. 같은 문제를 겪는 다른 개발자들에게 도움이 되길 바랍니다.

---

### ⚠️ 필수 확인 사항

#### 1. Google GenAI SDK 버전 문제

**증상:**
```
AttributeError: 'Client' object has no attribute 'file_search_stores'
```

**원인:** `google-genai` 버전이 1.50.0 미만

**해결:**
```bash
# 현재 버전 확인
pip show google-genai

# 1.50.0 미만이면 업그레이드
pip install --upgrade google-genai

# 백엔드 재시작
cd backend
python main.py
```

**설명:**
- File Search Store 기능은 `google-genai` 1.50.0 버전부터 지원됩니다
- 이전 버전에서는 `file_search_stores` 속성이 존재하지 않아 에러가 발생합니다
- 반드시 `pyproject.toml`에 `google-genai>=1.50.0` 명시 필요

---

#### 2. Gemini 모델 호환성 문제 (중요!)

**증상:**
```
400 INVALID_ARGUMENT
tools[0].tool_type: required one_of 'tool_type' must have one initialized field
```

**원인:** `gemini-2.0-flash-exp` 모델은 File Search Tool을 지원하지 않음

**해결:**
File Search 기능을 사용하는 모든 코드에서 모델을 `gemini-2.5-flash`로 변경:

```python
# ❌ 잘못된 코드 (File Search 미지원 모델)
client.models.generate_content(
    model="gemini-2.0-flash-exp",  # 이 모델은 File Search 미지원!
    contents=message,
    config=types.GenerateContentConfig(
        tools=[
            types.Tool(
                file_search=types.FileSearch(...)
            )
        ]
    )
)

# ✅ 올바른 코드
client.models.generate_content(
    model="gemini-2.5-flash",  # File Search 지원 모델
    contents=message,
    config=types.GenerateContentConfig(
        tools=[
            types.Tool(
                file_search=types.FileSearch(...)
            )
        ]
    )
)
```

**수정 필요 파일:**
1. `backend/file_search_manager.py` (line ~191)
2. `backend/ai_manager.py` (line ~341, ~362, ~411, ~432)

**File Search 지원 모델:**
- ✅ `gemini-2.5-flash` (권장)
- ✅ `gemini-2.5-pro`
- ✅ `gemini-1.5-pro`
- ✅ `gemini-1.5-flash`
- ❌ `gemini-2.0-flash-exp` (File Search 미지원)
- ❌ `gemini-1.0-pro` (File Search 미지원)

**중요:** 일반 채팅(File Search 미사용)은 모든 Gemini 모델 사용 가능

---

#### 3. Tool 파라미터 명명 규칙

**증상:** File Search Tool 설정 시 에러 발생

**올바른 형식:**
```python
# Python SDK는 snake_case 사용
tools=[
    types.Tool(
        file_search=types.FileSearch(  # snake_case
            file_search_store_names=[store_name]  # snake_case
        )
    )
]
```

**잘못된 형식:**
```python
# ❌ camelCase는 작동하지 않음
tools=[
    types.Tool(
        fileSearch=types.FileSearch(  # ❌
            fileSearchStoreNames=[store_name]  # ❌
        )
    )
]
```

**설명:**
- Google Gemini Python SDK는 `snake_case` 명명 규칙을 따릅니다
- REST API 문서는 `camelCase`를 사용하지만, Python SDK는 다릅니다
- 반드시 `file_search`, `file_search_store_names` 사용

---

### 🐛 일반적인 문제 해결

#### 4. File Search Store가 초기화되지 않음

**증상:** 업로드한 파일이 AI에게 전달되지 않음

**해결:**
```bash
# 백엔드 실행 로그 확인:
# 아래 메시지가 표시되어야 정상:
✅ Gemini File Search Manager 초기화 완료
✅ 새로운 File Search Store 생성: fileSearchStores/...
```

**권장사항:**
- 파일 업로드 후 문서 목록 확인 (📚 문서 관리 버튼)
- `GET /api/documents` 호출하여 문서 목록 확인
- `backend/data/file_search_metadata.json` 파일 생성 확인

#### 5. 파일 업로드 시 Operation 완료 대기 실패

**증상:**
```
'UploadToFileSearchStoreOperation' object has no attribute 'result'
```

**원인:** SDK 버전에 따라 operation 완료 확인 방법이 다름

**해결:**
```python
# ❌ 잘못된 코드
uploaded_file = operation.result()  # result() 메서드 없음

# ✅ 올바른 코드 (polling 방식)
while not operation.done:
    await asyncio.sleep(2)
    operation = await loop.run_in_executor(
        None,
        lambda: self.client.operations.get(operation)
    )

# 완료 후 response 접근
response = operation.response
file_name = response.document_name
```

**설명:**
- `operation.result()`는 지원되지 않음
- `while not operation.done` 루프로 완료 대기
- `operation.response`로 업로드 결과 접근

#### 6. API 키 설정 오류

**증상:** "API 키를 확인해주세요" 오류

**해결:**
```bash
# .env 파일 확인
cat backend/.env

# API 키가 올바른지 확인
# 잘못된 예시:
GEMINI_API_KEY=AIzaSy...  # ✅ 올바름
GEMINI_API_KEY= AIzaSy... # ❌ 앞에 공백 있음
GEMINI_API_KEY="AIzaSy..." # ❌ 따옴표 제거 필요
```

**주의사항:**
- API 키 앞뒤로 공백이 있으면 안 됩니다
- 따옴표를 사용하지 마세요
- `=` 기호 뒤에 바로 API 키 입력

#### 7. Gemini만 에러, GPT/Claude는 정상

**증상:** GPT와 Claude는 RAG 정보를 읽지만 Gemini만 에러 발생

**원인:**
1. Gemini 모델이 File Search 미지원 (→ 문제 #2 참고)
2. Tool 파라미터 명명 오류 (→ 문제 #3 참고)

**진단:**
```bash
# Gemini 일반 호출 테스트 (File Search 없이)
cd backend
python -c "
from google import genai
import os
client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))
response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents='Hello'
)
print(response.text)
"
```

일반 호출이 성공하면 → File Search 설정 문제
일반 호출도 실패하면 → API 키 또는 네트워크 문제

#### 8. RAG 검색 결과가 비어있음

**증상:** `searched_context`가 `None` 또는 빈 문자열

**원인:**
- 파일이 아직 인덱싱 중
- 질문과 관련된 내용이 문서에 없음
- 검색 쿼리가 너무 구체적

**해결:**
```python
# file_search_manager.py의 get_context() 확인
# 검색 쿼리 조정:
search_query = f"다음 질문과 관련된 정보를 문서에서 찾아서 원문 그대로 인용해주세요: {query}"

# temperature를 낮춰서 정확도 향상
config=types.GenerateContentConfig(
    temperature=0.1,  # 낮을수록 정확
    max_output_tokens=2000
)
```

**권장사항:**
- 파일 업로드 후 2-3초 대기
- 더 일반적인 질문으로 시도
- 여러 키워드로 검색 시도

#### 9. 이미지가 표시되지 않음

**해결:**
```bash
# AI 이미지 파일 경로 확인
ls frontend/public/ai_image/
# ChatGPT_Image.png
# Claude_Image.png
# Gemini_Image.png

# 프론트엔드 재시작
cd frontend
npm run dev

# 브라우저 캐시 강제 새로고침 (Ctrl+Shift+R)
```

#### 10. CORS 오류

**증상:** 프론트엔드에서 백엔드 API 호출 실패

**해결:**
```python
# backend/main.py에서 CORS 설정 확인
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 출처 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

### 🔍 디버깅 팁

#### 로그 활성화
백엔드 실행 시 자세한 로그를 확인하세요:

```bash
cd backend
python main.py
```

주요 로그 메시지:
```
✅ OpenAI (GPT) 연결 완료
✅ Anthropic (Claude) 연결 완료
✅ Google (Gemini) 연결 완료
✅ Gemini File Search Manager 초기화 완료
✅ 기존 File Search Store 로드: fileSearchStores/...
📤 File Search Store에 파일 업로드 중: ...
⏳ 파일 처리 중 (청킹, 임베딩, 인덱싱)...
✅ File Search Store에 파일 업로드 완료: ...
🔍 RAG 검색 완료 (쿼리: ...)
📝 추출된 컨텍스트: ...
```

#### 문제 발생 시 체크리스트

1. **백엔드 로그 확인**: 에러 메시지 전체 내용 확인
2. **API 키 확인**: `.env` 파일에 올바른 API 키 입력되었는지
3. **SDK 버전 확인**: `pip show google-genai` (≥ 1.50.0)
4. **모델 확인**: File Search 사용 시 `gemini-2.5-flash` 사용
5. **파일 업로드 확인**: 문서 관리 화면에서 파일 목록 확인
6. **네트워크 확인**: API 접근 가능한지 (방화벽, VPN 등)

#### 에러별 원인 진단

| 에러 메시지 | 원인 | 해결책 |
|----------|-----|------|
| `'Client' object has no attribute 'file_search_stores'` | google-genai 버전 1.50.0 미만 | `pip install --upgrade google-genai` |
| `tools[0].tool_type: required one_of...` | Gemini 모델이 File Search 미지원 | 모델을 `gemini-2.5-flash`로 변경 |
| `'UploadToFileSearchStoreOperation' object has no attribute 'result'` | operation 완료 확인 방식 오류 | `while not operation.done` 루프 사용 |
| `INVALID_ARGUMENT` | Tool 파라미터 명명 오류 | `file_search`, `file_search_store_names` 사용 |
| `API 키를 확인해주세요` | .env 파일 API 키 오류 | 공백 제거, 따옴표 제거 |

---

### 📚 참고 자료

**공식 문서:**
- [Google Gemini File Search](https://ai.google.dev/gemini-api/docs/file-search)
- [Google GenAI Python SDK](https://github.com/google/generative-ai-python)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic Claude API](https://docs.anthropic.com)

**주요 변경 사항:**
- 2025년 1월: `google-genai` 1.50.0 릴리스 (File Search Store 기능 추가)
- 2025년 1월: `gemini-2.5-flash` 모델 File Search 지원 확인

---

### 💡 개발 시 권장사항

1. **버전 고정**: `pyproject.toml`에 정확한 버전 명시
   ```toml
   google-genai>=1.50.0
   ```

2. **에러 핸들링**: File Search 오류 시 일반 모드로 폴백
   ```python
   try:
       # File Search 시도
   except Exception as e:
       print(f"File Search 오류: {e}")
       # 일반 모드로 폴백
   ```

3. **모델 검증**: File Search 사용 시 지원 모델 목록 확인
   ```python
   SUPPORTED_MODELS = ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-1.5-pro"]
   ```

4. **로그 추가**: 디버깅을 위한 상세 로그
   ```python
   print(f"🔍 File Search Store 사용: {store_name}")
   print(f"📝 추출된 컨텍스트: {searched_text[:200]}...")
   ```

---

## 기술 스택

### 백엔드
- **프레임워크**: FastAPI (비동기 웹 서버)
- **AI API**:
  - Google Gemini API (`google-genai>=1.50.0`) - File Search Store 제공
  - OpenAI API (`openai>=1.58.0`) - GPT-4o
  - Anthropic API (`anthropic>=0.42.0`) - Claude Sonnet 4
- **언어**: Python 3.11+
- **비동기 처리**: asyncio, run_in_executor
- **파일 처리**: python-multipart, Pillow

### 프론트엔드
- **프레임워크**: React 18 + TypeScript
- **빌드 도구**: Vite
- **HTTP 클라이언트**: Axios
- **마크다운 렌더링**: React Markdown
- **스타일링**: CSS Modules

### 인프라
- **RAG 시스템**: Google File Search Store (관리형 벡터 DB)
- **임베딩**: Gemini Embedding API (자동, text-embedding-004)
- **스트리밍**: Server-Sent Events (SSE)
- **데이터 저장**:
  - File Search Store (클라우드)
  - 로컬 JSON (메타데이터)

### 주요 의존성

**백엔드** (`backend/pyproject.toml`):
```toml
google-genai>=1.50.0    # File Search Store 필수
openai>=1.58.0
anthropic>=0.42.0
fastapi>=0.115.0
uvicorn>=0.32.0
```

**프론트엔드** (`frontend/package.json`):
```json
"react": "^18.3.1"
"typescript": "^5.6.2"
"vite": "^6.0.1"
"axios": "^1.7.9"
```

---

## 라이선스

MIT License

---

## 🙏 참고 자료

- [OpenAI API](https://platform.openai.com/docs)
- [Anthropic API](https://docs.anthropic.com/)
- [Gemini API](https://ai.google.dev/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
