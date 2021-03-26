# Tokenized Inventory Finance

## Requirements

- node
- yarn v1
- docker
- docker-compose

Possibly necessary:

```
npm install -g node-gyp
```

## Running locally

In root folder:

```
cp packages/baseline/.env.example packages/baseline/.env
yarn
yarn build
make start
yarn start:baseline
yarn start:api
```
