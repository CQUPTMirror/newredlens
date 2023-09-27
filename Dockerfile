FROM caddy:latest

COPY dist /usr/share/caddy/

RUN wget -O- https://github.com/CQUPTMirror/cqupt-mirrors-howto/archive/refs/heads/master.tar.gz | tar -xzv cqupt-mirrors-howto-master/docs --strip-components 1 -C /usr/share/caddy/
