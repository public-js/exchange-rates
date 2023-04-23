import { DataSource, dataSourceConfigs, dataSources } from './lib/configs';
import { httpGet } from './lib/loader';
import { DataSourceConfig, QueryRes, RateResults } from './lib/types';

export class ExchangeRates {
    constructor(private readonly dataSourceParams: Partial<Record<DataSource, string | boolean>>) {}

    public async getRates(base: string, currencies: string[], date?: string): Promise<RateResults> {
        const results: RateResults = {};
        const currenciesLeft = currencies.slice();
        for (const dataSource of dataSources) {
            if (currenciesLeft.length === 0) break;
            if (!this.dataSourceParams[dataSource]) continue;
            const queryResult = await this.queryDataSource(
                dataSourceConfigs[dataSource],
                this.dataSourceParams[dataSource],
                base,
                date,
            );
            this.processResult(results, currenciesLeft, queryResult);
        }
        return results;
    }

    private processResult(results: RateResults, currenciesLeft: string[], queryResult: QueryRes) {
        for (const [cCode, cValue] of queryResult) {
            const ix = currenciesLeft.indexOf(cCode);
            if (ix === -1) continue;
            results[cCode] = cValue;
            currenciesLeft.splice(ix, 1);
        }
    }

    private queryDataSource(
        config: DataSourceConfig,
        apiKey: string | boolean | undefined,
        base: string,
        date?: string,
    ): Promise<QueryRes> {
        return httpGet(config.requestBuilder(apiKey, base, date))
            .then(this.safeParse)
            .then(config.postProcessor)
            .catch(() => []);
    }

    private safeParse(response: string): Record<string, object> {
        try {
            return JSON.parse(response);
        } catch {
            return {};
        }
    }
}
