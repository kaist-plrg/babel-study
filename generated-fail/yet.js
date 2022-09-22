// engines does not follow correct semantics of
// toString for arrow functions
// https://tc39.es/ecma262/#sec-function.prototype.tostring
let x , { } = x += x => { } ;

// order between class decl and evaluating extendee expression
// simplest: class C extends (()=>{C})() {}
class x extends class extends new new new new function ( ) { throw x ; } { ; } { }
class x extends class extends new new new new function ( ) { x ; } { ; } { }
