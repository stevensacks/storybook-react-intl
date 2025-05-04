import React from 'react';
import type {
    Renderer,
    PartialStoryFn as StoryFunction,
    StoryContext,
} from 'storybook/internal/types';
import {IntlProvider} from 'react-intl';
import {useGlobals} from 'storybook/preview-api';

export const withReactIntl = (
    StoryFn: StoryFunction<Renderer>,
    context: StoryContext<Renderer>,
) => {
    const [{locale}] = useGlobals();
    const {
        parameters: {reactIntl, locale: defaultLocale},
    } = context;
    const currentLocale = locale || defaultLocale;

    if (currentLocale && reactIntl) {
        const {formats, messages, defaultRichTextElements, timeZone} =
            reactIntl;
        const safeFormats = formats ? formats[currentLocale] : undefined;
        if (messages) {
            return (
                <IntlProvider
                    timeZone={timeZone}
                    key={locale}
                    formats={safeFormats}
                    messages={messages[currentLocale]}
                    locale={currentLocale}
                    defaultLocale={defaultLocale}
                    defaultRichTextElements={defaultRichTextElements}
                >
                    <>{StoryFn(context)}</>
                </IntlProvider>
            );
        }
    }
    return StoryFn(context);
};
