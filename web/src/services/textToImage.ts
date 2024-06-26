import { ModelProvider } from '@/libs/agent-runtime';
import { createHeaderWithAuth } from '@/services/_auth';
import { OpenAIImagePayload } from '@/types/openai/image';

import { API_ENDPOINTS } from './_url';

interface FetchOptions {
  signal?: AbortSignal | undefined;
}

class ImageGenerationService {
  async generateImage(params: Omit<OpenAIImagePayload, 'model' | 'n'>, options?: FetchOptions) {
    const payload: OpenAIImagePayload = { ...params, model: 'dall-e-3', n: 1 };

    const headers = await createHeaderWithAuth({
      headers: { 'Content-Type': 'application/json' },
      provider: ModelProvider.OpenAI,
    });

    const res = await fetch(API_ENDPOINTS.images, {
      body: JSON.stringify(payload),
      headers: headers,
      method: 'POST',
      signal: options?.signal,
    });
    if (!res.ok) {
      throw await res.json();
    }

    const urls = await res.json();

    return urls[0] as string;
  }
}

export const imageGenerationService = new ImageGenerationService();
