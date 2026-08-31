export const AUTH_COOKIE = {
  access: 'powerstove_agent_access',
  refresh: 'powerstove_agent_refresh',
} as const;

const secure = process.env.NODE_ENV === 'production';

export const ACCESS_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'strict',
  secure,
  path: '/',
  maxAge: 15 * 60,
} as const;

export const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'strict',
  secure,
  path: '/',
  maxAge: 30 * 24 * 60 * 60,
} as const;
