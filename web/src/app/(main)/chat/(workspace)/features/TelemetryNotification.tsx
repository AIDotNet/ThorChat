import { Avatar, Icon } from '@lobehub/ui';
import { Button } from 'antd';
import { createStyles } from 'antd-style';
import { LucideArrowUpRightFromSquare, TelescopeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import Notification from '@/components/Notification';
import { PRIVACY_URL } from '@/const/url';
import { useServerConfigStore } from '@/store/serverConfig';
import { serverConfigSelectors } from '@/store/serverConfig/selectors';
import { useUserStore } from '@/store/user';
import { preferenceSelectors } from '@/store/user/selectors';

const useStyles = createStyles(({ css, token }) => ({
  desc: css`
    color: ${token.colorTextSecondary};
  `,
  title: css`
    font-size: 18px;
    font-weight: bold;
  `,
}));

const TelemetryNotification = memo<{ mobile?: boolean }>(({ mobile }) => {
  const { styles, theme } = useStyles();

  const { t } = useTranslation('common');
  const shouldCheck = useServerConfigStore(serverConfigSelectors.enabledTelemetryChat);
  const isPreferenceInit = useUserStore(preferenceSelectors.isPreferenceInit);

  const [useCheckTrace, updatePreference] = useUserStore((s) => [
    s.useCheckTrace,
    s.updatePreference,
  ]);

  const { data: showModal, mutate } = useCheckTrace(shouldCheck && isPreferenceInit);

  const updateTelemetry = (telemetry: boolean) => {
    updatePreference({ telemetry });
    mutate();
  };

  return (
    <Notification mobile={mobile} show={showModal} showCloseIcon={false}>
      <Flexbox>
        <Avatar
          avatar={<TelescopeIcon />}
          background={theme.geekblue1}
          style={{ color: theme.geekblue7 }}
        ></Avatar>
      </Flexbox>
      <Flexbox gap={16}>
        <Flexbox gap={12}>
          <Flexbox className={styles.title}>{t('telemetry.title')}</Flexbox>
          <div className={styles.desc}>
            {t('telemetry.desc')}
            <span>
              <Link to={PRIVACY_URL} target={'_blank'}>
                {t('telemetry.learnMore')}
                <Icon icon={LucideArrowUpRightFromSquare} style={{ marginInlineStart: 4 }} />
              </Link>
            </span>
          </div>
        </Flexbox>
        <Flexbox gap={8} horizontal>
          <Button
            onClick={() => {
              updateTelemetry(true);
            }}
            type={'primary'}
          >
            {t('telemetry.allow')}
          </Button>
          <Button
            onClick={() => {
              updateTelemetry(false);
            }}
            type={'text'}
          >
            {t('telemetry.deny')}
          </Button>
        </Flexbox>
      </Flexbox>
    </Notification>
  );
});

export default TelemetryNotification;
