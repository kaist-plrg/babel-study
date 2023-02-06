## Review A (Score: 3 / Expertise: 2)

- **Generality** - How well would the techniques here generalize to other
  languages? I would enjoy seeing some focused discussion about the generality
  of the techniques in the paper.

- **Evaluation**

  - **Mutator** - I think it would be meaningful to examine if and how some of
    these mutations fit better in this setting (what about string VS object
    substitution?).

  - **False Positive** - Did the authors encounter any cases where the
    implementation led to false positives, e.g., due to bugs or design?

  - **Properties of Detected Bugs** - I would like to have learned more about
    the nature of the rest of the identified bugs. What was going on with those?
    Do they have common characteristics? Are there any specific categories
    identified?

  - **Size of Programs** - What is the typical size of the generated programs?

- **Typos**

  - In the beginning of 2.1.1 please make sure to mention that the labels
    annotated in the algorithms will be put in context later on to avoid
    confusion. I was initially confused and thought that they were footnotes.
    Later in 2.2 I understood what was going on.

  - Make sure that footnote numbers in the text follow punctuation.

  - [Section 1]: [...] when their semantics descriptions use [...] ---> [...]
    when their semantic descriptions use [...]

  - [Section 5.3]: [...] we introduce a conformance bug example that show the
    effectiveness [...] ---> [...] we introduce a conformance bug example that
    shows the effectiveness [...]


## Review B (Score: 3 / Expertise: 3)

**I also greatly appreciated the pervasiveness of the Figure 5 example
throughout the presentation.**

- **Generality** - Have you attempted to apply this criterion to any other
  setting?

- **Generality** - Can you convey any intuition as to why these criteria are
  more general than an interesting but JEST-specific optimization?

- **Comparison of JIT-picking, COMFORT, and JEST** - But they differ both in 1)
  the oracle used and 2) test generation method - have you thought of any way to
  compare across such changes?

- **Description of Mech. Spec.** - "mechanized specifications use functions to
  describe the semantics of language features".

  That is not really true. Many mechanized specifications use inductively
  defined specifications (including Ott, but mostly in languages like
  Agda/Coq/Isabelle) to account for features like non-termination,
  non-determinism, etc. Graph coverage techniques could work there, but need to
  be adopted.

- **Dense Abbreviations in Evaluation** - The number of "k-F(CP)S-TR"
  occurrences per sentence starts to be quite high. I don't have a concrete
  suggestion to fix it, but it's something to keep in mind when revising the
  paper.


## Review C (Score: 2 / Expertise: 4)

- **Novelty** - It possibly _re-invents the wheel_, and the fact that using more
  advanced criteria helped find more bugs than using basic criteria does not
  strike me as a big enough research contribution.

  Equating "node and branch coverage" with "traditional graph coverage" is
  wrong. Section 3.2 cites more advanced traditional graph coverage criteria
  from [4] that can help find more bugs than node and branch coverage. So, there
  is nothing new about the need for stronger criteria.

- **Comparison with Prime-Path Coverage** - Prime-path coverage is agnostic to
  the source of graphs. In any case, the software testing literature is full of
  hundreds of coverage criteria and introducing a new criteria requires showing
  that the new ones being proposed cannot be equivalent to, or are not subsumed
  by, existing criteria. This paper does not seem to meet that burden of proof.

- **Logic Coverage Criteria for Infection** - Graph coverage criteria help with
  reachability but not always with infection. The "2n+1" vs "2n-1" example makes
  me think that the aim is to increase that the inputs infect program state. If
  that is the case, then perhaps what is needed is to use logic coverage
  criteria together with existing graph coverage criteria during conformance
  test generation? If one were to use node+branch coverage with logic coverage
  criteria like Active Clause coverage for conformance test generation, would FS
  and FCPS still be more effective?

- **Explanation of Example 5** - As an aside, the "2n+1" vs "2n-1" example is
  unclear to me. If throwing TypeError in node 17 is an atomic operation, then
  why do we need two tests to check that behavior? If it is not atomic, then
  node 17 is really a sub-graph with multiple nodes and existing graph coverage
  criteria should be able to distinguish the paths that are traversed by each
  test in that sub-graph. In any case, what is important is to show cases where
  using node and graph coverage is insufficient for triggering a real bug and
  the paper does not do that.

- **Really No Existing Criteria Solving This Problem?** - The statement of the
  two challenges that are given in lines 118-119 and lines 121-122 hints that
  the problems apply when testing any kind of software. When I replace "language
  features" in those sentences with "functions", the two problems seem general.
  So, it is unlikely that no existing criteria can handle these problems.

- **Do Not Use Different Term** - A few examples: lines 366-367 use "full paths"
  to describe what [4] calls "test paths", lines 403-404 use "covers" to
  describe what [4] calls "visits or tours", line 409 uses "valid" to describe
  what [4] describes as "feasible", the definition on line 415 to make the
  toured path end in p seems unnecessary.

- **Handling of Infeasible Test Requirements** - How does JEST_fs handle test
  requirements that are infeasible according the proposed test criteria?

- **Evaluation**

  - Is the 0-FS row in Table 2 the same as JEST? If not, why is there no
    comparison with JEST?

  - What approach is being used to compute unique bugs in Table 1 (it's not in
    Fig. 8), and what is the total number of non-unique bugs (that is what the
    users will see)?

  - Why is the total number of unique bugs in Table 2 different from the one in
    Table 1?

  - Are the bugs found by 1-fs a strict subset of those found by 2-fs (same
    question for 1-fcps vs. 2-fcps)?

- **Typos**

  - Line 373: depeicted --> depicted

  - Line 905: (b) --> (a)


## Review D (Score: 4 / Expertise: 4)

**I enjoyed reading this paper! For its technical contributions, I recommend
that this paper be accepted to PLDI.**

**The result---feature-aware fuzzing of a mechanized language specification to
produce a test suite---is novel to my knowledge.**

- **Generality** - It is not clear that languages other than JavaScript have
  mechanized specifications that are amenable to the approach taken by JEST and
  JEST_fs.

  Ultimately, however, the paper leaves me uncertain that the specifications of
  those languages are in a suitable form for a tool like JEST_fs. The structure
  of ECMA-262 seems particularly well-suited to deriving an interpreter and its
  CFG (Figure 5); how much effort would be required to do the same for one of
  the other languages listed?

  In your opinion, what is the practical feasibility of developing a
  JEST_fs-like tool for a language other than JavaScript?

- **Core is Too Dense / Notation-Heavy** - The presentation of the FS and FCPS
  criteria (S3.1 through S3.4) is difficult to read and understand. The
  presentation is dense and notation-heavy. More illustrative figures and
  examples would be welcome.

  I feel that the effort I put into understanding S3 was rewarded, but I also
  think that the discussion could be made more "intuitively understandable"
  through the addition of more examples/pictures and higher-level discussion,
  and **perhaps moving some of the notation to an appendix**.

- **Test Generation Time** - I'm not sure what to make of the fact that about
  one-third of the detected bugs (55) could be triggered by the 2.1K synthesized
  tests for the 0-FS coverage criterion---which is essentially node coverage of
  the CFG, unless I am mistaken. The paper does not state how long it took for
  JEST_fs to generate the test suite for this criterion, but reference 43 states
  that JEST could generate 1.1K programs in about 10 seconds, so I assume that
  JEST_fs would generate the 0-FS test suite quite speedily.

  How should a reader interpret the reported result that about 1/3 of the bugs
  detected in the study were triggered by the test suite generated for 0-FS? (In
  other words, for these implementations, why should one use {1,2}-{FS,FCPS} to
  get test suite in hours, when one can generate a bug-triggering test suite
  using 0-FS in a few minutes?)
