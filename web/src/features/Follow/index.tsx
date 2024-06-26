

import { SiDiscord, SiGithub, SiMedium, SiX } from '@icons-pack/react-simple-icons';
import { ActionIcon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { DISCORD, GITHUB, MEDIDUM, X } from '@/const/url';

const useStyles = createStyles(({ css, token }) => {
  return {
    icon: css`
      svg {
        fill: ${token.colorTextDescription};
      }

      &:hover {
        svg {
          fill: ${token.colorText};
        }
      }
    `,
  };
});

const Follow = memo(() => {
  const { styles } = useStyles();
  const { t } = useTranslation('common');
  return (
    <Flexbox gap={8} horizontal>
      <Link to={GITHUB} rel="noreferrer" target={'_blank'}>
        <ActionIcon
          className={styles.icon}
          icon={SiGithub as any}
          title={t('follow', { name: 'GitHub' })}
        />
      </Link>
      <Link to={X} rel="noreferrer" target={'_blank'}>
        <ActionIcon className={styles.icon} icon={SiX as any} title={t('follow', { name: 'X' })} />
      </Link>
      <Link to={DISCORD} rel="noreferrer" target={'_blank'}>
        <ActionIcon
          className={styles.icon}
          icon={SiDiscord as any}
          title={t('follow', { name: 'Discord' })}
        />
      </Link>
      <Link to={MEDIDUM} rel="noreferrer" target={'_blank'}>
        <ActionIcon
          className={styles.icon}
          icon={SiMedium as any}
          title={t('follow', { name: 'Medium' })}
        />
      </Link>
    </Flexbox>
  );
});

Follow.displayName = 'Follow';

export default Follow;
