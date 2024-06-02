import { writable } from 'svelte/store';
import { init, register, locale, _ } from 'svelte-i18n';
import { Languages } from './languages'; // Assuming you have an enum for languages

// Initialize the writable store for the language
export const lang = writable(Languages.FR);

// Initialize i18n
export const setupI18n = () => {
  init({
    fallbackLocale: Languages.FR,
    initialLocale: Languages.FR,
  });

  // Subscribe to changes in the lang store and update the locale
  lang.subscribe(value => {
    locale.set(value);
  });
};

// Register translations (assuming JSON files for simplicity)
register(Languages.EN, () => import('./locales/en.json'));
register(Languages.FR, () => import('./locales/fr.json'));

export { _, locale };
