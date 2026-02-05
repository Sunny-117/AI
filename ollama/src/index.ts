import ollama from 'ollama'

async function main() {
  const response = await ollama.chat({
    model: 'deepseek-r1',
    messages: [{role: 'user', content: 'Rust 学习路线（适合快速 3 天入门）'}],
    stream: true
  })

  for await (const chunk of response) {
    process.stdout.write(chunk.message.content)
  }
}

main().catch(console.error)