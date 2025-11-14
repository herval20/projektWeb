import { register, init, locale } from 'svelte-i18n';

// Sprachen registrieren
register('en', () => import('../locales/en.json'));
register('sq', () => import('../locales/sq.json'));
register('de', () => import('../locales/de.json'));
register('zh', () => import('../locales/zh.json'));

// SSR-safe initialisierung
init({
  fallbackLocale: 'en',
  initialLocale: typeof navigator !== 'undefined' 
    ? navigator.language.split('-')[0]
    : 'en' // fallback für SSR
});

export { locale };
