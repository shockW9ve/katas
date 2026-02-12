.PHONY: test-all ts csharp clean

ts:
	cd typescript/string-calculator && npm test
	cd typescript/mars-rover-ts && npm test
	cd typescript/tennis && npm test

csharp:
	cd csharp && dotnet test

clean:
	cd typescript/string-calculator && npm run clean || true

test-all: ts csharp
