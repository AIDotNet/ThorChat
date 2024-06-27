import { Tag } from 'antd';
import { Bot, Brain, Cloudy, Info, Mic2, Settings2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';
import urlJoin from 'url-join';

import { CellProps } from '@/components/Cell';
import { SettingsTabs } from '@/store/global/initialState';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';
import { startTransition } from 'react';

export const useCategory = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('setting');
  const { enableWebrtc, showLLM } = useServerConfigStore(featureFlagsSelectors);

  const items: CellProps[] = [
    {
      icon: Settings2,
      key: SettingsTabs.Common,
      label: t('tab.common'),
    },
    enableWebrtc && {
      icon: Cloudy,
      key: SettingsTabs.Sync,
      label: (
        <Flexbox align={'center'} gap={8} horizontal>
          {t('tab.sync')}
          <Tag bordered={false} color={'warning'}>
            {t('tab.experiment')}
          </Tag>
        </Flexbox>
      ),
    },
    showLLM && {
      icon: Brain,
      key: SettingsTabs.LLM,
      label: t('tab.llm'),
    },
    { icon: Mic2, key: SettingsTabs.TTS, label: t('tab.tts') },
    {
      icon: Bot,
      key: SettingsTabs.Agent,
      label: t('tab.agent'),
    },
    {
      icon: Info,
      key: SettingsTabs.About,
      label: t('tab.about'),
    },
  ].filter(Boolean) as CellProps[];

  return items.map((item) => ({
    ...item,
    onClick: () => startTransition(() => navigate(urlJoin('/settings', item.key as SettingsTabs)))
  }));
};
