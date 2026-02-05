/**
 * N8n 常用节点类型速查表
 */

// ============ 触发器节点 ============

/**
 * Webhook 触发器 - 接收 HTTP 请求
 */
{
  "type": "n8n-nodes-base.webhook",
  "parameters": {
    "httpMethod": "POST",        // GET, POST, PUT, DELETE
    "path": "webhook-path",       // URL 路径
    "authentication": "headerAuth", // 认证方式
    "responseMode": "responseNode"  // 响应方式
  }
}

/**
 * 定时触发器 - 按计划执行
 */
{
  "type": "n8n-nodes-base.scheduleTrigger",
  "parameters": {
    "rule": {
      "interval": [
        {
          "field": "hours",       // minutes, hours, days, weeks, months
          "hoursInterval": 1      // 间隔值
        }
      ]
    }
  }
}

/**
 * 手动触发器 - 点击执行
 */
{
  "type": "n8n-nodes-base.manualTrigger",
  "parameters": {}
}

// ============ 数据处理节点 ============

/**
 * Set 节点 - 设置/修改数据
 */
{
  "type": "n8n-nodes-base.set",
  "parameters": {
    "values": {
      "string": [
        { "name": "key1", "value": "固定值" },
        { "name": "key2", "value": "={{ $json.field }}" },  // 引用输入数据
        { "name": "key3", "value": "={{ $now }}" },         // 当前时间
        { "name": "key4", "value": "={{ $json.id + 100 }}" } // 表达式计算
      ]
    }
  }
}

/**
 * Code 节点 - JavaScript 代码处理
 */
{
  "type": "n8n-nodes-base.code",
  "parameters": {
    "jsCode": `
// 获取所有输入数据
const items = $input.all();

// 处理数据
const results = items.map(item => {
  return {
    json: {
      ...item.json,              // 保留原始数据
      processed: true,           // 添加新字段
      timestamp: new Date().toISOString()
    }
  };
});

// 返回处理结果
return results;
    `
  }
}

/**
 * Function 节点 - 函数式处理 (更简洁)
 */
{
  "type": "n8n-nodes-base.function",
  "parameters": {
    "functionCode": `
return items.map(item => {
  return {
    json: {
      id: item.json.id,
      name: item.json.name.toUpperCase(),
      timestamp: new Date().getTime()
    }
  };
});
    `
  }
}

/**
 * Function Item 节点 - 逐项处理
 */
{
  "type": "n8n-nodes-base.functionItem",
  "parameters": {
    "functionCode": `
return {
  json: {
    original: $input.item.json,
    processed: true
  }
};
    `
  }
}

// ============ 条件与流程控制 ============

/**
 * IF 节点 - 条件判断
 */
{
  "type": "n8n-nodes-base.if",
  "parameters": {
    "conditions": {
      "number": [
        {
          "value1": "={{ $json.count }}",
          "operation": "larger",      // equals, notEquals, smaller, larger, exists
          "value2": 10
        }
      ],
      "string": [
        {
          "value1": "={{ $json.status }}",
          "operation": "equals",
          "value2": "success"
        }
      ]
    }
  }
}

/**
 * Switch 节点 - 多分支判断
 */
{
  "type": "n8n-nodes-base.switch",
  "parameters": {
    "rules": {
      "values": [
        {
          "conditions": {
            "string": [
              {
                "value1": "={{ $json.type }}",
                "operation": "equals",
                "value2": "user"
              }
            ]
          },
          "renameOutput": true,
          "outputKey": "用户"
        },
        {
          "conditions": {
            "string": [
              {
                "value1": "={{ $json.type }}",
                "operation": "equals",
                "value2": "admin"
              }
            ]
          },
          "renameOutput": true,
          "outputKey": "管理员"
        }
      ]
    },
    "fallbackOutput": "其他"
  }
}

/**
 * Merge 节点 - 合并数据流
 */
{
  "type": "n8n-nodes-base.merge",
  "parameters": {
    "mode": "combine",          // combine: 合并, append: 追加, passThrough: 传递
    "combineBy": "combineAll"   // combineBy: 合并所有字段
  }
}

// ============ HTTP 请求节点 ============

/**
 * HTTP Request 节点 - 发送 HTTP 请求
 */
{
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "method": "GET",            // GET, POST, PUT, DELETE, PATCH
    "url": "https://api.example.com/users",
    "authentication": "predefinedCredentialType",
    "nodeCredentialType": "httpHeaderAuth",
    "sendHeaders": true,
    "headerParameters": {
      "parameters": [
        { "name": "Authorization", "value": "Bearer {{ $token }}" },
        { "name": "Content-Type", "value": "application/json" }
      ]
    },
    "sendBody": true,
    "bodyParameters": {
      "parameters": [
        { "name": "name", "value": "test user" },
        { "name": "email", "value": "test@example.com" }
      ]
    },
    "options": {
      "timeout": 5000,
      "response": {
        "response": {
          "fullResponse": false,    // 只返回 body
          "neverError": true       // 非 2xx 状态不报错
        }
      }
    }
  }
}

// ============ 常用工具节点 ============

/**
 * JSON 转换
 */
{
  "type": "n8n-nodes-base.convertToFile",
  "parameters": {
    "fileFormat": "json",
    "options": {}
  }
}

/**
 * XML 转换
 */
{
  "type": "n8n-nodes-base.xml",
  "parameters": {
    "mode": "xmlToJson",        // xmlToJson 或 jsonToXml
    "sourceProperty": "data"
  }
}

/**
 * Base64 编码/解码
 */
{
  "type": "n8n-nodes-base.convertToFile",
  "parameters": {
    "fileFormat": "base64",
    "operation": "toBase64"     // toBase64 或 fromBase64
  }
}

// ============ 数据库节点 ============

/**
 * MySQL 节点
 */
{
  "type": "n8n-nodes-base.mySql",
  "parameters": {
    "operation": "executeQuery",  // executeQuery, insert, update, delete
    "query": "SELECT * FROM users WHERE status = :status",
    "parameters": {
      "parameters": [
        { "name": "status", "value": "active" }
      ]
    }
  }
}

/**
 * PostgreSQL 节点
 */
{
  "type": "n8n-nodes-base.postgres",
  "parameters": {
    "operation": "executeQuery",
    "query": "SELECT * FROM orders WHERE created_at > :date",
    "parameters": {
      "parameters": [
        { "name": "date", "value": "={{ $now }}" }
      ]
    }
  }
}

/**
 * MongoDB 节点
 */
{
  "type": "n8n-nodes-base.mongoDb",
  "parameters": {
    "operation": "find",
    "collection": "users",
    "query": "={ \"status\": \"active\" }"
  }
}

// ============ 表达式速查 ============

/*
$now          - 当前时间戳
$json         - 当前项的 JSON 数据
$binary       - 二进制数据
$itemIndex    - 当前项索引
$workflow     - 工作流信息

{{ $json.field }}           - 获取字段值
{{ $json.field || 'default' }} - 默认值
{{ $json.field.toUpperCase() }} - 调用方法
{{ $now.toISO() }}          - ISO 格式时间
{{ $now.format('YYYY-MM-DD') }} - 格式化时间

{{ $json.data?.items }}     - 安全访问嵌套字段
{{ $json.array[0] }}        - 数组索引
{{ $json.array.map(x => x.id) }} - 数组映射

{{ $json.name.split(' ')[0] }} - 字符串分割
{{ $json.price * 1.1 }}     - 数学运算
{{ Math.floor($json.value) }} - Math 函数
*/
