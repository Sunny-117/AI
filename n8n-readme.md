# N8n 快速开始

本项目提供了可直接使用的 N8n 工作流示例和 Docker 启动配置。

## 快速启动

### 1. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，修改默认密码等配置。

### 2. 启动 N8n

```bash
docker-compose up -d
```

### 3. 访问 N8n

打开浏览器访问: http://localhost:5678

默认账号: `admin`
默认密码: `your_secure_password` (请修改)

## 工作流示例

### Hello World 入门
- 文件: [hello-world.json](workflows/hello-world.json)
- 功能: 最简单的 Webhook 工作流，返回 "Hello, World!"

### API 请求处理
- 文件: [example-workflow.json](workflows/example-workflow.json)
- 功能: Webhook → HTTP 请求 → 条件判断 → 返回响应

### 定时任务
- 文件: [scheduled-task.json](workflows/scheduled-task.json)
- 功能: 定时检查 GitHub 最新版本并通知

### 数据转换
- 文件: [data-transform.json](workflows/data-transform.json)
- 功能: 复杂数据转换和格式化

### API 代理
- 文件: [api-proxy.json](workflows/api-proxy.json)
- 功能: 中转 API 请求并统一响应格式

## 导入工作流

1. 在 N8n 界面点击右上角 "Import from File/URL"
2. 选择对应的 JSON 文件
3. 修改必要的配置（如 API 地址、凭证等）
4. 点击 "Import" 导入

## 常用命令

```bash
# 启动
docker-compose up -d

# 停止
docker-compose down

# 查看日志
docker-compose logs -f n8n

# 重启
docker-compose restart n8n

# 更新 N8n
docker-compose pull
docker-compose up -d
```

## 测试 Hello World 工作流

导入后，使用 curl 测试:

```bash
curl -X POST http://localhost:5678/webhook/hello \
  -H "Content-Type: application/json" \
  -d '{"name": "Ducc"}'
```

响应:
```json
{
  "message": "Hello, Ducc!",
  "name": "Ducc",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 节点参考

查看 [node-reference.js](workflows/node-reference.js) 获取常用节点类型和参数说明。

## 数据持久化

工作流数据存储在 Docker volume `n8n_data` 中，即使容器删除也不会丢失。

## 生产环境建议

1. 修改默认密码
2. 配置 HTTPS
3. 使用外部 PostgreSQL 数据库
4. 设置备份策略
5. 配置日志监控
