# @public-js/exchange-rates

[![Build](https://github.com/public-js/exchange-rates/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/public-js/exchange-rates/actions/workflows/build.yml)
[![Version](https://img.shields.io/npm/v/@public-js/exchange-rates?style=flat)](https://www.npmjs.com/package/@public-js/exchange-rates)
[![Downloads](https://img.shields.io/npm/dw/@public-js/exchange-rates?style=flat)](https://www.npmjs.com/package/@public-js/exchange-rates)
[![Size](https://packagephobia.com/badge?p=@public-js/exchange-rates)](https://packagephobia.com/result?p=@public-js/exchange-rates)

[![CodeQL](https://github.com/public-js/exchange-rates/actions/workflows/codeql-analyze.yml/badge.svg?branch=main)](https://github.com/public-js/exchange-rates/actions/workflows/codeql-analyze.yml)
[![Codacy](https://app.codacy.com/project/badge/Grade/e3d09c538f634546a871d4b80bc39bb4)](https://app.codacy.com/gh/public-js/exchange-rates/dashboard)
[![Codecov](https://codecov.io/gh/public-js/exchange-rates/branch/main/graph/badge.svg?token=BbVsomZtwx)](https://codecov.io/gh/public-js/exchange-rates)
[![Code Climate](https://api.codeclimate.com/v1/badges/c08e945d06ec12bafda3/maintainability)](https://codeclimate.com/github/public-js/exchange-rates/maintainability)

An extensive exchange rates API client supporting multiple services for best results

---

## Installing

Add the package to your project by running:

```shell
npm i @public-js/exchange-rates
```

## Usage

Instantiate a class:

```javascript
import { ExchangeRates } from '@public-js/exchange-rates';

const service = await new ExchangeRates({
  OpenexchangeratesOrg: env.OXR_API_KEY,
  ExchangerateHost: true,
});
```

Fetch the **latest** rates:

```javascript
const rates = await service.getRates('USD', ['EUR', 'CNY']);
console.log(rates); // {"CNY":6.8936,"EUR":0.901185}
```

Fetch the **historical** rates:

```javascript
const rates = await service.getRates('USD', ['EUR', 'CNY'], '2023-01-15');
console.log(rates); // {"CNY":6.8936,"EUR":0.901185}
```

## Supported services

- `OpenexchangeratesOrg` – [has a limited free plan](https://openexchangerates.org/signup)
- `ExchangeratesapiIo` – [has a limited free plan](https://exchangeratesapi.io/#pricing_plan)
- `CurrencyapiCom` – [has a limited free plan](https://currencyapi.com/pricing)
- `ExchangerateHost` – [free to use, accepts donations](https://exchangerate.host/#/donate)
- `ExchangerateApiCom` – [has a limited free plan](https://www.exchangerate-api.com/#pricing)

> **Note**
> The majority of services require an API key/token to work.
> This doesn't apply to ExchangerateHost, which needs any truthy value provided as a key to be active.

## How does it work

When the `ExchangeRates` class is instantiated it requires a configuration object to be provided.
The said object has to list the desired services and their respective API keys/tokens.

Since some of the services don't handle unsupported currency codes well, they will be queried for
a full rates list which then gets filtered out.
This process is repeated for each service until all of them are queried or the required currencies are fetched.

The order of the services is listed in the "Supported services" section, it can't be altered at a time and
is pre-defined based on data reliability, precision and currency coverage.
It is possible however to enable only part of the supported services by providing only some of the API keys.

## Resources

- [Changelog](CHANGELOG.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

## License

MIT, [full license text](LICENSE).
Read more about it on [TLDRLegal](https://www.tldrlegal.com/l/mit).
