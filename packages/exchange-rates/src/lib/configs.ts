import { DataSourceConfig, QueryRes } from './types';

export type DataSource =
    | 'OpenexchangeratesOrg'
    | 'ExchangeratesapiIo'
    | 'CurrencyapiCom'
    | 'ExchangerateHost'
    | 'ExchangerateApiCom';

export const dataSources: DataSource[] = [
    'OpenexchangeratesOrg',
    'ExchangeratesapiIo',
    'CurrencyapiCom',
    'ExchangerateHost',
];

export const dataSourceConfigs: Record<DataSource, DataSourceConfig> = {
    OpenexchangeratesOrg: {
        requestBuilder: (apiKey: string | boolean | undefined, base: string, date?: string) => ({
            url: date
                ? `https://openexchangerates.org/api/historical/${date}.json?base=${base}&app_id=${apiKey}`
                : `https://openexchangerates.org/api/latest.json?base=${base}&app_id=${apiKey}`,
        }),
        postProcessor: (obj) => Object.entries(obj['rates'] || {}) satisfies QueryRes,
    },
    ExchangeratesapiIo: {
        requestBuilder: (apiKey: string | boolean | undefined, base: string, date?: string) => ({
            url: date
                ? `https://api.apilayer.com/exchangerates_data/${date}?base=${base}`
                : `https://api.apilayer.com/exchangerates_data/latest?base=${base}`,
            headers: { apikey: apiKey as string },
        }),
        postProcessor: (obj) => Object.entries(obj['rates'] || {}) satisfies QueryRes,
    },
    CurrencyapiCom: {
        requestBuilder: (apiKey: string | boolean | undefined, base: string, date?: string) => ({
            url: date
                ? `https://api.currencyapi.com/v3/historical?date=${date}&base_currency=${base}&apikey=${apiKey}`
                : `https://api.currencyapi.com/v3/latest?base_currency=${base}&apikey=${apiKey}`,
        }),
        postProcessor: (obj) =>
            Object.entries(obj['data'] || {}).map(([cCode, cData]) => [
                cCode,
                (cData as { value: number }).value,
            ]) satisfies QueryRes,
    },
    ExchangerateHost: {
        requestBuilder: (apiKey: string | boolean | undefined, base: string, date?: string) => ({
            url: date
                ? `https://api.exchangerate.host/${date}?base=${base}`
                : `https://api.exchangerate.host/latest?base=${base}`,
        }),
        postProcessor: (obj) => Object.entries(obj['rates'] || {}) satisfies QueryRes,
    },
    ExchangerateApiCom: {
        requestBuilder: (apiKey: string | boolean | undefined, base: string, date?: string) => ({
            url: date
                ? `https://v6.exchangerate-api.com/v6/${apiKey}/history/${base}/${date.split('-').join('/')}`
                : `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`,
        }),
        postProcessor: (obj) => Object.entries(obj['conversion_rates'] || {}) satisfies QueryRes,
    },
};
