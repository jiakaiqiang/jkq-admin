<template>
  <div class="ai-assistant-container">
    <div class="toolbar">
      <div class="left">
        <el-button size="small" @click="createNewSession" :disabled="isGenerating">新建会话</el-button>
        <el-button size="small" @click="clearHistory" :disabled="isGenerating">清空历史</el-button>
      </div>
      <div class="right">
        <el-button size="small" @click="handleRegenerate" :disabled="isGenerating || !canRegenerate">重新生成</el-button>
        <el-button size="small" type="danger" @click="handleStop" :disabled="!isGenerating">停止</el-button>
      </div>
    </div>

    <div class="chat-window" ref="chatWindowRef">
      <div v-for="(message, index) in messages" :key="index" class="message-item" :class="message.role">
        <div class="avatar">{{ message.role === 'user' ? '我' : 'AI' }}</div>
        <div class="message-body">
          <div class="message-content" v-html="renderMessage(message.content)"></div>
          <div class="message-tools" v-if="message.role === 'assistant'">
            <el-button text size="small" @click="retryFrom(index)" :disabled="isGenerating">重新回答</el-button>
            <el-button text size="small" @click="copyToClipboard(message.content)">复制</el-button>
          </div>
        </div>
        <div class="message-actions">
          <el-button @click="deleteMessage(index)" icon="el-icon-delete" circle :disabled="isGenerating"></el-button>
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
      <el-input
        v-model="inputContent"
        type="textarea"
        :rows="3"
        placeholder="请输入内容，回车发送，Shift+Enter换行"
        @keydown.enter.exact.prevent="sendMessage"
        @keydown.enter.shift.stop
      />
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
  inputContent.value = ''
  scrollToBottom()
  await generateAssistantReply()
}

async function generateAssistantReply() {
  isGenerating.value = true
  abortController = new AbortController()
  const assistantMsg: ChatMessage = { role: 'assistant', content: '' }
  messages.value.push(assistantMsg)
  scrollToBottom()
  try {
    // 本地模拟流式输出
    const mockText = mockAnswer(messages.value)
    for (let i = 0; i < mockText.length; i++) {
      if (abortController?.signal.aborted) throw new Error('aborted')
      assistantMsg.content += mockText[i]
      await sleep(16)
      if (i % 4 === 0) scrollToBottom()
    }
  } catch (err: any) {
    if (err?.message !== 'aborted') ElMessage.error('生成失败，请重试')
  } finally {
    isGenerating.value = false
    abortController = null
    scrollToBottom()
  }
}

function handleStop() { if (abortController) abortController.abort() }

async function handleRegenerate() {
  if (isGenerating.value) return
  if (messages.value[messages.value.length - 1]?.role === 'assistant') messages.value.pop()
  await generateAssistantReply()
}

function retryFrom(index: number) {
  if (isGenerating.value) return
  messages.value = messages.value.slice(0, index)
  generateAssistantReply()
}

function deleteMessage(index: number) { if (isGenerating.value) return; messages.value.splice(index, 1) }
function createNewSession() { if (isGenerating.value) return; messages.value = []; ElMessage.success('新会话已创建') }
function clearHistory() { if (isGenerating.value) return; messages.value = []; ElMessage.info('聊天历史已清空') }
function copyToClipboard(text: string) { navigator.clipboard?.writeText(text); ElMessage.success('内容已复制') }
function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }
function mockAnswer(history: ChatMessage[]): string {
  const lastUser = [...history].reverse().find(m => m.role === 'user')
  const base = lastUser?.content || '你好！请问需要什么帮助？'
  return `这是基于你的问题的回答：\n\n${base}\n\n- 这是要点1\n- 这是要点2\n\n示例代码：\n\n\`\`\`ts\nfunction add(a: number, b: number) {\n  return a + b\n}\n\`\`\`\n\n如需我重新生成，请点击上方“重新生成”。`
}


</script>

<style scoped>
.ai-assistant-container { padding: 16px; max-width: 90vw; display: flex; flex-direction: column; gap: 12px; }
.toolbar { display: flex; justify-content: space-between; align-items: center; }
.toolbar .left, .toolbar .right { display: flex; gap: 8px; }
.chat-window { border: 1px solid #ebeef5; border-radius: 6px; padding: 14px; min-height: 420px; max-height: 60vh; overflow: auto; background: var(--el-bg-color, #fff); }
.message-item { display: flex; gap: 10px; margin-bottom: 14px; }
.message-item .avatar { flex: 0 0 32px; width: 32px; height: 32px; border-radius: 50%; background: #409eff; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; }
.message-item.user .avatar { background: #67c23a; }
.message-body { flex: 1; }
.message-content { white-space: pre-wrap; word-break: break-word; }
.message-tools { margin-top: 6px; display: flex; gap: 8px; }
.message-actions { display: flex; align-items: start; }
.typing { display: inline-flex; gap: 4px; padding: 6px 0; }
.typing .dot { width: 6px; height: 6px; border-radius: 50%; background: #909399; opacity: .6; animation: blink 1.4s infinite ease-in-out both; }
.typing .dot:nth-child(2) { animation-delay: .2s; }
.typing .dot:nth-child(3) { animation-delay: .4s; }
@keyframes blink { 0%, 80%, 100% { opacity: .2 } 40% { opacity: 1 } }
.input-area { display: flex; gap: 10px; align-items: flex-end; }
.input-actions { display: flex; gap: 8px; }
.el-textarea { flex: 1; }
</style>

