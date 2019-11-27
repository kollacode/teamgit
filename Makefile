all: readme.md
	pandoc -s -o readme.html -t html -f gfm ./readme.md
