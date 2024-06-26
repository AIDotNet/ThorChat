import { ReactNode } from 'react';

export interface ChatModelCard {
  /**
   * only used in azure
   */
  deploymentName?: string;
  description?: string;
  /**
   * the name show for end user
   */
  displayName?: string;

  /**
   * whether model is enabled by default
   */
  enabled?: boolean;
  /**
   * whether model supports file upload
   */
  files?: boolean;
  /**
   * whether model supports function call
   */
  functionCall?: boolean;
  id: string;
  /**
   * whether model is custom
   */
  isCustom?: boolean;
  /**
   * whether model is legacy (deprecated but not removed yet)
   */
  legacy?: boolean;
  maxOutput?: number;
  /**
   * the context window (or input + output tokens limit)
   */
  tokens?: number;
  /**
   *  whether model supports vision
   */
  vision?: boolean;
}

export interface ModelProviderCard {
  chatModels: ChatModelCard[];
  /**
   * the default model that used for connection check
   */
  checkModel?: string;
  /**
   * whether provider show browser request option by default
   *
   * @default false
   */
  defaultShowBrowserRequest?: boolean;
  /**
   * some provider server like stepfun and aliyun don't support browser request,
   * So we should disable it
   *
   * @default false
   */
  disableBrowserRequest?: boolean;
  /**
   * whether provider is enabled by default
   */
  enabled?: boolean;
  id: string;
  modelList?: {
    azureDeployName?: boolean;
    notFoundContent?: ReactNode;
    placeholder?: string;
    showModelFetcher?: boolean;
  };
  /**
   * the name show for end user
   */
  name: string;
  proxyUrl?:
    | {
        desc?: string;
        placeholder: string;
        title?: string;
      }
    | false;
  /**
   * whether show api key in the provider config
   * so provider like ollama don't need api key field
   */
  showApiKey?: boolean;
}

// 语言模型的设置参数
export interface LLMParams {
  /**
   * 控制生成文本中的惩罚系数，用于减少重复性
   * @default 0
   */
  frequency_penalty?: number;
  /**
   * 生成文本的最大长度
   */
  max_tokens?: number;
  /**
   * 控制生成文本中的惩罚系数，用于减少主题的变化
   * @default 0
   */
  presence_penalty?: number;
  /**
   * 生成文本的随机度量，用于控制文本的创造性和多样性
   * @default 0.6
   */
  temperature?: number;
  /**
   * 控制生成文本中最高概率的单个 token
   * @default 1
   */
  top_p?: number;
}

export type LLMRoleType = 'user' | 'system' | 'assistant' | 'tool';

export interface LLMMessage {
  content: string;
  role: LLMRoleType;
}

export type FewShots = LLMMessage[];
