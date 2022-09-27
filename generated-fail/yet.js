// order between class decl and evaluating extendee expression
// simplest: class C extends (()=>{C})() {}
class x extends class extends new new new new function ( ) { throw x ; } { ; } { }
class x extends class extends new new new new function ( ) { x ; } { ; } { }

// Should throw TypeError
// when the second argument is not given (undefined).
// https://tc39.es/ecma262/#sec-object.setprototypeof
Object . setPrototypeOf . call ( 0 , 0 ) ;

// Should throw RangeError,
// when the argument is not one of "NFC", ...
// https://tc39.es/ecma262/#sec-string.prototype.normalize
String . prototype . normalize . call ( 0 , '' ) ;

// delete should be evaluated later
// minified: x + delete 0();
0 | 0 & 0 & 0 >>> 0 >> 0 + 0 - 0 + x % function * ( ) { } % delete - class await extends 0 { } === 0 ?? async function ( ) { } ;
0 | 0 & 0 & 0 >>> x >> 0 + 0 - 0 + 0 % async function ( ... x ) { } % delete - [ 0 , , , ... 0 ] === 0 ?? x ; 
