define(['argue2', 'argue2.testable.min', 'argue2.testable.production.min', 'chai'], function(arguejs2_original, arguejs2_minified, arguejs2_production_minified, chai) {

    'use strict';

    // chai-expect
    var expect = chai.expect;

    // Tests...
    describe("internal isCompatibleValue", function() {

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

            it("is a function", function() {
                expect(arguejs2_internals.$.isCompatibleValue).to.be.a("function");
            });

            function myFunction() {
            }

            function MyClass() {
            }

            var myObject = new MyClass();

            var parameterTypeVariants = [Number, String, Boolean, Array, Function, Object, arguments.constructor, arguejs2.ANYTYPE, arguejs2.TAIL, MyClass];
            var allowUndefinedVariants = [true, false];
            var allowNullVariants = [true, false];
            var asDefaultValueVariants = [true, false];
            var valueVariants = [   null, undefined,
                                    -34, -1.2, 0, 17, 19.3,
                                    "", "hello world",
                                    true, false,
                                    myFunction,
                                    [], [1,[2]],
                                    arguments,
                                    myObject
                                ];

            function TestCase(_value, _parameterType, _allowUndefined, _allowNull, _asDefaultValue, _expectedResult) {
                this.value          = _value;
                this.parameterType  = _parameterType;
                this.allowUndefined = _allowUndefined;
                this.allowNull      = _allowNull;
                this.asDefaultValue = _asDefaultValue;
                this.expectedResult = _expectedResult;
            }

            for (var parameterTypeVariantsIdx = 0; parameterTypeVariantsIdx < parameterTypeVariants.length; ++parameterTypeVariantsIdx) {

                var parameterType = parameterTypeVariants[parameterTypeVariantsIdx];
                var parameterTypeName;
                switch(parameterType) {
                    case(Array)            : parameterTypeName = "Array"; break;
                    case(String)           : parameterTypeName = "String"; break;
                    case(Number)           : parameterTypeName = "Number"; break;
                    case(Boolean)          : parameterTypeName = "Boolean"; break;
                    case(Function)         : parameterTypeName = "Function"; break;
                    case(Date)             : parameterTypeName = "Date"; break;
                    case(RegExp)           : parameterTypeName = "RegExp"; break;
                    case(Object)           : parameterTypeName = "Object"; break;
                    case(arguejs2.ANYTYPE) : parameterTypeName = "ArgueJS2.ANYTYPE"; break;
                    case(arguejs2.TAIL)    : parameterTypeName = "ArgueJS2.TAIL"; break;
                    default                : parameterTypeName = (/^function (.+)\(/).exec(parameterType.toString())[1]; break;
                }

                for (var allowUndefinedVariantsIdx = 0; allowUndefinedVariantsIdx < allowUndefinedVariants.length; ++allowUndefinedVariantsIdx) {

                    var allowUndefined = allowUndefinedVariants[allowUndefinedVariantsIdx];
                    var allowUndefinedText = "undefined is ";
                    switch(allowUndefined) {
                        case(true)  : allowUndefinedText += "allowed"; break;
                        case(false) : allowUndefinedText += "forbidden"; break;
                        default     : throw new Error("NOT_SUPPORTED: allowUndefinedText = " + asDefaultValue);
                    }

                    for (var allowNullVariantsIdx = 0; allowNullVariantsIdx < allowNullVariants.length; ++allowNullVariantsIdx) {

                        var allowNull = allowNullVariants[allowNullVariantsIdx];
                        var allowNullText = "null is ";
                        switch(allowNull) {
                            case(true)  : allowNullText += "allowed"; break;
                            case(false) : allowNullText += "forbidden"; break;
                            default     : throw new Error("NOT_SUPPORTED: allowNull = " + allowNull);
                        }

                        for (var asDefaultValueVariantsIdx = 0; asDefaultValueVariantsIdx < asDefaultValueVariants.length; ++asDefaultValueVariantsIdx) {

                            var asDefaultValue = asDefaultValueVariants[asDefaultValueVariantsIdx];
                            var asDefaultValueText = "the value ";
                            switch(asDefaultValue) {
                                case(true)  : asDefaultValueText += "should be used as default value"; break;
                                case(false) : asDefaultValueText += "should be used as parameter argument"; break;
                                default     : throw new Error("NOT_SUPPORTED: asDefaultValue = " + asDefaultValue);
                            }

                            var description =
                                "if" +
                                " parameter type is " + parameterTypeName +
                                ", " + allowUndefinedText +
                                ", " + allowNullText +
                                " and " + asDefaultValueText +
                                " then";
                            describe(description + ":", generateDescribeFunctionCallback(parameterType, allowUndefined, allowNull, asDefaultValue));
                            description        = null;
                            asDefaultValueText = null;
                            asDefaultValue     = null;
                        }
                        allowNullText = null;
                        allowNull     = null;
                    }
                    allowUndefinedText = null;
                    allowUndefined     = null;
                }
                parameterTypeName = null;
                parameterType     = null;
            }

            function generateDescribeFunctionCallback(_parameterType, _allowUndefined, _allowNull, _asDefaultValue) {
                return function() {
                    for (var valueVariantsIdx = 0; valueVariantsIdx < valueVariants.length; ++valueVariantsIdx) {

                        var value = valueVariants[valueVariantsIdx];
                        var valueText = ">>> ";
                        if (value === "") { valueText += "\"\""; }
                        else if (typeof(value) === "string") { valueText += "\"" + value + "\""; }
                        else if (value instanceof Array) { valueText += JSON.stringify(value); }
                        else {
                            valueText += "" + value;
                        }
                        valueText += " <<<";

                        var expectedResult;
                        switch(_parameterType) {
                            case(String):
                                if (_allowUndefined && (value === undefined)) { expectedResult = true; }
                                else if (_allowNull && (value === null)) { expectedResult = true; }
                                else {
                                    expectedResult = (typeof(value) === "string");
                                }
                                break;
                            case(Number):
                                if (_allowUndefined && (value === undefined)) { expectedResult = true; }
                                else if (_allowNull && (value === null)) { expectedResult = true; }
                                else {
                                    expectedResult = (typeof(value) === "number");
                                }
                                break;
                            case(Boolean):
                                if (_allowUndefined && (value === undefined)) { expectedResult = true; }
                                else if (_allowNull && (value === null)) { expectedResult = true; }
                                else {
                                    expectedResult = (typeof(value) === "boolean");
                                }
                                break;
                            case(arguejs2.ANYTYPE):
                                if (value === undefined) { expectedResult = (_allowUndefined === true); }
                                else if (value === null) { expectedResult = (_allowNull === true); }
                                else {
                                    expectedResult = true;
                                }
                                break;
                            case(arguejs2.TAIL):
                                if (!asDefaultValue) { expectedResult = true; }
                                else {
                                    expectedResult = (value instanceof Array);
                                }
                                break;
                            default:
                                if (_allowUndefined && (value === undefined)) { expectedResult = true; }
                                else if (_allowNull && (value === null)) { expectedResult = true; }
                                else {
                                    expectedResult = (value instanceof _parameterType);
                                }
                        }
                        var expectedResultText;
                        switch(expectedResult) {
                            case(true)  : expectedResultText = "compatible"; break;
                            case(false) : expectedResultText = "incompatible"; break;
                            default     : throw new Error("INTERNAL_ERROR: test does not define an expected result");
                        }

                        var testCase = new TestCase(value, _parameterType, _allowUndefined, _allowNull, _asDefaultValue, expectedResult);

                        var description = "expect value " + valueText + " is detected as " + expectedResultText;
                        it(description, generateItFunctionCallback(testCase));

                        description        = null;
                        testCase           = null;
                        expectedResultText = null;
                        expectedResult     = null;
                        valueText          = null;
                        value              = null;
                    }
                };
            }

            function generateItFunctionCallback(_testCase) {
                return function() {
                    var result = arguejs2_internals.$.isCompatibleValue(_testCase.value, _testCase.parameterType, _testCase.allowUndefined, _testCase.allowNull, _testCase.asDefaultValue);
                    expect(result).to.equal(_testCase.expectedResult);
                };
            }
        });
    }
});
