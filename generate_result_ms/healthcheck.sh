#!/bin/sh

if [ -f "/data/mydatabase.db" ]; then
  echo "SQLite database file exists."
  exit 0
else
  echo "SQLite database file does not exist."
  exit 1
fi
