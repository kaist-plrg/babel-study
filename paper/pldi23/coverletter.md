# Cover Letter

I want to thank the reviewers for providing valuable feedback and guidance
throughout the review process. Their comments have helped to improve the quality
of the manuscript.

We have addressed the comments as follows:

## Title

Two reviewers suggested a title change: "...of Programming Language
Implementations" to "...of JavaScript Implementations."

However, we have decided to keep the original title of our paper, as we believe
it accurately reflects the scope and applicability of our technique. The
_feature-sensitive coverage criteria_ are general graph coverage criteria
applicable to mechanized specifications of any programming languages after
adapting them into graphs.

## Comment B3

Reviewer B said as follows:

> Many mechanized specifications use inductively defined specifications
> (including Ott, but mostly in languages like Agda/Coq/Isabelle) to account for
> features like non-termination, non-determinism, etc. Graph coverage techniques
> could work there, but need to be adopted.
>
> > "mechanized specifications use functions to describe the semantics of
> > language features".

To apply this comment, we changed the following sentence:

> Since mechanized specifications use functions to describe the semantics of
> language features, traditional graph coverage criteria for software work as
> they are.

as follows:

> Mechanized specifications use functions or inductive definitions to describe
> the semantics of language features. Thus, it is possible to convert them as
> directed graphs and adapt them to apply traditional graph coverage criteria
> for software.


## Comment B4

Reviewer B suggested reducing the number of occurrences of "k-F(CP)S-TR" in the
paper. While we agree that the term occurs too often, we found that it is
difficult to remove or replace the term in the paper because our work is highly
related to the test requirements for graph coverage criteria. Thus, we decided
to keep the term in the final version of the paper.


## Comment C4

Reviewer C suggested not renaming or redefining the well-known concepts in the
other references. We agree that it is better to keep the original names of the
concepts as much as possible. Thus, we have changed the following terms:

- `full paths` to `test paths`
- `valid paths` to `feasible paths`

However, we decided to use the term `covers` rather than `visits` because it
slightly differs from the definition of `visits` in [4]. The definition of
`covers` is defined based on the last node in the path, while the definition of
`visits` is on any node in the path. Because it is much easier to define the
feature-sensitive coverage criteria based on the last node in the path, we
decided to use the term `covers` rather than `visits`. To be clear about the
difference between `covers` and `visits`, we have added the following sentence
as a footnote in the paper:

> Another way to define node coverage is using a _visit relation_ between paths
> and any nodes in the paths. However, we use a _cover relation_ between paths
> and the last nodes in the paths because it is suitable for further extensions
> of graph coverage.

## Comment D2

Reviewer D suggested including more illustrative figures and examples in the
paper. We agree that the paper would be more understandable if we included more
illustrative figures and examples. However, because of the page limitation of
the conference (still 20 pages), we decided not to include more illustrative
figures and examples in the final version.

## Comment D5

Reviewer D suggested analyzing the distribution of triggered bugs for each
implementation for each coverage criterion. We agree that it would be
interesting and give more insights into the applicability of our technique
because it would show how the coverage criteria can be used to find bugs in
different implementations. However, because of the page limitation of the
conference (still 20 pages), we decided not to include a more detailed
evaluation in the final version.
