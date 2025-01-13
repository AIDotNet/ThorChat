export const parserPluginSettings = (
  settingsStr?: string,
): Record<string, Record<string, string>> => {
  if (!settingsStr) return {};
  // {"keyVaults":{"openai":{"apiKey":"sk-","baseURL":"https://api.token-ai.cn/v1"}}}
  const settingsObj = JSON.parse(settingsStr);
  
  return settingsObj;
};
