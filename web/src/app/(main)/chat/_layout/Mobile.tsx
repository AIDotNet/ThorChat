
import { createStyles } from 'antd-style';
import { memo, useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Migration from '@/app/(main)/chat/features/Migration';
import { useQuery } from '@/hooks/useQuery';
import Session from '../@session/default';
import WorkspaceLayout from '../(workspace)/layout';
import WorkspacePage from '../(workspace)/page';


const useStyles = createStyles(({ css, token }) => ({
  main: css`
    position: relative;
    overflow: hidden;
    background: ${token.colorBgLayout};
  `,
}));

const Layout = memo(() => {
  const { showMobileWorkspace } = useQuery();
  
  const { styles } = useStyles();
  const [workSpacePage, setWorkSpacePage] = useState<any>();

  useEffect(() => {
    WorkspacePage()
      .then((page) => {
        setWorkSpacePage(page);
      })
  }, []);
  
  return (
    <>
      <Flexbox
        className={styles.main}
        height="100%"
        style={showMobileWorkspace ? { display: 'none' } : undefined}
        width="100%"
      >
        <Session />
      </Flexbox>
      <Flexbox
        className={styles.main}
        height="100%"
        style={showMobileWorkspace ? undefined : { display: 'none' }}
        width="100%"
      >
        <WorkspaceLayout>
          {workSpacePage}
        </WorkspaceLayout>
      </Flexbox>
      <Migration />
    </>
  );
});

Layout.displayName = 'MobileChatLayout';

export default Layout;
