

import { Form, type FormItemProps, Icon, type ItemGroup, Tooltip } from '@lobehub/ui';
import { Button } from 'antd';
import isEqual from 'fast-deep-equal';
import { isString } from 'lodash-es';
import { Wand2 } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { FORM_STYLE } from '@/const/layoutTokens';

import { useStore } from '../store';
import { SessionLoadingState } from '../store/initialState';
import AutoGenerateAvatar from './AutoGenerateAvatar';
import AutoGenerateInput from './AutoGenerateInput';
import AutoGenerateSelect from './AutoGenerateSelect';
import BackgroundSwatches from './BackgroundSwatches';

const AgentMeta = memo(() => {
  const { t } = useTranslation('setting');

  const [hasSystemRole, updateMeta, autocompleteMeta, autocompleteAllMeta] = useStore((s) => [
    !!s.config.systemRole,
    s.setAgentMeta,
    s.autocompleteMeta,
    s.autocompleteAllMeta,
  ]);
  const loading = useStore((s) => s.autocompleteLoading);
  const meta = useStore((s) => s.meta, isEqual);

  const basic = [
    {
      Render: AutoGenerateInput,
      key: 'title',
      label: t('settingAgent.name.title'),
      onChange: (e: any) => updateMeta({ title: e.target.value }),
      placeholder: t('settingAgent.name.placeholder'),
    },
    {
      Render: AutoGenerateInput,
      key: 'description',
      label: t('settingAgent.description.title'),
      onChange: (e: any) => updateMeta({ description: e.target.value }),
      placeholder: t('settingAgent.description.placeholder'),
    },
    {
      Render: AutoGenerateSelect,
      key: 'tags',
      label: t('settingAgent.tag.title'),
      onChange: (e: any) => updateMeta({ tags: isString(e) ? e.split(',') : e }),
      placeholder: t('settingAgent.tag.placeholder'),
    },
  ];

  const autocompleteItems: FormItemProps[] = basic.map((item) => {
    const AutoGenerate = item.Render;
    return {
      children: (
        <AutoGenerate
          canAutoGenerate={hasSystemRole}
          loading={loading[item.key as keyof SessionLoadingState]}
          onChange={item.onChange}
          onGenerate={() => {
            autocompleteMeta(item.key as keyof typeof meta);
          }}
          placeholder={item.placeholder}
          value={meta[item.key as keyof typeof meta]}
        />
      ),
      label: item.label,
    };
  });

  const metaData: ItemGroup = {
    children: [
      {
        children: (
          <AutoGenerateAvatar
            background={meta.backgroundColor}
            canAutoGenerate={hasSystemRole}
            loading={loading['avatar']}
            onChange={(avatar) => updateMeta({ avatar })}
            onGenerate={() => autocompleteMeta('avatar')}
            value={meta.avatar}
          />
        ),
        label: t('settingAgent.avatar.title'),
        minWidth: undefined,
      },
      {
        children: (
          <BackgroundSwatches
            backgroundColor={meta.backgroundColor}
            onChange={(backgroundColor) => updateMeta({ backgroundColor })}
          />
        ),
        label: t('settingAgent.backgroundColor.title'),
        minWidth: undefined,
      },
      ...autocompleteItems,
    ],
    extra: (
      <Tooltip
        title={
          !hasSystemRole
            ? t('autoGenerateTooltipDisabled', { ns: 'common' })
            : t('autoGenerateTooltip', { ns: 'common' })
        }
      >
        <Button
          disabled={!hasSystemRole}
          icon={<Icon icon={Wand2} />}
          loading={Object.values(loading).some((i) => !!i)}
          onClick={(e: any) => {
            e.stopPropagation();

            autocompleteAllMeta(true);
          }}
          size={'small'}
        >
          {t('autoGenerate', { ns: 'common' })}
        </Button>
      </Tooltip>
    ),
    title: t('settingAgent.title'),
  };

  return <Form items={[metaData]} itemsType={'group'} variant={'pure'} {...FORM_STYLE} />;
});

export default AgentMeta;
