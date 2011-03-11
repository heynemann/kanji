
TESTS = test/*.js

test:
	@./support/expresso/bin/expresso \
		-I lib \
		-I support/coffee-script/lib \
		-I support/markdown/lib \
		-I support/sass/lib \
		$(TESTS)

.PHONY: test benchmark
