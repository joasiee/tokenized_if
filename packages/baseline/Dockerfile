FROM node:14.16.0

WORKDIR /usr/src/app

COPY package.json .
COPY lerna.json .
COPY yarn.lock .
COPY tsconfig.base.json .
COPY tsconfig.json .
COPY packages/baseline ./packages/baseline
COPY packages/shared ./packages/shared

RUN yarn --pure-lockfile --non-interactive
RUN yarn build

WORKDIR /usr/src/app/packages/baseline