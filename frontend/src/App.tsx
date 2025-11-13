import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import './App.css'

const API_BASE_URL = 'http://localhost:8000'

interface Message {
  type: 'user' | 'ai' | 'system'
  content: string
  aiName?: string
  timestamp: string
  fileInfo?: any
}

interface AIResponse {
  ai_name: string
  response: string
  timestamp: string
}

interface Document {
  name: string
  display_name: string
  uri: string
  mime_type: string
  upload_time: number
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState<string>('')
  const [showDocuments, setShowDocuments] = useState(false)
  const [documents, setDocuments] = useState<Document[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 메시지 전송 (파일 업로드 포함)
  const handleSend = async () => {
    if (!input.trim() && !selectedFile) return

    const userMessage = input.trim()
    const fileToUpload = selectedFile
    
    setInput('')
    setSelectedFile(null)
    setLoading(true)

    // 파일이 있으면 먼저 업로드
    if (fileToUpload) {
      try {
        setUploadProgress('파일 업로드 중...')
        const formData = new FormData()
        formData.append('file', fileToUpload)

        await axios.post(`${API_BASE_URL}/api/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })

        setMessages(prev => [...prev, {
          type: 'system',
          content: `📎 파일 업로드 완료: ${fileToUpload.name}`,
          timestamp: new Date().toISOString()
        }])

        setUploadProgress('')
      } catch (error: any) {
        console.error('Upload error:', error)
        setMessages(prev => [...prev, {
          type: 'system',
          content: `❌ 파일 업로드 실패: ${error.response?.data?.detail || error.message}`,
          timestamp: new Date().toISOString()
        }])
        setUploadProgress('')
        setLoading(false)
        return
      }
    }

    if (!userMessage) {
      setLoading(false)
      return
    }

    // 사용자 메시지 추가
    const newUserMessage: Message = {
      type: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    }
    setMessages(prev => [...prev, newUserMessage])

    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        message: userMessage,
        include_context: true
      })

      // AI 응답들 추가
      response.data.responses.forEach((aiResp: AIResponse) => {
        setMessages(prev => [...prev, {
          type: 'ai',
          content: aiResp.response,
          aiName: aiResp.ai_name,
          timestamp: aiResp.timestamp
        }])
      })

    } catch (error: any) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        type: 'system',
        content: `❌ 오류: ${error.response?.data?.detail || error.message}`,
        timestamp: new Date().toISOString()
      }])
    } finally {
      setLoading(false)
    }
  }

  // 히스토리 초기화
  const handleClearHistory = async () => {
    if (!confirm('대화 기록을 모두 삭제하시겠습니까?')) return

    try {
      await axios.delete(`${API_BASE_URL}/api/history`)
      setMessages([])
    } catch (error) {
      console.error('Clear history error:', error)
    }
  }

  // 문서 목록 불러오기
  const loadDocuments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/documents`)
      if (response.data.success) {
        setDocuments(response.data.documents)
      }
    } catch (error) {
      console.error('Load documents error:', error)
    }
  }

  // 문서 삭제
  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm('이 문서를 삭제하시겠습니까?')) return

    try {
      await axios.delete(`${API_BASE_URL}/api/documents/${encodeURIComponent(documentId)}`)
      setMessages(prev => [...prev, {
        type: 'system',
        content: `🗑️ 문서 삭제 완료`,
        timestamp: new Date().toISOString()
      }])
      loadDocuments()
    } catch (error: any) {
      console.error('Delete document error:', error)
      alert(`문서 삭제 실패: ${error.response?.data?.error || error.message}`)
    }
  }

  // 모든 문서 삭제
  const handleClearAllDocuments = async () => {
    if (!confirm('모든 문서를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) return

    try {
      const response = await axios.delete(`${API_BASE_URL}/api/documents`)
      setMessages(prev => [...prev, {
        type: 'system',
        content: `🗑️ ${response.data.message}`,
        timestamp: new Date().toISOString()
      }])
      loadDocuments()
    } catch (error: any) {
      console.error('Clear all documents error:', error)
      alert(`문서 삭제 실패: ${error.response?.data?.error || error.message}`)
    }
  }

  // 문서 관리 모달 열기
  const handleOpenDocuments = () => {
    loadDocuments()
    setShowDocuments(true)
  }

  // AI 이미지 매핑
  const getAIImage = (aiName: string) => {
    const imageMap: Record<string, string> = {
      'GPT': '/app/ai_image/ChatGPT_Image.png',
      'Claude': '/app/ai_image/Claude_Image.png',
      'Gemini': '/app/ai_image/Gemini_Image.png'
    }
    return imageMap[aiName] || ''
  }

  // AI 색상 매핑
  const getAIColor = (aiName: string) => {
    const colorMap: Record<string, string> = {
      'GPT': '#10a37f',
      'Claude': '#cc785c',
      'Gemini': '#4285f4'
    }
    return colorMap[aiName] || '#666'
  }

  return (
    <div className="app-container">
      {/* 헤더 */}
      <header className="header">
        <h1>✨ Trinity AI Friend</h1>
        <div className="header-buttons">
          <button onClick={handleOpenDocuments} className="docs-btn">
            📚 문서 관리
          </button>
          <button onClick={handleClearHistory} className="clear-btn">
            🗑️ 대화 초기화
          </button>
        </div>
      </header>

      {/* 문서 관리 모달 */}
      {showDocuments && (
        <div className="modal-overlay" onClick={() => setShowDocuments(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📚 업로드된 문서</h2>
              <button onClick={() => setShowDocuments(false)} className="modal-close">❌</button>
            </div>
            <div className="modal-body">
              {documents.length === 0 ? (
                <p className="no-documents">업로드된 문서가 없습니다.</p>
              ) : (
                <>
                  <div className="documents-list">
                    {documents.map((doc, idx) => (
                      <div key={idx} className="document-item">
                        <div className="document-info">
                          <div className="document-name">📄 {doc.display_name}</div>
                          <div className="document-meta">
                            {doc.mime_type} • {new Date(doc.upload_time * 1000).toLocaleString('ko-KR')}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteDocument(doc.name)}
                          className="delete-doc-btn"
                        >
                          🗑️ 삭제
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="modal-footer">
                    <button onClick={handleClearAllDocuments} className="clear-all-btn">
                      🗑️ 모든 문서 삭제
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="main-content">
        {/* 왼쪽: AI 응답 패널들 */}
        <div className="ai-panels">
          {['GPT', 'Claude', 'Gemini'].map(aiName => {
            const latestResponse = [...messages]
              .reverse()
              .find(m => m.type === 'ai' && m.aiName === aiName)

            return (
              <div key={aiName} className="ai-panel" style={{ borderColor: getAIColor(aiName) }}>
                <div className="ai-header">
                  <img src={getAIImage(aiName)} alt={aiName} className="ai-avatar" />
                  <div className="ai-name-tag">
                    <h3 style={{ color: getAIColor(aiName) }}>{aiName}</h3>
                  </div>
                </div>
                <div className="ai-response">
                  {latestResponse ? (
                    <ReactMarkdown>{latestResponse.content}</ReactMarkdown>
                  ) : (
                    <p className="placeholder">대기 중...</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* 오른쪽: 대화 히스토리 */}
        <div className="chat-history">
          <h3>💬 대화 히스토리</h3>
          <div className="history-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`history-message ${msg.type}`}>
                {msg.type === 'user' && (
                  <div className="user-message">
                    <div className="message-header">
                      <span className="sender-badge user-badge">👤 You</span>
                      <span className="timestamp">
                        {new Date(msg.timestamp).toLocaleTimeString('ko-KR')}
                      </span>
                    </div>
                    <div className="message-content">{msg.content}</div>
                  </div>
                )}
                {msg.type === 'ai' && (
                  <div className="ai-message" style={{ borderLeftColor: getAIColor(msg.aiName!) }}>
                    <div className="message-header">
                      <span className="sender-badge ai-badge" style={{ backgroundColor: getAIColor(msg.aiName!) }}>
                        🤖 {msg.aiName}
                      </span>
                      <span className="timestamp">
                        {new Date(msg.timestamp).toLocaleTimeString('ko-KR')}
                      </span>
                    </div>
                    <div className="message-content">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                )}
                {msg.type === 'system' && (
                  <div className="system-message">
                    <div className="message-header">
                      <span className="sender-badge system-badge">⚙️ System</span>
                      <span className="timestamp">
                        {new Date(msg.timestamp).toLocaleTimeString('ko-KR')}
                      </span>
                    </div>
                    <div className="message-content">{msg.content}</div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* 입력 영역 */}
      <div className="input-area">
        <div className="input-container">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            accept=".pdf,.docx,.txt,.json,.png,.jpg,.jpeg"
            style={{ display: 'none' }}
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="file-btn"
            title="파일 첨부 (전송 시 업로드)"
            disabled={loading}
          >
            📎
          </button>

          {selectedFile && (
            <span className="file-preview">
              📄 {selectedFile.name}
              <button onClick={() => setSelectedFile(null)} className="file-remove">❌</button>
            </span>
          )}

          {uploadProgress && <span className="upload-progress">{uploadProgress}</span>}

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
            placeholder="메시지 입력... (@GPT, @Claude, @Gemini로 AI 지명 가능)"
            disabled={loading}
            className="message-input"
          />

          <button
            onClick={handleSend}
            disabled={loading || (!input.trim() && !selectedFile)}
            className="send-btn"
          >
            {loading ? '⏳' : '📤'}
          </button>
        </div>

        <div className="input-hint">
          💡 @GPT, @Claude, @Gemini로 AI 지명 가능 | 📎 파일은 전송 시 업로드됩니다
        </div>
      </div>
    </div>
  )
}

export default App
