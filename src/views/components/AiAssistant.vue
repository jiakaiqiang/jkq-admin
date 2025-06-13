<template>
  <div class="ai-assistant-container">
    <!-- 会话操作栏 -->
    <div class="toolbar">
      <el-button @click="createNewSession" icon="el-icon-refresh-right">新建会话</el-button>
      <el-button @click="clearHistory" icon="el-icon-delete">清空历史</el-button>
    </div>

    <!-- 聊天窗口 -->
    <div class="chat-window">
      <div v-for="(message, index) in messages" :key="index" class="message-item">
        <div class="message-content">{{ message.content }}</div>
        <div class="action-buttons">
          <el-button @click="resendMessage(index)" icon="el-icon-refresh" circle></el-button>
          <el-button @click="deleteMessage(index)" icon="el-icon-delete" circle></el-button>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <el-input
        v-model="inputContent"
        type="textarea"
        :rows="4"
        placeholder="请输入内容..."
        @keyup.enter.native="sendMessage"
      />
      <el-button type="primary" @click="sendMessage" icon="el-icon-sentiment-satisfied">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      inputContent: ''
    };
  },
  methods: {
    sendMessage() {
      if (this.inputContent.trim()) {
        this.messages.push({ content: this.inputContent, timestamp: new Date() });
        this.inputContent = '';
      }
    },
    resendMessage(index) {
      // 实际应调用API重发，这里模拟更新时间
      this.messages[index].timestamp = new Date();
    },
    deleteMessage(index) {
      this.messages.splice(index, 1);
    },
    createNewSession() {
      this.messages = [];
      this.$message.success('新会话已创建');
    },
    clearHistory() {
      this.messages = [];
      this.$message.info('聊天历史已清空');
    }
  }
};
</script>

<style scoped>
.ai-assistant-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.chat-window {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
  min-height: 400px;
}

.message-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.message-content {
  flex: 1;
  word-break: break-all;
}

.action-buttons {
  margin-left: 10px;
}

.input-area {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.el-textarea {
  flex: 1;
  margin-right: 10px;
}
</style>