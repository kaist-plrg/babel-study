// body of for loop is executed after transpilation
// this will eventually be in Grouped
for ( var x in function * ( ) { } ) while ( x ) ;

// Array rest assignment pattern with sparse array
// Original code should have every index as property despite being empty,
// but the transpield code does not.
var [ ... x ] = [ , ] ;

// should throw exception,
// but transpield code does not
var { ... x } = null ;

/************ Grouped **************/

// Arrow function, generator, async function, and method definition becoming constructable
var f = () => {}; new f();
var f = async function () {}; new f();
var f = function * () {}; new f();
var {f} = {f(){}}; new f();

//// toString of arrow function / generator / async function
// let f be either one of these "special functions".
// 1) class computed field
class C { [ f ] ( ) { } }
// > Expected ["constructor", `f`] but got ["constructor", `_f`] for Object.
// 2) Assign to super
class C { static field = super [ f ] = 0 }
// > Expected ["length", "name", "prototype", `f`, "field"] but got ["length", "name", "prototype", `_f`, "field"] for Function.

// descriptor value of "name" should be ... but ...
// Note) each of these assertion fails have diffrent reason,
// and this list is not exhaustive
class X extends class {} {} // should be unnamed class
let x = { } = function ( ) { } ; // should be unnamed, but "_ref"
var [ x ] = [ function ( ) { } ] ; //should be unnamed, but "x"
class X { 0(){} } // 0 to different name
class X { [0](){} } // 0 to different name
class X { static f = function(){} } // should be named
var { x = function ( ) { } } = 0 ; // should be named


/********* AE-MAE ************/

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
