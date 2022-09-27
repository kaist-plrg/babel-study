// body of for loop is executed after transpilation
for ( var x in function * ( ) { } ) while ( x ) ;

// Array rest assignment pattern with sparse array
// Original code should have every index as property despite being empty,
// but the transpield code does not.
var [ ... x ] = [ , ] ;
