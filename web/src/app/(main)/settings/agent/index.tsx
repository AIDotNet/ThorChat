

import isEqual from 'fast-deep-equal';
import { memo, startTransition } from 'react';

import { INBOX_SESSION_ID } from '@/const/session';
import { AgentSettings } from '@/features/AgentSetting';
import { useUserStore } from '@/store/user';
import { settingsSelectors } from '@/store/user/selectors';

const Page = memo(() => {
  const config = useUserStore(settingsSelectors.defaultAgentConfig, isEqual);
  const meta = useUserStore(settingsSelectors.defaultAgentMeta, isEqual);
  const [updateAgent] = useUserStore((s) => [s.updateDefaultAgent]);

  return (
    <AgentSettings
      config={config}
      id={INBOX_SESSION_ID}
      meta={meta}
      onConfigChange={(config) => {
        startTransition(() => {
          updateAgent({ config });
        });
      }}
      onMetaChange={(meta) => {
        startTransition(() => {
          updateAgent({ meta });
        });
      }}
    />
  );
});

Page.displayName = 'AgentSetting';

export default Page;
