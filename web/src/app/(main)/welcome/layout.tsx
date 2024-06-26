import ServerLayout from '@/components/server/ServerLayout';

import Desktop from './_layout/Desktop';
import Mobile from './_layout/Mobile';

const WelcomeLayout = ServerLayout({ Desktop, Mobile });

WelcomeLayout.displayName = 'WelcomeLayout';

export default WelcomeLayout;
