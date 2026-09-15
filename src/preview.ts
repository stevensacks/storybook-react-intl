import type {Renderer, ProjectAnnotations} from 'storybook/internal/types';
import i18n from 'storybook-i18n/preview';
import {withReactIntl} from './withReactIntl';

const i18nDecorators = i18n?.decorators || [];

const preview: ProjectAnnotations<Renderer> = {
    ...i18n,
    // @ts-expect-error spreading i18n's ProjectAnnotations loses the decorators type narrowing
    decorators: [...i18nDecorators, withReactIntl],
};

export default preview;
