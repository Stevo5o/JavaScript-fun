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
	
	console.log(o.f()); // → logs 37
	
	// this behavior is not at all affected by how or where the 
	// function was defined
	var o = { prop: 37 };
	
	function independent() {
		return this.prop;
	}
	
	o.f = independent;
	
	console.log(o.f()); // → logs 37
	
	// only affected by the most immediate member reference
	o.b = { g: independent, prop: 42};
	console.log( o.b.g() ); // → logs 42
	
	
	// this on the object prototype chain
	var o = { f:function() { return this.a + this.b } };
	var p = Object.create(o);
	p.a = 1;
	p.b = 4;
	
	// JavaScript's prototype inheritance
	console.log(p.f()); // → 5
	
	// this with a getter or setter
	function modulus() {
		return Math.sqrt(this.re * this.re + this.im * this.im);
	}
	
	// this bound to the object from which the property is being set or gotten
	var o = {
		re: 1,
		im: -1,
		get phase() {
			return Math.atan2(this.im, this.re);
		}
	};
	
	Object.defineProperty(o, 'modulus', {
		get: modulus, enumerable: true, configurable: true
	});
	
	console.log(o.phase, o.modulus); // → logs -0.78 1.4142
	
	function square(x) {
		squared = x * x;
  		return this.squared;
	};

	console.log(square(12)); // → 144
	
	// equality 
	1 == 1; // → true			
	"1" == 1; // → true
	1 == '1'; // → true
	0 == false // → true
	0 == null // → false
	0 == undefined; // → false
	null == undefined // → true
	
	// strict equa→ lity
	3 === 3; // → true
	3 === '3'; // → false
	
})();