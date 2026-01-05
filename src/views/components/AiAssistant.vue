<template>
  <div class="ai-assistant-container">
    <div class="toolbar">
      <div class="left">
        <el-button size="small" @click="createNewSession" :disabled="isGenerating">新建会话</el-button>
        <el-button size="small" @click="clearHistory" :disabled="isGenerating">清空历史</el-button>
      </div>
    </div>

    <div class="chat-window" ref="chatWindowRef">
      <div v-for="(message, index) in messages" :key="index" class="message-item" :class="message.role">
        <!-- <div class="avatar">{{ message.role === 'user' ? '我' : 'AI' }}</div> -->
        <div class="message-body">
          <div class="message-content" v-html="renderMessage(message.content)"></div>
          <div class="message-tools" v-if="message.role === 'assistant'">
            <el-button text size="small" @click="retryFrom(index)" :disabled="isGenerating">重新回答</el-button>
            <el-button text size="small" @click="copyToClipboard(message.content)">复制</el-button>
          </div>
        </div>
        
      </div>
      <div v-if="isGenerating" class="message-item assistant">
        <div class="avatar">AI</div>
        <div class="message-body">
          <div class="typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
        </div>
      </div>
    </div>

    <div class="input-area">
      <el-input v-model="inputContent" type="textarea" :rows="3" placeholder="请输入内容，回车发送，Shift+Enter换行"
        @keydown.enter.exact.prevent="sendMessage" @keydown.enter.shift.stop />
      <div class="input-actions">
        <el-button type="primary" :disabled="!canSend" @click="sendMessage">发送</el-button>
        <el-button :disabled="!isGenerating" @click="handleStop">停止</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { marked } from 'marked'

type Role = 'user' | 'assistant'
interface ChatMessage { role: Role; content: string }

const messages = ref<ChatMessage[]>([])
const inputContent = ref('')
const isGenerating = ref(false)
const chatWindowRef = ref<HTMLElement>()
let abortController: AbortController | null = null

const canSend = computed(() => !isGenerating.value && inputContent.value.trim().length > 0)
const canRegenerate = computed(() => messages.value.length >= 1)

//只支持ai助手
const sendMessageContent = async (userText: string) => { 
  isGenerating.value = true
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer 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`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'openai/gpt-4o',
    messages: [{ role: 'user', content:userText  }],
    stream: true,
  }),
});
console.log(response,'response')
const reader = response.body?.getReader();
if (!reader) {
  throw new Error('Response body is not readable');
}

const assistantMsg: ChatMessage = { role: 'assistant', content: '' }

const decoder = new TextDecoder();
let buffer = '';

try {
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Append new chunk to buffer
    buffer += decoder.decode(value, { stream: true });

    // Process complete lines from buffer
    while (true) {
      const lineEnd = buffer.indexOf('\n');
      if (lineEnd === -1) break;

      const line = buffer.slice(0, lineEnd).trim();
      buffer = buffer.slice(lineEnd + 1);

      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') break;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices[0].delta.content;
          if (content) {
            assistantMsg.content += content
            
          }
        } catch (e) {
          // Ignore invalid JSON
        }
      }
    }
  }
} finally {
  messages.value.push(assistantMsg)
  isGenerating.value = false
  reader.cancel();
}

}



function renderMessage(text: string) {
  try {
    return marked.parse(text)
  } catch {
    return text
  }
}

function scrollToBottom() {
  nextTick(() => {
    const el = chatWindowRef.value
    if (el) el.scrollTop = el.scrollHeight
  })
}

async function sendMessage() {
  if (!canSend.value) return
  const userText = inputContent.value.trim()
  if (!userText) return
  messages.value.push({ role: 'user', content: userText })

  scrollToBottom()
  sendMessageContent(userText)
    inputContent.value = ''
}



function handleStop() { if (abortController) abortController.abort() }


function retryFrom(index: number) {
  if (isGenerating.value) return
  messages.value = messages.value.slice(0, index)
  sendMessageContent(messages.value[messages.value.length - 1].content)
 
}

function createNewSession() { if (isGenerating.value) return; messages.value = []; ElMessage.success('新会话已创建') }
function clearHistory() { if (isGenerating.value) return; messages.value = []; ElMessage.info('聊天历史已清空') }
function copyToClipboard(text: string) { navigator.clipboard?.writeText(text); ElMessage.success('内容已复制') }






</script>

<style scoped>
.ai-assistant-container {
  padding: 16px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar .left,
.toolbar .right {
  display: flex;
  gap: 8px;
}

.chat-window {
  border: 1px solid #ebeef5;
  border-radius: 6px;
  padding: 14px;
  min-height: 420px;
  max-height: 60vh;
  overflow: auto;
  background: var(--el-bg-color, #fff);
}

.message-item {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}

.message-item .avatar {
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #409eff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.message-item.user .avatar {
  background: #67c23a;
}

.message-body {
  flex: 1;
}

.message-content {
  white-space: pre-wrap;
  word-break: break-word;
}

.message-tools {
  margin-top: 6px;
  display: flex;
  gap: 8px;
}

.message-actions {
  display: flex;
  align-items: start;
}

.typing {
  display: inline-flex;
  gap: 4px;
  padding: 6px 0;
}

.typing .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #909399;
  opacity: .6;
  animation: blink 1.4s infinite ease-in-out both;
}

.typing .dot:nth-child(2) {
  animation-delay: .2s;
}

.typing .dot:nth-child(3) {
  animation-delay: .4s;
}

@keyframes blink {

  0%,
  80%,
  100% {
    opacity: .2
  }

  40% {
    opacity: 1
  }
}

.input-area {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}

.input-actions {
  display: flex;
  gap: 8px;
}

.el-textarea {
  flex: 1;
}
</style>
