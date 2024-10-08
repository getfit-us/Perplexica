FROM node:slim

ARG SEARXNG_API_URL
ENV SEARXNG_API_URL=${SEARXNG_API_URL}

WORKDIR /home/perplexica

COPY src /home/perplexica/src
COPY tsconfig.json /home/perplexica/
COPY config.toml /home/perplexica/
COPY drizzle.config.ts /home/perplexica/
COPY package.json /home/perplexica/
COPY package-lock.json /home/perplexica/

RUN mkdir /home/perplexica/data

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]