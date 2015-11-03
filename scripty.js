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

	/*
	As a constructor
	When a function is used as a constructor, it's this is 
	bound to the new object being constructed
	*/
	
	/*
	* Constructors work like this:
	*
	* function MyConstructor(){
	*   // Actual function body code goes here.  
	*   // Create properties on |this| as
	*   // desired by assigning to them.  E.g.,
	*   this.fum = "nom";
	*   // et cetera...
	*
	*   // If the function has a return statement that
	*   // returns an object, that object will be the
	*   // result of the |new| expression.  Otherwise,
	*   // the result of the expression is the object
	*   // currently bound to |this|
	*   // (i.e., the common case most usually seen).
	* }
	*/
	
	// Constructor
	function C() {		
		this.a = 37;
	}
	
	var o = new C();
	console.log(o.a); // → logs 37
	
	// Constructor
	function C2() {
		this.a = 37;
		return { a:38 };
	}
	
	o = new C2();
	console.log(o.a) // → logs 38
	
	/* call and apply */
	function add(c, d) {
		return this.a + this.b + c + d;
	}
	
	var o = { a:1, b:3 };
	
	// the first parameter is the object to use as 
	// 'this', subsequent parameters are passed as 
	// arguments in the function call
	add.call(o, 5, 7); // → 1 + 3 + 5 + 7 = 16
	
	// the first parameter is the object to use as
	// 'this', the second is an array whose
	// members are used as the arguments in the function call
	add.apply(o, [10, 20]); // → 1 + 3 + 10 + 20 = 34	
	
	function bar() {
		console.log(Object.prototype.toString.call(this));
	}
	
	bar.call(7); // → [object Number]
	
	/* 
	As a DOM event handler
	this is set to the element the event firsed from (some
	browsers do not follow this convention for listeners added
	dynamically with methods other than addEventListener)	
	*/
	
	// when called as a listener, turns the related element blue
	function bluify(e) {
		// always true
		console.log(this === e.currentTarget);
		// true when currentTarget and target are the same object
		console.log(this === e.target);
		this.style.backgroundColor = '#A5D9F3';
	}
	
	// get a list of every element in the document
	var elements = document.getElementsByTagName('*');
	
	// add bluify as a click listener so when the
	// element is clicked on, it turns blue
	for(var i = 0; i < elements.length; i++) {
		elements[i].addEventListener('click', bluify, false);
	}
	
	
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
	
	// strict equality
	3 === 3; // → true
	3 === '3'; // → false	
	

})();

	// this key word example
	var fullname = 'John Doe';
	
	var obj = {
		fullname: 'Colin Ihrig',
		prop: {
			fullname: 'Aurelio De Rosa',
			getFullname: function() {
				return this.fullname;
			}
		}
	};
	
	console.log(obj.prop.getFullname());
	
	var test = obj.prop.getFullname;
	
	console.log(test()); // → Aurelio De Rosa & John Doe

	/* Scope */
	// (function() {
	// 	var a = b = 5; //  a is a local variable of the function
	// })();
	
	// console.log(b); // → 5 b is assigned to the global scope
	
	// use strict mode
	// (function() {
	// 	'use strict'
	// 	var a = b = 5;
	// })();
	
	// console.log(b); // → Uncaught ReferenceError: b is not defined
	
		// use strict mode
	(function() {
		'use strict'
		var a = window.b = 5; // explicitly reference to the global scope 
	})();
	
	console.log(b); // → Uncaught ReferenceError: b is not defined
	
