// 创建带超时的 fetch 请求
function fetchWithTimeout(url: string, options: RequestInit, timeout = 30000): Promise<Response> {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    fetch(url, {
      ...options,
      signal: controller.signal
    })
    .then(resolve)
    .catch(reject)
    .finally(() => clearTimeout(timeoutId));
  });
}

// 重试机制
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3): Promise<any> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`尝试第 ${i + 1} 次请求...`);
      const response = await fetchWithTimeout(url, options);
      return await response.json();
    } catch (error) {
      console.error(`第 ${i + 1} 次请求失败:`, error);
      if (i === maxRetries - 1) {
        throw error;
      }
      // 等待一段时间后重试
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

export async function aiTransolteForm(content: any) {
  try {
    console.log('开始处理内容:', content, typeof content);
    let contentData = content.join(',');
    console.log('格式化后的内容:', contentData);
    //整个字符串只将前后的单引号转成双引号
    contentData = contentData.replace(/^'|'$/g, '"');


    const form = {
      "bot_id": "7584651573507325987",
      "user_id": "123456789",
      "stream": true,
      "additional_messages": [
        {
          "content":"测试中文,测试英文",
          "content_type": "text",
          "role": "user",
          "type": "question"
        }
      ],
      "parameters": {}
    };
     console.log(form,'jkqform')
    const responseData = await fetchWithRetry('https://api.coze.cn/v3/chat', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer pat_ElbsgCxI3610IxjFP0jbT4hRLSA9bPlrepKoAcqk5K8YP9VrDFz1jsRamCzlyXzs'
      }
    }, 3);
    
    console.log('API 响应成功:', responseData);
    return responseData;
  } catch (error) {
    console.error('AI 翻译请求失败:', error);
    
    // 根据错误类型提供不同的处理建议
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
      console.error('网络连接失败，请检查：');
      console.error('1. 网络连接是否正常');
      console.error('2. 是否需要配置代理');
      console.error('3. 防火墙是否阻止了外部请求');
      console.error('4. API 服务器是否可用');
    }
    
    // 返回错误信息而不是抛出异常，避免影响构建过程
    return { error: true, message: error.message };
  }
}