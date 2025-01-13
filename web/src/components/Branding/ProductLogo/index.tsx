import { LobeChatProps } from '@lobehub/ui/brand';
import { memo } from 'react';

import { isCustomBranding } from '@/const/version';

import CustomLogo from './Custom';
import { Center, Flexbox } from 'react-layout-kit';
import { Avatar } from '@lobehub/ui';
export const ProductLogo = memo<LobeChatProps>((props) => {
  if (isCustomBranding) {
    return <CustomLogo {...props} />;
  }

  return <Center width={'100%'}>
    <Avatar
      avatar='🤖'
      />
    <span style={{
      fontSize: '24px',
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif',
      userSelect: 'none',
      color: 'var(--leva-colors-highlight3)',
    }}>
      TokenChat
    </span>
  </Center>;
});
