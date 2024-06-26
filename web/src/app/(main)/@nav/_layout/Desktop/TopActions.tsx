import { ActionIcon } from '@lobehub/ui';
import { Compass, MessageSquare } from 'lucide-react';
import {useNavigate, Link } from 'react-router-dom';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '@/store/global';
import { SidebarTabKey } from '@/store/global/initialState';
import { useSessionStore } from '@/store/session';

export interface TopActionProps {
  tab?: SidebarTabKey;
}

const TopActions = memo<TopActionProps>(({ tab }) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const switchBackToChat = useGlobalStore((s) => s.switchBackToChat);

  return (
    <>
      <div
        aria-label={t('tab.chat')}
        onClick={(e) => {
          e.preventDefault();
          switchBackToChat(useSessionStore.getState().activeId);
          navigate('/chat');
        }}
      >
        <ActionIcon
          active={tab === SidebarTabKey.Chat}
          icon={MessageSquare}
          placement={'right'}
          size="large"
          title={t('tab.chat')}
        />
      </div>
      <div 
        aria-label={t('tab.market')} 
        onClick={(e) => {
          e.preventDefault();
          navigate('/market');
        }}>
        <ActionIcon
          active={tab === SidebarTabKey.Market}
          icon={Compass}
          placement={'right'}
          size="large"
          title={t('tab.market')}
        />
      </div>
    </>
  );
});

export default TopActions;
