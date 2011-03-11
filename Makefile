help:
	@echo 'In order to run tests use "make test".'
	@echo 'To update the grammar use "make grammar".'
	@echo 'For requirements bootstrapping use "make setup".'

test:
	@vows

grammar:
	@jison ./kanji/grammar.jison

setup:
	@cat requirements.txt | xargs npm install

.PHONY: help test grammar setup
