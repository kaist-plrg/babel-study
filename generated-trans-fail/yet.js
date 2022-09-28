// body of for loop is executed after transpilation
// this will eventually be in Grouped
for ( var x in function * ( ) { } ) while ( x ) ;

// Array rest assignment pattern with sparse array
// Original code should have every index as property despite being empty,
// but the transpield code does not.
var [ ... x ] = [ , ] ;

// [TE to normal]
// should throw exception,
// but transpield code does not
var { ... x } = null ;

// [TE to normal]
// array pattern parmeter in generator
// function * f([]){}
// f()
var x = function * x ( [ ] ) { } ( ) . x ??= 0 ;

// Defining helper function in global contaminates globalThis
// i.e. In the follwing code, x additionally contains helper function `_extends`
// But is it really bug? Is it possible to make helper function without contamination
// in ES5?
var { ...x } = this;

// Issue about await as identifier
// Babel transpiles await into _await,
// but assertion uses await
var await = 0;
$assert.sameValue(await, 0.0);

/************ Grouped **************/

// Arrow function, generator, async function, and method definition becoming constructable
// new f // extends f // instanceof f
// either: Assertion fail or TE to normal
var f = () => {}; new f();
var f = async function () {}; new f();
var f = function * () {}; new f();
var {f} = {f(){}}; new f();

//// toString of arrow function / generator / async function
// 1) class computed field
class C { [ () => {} ] ( ) { } }
// > Expected ["constructor", "() => {}"] but got ["constructor", "function key() {}"] for Object.
// 2) Assign to super
class C { static field = super [ f ] = 0 }
// > Expected ["length", "name", "prototype", "() => {}", "field"] but got ["length", "name", "prototype", "function () {}", "field"] for Function.
// 3) function in backtick
var x = `${() => {}}`
// > Expected "()=>{}" but got "function () {}".

// descriptor value of "name" should be ... but ...
// Note) each of these assertion fails have diffrent reason,
// and this list is not exhaustive
// case #1
class X extends class {} {} // should be unnamed class
let x = { } = function ( ) { } ; // should be unnamed, but "_ref"
// case #2
var [ x ] = [ function ( ) { } ] ; //should be unnamed, but "x"
// case #3
class X { 0(){} } // 0 to different name "_"
class X { [0](){} } // 0 to different name "_"
// case #4
class X { static f = function(){} } // should be named
var { x = function ( ) { } } = 0 ; // should be named
