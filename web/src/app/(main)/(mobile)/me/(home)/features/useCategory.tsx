import { DiscordIcon } from '@lobehub/ui';
import { Book, CircleUserRound, Database, Download, Feather, Settings2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { CellProps } from '@/components/Cell';
import { enableAuth } from '@/const/auth';
import { DISCORD, DOCUMENTS, FEEDBACK } from '@/const/url';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { useUserStore } from '@/store/user';
import { authSelectors } from '@/store/user/slices/auth/selectors';

import { useCategory as useSettingsCategory } from '../../settings/features/useCategory';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
export const useCategory = () => {
  const navigate = useNavigate();
  const { canInstall, install } = usePWAInstall();
  const { t } = useTranslation(['common', 'setting', 'auth']);
  const [isLogin, isLoginWithAuth, isLoginWithClerk] = useUserStore((s) => [
    authSelectors.isLogin(s),
    authSelectors.isLoginWithAuth(s),
    authSelectors.isLoginWithClerk(s),
  ]);

  const profile: CellProps[] = [
    {
      icon: CircleUserRound,
      key: 'profile',
      label: t('userPanel.profile'),
      onClick: () => {
        startTransition(() => { navigate('/me/profile') });
      },
    },
  ];

  const settings: CellProps[] = [
    {
      icon: Settings2,
      key: 'setting',
      label: t('userPanel.setting'),
      onClick: () => startTransition(() => { navigate('/me/settings') }),
    },
    {
      type: 'divider',
    },
  ];

  const pwa: CellProps[] = [
    {
      icon: Download,
      key: 'pwa',
      label: t('installPWA'),
      onClick: () => install(),
    },
    {
      type: 'divider',
    },
  ];

  const settingsWithoutAuth = [
    ...useSettingsCategory(),
    {
      type: 'divider',
    },
  ];

  const data: CellProps[] = [
    {
      icon: Database,
      key: 'data',
      label: t('userPanel.data'),
      onClick: () => startTransition(() => { navigate('/me/data') }),
    },
    {
      type: 'divider',
    },
  ];

  const helps: CellProps[] = [
    {
      icon: Book,
      key: 'docs',
      label: t('document'),
      onClick: () => window.open(DOCUMENTS, '__blank'),
    },
    {
      icon: Feather,
      key: 'feedback',
      label: t('feedback'),
      onClick: () => window.open(FEEDBACK, '__blank'),
    },
    {
      icon: DiscordIcon,
      key: 'discord',
      label: 'Discord',
      onClick: () => window.open(DISCORD, '__blank'),
    },
  ];

  const mainItems = [
    {
      type: 'divider',
    },
    ...(isLoginWithClerk ? profile : []),
    ...(enableAuth ? (isLoginWithAuth ? settings : []) : settingsWithoutAuth),
    ...(canInstall ? pwa : []),
    ...(isLogin ? data : []),
    ...helps,
  ].filter(Boolean) as CellProps[];

  return mainItems;
};
