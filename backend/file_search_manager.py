"""
File Search Manager - Gemini File Search Store API 통합
"""

import os
import time
import json
import asyncio
from pathlib import Path
from typing import Optional, Dict, Any, List
from google import genai
from google.genai import types


class FileSearchManager:
    """Gemini File Search Store 관리자"""

    def __init__(self):
        # API 키
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY 환경 변수가 설정되지 않았습니다")

        # 클라이언트 초기화
        self.client = genai.Client(api_key=self.api_key)

        # 메타데이터 저장 경로
        self.data_dir = Path("data")
        self.data_dir.mkdir(exist_ok=True)
        self.metadata_file = self.data_dir / "file_search_metadata.json"

        # 메타데이터 로드 또는 초기화
        self.metadata = self._load_metadata()

        # File Search Store 초기화 또는 로드
        self.store = None
        self.store_name = None
        self._initialized = False

        print(f"✅ Gemini File Search Manager 초기화 완료")

    def _load_metadata(self) -> Dict[str, Any]:
        """메타데이터 파일 로드"""
        if self.metadata_file.exists():
            try:
                with open(self.metadata_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception as e:
                print(f"⚠️ 메타데이터 로드 실패: {e}")
                return {"store_name": None, "uploaded_files": []}
        return {"store_name": None, "uploaded_files": []}

    def _save_metadata(self):
        """메타데이터 파일 저장"""
        try:
            with open(self.metadata_file, 'w', encoding='utf-8') as f:
                json.dump(self.metadata, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"⚠️ 메타데이터 저장 실패: {e}")

    async def _ensure_store_initialized(self):
        """Store가 초기화되었는지 확인하고, 안되어 있으면 초기화"""
        if self._initialized:
            return

        loop = asyncio.get_event_loop()

        try:
            # 기존 store 확인
            if self.metadata.get("store_name"):
                try:
                    self.store = await loop.run_in_executor(
                        None,
                        lambda: self.client.file_search_stores.get(
                            name=self.metadata["store_name"]
                        )
                    )
                    self.store_name = self.store.name
                    print(f"✅ 기존 File Search Store 로드: {self.store_name}")
                    self._initialized = True
                    return
                except Exception as e:
                    print(f"⚠️ 기존 store 로드 실패, 새로 생성: {e}")

            # 새로운 store 생성
            self.store = await loop.run_in_executor(
                None,
                lambda: self.client.file_search_stores.create(
                    config=types.CreateFileSearchStoreConfig(
                        display_name="RAG File Search Store"
                    )
                )
            )
            self.store_name = self.store.name
            self.metadata["store_name"] = self.store_name
            self._save_metadata()

            print(f"✅ 새로운 File Search Store 생성: {self.store_name}")
            self._initialized = True

        except Exception as e:
            print(f"❌ File Search Store 초기화 실패: {e}")
            raise
    
    async def upload_file(self, file_path: str, display_name: str) -> Dict[str, Any]:
        """
        파일을 File Search Store에 업로드
        """
        try:
            # Store 초기화 확인
            await self._ensure_store_initialized()

            loop = asyncio.get_event_loop()

            # File Search Store에 파일 업로드
            print(f"📤 File Search Store에 파일 업로드 중: {display_name}")

            operation = await loop.run_in_executor(
                None,
                lambda: self.client.file_search_stores.upload_to_file_search_store(
                    file=file_path,
                    file_search_store_name=self.store_name
                )
            )

            # 업로드 완료 대기
            uploaded_file = operation.result()

            # 파일 정보 저장
            file_info = {
                'name': uploaded_file.name,
                'display_name': display_name,
                'uri': uploaded_file.uri,
                'mime_type': uploaded_file.mime_type,
                'state': str(uploaded_file.state),
                'upload_time': time.time()
            }

            # 메타데이터에 추가
            if 'uploaded_files' not in self.metadata:
                self.metadata['uploaded_files'] = []
            self.metadata['uploaded_files'].append(file_info)
            self._save_metadata()

            print(f"✅ File Search Store에 파일 업로드 완료: {uploaded_file.name}")
            print(f"   상태: {uploaded_file.state}")

            return {
                "file_name": uploaded_file.name,
                "display_name": display_name,
                "uri": uploaded_file.uri,
                "state": str(uploaded_file.state)
            }

        except Exception as e:
            raise Exception(f"파일 업로드 실패: {str(e)}")
    
    async def get_context(self, query: str, max_results: int = 5) -> Optional[Dict[str, Any]]:
        """
        File Search Store를 사용하여 쿼리와 관련된 컨텍스트 반환

        Returns:
            컨텍스트 정보 (store_name과 메타데이터 포함)
        """
        try:
            # Store 초기화 확인
            await self._ensure_store_initialized()

            uploaded_files = self.metadata.get('uploaded_files', [])
            if not uploaded_files:
                return None

            # File Search Store 정보 반환
            # (실제 검색은 AI 호출 시 Gemini가 자동으로 수행)
            return {
                "store_name": self.store_name,
                "file_count": len(uploaded_files),
                "files": uploaded_files[-max_results:]
            }

        except Exception as e:
            print(f"⚠️ 컨텍스트 검색 오류: {e}")
            return None
    
    def get_uploaded_files(self) -> List[Dict[str, Any]]:
        """업로드된 파일 목록 반환"""
        return self.metadata.get('uploaded_files', [])

    def get_store_name(self) -> Optional[str]:
        """File Search Store 이름 반환"""
        return self.store_name

    async def list_documents(self) -> Dict[str, Any]:
        """업로드된 문서 목록"""
        try:
            uploaded_files = self.metadata.get('uploaded_files', [])
            return {
                "success": True,
                "store_name": self.store_name,
                "documents": uploaded_files,
                "count": len(uploaded_files)
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "documents": [],
                "count": 0
            }

    async def delete_document(self, document_id: str) -> Dict[str, Any]:
        """문서 삭제"""
        try:
            loop = asyncio.get_event_loop()

            # File Search Store에서 파일 삭제
            await loop.run_in_executor(
                None,
                lambda: self.client.files.delete(name=document_id)
            )

            # 메타데이터에서 제거
            uploaded_files = self.metadata.get('uploaded_files', [])
            self.metadata['uploaded_files'] = [
                f for f in uploaded_files
                if f['name'] != document_id
            ]
            self._save_metadata()

            return {
                "success": True,
                "message": "문서가 File Search Store에서 삭제되었습니다",
                "document_id": document_id
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

    async def clear_all_documents(self) -> Dict[str, Any]:
        """모든 문서 삭제"""
        try:
            uploaded_files = self.metadata.get('uploaded_files', [])
            deleted_count = 0

            loop = asyncio.get_event_loop()

            for file_info in uploaded_files:
                try:
                    await loop.run_in_executor(
                        None,
                        lambda name=file_info['name']: self.client.files.delete(name=name)
                    )
                    deleted_count += 1
                except Exception as e:
                    print(f"⚠️ 파일 삭제 실패 ({file_info['name']}): {e}")

            # 메타데이터 초기화
            self.metadata['uploaded_files'] = []
            self._save_metadata()

            return {
                "success": True,
                "message": f"{deleted_count}개 문서가 삭제되었습니다",
                "deleted_count": deleted_count
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
