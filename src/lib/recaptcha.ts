// src/lib/recaptcha.ts
let loaded: Promise<typeof window.grecaptcha> | null = null;

export function loadRecaptcha(siteKey: string) {
  if (loaded) return loaded;
  loaded = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    s.async = true;
    s.onload = () => {
      if (window.grecaptcha) resolve(window.grecaptcha);
      else reject(new Error('grecaptcha not available'));
    };
    s.onerror = () => reject(new Error('Failed to load reCAPTCHA'));
    document.head.appendChild(s);
  });
  return loaded;
}

export async function getRecaptchaToken(action: string) {
  const key = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;
  const grecaptcha = await loadRecaptcha(key);
  await grecaptcha.ready();
  return grecaptcha.execute(key, { action });
}

// (Optional) minimal typing so TS is happy
declare global {
  interface Window {
    grecaptcha: any;
  }
}