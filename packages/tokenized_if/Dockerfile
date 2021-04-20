FROM node:14.16.0

WORKDIR /usr/src/app
COPY package.json .
COPY lerna.json .
COPY tsconfig.base.json .
COPY tsconfig.json .
COPY packages/tokenized_if ./packages/tokenized_if
COPY packages/shared ./packages/shared
COPY packages/token_registry ./packages/token_registry
COPY packages/messaging ./packages/messaging

RUN yarn --pure-lockfile --non-interactive
RUN yarn build

WORKDIR /usr/src/app/packages/tokenized_if