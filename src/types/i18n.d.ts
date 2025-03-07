import { INTL_STYLE, LANGUAGES } from '@/const/index.ts';

type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES]

type Theme = 'dark' | 'light' | 'system'

interface i18n {
  record: string;
  stop: string;
  recording: string;
  selectSource: string;
  settings: string;
  time: {
    hour: string;
    hours: string;
    minute: string;
    minutes: string;
    second: string;
    seconds: string;
  }
  fileCount: {
    one: `{{count}} ${string}`
    others: `{{count}} ${string}`
  }
}

type IntlStyle = (typeof INTL_STYLE)[keyof typeof INTL_STYLE]

type DateTimeFormatOptions =
  Intl.DateTimeFormatOptions & {
    dateStyle?: IntlStyle
    timeStyle?: IntlStyle
  }

type NumberFormatOptions =
  Intl.NumberFormatOptions & {
    style?: 'decimal' | 'currency' | 'percent';
    currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name'
  }

export type {
  DateTimeFormatOptions, i18n, IntlStyle, Language, NumberFormatOptions, Window, Theme
};

