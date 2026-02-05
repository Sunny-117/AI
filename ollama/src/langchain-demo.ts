import { ChatOllama } from '@langchain/ollama'
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages'

// 创建 Ollama 模型实例
const llm = new ChatOllama({
  model: 'deepseek-r1',
  baseUrl: 'http://localhost:11434', // Ollama 默认地址
  temperature: 0.7, // 温度参数，控制随机性
  maxRetries: 2,
})

async function main() {
  console.log('🚀 开始调用 deepseek-r1 模型...\n')

  // 示例 1: 简单对话
  console.log('--- 示例 1: 简单对话 ---')
  const message = new HumanMessage('用一句话介绍 TypeScript')
  const response = await llm.invoke([message])
  console.log('回答:', response.content)
  console.log()

  // 示例 2: 流式输出
  console.log('--- 示例 2: 流式输出 ---')
  const stream = await llm.stream([new HumanMessage('写一个 Python Hello World 示例')])
  process.stdout.write('回答: ')
  for await (const chunk of stream) {
    process.stdout.write(chunk.content)
  }
  console.log('\n')

  // 示例 3: 多轮对话
  console.log('--- 示例 3: 多轮对话 ---')
  const chatHistory = [
    { role: 'system', content: '你是一个友好的编程助手。' },
    { role: 'user', content: '什么是 React？' },
    { role: 'assistant', content: 'React 是一个用于构建用户界面的 JavaScript 库。' },
    { role: 'user', content: '它有哪些主要特点？' },
  ]
  const chatResponse = await llm.invoke(chatHistory.map(msg => {
    switch (msg.role) {
      case 'system':
        return new SystemMessage(msg.content)
      case 'assistant':
        return new AIMessage(msg.content)
      case 'user':
        return new HumanMessage(msg.content)
      default:
        return new HumanMessage(msg.content)
    }
  }))
  console.log('回答:', chatResponse.content)
}

main().catch(console.error)
