(function() {
	
	// this keyword strict & non-strict mode
	// the value this is determined by how a function is called
	
	// global context
	console.log(this.document === document); // true
	
	this.a = 37;
	console.log(window.a); // 37	
	
})();