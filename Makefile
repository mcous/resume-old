# makefile for generating html and pdfs of the markdown formatted resume and also for publishing those files to github pages

PYTHON_VERSION := 2.7.9
VIRTUAL_ENV_NAME := resume-$(PYTHON_VERSION)
BREW_DEPS := pyenv pyenv-virtualenv cairo pango gdk-pixbuf libxml2 libxslt libffi watchman
WEASY_OPTS :=

SRC_FILES := resume.md resume.css
BUILD_FILES := index.html cousins.pdf
PUBLISH_FILES := CNAME resume.css $(BUILD_FILES)

REPO_ADDRESS := $(shell git config --local remote.origin.url)

all: cousins.pdf

install: virtualenv
	pip install weasyprint

deps:
	brew install $(BREW_DEPS)
	pyenv install -s $(PYTHON_VERSION)

virtualenv: deps
	if [[ `pyenv versions` =~ $$VIRTUAL_ENV_NAME ]]; then     \
		pyenv virtualenv $(PYTHON_VERSION) $(VIRTUAL_ENV_NAME); \
	fi
	pyenv local $(VIRTUAL_ENV_NAME)

clean:
	rm $(BUILD_FILES)

watch:
	watchman watch $(shell pwd)
	watchman -- trigger $(shell pwd) remake $(SRC_FILES) -- make cousins.pdf

unwatch:
	watchman watch-del $(shell pwd)

publish: cousins.pdf
	mkdir publish
	cp $(PUBLISH_FILES) publish
	cd publish && \
	git init && \
	git add --all && \
	git commit -m "deploy $(shell date '+%Y/%m/%d %H:%M:%S %Z')" && \
	git push $(REPO_ADDRESS) master:gh-pages --force && \
	cd .. && \
	rm -rf publish

cousins.pdf: index.html
	weasyprint index.html cousins.pdf

index.html: resume.md resume.css
	echo '<!DOCTYPE html><html><head><link href="resume.css" rel="stylesheet"></head><body>' > index.html
	markdown resume.md >> index.html
	echo '</body></html>' >> index.html

.PHONY: install deps deploy
