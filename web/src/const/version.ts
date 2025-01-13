import pkg from '@/../package.json';

export const CURRENT_VERSION = pkg.version;

export const isServerMode = false;

import { BRANDING_NAME, ORG_NAME } from './branding';

// @ts-ignore
export const isCustomORG = ORG_NAME !== 'TokenHub';

// @ts-ignore
export const isCustomBranding = BRANDING_NAME !== 'TokenChat';
