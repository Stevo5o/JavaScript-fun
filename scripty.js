(function() {
	
	// this keyword strict & non-strict mode
	// the value this is determined by how a function is called
	
	/* 
	Global context this refers to the global object
	whether in strict mode or not
	*/
	console.log(this.document === document); // true
	
	// the window object represents an open window in a browser
	this.a = 37;	
	console.log(window.a); // 37
	
	/* 
	Fuction context, the value of this depends on how 
	the function is called
	*/

	// simple call 
	function f1() {
		return this; // undefined
	}
	
	console.log(f1() === window); // true: global object
	
	// simple call strict mode 
	function f2() {		
		"use strict"
		var b = "I'm not this";
		return this;
	}
	
	console.log(f2() === window); // false: global object
	console.log(f2() === undefined); // true
	console.log(f2() === "I'm not this"); // true
	
	/*
	As an object method
	When a function is called as a method of an object, its this
	is set tot the object the method is called
	*/
	var o = {
		prop: 37,
		f: function() {
			return this.prop;
		}
	};
	
	console.log(o.f()); // logs 37
	
	// this behavior is not at all affected by how or where the 
	// function was defined
	var o = { prop: 37 };
	
	function independent() {
		return this.prop;
	}
	
	o.f = independent;
	
	console.log(o.f()); // logs 37
	
	// 
	o.b = { g: independent, prop: 42};
	console.log( o.b.g() ); // logs 42
	
	
	// equality 
	1 == 1; // true			
	"1" == 1; // true
	1 == '1'; // true
	0 == false // true
	0 == null // false
	0 == undefined; // false
	null == undefined // true
	
	// strict equality
	3 === 3; // true
	3 === '3'; // false
	
})();