FROM node:14.16

# Create app directory
WORKDIR /usr/src/app
RUN npm update -g yarn
RUN npm install -g typescript
RUN npm install -g ts-node


COPY . .

WORKDIR /usr/src/app/packages/shared
RUN yarn --non-interactive
RUN yarn run build

WORKDIR /usr/src/app/packages/token_registry
RUN yarn --non-interactive
RUN yarn run build

WORKDIR /usr/src/app/packages/messaging
RUN yarn --non-interactive

WORKDIR /usr/src/app/packages/tokenized_if
RUN yarn --non-interactive
RUN yarn run build

WORKDIR /usr/src/app
RUN yarn --non-interactive
RUN yarn run build

WORKDIR /usr/src/app/packages/tokenized_if/
EXPOSE 80
CMD ts-node -r dotenv-flow/config src/app.ts