import { MetaData } from '@/types/meta';

declare global {

}

export const DEFAULT_AVATAR = window?.thor?.DEFAULT_AVATAR ?? '🤖';
export const DEFAULT_USER_AVATAR = window?.thor?.DEFAULT_USER_AVATAR ?? '😀';
export const DEFAULT_BACKGROUND_COLOR = 'rgba(0,0,0,0)';
export const DEFAULT_AGENT_META: MetaData = {};
export const DEFAULT_INBOX_AVATAR = window?.thor?.DEFAULT_INBOX_AVATAR;

export const DEFAULT_MESSAGE = window?.thor?.DEFAULT_MESSAGE ?? '我是您的私人智能助理 TokenChat ，请问现在能帮您做什么？\n如果需要获得更加专业或定制的助手，可以点击 `+` 创建自定义助手';
export const DEFAULT_USER_AVATAR_URL = '/icons/icon-192x192.png';
