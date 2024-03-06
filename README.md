# Storybook react-intl addon

Add react-intl support to Storybook.

Required Versions:
* storybook - `^8.0.0`
* react-intl - `^5.24.0 || ^6.0.0`

This Storybook addon assumes your project is already set up with [react-intl](https://formatjs.io/docs/react-intl/), and that it is properly configured and working.

## Installation

This addon should be added as a dev dependency.

```bash
npm i -D storybook-react-intl
```

```bash
yarn add -D storybook-react-intl
```

You will need to install `react-intl` as a dependency of your project if it is not already installed.
```bash
npm i -S react-intl
```

```bash
yarn add react-intl
```

## Usage

After installing, follow these steps to enable this addon in Storybook.

### main.ts
Insert this addon into your addons array:
```typescript
{
  addons: [
    // other addons...
    'storybook-react-intl',
  ]
}
```
---

### reactIntl.ts
Create a file in your `.storybook` folder called `reactIntl.ts` (or whatever you like). This is where you will set up your react-intl configuration.

In this file, copy and paste the below code and make whatever modifications you need.
```typescript
const locales = ['en', 'de'];

const messages = locales.reduce((acc, lang) => ({
  ...acc,
  [lang]: require(`../locale/${lang}.json`), // whatever the relative path to your messages json is
}), {});

const formats = {}; // optional, if you have any formats

export const reactIntl = {
  defaultLocale: 'en',
  locales,
  messages,
  formats,
};
```
---

### preview.ts
In your `preview.ts`, you need to add the `locales` and `locale` to globals, as well as add `reactIntl` that you exported from the above file to parameters.

`locales` is an object where the keys are the "ids" of the locales/languages and the values are the names you want to display in the dropdown.

`locale` is the default locale, which can be read from `reactIntl` or set manually if you choose.

```typescript
import {reactIntl} from './reactIntl';

const preview: Preview = {
    globals: {
        locale: reactIntl.defaultLocale,
        locales: {
            en: 'English',
            de: 'Deutsche',  
        },
    },
    parameters: {
        reactIntl,
    }
};

export default preview;
```

You can also set locales to Storybook compatible objects as [documented in the storybook-i18n](https://github.com/stevensacks/storybook-i18n#end-users) addon (which is included as part of this addon).

```javascript
import {reactIntl} from './reactIntl';

const preview: Preview = {
    globals: {
        locale: reactIntl.defaultLocale,
        locales: {
            en: {icon: '🇺🇸', title: 'English', right: 'EN'},
            fr: {icon: '🇫🇷', title: 'Français', right: 'FR'},
            ja: {icon: '🇯🇵', title: '日本語', right: 'JP'},
        },
    },
    parameters: {
        reactIntl,
    }
};

export default preview;
```

## Story Parameters Locale

If you want to have a story use a specific locale, set it in that Story's parameters.

```typescript jsx
export const Default: StoryObj = {
    render: () => <YourComponent/>,
};

export const Japanese: StoryObj = {
    parameters: {
        locale: 'ja',
    },
    render: () => <YourComponent/>,
};
```
Note that doing this switches the current locale to the parameter one, so when you change to a story without a parameter, it will stay at the last selected locale.

In the above example, if you view the Japanese story and then click back on the Default story, the locale will stay `ja`.

---
Once you have finished these steps and launch storybook, you should see a globe icon in the toolbar.

Clicking this globe icon will show a dropdown with the locales you defined.

Switching locales will use the strings defined in your messages.
