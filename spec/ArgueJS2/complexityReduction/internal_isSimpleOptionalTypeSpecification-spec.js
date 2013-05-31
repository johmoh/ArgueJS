define(['argue2', 'argue2.testable.min', 'argue2.testable.production.min', 'chai'], function(arguejs2_original, arguejs2_minified, arguejs2_production_minified, chai) {

    'use strict';

    // chai-expect
    var expect = chai.expect;

    // Tests...
    describe("internal isSimpleOptionalTypeSpecification", function() {

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

            function myFunction() {
            }

            function MyClass() {
            }

            var myObject = new MyClass();

            var testCases = [   {typeSpecification: null,                   expectedResult: false},
                                {typeSpecification: undefined,              expectedResult: false},
                                {typeSpecification: Number,                 expectedResult: false},
                                {typeSpecification: 17,                     expectedResult: false},
                                {typeSpecification: 0,                      expectedResult: false},
                                {typeSpecification: String,                 expectedResult: false},
                                {typeSpecification: "text",                 expectedResult: false},
                                {typeSpecification: Boolean,                expectedResult: false},
                                {typeSpecification: true,                   expectedResult: false},
                                {typeSpecification: false,                  expectedResult: false},
                                {typeSpecification: Array,                  expectedResult: false},
                                {typeSpecification: [],                     expectedResult: true},
                                {typeSpecification: [1, 2, "hello"],        expectedResult: true},
                                {typeSpecification: Function,               expectedResult: false},
                                {typeSpecification: myFunction,             expectedResult: false},
                                {typeSpecification: Object,                 expectedResult: false},
                                {typeSpecification: {},                     expectedResult: false},
                                {typeSpecification: {a: 1},                 expectedResult: false},
                                {typeSpecification: arguejs2.ANYTYPE,       expectedResult: false},
                                {typeSpecification: arguejs2.TAIL,          expectedResult: false},
                                {typeSpecification: MyClass,                expectedResult: false},
                                {typeSpecification: myObject,               expectedResult: false}
                            ];

            it("is a function", function() {
                expect(arguejs2_internals.$.isSimpleOptionalTypeSpecification).to.be.a("function");
            });

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

            for (var testCaseIdx = 0; testCaseIdx < testCases.length; ++testCaseIdx) {
                var testCase = testCases[testCaseIdx];
                runTestCase(testCase);
            }

            function runTestCase(_testCase) {

                var typeSpecificationText = stringify(_testCase.typeSpecification);

                var description =
                        "expect that " + typeSpecificationText +
                        " is " + (_testCase.expectedResult ? "" : "not ") + "a simple optional type specification";

                it(description, function() {
                    var result = arguejs2_internals.$.isSimpleOptionalTypeSpecification(_testCase.typeSpecification);
                    expect(result).to.equal(_testCase.expectedResult);
                });

                description = null;
                typeSpecificationText = null;
            }
        });
    }
});
