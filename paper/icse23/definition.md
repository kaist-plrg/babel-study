* What is contribution of this paper?
  - "verification" of "desugarer", using "syntactic view"

* "Syntactic view"란?
  - AST, but some nodes are abstract node with type annotation
  - Definition may be modified / extended

* "Desugarer"란?
  - finite pairs of (syntactic view, syntactic view)

* Verification이란?
  - desugarer가 얼마나 semantic 보존을 잘하는지 점수를 매기는 행위
  - 점수는 연속적일 수도 있고, 0아니면1일 수도 있고 (TBD)
  - 생각해볼 수 있는 기준
    - double side effect가 없는가? (없으면 점수가 높아짐)
    - 같은 variable은 같은 이름으로 renaming되는가? (그러면 점수가 높아짐)
    - 다른 variable이 같은 이름으로 renaming되는 경우는 없는가? (없으면 점수가 높아짐)

* How do we verify?
  - For each pair, evaluate each syntactic view via ESMeta
  - "Compare" the trace
    - definition of compare: TBD
    - 극단적으로는 ML을 써서 classifier를 구현하는 것도 방법중 하나인데 그건 좀
  - Does this work?
    - idk
    - ex) 'a ?? b'와, '(t = a) && t != null ? t : b' 의 trace는 완전히 다름, 그런데 같은 거여야 함. 'a != null ? a : b'의 trace는 차이가 strict하게 작음, 그런데 잘못된거임.

* 지금부터 해야할 일
  - 어떤 babel plugin을 고를지 생각해야 한다
    - 버그가 포함된 버전과 고쳐진 버전
    - loose모드가 켜진 버전과 꺼진 버전
  - 고른 plugin들을 우리가 정의한 desugarer로 바꿔야 한다.
    - How?
        - manual? automatic?
        - Is it even possible?
        - 이게 가장 큰 문제임
    - trade-off when creating desugarer from babel
        - desugarer의 behavior가 실제 babel의 behavior에 가까울수록 좋겠지만 실제 babel은 워낙 복잡해서 정확하게 modelling 하기가 쉽지 않다. 
        - 하지만 그렇다고 desugarer을 너무 단순하게 모델링 하면 실제 babel과 거리가 멀어지게 됨 -> 그 desugarer는 거의 반드시 스펙을 제대로 지키지 않는 틀린 desugarer, 이걸로 실험을 해도 impact가 작아진다.

여담:
  - 차라리 JEST랑 비슷하게 가고, syntactic view라는 개념은 없는게 더 낫나?
