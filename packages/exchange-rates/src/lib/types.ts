import { OutgoingHttpHeaders } from 'node:http';

export type HttpGetInput = { url: string; headers?: OutgoingHttpHeaders };

export type QueryRes = Array<[string, number]>;

export interface DataSourceConfig {
    requestBuilder: (apiKey: string | boolean | undefined, base: string, date?: string) => HttpGetInput;
    postProcessor: (obj: Record<string, object>) => QueryRes;
}

export type RateResults = Record<string, number>;
