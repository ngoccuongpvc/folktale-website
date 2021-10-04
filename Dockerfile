FROM golang:1.16-alpine as backendBuilder

COPY app /app

WORKDIR /app

RUN go build main.go

FROM alpine:latest as frontendBuilder
COPY public /public
WORKDIR /public

RUN apk add nodejs && \
    apk add npm && \
    # rm -rf node_modules && \
    npm install && \
    npm run build
    
FROM nginx:alpine
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
COPY secrets /secrets
RUN apk add openssl

COPY --from=backendBuilder /app/main /app/main
COPY --from=frontendBuilder /public/build /var/www
COPY init.sh init.sh
RUN chmod 777 init.sh
CMD ["/bin/sh","init.sh"]