source ./environment.sh # Customize environment
export SPACE_LOG_ENABLED=true
export SPACE_LOG_MIN_LEVEL='debug'


if [ "$PORT" ]; then
  meteor --port $PORT --allow-incompatible-update
else
  meteor --allow-incompatible-update
fi
