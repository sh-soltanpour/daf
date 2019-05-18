FROM node:8 as builder
COPY . .
RUN npm install && npm run build


FROM nginx

COPY --from=builder build/ /usr/share/nginx/html

#RUN \cp -r ./build/* /usr/share/nginx/html
