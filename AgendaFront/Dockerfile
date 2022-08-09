FROM node:latest as AgendaFront
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=AgendaFront app/dist/agenda-front /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t calendario .
# docker run -p 8081:80 calendario

# Loiane Groner
