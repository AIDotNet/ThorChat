import { ChatHeader } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { memo } from 'react';

import ShareAgentButton from '../../features/ShareAgentButton';

export const useStyles = createStyles(({ css, token }) => ({
  logo: css`
    color: ${token.colorText};
    fill: ${token.colorText};
  `,
}));

const Header = memo(() => {
  const { styles } = useStyles();

  return (
    <ChatHeader
      left={<span style={{
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        userSelect: 'none',
        color: 'var(--leva-colors-highlight3)',
      }}>
        TokenChat
      </span>}
      right={<ShareAgentButton />}
    />
  );
});

export default Header;
