define(['argue2', 'argue2.testable.min', 'argue2.testable.production.min', 'chai'], function(arguejs2_original, arguejs2_minified, arguejs2_production_minified, chai) {

    'use strict';

    // chai-expect
    var expect = chai.expect;

    // Tests...
    describe("internal getDefaultValue", function() {

        var argue2Variants = [  {name: "ArgueJS version 2 (original)",                     implementation: arguejs2_original},
                                {name: "ArgueJS version 2 (minified)",                     implementation: arguejs2_minified},
                                {name: "ArgueJS version 2 (minified for production use)",  implementation: arguejs2_production_minified}
                            ];
        for (var argue2VariantIdx = 0; argue2VariantIdx < argue2Variants.length; ++argue2VariantIdx) {

            runTestsForVariant(argue2Variants[argue2VariantIdx].name, argue2Variants[argue2VariantIdx].implementation);
        }
    });

    function runTestsForVariant(arguejs2Name, arguejs2) {
        describe("[" + arguejs2Name + "]:", function() {

            // >>> A HACK... JUST FOR INTERNET EXPLORER. REASON: MOCHA USES RECURSION TO HEAVY. BUT THEY DO NOT WANT TO FIX THAT IN MOCHA.
            beforeEach(function(done){
                setTimeout(done, 0);
            });
            // <<< A HACK... JUST FOR INTERNET EXPLORER. REASON: MOCHA USES RECURSION TO HEAVY. BUT THEY DO NOT WANT TO FIX THAT IN MOCHA.

            var arguejs2_internals = arguejs2.__export_internals__();

            function myFunction() {}
            function myFunction2() { return myFunction;}

            function myFunctionReturningAString() { return "Bye!";}

            function MyClass() {}

            var myObject = new MyClass();

            var testCases = [   {type: String,               defaultValue: "hello",                                          expectedDefaultValue: "hello"},
                                {type: String,               defaultValue: function() { return "world"; },                   expectedDefaultValue: "world"},
                                {type: Number,               defaultValue: 17,                                               expectedDefaultValue: 17},
                                {type: Number,               defaultValue: function() { return 937; },                       expectedDefaultValue: 937},
                                {type: Boolean,              defaultValue: false,                                            expectedDefaultValue: false},
                                {type: Boolean,              defaultValue: function() { return true; },                      expectedDefaultValue: true},
                                {type: Array,                defaultValue: [1,3,9],                                          expectedDefaultValue: [1,3,9]},
                                {type: Array,                defaultValue: function() { return [27,9,3]; },                  expectedDefaultValue: [27,9,3]},
                                {type: Date,                 defaultValue: new Date(2013,5,22),                              expectedDefaultValue: new Date(2013,5,22)},
                                {type: Date,                 defaultValue: function() { return new Date(2012,4,21); },       expectedDefaultValue: new Date(2012,4,21)},
                                {type: RegExp,               defaultValue: (/text/ig),                                       expectedDefaultValue: (/text/ig)},
                                {type: RegExp,               defaultValue: function() { return (/searchme/); },              expectedDefaultValue: (/searchme/)},
                                {type: Object,               defaultValue: {a:1, b:"text"},                                  expectedDefaultValue: {a:1, b:"text"}},
                                {type: Object,               defaultValue: function() { return {c:true, d:"okay", e:5}; },   expectedDefaultValue: {c:true, d:"okay", e:5}},
                                {type: MyClass,              defaultValue: myObject,                                         expectedDefaultValue: myObject},
                                {type: MyClass,              defaultValue: function() { return myObject; },                  expectedDefaultValue: myObject},
                                {type: Function,             defaultValue: myFunction,                                       expectedDefaultValue: myFunction},
                                {type: Function,             defaultValue: myFunction2,                                      expectedDefaultValue: myFunction2},
                                {type: arguejs2.ANYTYPE,     defaultValue: "hello world",                                    expectedDefaultValue: "hello world"},
                                {type: arguejs2.ANYTYPE,     defaultValue: myFunctionReturningAString,                       expectedDefaultValue: myFunctionReturningAString},
                                {type: arguejs2.ANYTYPE,     defaultValue: myFunction,                                       expectedDefaultValue: myFunction},
                                {type: arguejs2.ANYTYPE,     defaultValue: myFunction2,                                      expectedDefaultValue: myFunction2},
                                {type: arguejs2.TAIL,        defaultValue: ["foobar", false, 7],                             expectedDefaultValue: ["foobar", false, 7]},
                                {type: arguejs2.TAIL,        defaultValue: function() { return [121, true]; },               expectedDefaultValue: [121, true]}
                            ];

            function stringify(_value) {
                if (_value === null) { return "null"; }
                else if (_value === undefined) { return "undefined"; }
                else if (typeof(_value) === "string") { return "\"" + _value + "\""; }
                else if (typeof(_value) === "number") { return _value.toString(); }
                else if (typeof(_value) === "boolean") { return _value.toString(); }
                else if (_value instanceof Date)  { return "Date(" + _value.toString() + ")"; }
                else if (_value instanceof RegExp)  { return "RegExp(" + _value.toString() + ")"; }
                else if (_value instanceof MyClass)  { return "$MyClass$"; }
                else if (_value === String) { return "String"; }
                else if (_value === Number) { return "Number"; }
                else if (_value === Boolean) { return "Boolean"; }
                else if (_value === Date) { return "Date"; }
                else if (_value === RegExp) { return "RegExp"; }
                else if (_value === Function) { return "Function"; }
                else if (_value === Array) { return "Array"; }
                else if (_value === Object) { return "Object"; }
                else if (_value === MyClass) { return "MyClass"; }
                else if (_value instanceof Function) { return "$Function$ >>> " + _value + " <<<"; }
                else if (_value instanceof Array) {
                    var text1 = "[";
                    for (var idx = 0; idx < _value.length; ++idx) {
                        if (idx > 0) { text1 += ", "; }
                        text1 += stringify(_value[idx]);
                    }
                    text1 += "]";
                    return text1;
                }
                else if (arguejs2_internals.$.getType(_value) === Object) {
                    var text2 = "{";
                    var i = -1;
                    for (var key in _value) {
                        if (!_value.hasOwnProperty(key)) { continue; }
                        if (++i > 0) { text2 += ", "; }
                        text2 += stringify(key) + ": " + stringify(_value[key]);
                    }
                    text2 += "}";
                    return text2;
                }
                else {

                    throw new Error("NOT_SUPPORTED");
                }
            }

            it("is a function", function() {
                expect(arguejs2_internals.$.getDefaultValue).to.be.a("function");
            });

            for (var testCaseIdx = 0; testCaseIdx < testCases.length; ++testCaseIdx) {
                var testCase = testCases[testCaseIdx];
                runTestCase(testCase);
            }

            function runTestCase(_testCase) {
                var typeName;
                switch(_testCase.type) {
                    case(Array)            : typeName = "Array"; break;
                    case(String)           : typeName = "String"; break;
                    case(Number)           : typeName = "Number"; break;
                    case(Boolean)          : typeName = "Boolean"; break;
                    case(Function)         : typeName = "Function"; break;
                    case(Date)             : typeName = "Date"; break;
                    case(RegExp)           : typeName = "RegExp"; break;
                    case(Object)           : typeName = "Object"; break;
                    case(arguejs2.ANYTYPE) : typeName = "ArgueJS2.ANYTYPE"; break;
                    case(arguejs2.TAIL)    : typeName = "ArgueJS2.TAIL"; break;
                    default                : typeName = (/^function (.+)\(/).exec(_testCase.type.toString())[1]; break;
                }

                var defaultValueText = stringify(_testCase.defaultValue);

                var expectedDefaultValueText = stringify(_testCase.expectedDefaultValue);

                var description =
                        "expect " + expectedDefaultValueText +
                        " to be returned if parameter type is " + typeName +
                        " and the parameter default value is " + defaultValueText;

                it(description, function() {
                    var parameter = {
                        type:           _testCase.type,
                        defaultValue:   _testCase.defaultValue
                    };
                    var result = arguejs2_internals.$.getDefaultValue(parameter);
                    expect(result).to.deep.equal(_testCase.expectedDefaultValue);
                });

                description = null;
                expectedDefaultValueText = null;
                defaultValueText = null;
                typeName = null;
            }
        });
    }
});
