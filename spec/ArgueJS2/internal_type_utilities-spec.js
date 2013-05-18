define(['argue2', 'chai'], function(arguejs2, chai) {

    'use strict';

    // chai-expect
    var expect = chai.expect;

    // Tests...
    describe("internal type utilities", function() {

        var arguejs2_internals = arguejs2.__export_internals__();

        function myFunction() {
        }

        function MyClass() {
        }

        MyClass.myStaticFunction = function() {
        };

        MyClass.myStaticProperty = "my static class property";

        MyClass.prototype.myMethod = function() {
        };

        MyClass.prototype.myProperty = "my object propery";

        var myObject = new MyClass();

        function getTestTypeName(_type) {
            switch(_type) {
                case(undefined): return "undefined";
                case(null):      return "null";
                case(Array):     return "Array";
                case(String):    return "String";
                case(Number):    return "Number";
                case(Boolean):   return "Boolean";
                case(Function):  return "Function";
                case(Date):      return "Date";
                case(RegExp):    return "RegExp";
                case(Object):    return "Object";
                case(MyClass):   return "MyClass";
            }
            return undefined;
        }

        function TestCaseMap(_defaultExpectedValue) {
            this.testCases = [  {description: "null",                           isType: true,   isValue: true,      value: null,                                        expectedValue: _defaultExpectedValue},
                                {description: "undefined",                      isType: true,   isValue: true,      value: undefined,                                   expectedValue: _defaultExpectedValue},

                                {description: "Number",                         isType: true,   isValue: false,     value: Number,                                      expectedValue: _defaultExpectedValue},
                                {description: "Boolean",                        isType: true,   isValue: false,     value: Boolean,                                     expectedValue: _defaultExpectedValue},
                                {description: "String",                         isType: true,   isValue: false,     value: String,                                      expectedValue: _defaultExpectedValue},
                                {description: "Date",                           isType: true,   isValue: false,     value: Date,                                        expectedValue: _defaultExpectedValue},
                                {description: "RegExp",                         isType: true,   isValue: false,     value: RegExp,                                      expectedValue: _defaultExpectedValue},
                                {description: "Array",                          isType: true,   isValue: false,     value: Array,                                       expectedValue: _defaultExpectedValue},
                                {description: "Function",                       isType: true,   isValue: false,     value: Function,                                    expectedValue: _defaultExpectedValue},
                                {description: "Object",                         isType: true,   isValue: false,     value: Object,                                      expectedValue: _defaultExpectedValue},
                                {description: "Arguments",                      isType: true,   isValue: false,     value: arguejs2_internals.$.getType(arguments),     expectedValue: _defaultExpectedValue},
                                {description: "MyClass",                        isType: true,   isValue: false,     value: MyClass,                                     expectedValue: _defaultExpectedValue},

                                {description: "String: \"{1}\"",                isType: false,  isValue: true,      value: '',                                          expectedValue: _defaultExpectedValue},
                                {description: "String: \"{1}\"",                isType: false,  isValue: true,      value: "",                                          expectedValue: _defaultExpectedValue},
                                {description: "String: \"{1}\"",                isType: false,  isValue: true,      value: '1',                                         expectedValue: _defaultExpectedValue},
                                {description: "String: \"{1}\"",                isType: false,  isValue: true,      value: "1",                                         expectedValue: _defaultExpectedValue},
                                {description: "String: \"{1}\"",                isType: false,  isValue: true,      value: 'hello world!',                              expectedValue: _defaultExpectedValue},
                                {description: "String: \"{1}\"",                isType: false,  isValue: true,      value: "hello world!",                              expectedValue: _defaultExpectedValue},
                                {description: "String: \"{1}\"",                isType: false,  isValue: true,      value: 'abc@test.de',                               expectedValue: _defaultExpectedValue},
                                {description: "String: \"{1}\"",                isType: false,  isValue: true,      value: "abc@test.de",                               expectedValue: _defaultExpectedValue},

                                {description: "Number: {1}",                    isType: false,  isValue: true,      value: 0,                                           expectedValue: _defaultExpectedValue},
                                {description: "Number: {1}",                    isType: false,  isValue: true,      value: 1000000,                                     expectedValue: _defaultExpectedValue},
                                {description: "Number: {1}",                    isType: false,  isValue: true,      value: -1000000,                                    expectedValue: _defaultExpectedValue},
                                {description: "Number: {1}",                    isType: false,  isValue: true,      value: 1,                                           expectedValue: _defaultExpectedValue},
                                {description: "Number: {1}",                    isType: false,  isValue: true,      value: -1,                                          expectedValue: _defaultExpectedValue},
                                {description: "Number: {1}",                    isType: false,  isValue: true,      value: 17.325,                                      expectedValue: _defaultExpectedValue},
                                {description: "Number: {1}",                    isType: false,  isValue: true,      value: -17.325,                                     expectedValue: _defaultExpectedValue},
                                {description: "Number: Date.now()={1}",         isType: false,  isValue: true,      value: Date.now(),                                  expectedValue: _defaultExpectedValue},

                                {description: "Boolean: {1}",                   isType: false,  isValue: true,      value: true,                                        expectedValue: _defaultExpectedValue},
                                {description: "Boolean: {1}",                   isType: false,  isValue: true,      value: false,                                       expectedValue: _defaultExpectedValue},

                                {description: "Array: {1}",                     isType: false,  isValue: true,      value: [],                                          expectedValue: _defaultExpectedValue},
                                {description: "Array: {1}",                     isType: false,  isValue: true,      value: [1,2,3],                                     expectedValue: _defaultExpectedValue},
                                {description: "Array: {1}",                     isType: false,  isValue: true,      value: ["hello"],                                   expectedValue: _defaultExpectedValue},
                                {description: "Array: {1}",                     isType: false,  isValue: true,      value: ["hello",1,/test/g],                         expectedValue: _defaultExpectedValue},
                                {description: "Array: {1}",                     isType: false,  isValue: true,      value: [[1]],                                       expectedValue: _defaultExpectedValue},
                                {description: "Array: {1}",                     isType: false,  isValue: true,      value: [{}],                                        expectedValue: _defaultExpectedValue},

                                {description: "Date: {1}",                      isType: false,  isValue: true,      value: new Date(),                                  expectedValue: _defaultExpectedValue},
                                {description: "Date: {1}",                      isType: false,  isValue: true,      value: new Date(2013,5,14),                         expectedValue: _defaultExpectedValue},

                                {description: "RegExp: {1}",                    isType: false,  isValue: true,      value: /^hello$/i,                                  expectedValue: _defaultExpectedValue},
                                {description: "RegExp: {1}",                    isType: false,  isValue: true,      value: new RegExp("/^huhu/","i"),                   expectedValue: _defaultExpectedValue},

                                {description: "Function: myFunction",           isType: false,  isValue: true,      value: myFunction,                                  expectedValue: _defaultExpectedValue},

                                {description: "Object: {1}",                    isType: false,  isValue: true,      value: {},                                          expectedValue: _defaultExpectedValue},
                                {description: "Object: {1}",                    isType: false,  isValue: true,      value: { key: "value"},                             expectedValue: _defaultExpectedValue},

                                {description: "Arguments: {1}",                 isType: false,  isValue: true,      value: arguments,                                   expectedValue: _defaultExpectedValue},

                                {description: "MyClass: myObject",              isType: false,  isValue: true,      value: myObject,                                    expectedValue: _defaultExpectedValue},

                                {description: "MyClass.myStaticFunction",       isType: false,  isValue: true,      value: MyClass.myStaticFunction,                    expectedValue: _defaultExpectedValue},
                                {description: "MyClass.myStaticProperty",       isType: false,  isValue: true,      value: MyClass.myStaticProperty,                    expectedValue: _defaultExpectedValue},
                                {description: "MyClass: myObject.myMethod",     isType: false,  isValue: true,      value: myObject.myMethod,                           expectedValue: _defaultExpectedValue},
                                {description: "MyClass: myObject.myProperty",   isType: false,  isValue: true,      value: myObject.myProperty,                         expectedValue: _defaultExpectedValue}
                            ];
        }

        TestCaseMap.prototype.visitTestCases = function (_visitorCallback) {
            for (var testCaseIdx = 0; testCaseIdx < this.testCases.length; ++testCaseIdx) {
                var testCase = this.testCases[testCaseIdx];
                _visitorCallback(testCase);
            }
        };

        function generateTestFunction(_functionToTest, _testCase) {
            return function() {
                var result = _functionToTest(_testCase.value);
                expect(result).to.equal(_testCase.expectedValue);
            };
        }

        describe("\"isXYZ\" functions:", function() {

            function runIsTest(_functionName, _testCasePrepationFunction) {
                describe(_functionName, function() {
                    it("is a function", function() {

                        expect(arguejs2_internals.$[_functionName]).to.be.a("function");
                    });

                    var testCaseMap = new TestCaseMap(false);
                    testCaseMap.visitTestCases(_testCasePrepationFunction);

                    for (var testCaseIdx = 0; testCaseIdx < testCaseMap.testCases.length; ++testCaseIdx) {
                        var testCase = testCaseMap.testCases[testCaseIdx];
                        var testCaseDescriptionText = "" +
                            "expect " + testCase.expectedValue +
                            " if called with " + testCase.description.replace("{1}", (((testCase.value instanceof Array) && (testCase.value.length === 0)) ? "[]" : testCase.value));
                        it(testCaseDescriptionText, generateTestFunction(arguejs2_internals.$[_functionName], testCase));
                    }
                });
            }

            runIsTest("isBoolean", function(_testCase) {
                if (_testCase.isValue) {
                    if ((/^Boolean: /).test(_testCase.description)) {
                        _testCase.expectedValue = true;
                    }
                }
            });

            runIsTest("isArray", function(_testCase) {
                if (_testCase.isValue) {
                    if ((/^Array: /).test(_testCase.description)) {
                        _testCase.expectedValue = true;
                    }
                }
            });

            runIsTest("isArguments", function(_testCase) {
                if (_testCase.isValue) {
                    if ((/^Arguments(: .*)?$/).test(_testCase.description)) {
                        _testCase.expectedValue = true;
                    }
                }
            });

            runIsTest("isFunction", function(_testCase) {
                if (_testCase.isType && _testCase.value) {
                    _testCase.expectedValue = true;
                }
                else if ((/(^Function: )|(Function$)|(Method$)/).test(_testCase.description)) {
                    _testCase.expectedValue = true;
                }
            });

            runIsTest("isObject", function(_testCase) {
                if (_testCase.isType && _testCase.value) {
                    _testCase.expectedValue = true;
                }
                else if ((/(^(Array|Date|RegExp|Object|Arguments|Function): )|(Function$)|(Method$)|(Object$)/).test(_testCase.description)) {
                    _testCase.expectedValue = true;
                }
            });
        });

        describe("getType: ", function() {

            it("is a function", function() {

                expect(arguejs2_internals.$["getType"]).to.be.a("function");
            });

            var testCaseMap = new TestCaseMap(undefined);
            testCaseMap.visitTestCases(function(_testCase) {

                if (_testCase.isType && _testCase.isValue) { _testCase.expectedValue = _testCase.value; }
                else if (_testCase.isType) { _testCase.expectedValue = Function; }
                else if ((/^Number: /).test(_testCase.description)) {
                    _testCase.expectedValue = Number;
                }
                else if ((/^Boolean: /).test(_testCase.description)) {
                    _testCase.expectedValue = Boolean;
                }
                else if ((/(^String: )|(Property$)/).test(_testCase.description)) {
                    _testCase.expectedValue = String;
                }
                else if ((/^Array: /).test(_testCase.description)) {
                    _testCase.expectedValue = Array;
                }
                else if ((/^Date: /).test(_testCase.description)) {
                    _testCase.expectedValue = Date;
                }
                else if ((/^RegExp: /).test(_testCase.description)) {
                    _testCase.expectedValue = RegExp;
                }
                else if ((/^Arguments(: .*)?$/).test(_testCase.description)) {
                    _testCase.expectedValue = arguments.constructor;
                }
                else if ((/(^Function: )|(Function$)|(Method$)/).test(_testCase.description)) {
                    _testCase.expectedValue = Function;
                }
                else if ((/^Object: /).test(_testCase.description)) {
                    _testCase.expectedValue = Object;
                }
                else if ("MyClass: myObject" === _testCase.description) {
                    _testCase.expectedValue = MyClass;
                }
            });

            for (var testCaseIdx = 0; testCaseIdx < testCaseMap.testCases.length; ++testCaseIdx) {
                var testCase = testCaseMap.testCases[testCaseIdx];
                var testCaseDescriptionText = "" +
                        "expect " + getTestTypeName(testCase.expectedValue) +
                        " if called with " + (testCase.isType ? testCase.isValue ? "type/value" : "type" : "value") + testCase.description.replace("{1}", (((testCase.value instanceof Array) && (testCase.value.length === 0)) ? "[]" : testCase.value));
                it(testCaseDescriptionText, generateTestFunction(arguejs2_internals.$["getType"], testCase));
            }
        });
    });
});