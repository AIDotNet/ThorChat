import { ActionIcon } from '@lobehub/ui';
import { Blocks, LucideLoader2 } from 'lucide-react';
import { Suspense, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAgentStore } from '@/store/agent';
import { agentSelectors } from '@/store/agent/selectors';
import { useUserStore } from '@/store/user';
import { modelProviderSelectors } from '@/store/user/selectors';

import DropdownMenu from './Dropdown';

const Tools = memo(() => {
  const { t } = useTranslation('setting');

  const model = useAgentStore(agentSelectors.currentAgentModel);
  const enableFC = useUserStore(modelProviderSelectors.isModelEnabledFunctionCall(model));

  return (
    <Suspense fallback={<ActionIcon icon={LucideLoader2} />}>
      <DropdownMenu>
        <ActionIcon
          disable={!enableFC}
          icon={Blocks}
          placement={'bottom'}
          title={t(enableFC ? 'tools.title' : 'tools.disabled')}
        />
      </DropdownMenu>
    </Suspense>
  );
});

export default Tools;
