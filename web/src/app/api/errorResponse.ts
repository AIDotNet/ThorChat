import { AgentRuntimeErrorType, ILobeAgentRuntimeErrorType } from '@/libs/agent-runtime';
import { ChatErrorType, ErrorResponse, ErrorType } from '@/types/fetch';

const getStatus = (errorType: ILobeAgentRuntimeErrorType | ErrorType) => {
  // InvalidAccessCode / InvalidAzureAPIKey / InvalidOpenAIAPIKey / InvalidZhipuAPIKey ....
  if (errorType.toString().includes('Invalid')) return 401;

  switch (errorType) {
    // TODO: Need to refactor to Invalid OpenAI API Key
    case AgentRuntimeErrorType.InvalidProviderAPIKey:
    case AgentRuntimeErrorType.NoOpenAIAPIKey: {
      return 401;
    }

    case AgentRuntimeErrorType.LocationNotSupportError: {
      return 403;
    }

    // define the 471~480 as provider error
    case AgentRuntimeErrorType.AgentRuntimeError: {
      return 470;
    }

    case AgentRuntimeErrorType.ProviderBizError:
    case AgentRuntimeErrorType.OpenAIBizError: {
      return 471;
    }

    case ChatErrorType.OllamaServiceUnavailable:
    case AgentRuntimeErrorType.OllamaBizError: {
      return 472;
    }
  }

  return errorType as number;
};

export const createErrorResponse = (
  errorType: ErrorType | ILobeAgentRuntimeErrorType,
  body?: any,
) => {
  const statusCode = getStatus(errorType);

  const data: ErrorResponse = { body, errorType };

  if (typeof statusCode !== 'number' || statusCode < 200 || statusCode > 599) {
    console.error(
      `current StatusCode: \`${statusCode}\` .`,
      'Please go to `./src/app/api/errorResponse.ts` to defined the statusCode.',
    );
  }

  return new Response(JSON.stringify(data), { status: statusCode });
};
