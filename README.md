# ThorChat

项目是Lobe-Chat纯Web版本，如果您的需要只是需要一个AI对话UI，那么这个项目非常合适
项目是基于Vite+React然后将Lobe-Chat从Next框架进行迁移 

## 环境变量

- ACCESS_CODE: 设置访问密码 （"ThorChat,fastWiki" //多个秘钥用英文逗号隔开）
- OPENAI_API_KEY： OpenAI请求默认的Key（如果用户没设置Key则使用环境变量设置的）
- OPENAI_PROXY_URL：OpenAI请求默认的Url（如果用户没设置Url则使用环境变量设置的）
- AZURE_OPENAI_PROXY_URL：AzureOpenAI请求端点
- AZURE_OPENAI_API_KEY：Azure请求Key
- AZURE_OPENAI_API_VERSION：请求版本



## Docker部署

```shell
docker run registry.token-ai.cn/thor-chat -d --name=thor-chat -e OPENAI_API_KEY=sk-xxx -e OPENAI_PROXY_URL=https://api.token-ai.cn
```

默认OpenAI的compose部署方式

```yml
version: '3.8'
services:
  thor-chat:
    image: registry.token-ai.cn/thor-chat
    environment:
      OPENAI_API_KEY: 'sk-xxx'
      OPENAI_PROXY_URL: 'https://api.token-ai.cn'
    restart: always
```

默认Azure的compose部署方式

```yml
version: '3.8'
services:
  thor-chat:
    image: registry.token-ai.cn/thor-chat
    environment:
      AZURE_OPENAI_API_KEY: 'xxx'
      AZURE_OPENAI_PROXY_URL: 'https://xxx.openai.azure.com/'
    restart: always
```