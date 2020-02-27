FROM nginx:stable-alpine

COPY production/nginx/deja_brew.conf /etc/nginx/conf.d/default.conf
COPY build/ /build

EXPOSE 80
