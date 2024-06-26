import { Icon } from '@lobehub/ui';
import { Tag } from 'antd';
import { Bot, Brain, Cloudy, Info, Mic2, Settings2, Sparkles } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import type { MenuProps } from '@/components/Menu';
import { SettingsTabs } from '@/store/global/initialState';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';
import { Link,useNavigate } from 'react-router-dom';

export const useCategory = () => {
  const { t } = useTranslation('setting');
  const { enableWebrtc, showLLM } = useServerConfigStore(featureFlagsSelectors);
  const navigate = useNavigate();

  const cateItems: MenuProps['items'] = useMemo(
    () =>
      [
        {
          icon: <Icon icon={Settings2} />,
          key: SettingsTabs.Common,
          label: (
            <Link to={'/settings/common'}>
              {t('tab.common')}
            </Link>
          ),
        },
        {
          icon: <Icon icon={Sparkles} />,
          key: SettingsTabs.SystemAgent,
          label: (
            <Link to={'/settings/system-agent'}>
              {t('tab.system-agent')}
            </Link>
          ),
        },
        enableWebrtc && {
          icon: <Icon icon={Cloudy} />,
          key: SettingsTabs.Sync,
          label: (
            <Link to={'/settings/sync'}>
              <Flexbox align={'center'} gap={8} horizontal>
                {t('tab.sync')}
                <Tag bordered={false} color={'warning'}>
                  {t('tab.experiment')}
                </Tag>
              </Flexbox>
            </Link>
          ),
        },
        showLLM && {
          icon: <Icon icon={Brain} />,
          key: SettingsTabs.LLM,
          label: (
            <Link to={'/settings/llm'}>
              {t('tab.llm')}
            </Link>
          ),
        },

        {
          icon: <Icon icon={Mic2} />,
          key: SettingsTabs.TTS,
          label: (
            <Link to={'/settings/tts'}>
              {t('tab.tts')}
            </Link>
          ),
        },
        {
          icon: <Icon icon={Bot} />,
          key: SettingsTabs.Agent,
          label: (
            <Link to={'/settings/agent'} >
              {t('tab.agent')}
            </Link>
          ),
        },
        {
          icon: <Icon icon={Info} />,
          key: SettingsTabs.About,
          label: (
            <Link to={'/settings/about'} >
              {t('tab.about')}
            </Link>
          ),
        },
      ].filter(Boolean) as MenuProps['items'],
    [t, enableWebrtc, showLLM],
  );

  return cateItems;
};
