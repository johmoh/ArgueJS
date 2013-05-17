var arguejs2 = require("../arguejs2");

// ################################################################################################

var callCounter = 0;

function getDefaultText() {
    ++callCounter;
    return "Hello World!";
}

function printText1() {
    var _args = arguejs2.getArguments([{text: {type: String, defaultValue: getDefaultText}}], arguments);
    console.log("callCounter=" + callCounter + " text: " + _args.text);
}

console.log();
printText1("a litte text");          // OUTPUT: callCounter=0 text: a litte text
printText1();                        // OUTPUT: callCounter=1 text: Hello World!
printText1("another little text");   // OUTPUT: callCounter=1 text: another little text
printText1();                        // OUTPUT: callCounter=2 text: Hello World!
printText1("juhu");                  // OUTPUT: callCounter=2 text: juhu
printText1("oh yahhh");              // OUTPUT: callCounter=2 text: oh yahhh
printText1();                        // OUTPUT: callCounter=3 text: Hello World!
