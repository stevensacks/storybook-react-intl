import React from 'react';
import {
    AnyFramework,
    PartialStoryFn as StoryFunction,
    StoryContext,
} from '@storybook/csf';
import {IntlProvider} from 'react-intl';
import {useGlobals} from '@storybook/client-api';

export const withReactIntl = (
    story: StoryFunction<AnyFramework>,
    context: StoryContext
) => {
    const [{locale}] = useGlobals();
    const {
        parameters: {reactIntl, locale: defaultLocale},
    } = context;
    const currentLocale = locale || defaultLocale;

    if (currentLocale && reactIntl) {
        const {formats, messages} = reactIntl;
        const safeFormats = formats ? formats[currentLocale] : undefined;
        if (messages) {
            return (
                <IntlProvider
                    key={locale}
                    formats={safeFormats}
                    messages={messages[currentLocale]}
                    locale={currentLocale}
                    defaultLocale={defaultLocale}
                >
                    <>{story(context)}</>
                </IntlProvider>
            );
        }
    }
    return story(context);
};
