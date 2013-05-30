var arguejs2 = require("../argue2");

// ################################################################################################

// a variadic function
function formatText_TailDefault() {
    var signature = [{ formatString: String }, { replacements: arguejs2.TAIL }]; // "replacements" are marked as "mandatory" because do not want to call formatText without replacements here
    var _args = arguejs2.getArguments(signature, arguments);

    var resultingText = _args.formatString;
    for (var i = 0; i < _args.replacements.length; ++i) {
        resultingText = resultingText.replace("{" + (i+1) + "}", _args.replacements[i]);
    }
    return resultingText;
}

// a variadic function
function formatText_TailWithParenthesizeTail() {
    var signature = [{ formatString: String }, { replacements: {type: arguejs2.TAIL, parenthesizeTail: true}}]; // same same formatText_TailDefault but now, "parenthesizeTail" is explicitly set to "true"
    var _args = arguejs2.getArguments(signature, arguments);

    var resultingText = _args.formatString;
    for (var i = 0; i < _args.replacements.length; ++i) {
        resultingText = resultingText.replace("{" + (i+1) + "}", _args.replacements[i]);
    }
    return resultingText;
}


// a variadic function
function formatText_TailWithoutParenthesizeTail() {
    var signature = [{ formatString: String }, { replacements: {type: arguejs2.TAIL, parenthesizeTail: false}}]; // same same formatText_TailDefault but now "parenthesizeTail" is explicitly set to "false"
    var _args = arguejs2.getArguments(signature, arguments);

    var resultingText = _args.formatString;
    for (var i = 0; i < _args.replacements.length; ++i) {
        resultingText = resultingText.replace("{" + (i+1) + "}", _args.replacements[i]);
    }
    return resultingText;
}

console.log();
console.log(                formatText_TailDefault("formatText_TailDefault with values                : {1} {2}!", "Hello", "World")); // OUTPUT: formatText_TailDefault with values                : Hello World!
console.log(   formatText_TailWithParenthesizeTail("formatText_TailWithParenthesizeTail with values   : {1} {2}!", "Hello", "World")); // OUTPUT: formatText_TailWithParenthesizeTail with values   : Hello World!
console.log(formatText_TailWithoutParenthesizeTail("formatText_TailWithoutParenthesizeTail with values: {1} {2}!", "Hello", "World")); // OUTPUT: formatText_TailWithoutParenthesizeTail with values: Hello World!

console.log();
console.log(                formatText_TailDefault("formatText_TailDefault with an array                : {1} {2}!", ["Hello", "World"])); // OUTPUT: formatText_TailDefault with an array                : Hello,World {2}!
console.log(   formatText_TailWithParenthesizeTail("formatText_TailWithParenthesizeTail with an array   : {1} {2}!", ["Hello", "World"])); // OUTPUT: formatText_TailWithParenthesizeTail with an array   : Hello,World {2}!
console.log(formatText_TailWithoutParenthesizeTail("formatText_TailWithoutParenthesizeTail with an array: {1} {2}!", ["Hello", "World"])); // OUTPUT: formatText_TailWithoutParenthesizeTail with an array: Hello World!

console.log();
try {
    console.log(formatText_TailDefault("You should never ever see that line! Reason: The tail argument in formatText_TailDefault is defined as 'mandatory'!")); // OUTPUT: As expected, an exception was thrown! message=Incompatible function call: mandatory argument "replacements" has no value.
}
catch(_ex) {
    console.log("As expected, an exception was thrown! message=" + _ex.message);
}

console.log();
console.log(formatText_TailDefault("Values for the tail argument can be of any type including {1} and {2}, of course", undefined, null)); // OUTPUT: Values for the tail argument can be of any type including undefined and null, of course
