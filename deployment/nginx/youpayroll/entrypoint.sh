#!/bin/sh
set -m

pid=0

# SIGTERM handler
term_handler() {
  echo "Caught SIGTERM signal!"
  echo "Caught SIGTERM signal!" >> /var/log/nginx/error.log
  sleep 1
  if [ "$pid" -ne 0 ]; then
    kill -QUIT "$pid"
    wait "$pid"
  fi
  exit 143;
}

trap 'term_handler' SIGTERM

allowlist_regex="${VINTON_GRAY_CERF_XFF_ALLOWLIST_REGEX:-^(?!)$}"

case "$allowlist_regex" in
  *'
'*|*';'*)
    echo "Invalid VINTON_GRAY_CERF_XFF_ALLOWLIST_REGEX"
    echo "Invalid VINTON_GRAY_CERF_XFF_ALLOWLIST_REGEX" >> /var/log/nginx/error.log
    exit 1
    ;;
esac

case "$allowlist_regex" in
  '^'*'$')
    ;;
  *)
    echo "VINTON_GRAY_CERF_XFF_ALLOWLIST_REGEX must be anchored with ^ and $"
    echo "VINTON_GRAY_CERF_XFF_ALLOWLIST_REGEX must be anchored with ^ and $" >> /var/log/nginx/error.log
    exit 1
    ;;
esac

printf '~%s 1;\n' "$allowlist_regex" > /ygag/nginx/conf/vinton-gray-cerf-allowlist.conf

./sbin/nginx -p /ygag/nginx/ >> /var/log/nginx/error.log 2>&1 &

pid="$!"

# wait indefinitely
wait
