import { ExchangeRates } from './exchange-rates';

describe('ExchangeRates', () => {
    it('should create', () => {
        const service = new ExchangeRates({});
        expect(service).toBeTruthy();
    });
});
