import { EditableText } from '@lobehub/ui';
import { Typography } from 'antd';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useUserStore } from '@/store/user';
import { syncSettingsSelectors } from '@/store/user/selectors';

const DeviceName = memo(() => {
  const { t } = useTranslation('setting');

  const [deviceName, setSettings] = useUserStore((s) => [
    syncSettingsSelectors.deviceName(s),
    s.setSettings,
  ]);

  const [editing, setEditing] = useState(false);

  const updateDeviceName = (deviceName: string) => {
    setSettings({ sync: { deviceName } });
    setEditing(false);
  };

  return (
    <Flexbox
      align={'center'}
      flex={1}
      height={40}
      horizontal
      style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1, minWidth: 240, paddingLeft: 8 }}
    >
      {!deviceName && !editing && (
        <Flexbox
          onClick={() => {
            setEditing(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          <Typography.Text type={'secondary'}>{t('sync.device.deviceName.hint')}</Typography.Text>
        </Flexbox>
      )}
      <EditableText
        editing={editing}
        onBlur={(e) => {
          updateDeviceName(e.target.value);
        }}
        onChange={(e) => {
          updateDeviceName(e);
        }}
        onEditingChange={setEditing}
        placeholder={t('sync.device.deviceName.placeholder')}
        size={'large'}
        type={'block'}
        value={deviceName}
      />
    </Flexbox>
  );
});

export default DeviceName;
