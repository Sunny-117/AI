## LLM 相对落地的场景

### 个人开发者

Prompt工程

- 前端专家,我可以优化一些Prompt,然后使用者,就能够通过我的这个应用,更好地咨询前端问题。

怎么设计 Prompt，根据上下文做对应调整

> 现在你作为专业HR,帮我提供简历咨询服务,针对于前端开发高级岗位给定详细简历描述与优化建议。

#### 应用场景

- 写作助手
- 学习辅助
- 代码补全

### 小型团队、创业公司

- 客服机器人（RAG）
- 内容生成工具:产品发布,changelog(发布日志)
- 数据报告和分析:我想看xxx样的数据变化趋势

### 大型企业

- 现有业务集成,比如在飞书云表格接入AI,自动生成业务向数据表与仪表盘
- AI开发平台,(1网关平台、2数据开发平台【hadoop、hive、达梦】、3大数据离线开发平台、4实时计算【flume】、5算法平台【算法包和算法流程编排】)

### 跨行业应用
Saas公司,想办法将自己的业务接入AI
####医疗
疾病预测
AI分析患者数据(美年大健康)

##### 教育
智能助教
-数据预测

## AI 应用核心概念

### 训练

需要大量的数据来进行训练,并且这个数据一定要是领域据

### 模型

通过大量数据训练除了模型,标注

### Prompt 优化

### 输出

## AI应用开发流程

AI开发平台,能够极度简化AI的开发流程,降低开发成本。跟搭积木一样简单

- AI工作流编排引擎(React-Flow、Vue-Flow、X2)
- RAG管道
- Agent功能
- 模型管理(模型来自于模型供应商(Model Provider)【openAI、文心一言、通义、豆包】)
- 丰富节点接入

## SSE EventSource 流式数据读取实现

### 什么是SSE

Server-Sent Events (SSE) 是一种服务器向客户端推送实时数据的技术。与WebSocket不同，SSE是单向通信的，只允许服务器向客户端发送数据。

### 实现示例

我们创建了一个React组件 `SSEStreamReader` 来实现SSE流式数据读取功能。这个组件可以:
- 建立和关闭SSE连接
- 接收并展示流式数据
- 提供回调函数处理接收到的数据

### 使用方法

```tsx
import SSEStreamReader from './sseStream.tsx';

const App = () => {
  const handleDataReceived = (data: string) => {
    console.log('Received data:', data);
    // 这里可以添加自定义的数据处理逻辑
  };

  return (
    <div>
      <h1>SSE 流式数据读取示例</h1>
      <SSEStreamReader 
        apiUrl="http://your-sse-api-url.com/stream"
        onDataReceived={handleDataReceived}
      />
    </div>
  );
};

 export default App;
```

### 组件特性

1. 自动重连机制
2. 连接状态管理
3. 数据累积展示
4. 自定义数据处理回调

### 注意事项

1. SSE连接默认会在30秒无活动后自动断开，需要服务器端设置适当的心跳机制
2. 浏览器对并发SSE连接数量有限制(通常为6个)
3. 对于双向通信需求，应考虑使用WebSocket

需求：我给AI说,我现在要搭建一个表单页面,包含采集用户的用户名、年龄、性别,请帮我输出对应页面的DSL json

