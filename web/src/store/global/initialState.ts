
import { SessionDefaultGroup } from '@/types/session';
import { AsyncLocalStorage } from '@/utils/localStorage';

export enum SidebarTabKey {
  Chat = 'chat',
  Market = 'market',
  Me = 'me',
  Setting = 'settings',
  Welcome = '',
}

export enum ChatSettingsTabs {
  Chat = 'chat',
  Meta = 'meta',
  Modal = 'modal',
  Plugin = 'plugin',
  Prompt = 'prompt',
  TTS = 'tts',
}

export enum SettingsTabs {
  About = 'about',
  Agent = 'agent',
  Common = 'common',
  LLM = 'llm',
  Sync = 'sync',
  SystemAgent = 'system-agent',
  TTS = 'tts',
}

export interface SystemStatus {
  // which sessionGroup should expand
  expandSessionGroupKeys: string[];
  hidePWAInstaller?: boolean;
  inputHeight: number;
  mobileShowTopic?: boolean;
  sessionsWidth: number;
  showChatSideBar?: boolean;
  showSessionPanel?: boolean;
  showSystemRole?: boolean;
}

export interface GlobalState {
  hasNewVersion?: boolean;
  isMobile?: boolean;
  isStatusInit?: boolean;
  latestVersion?: string;
  router?: any;
  sidebarKey: SidebarTabKey;
  status: SystemStatus;
  statusStorage: AsyncLocalStorage<SystemStatus>;
}

export const INITIAL_STATUS = {
  expandSessionGroupKeys: [SessionDefaultGroup.Pinned, SessionDefaultGroup.Default],
  hidePWAInstaller: false,
  inputHeight: 200,
  mobileShowTopic: false,
  sessionsWidth: 320,
  showChatSideBar: true,
  showSessionPanel: true,
  showSystemRole: false,
} satisfies SystemStatus;

export const initialState: GlobalState = {
  isMobile: false,
  isStatusInit: false,
  sidebarKey: SidebarTabKey.Chat,
  status: INITIAL_STATUS,
  statusStorage: new AsyncLocalStorage('LOBE_SYSTEM_STATUS'),
};
