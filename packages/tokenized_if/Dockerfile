FROM node:14

# Create app directory
WORKDIR /usr/src/app
RUN npm update -g yarn
RUN npm install -g typescript
RUN npm install -g ts-node


COPY packages/shared ../shared
COPY packages/token_registry ../token_registry
COPY packages/messaging  ../messaging

WORKDIR /usr/src/shared
RUN yarn --non-interactive
RUN yarn run build

WORKDIR /usr/src/token_registry
RUN yarn --non-interactive
RUN yarn run build

WORKDIR /usr/src/messaging
RUN yarn --non-interactive

WORKDIR /usr/src/app
COPY packages/tokenized_if/package.json ./

RUN yarn --non-interactive
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY packages/tokenized_if/ .
COPY tsconfig.base.json ../../tsconfig.base.json

EXPOSE 80
CMD ts-node -r dotenv-flow/config src/app.ts