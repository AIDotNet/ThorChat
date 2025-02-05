import { ActionIcon } from '@lobehub/ui';
import { Book, Github } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { QqOutlined } from '@ant-design/icons';

import { DOCUMENTS, GITHUB, QQ_GROUP } from '@/const/url';
import { Link } from 'react-router-dom';

const BottomActions = memo(() => {
  const { t } = useTranslation('common');

  return (
    <>
    <Link aria-label={'QQ'} to={QQ_GROUP} target={'_blank'}>
      <ActionIcon icon={QqOutlined as any} placement={'right'} title={'QQ交流群'} />
    </Link>
      <Link aria-label={'GitHub'} to={GITHUB} target={'_blank'}>
        <ActionIcon icon={Github} placement={'right'} title={'GitHub'} />
      </Link>
      <Link aria-label={t('document')} to={DOCUMENTS} target={'_blank'}>
        <ActionIcon icon={Book} placement={'right'} title={t('document')} />
      </Link>
    </>
  );
});

export default BottomActions;
