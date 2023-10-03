<p align="center">
  <a href="http://edumgt-api.hanriel.ru/" target="blank"><img src="https://edumgt.hanriel.ru/images/logo-180x180.png" width="180" alt="EDUMGT Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">API for <a href="http://edumgt.hanriel.ru" target="_blank">EDUMGT</a> project.</p>
  <p align="center">

[![Quality Gate Status](https://sonarqube.hanriel.ru/api/project_badges/measure?project=hanriel_edumgt-back_AYmQPadDN-ibcQjN1GP6&metric=alert_status&token=sqb_3119b5ad16e710da9a5d1eda6a052fd48a389ab7)](https://sonarqube.hanriel.ru/dashboard?id=hanriel_edumgt-back_AYmQPadDN-ibcQjN1GP6)
[![Docker deployment](https://github.com/hanriel/EDUMGT-API/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/hanriel/EDUMGT-API/actions/workflows/deploy.yml)

  </p>

## Description

EDUMGT-API - API for EDUMGT (Education organization managhment system). Basen on [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Build docker image

```bash
docker build -t edumgt-api:latest
```

## Enviroment varibles

### Database

```env
DB_HOST = "127.0.0.1"
DB_PORT = "3306"
DB_USER = "user"
DB_PASSWORD = "password"
DB_NAME = "edumgt"
```

### TelegramBot

```env
TELEGRAM_BOT_TOKEN = "12345"
ADMIN_TG_CHATID = "1234"
```

### EPOS ([epos.permkrai.ru/](https://epos.permkrai.ru))

```env
EPOS_LOGIN = "1234"
EPOS_PASSWORD = "1234"
```

## Test (not now)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Danil Fedoseev](https://hanriel.ru)
- Website - [https://edumgt-api.hanriel.ru](https://edumgt-api.hanriel.ru/)

## License

EDUMGT-API is [MIT licensed](LICENSE).
