import { THOR_CHAT_TRACE_HEADER, THOR_CHAT_TRACE_ID, TracePayload } from '@/const/trace';

export const getTracePayload = (req: Request): TracePayload | undefined => {
  const header = req.headers.get(THOR_CHAT_TRACE_HEADER);
  if (!header) return;

  const decoder = new TextDecoder('utf-8');
  const decodedHeader = decoder.decode(base64ToArrayBuffer(header));

  return JSON.parse(decodedHeader);
};

export const getTraceId = (res: Response) => res.headers.get(THOR_CHAT_TRACE_ID);

const createTracePayload = (data: TracePayload) => {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(data));

  return arrayBufferToBase64(encodedData);
};

export const createTraceHeader = (data: TracePayload) => {
  return { [THOR_CHAT_TRACE_HEADER]: createTracePayload(data) };
};

// Helper functions

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';

  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
}
