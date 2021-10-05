FROM golang:1.16-alpine as backendBuilder

COPY app /app

WORKDIR /app

RUN go build main.go

FROM alpine:latest as frontendBuilder
COPY public /public
WORKDIR /public

RUN apk add nodejs && \
    apk add npm && \
    npm install && \
    npm run build
    
FROM nginx:alpine
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
COPY secrets /secrets
RUN apk add openssl 
    # openssl enc -pbkdf2 -d -aes-256-cbc -in /secrets/serviceAccount.json.enc -out /secrets/serviceAccount.json -pass pass:O0rq434DupSBGtphc1SRHlP8vCOvs07o

COPY --from=backendBuilder /app /app
COPY --from=frontendBuilder /public/build /var/www

# RUN cp /secrets/serviceAccount.json /app
COPY init.sh init.sh
RUN chmod 777 init.sh
CMD ["/bin/sh","init.sh"]