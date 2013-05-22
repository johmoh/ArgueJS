define(['argue2', 'argue2.testable.min', 'chai'], function(arguejs2_original, arguejs2_minified, chai) {

    'use strict';

    // chai-expect
    var expect = chai.expect;

    // Tests...
    var argue2Variants = [  {name: "ArgueJS version 2 (original)",  implementation: arguejs2_original},
                            {name: "ArgueJS version 2 (minified)",  implementation: arguejs2_minified}
                        ];
    for (var argue2VariantIdx = 0; argue2VariantIdx < argue2Variants.length; ++argue2VariantIdx) {

        runTestsForVariant(argue2Variants[argue2VariantIdx].name, argue2Variants[argue2VariantIdx].implementation);
    }

    function runTestsForVariant(arguejs2Name, arguejs2) {
        describe(arguejs2Name + ": checking error detection in getArguments:", function() {

            // >>> A HACK... JUST FOR INTERNET EXPLORER. REASON: MOCHA USES RECURSION TO HEAVY. BUT THEY DO NOT WANT TO FIX THAT IN MOCHA.
            beforeEach(function(done){
                setTimeout(done, 0);
            });
            // <<< A HACK... JUST FOR INTERNET EXPLORER. REASON: MOCHA USES RECURSION TO HEAVY. BUT THEY DO NOT WANT TO FIX THAT IN MOCHA.

            var arguejs2_internals = arguejs2.__export_internals__();
            var errorTexts = arguejs2_internals.$.errorTexts;

            function MyClass() {}

            var myObject = new MyClass();

//            var testCases = {   description: "expect an exception thrown if called without any arguments", signature: undefined, argumentValues: undefined,

            // 1. test that getArguments(...) exists and is a function
            // ATTENTION: it is important that this test is the 1st test, because getArguments is expected to exist as a function in all tests that follow
            it("is a function", function() {

                expect(arguejs2.getArguments).to.be.a("function");
            });

            // 2. test that getArguments(...) expect to get called correctly
            // ATTENTION: it is important that this test is the 2nd test, because all tests that follow will call getArguments(...) hopefully correctly. whatever "called correctly" means, it is tested here.
            describe("bad call tests:", function() {

                describe("invalid number of arguments:", function() {

                    it("expect an exception thrown if called without any arguments", function() {
                        expect(function(){arguejs2.getArguments();}).to["throw"](Error, errorTexts.asRegExp.ERR_BADCALL_NoArguments);
                    });

                    it("expect an exception thrown if called without more than two arguments", function() {
                        expect(function(){arguejs2.getArguments([], arguments, {"3rdParameterNotAllowed": true});}).to["throw"](Error, errorTexts.asRegExp.ERR_BADCALL_TooManyArguments);
                    });
                });

                describe("getArguments(...) is called with two arguments (_functionSpecification and _arguments):", function() {

                    it("expect to accept an array as _functionSpecification", function() {
                        expect(function(){arguejs2.getArguments([], arguments);}).not.to["throw"]();
                    });

                    it("expect an exception thrown if _functionSpecification is not an array", function() {
                        expect(function(){arguejs2.getArguments({}, arguments);}).to["throw"](Error, errorTexts.asRegExp.ERR_BADCALL_InvalidTypeOfArgument);
                    });

                    it("expect to accept an array as _arguments", function() {
                        expect(function(){arguejs2.getArguments([], []);}).not.to["throw"]();
                    });

                    it("expect to accept an Arguments object as _arguments", function() {
                        expect(function(){arguejs2.getArguments([], arguments);}).not.to["throw"]();
                    });

                    it("expect an exception thrown if _arguments is not an array or an Arguments object", function() {
                        expect(function(){arguejs2.getArguments({}, {});}).to["throw"](Error, errorTexts.asRegExp.ERR_BADCALL_InvalidTypeOfArgument);
                    });
                });

                describe("getArguments(...) is called with one argument (_arguments):", function() {

                    it("expect to accept an array as _arguments", function() {
                        expect(function(){arguejs2.getArguments([]);}).not.to["throw"]();
                    });

                    it("expect to accept an Arguments object as _arguments", function() {
                        expect(function(){arguejs2.getArguments(arguments);}).not.to["throw"]();
                    });
                });

                describe("getArguments(...) is called with function signature:", function () {

                    it("expect to accept one parameter specification as an object in _functionSpecification", function() {
                        expect(function(){arguejs2.getArguments([{a:[String]}], arguments);}).not.to["throw"]();
                    });

                    it("expect to accept two parameter specifications as an objects in _functionSpecification", function() {
                        expect(function(){arguejs2.getArguments([{a:[String]}, {b:[String]}], arguments);}).not.to["throw"]();
                    });

                    it("expect to accept three parameter specifications as an objects in _functionSpecification", function() {
                        expect(function(){arguejs2.getArguments([{a:[String]}, {b:[String]}, {c:[String]}], arguments);}).not.to["throw"]();
                    });

                    it("expect an exception thrown if a parameter specification in _functionSpecification is not an object", function() {
                        expect(function(){arguejs2.getArguments([{a:[String]}, [], {c:[String]}], arguments);}).to["throw"](Error, errorTexts.asRegExp.ERR_BADCALL_InvalidTypeOfParameter);
                    });
                });
            });

            // 3. test that getArguments(...) detects cases where function specification does not match given arguments
            // ATTENTION: it is importent that this test is the third 3rd test, because all tests that follow contain "positiv" tests before testing error detection.
            // DEFINITION: "a positive test" is defined as "a call to getArguments(...) returns successfully but i does not care if the result is correct". if the result is correct in a positive test is tested in other spec-files.
            describe("detect incompatible function call - function sepcification does not match given arguments:", function() {

                describe("expect getArguments(...) to accept a function call that", function() {

                    describe("has no parameter specifications and no arguments", function() {

                        it("if getArguments(...) is called without a function specification", function() {
                            expect(function(){arguejs2.getArguments([]);}).not.to["throw"]();
                        });

                        it("if getArguments(...) is called with an empty function specification", function() {
                            expect(function(){arguejs2.getArguments([], []);}).not.to["throw"]();
                        });
                    });

                    describe("has only parameter specifications of optional parameters and no arguments: ", function() {

                        it("one parameter specification", function() {
                            expect(function(){arguejs2.getArguments([{a: [String]}], []);}).not.to["throw"]();
                        });

                        it("multiple parameter specifications", function() {
                            expect(function(){arguejs2.getArguments([{a: [String]}, {b: [String]}, {c: [String]}], []);}).not.to["throw"]();
                        });
                    });

                    describe("has only parameter specifications of mandatory parameters and matching arguments:", function() {

                        it("one parameter specification", function() {
                            expect(function(){arguejs2.getArguments([{a: String}], ["text"]);}).not.to["throw"]();
                        });

                        it("multiple parameter specifications", function() {
                            expect(function(){arguejs2.getArguments([{a: String}, {b: Number}, {c: Boolean}, {d: MyClass}], ["text", -17.3, false, myObject]);}).not.to["throw"]();
                        });
                    });

                    describe("has only parameter specifications of optional parameters and matching arguments:", function() {

                        it("one parameter specification", function() {
                            expect(function(){arguejs2.getArguments([{a: [String]}], ["text"]);}).not.to["throw"]();
                        });

                        it("multiple parameter specifications", function() {
                            expect(function(){arguejs2.getArguments([{a: [String]}, {b: [Number]}, {c: [Boolean]}, {d: [MyClass]}], ["text", -17.3, false, myObject]);}).not.to["throw"]();
                        });
                    });

                    describe("has parameter specifications of mandatory as well as optional parameters and matching arguments:", function() {

                        describe("two parameter specifications - the first parameter is optional and the second is mandatory:", function() {

                            it("an argument exists for the mandatory parameter, only", function() {
                                expect(function(){arguejs2.getArguments([{a: [String]}, {b: Number}], [17]);}).not.to["throw"]();
                            });

                            it("an argument exists for the optional and the mandatory parameter", function() {
                                expect(function(){arguejs2.getArguments([{a: [String]}, {b: Number}], ["text", 17]);}).not.to["throw"]();
                            });
                        });

                        describe("two parameter specifications - the first parameter is mandatory and the second is optional", function() {

                            it("an argument exists for the mandatory parameter, only", function() {
                                expect(function(){arguejs2.getArguments([{a: String}, {b: [Number]}], ["text"]);}).not.to["throw"]();
                            });

                            it("an argument exists for the optional and the mandatory parameter", function() {
                                expect(function(){arguejs2.getArguments([{a: String}, {b: [Number]}], ["text", 17]);}).not.to["throw"]();
                            });
                        });

                        describe("multiple parameter specifications", function() {

                            it("and all parameters are mandatory", function() {
                                expect(function(){arguejs2.getArguments([{a: String}, {b: Number}, {c: Boolean}, {d: MyClass}], ["text", -17.3, false, myObject]);}).not.to["throw"]();
                            });

                            describe("and some parameters are mandatory and some are optional", function() {

                                it("an argument exists for mandatory parameters, only", function() {
                                    expect(function(){arguejs2.getArguments([{a: [String]}, {b: Number}, {c: [Boolean]}, {d: MyClass}], [-17.3, myObject]);}).not.to["throw"]();
                                });

                                it("an argument exists for optional and mandatory parameters", function() {
                                    expect(function(){arguejs2.getArguments([{a: [String]}, {b: Number}, {c: [Boolean]}, {d: MyClass}], ["text", -17.3, false, myObject]);}).not.to["throw"]();
                                });

                                it("an argument exists for mandatory parameters and for some optional parameters", function() {
                                    expect(function(){arguejs2.getArguments([{a: [String]}, {b: Number}, {c: [Boolean]}, {d: MyClass}], [-17.3, false, myObject]);}).not.to["throw"]();
                                    expect(function(){arguejs2.getArguments([{a: [String]}, {b: Number}, {c: [Boolean]}, {d: MyClass}], ["text", -17.3, myObject]);}).not.to["throw"]();
                                });
                            });
                        });
                    });
                });

                describe("detect if more arguments are given then parameter specifications of mandatory parameters exist:", function() {

                    it("expect an exception if no function specification exists and arguments are given", function() {
                        expect(function(){arguejs2.getArguments([1]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_TooManyArguments);
                    });

                    it("expect an exception if an function specification without parameter specifications exist and arguments are given", function() {
                        expect(function(){arguejs2.getArguments([], [1]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_TooManyArguments);
                    });

                    describe("expect an exception if an function specification containing only parameter specifications of mandatory parameters existsand too many arguments are given:", function() {

                        it("one parameter specification", function() {
                            expect(function(){arguejs2.getArguments([{a: String}], ["text", 1]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_TooManyArguments);
                        });

                        it("multiple parameter specifications", function() {
                            expect(function(){arguejs2.getArguments([{a: String}, {b: Number}], ["text", 1, 2]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_TooManyArguments);
                        });
                    });

                    describe("expect an exception if an function specification containing only parameter specifications of optional parameters exist and too many arguments are given:", function() {

                        describe("one parameter specification", function() {

                            it("and the first argument is compatible to the parameter type", function() {
                                expect(function(){arguejs2.getArguments([{a: [String]}], ["text", 1]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_TooManyArguments);
                            });

                            it("and the second argument is compatible to the parameter type", function() {
                                expect(function(){arguejs2.getArguments([{a: [String]}], [1, "text"]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_TooManyArguments);
                            });

                            it("and no argument is compatible to the parameter type", function() {
                                expect(function(){arguejs2.getArguments([{a: [String]}], [1]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_TooManyArguments);
                            });
                        });

                        describe("multiple parameter specifications", function() {

                            it("and all parameters have matching arguments but there is one argument left", function() {
                                expect(function(){arguejs2.getArguments([{a: [String]}, {b: [Number]}], ["text", 1, 2]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_TooManyArguments);
                            });

                            it("and all parameters have matching arguments but the first argument is left", function() {
                                expect(function(){arguejs2.getArguments([{a: [String]}, {b: [Number]}], [myObject, "text", 1]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_TooManyArguments);
                            });

                            it("and all parameters have matching arguments but an argument in the middle is left", function() {
                                expect(function(){arguejs2.getArguments([{a: [String]}, {b: [Number]}], ["text", "argument is left", 1]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_TooManyArguments);
                            });
                        });
                    });

                    describe("expect an exception if an function specification containing parameter specifications of mandatory as well as optional parameters exist and too many arguments are given:", function() {

                        it("and all parameters have matching arguments but there is one argument left", function() {
                            expect(function(){arguejs2.getArguments([{a: String}, {b: [Number]}, {c: Boolean}], ["text", 1, true, myObject]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_TooManyArguments);
                        });

                        it("and only mandatory parameters have matching arguments but there is one argument left", function() {
                            expect(function(){arguejs2.getArguments([{a: String}, {b: [Number]}, {c: Boolean}], ["text", true, myObject]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_TooManyArguments);
                        });
                    });
                });

                describe("detect if a mandatory parameter has no matching compatible value:", function() {

                    it("expect an exception thrown if a function specification contains only one parameter specification of a mandatory parameter but no arguments are given", function() {
                        expect(function(){arguejs2.getArguments([{a: String}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                    });

                    it("expect an exception thrown if a function specification contains only one parameter specification of a mandatory parameter but a non-compatible argument is given", function() {
                        expect(function(){arguejs2.getArguments([{a: String}], [1]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                    });

                    describe("expect an exception thrown if a function specification contains multiple parameters specifications of only mandatory parameters but", function() {

                        describe("the first parameter has no matching compatible argument:", function() {

                            it("parameter has no argument", function() {
                                expect(function(){arguejs2.getArguments([{a: String}, {b: Number}], [1]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                            });

                            it("parameter has incompatible argument", function() {
                                expect(function(){arguejs2.getArguments([{a: String}, {b: Number}], [1, 2]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                            });
                        });

                        describe("the last parameter has no matching compatible argument:", function() {

                            it("parameter has no argument", function() {
                                expect(function(){arguejs2.getArguments([{a: String}, {b: Number}], ["text"]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                            });

                            it("parameter has incompatible argument", function() {
                                expect(function(){arguejs2.getArguments([{a: String}, {b: Number}], ["text", myObject]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                            });
                        });

                        describe("a parameter in the middle has no matching compatible argument:", function() {

                            it("parameter has no argument", function() {
                                expect(function(){arguejs2.getArguments([{a: String}, {b: Number}, {c: Boolean}], ["text", true]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                            });

                            it("parameter has incompatible argument", function() {
                                expect(function(){arguejs2.getArguments([{a: String}, {b: Number}, {c: Boolean}], ["text", myObject, true]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                            });
                        });
                    });

                    describe("expect an exception thrown if a function specification contains multiple parameters specifications of mandatory as well as optional parameters but", function() {

                        describe("the first mandatory parameter has no matching compatible argument:", function() {

                            it("parameter has no argument", function() {
                                expect(function(){arguejs2.getArguments([{a: [String]}, {b: Number}, {c: [Boolean]}], ["text"]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                            });

                            it("parameter has incompatible argument", function() {
                                expect(function(){arguejs2.getArguments([{a: [String]}, {b: Number}, {c: Boolean}], [myObject]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                            });
                        });

                        describe("the last parameter has no matching compatible argument:", function() {

                            describe("parameter has no argument:", function() {

                                it("without optional parameters consuming arguments", function() {
                                    expect(function(){arguejs2.getArguments([{a: String}, {b: [Number]}, {c: Boolean}], ["text"]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                                });

                                it("with optional parameters consuming arguments", function() {
                                    expect(function(){arguejs2.getArguments([{a: String}, {b: [Number]}, {c: Number}], ["text", 1]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                                });
                            });

                            describe("parameter has incompatible argument:", function() {

                                it("without optional parameters consuming arguments", function() {
                                    expect(function(){arguejs2.getArguments([{a: String}, {b: [Number]}, {c: Boolean}], ["text", myObject]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                                });

                                it("with optional parameters consuming arguments", function() {
                                    expect(function(){arguejs2.getArguments([{a: String}, {b: [Number]}, {c: Number}], ["text", 1, myObject]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                                });
                            });
                        });

                        it("a parameter in the middle has no matching compatible argument", function() {

                            describe("parameter has no argument:", function() {

                                it("without optional parameters consuming arguments", function() {
                                    expect(function(){arguejs2.getArguments([{a: [String]}, {b: Number}, {c: Boolean}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                                });

                                it("with optional parameters consuming arguments", function() {
                                    expect(function(){arguejs2.getArguments([{a: [String]}, {b: Number}, {c: Boolean}], ["text"]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                                });
                            });

                            describe("parameter has incompatible argument:", function() {

                                it("without optional parameters consuming arguments", function() {
                                    expect(function(){arguejs2.getArguments([{a: [String]}, {b: Number}, {c: Boolean}], [myObject, true]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                                });

                                it("with optional parameters consuming arguments", function() {
                                    expect(function(){arguejs2.getArguments([{a: [Number]}, {b: Number}, {c: Boolean}], [1, true]);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_GetParameters_MandatoryParameterWithoutValue);
                                });
                            });
                        });
                    });
                });
            });

            // 4. test misconfiguration - these test tests the syntax and the semantic of a function specification, a parameter specification and a parameter type specification
            // ATTENTION: it is important that this test is the 4th test (the last test), because before a test case tests for detecting an error it runs a positive test where no error is expected.
            //            than means: this test relies on...
            //            - getArguments(...) exists and is a function (test 1)
            //            - getArguments(...) accepts to be called with a correct number of arguments and types for that arguments (test 2)
            //            - getArguments(...) returns successfully in positive test cases (test 3)
            describe("detect misconfiguration:", function() {

                describe("its only allowed to specify one parameter per parameter specification:", function() {

                    it("expect to accept a parameter specification that specify one parameter", function() {
                        expect(function(){arguejs2.getArguments([{a: [String]}], []);}).not.to["throw"]();
                    });

                    it("expect an exception thrown if a parameter specification specify more than one parameter", function() {
                        expect(function(){arguejs2.getArguments([{a: [String], b: [String]}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_ParameterWithTooManyElements);
                    });
                });

                describe("parameter type option defaultValue must be compatible to parameter type:", function() {

                    it("expect to accept a default value that is compatible to parameter type", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [String], defaultValue: "hello"}}], []);}).not.to["throw"]();
                    });

                    // @TODO: test that internal function isCompatibleValue(...) with argument "true" for parameter "_asDefaultValue" is called to validate default value (SinonJS; there might be a good chance that such a test is not possible because the internal method is not directly accessable)

                    it("expect an exception thrown if default value is incompatible to parameter type", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [String], defaultValue: 17}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_DefaultValueHasIncompatibleType);
                    });
                });

                describe("parameter type option allowNull must be boolean:", function() {

                    it("expect to accept allowNull to be true", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [String], defaultValue: "hello", allowNull: true}}], []);}).not.to["throw"]();
                    });

                    it("expect to accept allowNull to be false", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [String], defaultValue: "hello", allowNull: false}}], []);}).not.to["throw"]();
                    });

                    it("expect an exception thrown if allowNull is set to null", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [String], defaultValue: "hello", allowNull: null}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidTypeOfValue);
                    });

                    it("expect an exception thrown if allowNull is set to undefined", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [String], defaultValue: "hello", allowNull: undefined}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidTypeOfValue);
                    });

                    it("expect an exception thrown if allowNull is set to a non-boolean value", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [String], defaultValue: "hello", allowNull: "true"}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidTypeOfValue);
                    });
                });

                describe("parameter type option allowUndefined must be boolean:", function() {

                    it("expect to accept allowUndefined to be true", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [String], defaultValue: "hello", allowUndefined: true}}], []);}).not.to["throw"]();
                    });

                    it("expect to accept allowUndefined to be false", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [String], defaultValue: "hello", allowUndefined: false}}], []);}).not.to["throw"]();
                    });

                    it("expect an exception thrown if allowUndefined is set to null", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [String], defaultValue: "hello", allowUndefined: null}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidTypeOfValue);
                    });

                    it("expect an exception thrown if allowUndefined is set to undefined", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [String], defaultValue: "hello", allowUndefined: undefined}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidTypeOfValue);
                    });

                    it("expect an exception thrown if allowUndefined is set to a non-boolean value", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [String], defaultValue: "hello", allowUndefined: "true"}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidTypeOfValue);
                    });
                });

                describe("parameter type option parenthesizeTail must be boolean:", function() {

                    it("expect to accept parenthesizeTail to be true", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [arguejs2.TAIL], parenthesizeTail: true}}], []);}).not.to["throw"]();
                    });

                    it("expect to accept parenthesizeTail to be false", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [arguejs2.TAIL], parenthesizeTail: false}}], []);}).not.to["throw"]();
                    });

                    it("expect an exception thrown if parenthesizeTail is set to null", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [arguejs2.TAIL], parenthesizeTail: null}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidTypeOfValue);
                    });

                    it("expect an exception thrown if parenthesizeTail is set to undefined", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [arguejs2.TAIL], parenthesizeTail: undefined}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidTypeOfValue);
                    });

                    it("expect an exception thrown if parenthesizeTail is set to a non-boolean value", function() {
                        expect(function(){arguejs2.getArguments([{a: {type: [arguejs2.TAIL], parenthesizeTail: "true"}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidTypeOfValue);
                    });
                });

                describe("parameter name must be valid:", function() {

                    it("expect to accept valid name as identifier", function() {
                        expect(function(){arguejs2.getArguments([{hello: [String]}], []);}).not.to["throw"]();
                    });

                    it("expect to accept valid name as string", function() {
                        expect(function(){arguejs2.getArguments([{"hello": [String]}], []);}).not.to["throw"]();
                    });

                    // @TODO: test that internal function validateParameterName(...) is called to validate a parameter name (SinonJS; there might be a good chance that such a test is not possible because the internal method is not directly accessable)

                    it("expect an exception thrown if name is invalid", function() {
                        expect(function(){arguejs2.getArguments([{":hello": [String]}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidValue);
                    });
                });

                describe("parameter type must be valid:", function() {

                    describe("simple parameter type specification:", function() {

                        describe("mandatory parameter:", function() {

                            it("expect to accept a build in type as parameter type", function() {
                                expect(function(){arguejs2.getArguments([{a: String}], ["hello"]);}).not.to["throw"]();
                            });

                            it("expect to accept a user defined type as parameter type", function() {
                                expect(function(){arguejs2.getArguments([{a: MyClass}], [myObject]);}).not.to["throw"]();
                            });

                            it("expect an exception thrown if parameter type is null", function() {
                                expect(function(){arguejs2.getArguments([{a: null}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidValue);
                            });

                            it("expect an exception thrown if parameter type is undefined", function() {
                                expect(function(){arguejs2.getArguments([{a: undefined}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidValue);
                            });

                            it("expect an exception thrown if parameter type is not a type", function() {
                                expect(function(){arguejs2.getArguments([{a: "String"}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidValue);
                            });
                        });

                        describe("optional parameter:", function() {

                            it("expect to accept a build in type as parameter type", function() {
                                expect(function(){arguejs2.getArguments([{a: [String]}], []);}).not.to["throw"]();
                            });

                            it("expect to accept a build in type with default value as parameter type", function() {
                                expect(function(){arguejs2.getArguments([{a: [String, "text"]}], []);}).not.to["throw"]();
                            });

                            it("expect to accept a user defined type as parameter type", function() {
                                expect(function(){arguejs2.getArguments([{a: [MyClass]}], []);}).not.to["throw"]();
                            });

                            it("expect to accept a user defined type with default value as parameter type", function() {
                                expect(function(){arguejs2.getArguments([{a: [MyClass, myObject]}], []);}).not.to["throw"]();
                            });

                            it("expect an exception thrown if parameter type is null", function() {
                                expect(function(){arguejs2.getArguments([{a: [null]}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidValue);
                            });

                            it("expect an exception thrown if parameter type is undefined", function() {
                                expect(function(){arguejs2.getArguments([{a: [undefined]}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidValue);
                            });

                            it("expect an exception thrown if parameter type is not a type", function() {
                                expect(function(){arguejs2.getArguments([{a: ["String"]}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidValue);
                            });

                            it("expect an exception thrown if parameter type specification is missing", function() {
                                expect(function(){arguejs2.getArguments([{a: []}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_MissingTypeSpecification);
                            });

                            it("expect an exception thrown if parameter type specification has too many elements", function() {
                                expect(function(){arguejs2.getArguments([{a: [String, "text", 34]}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_TypeSpecificationHasTooManyElements);
                            });
                        });
                    });

                    describe("complex parameter type specification:", function() {

                        describe("mandatory parameter:", function() {

                            it("expect to accept a build in type as parameter type", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: String}}], ["hello"]);}).not.to["throw"]();
                            });

                            it("expect to accept a user defined type as parameter type", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: MyClass}}], [myObject]);}).not.to["throw"]();
                            });

                            it("expect an exception thrown if parameter type is null", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: null}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidValue);
                            });

                            it("expect an exception thrown if parameter type is undefined", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: undefined}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidValue);
                            });

                            it("expect an exception thrown if parameter type is not a type", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: "String"}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidValue);
                            });
                        });

                        describe("optional parameter:", function() {

                            it("expect to accept a build in type as parameter type", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: [String]}}], []);}).not.to["throw"]();
                            });

                            it("expect to accept a build in type with default value as parameter type", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: [String, "text"]}}], []);}).not.to["throw"]();
                            });

                            it("expect to accept a user defined type as parameter type", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: [MyClass]}}], []);}).not.to["throw"]();
                            });

                            it("expect to accept a user defined type with default value as parameter type", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: [MyClass, myObject]}}], []);}).not.to["throw"]();
                            });

                            it("expect an exception thrown if parameter type is null", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: [null]}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidValue);
                            });

                            it("expect an exception thrown if parameter type is undefined", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: [undefined]}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidValue);
                            });

                            it("expect an exception thrown if parameter type is not a type", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: ["String"]}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_InvalidValue);
                            });

                            it("expect an exception thrown if parameter type specification is missing", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: []}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_MissingTypeSpecification);
                            });

                            it("expect an exception thrown if parameter type specification has too many elements", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: [String, "text", 34]}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_TypeSpecificationHasTooManyElements);
                            });
                        });
                    });

                    describe("unknown parameter type specification option is forbidden in complex parameter specification:", function() {

                        it("expect to accept known parameter type specification options", function() {
                            expect(function(){arguejs2.getArguments([{a: {type: [String], defaultValue: "text"}}], []);}).not.to["throw"]();
                        });

                        it("expect an exception thrown if parameter type specification option is unknown (not supported)", function() {
                            expect(function(){arguejs2.getArguments([{a: {type: [String], invalidParameterTypeSpecificationOption: "text"}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_UnknownTypeSpecificationOption);
                        });
                    });
                });

                describe("special cases for a non-variadic function:", function() {

                    describe("parenthesizeTail is not allowed in a non-variadic function:", function() {

                        it("expect to accept a non-tail parameter specification without parameter type specification option parenthesizeTail", function() {
                            expect(function(){arguejs2.getArguments([{a: {type: [String]}}], []);}).not.to["throw"]();
                        });

                        describe("expect an exception thrown if a non-tail parameter specifiction contains parameter type specification option parenthesizeTail", function() {

                            it("that is set to true", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: [String], parenthesizeTail: true}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction);
                            });

                            it("that is set to false", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: [String], parenthesizeTail: false}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction);
                            });
                        });
                    });
                });

                describe("special cases for a variadic function:", function() {

                    describe("tail parameter specification of a variadic function must be the last parameter specification:", function() {

                        it("expect to accept a tail parameter specification as last parameter specification", function() {
                            expect(function(){arguejs2.getArguments([{a: [String]}, {b: [Number]}, {c: [arguejs2.TAIL]}], []);}).not.to["throw"]();
                        });

                        it("expect an exception thrown if a tail parameter specification is not the last parameter specification", function() {
                            expect(function(){arguejs2.getArguments([{a: [String]}, {c: [arguejs2.TAIL]}, {b: [Number]}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_TailParameterMustBeLastPastparameter);
                        });
                    });

                    describe("special cases for variadic functions:", function() {

                        it("expect to accept a tail parameter specification with valid parameter type specification options", function() {
                            expect(function(){arguejs2.getArguments([{a: {type: arguejs2.TAIL, defaultValue: [], parenthesizeTail: false}}], []);}).not.to["throw"]();
                        });

                        describe("expect an exception thrown if a tail parameter specifiction contains parameter type specification option allowNull", function() {

                            it("that is set to true", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: arguejs2.TAIL, defaultValue: [], parenthesizeTail: false, allowNull: true}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction);
                            });

                            it("that is set to false", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: arguejs2.TAIL, defaultValue: [], parenthesizeTail: false, allowNull: false}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction);
                            });
                        });

                        describe("expect an exception thrown if a tail parameter specifiction contains parameter type specification option allowUndefined", function() {

                            it("that is set to true", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: arguejs2.TAIL, defaultValue: [], parenthesizeTail: false, allowUndefined: true}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction);
                            });

                            it("that is set to false", function() {
                                expect(function(){arguejs2.getArguments([{a: {type: arguejs2.TAIL, defaultValue: [], parenthesizeTail: false, allowUndefined: false}}], []);}).to["throw"](Error, errorTexts.asRegExp.ERR_ARGUEJS_ParameterXYZAllowedInVariadicFunction);
                            });
                        });
                    });
                });
            });
        });
    }
});
