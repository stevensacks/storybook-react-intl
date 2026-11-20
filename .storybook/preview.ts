import {definePreview} from '@storybook/react-vite';
import reactIntlAddon from '../src';
import {reactIntl} from './reactIntl';

export default definePreview({
    addons: [reactIntlAddon()],
    initialGlobals: {
        locale: 'en',
        locales: {
            en: {icon: '🇺🇸', title: 'English', right: 'EN'},
            fr: {icon: '🇫🇷', title: 'Français', right: 'FR'},
            ja: {icon: '🇯🇵', title: '日本語', right: 'JP'},
        },
    },
    parameters: {
        backgrounds: {
            default: 'light',
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        reactIntl,
    },
});
