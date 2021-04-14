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
yarn
yarn build
yarn start:baseline
yarn start:api
```

## Docker start
Docker and docker-compose are required. If needed change the .env files in the packages/tokenized_if folder.
```
docker build -f packages/tokenized_if/Dockerfile. -t tokenized_if
docker-compose up -d
docker-compose logs -f
```