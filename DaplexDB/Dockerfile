FROM mariadb:latest

EXPOSE 3306

ENV MYSQL_ROOT_PASSWORD=password

WORKDIR /init
COPY init-db.* ./

RUN chmod +x ./init-db.sh

RUN ./init-db.sh
