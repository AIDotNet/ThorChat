

import { ActionIcon, MobileNavBar } from '@lobehub/ui';
import { MessageSquarePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { MOBILE_HEADER_ICON_SIZE } from '@/const/layoutTokens';
import SyncStatusInspector from '@/features/SyncStatusInspector';
import UserAvatar from '@/features/User/UserAvatar';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';
import { useSessionStore } from '@/store/session';
import { mobileHeaderSticky } from '@/styles/mobileHeader';

const Header = memo(() => {
  const [createSession] = useSessionStore((s) => [s.createSession]);
  const navigate = useNavigate();
  const { enableWebrtc, showCreateSession } = useServerConfigStore(featureFlagsSelectors);

  return (
    <MobileNavBar
      left={
        <Flexbox align={'center'} gap={8} horizontal style={{ marginLeft: 8 }}>
          <UserAvatar onClick={() => navigate('/me')} size={32} />
          <span style={{
            fontSize: '24px',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif',
            userSelect: 'none',
            color: 'var(--leva-colors-highlight3)',
          }}>
            TokenChat
          </span>
          {enableWebrtc && <SyncStatusInspector placement={'bottom'} />}
        </Flexbox>
      }
      right={
        showCreateSession && (
          <ActionIcon
            icon={MessageSquarePlus}
            onClick={() => createSession()}
            size={MOBILE_HEADER_ICON_SIZE}
          />
        )
      }
      style={mobileHeaderSticky}
    />
  );
});

export default Header;
