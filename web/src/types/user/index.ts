import { DeepPartial } from 'utility-types';

import { UserSettings } from '@/types/user/settings';

export interface LobeUser {
  avatar?: string;
  email?: string | null;
  firstName?: string | null;
  fullName?: string | null;
  id: string;
  latestName?: string | null;
  username?: string | null;
}

export interface UserGuide {
  /**
   * Move the settings button to the avatar dropdown
   */
  moveSettingsToAvatar?: boolean;

  // Topic 引导
  topic?: boolean;
}

export interface UserPreference {
  guide?: UserGuide;
  hideSyncAlert?: boolean;
  telemetry: boolean | null;
  /**
   * whether to use cmd + enter to send message
   */
  useCmdEnterToSend?: boolean;
}

export interface UserInitializationState {
  avatar?: string;
  canEnablePWAGuide?: boolean;
  canEnableTrace?: boolean;
  hasConversation?: boolean;
  isOnboard?: boolean;
  preference: UserPreference;
  settings: DeepPartial<UserSettings>;
  userId?: string;
}
