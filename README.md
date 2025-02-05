# ThorChat

项目是Lobe-Chat纯Web版本，如果您的需要只是需要一个AI对话UI，那么这个项目非常合适
项目是基于Vite+React然后将Lobe-Chat从Next框架进行迁移 

## 环境变量

- ACCESS_CODE: 设置访问密码
- OPENAI_API_KEY： OpenAI请求默认的Key（如果用户没设置Key则使用环境变量设置的）
- OPENAI_PROXY_URL：OpenAI请求默认的Url（如果用户没设置Url则使用环境变量设置的）
- AZURE_OPENAI_PROXY_URL：AzureOpenAI请求端点
- AZURE_OPENAI_API_KEY：Azure请求Key
- AZURE_OPENAI_API_VERSION：请求版本
- DEFAULT_MODEL: 默认模型（默认配置翻译模型，标题命名模型，助手分享模型）
- DEFAULT_AVATAR: 助手头像
- DefaultUserAvatar: 默认用户头像
- DEFAULT_INBOX_AVATAR: 默认助手头像
- OPENAI_MODEL_LIST: gpt-4=gpt-4<16385>,gpt-4-32k=gpt-4-32k<32768>,gpt-3.5-turbo-16k=gpt-3.5-turbo-16k<16_385>,gpt-3.5-turbo-1106=gpt-3.5-turbo-16k<16385>,gpt-4-0125-preview=gpt-4-turbo<32768>,gpt-4-vision-preview=gpt-4-vision<32768:vision>

## Docker部署

```shell
docker run aidotnet/thor-chat -d --name=thor-chat -e OPENAI_API_KEY=sk-xxx -e OPENAI_PROXY_URL=https://api.token-ai.cn
```

默认OpenAI的compose部署方式

```yml
services:
  thor-chat:
    image: aidotnet/thor-chat
    restart: always
    environment:
      - "OPENAI_PROXY_URL:https://api.token-ai.cn/v1"
      - DefaultUserAvatar:🧸
      - 'OPENAI_MODEL_LIST=DeepSeek-R1-Distill-Qwen-32B=DeepSeek-R1-Distill-Qwen-32B<32768>,DeepSeek-R1-Distill-Qwen-14B=DeepSeek-R1-Distill-Qwen-14B<32768>,DeepSeek-R1-Distill-Qwen-7B=DeepSeek-R1-Distill-Qwen-7B<32768>,DeepSeek-R1-Distill-Qwen-1.5B=DeepSeek-R1-Distill-Qwen-1.5B<32768>,gpt-4=gpt-4<128000>,gpt-4-32k=gpt-4-32k<32768>,gpt-4-32k-0613=gpt-4-32k-0613<32768>,gpt-4-32k-0314=gpt-4-32k-0314<32768>,gpt-4-0613=gpt-4-0613<128000>,gpt-4-0314=gpt-4-0314<128000>,gpt-4-0125-preview=gpt-4-0125-preview<128000>,gpt-4-vision-preview=gpt-4-vision-preview<8000:vision>,gpt-4-turbo-preview=gpt-4-turbo-preview<8000>,gpt-4-turbo-2024-04-09=gpt-4-turbo-2024-04-09<128000>,gpt-4-turbo=gpt-4-turbo<128000>,gpt-4-all=gpt-4-all<128000:vision>,gpt-4-1106-vision-preview=gpt-4-1106-vision-preview<128000:vision>,gpt-4-1106-preview=gpt-4-1106-preview<128000>,gpt-3.5-turbo-instruct=gpt-3.5-turbo-instruct<128000>,gpt-3.5-turbo-16k-0613=gpt-3.5-turbo-16k-0613<16000>,gpt-3.5-turbo-16k=gpt-3.5-turbo-16k<16000>,gpt-3.5-turbo-1106=gpt-3.5-turbo-1106<128000>,gpt-3.5-turbo-0613=gpt-3.5-turbo-0613<128000>,claude-3-opus-20240229=claude-3-opus-20240229<128000>,claude-3-haiku-20240307=claude-3-haiku-20240307<128000>,claude-2.1=claude-2.1<128000>,claude-2.0=claude-2.0<128000>,claude-2=claude-2<128000>,claude-instant-1.2=claude-instant-1.2<128000>,claude-instant-1=claude-instant-1<128000>,gemini-1.5-flash=gemini-1.5-flash<128000>,gemini-pro-vision=gemini-pro-vision<128000:vision>,gemini-pro=gemini-pro<128000>,gemini-1.5-pro=gemini-1.5-pro<128000>,glm-4v=glm-4v<128000:vision>,glm-4-all=glm-4-all<128000>,glm-4=glm-4<128000>,glm-3-turbo=glm-3-turbo<128000>,qwen-max=qwen-max<128000:vision>,qwen-plus=qwen-plus<128000>,deepseek-chat=deepseek-chat<64000:vision>,Qwen2-7B-Instruct=Qwen2-7B-Instruct<128000:vision>,Qwen2-VL-72B=Qwen2-VL-72B<128000:vision>,Qwen2.5-Coder-14B-Instruct=Qwen2.5-Coder-14B-Instruct<128000:vision>,Qwen2.5-Coder-32B-Instruct=Qwen2.5-Coder-32B-Instruct<128000:vision>,Qwen2.5-7B-Instruct=Qwen2.5-7B-Instruct<128000:vision>,Qwen2.5-72B-Instruct=Qwen2.5-72B-Instruct<128000:vision>,Qwen2.5-32B-Instruct=Qwen2.5-32B-Instruct<128000:vision>,o1-pro=o1-pro<128000:vision>,o1=o1<128000:vision>,net-o1=net-o1<128000>,net-o1-mini=net-o1-mini<128000:vision>,o1-mini-all=o1-mini-all<128000:vision>,o1-preview-all=o1-preview-all<128000:vision>,o1-pro-all=o1-pro-all<128000:vision>,gpt-4o-2024-11-20=gpt-4o-2024-11-20<128000:vision:fc>,gpt-4o-2024-08-06=gpt-4o-2024-08-06<128000:vision:audio>,gpt-4o-2024-05-13=gpt-4o-2024-05-13<128000:vision:audio>,gpt-4o-mini-2024-07-18=gpt-4o-mini-2024-07-18<128000:vision:audio>,gpt-4o-mini=gpt-4o-mini<128000:vision:audio>'

```

默认Azure的compose部署方式

```yml
version: '3.8'
services:
  thor-chat:
    image: aidotnet/thor-chat
    environment:
      AZURE_OPENAI_API_KEY: 'xxx'
      AZURE_OPENAI_PROXY_URL: 'https://xxx.openai.azure.com/'
    restart: always
```
