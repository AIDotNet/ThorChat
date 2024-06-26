import { IPluginErrorType, PluginErrorType } from '@lobehub/chat-plugin-sdk';
import type { AlertProps } from '@lobehub/ui';
import { Skeleton } from 'antd';
import { Suspense, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useProviderName } from '@/hooks/useProviderName';
import { AgentRuntimeErrorType, ILobeAgentRuntimeErrorType } from '@/libs/agent-runtime';
import { ChatErrorType, ErrorType } from '@/types/fetch';
import { ChatMessage, ChatMessageError } from '@/types/message';

import ClerkLogin from './ClerkLogin';
import ErrorJsonViewer from './ErrorJsonViewer';
import InvalidAPIKey from './InvalidAPIKey';
import InvalidAccessCode from './InvalidAccessCode';
import OpenAiBizError from './OpenAiBizError';
import OllamaBizError from './OllamaBizError';
import PluginSettings from './PluginSettings';

// Config for the errorMessage display
const getErrorAlertConfig = (
  errorType?: IPluginErrorType | ILobeAgentRuntimeErrorType | ErrorType,
): AlertProps | undefined => {
  // OpenAIBizError / ZhipuBizError / GoogleBizError / ...
  if (typeof errorType === 'string' && (errorType.includes('Biz') || errorType.includes('Invalid')))
    return {
      extraDefaultExpand: true,
      extraIsolate: true,
      type: 'warning',
    };

  switch (errorType) {
    case AgentRuntimeErrorType.LocationNotSupportError: {
      return {
        type: 'warning',
      };
    }

    case AgentRuntimeErrorType.NoOpenAIAPIKey: {
      return {
        extraDefaultExpand: true,
        extraIsolate: true,
        type: 'warning',
      };
    }

    default: {
      return undefined;
    }
  }
};

export const useErrorContent = (error: any) => {
  const { t } = useTranslation('error');
  const providerName = useProviderName(error?.body?.provider || '');

  return useMemo<AlertProps | undefined>(() => {
    if (!error) return;
    const messageError = error;

    const alertConfig = getErrorAlertConfig(messageError.type);

    return {
      message: t(`response.${messageError.type}` as any, { provider: providerName }),
      ...alertConfig,
    };
  }, [error]);
};

const ErrorMessageExtra = memo<{ data: ChatMessage }>(({ data }) => {
  const error = data.error as ChatMessageError;
  if (!error?.type) return;

  switch (error.type) {
    case PluginErrorType.PluginSettingsInvalid: {
      return <PluginSettings id={data.id} plugin={data.plugin} />;
    }

    case AgentRuntimeErrorType.OpenAIBizError: {
      return <OpenAiBizError {...data} />;
    }

    case AgentRuntimeErrorType.OllamaBizError: {
      return <OllamaBizError {...data} />;
    }

    case ChatErrorType.InvalidClerkUser: {
      return <ClerkLogin id={data.id} />;
    }

    case ChatErrorType.InvalidAccessCode: {
      return <InvalidAccessCode id={data.id} provider={data.error?.body?.provider} />;
    }

    case AgentRuntimeErrorType.NoOpenAIAPIKey: {
      {
        return <InvalidAPIKey id={data.id} provider={data.error?.body?.provider} />;
      }
    }
  }

  if (error.type.toString().includes('Invalid')) {
    return <InvalidAPIKey id={data.id} provider={data.error?.body?.provider} />;
  }

  return <ErrorJsonViewer error={data.error} id={data.id} />;
});

export default memo<{ data: ChatMessage }>(({ data }) => (
  <Suspense fallback={<Skeleton active style={{ width: '100%' }} />}>
    <ErrorMessageExtra data={data} />
  </Suspense>
));
