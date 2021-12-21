FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./

RUN apk add --no-cache --virtual .gyp python3 make g++ \
    && npm ci \
    && apk del .gyp

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:kube"]
