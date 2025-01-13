import { memo, useEffect } from 'react';
import { useUserStore } from '@/store/user';

import { AppLoadingStage } from './stage';
import { useNavigate } from 'react-router-dom';

interface RedirectProps {
  setActiveStage: (value: AppLoadingStage) => void;
}

const Redirect = memo<RedirectProps>(({ setActiveStage }) => {
  const navigate = useNavigate();
  const isUserStateInit = useUserStore((s) => s.isUserStateInit);

  const isPgliteNotEnabled = false;

  const navToChat = () => {
    setActiveStage(AppLoadingStage.GoToChat);
  };

  useEffect(() => {
    // if pglite is not enabled, redirect to chat
    if (isPgliteNotEnabled) {
      navToChat();
      return;
    }

    // if user state not init, wait for loading
    if (!isUserStateInit) {
      setActiveStage(AppLoadingStage.InitUser);
      return;
    }

    // finally check the conversation status
    navToChat();
  }, [isUserStateInit, isPgliteNotEnabled]);

  return null;
});

export default Redirect;
