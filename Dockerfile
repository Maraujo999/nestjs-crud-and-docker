FROM node:16

WORKDIR /usr/src/api

COPY . .

COPY ./.env.development ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]