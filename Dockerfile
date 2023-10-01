FROM node:18-alpine
LABEL authors="Hanriel"

WORKDIR /user/src/app

COPY /server .

RUN npm ci --omit=dev

RUN npm run build

USER node

CMD ["npm", "run", "start:prod"]