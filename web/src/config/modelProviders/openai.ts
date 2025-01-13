import { ChatModelCard, ModelProviderCard } from '@/types/llm';

// ref: https://platform.openai.com/docs/deprecations
let OpenAI: ModelProviderCard = {
  chatModels: [
    {
      tokens: 128_000,
      description:
        'o1-mini是一款针对编程、数学和科学应用场景而设计的快速、经济高效的推理模型。该模型具有128K上下文和2023年10月的知识截止日期。',
      displayName: 'OpenAI o1-mini',
      enabled: true,
      id: 'o1-mini',
      maxOutput: 65_536
    },
    {
      tokens: 200_000,
      description:
        'o1是OpenAI新的推理模型，支持图文输入并输出文本，适用于需要广泛通用知识的复杂任务。该模型具有200K上下文和2023年10月的知识截止日期。',
      displayName: 'OpenAI o1',
      enabled: true,
      id: 'o1-2024-12-17',
      maxOutput: 100_000,
      vision: true,
    },
    {
      tokens: 128_000,
      description:
        'o1是OpenAI新的推理模型，适用于需要广泛通用知识的复杂任务。该模型具有128K上下文和2023年10月的知识截止日期。',
      displayName: 'OpenAI o1-preview',
      enabled: true,
      id: 'o1-preview',
      maxOutput: 32_768,
    },
    {
      tokens: 128_000,
      description:
        'GPT-4o mini是OpenAI在GPT-4 Omni之后推出的最新模型，支持图文输入并输出文本。作为他们最先进的小型模型，它比其他近期的前沿模型便宜很多，并且比GPT-3.5 Turbo便宜超过60%。它保持了最先进的智能，同时具有显著的性价比。GPT-4o mini在MMLU测试中获得了 82% 的得分，目前在聊天偏好上排名高于 GPT-4。',
      displayName: 'GPT-4o mini',
      enabled: true,
      functionCall: true,
      id: 'gpt-4o-mini',
      maxOutput: 16_385,
      vision: true,
    },
    {
      tokens: 128_000,
      description:
        'ChatGPT-4o 是一款动态模型，实时更新以保持当前最新版本。它结合了强大的语言理解与生成能力，适合于大规模应用场景，包括客户服务、教育和技术支持。',
      displayName: 'GPT-4o 1120',
      enabled: true,
      functionCall: true,
      id: 'gpt-4o-2024-11-20',
      vision: true,
    },
    {
      tokens: 128_000,
      description:
        'ChatGPT-4o 是一款动态模型，实时更新以保持当前最新版本。它结合了强大的语言理解与生成能力，适合于大规模应用场景，包括客户服务、教育和技术支持。',
      displayName: 'GPT-4o',
      enabled: true,
      functionCall: true,
      id: 'gpt-4o',
      vision: true,
    },
    {
      tokens: 128_000,
      description:
        'ChatGPT-4o 是一款动态模型，实时更新以保持当前最新版本。它结合了强大的语言理解与生成能力，适合于大规模应用场景，包括客户服务、教育和技术支持。',
      displayName: 'GPT-4o 0806',
      functionCall: true,
      id: 'gpt-4o-2024-08-06',
      vision: true,
    },
    {
      tokens: 128_000,
      description:
        'ChatGPT-4o 是一款动态模型，实时更新以保持当前最新版本。它结合了强大的语言理解与生成能力，适合于大规模应用场景，包括客户服务、教育和技术支持。',
      displayName: 'GPT-4o 0513',
      functionCall: true,
      id: 'gpt-4o-2024-05-13',
      vision: true,
    },
    {
      tokens: 128_000,
      description:
        'ChatGPT-4o 是一款动态模型，实时更新以保持当前最新版本。它结合了强大的语言理解与生成能力，适合于大规模应用场景，包括客户服务、教育和技术支持。',
      displayName: 'ChatGPT-4o',
      enabled: true,
      id: 'chatgpt-4o-latest',
      vision: true,
    },
    {
      tokens: 128_000,
      description:
        '最新的 GPT-4 Turbo 模型具备视觉功能。现在，视觉请求可以使用 JSON 模式和函数调用。 GPT-4 Turbo 是一个增强版本，为多模态任务提供成本效益高的支持。它在准确性和效率之间找到平衡，适合需要进行实时交互的应用程序场景。',
      displayName: 'GPT-4 Turbo',
      functionCall: true,
      id: 'gpt-4-turbo',
      vision: true,
    },
    {
      tokens: 128_000,
      description:
        '最新的 GPT-4 Turbo 模型具备视觉功能。现在，视觉请求可以使用 JSON 模式和函数调用。 GPT-4 Turbo 是一个增强版本，为多模态任务提供成本效益高的支持。它在准确性和效率之间找到平衡，适合需要进行实时交互的应用程序场景。',
      displayName: 'GPT-4 Turbo Vision 0409',
      functionCall: true,
      id: 'gpt-4-turbo-2024-04-09',
      vision: true,
    },
    {
      tokens: 128_000,
      description:
        '最新的 GPT-4 Turbo 模型具备视觉功能。现在，视觉请求可以使用 JSON 模式和函数调用。 GPT-4 Turbo 是一个增强版本，为多模态任务提供成本效益高的支持。它在准确性和效率之间找到平衡，适合需要进行实时交互的应用程序场景。',
      displayName: 'GPT-4 Turbo Preview',
      functionCall: true,
      id: 'gpt-4-turbo-preview'
    },
    {
      tokens: 128_000,
      description:
        '最新的 GPT-4 Turbo 模型具备视觉功能。现在，视觉请求可以使用 JSON 模式和函数调用。 GPT-4 Turbo 是一个增强版本，为多模态任务提供成本效益高的支持。它在准确性和效率之间找到平衡，适合需要进行实时交互的应用程序场景。',
      displayName: 'GPT-4 Turbo Preview 0125',
      functionCall: true,
      id: 'gpt-4-0125-preview'
    },
    {
      tokens: 128_000,
      description:
        '最新的 GPT-4 Turbo 模型具备视觉功能。现在，视觉请求可以使用 JSON 模式和函数调用。 GPT-4 Turbo 是一个增强版本，为多模态任务提供成本效益高的支持。它在准确性和效率之间找到平衡，适合需要进行实时交互的应用程序场景。',
      displayName: 'GPT-4 Turbo Preview 1106',
      functionCall: true,
      id: 'gpt-4-1106-preview'
    },
    {
      tokens: 8192,
      description:
        'GPT-4 提供了一个更大的上下文窗口，能够处理更长的文本输入，适用于需要广泛信息整合和数据分析的场景。',
      displayName: 'GPT-4',
      functionCall: true,
      id: 'gpt-4'
    },
    {
      tokens: 8192,
      description:
        'GPT-4 提供了一个更大的上下文窗口，能够处理更长的文本输入，适用于需要广泛信息整合和数据分析的场景。',
      displayName: 'GPT-4 0613',
      functionCall: true,
      id: 'gpt-4-0613'
    },
    {
      tokens: 32_768,
      description:
        'GPT-4 提供了一个更大的上下文窗口，能够处理更长的文本输入，适用于需要广泛信息整合和数据分析的场景。',
      // Will be discontinued on June 6, 2025
      displayName: 'GPT-4 32K',
      functionCall: true,
      id: 'gpt-4-32k'
    },
    {
      tokens: 32_768,
      // Will be discontinued on June 6, 2025
      description:
        'GPT-4 提供了一个更大的上下文窗口，能够处理更长的文本输入，适用于需要广泛信息整合和数据分析的场景。',
      displayName: 'GPT-4 32K 0613',
      functionCall: true,
      id: 'gpt-4-32k-0613'
    },
    {
      tokens: 16_385,
      description:
        'GPT 3.5 Turbo，适用于各种文本生成和理解任务，Currently points to gpt-3.5-turbo-0125',
      displayName: 'GPT-3.5 Turbo',
      functionCall: true,
      id: 'gpt-3.5-turbo'
    },
    {
      tokens: 16_385,
      description:
        'GPT 3.5 Turbo，适用于各种文本生成和理解任务，Currently points to gpt-3.5-turbo-0125',
      displayName: 'GPT-3.5 Turbo 0125',
      functionCall: true,
      id: 'gpt-3.5-turbo-0125'
    },
    {
      tokens: 16_385,
      description:
        'GPT 3.5 Turbo，适用于各种文本生成和理解任务，Currently points to gpt-3.5-turbo-0125',
      displayName: 'GPT-3.5 Turbo 1106',
      functionCall: true,
      id: 'gpt-3.5-turbo-1106',
    },
    {
      tokens: 4096,
      description:
        'GPT 3.5 Turbo，适用于各种文本生成和理解任务，Currently points to gpt-3.5-turbo-0125',
      displayName: 'GPT-3.5 Turbo Instruct',
      id: 'gpt-3.5-turbo-instruct',
    },
  ],
  checkModel: 'gpt-4o-mini',
  enabled: true,
  id: 'openai',
  modelList: { showModelFetcher: true },
  name: 'OpenAI'
};

if (window?.thor?.OPENAI_MODEL_LIST) {
  const enabledModels = window.thor.OPENAI_MODEL_LIST.split(',');
  const models = [] as ChatModelCard[];
  for (const model of enabledModels) {
    if (model.includes('=')) {
      const [id, displayName] = model.split('=');
      // 还有可能<16000:vision> 格式，使用<>包括,如果包含vision则启用，如果包含fc 则启用functionCall
      const [name, value] = displayName.replace('>', '').split('<');
      const [tokens, vision] = value.split(':');
      models.push({
        tokens: tokens? parseInt(tokens): 32_768,
        description: 'This is a custom model',
        displayName:name,
        enabled: true,
        id,
        vision: (vision && vision.includes('vision')) || false,
        functionCall: (vision && vision.includes('fc')) || false,
      });

    } else {
      const modelCard = OpenAI.chatModels.find((m) => m.id === model);
      if (modelCard) {
        models.push(modelCard);
      } else {
        models.push({
          tokens: 32_768,
          description: 'This is a custom model',
          displayName: model,
          enabled: true,
          id: model,
        });
      }
    }

  }

  OpenAI.chatModels = models;
}

export default OpenAI;
