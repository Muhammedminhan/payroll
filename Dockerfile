FROM python:3.11.4-alpine3.17
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /youpayroll

# Install system dependencies
RUN apk add --no-cache \
    gcc \
    musl-dev \
    postgresql-dev \
    libjpeg-turbo-dev \
    zlib-dev \
    libffi-dev \
    netcat-openbsd

COPY requirements.txt /youpayroll/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Create a non-root user and set permissions
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /youpayroll

COPY . /youpayroll/
RUN chmod +x /youpayroll/entrypoint.sh

USER appuser

ENTRYPOINT ["/youpayroll/entrypoint.sh"]

