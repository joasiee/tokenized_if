FROM node:14

# Create app directory
WORKDIR /usr/src/app
RUN npm update -g yarn
RUN npm install -g typescript
RUN npm install -g ts-node
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY packages/shared ../shared
WORKDIR /usr/src/shared
RUN yarn --non-interactive
RUN yarn run build

WORKDIR /usr/src/app
COPY packages/messaging/package.json ./

RUN yarn --non-interactive
RUN npm run tsc
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY packages/messaging/ .

EXPOSE 80
CMD ["yarn", "run", "start"]