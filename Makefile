test:
	@vows

setup:
	@cat requirements.txt | xargs npm install

.PHONY: setup test
