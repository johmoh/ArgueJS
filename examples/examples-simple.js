var arguejs2 = require("../argue2");

// ################################################################################################

// show case: no parameter
//            use arguejs2 to make sure that this function is called without any arguments
function printHelloWorld() {
	var _args = arguejs2.getArguments(arguments);
	console.log("hello world");
}

console.log();
printHelloWorld();

// ################################################################################################

// show case: one string parameter
function printString() {
	var _args = arguejs2.getArguments([{text: String}], arguments);

	console.log(_args.text);
}

console.log();
printString("Hello world with one argument!");

// ################################################################################################

// show case: two arguments
function add() {
	var _args = arguejs2.getArguments([{a: Number}, {b: Number}], arguments);

	console.log("" + _args.a + " + " + _args.b + " = " + (_args.a + _args.b));
}

console.log();
add(17,4);

// ################################################################################################

// show case: one optional and two mandatory parameters
function add2() {
	var _args = arguejs2.getArguments([{text: [String]}, {a: Number}, {b: Number}], arguments);

	var txt = (_args.text || "ADD:");
	console.log(txt + _args.a + " + " + _args.b + " = " + (_args.a + _args.b));
}

console.log();
add2(17,4);
add2("lets add two values... ",17,4);
