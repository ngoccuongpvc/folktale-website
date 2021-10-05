#!/bin/sh
if [[ -z "${PORT}" ]]; then
  LISTENING_PORT="80"
else
  LISTENING_PORT="${PORT}"
fi

sed -i -e 's/$PORT/'"$LISTENING_PORT"'/g' /etc/nginx/nginx.conf

( cd /app && \
  openssl enc -pbkdf2 -d -aes-256-cbc -in /secrets/serviceAccount.json.enc -out /app/serviceAccount.json -pass pass:O0rq434DupSBGtphc1SRHlP8vCOvs07o && \
  ./main & )
nginx -g 'daemon off;'