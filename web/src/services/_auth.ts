import { JWTPayload, LOBE_CHAT_AUTH_HEADER } from '@/const/auth';
import { ModelProvider } from '@/libs/agent-runtime';
import { useUserStore } from '@/store/user';
import { keyVaultsConfigSelectors, userProfileSelectors } from '@/store/user/selectors';
import { GlobalLLMProviderKey } from '@/types/user/settings';
import { createJWT } from '@/utils/jwt';

export const getProviderAuthPayload = (provider: string) => {
  switch (provider) {
    case ModelProvider.Bedrock: {
      const { accessKeyId, region, secretAccessKey } = keyVaultsConfigSelectors.bedrockConfig(
        useUserStore.getState(),
      );

      const awsSecretAccessKey = secretAccessKey;
      const awsAccessKeyId = accessKeyId;

      const apiKey = (awsSecretAccessKey || '') + (awsAccessKeyId || '');

      return { apiKey, awsAccessKeyId, awsRegion: region, awsSecretAccessKey };
    }

    case ModelProvider.Azure: {
      const azure = keyVaultsConfigSelectors.azureConfig(useUserStore.getState());

      return {
        apiKey: azure.apiKey,
        azureApiVersion: azure.apiVersion,
        endpoint: azure.endpoint,
      };
    }

    case ModelProvider.Ollama: {
      const config = keyVaultsConfigSelectors.ollamaConfig(useUserStore.getState());

      return { endpoint: config?.baseURL };
    }

    default: {
      const config = keyVaultsConfigSelectors.getVaultByProvider(provider as GlobalLLMProviderKey)(
        useUserStore.getState(),
      );

      return { apiKey: config?.apiKey, endpoint: config?.baseURL };
    }
  }
};

const createAuthTokenWithPayload = async (payload = {}) => {
  const accessCode = keyVaultsConfigSelectors.password(useUserStore.getState());
  const userId = userProfileSelectors.userId(useUserStore.getState());

  return await createJWT<JWTPayload>({ accessCode, userId, ...payload });
};

const createAuthToken = () => {
  const tokne = localStorage.getItem('token') || '';
  if (tokne) {
    return tokne;
  }

  window.location.href = 'https://api.token-ai.cn/login?redirect_uri=' + window.location.origin + "/auth";

  return '';
};

interface AuthParams {
  // eslint-disable-next-line no-undef
  headers?: HeadersInit;
  payload?: Record<string, any>;
  provider?: string;
}

// eslint-disable-next-line no-undef
export const createHeaderWithAuth = async (params?: AuthParams): Promise<HeadersInit> => {
  let payload = params?.payload || {};

  if (params?.provider) {
    payload = { ...payload, ...getProviderAuthPayload(params?.provider) };
  }

  // const token = await createAuthTokenWithPayload(payload);
  const token = createAuthToken();

  // eslint-disable-next-line no-undef
  return { ...params?.headers, [LOBE_CHAT_AUTH_HEADER]: token };
};
