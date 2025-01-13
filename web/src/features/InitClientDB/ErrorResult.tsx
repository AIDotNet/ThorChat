import { Highlighter, Icon, Modal } from '@lobehub/ui';
import { Button } from 'antd';
import { createStyles } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { TriangleAlert } from 'lucide-react';
import { ReactNode, memo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';
import Balancer from 'react-wrap-balancer';

import { GITHUB_ISSUES } from '@/const/url';
import { githubService } from '@/services/github';
import { useGlobalStore } from '@/store/global';

const useStyles = createStyles(({ css, token }) => ({
  bg: css`
    cursor: pointer;

    padding-block: 8px;
    padding-inline: 24px;
    border-radius: 40px;

    background: ${token.red6};

    transition: transform 0.2s;

    :hover {
      transform: scale(1.05);
    }

    :active {
      transform: scale(1);
    }
  `,

  text: css`
    font-size: 15px;
    color: ${token.colorText};
  `,
}));

interface MigrationError {
  message: string;
  stack: string;
}

interface FailedModalProps {
  children?: (props: { setOpen: (open: boolean) => void }) => ReactNode;
  error?: MigrationError;
}

const ErrorResult = memo<FailedModalProps>(({ children }) => {
  const { t } = useTranslation('common');
  const { styles } = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      {children ? (
        children({ setOpen })
      ) : (
        <Flexbox
          align={'center'}
          className={styles.bg}
          gap={12}
          horizontal
          onClick={() => {
            setOpen(true);
          }}
        >
          <Center height={40} width={24}>
            <Icon icon={TriangleAlert} size={{ fontSize: 20 }} />
          </Center>
        </Flexbox>
      )}
    </>
  );
});

export default ErrorResult;
