#!/bin/sh

# Get env vars in the Dockerfile to show up in the SSH session
eval $(printenv | sed -n "s/^\([^=]\+\)=\(.*\)$/export \1=\2/p" | sed 's/"/\\\"/g' | sed '/=/s//="/' | sed 's/$/"/' >> /etc/profile)

/usr/sbin/sshd
mkdir -p /var/www/localhost/htdocs && echo "HTTP OK" > /var/www/localhost/htdocs/index.html
lighttpd -D -f /etc/lighttpd/lighttpd.conf