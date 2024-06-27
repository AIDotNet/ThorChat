import { memo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createStoreUpdater } from 'zustand-utils';

import { useAgentStore } from '@/store/agent';
import { useChatStore } from '@/store/chat';
import { useSessionStore } from '@/store/session';

const SessionHydration = memo(() => {
  const useStoreUpdater = createStoreUpdater(useSessionStore);
  const useAgentStoreUpdater = createStoreUpdater(useAgentStore);
  const useChatStoreUpdater = createStoreUpdater(useChatStore);
  const [switchTopic] = useChatStore((s) => [s.switchTopic]);

  // 使用React Router的useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const [session,setSession] = useState(searchParams.get('session') || 'inbox'); // 使用JavaScript的逻辑来处理默认值

  // 更新状态存储
  useStoreUpdater('activeId', session);
  useAgentStoreUpdater('activeId', session);
  useChatStoreUpdater('activeId', session);

  useEffect(() => {
    const unsubscribe = useSessionStore.subscribe(
      (s) => s.activeId,
      (state) => {
        switchTopic();
        setSession(state);
        // 更新URL参数
        setSearchParams({ session: state }, { replace: true });
      },
    );

    return () => unsubscribe();
  }, []);

  return null; // 根据需要渲染组件
});

export default SessionHydration;