help:
	@echo 'In order to run tests use "make test".'
	@echo 'For requirements bootstrapping use "make setup".'

test:
	@vows

setup:
	@cat requirements.txt | xargs npm install

.PHONY: help test grammar setup
