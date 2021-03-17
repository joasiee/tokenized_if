# Tokenized Inventory Finance
## Requirements
- node
- yarn v1
- docker
- docker-compose
## Running locally
In root folder:
```
yarn
yarn run build
make start
cp packages/tokenized_if/.env.example packages/tokenized_if/.env
yarn workspace tokenized_if run start
```