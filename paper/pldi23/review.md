PLDI 2023 Paper #131 Reviews and Comments
===========================================================================
Paper #131 Feature-Sensitive Coverage for Conformance Testing of
Programming Language Implementations


Review #131A
===========================================================================

Overall merit
-------------
3. Weak accept

Reviewer expertise
------------------
2. Some familiarity

Paper summary
-------------
This paper proposes criteria to aid the generation of conformance tests that in
turn can be used to exercise language features. Initially, the authors point out
that there are elements (i.e. helper functions) that are (1) common between
different language features and (2) used in different parts of the same
language, that are not properly exercised when using the conformance tests of
the current sota. To tackle this problem they propose two coverage criteria and
utilize them to generate test cases through coverage-guided fuzzing. Their
implementation involved the extension of an existing framework. The paper
demonstrates the practical success of the method in detecting bugs in different
JavaScript implementations.

Comments for authors
--------------------
* Strengths
	+ An interesting, motivated problem
	+ Properties are well defined
	+ Extensive evaluation and evidence for the technique's effectiveness

* Weaknesses
	- Not-so-well-written at times
  - No specific theoretical reason why these mutations performed by the program
    mutator are chosen

This paper is well structured and the criteria are clearly explained. The
authors utilize one of the traditional fuzzing ideas i.e. using coverage for
guiding program generation for detecting bugs. The well-defined, guiding
criteria (which are based on simple, yet interesting observations) seem to play
an important role. Examining paths to check if a test case will remain in the
pool is an interesting take that seems to be effective.

An issue involves the test synthesis. The authors have extended an existing
framework and they employed all five mutations that it incorporates. I think it
would be meaningful to examine if and how some of these mutations fit better in
this setting (what about string VS object substitution?).

I have a number of questions for clarification or curiosity, and hope the
authors could answer in the response:

- What is the typical size of the generated programs?
- How well would the techniques here generalize to other languages? I would
  enjoy seeing some focused discussion about the generality of the techniques in
  the paper.
- Did the authors encounter any cases where the implementation led to false
  positives, e.g., due to bugs or design?
- I would like to have learned more about the nature of the rest of the
  identified bugs. What was going on with those? Do they have common
  characteristics? Are there any specific categories identified?

* Minor comments and typos:

- In the beginning of 2.1.1 please make sure to mention that the labels
  annotated in the algorithms will be put in context later on to avoid
  confusion. I was initially confused and thought that they were footnotes.
  Later in 2.2 I understood what was going on.
- Make sure that footnote numbers in the text follow punctuation.
- [Section 1]: [...] when their semantics descriptions use [...] ---> [...] when
  their semantic descriptions use [...]
- [Section 5.3]: [...] we introduce a conformance bug example that show the
  effectiveness [...] ---> [...] we introduce a conformance bug example that
  shows the effectiveness [...]



Review #131B
===========================================================================

Overall merit
-------------
3. Weak accept

Reviewer expertise
------------------
3. Knowledgeable

Paper summary
-------------
This paper improves upon JEST, a conformance test synthesizer for Javascript, by
introducing a series of novel coverage criteria to be used for conformance test
generation. The proposed coverage criteria are then evaluated against the
original JEST implementation and shown to be more effective.

Comments for authors
--------------------
I quite enjoyed reading this paper and the intuition it provided. The FS/FCPS
coverage criteria provide a systematic way to obtain a middle ground between
edge coverage (which can be quite coarse, but is still largely effective) and
path coverage (which can be extremely fine, to the point of being ineffective).
For JavaScript implementations, where the features are readily apparent from the
ECMA specification, this can lead to a significantly larger but still tractable
number of conformance tests that explore interestingly different behaviors of a
Javascript engine.

I also greatly appreciated the pervasiveness of the Figure 5 example throughout
the presentation, which made the formal treatment of criteria much easier to
follow, as well as the stated subsumption theorem which crystallized the
relationship between FS/FCPS that I was wondering about beginning in the
introduction (perhaps there is a better word than "variant" to capture this
subsumption?).

My only concern is about the generality and usability of the criteria in other
scenarios. In particular, while I can readily believe fuzzers would benefit from
a finer-but-not-overly-finer coverage criterion, the ones presented in this
paper are parameterized by a mapping from nodes to "features". This
parameterization exposes a very real trade-off: the more "features" the finer
the criterion distinguishes between inputs, and the more nodes and branches that
need to be covered which comes with associated overheads. For Javascript, what
constitutes a language feature has a natural choice: syntactic or built-in
features of the specification. Have you attempted to apply this criterion to any
other setting? Can you convey any intuition as to why these criteria are more
general than an interesting but JEST-specific optimization?


---- Minor -----

- This is probably more of a question about JEST than about the coverage
  criteria (so perhaps less relevant depending on the answer to the generality
  question above), but I'm curious to pick the mind of the authors after reading
  this paper. Is there a way to relate the effectiveness of the various
  conformance testing/engine testing approaches? For example, all three of
  JIT-picking, COMFORT, and JEST, are relatively recent and can find multiple
  bugs in various Javascript implementations. But they differ both in the oracle
  used and test generation method - have you thought of any way to compare
  across such changes?

- (l.10) Since mechanized specifications use functions to describe the semantics
  of language features.

  That is not really true. Many mechanized specifications use inductively
  defined specifications (including Ott, but mostly in languages like
  Agda/Coq/Isabelle) to account for features like non-termination,
  non-determinism, etc. Graph coverage techniques could work there, but need to
  be adopted.

- While the abbreviations worked decently well in early sections, the latter
  part of the evaluation was relatively hard to parse, as the number of
  "k-F(CP)S-TR" occurrences per sentence starts to be quite high. I don't have a
  concrete suggestion to fix it, but it's something to keep in mind when
  revising the paper.



Review #131C
===========================================================================

Overall merit
-------------
2. Weak reject

Reviewer expertise
------------------
4. Expert

Paper summary
-------------
This paper proposes two new coverage criteria, FS and FCPS, to be used in place
of the node and branch coverage criteria when using fuzzing to generate
conformance test suites from mechanized language specifications. Bounded
versions, k-FS and k-FCPS, are also proposed that bound the length of the paths
explored k. Proof of subsumption among the proposed criteria is given and
evaluation results show that using the proposed criteria helps find more bugs
compared to using node and branch coverage on JavaScript specification
implementations. The discovered bugs have been reported to the developers of the
various implementations.

Comments for authors
--------------------
I am excited to see a paper on test coverage criteria in the service of
programming language implementation, and impressed by the amount of bugs found
in the evaluated language implementations. Big kudos also to the authors for
reporting the bugs found to the developers. The paper is also very well
presented, with appropriate references cited and subsumption relationships
considered.

That said, the paper does not seem to contribute much to what is already known
about coverage criteria, it possibly re-invents the wheel, and the fact that
using more advanced criteria helped find more bugs than using basic criteria
does not strike me as a big enough research contribution.

The motivation for the paper is that traditional graph coverage criteria cannot
distinguish among the language features that are being tested, so they may not
be the most effective for finding bugs in language implementations. I find
several problems with this claim.

Equating "node and branch coverage" with "traditional graph coverage" is wrong.
Section 3.2 cites more advanced traditional graph coverage criteria from [4]
that can help find more bugs than node and branch coverage. So, there is nothing
new about the need for stronger criteria.

It seems that that the problems being addressed by adding nodes for the features
into the graph and then using existing graph coverage criteria. But, those more
advanced criteria are dismissed and not compared with in the subsumption
relationship proofs or in the evaluation. Specifically, my intuition is that
prime-path coverage subsumes the criteria being proposed and may be directly
applicable here. To use one of the paper's examples, in Figure 5, the paths "12
-> 19 -> 20 -> 21" and 14 -> 19 -> 20 -> 21" will be in different prime paths
and two tests that satisfy these test requirements should not be considered
redundant. So why do we need FS?  Also, if one merely encoded the enclosing
language features as nodes in the CFG, it seems that prime-path coverage can be
used, FCPS will be not be needed, and there will be no need to treat cycles
specially.

The claim that prime-path coverage is only usually used for intra-procedural
unit testing (line 445-446) is besides the point. A careful reading of [4]
should convince that prime-path coverage is agnostic to the source of graphs
(they can be inter-procedural call graphs, finite state machines, UML diagrams,
etc.). I agree that prime-path coverage can yield very many test requirements,
but the generation of too many test requirements seems to also be a motivation
for k-FS and k-FCPS. In any case, the software testing literature is full of
hundreds of coverage criteria and introducing a new criteria requires showing
that the new ones being proposed cannot be equivalent to, or are not subsumed
by, existing criteria. This paper does not seem to meet that burden of proof.

Another problem that I have is that this paper conflates two qualities of an
effective test suite: reachability and infection. (See the RIPR model in [4] for
definitions). Graph coverage criteria help with reachability but not always with
infection. The "2n+1" vs "2n-1" example makes me think that the aim is to
increase that the inputs infect program state. If that is the case, then perhaps
what is needed is to use logic coverage criteria together with existing graph
coverage criteria during conformance test generation? If one were to use
node+branch coverage with logic coverage criteria like Active Clause coverage
for conformance test generation, would FS and FCPS still be more effective? As
an aside, the "2n+1" vs "2n-1" example is unclear to me. If throwing TypeError
in node 17 is an atomic operation, then why do we need two tests to check that
behavior?  If it is not atomic, then node 17 is really a sub-graph with multiple
nodes and existing graph coverage criteria should be able to distinguish the
paths that are traversed by each test in that sub-graph. In any case, what is
important is to show cases where using node and graph coverage is insufficient
for triggering a real bug and the paper does not do that.

The statement of the two challenges that are given in lines 118-119 and lines
121-122 hints that the problems apply when testing any kind of software. When I
replace "language features" in those sentences with "functions", the two
problems seem general. So, it is unlikely that no existing criteria can handle
these problems.

Compounding my worry about the likelihood that new criteria are not needed to
solve the challenges mentioned, the paper renames and re-defines well-known
concepts from [4]. (I am not opposed to reminding the reader what the concepts
are, but using different names/definitions does more harm than good in my
opinion.) A few examples: lines 366-367 use "full paths" to describe what [4]
calls "test paths", lines 403-404 use "covers" to describe what [4] calls
"visits or tours", line 409 uses "valid" to describe what [4] describes as
"feasible", the definition on line 415 to make the toured path end in p seems
unnecessary. Also, how does JEST_fs handle test requirements that are infeasible
according the proposed test criteria?

The number of bugs found is impressive, but the increase in bugs found with
increasing values of k is unsurprising based on the subsumption relations. But
here also, I have some questions. First, is the 0-FS row in Table 2 the same as
JEST? If not, why is there no comparison with JEST?  Second, what approach is
being used to compute unique bugs in Table 1 (it's not in Fig. 8), and what is
the total number of non-unique bugs (that is what the users will see)? Third,
why is the total number of unique bugs in Table 2 different from the one in
Table 1?  Fourth, are the bugs found by 1-fs a strict subset of those found by
2-fs (same question for 1-fcps vs. 2-fcps)?

Some minor errors:

- Line 373: depeicted --> depicted
- Line 905: (b) --> (a)



Review #131D
===========================================================================

Overall merit
-------------
4. Accept

Reviewer expertise
------------------
4. Expert

Paper summary
-------------
The paper presents and evaluates an approach to testing implementations of
JavaScript for conformance with the language specification, ECMA-262. The
specification is mechanized and is essentially an interpreter of JavaScript
programs (S2, Figure 5). The paper's approach to conformance testing has two
main steps. First, generate a suite of test programs by performing
coverage-guided mutational fuzzing over the interpreter derived from ECMA-262.
Second, use the generated test suite to test a JavaScript implementation;
assertions in the generated tests check for conformance between the
implementation and the language specification. The general approach has been
presented and implemented in prior work (reference 43). This paper builds upon
that work.

In particular, this paper presents new coverage criteria for generating the test
suite. Past work (reference 43, a tool called JEST) generates a test suite with
the aim of covering the nodes of the CFG of the interpreter. The paper observes
that this criterion does not account for the fact that helper functions within
the interpreter may be utilized by different language features, so plain node
coverage may result in poor language-feature coverage in the test suite (S1,
"traditional graph coverage may not distinguish test requirements of different
language features when their semantics descriptions use the same functions").
More generally, node coverage does not result in a test suite that substantially
explores possible combinations of language features. To address these problems,
the paper details "feature-sensitive (FS) coverage" (S3.3) and
"feature-call-path-sensitive (FCPS) coverage" (S3.4) as criteria for generating
test suites through coverage-guiding fuzzing of a mechanized language
specification. (A subset of nodes in the interpreter's CFG are annotated with
their associated language features.) The new criteria are implemented in an
extension of JEST, called JEST_fs.

The paper evaluates the new criteria by using JEST_fs to generate a conformance
test suite and then using that test suite to detect bugs in eight JavaScript
implementations: four engines and four transpilers (S5, Table 1). The paper
draws four main conclusions. First, the test suite revealed 143 implementation
bugs: of these, 85 were confirmed and 83 were newly discovered (S5.1). Second,
"higher k-FS coverage criteria are more effective than lower k-FS" (S5.2): i.e.,
the test suites containing tests that individually involve more features result
in more bugs triggered. Third, for k=1 and k=2, "the number of detected unique
bugs also increased when using k-FCPS coverage criteria than k-FS coverage
criteria" (S5.3). Finally, the official JavaScript conformance test suite,
called Test262, has poor coverage with respect to 2-FS and 2-FCPS test
requirements. The paper states (S5.4): "We believe that this is why JEST_fs
successfully detected diverse new bugs in existing JavaScript implementations,
even though they have been heavily tested using Test262 and various fuzzing
techniques."

Comments for authors
--------------------
## Strengths

+ The topic of the paper, conformance testing of JavaScript language
  implementations, is very relevant to PLDI.

+ The paper develops two (k-parameterized) coverage criteria for generating test
  suites through coverage-guided mutational fuzzing of (the feature-annotated
  CFG of) a mechanized language specification. These are "feature-sensitive"
  (FS) coverage and "feature-call-path-sensitive" (FCPS) coverage. These
  coverage criteria are novel to my knowledge.

+ The new coverage criteria are implemented in a JavaScript conformance-test
  synthesizer called JEST_fs.

+ The paper presents an experiment in which the authors used JEST_fs to create a
  JavaScript conformance test suite based on the new criteria (0-FS, 1-FS, 2-FS,
  1-FCPS, and 2-FCPS). The test suite revealed 143 bugs in eight mainstream
  JavaScript implementations; most of these were newly discovered and confirmed
  by developers.

+ The paper is well organized. Numerous figures and examples illustrate and
  clarify key points of the presentation.

## Weaknesses

+ While the FS and FCPS criteria are general in principle, it is not clear from
  the paper that they are "general in practice." In other words, it is not clear
  that languages other than JavaScript have mechanized specifications that are
  amenable to the approach taken by JEST and JEST_fs.

+ In my opinion, the presentation of the FS and FCPS criteria (S3.1 through
  S3.4) is difficult to read and understand. The presentation is dense and
  notation-heavy. More illustrative figures and examples would be welcome.

## Discussion

I enjoyed reading this paper! For its technical contributions, I recommend that
this paper be accepted to PLDI.

As I understand, the central idea of this paper is an improvement to a
test-suite generation technique that was presented in prior work (reference 43,
about JEST). The key idea of that previous work was to generate a conformance
test suite by performing coverage-guiding fuzzing over the CFG of a mechanized
language specification. The current submission improves upon that work by
changing the criterion for "coverage" over that CFG.

Whereas the previous work used node coverage, the current submission proposes
feature-sensitive (FS) coverage and feature-call-path-sensitive (FCPS) coverage.
Very briefly, these criteria help to ensure that the generated test suite has
good coverage of individual language features and features in combination. These
criteria are more complex than CFG-node coverage, so not only do the new
criteria result in better coverage of features, but also, they result in a
larger synthesized test suite. Whether through more sophisticated test cases,
more test cases in total, or a combination of both---the paper shows that the
test suite based on the new criteria is useful for triggering many bugs (143)
across "eight mainstream implementations" (S5) of JavaScript.

It has been known for a long time that language fuzzers are more effective when
they are more expressive, covering not only many language features but also
combinations of features. (E.g., Yang et al., PLDI 2011: "We claim that Csmith
is an effective bug-finding tool in part because it generates tests that explore
atypical combinations of C language features.") The contribution of this paper
lies not in this insight itself, but in the incorporation of this insight into
the test-suite generation method pioneered by JEST. The result---*feature-aware*
fuzzing of a mechanized language specification to produce a test suite---is
novel to my knowledge.

A second contribution is that, as already mentioned, the paper reports that the
technique can be effective for discovering defects in practice. It reports that
the generated test suite led to the discovery of 143 bugs across eight
JavaScript implementations. 42 of those were in production JavaScript engines
(which are presumably very heavily tested), and 25 of those 42 were newly
discovered. This is a strong result!

(The paper also reports that 101 bugs were found in transpilers. I am less
familiar with these tools and the extent to which they might have been tested by
their developers and/or others. In any case, I believe that finding and fixing
bugs in these tools is valuable.)

The above-described contributions are significant and are why I think this paper
should be accepted. The paper is well-organized. While the "core" of the paper
(S3) is quite a dense read in my opinion, it is made significantly more
accessible through the incorporation of figures and examples that illustrate key
points.

The main weaknesses of the paper, in my opinion, are twofold.

**The first** pertains to "practical generality." From reading the paper, it is
clear to me that the paper's method for producing a high-quality conformance
test suite is not language-specific, and could in principle be applied to any
language for which a suitable, feature-annotated, mechanized specification is
available. The paper makes this point (S1): "Various programming languages, such
as OCaml, C, C++, Java, JavaScript, and POSIX shell, have mechanized
specifications that formally describe their semantics..." Ultimately, however,
the paper leaves me uncertain that the specifications of those languages are in
a suitable form for a tool like JEST_fs. The structure of ECMA-262 seems
particularly well-suited to deriving an interpreter and its CFG (Figure 5); how
much effort would be required to do the same for one of the other languages
listed?

I think that to a large extent, answering the above question is beyond the scope
of this paper. Still, the reader is left to wonder if, for a language other than
JavaScript, utilizing this paper's test-suite generation approach would require
one to create an entirely new mechanized specification of that language's
semantics. The paper itself notes (S2) that "most mechanized specifications of
other languages are outdated."

**The second** shortcoming is that, in my opinion, the core of the paper (S3) is
difficult to read and understand. The new coverage criteria are presented
precisely (very good!) but in a very dense and notation-heavy manner. I feel
that the effort I put into understanding S3 was rewarded, but I also think that
the discussion could be made more "intuitively understandable" through the
addition of more examples/pictures and higher-level discussion, and perhaps
moving some of the notation to an appendix.

**Finally:** I'm not sure what to make of the fact that about one-third of the
detected bugs (55) could be triggered by the 2.1K synthesized tests for the 0-FS
coverage criterion---which is essentially node coverage of the CFG, unless I am
mistaken. The paper does not state how long it took for JEST_fs to generate the
test suite for this criterion, but reference 43 states that JEST could generate
1.1K programs in about 10 seconds, so I assume that JEST_fs would generate the
0-FS test suite quite speedily. In any case, I assume it would be much less than
the 50 hours (S5) required to generate all of the 237.9K tests for all five
criteria used in the evaluation.

Should I conclude that the tested JavaScript implementations have a lot of
easy-to-find conformance bugs? From the data, one might conclude that the more
complex criteria (1-FS, 2-FS, 1-FCPS, and 2-FCPS) are not necessary for finding
bugs in the studied implementations. If one can find bugs using 0-FS, maybe one
should just do that? Generate a test suite in seconds, run the tests, report the
triggered bugs; at some later time, generate a new 0-FS test suite, run those
tests, report the triggered bugs; etc.

It might be interesting to analyze the distribution of triggered bugs for each
implementation, for each coverage criterion. E.g., for JSC, how many bugs were
triggered by tests in the 0-FS suite, in the 1-FS suite, etc. I wonder if the
implementations that have not already been well-fuzzed would contain bugs that
are "easy to trigger" (via the small FS-0 test suite), whereas the
implementations that have already been heavily fuzzed would contain bugs that
are more difficult to trigger.

For example, I expect that all of the engines have been subjected to intense
fuzzing. Does the 0-FS test suite trigger any bugs in the engines? Does one need
the "more sophisticated" 2-FS or 2-FCPS test suites to find bugs in the engines?
If so, that would help to motivate the need for those methods.

## Minor Comments

* S2.1, line 175: typo, "ECAM."

* Figure 5: This figure is excellent!

* S3.3, line 461: On first reading, it was unclear to me if `feat` was a
  function or a mapping---in other words, if a node could be associated with
  more than one feature.

* S5.2, line 846: typo, "...Proeprty..."

* S5.3, line 877: typo, "noramlly."

* S5.3, "k-FS coverage criteria even with a high k value cannot detect this
  bug": Should this be "may not" or "is unlikely to" or similar? Because the
  actual tests are randomly generated, there is some chance that a test
  generated for a k-FS criterion would detect the bug. (Is that right?)

* S5.4, line 906: "(b)" should be "(a), "Venn" should be capitalized.

## Questions/Requests to the Authors

* In your opinion, what is the practical feasibility of developing a
  JEST_fs-like tool for a language other than JavaScript?

* How should a reader interpret the reported result that about 1/3 of the bugs
  detected in the study were triggered by the test suite generated for 0-FS? (In
  other words, for these implementations, why should one use {1,2}-{FS,FCPS} to
  get test suite in hours, when one can generate a bug-triggering test suite
  using 0-FS in a few minutes?)
