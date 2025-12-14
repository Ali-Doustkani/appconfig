FROM alpine:3.23.0

COPY init_container.sh /init_container.sh
COPY sshd_config /etc/ssh/sshd_config

RUN chmod +x /init_container.sh \
    && apk update \
    && apk add --no-cache openssh lighttpd \
    && echo "root:Docker!" | chpasswd \
    && mkdir /var/run/sshd \
    && ssh-keygen -A

EXPOSE 80 2222

ENTRYPOINT ["/init_container.sh"]