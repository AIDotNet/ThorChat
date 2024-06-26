/* eslint-disable typescript-sort-keys/interface */
import { DeepPartial } from 'utility-types';

import { LobeAgentChatConfig, LobeAgentConfig } from '@/types/agent';
import { MetaData } from '@/types/meta';
import { BatchTaskResult } from '@/types/service';
import {
  ChatSessionList,
  LobeAgentSession,
  LobeSessionType,
  LobeSessions,
  SessionGroupId,
  SessionGroupItem,
  SessionGroups,
} from '@/types/session';

export interface ISessionService {
  createSession(type: LobeSessionType, defaultValue: Partial<LobeAgentSession>): Promise<string>;
  batchCreateSessions(importSessions: LobeSessions): Promise<any>;
  cloneSession(id: string, newTitle: string): Promise<string | undefined>;

  getGroupedSessions(): Promise<ChatSessionList>;
  getSessionsByType(type: 'agent' | 'group' | 'all'): Promise<LobeSessions>;
  countSessions(): Promise<number>;
  hasSessions(): Promise<boolean>;
  searchSessions(keyword: string): Promise<LobeSessions>;

  updateSession(
    id: string,
    data: Partial<{ group?: SessionGroupId; pinned?: boolean }>,
  ): Promise<any>;

  getSessionConfig(id: string): Promise<LobeAgentConfig>;
  updateSessionConfig(
    id: string,
    config: DeepPartial<LobeAgentConfig>,
    signal?: AbortSignal,
  ): Promise<any>;

  updateSessionMeta(id: string, meta: Partial<MetaData>, signal?: AbortSignal): Promise<any>;

  updateSessionChatConfig(
    id: string,
    config: DeepPartial<LobeAgentChatConfig>,
    signal?: AbortSignal,
  ): Promise<any>;

  removeSession(id: string): Promise<any>;
  removeAllSessions(): Promise<any>;

  // ************************************** //
  // ***********  SessionGroup  *********** //
  // ************************************** //

  createSessionGroup(name: string, sort?: number): Promise<string>;
  batchCreateSessionGroups(groups: SessionGroups): Promise<BatchTaskResult>;

  getSessionGroups(): Promise<SessionGroupItem[]>;

  updateSessionGroup(id: string, data: Partial<SessionGroupItem>): Promise<any>;
  updateSessionGroupOrder(sortMap: { id: string; sort: number }[]): Promise<any>;

  removeSessionGroup(id: string, removeChildren?: boolean): Promise<any>;
  removeSessionGroups(): Promise<any>;
}
