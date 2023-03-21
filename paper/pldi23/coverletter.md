# Cover Letter

We thank the reviewers for providing valuable feedback and guidance
throughout the review process. Their comments have helped to improve the quality
of the manuscript.

We have addressed the comments as follows:

## Title

Two reviewers suggested a title change: "... of Programming Language
Implementations" to "... of JavaScript Implementations."

We considered changing the title, but we decided to keep the original title 
because the _feature-sensitive coverage criteria_ are general graph coverage criteria
applicable to mechanized specifications of any programming languages after adapting them into graphs.

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
paper. We tried to remove or replace the term in the paper, but we decided to keep them
because our work is highly related to the test requirements for graph coverage criteria.


## Comment C4

Reviewer C suggested not renaming or redefining well-known concepts in the literature.
Thus, we made the following changes:

- `full paths` to `test paths`
- `valid paths` to `feasible paths`

In addition, to make the differences between `covers` and `visits` clear, we added the following footnote:

> Another way to define node coverage is using a _visit relation_ between paths
> and any nodes in the paths. However, we use a _cover relation_ between paths
> and the last nodes in the paths because it is suitable for further extensions
> of graph coverage.

## Comment D2

Reviewer D suggested including more illustrative figures and examples in the
paper. While we agree that more figures and examples would make the paper more understandable,
we could add them due to the page limit. We plan to include them in an extended version of the paper.

## Comment D5

Reviewer D suggested analyzing the distribution of triggered bugs for each
implementation for each coverage criterion. While we agree that it would be
interesting and give more insights into the applicability of our technique,
the page limit does not allow us to add them. We plan to include them in an extended version of the paper.
