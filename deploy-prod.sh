#!/usr/bin/env bash
[[ ! -s "$(git rev-parse --git-dir)/shallow" ]] || git fetch --unshallow
git push git@scalingo.com:meteor-space-donations.git master
