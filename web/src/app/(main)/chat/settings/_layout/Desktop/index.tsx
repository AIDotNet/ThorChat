import { PropsWithChildren } from 'react';

import SafeSpacing from '@/components/SafeSpacing';
import { HEADER_HEIGHT } from '@/const/layoutTokens';
import Footer from '@/features/Setting/Footer';
import SettingContainer from '@/features/Setting/SettingContainer';

import Header from './Header';
import { useResponsive } from 'antd-style/lib/hooks';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <SettingContainer
        addonAfter={<Footer />}
        addonBefore={<SafeSpacing height={HEADER_HEIGHT} />}>
        {children}
      </SettingContainer>
    </>
  )
};

Layout.displayName = 'DesktopSessionSettingsLayout';

export default Layout;
