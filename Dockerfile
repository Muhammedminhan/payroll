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
    libffi-dev

COPY requirements.txt /youpayroll/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /youpayroll/
RUN chmod +x /youpayroll/entrypoint.sh
ENTRYPOINT ["/youpayroll/entrypoint.sh"]

