# Storybook react-intl addon

Add react-intl support to Storybook.

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

### main.js
Insert this addon into your addons array:
```javascript
{
  addons: [
    // other addons...
    'storybook-react-intl',
  ]
}
```
---

### reactIntl.js
Create a file in your `.storybook` folder called `reactIntl.js` (or whatever you like). This is where you will set up your react-intl configuration.

In this file, copy and paste the below code and make whatever modifications you need.
```javascript
import {addLocaleData} from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import deLocaleData from 'react-intl/locale-data/de';

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);

const locales = ['en', 'de'];

const messages = locales.reduce((acc, lang) => ({
  ...acc,
  [lang]: require(`../locale/${lang}.json`), // whatever the relative path to your messages json is
}), {});

const formats = {}; // if you have any formats

export const reactIntl = {
  defaultLocale: 'en',
  locales,
  messages,
  formats,
};
```
---

### preview.js
In your `preview.js`, you need to add the `locales` and `locale` parameters, as well as the `reactIntl` that you exported from the above file.

`locales` is an object where the keys are the "ids" of the locales/languages and the values are the names you want to display in the dropdown.

`locale` is the default locale, which can be read from `reactIntl` or set manually if you choose.

```javascript
import {reactIntl} from './reactIntl.js';

export const parameters = {
  reactIntl,
  locale: reactIntl.defaultLocale,
  locales: {
    en: 'English',
    de: 'Deutsche',  
  },
};
```
---
Once you have finished these steps and launch storybook, you should see a globe icon in the toolbar.

Clicking this globe icon will show a dropdown with the locales you defined in `parameters`.

Switching locales will use the strings defined in your messages.
