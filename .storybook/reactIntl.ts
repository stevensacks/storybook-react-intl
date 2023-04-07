import en from '../src/stories/locales/en';
import fr from '../src/stories/locales/fr';
import ja from '../src/stories/locales/ja';

const messages: Record<string, any> = {en, fr, ja};

const locales = ['en', 'fr', 'ja'];

const formats = {}; // optional, if you have any formats

export const reactIntl = {
    defaultLocale: 'en',
    locales,
    messages,
    formats,
};