import ollama from 'ollama'

async function main() {
  const response = await ollama.chat({
    model: 'deepseek-r1',
    messages: [{role: 'user', content: 'Hello!'}],
  })

  console.log(response.message.content)
}

main().catch(console.error)