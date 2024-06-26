import { Flexbox } from 'react-layout-kit';

import Migration from '../../features/Migration';
import SessionPanel from './SessionPanel';
import Session from '../../@session/default';
import WorkspaceLayout from '../../(workspace)/layout';
import WorkspacePage from '../../(workspace)/page';
import { useEffect, useState } from 'react';

const Layout = () => {
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
        height={'100%'}
        horizontal
        style={{ maxWidth: 'calc(100vw - 64px)', overflow: 'hidden', position: 'relative' }}
        width={'100%'}
      >
        <SessionPanel>
          <Session/>
        </SessionPanel>
        <Flexbox flex={1} style={{ overflow: 'hidden', position: 'relative' }}>
          <WorkspaceLayout>
            {workSpacePage}
          </WorkspaceLayout>
        </Flexbox>
      </Flexbox>
      <Migration />
    </>
  );
};

Layout.displayName = 'DesktopChatLayout';

export default Layout;
