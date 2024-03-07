FROM node:18.16.1 as build
WORKDIR /app
COPY package.json .
COPY . .
RUN ls -lt
RUN npm install
RUN npm run build


FROM nginx
RUN apt-get update && apt install -y nodejs
COPY --from=build /app/dist /usr/share/nginx/html
CMD nginx -g 'daemon off;'
