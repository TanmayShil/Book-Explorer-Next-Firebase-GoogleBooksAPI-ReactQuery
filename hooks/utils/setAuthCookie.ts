import { setCookie, destroyCookie } from 'nookies';

export const setAuthCookie = (token: string) => {
  setCookie(null, 'token', token, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
};

export const clearAuthCookie = () => {
  destroyCookie(null, 'token');
};
