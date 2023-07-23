import Cookies from 'js-cookie';

export const getInitialThemePreference = () => {
  const storedDarkMode: string | undefined = Cookies.get('ap_dark_mode');

  if (storedDarkMode !== undefined) {
    return JSON.parse(storedDarkMode);
  } else if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return true;
  } else {
    return false;
  }
};
export const getInitialMotionPreference = () => {
  const storedMotion: string | undefined = Cookies.get('ap_reduced_motion');

  if (storedMotion !== undefined) {
    return JSON.parse(storedMotion);
  } else if (
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return true;
  } else {
    return false;
  }
};
