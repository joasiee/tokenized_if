# Tokenized Inventory Finance

## Requirements

- node
- yarn v1
- docker
- docker-compose

## Running locally

This will start a single stack, containing:

- baseline backend
- api backend
- frontend

```
docker-compose up -d
```

## Building locally

```
yarn
yarn build
```

Then to run the tests:

```
yarn lerna run test
```
