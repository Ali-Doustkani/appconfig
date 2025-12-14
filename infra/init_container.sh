#!/bin/sh
/usr/sbin/sshd
mkdir -p /var/www/localhost/htdocs && echo "HTTP OK" > /var/www/localhost/htdocs/index.html
lighttpd -D -f /etc/lighttpd/lighttpd.conf