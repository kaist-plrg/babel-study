TEX=pdflatex
BIB=bibtex
MAIN=main

all: $(MAIN).pdf

$(MAIN).pdf: $(MAIN).tex references.bib
	$(TEX) $(MAIN).tex
	$(BIB) $(MAIN) || true
	$(TEX) $(MAIN).tex
	$(TEX) $(MAIN).tex

clean:
	rm -f $(MAIN).aux $(MAIN).log $(MAIN).bbl $(MAIN).blg $(MAIN).fls $(MAIN).fdb_latexmk $(MAIN).pdf

.PHONY: all clean
