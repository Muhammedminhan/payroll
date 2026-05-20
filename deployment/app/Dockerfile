ARG REQ_IMAGE

FROM $REQ_IMAGE

WORKDIR /ygag

# Switch to root temporarily to copy files and set ownership
USER root

ADD ./ /ygag

RUN chown -R ygag:ygag /ygag

# Switch back to the non-root user ygag (created in the base image)
USER ygag

EXPOSE 8000
