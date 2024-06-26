

import { Alert } from '@lobehub/ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { MAX_WIDTH } from '@/const/layoutTokens';
import { useUserStore } from '@/store/user';
import { preferenceSelectors } from '@/store/user/selectors';

interface ExperimentAlertProps {
  mobile?: boolean;
}
const ExperimentAlert = memo<ExperimentAlertProps>(({ mobile }) => {
  const { t } = useTranslation('setting');
  const [hideSyncAlert, updatePreference] = useUserStore((s) => [
    preferenceSelectors.hideSyncAlert(s),
    s.updatePreference,
  ]);

  return (
    !hideSyncAlert && (
      <Flexbox style={{ maxWidth: MAX_WIDTH }} width={'100%'}>
        <Alert
          banner={mobile}
          closable
          message={t('sync.warning.message')}
          onClose={() => {
            updatePreference({ hideSyncAlert: true });
          }}
          type={'warning'}
        />
      </Flexbox>
    )
  );
});

export default ExperimentAlert;
