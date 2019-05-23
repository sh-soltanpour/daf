#FROM node:8 as builder
#COPY . .
#RUN npm install && npm run build


FROM nginx

COPY  build/ /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d

#RUN \cp -r ./build/* /usr/share/nginx/html
