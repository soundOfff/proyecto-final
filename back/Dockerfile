FROM php:8.2-apache

LABEL maintainer="Sergio Milardovich <sergio@polluxcoop.com>" \
    version="1.0"

LABEL com.example.image-name="velo-legal-api"    

COPY --chown=www-data:www-data . /srv/app

COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf 

WORKDIR /srv/app

RUN apt-get update && apt-get install -y libonig-dev git && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install mbstring pdo pdo_mysql \ 
    && a2enmod rewrite negotiation \
    && docker-php-ext-install opcache