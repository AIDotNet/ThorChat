import React, { lazy, memo } from 'react';
import { useTranslation } from 'react-i18next';

import FullscreenLoading from '@/components/Loading/FullscreenLoading';
import { useGlobalStore } from '@/store/global';
import { systemStatusSelectors } from '@/store/global/selectors';

import { CLIENT_LOADING_STAGES } from './stage';

const InitError = lazy(() => import('./Error'));

interface InitProps {
  setActiveStage: (value: string) => void;
}

interface ContentProps {
  loadingStage: string;
  setActiveStage: (value: string) => void;
}

const Content = memo<ContentProps>(({ loadingStage, setActiveStage }) => {
  const { t } = useTranslation('common');
  const isPgliteNotInited = true;
  const isError = false;

  return (
    <>
      <FullscreenLoading
        activeStage={CLIENT_LOADING_STAGES.indexOf(loadingStage)}
        contentRender={isError && <InitError />}
        stages={CLIENT_LOADING_STAGES.map((key) => t(`appLoading.${key}` as any))}
      />
    </>
  );
});

export default Content;
