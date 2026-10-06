<template>
  <div class="chat-container">
    <div class="chat-header">
      <div class="chat-header-info">
        <div class="chat-avatar">MiMo</div>
        <div>
          <strong>MiMo AI</strong>
          <small>Xiaomi MiMo-V2.5-Pro</small>
        </div>
      </div>
      <button class="chat-clear" @click="clearChat" title="Hapus percakapan">🗑</button>
    </div>

    <div class="chat-messages" ref="messagesRef">
      <div v-for="(msg, i) in messages" :key="i" class="chat-msg" :class="msg.role">
        <div class="chat-msg-content">{{ msg.content }}</div>
      </div>
      <div v-if="loading && !streaming" class="chat-msg assistant">
        <div class="chat-msg-content typing">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>

    <form class="chat-input" @submit.prevent="sendMessage">
      <input
        v-model="input"
        type="text"
        placeholder="Ketik pesan..."
        :disabled="loading"
        autocomplete="off"
      />
      <button type="submit" :disabled="loading || !input.trim()">
        {{ loading ? '...' : '→' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'

const input = ref('')
const messages = ref([])
const loading = ref(false)
const streaming = ref(false)
const messagesRef = ref(null)

function scrollToBottom() {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

function clearChat() {
  messages.value = []
}

async function sendMessage() {
  const text = input.value.trim()
  if (!text || loading.value) return

  messages.value.push({ role: 'user', content: text })
  input.value = ''
  loading.value = true
  scrollToBottom()

  try {
    await streamMessage()
  } catch (err) {
    console.error('Chat error:', err)
    messages.value.push({
      role: 'assistant',
      content: 'Terjadi kesalahan. Silakan coba lagi.'
    })
  } finally {
    loading.value = false
    streaming.value = false
    scrollToBottom()
  }
}

async function streamMessage() {
  streaming.value = true
  const assistantMsg = { role: 'assistant', content: '' }
  messages.value.push(assistantMsg)

  const response = await fetch('/api/chat/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'text/event-stream' },
    body: JSON.stringify({
      messages: messages.value
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({ role: m.role, content: m.content }))
    })
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop()

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || !trimmed.startsWith('data: ')) continue

      const data = trimmed.slice(6)
      if (data === '[DONE]') return

      try {
        const json = JSON.parse(data)
        if (json.error) throw new Error(json.error)
        if (json.content) {
          assistantMsg.content += json.content
          scrollToBottom()
        }
      } catch (e) {
        if (e.message !== 'Stream error') continue
        throw e
      }
    }
  }
}

onMounted(scrollToBottom)
</script>

<style scoped>
.chat-container {
  width: 100%;
  max-width: 520px;
  height: 600px;
  display: flex;
  flex-direction: column;
  border: 1px solid #2d2d3d;
  background: #0d0d1a;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  background: #0078d4;
  color: #fff;
}

.chat-header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-header-info small {
  display: block;
  opacity: .7;
  font-size: 11px;
}

.chat-avatar {
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,.15);
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 700;
}

.chat-clear {
  background: rgba(255,255,255,.1);
  border: none;
  color: #fff;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: 16px;
}

.chat-clear:hover {
  background: rgba(255,255,255,.2);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-msg {
  max-width: 85%;
  padding: 10px 14px;
  font-size: 13px;
  line-height: 1.6;
  word-break: break-word;
}

.chat-msg.user {
  align-self: flex-end;
  background: #0078d4;
  color: #fff;
}

.chat-msg.assistant {
  align-self: flex-start;
  background: #1a1a2e;
  color: #e4e4e4;
  border-left: 3px solid #0078d4;
}

.typing {
  display: flex;
  gap: 4px;
  padding: 8px 4px;
}

.typing span {
  width: 6px;
  height: 6px;
  background: #555;
  animation: blink 1.2s infinite;
}

.typing span:nth-child(2) { animation-delay: .2s; }
.typing span:nth-child(3) { animation-delay: .4s; }

@keyframes blink {
  0%, 60%, 100% { opacity: .3; }
  30% { opacity: 1; }
}

.chat-input {
  display: flex;
  border-top: 1px solid #2d2d3d;
}

.chat-input input {
  flex: 1;
  padding: 14px 18px;
  background: #0d0d1a;
  border: none;
  color: #fff;
  font-size: 14px;
  outline: none;
}

.chat-input input::placeholder {
  color: #555;
}

.chat-input button {
  width: 56px;
  background: #0078d4;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

.chat-input button:hover {
  background: #1a86d9;
}

.chat-input button:disabled {
  opacity: .5;
  cursor: not-allowed;
}
</style>