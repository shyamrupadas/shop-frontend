import { isServer } from './isServer';

export const isBrowser = !isServer;
