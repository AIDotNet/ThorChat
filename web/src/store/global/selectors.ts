import { GlobalStore } from '@/store/global';

import { INITIAL_STATUS } from './initialState';

const sessionGroupKeys = (s: GlobalStore): string[] =>
  s.status.expandSessionGroupKeys || INITIAL_STATUS.expandSessionGroupKeys;

const showSystemRole = (s: GlobalStore) => s.status.showSystemRole;
const mobileShowTopic = (s: GlobalStore) => s.status.mobileShowTopic;
const showChatSideBar = (s: GlobalStore) => s.status.showChatSideBar;
const showSessionPanel = (s: GlobalStore) => s.status.showSessionPanel;
const hidePWAInstaller = (s: GlobalStore) => s.status.hidePWAInstaller;

const sessionWidth = (s: GlobalStore) => s.status.sessionsWidth;
const inputHeight = (s: GlobalStore) => s.status.inputHeight;

export const systemStatusSelectors = {
  hidePWAInstaller,
  inputHeight,
  mobileShowTopic,
  sessionGroupKeys,
  sessionWidth,
  showChatSideBar,
  showSessionPanel,
  showSystemRole,
};
