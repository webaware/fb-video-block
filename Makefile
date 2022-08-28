.PHONY: all favicons lint lint-js lint-php

all:
	@echo please see Makefile for available builds / commands

# build JavaScript targets

JSX_SRC_DIR		:= source/jsx
JSX_TGT_DIR		:= static/js
JSX_SRCS		:= $(shell find $(JSX_SRC_DIR) -name '*.jsx' -print)
JSX_TGTS		:= $(JSX_SRCS:$(JSX_SRC_DIR)/%.jsx=$(JSX_TGT_DIR)/%.js)

js: $(JSX_TGTS)

$(JSX_TGTS): $(JSX_TGT_DIR)/%.js: $(JSX_SRC_DIR)/%.jsx
	npx babel --source-type script --plugins transform-react-jsx --presets @babel/preset-env --out-file $@ $<
	npx uglify-js $@ --output $(basename $@).min.js -b beautify=false,ascii_only -c -m
	@$(MARK_BUILD_TIME)

# code linters

lint: lint-js lint-php

lint-js:
	@echo JavaScript lint...
	@npx eslint --ext js,jsx $(JSX_SRC_DIR)

lint-php:
	@echo PHP lint...
	@find . -path ./vendor -prune -o -path ./node_modules -prune -o -name '*.php' -exec php -l '{}' \; >/dev/null
	@vendor/bin/phpcs -ps
